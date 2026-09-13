import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RewardItem, RedeemedTicket } from '@/types';

export const INITIAL_REWARDS: RewardItem[] = [
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
    id: 'rew-2',
    title: 'กาแฟแก้วโปรด / ชานมหวานน้อย 1 แก้ว',
    description: 'ให้รางวัลตัวเองด้วยเครื่องดื่มแก้วโปรด ดื่มอย่างมีสติและมีความสุข',
    costCoins: 120,
    icon: 'coffee',
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
    id: 'rew-4',
    title: 'เล่นเกมมาราธอน 2 ชั่วโมง',
    description: 'เล่นเกมโปรดแบบมาราธอน 2 ชม. เต็ม ปลดปล่อยความเครียดจากการทำงาน',
    costCoins: 350,
    icon: 'gamepad',
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
      state.rewards = action.payload.rewards;
      state.tickets = action.payload.tickets;
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
