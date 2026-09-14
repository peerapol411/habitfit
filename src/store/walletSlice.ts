import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RewardItem, RedeemedTicket } from '@/types';

export const INITIAL_REWARDS: RewardItem[] = [
  // Tier 1: Daily Quick Treats (35 - 85 Coins)
  {
    id: 'rew-6',
    title: 'น้ำอัดลม No Sugar ชื่นใจ 0 แคล 1 กระป๋อง',
    description: 'ดื่มน้ำอัดลม No Sugar เย็นเฉียบชื่นใจหลังออกกำลังกายหรือตอนเล่นเกม สดชื่นแบบ 0 แคลอรี่',
    costCoins: 35,
    icon: 'drink',
    category: 'food',
    timesRedeemed: 0,
  },
  {
    id: 'rew-7',
    title: 'ดูสตรีมเมอร์ / สตรีมเกมที่ชอบ 1 ชั่วโมง',
    description: 'พักสายตาดูสตรีมเมอร์คนโปรดเล่นเกม หรือดูคอนเทนต์สนุกๆ 1 ชั่วโมงเต็ม ไร้กังวล',
    costCoins: 45,
    icon: 'stream',
    category: 'leisure',
    timesRedeemed: 0,
  },
  {
    id: 'rew-1',
    title: 'ดูซีรีส์ / YouTube 1 ตอน (1 ชม.)',
    description: 'พักสายตาและผ่อนคลายกับคอนเทนต์ที่ชอบ 1 ตอนเต็มๆ โดยไม่รู้สึกผิด',
    costCoins: 50,
    icon: 'tv',
    category: 'leisure',
    timesRedeemed: 0,
  },
  {
    id: 'rew-8',
    title: 'ไอศกรีมพรีเมียม / รสโปรด 1 ถ้วย',
    description: 'ดื่มด่ำกับไอศกรีมรสโปรด ให้ความหวานเย็นฮีลใจ ฉลองความพยายามในการออกกำลังกาย',
    costCoins: 75,
    icon: 'icecream',
    category: 'food',
    timesRedeemed: 0,
  },
  {
    id: 'rew-9',
    title: 'เซ็ตขนมขบเคี้ยว / ป๊อปคอร์น ตอนเล่นเกมหรือดูซีรีส์',
    description: 'ขนมกรุบกรอบหรือป๊อปคอร์นไว้เคี้ยวเพลินๆ ระหว่างลงดันเจี้ยนเล่นเกม หรือดูซีรีส์เรื่องยาว',
    costCoins: 85,
    icon: 'snack',
    category: 'food',
    timesRedeemed: 0,
  },

  // Tier 2: Mid-Tier Fun & Sessions (120 - 380 Coins)
  {
    id: 'rew-2',
    title: 'กาแฟแก้วโปรด / ชานมหวานน้อย 1 แก้ว',
    description: 'ให้รางวัลตัวเองด้วยเครื่องดื่มแก้วโปรด ดื่มอย่างมีสติและมีความสุข',
    costCoins: 120,
    icon: 'coffee',
    category: 'food',
    timesRedeemed: 0,
  },
  {
    id: 'rew-10',
    title: 'สั่งมื้อดึกเดลิเวอรี่รอบดึก 1 มื้อ (Late-Night Snack)',
    description: 'ปลดล็อกสิทธิ์สั่งของกินรอบดึกเดลิเวอรี่ตอนเล่นเกมดึกๆ กินให้อิ่มฟินแบบ 100% Guilt-Free',
    costCoins: 180,
    icon: 'latenight',
    category: 'food',
    timesRedeemed: 0,
  },
  {
    id: 'rew-3',
    title: 'ตั๋วนอนตื่นสายในวันหยุด 1 วัน',
    description: 'สิทธิ์นอนตื่นสายโดยไม่ต้องตั้งนาฬิกาปลุก ชาร์จพลังงานให้เต็มที่',
    costCoins: 200,
    icon: 'bed',
    category: 'rest',
    timesRedeemed: 0,
  },
  {
    id: 'rew-11',
    title: 'ฟาสต์ฟู้ดคอมโบ (พิซซ่า / เบอร์เกอร์ชิ้นโต / ไก่ทอดกรอบ)',
    description: 'มื้อฟาสต์ฟู้ดสะใจ ไก่ทอด เบอร์เกอร์ หรือพิซซ่าถาดโปรด เติมพลังงานหลังจากคาร์ดิโอหนัก',
    costCoins: 280,
    icon: 'fastfood',
    category: 'food',
    timesRedeemed: 0,
  },
  {
    id: 'rew-4',
    title: 'เล่นเกมมาราธอน 2 ชั่วโมง',
    description: 'เล่นเกมโปรดแบบมาราธอน 2 ชม. เต็ม ปลดปล่อยความเครียดจากการทำงาน',
    costCoins: 350,
    icon: 'gamepad',
    category: 'leisure',
    timesRedeemed: 0,
  },
  {
    id: 'rew-12',
    title: 'เติมเกม / ซื้อ Battle Pass / เติมไอเทมในเกม',
    description: 'เปลี่ยนหยาดเหงื่อเป็นเพชรในเกม! ปลดล็อกงบเติม Battle Pass สกิน หรือไอเทมใหม่ในเกมที่เล่น',
    costCoins: 380,
    icon: 'gamepass',
    category: 'leisure',
    timesRedeemed: 0,
  },

  // Tier 3: Epic Feasts & Steam Games (650 - 800 Coins)
  {
    id: 'rew-13',
    title: 'ปาร์ตี้บุฟเฟต์ชาบู / หมูกระทะ / ปิ้งย่าง / สเต็กเนื้อชิ้นโต',
    description: 'Cheat Day ระดับแชมเปี้ยน! จัดเต็มบุฟเฟต์ปิ้งย่าง ชาบู หรือสเต็กเนื้อเน้นโปรตีน ฉลองวินัยการฟิตเนส',
    costCoins: 650,
    icon: 'buffet',
    category: 'food',
    timesRedeemed: 0,
  },
  {
    id: 'rew-14',
    title: 'กดซื้อเกมใหม่ใน Steam / คอนโซล 1 เกม (ใน Wishlist)',
    description: 'รางวัลสำหรับเกมเมอร์ตัวจริง ปลดล็อกสิทธิ์กดซื้อเกมใหม่ที่เล็งไว้ใน Wishlist มาเล่นให้หนำใจ',
    costCoins: 750,
    icon: 'steam',
    category: 'leisure',
    timesRedeemed: 0,
  },
  {
    id: 'rew-5',
    title: 'งบช้อปปิ้งของที่อยากได้ / มื้อพิเศษ',
    description: 'ปลดล็อกสิทธิ์ซื้อของขวัญให้ตัวเอง หรือทานอาหารมื้อพิเศษเพื่อฉลองความพยายาม',
    costCoins: 800,
    icon: 'shopping-bag',
    category: 'shopping',
    timesRedeemed: 0,
  },

  // Tier 4: High-End Lifestyle & Ultimate Grand Trophy (1,200 - 3,500 Coins)
  {
    id: 'rew-15',
    title: 'อัปเกรด Gaming Gear / Gadget ใหม่ (เมาส์, หูฟัง, คีย์บอร์ด)',
    description: 'งบช้อปปิ้งอุปกรณ์เล่นเกมหรือไอทีชิ้นใหม่ เพิ่มความคมให้ทั้งโต๊ะคอมและโต๊ะทำงาน',
    costCoins: 1200,
    icon: 'gaminggear',
    category: 'shopping',
    timesRedeemed: 0,
  },
  {
    id: 'rew-16',
    title: 'งบช้อปปิ้งเสื้อผ้า / รองเท้าผ้าใบ / ชุดออกกำลังกายใหม่',
    description: 'ให้รางวัลตัวเองด้วยรองเท้าผ้าใบคู่ใหม่ หรือชุดออกกำลังกายเท่ๆ เพิ่มไฟให้การดูแลตัวเอง',
    costCoins: 1600,
    icon: 'shoes',
    category: 'shopping',
    timesRedeemed: 0,
  },
  {
    id: 'rew-17',
    title: '🌟 บอสใหญ่: เครื่องเกม Nintendo Switch 2 (Ultimate Trophy)',
    description: 'สุดยอดรางวัลชีวิตระดับตำนาน! รางวัลแห่งความพยายามและวินัยเหล็กระยะยาว เพื่อฉลองก้าวสำคัญในการเปลี่ยนชีวิต',
    costCoins: 3500,
    icon: 'switch',
    category: 'shopping',
    timesRedeemed: 0,
  },
];

interface WalletState {
  coins: number;
  totalCoinsEarned: number;
  rewards: RewardItem[];
  tickets: RedeemedTicket[];
}

const initialState: WalletState = {
  coins: 0,
  totalCoinsEarned: 0,
  rewards: INITIAL_REWARDS,
  tickets: [],
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addCoins: (state, action: PayloadAction<number>) => {
      state.coins += action.payload;
      state.totalCoinsEarned += action.payload;
    },
    subtractCoins: (state, action: PayloadAction<number>) => {
      state.coins = Math.max(0, state.coins - action.payload);
    },
    redeemReward: (state, action: PayloadAction<string>) => {
      const reward = state.rewards.find((r) => r.id === action.payload);
      if (reward && state.coins >= reward.costCoins) {
        state.coins -= reward.costCoins;
        reward.timesRedeemed += 1;
        const newTicket: RedeemedTicket = {
          id: `tkt-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
          rewardId: reward.id,
          rewardTitle: reward.title,
          costCoins: reward.costCoins,
          redeemedAt: new Date().toISOString(),
          isUsed: false,
          usedAt: null,
        };
        state.tickets.unshift(newTicket);
      }
    },
    useTicket: (state, action: PayloadAction<string>) => {
      const ticket = state.tickets.find((t) => t.id === action.payload);
      if (ticket && !ticket.isUsed) {
        ticket.isUsed = true;
        ticket.usedAt = new Date().toISOString();
      }
    },
    addCustomReward: (state, action: PayloadAction<Omit<RewardItem, 'id' | 'timesRedeemed'>>) => {
      const newReward: RewardItem = {
        ...action.payload,
        id: `custom-rew-${Date.now()}`,
        timesRedeemed: 0,
        isCustom: true,
      };
      state.rewards.push(newReward);
    },
    deleteReward: (state, action: PayloadAction<string>) => {
      state.rewards = state.rewards.filter((r) => r.id !== action.payload);
    },
    setWalletState: (
      state,
      action: PayloadAction<{
        coins: number;
        totalCoinsEarned: number;
        rewards: RewardItem[];
        tickets: RedeemedTicket[];
      }>
    ) => {
      state.coins = action.payload.coins;
      state.totalCoinsEarned = action.payload.totalCoinsEarned;

      // Smart Merge: Ensure all 17 INITIAL_REWARDS exist while preserving user redeem counts and custom items
      const incomingRewards = action.payload.rewards || [];
      const incomingMap = new Map(incomingRewards.map((r) => [r.id, r]));

      const mergedRewards: RewardItem[] = INITIAL_REWARDS.map((initial) => {
        if (incomingMap.has(initial.id)) {
          const existing = incomingMap.get(initial.id)!;
          incomingMap.delete(initial.id);
          return {
            ...initial,
            timesRedeemed: existing.timesRedeemed || 0,
          };
        }
        return initial;
      });

      // Preserve any remaining custom rewards created by user
      incomingMap.forEach((reward) => {
        mergedRewards.push(reward);
      });

      state.rewards = mergedRewards;
      state.tickets = action.payload.tickets || [];
    },
  },
});

export const {
  addCoins,
  subtractCoins,
  redeemReward,
  useTicket,
  addCustomReward,
  deleteReward,
  setWalletState,
} = walletSlice.actions;

export default walletSlice.reducer;
