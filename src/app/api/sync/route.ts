import { NextResponse } from 'next/server';
import { getRecordByPin, saveRecordByPin } from '@/lib/serverDb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pin = searchParams.get('pin');

  if (!pin) {
    return NextResponse.json({ error: 'PIN is required' }, { status: 400 });
  }

  const record = await getRecordByPin(pin);

  if (!record) {
    const isCloudActive = Boolean(
      (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ||
      (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
    );

    return NextResponse.json({
      found: false,
      cloudActive: isCloudActive,
      message: `ไม่พบข้อมูลสำหรับ PIN: ${pin.toUpperCase()}`,
    }, { status: 200 });
  }

  const isCloudActive = Boolean(
    (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) ||
    (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
  );

  return NextResponse.json({
    found: true,
    cloudActive: isCloudActive,
    pin: record.pin,
    coins: record.coins,
    totalCoinsEarned: record.totalCoinsEarned,
    streak: record.streak,
    lastActiveDate: record.lastActiveDate,
    quests: record.quests,
    rewards: record.rewards,
    tickets: record.tickets,
    history: record.history,
    metrics: record.metrics || [],
    userHeightCm: record.userHeightCm || 170,
    updatedAt: record.updatedAt,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      pin, 
      coins, 
      totalCoinsEarned, 
      streak, 
      lastActiveDate, 
      quests, 
      rewards, 
      tickets, 
      history,
      metrics,
      userHeightCm
    } = body;

    if (!pin) {
      return NextResponse.json({ error: 'PIN is required' }, { status: 400 });
    }

    const saved = await saveRecordByPin(pin, {
      coins,
      totalCoinsEarned,
      streak,
      lastActiveDate,
      quests,
      rewards,
      tickets,
      history,
      metrics,
      userHeightCm,
    });

    return NextResponse.json({
      success: true,
      pin: saved.pin,
      updatedAt: saved.updatedAt,
      message: 'บันทึกข้อมูลเรียบร้อยแล้ว',
    });
  } catch {
    return NextResponse.json({ error: 'Server database write error' }, { status: 500 });
  }
}
