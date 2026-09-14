import fs from 'fs/promises';
import path from 'path';
import { Redis } from '@upstash/redis';
import { Quest, RewardItem, RedeemedTicket, DailyHistory, BodyMetricRecord } from '@/types';

// Use /tmp on Vercel/serverless where filesystem is read-only, otherwise use src/data/db.json
const isServerless = process.env.VERCEL === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME !== undefined;
const DB_PATH = isServerless
  ? path.join('/tmp', 'habitfit_db.json')
  : path.join(process.cwd(), 'src', 'data', 'db.json');

const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

// Initialize Upstash Redis if environment variables are provided (e.g. on Vercel)
const redis =
  redisUrl && redisToken
    ? new Redis({
        url: redisUrl,
        token: redisToken,
      })
    : null;

export interface HabitFitRecord {
  pin: string;
  coins: number;
  totalCoinsEarned: number;
  streak: number;
  lastActiveDate: string;
  quests: Quest[];
  rewards: RewardItem[];
  tickets: RedeemedTicket[];
  history: Record<string, DailyHistory>;
  metrics?: BodyMetricRecord[];
  userHeightCm?: number;
  createdAt: string;
  updatedAt: string;
}

interface DatabaseSchema {
  users: Record<string, HabitFitRecord>;
}

// ---------------- LOCAL FILE DATABASE ADAPTER (OFFLINE / DEV) ----------------
async function ensureDbExists(): Promise<DatabaseSchema> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data) as DatabaseSchema;
  } catch {
    const initialDb: DatabaseSchema = { users: {} };
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(initialDb, null, 2), 'utf-8');
    return initialDb;
  }
}

async function getLocalRecordByPin(pin: string): Promise<HabitFitRecord | null> {
  try {
    const db = await ensureDbExists();
    return db.users[pin.toUpperCase()] || null;
  } catch (err) {
    console.error('Local DB read error:', err);
    return null;
  }
}

async function saveLocalRecordByPin(
  pin: string,
  record: HabitFitRecord
): Promise<HabitFitRecord> {
  try {
    const db = await ensureDbExists();
    db.users[pin.toUpperCase()] = record;
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
    return record;
  } catch (err) {
    console.error('Local DB write error:', err);
    return record;
  }
}

// ---------------- PUBLIC API: DUAL-ENGINE ADAPTER ----------------

export async function getRecordByPin(pin: string): Promise<HabitFitRecord | null> {
  const normalizedPin = pin.toUpperCase();

  // 1. If Upstash Cloud is active, query Redis
  if (redis) {
    try {
      const cloudRecord = await redis.get<HabitFitRecord>(`habitfit:${normalizedPin}`);
      if (cloudRecord) {
        return cloudRecord;
      }
    } catch (err) {
      console.warn('Upstash Redis read failed, falling back to local storage:', err);
    }
  }

  // 2. Fallback to local file database
  return getLocalRecordByPin(normalizedPin);
}

export async function saveRecordByPin(
  pin: string,
  payload: Partial<HabitFitRecord>
): Promise<HabitFitRecord> {
  const normalizedPin = pin.toUpperCase();
  const now = new Date().toISOString();

  // Retrieve existing record to preserve createdAt and unmodified fields
  const existing = await getRecordByPin(normalizedPin);

  const record: HabitFitRecord = {
    pin: normalizedPin,
    coins: payload.coins !== undefined ? payload.coins : existing?.coins ?? 0,
    totalCoinsEarned: payload.totalCoinsEarned !== undefined ? payload.totalCoinsEarned : existing?.totalCoinsEarned ?? 0,
    streak: payload.streak !== undefined ? payload.streak : existing?.streak ?? 1,
    lastActiveDate: payload.lastActiveDate || existing?.lastActiveDate || now.split('T')[0],
    quests: payload.quests || existing?.quests || [],
    rewards: payload.rewards || existing?.rewards || [],
    tickets: payload.tickets || existing?.tickets || [],
    history: payload.history || existing?.history || {},
    metrics: payload.metrics || existing?.metrics || [],
    userHeightCm: payload.userHeightCm !== undefined ? payload.userHeightCm : existing?.userHeightCm ?? 170,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  // 1. If Upstash Cloud is active, save to Redis
  if (redis) {
    try {
      await redis.set(`habitfit:${normalizedPin}`, record);
    } catch (err) {
      console.warn('Upstash Redis write failed, writing to local fallback:', err);
    }
  }

  // 2. Also write to local storage as fallback/cache if running locally
  await saveLocalRecordByPin(normalizedPin, record);

  return record;
}
