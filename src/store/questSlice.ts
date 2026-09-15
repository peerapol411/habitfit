import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Quest } from '@/types';
import { getLocalTodayKey } from '@/lib/dateUtils';

export const INITIAL_QUESTS: Quest[] = [
  // ---------------- 1. 🏃 ออกกำลังกาย & บอดี้เวท (FITNESS) ----------------
  {
    id: 'q-fit-1',
    title: 'ยืดเหยียดกล้ามเนื้อ คลายออฟฟิศซินโดรม 10 นาที',
    description: 'Stretching คลายกล้ามเนื้อคอ บ่า ไหล่ และหลัง คลายความตึงจากการนั่งทำงานหน้าจอคอมพิวเตอร์',
    difficulty: 'easy',
    category: 'fitness',
    rewardCoins: 15,
    completed: false,
    targetCount: 10,
    unit: 'นาที',
  },
  {
    id: 'q-fit-2',
    title: 'เดินสะสม 5,000 ก้าวในชีวิตประจำวัน',
    description: 'ขยับร่างกาย เดินเล่น หรือเดินขึ้นบันไดสะสมให้ครบ 5,000 ก้าวตลอดทั้งวัน',
    difficulty: 'easy',
    category: 'fitness',
    rewardCoins: 20,
    completed: false,
    targetCount: 5000,
    unit: 'ก้าว',
  },
  {
    id: 'q-fit-3',
    title: 'สควอท (Squats) 30 ครั้งในห้อง',
    description: 'กระชับต้นขา สะโพก และแกนกลางลำตัว เสริมเตาเผาผลาญไขมันชิ้นใหญ่ที่สุดของร่างกาย',
    difficulty: 'medium',
    category: 'fitness',
    rewardCoins: 35,
    completed: false,
    targetCount: 30,
    unit: 'ครั้ง',
  },
  {
    id: 'q-fit-4',
    title: 'วิดพื้นมาตรฐาน 30–40 ครั้ง',
    description: 'บอดี้เวทสร้างกล้ามเนื้ออก แขน และแกนกลางลำตัว แบ่งทำ 3–4 เซ็ตตามความฟิต',
    difficulty: 'hard',
    category: 'fitness',
    rewardCoins: 55,
    completed: false,
    targetCount: 40,
    unit: 'ครั้ง',
  },
  {
    id: 'q-fit-5',
    title: 'ออกกำลังกายเข้มข้น หรือวิ่ง 30–40 นาที',
    description: 'คาร์ดิโอ วิ่ง เดินเร็ว หรือเวทเทรนนิ่งต่อเนื่องอย่างน้อย 30 นาที เผาผลาญพลังงานเต็มที่',
    difficulty: 'hard',
    category: 'fitness',
    rewardCoins: 70,
    completed: false,
    targetCount: 35,
    unit: 'นาที',
  },

  // ---------------- 2. 🧠 พัฒนาตัวเอง & การเรียนรู้ (LEARNING) ----------------
  {
    id: 'q-learn-1',
    title: 'อ่านหนังสือพัฒนาตัวเอง หรือบทความคุณภาพ 10–15 หน้า',
    description: 'เติมความรู้และไอเดียใหม่ๆ สละเวลา 15 นาทีอ่านหนังสือหรือบทความเชิงลึก',
    difficulty: 'easy',
    category: 'learning',
    rewardCoins: 20,
    completed: false,
    targetCount: 15,
    unit: 'หน้า',
  },
  {
    id: 'q-learn-2',
    title: 'ฟัง Podcast สาระความรู้ หรือดูคลิปพัฒนาตนเอง 1 ตอน',
    description: 'ฟังสาระความรู้ด้านธุรกิจ การเงิน จิตวิทยา หรือเทคโนโลยี 15–30 นาทีตอนเดินทางหรือพักผ่อน',
    difficulty: 'medium',
    category: 'learning',
    rewardCoins: 25,
    completed: false,
    targetCount: 20,
    unit: 'นาที',
  },
  {
    id: 'q-learn-3',
    title: 'ฝึกฝนทักษะงาน / Coding / ภาษาต่างประเทศ 25 นาที (Deep Work)',
    description: 'โฟกัสเต็มที่กับการอัปสกิลงาน เขียนโค้ด หรือฝึกภาษา 25 นาทีแบบไม่แตะโทรศัพท์',
    difficulty: 'hard',
    category: 'learning',
    rewardCoins: 50,
    completed: false,
    targetCount: 25,
    unit: 'นาที',
  },
  {
    id: 'q-learn-4',
    title: 'ทบทวนบทเรียนประจำวัน & วางแผน To-Do List สำหรับวันพรุ่งนี้',
    description: 'สรุปสิ่งที่ทำสำเร็จในวันนี้ และจัดลำดับความสำคัญ 3 สิ่งที่ต้องทำในวันพรุ่งนี้ก่อนเข้านอน',
    difficulty: 'easy',
    category: 'learning',
    rewardCoins: 15,
    completed: false,
    targetCount: 1,
    unit: 'ครั้ง',
  },

  // ---------------- 3. 🥗 สุขภาพกาย & สกินแคร์ (PHYSICAL HEALTH) ----------------
  {
    id: 'q-health-1',
    title: 'ดื่มน้ำสะอาดสะสม 2,000–2,500 มล. ตลอดวัน',
    description: 'จิบน้ำเปล่าสะอาดตลอดทั้งวัน ช่วยกระตุ้นระบบเผาผลาญ สมองปลอดโปร่ง และลดอาการบวมน้ำ',
    difficulty: 'easy',
    category: 'health',
    rewardCoins: 20,
    completed: false,
    targetCount: 2500,
    unit: 'มล.',
  },
  {
    id: 'q-health-2',
    title: 'กฎ 20-20-20: พักสายตาและลุกเปลี่ยนอิริยาบถจากหน้าจอ',
    description: 'มองไกล 20 ฟุตเป็นเวลา 20 วินาที และลุกเดินยืดเส้นยืดสายทุกๆ 1-2 ชั่วโมงของการทำงาน',
    difficulty: 'easy',
    category: 'health',
    rewardCoins: 15,
    completed: false,
    targetCount: 3,
    unit: 'รอบ',
  },
  {
    id: 'q-health-3',
    title: 'ออกไปรับแสงแดดอ่อนๆ ยามเช้า 10–15 นาที',
    description: 'รับแสงแดดธรรมชาติช่วงเช้า ช่วยกระตุ้นฮอร์โมน ปรับนาฬิกาชีวิต และเพิ่มพลังงานความสดชื่น',
    difficulty: 'easy',
    category: 'health',
    rewardCoins: 15,
    completed: false,
    targetCount: 15,
    unit: 'นาที',
  },
  {
    id: 'q-health-4',
    title: 'ทานมื้ออาหารที่ดีต่อสุขภาพ (เน้นโปรตีน เลี่ยงหวานมันทอด)',
    description: 'เลือกทานอาหารที่มีประโยชน์ เช่น อกไก่ ไข่ ปลา ผักผลไม้ และลดของหวานทอดมัน 1 มื้อเต็มๆ',
    difficulty: 'medium',
    category: 'health',
    rewardCoins: 30,
    completed: false,
    targetCount: 1,
    unit: 'มื้อ',
  },
  {
    id: 'q-health-5',
    title: 'นอนหลับพักผ่อนเต็มอิ่ม 7–8 ชั่วโมง (เข้านอนตรงเวลา)',
    description: 'ให้ร่างกายและสมองได้ฟื้นฟูเซลล์อย่างสมบูรณ์ เข้านอนตรงตามเวลาที่ตั้งใจ',
    difficulty: 'medium',
    category: 'health',
    rewardCoins: 35,
    completed: false,
    targetCount: 8,
    unit: 'ชม.',
  },
  {
    id: 'q-health-6',
    title: 'Self-Care วันพิเศษ: อาบน้ำใหญ่ ขัดผิว มาร์คหน้า ทาครีมครบเซ็ต',
    description: 'กิจวัตรปรนนิบัติร่างกายเต็มรูปแบบ ขัดตัว มาร์คหน้า และบำรุงผิวให้สดชื่นรักตัวเอง',
    difficulty: 'hard',
    category: 'health',
    rewardCoins: 50,
    completed: false,
    targetCount: 1,
    unit: 'เซ็ต',
  },

  // ---------------- 4. 🧘 สุขภาพใจ & สมาธิ (MINDFULNESS) ----------------
  {
    id: 'q-mind-1',
    title: 'Digital Detox: วางมือถืองดเล่นโซเชียล 30 นาทีก่อนนอน',
    description: 'งดเสพข่าวดราม่าและแสงสีฟ้า 30 นาทีก่อนนอน ช่วยให้สมองสงบและหลับลึกอย่างมีคุณภาพ',
    difficulty: 'easy',
    category: 'mind',
    rewardCoins: 20,
    completed: false,
    targetCount: 30,
    unit: 'นาที',
  },
  {
    id: 'q-mind-2',
    title: 'ฝึกหายใจลึกๆ หรือนั่งสมาธิผ่อนคลาย 5–10 นาที',
    description: 'ฝึกสติอยู่กับลมหายใจเข้าออกช้าๆ ปล่อยวางความกังวลและความเครียดสะสมของวัน',
    difficulty: 'easy',
    category: 'mind',
    rewardCoins: 20,
    completed: false,
    targetCount: 10,
    unit: 'นาที',
  },
  {
    id: 'q-mind-3',
    title: 'จัดโต๊ะทำงานหรือห้องนอนให้สะอาด โล่งตา',
    description: 'จัดเก็บของบนโต๊ะให้เป็นระเบียบ สภาพแวดล้อมที่โปร่งโล่งช่วยให้จิตใจสงบและมีสมาธิ',
    difficulty: 'medium',
    category: 'mind',
    rewardCoins: 25,
    completed: false,
    targetCount: 1,
    unit: 'ครั้ง',
  },
  {
    id: 'q-mind-4',
    title: 'ขอบคุณ 3 สิ่งดีๆ ในชีวิต หรือชื่นชมความพยายามของตัวเอง',
    description: 'จดจำและบันทึกความรู้สึกขอบคุณต่อสิ่งดีๆ หรือสิ่งที่ทำได้สำเร็จในวันนี้ 3 ข้อ',
    difficulty: 'easy',
    category: 'mind',
    rewardCoins: 15,
    completed: false,
    targetCount: 3,
    unit: 'ข้อ',
  },
  {
    id: 'q-mind-5',
    title: 'เขียน Emotional Journal บันทึกความรู้สึกและอารมณ์ของวัน',
    description: 'เขียนระบายและรับรู้อารมณ์ของตนเองอย่างซื่อสัตย์ รับฟังจิตใจและปล่อยวางความเหนื่อยล้า',
    difficulty: 'medium',
    category: 'mind',
    rewardCoins: 30,
    completed: false,
    targetCount: 1,
    unit: 'หน้า',
  },
];

interface QuestState {
  quests: Quest[];
  lastResetDate: string;
}

const initialState: QuestState = {
  quests: INITIAL_QUESTS,
  lastResetDate: '',
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
      state.lastResetDate = getLocalTodayKey();
      state.quests.forEach((q) => {
        q.completed = false;
      });
    },
    checkAndResetForDate: (
      state,
      action: PayloadAction<{ todayDate: string; completedQuestIds?: string[] }>
    ) => {
      const { todayDate, completedQuestIds = [] } = action.payload;
      state.lastResetDate = todayDate;
      const todaySet = new Set(completedQuestIds);
      state.quests.forEach((q) => {
        q.completed = todaySet.has(q.id);
      });
    },
    syncQuestsWithTodayHistory: (state, action: PayloadAction<string[]>) => {
      const todaySet = new Set(action.payload);
      state.lastResetDate = getLocalTodayKey();
      state.quests.forEach((q) => {
        q.completed = todaySet.has(q.id);
      });
    },
    forceResetQuestsForToday: (state) => {
      state.lastResetDate = getLocalTodayKey();
      state.quests.forEach((q) => {
        q.completed = false;
      });
    },
    setQuestsState: (
      state,
      action: PayloadAction<
        | Quest[]
        | {
            quests: Quest[];
            lastResetDate?: string;
            todayCompletedQuestIds?: string[];
          }
      >
    ) => {
      let incomingQuests: Quest[] = [];
      let todayCompletedSet: Set<string> | null = null;

      if (Array.isArray(action.payload)) {
        incomingQuests = action.payload;
      } else if (action.payload && action.payload.quests) {
        incomingQuests = action.payload.quests;
        if (action.payload.lastResetDate) {
          state.lastResetDate = action.payload.lastResetDate;
        }
        if (action.payload.todayCompletedQuestIds !== undefined) {
          todayCompletedSet = new Set(action.payload.todayCompletedQuestIds);
        }
      }

      const incomingMap = new Map(incomingQuests.map((q) => [q.id, q]));

      // Smart Merge: ensure all INITIAL_QUESTS exist, synchronize completion with today's history
      const mergedQuests: Quest[] = INITIAL_QUESTS.map((initial) => {
        const existing = incomingMap.get(initial.id);
        if (existing) {
          incomingMap.delete(initial.id);
          const isCompleted =
            todayCompletedSet !== null
              ? todayCompletedSet.has(initial.id)
              : (existing.completed ?? false);
          return {
            ...initial,
            completed: isCompleted,
          };
        }
        return {
          ...initial,
          completed: todayCompletedSet !== null ? todayCompletedSet.has(initial.id) : false,
        };
      });

      // Preserve any remaining custom quests created by the user
      incomingMap.forEach((quest) => {
        if (quest.isCustom) {
          const isCompleted =
            todayCompletedSet !== null
              ? todayCompletedSet.has(quest.id)
              : (quest.completed ?? false);
          mergedQuests.push({
            ...quest,
            completed: isCompleted,
          });
        }
      });

      state.quests = mergedQuests;
    },
  },
});

export const {
  toggleQuest,
  addCustomQuest,
  editQuest,
  deleteQuest,
  resetDailyQuests,
  checkAndResetForDate,
  syncQuestsWithTodayHistory,
  forceResetQuestsForToday,
  setQuestsState,
} = questSlice.actions;

export default questSlice.reducer;
