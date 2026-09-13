import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Quest } from '@/types';

export const INITIAL_QUESTS: Quest[] = [
  // Easy (ง่าย) 🟢
  {
    id: 'q-easy-1',
    title: 'ดื่มน้ำเปล่า 2,000 มล.',
    description: 'จิบน้ำเปล่าสะอาดตลอดวัน ช่วยกระตุ้นระบบเผาผลาญและระบบขับถ่าย',
    difficulty: 'easy',
    rewardCoins: 15,
    completed: false,
    targetCount: 2000,
    unit: 'มล.',
  },
  {
    id: 'q-easy-2',
    title: 'เดินสะสม 4,000 ก้าว',
    description: 'ขยับร่างกาย เดินเล่น หรือเดินขึ้นบันไดสะสมให้ครบ 4,000 ก้าว',
    difficulty: 'easy',
    rewardCoins: 20,
    completed: false,
    targetCount: 4000,
    unit: 'ก้าว',
  },
  {
    id: 'q-easy-3',
    title: 'ยืดเหยียดกล้ามเนื้อ 10 นาที',
    description: 'Stretching คลายกล้ามเนื้อคอ บ่า ไหล่ และหลัง ลดอาการออฟฟิศซินโดรม',
    difficulty: 'easy',
    rewardCoins: 15,
    completed: false,
    targetCount: 10,
    unit: 'นาที',
  },

  // Medium (ปานกลาง) 🟡
  {
    id: 'q-med-1',
    title: 'ดื่มน้ำสะอาด 2.5 ลิตร',
    description: 'ดื่มน้ำสะอาด 2,500 มล. ช่วยให้ผิวพรรณสดใส ลดอาการบวมน้ำ',
    difficulty: 'medium',
    rewardCoins: 25,
    completed: false,
    targetCount: 2500,
    unit: 'มล.',
  },
  {
    id: 'q-med-2',
    title: 'เดินเร็วหรือวิ่งเบาๆ 7,000 ก้าว',
    description: 'คาร์ดิโอระดับเบิร์นไขมันต่อเนื่อง สะสมให้ครบ 7,000 ก้าว',
    difficulty: 'medium',
    rewardCoins: 35,
    completed: false,
    targetCount: 7000,
    unit: 'ก้าว',
  },
  {
    id: 'q-med-3',
    title: 'สควอท (Squats) 30 ครั้ง',
    description: 'กระชับต้นขาและสะโพก เสริมเตาเผาผลาญไขมันชิ้นใหญ่ที่สุดของร่างกาย',
    difficulty: 'medium',
    rewardCoins: 35,
    completed: false,
    targetCount: 30,
    unit: 'ครั้ง',
  },

  // Hard (ยาก) 🔴
  {
    id: 'q-hard-1',
    title: 'วิดพื้นมาตรฐาน 40 ครั้ง',
    description: 'แบ่งเซ็ตวิดพื้น เสริมสร้างกล้ามเนื้ออก แขน และแกนกลางลำตัว',
    difficulty: 'hard',
    rewardCoins: 55,
    completed: false,
    targetCount: 40,
    unit: 'ครั้ง',
  },
  {
    id: 'q-hard-2',
    title: 'สควอทเข้มข้น 60 ครั้ง',
    description: 'บอดี้เวทเข้มข้น แบ่งทำ 3-4 เซ็ต เซ็ตละ 15-20 ครั้ง',
    difficulty: 'hard',
    rewardCoins: 60,
    completed: false,
    targetCount: 60,
    unit: 'ครั้ง',
  },
  {
    id: 'q-hard-3',
    title: 'พิชิต 10,000 ก้าว หรือ วิ่ง 5 กม.',
    description: 'เผาผลาญแคลอรีขั้นสูง ด้วยการเดินเร็ว 10,000 ก้าว หรือวิ่งระยะ 5 กม.',
    difficulty: 'hard',
    rewardCoins: 75,
    completed: false,
    targetCount: 10000,
    unit: 'ก้าว',
  },
  {
    id: 'q-hard-4',
    title: 'ออกกำลังกายต่อเนื่อง 40 นาที',
    description: 'เวทเทรนนิ่ง ฟิตเนส โยคะ หรือปั่นจักรยานต่อเนื่องอย่างน้อย 40 นาที',
    difficulty: 'hard',
    rewardCoins: 70,
    completed: false,
    targetCount: 40,
    unit: 'นาที',
  },
];

interface QuestState {
  quests: Quest[];
}

const initialState: QuestState = {
  quests: INITIAL_QUESTS,
};

export const questSlice = createSlice({
  name: 'quest',
  initialState,
  reducers: {
    toggleQuest: (state, action: PayloadAction<string>) => {
      const quest = state.quests.find((q) => q.id === action.payload);
      if (quest) {
        quest.completed = !quest.completed;
      }
    },
    addCustomQuest: (state, action: PayloadAction<Omit<Quest, 'id' | 'completed'>>) => {
      const newQuest: Quest = {
        ...action.payload,
        id: `custom-q-${Date.now()}`,
        completed: false,
        isCustom: true,
      };
      state.quests.push(newQuest);
    },
    editQuest: (state, action: PayloadAction<Quest>) => {
      const index = state.quests.findIndex((q) => q.id === action.payload.id);
      if (index !== -1) {
        state.quests[index] = action.payload;
      }
    },
    deleteQuest: (state, action: PayloadAction<string>) => {
      state.quests = state.quests.filter((q) => q.id !== action.payload);
    },
    resetDailyQuests: (state) => {
      state.quests.forEach((q) => {
        q.completed = false;
      });
    },
    setQuestsState: (state, action: PayloadAction<Quest[]>) => {
      state.quests = action.payload;
    },
  },
});

export const {
  toggleQuest,
  addCustomQuest,
  editQuest,
  deleteQuest,
  resetDailyQuests,
  setQuestsState,
} = questSlice.actions;

export default questSlice.reducer;
