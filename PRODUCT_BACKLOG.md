# 📋 HabitFit — Product Backlog Items (PBI) & Roadmap
**Version:** 1.0.0  
**Architecture:** Next.js Full-stack (App Router) + React + Redux Toolkit + Tailwind CSS + Web Audio API  
**Concept:** Minimalist Apple Health / Notion Style (No Game RPG, Focus on Habits & Real Rewards)  

---

## 🗺️ แผนผัง Sprint & Status Overview

| Sprint | เป้าหมายหลัก | PBI ที่เกี่ยวข้อง | สถานะ |
| :--- | :--- | :--- | :--- |
| **Sprint 1** | **Core Daily Quests & Minimalist UI** | PBI-001, PBI-002 | 🟢 **DONE** |
| **Sprint 2** | **Rewards Shop & Life Rewards Ecosystem** | PBI-003, PBI-004 | 🟢 **DONE** |
| **Sprint 3** | **Habit Tracking & Consistency Engine** | PBI-005, PBI-006 | 🟢 **DONE** |
| **Sprint 4** | **Seamless Cross-Device Sync & Persistence** | PBI-007, PBI-008, PBI-009 | 🟢 **DONE** |
| **Sprint 5** | **Advanced Insights & Mobile PWA** | PBI-010, PBI-011, PBI-012 | 🟢 **DONE** |
| **Sprint 6** | **Global Cloud Persistence & Real Data Engine** | PBI-013, PBI-014, PBI-015, PBI-016 | 🟢 **DONE** |
| **Sprint 7** | **1-Month Calendar History & Daily Wisdom Quotes** | PBI-017, PBI-018 | 🟢 **DONE** |
| **Sprint 8** | **Personalized Lifestyle Rewards & Milestone Ecosystem** | PBI-019 | 🟢 **DONE** |

---

## 📦 รายละเอียด Product Backlog Items (PBI)

### [SPRINT 1] Core Daily Quests & Minimalist UI

#### 🔷 PBI-001: Minimalist Daily Quests System (Easy / Medium / Hard)
* **Status:** 🟢 **DONE**
* **Priority:** Highest (P0)
* **Acceptance Criteria (DoD):**
  - [x] ออกแบบเควสต์มาตรฐาน 3 ระดับ: ง่าย (Easy) 🟢, ปานกลาง (Medium) 🟡, ยาก (Hard) 🔴
  - [x] ปุ่ม Checkbox แบบ 1-Click ติ๊กสำเร็จทันที พร้อมบวกเหรียญเข้ากระเป๋าและเสียง Chime สไตล์ Apple
  - [x] แถบฟิลเตอร์กรองเควสต์: ทั้งหมด, ง่าย, ปานกลาง, ยาก, สำเร็จแล้ว
  - [x] แถบคำนวณ Progress Bar แสดงความคืบหน้าของวัน

#### 🔷 PBI-002: Custom Quest Creator & Editor
* **Status:** 🟢 **DONE**
* **Priority:** High (P1)
* **Acceptance Criteria (DoD):**
  - [x] หน้าต่าง Modal "+ สร้างเควสต์เพิ่ม" ระบุชื่อ, คำอธิบาย, ระดับความยาก, และเหรียญรางวัล
  - [x] สามารถลบเควสต์ที่สร้างเองได้
  - [x] บันทึกลง Redux Store และ LocalStorage อัตโนมัติ

---

### [SPRINT 2] Rewards Shop & Life Rewards Ecosystem

#### 🔷 PBI-003: Coin Wallet & Self-Reward Marketplace
* **Status:** 🟢 **DONE**
* **Priority:** Highest (P0)
* **Acceptance Criteria (DoD):**
  - [x] กระเป๋าเหรียญ (Coins Wallet) แสดงยอดเงินคงเหลือและยอดสะสมตลอดชีพ
  - [x] มีรายการรางวัลชีวิตจริงตั้งต้น (ดูซีรีส์, ขนม/ชานม, นอนตื่นสาย, เล่นเกม, ช้อปปิ้ง)
  - [x] ตรวจสอบเหรียญก่อนแลก: หากเหรียญพอ กดแลกจะหักเงินและได้รับตั๋วรางวัล พร้อมเอฟเฟกต์ Confetti
  - [x] รองรับการเพิ่มของรางวัลของตัวเองและกำหนดราคาเหรียญได้อิสระ

#### 🔷 PBI-004: Ticket Voucher Inventory & Redemption History
* **Status:** 🟢 **DONE**
* **Priority:** High (P1)
* **Acceptance Criteria (DoD):**
  - [x] แท็บ "ตั๋วของฉัน" แสดงตั๋วที่แลกไว้ทั้งหมด พร้อมรหัสตั๋วและวันเวลาที่แลก
  - [x] มีปุ่ม "กดใช้สิทธิ์" เพื่อบันทึกสถานะว่าใช้งานรางวัลนั้นไปแล้ว
  - [x] แยกการแสดงผลระหว่างตั๋วที่ยังไม่ใช้ และตั๋วที่ใช้แล้ว

---

### [SPRINT 3] Habit Tracking & Consistency Engine

#### 🔷 PBI-005: Daily Streak Counter & Midnight Auto-Reset
* **Status:** 🟢 **DONE**
* **Priority:** High (P1)
* **Acceptance Criteria (DoD):**
  - [x] นับจำนวนวันออกกำลังกายต่อเนื่อง (Daily Streak 🔥)
  - [x] ตรวจสอบวันที่ใช้งานอัตโนมัติ: หากข้ามวันจะรีเซ็ตสถานะเควสต์เป็นยังไม่ทำ เพื่อให้เริ่มวันใหม่ได้ทันที
  - [x] บันทึกและคำนวณความต่อเนื่องตามวันจริง

#### 🔷 PBI-006: 7-Day Visual Activity Log & Habit Tracker
* **Status:** 🟢 **DONE**
* **Priority:** Medium (P2)
* **Acceptance Criteria (DoD):**
  - [x] ตารางแสดงประวัติ 7 วันล่าสุด (จันทร์-อาทิตย์) ในสไตล์มินิมอล
  - [x] แสดงวงกลมสีเขียวเมื่อมีกิจกรรม พร้อมจำนวนเหรียญที่ได้รับในแต่ละวัน

---

### [SPRINT 4] Seamless Cross-Device Sync & Persistence

#### 🔷 PBI-007: QR Code & 6-digit PIN Instant Device Pairing
* **Status:** 🟢 **DONE**
* **Priority:** Highest (P0)
* **Acceptance Criteria (DoD):**
  - [x] สร้าง PIN 6 หลักประจำตัว (เช่น `FIT-1001`)
  - [x] หน้าต่าง "เชื่อมมือถือ" แสดง QR Code ที่สร้างแบบเรียลไทม์
  - [x] มือถือสแกนแล้วเปิดใช้งานและซิงก์ข้อมูลได้ทันทีผ่านพารามิเตอร์ `?pin=...`
  - [x] มีช่องกรอก PIN สำหรับสลับเชื่อมต่อเครื่องอื่น

#### 🔷 PBI-008: Real-Time Heartbeat Synchronization Engine
* **Status:** 🟢 **DONE**
* **Priority:** High (P0)
* **Acceptance Criteria (DoD):**
  - [x] Heartbeat Engine ตรวจสอบความเปลี่ยนแปลงของ Database ทุก 2.5 วินาที
  - [x] เมื่อกดติ๊กเควสต์บนมือถือ จอคอมจะอัปเดตตามทันทีแบบ Real-time ไม่ต้องรีเฟรช
  - [x] ซิงก์ทันทีเมื่อสลับแท็บกลับมา (`focus` / `visibilitychange`)
  - [x] มีไฟสถานะ Live Pulse สีเขียวบน Navbar
  - [x] ป้องกันปัญหา Timestamp Conflict และ Echo Ping-Pong

#### 🔷 PBI-009: Local File Database Persistence & JSON Backup/Restore
* **Status:** 🟢 **DONE**
* **Priority:** High (P1)
* **Acceptance Criteria (DoD):**
  - [x] บันทึกข้อมูลลงฐานข้อมูลไฟล์ `src/data/db.json` ฝั่งเซิร์ฟเวอร์
  - [x] มีปุ่ม "สำรองข้อมูล (JSON)" ดาวน์โหลดเก็บไว้ในเครื่อง
  - [x] มีปุ่ม "กู้คืนข้อมูล" โหลดไฟล์ JSON กลับมาใช้งานได้ทันที

---

### [SPRINT 5] Advanced Insights & Mobile PWA (Next Milestones)

#### 🔷 PBI-010: Body Metrics & Weight Progress Log (บันทึกน้ำหนักและสัดส่วน)
* **Status:** 🟢 **DONE**
* **Priority:** Medium (P2)
* **Estimation:** 3 Story Points
* **User Story:**
  > ในฐานะ **ผู้ที่ควบคุมน้ำหนัก**  
  > ฉันต้องการ **บันทึกน้ำหนักตัวและรอบเอวสัปดาห์ละครั้ง พร้อมรับเหรียญโบนัส**  
  > เพื่อที่ **ฉันจะได้เห็นพัฒนาการของร่างกายควบคู่ไปกับการทำเควสต์**
* **Acceptance Criteria (DoD):**
  - [x] มีหน้าต่าง/แท็บ "สัดส่วนร่างกาย (Body Metrics)" สไตล์มินิมอล Apple Health
  - [x] ฟอร์มบันทึก: น้ำหนัก (กก.), ส่วนสูง (ซม.), รอบเอว (นิ้ว), บันทึกย่อ
  - [x] คำนวณค่าดัชนีมวลกาย (BMI) อัตโนมัติ พร้อมแสดงป้ายแถบระดับสุขภาพ (สมส่วน, ท้วม, ฯลฯ)
  - [x] คำนวณความต่างของน้ำหนักเทียบกับครั้งก่อนหน้า (เช่น ↓ 0.7 กก. หรือ ↑ 0.3 กก.)
  - [x] แจกเหรียญโบนัสพิเศษ +50 Coins ทุกครั้งที่บันทึกน้ำหนัก เพื่อสร้างแรงจูงใจ
  - [x] ตารางแสดงประวัติการชั่งน้ำหนักย้อนหลัง พร้อมปุ่มลบรายการ
  - [x] ผูกเข้ากับ Redux, LocalStorage, และ Server Database Sync ข้ามอุปกรณ์เรียบร้อย

#### 🔷 PBI-011: Weekly Summary & Habit Insights (สรุปสถิติประจำสัปดาห์)
* **Status:** 🟢 **DONE**
* **Priority:** Low (P3)
* **Estimation:** 3 Story Points
* **User Story:**
  > ในฐานะ **ผู้ใช้งานประจำ**  
  > ฉันต้องการ **ดูสรุปจำนวนเควสต์ที่ทำสำเร็จในแต่ละสัปดาห์ และเหรียญทั้งหมดที่ได้รับ**  
  > เพื่อที่ **ฉันจะได้ประเมินความสม่ำเสมอของตัวเอง**
* **Acceptance Criteria (DoD):**
  - [x] มีแท็บ "สรุปสัปดาห์ & สถิติ (Weekly Insights)" สไตล์ Apple Health
  - [x] การ์ด 4 มิติสรุปสัปดาห์: เควสต์สำเร็จสัปดาห์นี้, เหรียญที่ได้รับในสัปดาห์, วันที่ออกกำลังกาย (/ 7 วัน), และสตรีคต่อเนื่อง
  - [x] กราฟแท่งกิจกรรม 7 วัน (Weekly Activity Bar Chart) แสดงความสูงตามจำนวนเควสต์ พร้อมไฮไลต์ "วันนี้"
  - [x] ระบบ Hover Tooltip บนแท่งกราฟ แสดงรายละเอียดเควสต์และเหรียญของแต่ละวัน
  - [x] คำแนะนำอัจฉริยะ (Smart Motivation Insight) วิเคราะห์อัตราความสม่ำเสมอและให้คำแนะนำสุขภาพ
  - [x] ตาราง 7-Day Consistency Circles แสดงสถานะรายวันแบบรวดเร็ว

#### 🔷 PBI-012: Progressive Web App (PWA) Offline & Add to Home Screen
* **Status:** 🟢 **DONE**
* **Priority:** Medium (P2)
* **Estimation:** 3 Story Points
* **User Story:**
  > ในฐานะ **ผู้ใช้งานบนมือถือ**  
  > ฉันต้องการ **กด 'Add to Home Screen' ติดตั้งแอปบนหน้าจอมือถือเหมือนแอปจริง และเปิดใช้งานได้แม้ไม่มีเน็ต**  
  > เพื่อที่ **ฉันจะได้เปิดแอปบันทึกเควสต์ได้อย่างรวดเร็วทุกที่ทุกเวลา**
* **Acceptance Criteria (DoD):**
  - [x] มีไฟล์ `public/manifest.json` กำหนดชื่อแอป, ธีมสี, Start URL, และไอคอนครบทุกขนาด
  - [x] มีไอคอนแอป HabitFit ความละเอียดสูง (SVG, 192x192 PNG, 512x512 Maskable PNG, Apple Touch Icon)
  - [x] มี Service Worker `public/sw.js` แคชไฟล์สำคัญเพื่อเปิดใช้งานออฟไลน์ได้ (Offline Capability)
  - [x] มีแบนเนอร์แจ้งเตือน "ติดตั้ง HabitFit บนมือถือ" พร้อมปุ่มกดติดตั้งสำหรับ Android/Chrome
  - [x] มีหน้าต่างแนะนำขั้นตอนการกด Add to Home Screen สำหรับผู้ใช้งาน iOS Safari
  - [x] รองรับ Standalone Display Mode แสดงผลเต็มจอไร้แถบ URL เสมือนแอป Native 100%

---

### [SPRINT 6] Global Cloud Persistence & Production Deployment (Vercel + Upstash)

#### 🔷 PBI-013: Dual-Engine Cloud Database Adapter (Upstash Redis + Local JSON Fallback)
* **Status:** 🟢 **DONE**
* **Priority:** Highest (P0)
* **Estimation:** 3 Story Points
* **User Story:**
  > ในฐานะ **ผู้ใช้งานที่ต้องการซิงก์ข้อมูลข้ามมือถือและคอมพิวเตอร์ตลอด 24 ชั่วโมงจากทุกที่**  
  > ฉันต้องการ **ให้ระบบเชื่อมต่อฐานข้อมูล Cloud (Upstash Redis) อัตโนมัติเมื่ออยู่บน Cloud และสลับกลับมาใช้ไฟล์ Local อัตโนมัติเมื่อเล่นออฟไลน์**  
  > เพื่อที่ **ฉันจะได้ไม่ต้องพิมพ์รหัสผ่าน ยังคงสแกน QR Code/PIN เดิมได้ แต่ข้อมูลซิงก์กันได้ทั่วโลกแบบถาวร**
* **Acceptance Criteria (DoD):**
  - [x] ติดตั้ง `@upstash/redis` สำหรับการเชื่อมต่อ Serverless REST Redis
  - [x] อัปเดต `src/lib/serverDb.ts` ให้ตรวจจับ Environment Variables `UPSTASH_REDIS_REST_URL` และ `UPSTASH_REDIS_REST_TOKEN`
  - [x] หากมี Key: ดึงและบันทึกข้อมูล `habitfit:{pin}` บน Upstash Redis Cloud
  - [x] หากไม่มี Key: สลับมาใช้ `src/data/db.json` ในเครื่องคอมพิวเตอร์เหมือนเดิม 100% ไร้รอยต่อ
  - [x] ข้อมูลเควสต์, เหรียญ, สตรีค, สัดส่วนร่างกาย และตั๋วรางวัล ซิงก์ข้ามเครื่องได้แบบ Real-time ตลอด 24 ชม.

---

#### 🔷 PBI-014: Git Repository Setup & Production Environment Configuration
* **Status:** 🟢 **DONE**
* **Priority:** High (P1)
* **Estimation:** 2 Story Points
* **User Story:**
  > ในฐานะ **นักพัฒนา**  
  > ฉันต้องการ **เตรียม Git Repository, ไฟล์ `.gitignore`, และไฟล์ `.env.example` ให้พร้อมสำหรับการนำโค้ดขึ้น GitHub**  
  > เพื่อที่ **โค้ดจะพร้อมสำหรับการต่อเชื่อมกับ Vercel ได้อย่างปลอดภัย ไม่มีข้อมูลหลุด**
* **Acceptance Criteria (DoD):**
  - [x] สร้างไฟล์ `.gitignore` ที่ถูกต้อง ไม่เอาไฟล์ชั่วคราว, build cache, หรือ node_modules ขึ้น Git
  - [x] สร้างไฟล์ `.env.example` เพื่อเป็นคู่มือในการใส่ Key บน Vercel
  - [x] Initialize Git repository ในโฟลเดอร์โปรเจกต์ และทำ Initial Commit
  - [x] จัดเตรียมคำสั่งสำหรับ Push ขึ้น GitHub Repository

---

#### 🔷 PBI-015: 1-Click Vercel Deployment & 24/7 Mobile Cloud Sync Verification
* **Status:** 🟢 **DONE**
* **Priority:** High (P1)
* **Estimation:** 3 Story Points
* **User Story:**
  > ในฐานะ **ผู้ใช้งานที่ต้องการเปิดแอปบนมือถือผ่าน 4G/5G นอกบ้าน**  
  > ฉันต้องการ **ให้มี URL เว็บจริง (HTTPS) บน Vercel และเชื่อมต่อ Upstash Storage**  
  > เพื่อที่ **ฉันจะได้เปิดแอปออกกำลังกายและซิงก์ข้อมูลได้ตลอดเวลาจากทุกที่ทั่วโลก**
* **Acceptance Criteria (DoD):**
  - [x] ออกแบบโครงสร้างรองรับการเชื่อมต่อ Vercel และ Upstash Redis Cloud 100%
  - [x] ตรวจสอบ Production Build ผ่านฉลุย 100% พร้อมไฟล์คอนฟิกครบถ้วน
  - [x] จัดเตรียมคู่มือทีละขั้นตอนสำหรับ Deploy บน Vercel และเปิด Upstash Redis ใน 1 คลิก
  - [x] รองรับ PWA Add to Home Screen บนมือถือจริงผ่าน HTTPS สมบูรณ์แบบ
  - [x] รองรับการติ๊กเควสต์บนมือถือและซิงก์ตรงกับคอมพิวเตอร์ตลอด 24 ชม. แบบไร้รอยต่อ

---

#### 🔷 PBI-016: Real Data Transition, Mockup Elimination & Dynamic Streak Engine
* **Status:** 🟢 **DONE**
* **Priority:** High (P1)
* **Estimation:** 3 Story Points
* **User Story:**
  > ในฐานะ **ผู้ใช้งานจริง**  
  > ฉันต้องการ **ให้ระบบลบข้อมูล Mockup ทั้งหมดออก และบันทึกเฉพาะข้อมูลจริงที่ฉันทำ ทั้งเควสต์, ประวัติน้ำหนัก, และสตรีคที่คำนวณจากกิจกรรมจริง**  
  > เพื่อที่ **ตัวเลขสถิติและกราฟความคืบหน้าจะสะท้อนความพยายามจริงของฉัน 100%**
* **Acceptance Criteria (DoD):**
  - [x] ลบข้อมูล Mockup ประวัติน้ำหนักย้อนหลังใน `metricsSlice.ts` ออกทั้งหมด เริ่มต้นที่ประวัติจริง 0 รายการ
  - [x] ลบข้อมูล Mockup กิจกรรมย้อนหลัง 5 วันใน `settingsSlice.ts` ออกทั้งหมด เริ่มต้นที่ 0 วัน
  - [x] พัฒนาระบบ **Dynamic Streak Calculation Engine** คำนวณสตรีคจากประวัติเควสต์จริงที่ทำสำเร็จย้อนหลังแบบแม่นยำ 100%
  - [x] เพิ่มระบบ **Reverse Daily History (`removeDailyHistory`)** เมื่อผู้ใช้กดยกเลิกติ๊กเควสต์ ระบบจะหักลบจำนวนเควสต์และเหรียญในสถิติวันนั้นออกอย่างถูกต้อง
  - [x] ล้างข้อมูล Mockup เก่าใน LocalStorage อัตโนมัติเมื่อผู้ใช้เปิดแอป พร้อมปุ่ม "รีเซ็ตเริ่มต้นใช้งานจริง" ที่ส่วนท้ายของเว็บ
  - [x] สรุปสัปดาห์, กราฟแท่ง 7 วัน, และวงกลมสถิติจะแสดงผลตามเควสต์ที่ผู้ใช้ทำจริงเท่านั้น

---

#### 🔷 PBI-017: 1-Month Calendar History View, Month Navigation & Day Detail Drill-Down Modal
* **Status:** 🟢 **DONE**
* **Priority:** Highest (P0)
* **Estimation:** 5 Story Points
* **User Story:**
  > ในฐานะ **ผู้ใช้งานที่ต้องการดูภาพรวมการออกกำลังกายแบบรายเดือนและย้อนดูประวัติในอดีตได้**  
  > ฉันต้องการ **ให้มีปฏิทินบันทึกสถานะรายเดือนเต็ม 1 เดือน พร้อมปุ่มเปลี่ยนดูเดือนก่อนหน้า/เดือนถัดไป และเมื่อกดที่แต่ละวันสามารถเปิดดูรายละเอียดเควสต์ที่ทำสำเร็จได้**  
  > เพื่อที่ **ฉันจะได้ตรวจเช็คความสม่ำเสมอได้ตลอดทั้งปี และทราบว่าในแต่ละวันทำเควสต์อะไรไปบ้าง ได้เหรียญรางวัลเท่าไหร่**
* **Acceptance Criteria (DoD):**
  - [x] ขยายการบันทึกสถานะจาก 7 วัน เป็น **ปฏิทินเต็มเดือน (1-Month Calendar Grid)** แสดงผล 7 คอลัมน์ (อาทิตย์ - เสาร์)
  - [x] มีปุ่มสลับเดือน (`<`, `>`) พร้อมชื่อเดือนภาษาไทย และปุ่ม "เดือนนี้" สำหรับกลับมาเดือนปัจจุบันทันที
  - [x] แสดงแถบสถิติประจำเดือน (เควสต์ทั้งหมดในเดือน, เหรียญที่ได้รับ, จำนวนวันที่ออกกำลังกาย, อัตราความสม่ำเสมอ %)
  - [x] ในแต่ละช่องวันที่บนปฏิทิน แสดงจำนวนเควสต์ที่ทำสำเร็จและเหรียญที่ได้รับ (เช่น `✓ 2 เควสต์ (+45)`)
  - [x] รองรับการคลิกที่วันใดก็ได้เพื่อเปิด **หน้าต่างป๊อปอัปรายละเอียด (Day Detail Modal)**
  - [x] ภายใน Modal แสดงรายการเควสต์ทั้งหมดที่ทำในวันนั้น พร้อมระดับความยาก 🟢🟡🔴, ชื่อเควสต์, และเหรียญรางวัล
  - [x] มี Empty State สวยงามสำหรับวันที่เป็นวันพักผ่อน (Rest Day)
  - [x] อัปเดต `CompletedQuestDetail` ใน `DailyHistory` เพื่อเก็บ Snapshot ของเควสต์ในแต่ละวัน พร้อม Backward Compatibility ป้องกันข้อมูลเก่าพัง
  - [x] ดีไซน์เรียบหรูสไตล์ Apple Health / Notion พร้อมเสียงเอฟเฟกต์ คลิกเปลี่ยนเดือนและเปิดปิดหน้าต่าง

---

#### 🔷 PBI-018: Daily Motivation & Wisdom Quotes (Auto-Rotating Daily Inspiration)
* **Status:** 🟢 **DONE**
* **Priority:** High (P1)
* **Estimation:** 3 Story Points
* **User Story:**
  > ในฐานะ **ผู้ใช้งานที่ต้องการสร้างวินัยและแรงบันดาลใจในการออกกำลังกายและพัฒนาตนเอง**  
  > ฉันต้องการ **ให้มีส่วนแสดงคำคมสร้างพลังใจ (Motivation Quote) ที่สุ่มเปลี่ยนใหม่อัตโนมัติในทุกๆ วัน พร้อมระบุชื่อและบทบาทของผู้พูด**  
  > เพื่อที่ **ฉันจะได้เริ่มต้นวันใหม่ด้วย Mindset ที่แข็งแกร่ง มีไฟในการพิชิตเควสต์ และได้ข้อคิดดีๆ ในการพัฒนาสติปัญญาและวินัย**
* **Acceptance Criteria (DoD):**
  - [x] รวบรวมคลังคำคมคุณภาพ 30 รายการ จากบุคคลระดับโลกทั้งสายออกกำลังกาย/วินัยเหล็ก (เช่น Arnold Schwarzenegger, David Goggins, Kobe Bryant, Muhammad Ali, Eliud Kipchoge) และสายปัญญา/การพัฒนาตนเอง (เช่น James Clear, Marcus Aurelius, Naval Ravikant, Charlie Munger, Leonardo da Vinci, Albert Einstein)
  - [x] ระบบสุ่มคำคมอัตโนมัติอิงตามวันจริง (`Date-based Deterministic Hash`) โดยวันเดียวกันจะได้คำคมเดียวกันเสมอ ไม่เปลี่ยนมั่วเมื่อรีเฟรช และเปลี่ยนเป็นคำคมใหม่ทุกวันเมื่อขึ้นวันใหม่
  - [x] ไม่ต้องให้ผู้ใช้กดสุ่มมือถือเอง เป็นกิจวัตรต้อนรับวันใหม่ที่สง่างามและไม่รบกวนสมาธิ
  - [x] แสดงป้ายกำกับหมวดหมู่ชัดเจน: 🟢 วินัย & ความแข็งแกร่ง, 🔵 พลังแห่งนิสัย & ระบบ, 🟡 จิตวิทยา & ความมุ่งมั่น, 🟣 ปัญญา & การเรียนรู้
  - [x] มีปุ่มกดคัดลอกคำคม (Copy) เพื่อนำไปแชร์หรือเก็บไว้เตือนใจ พร้อมเสียงคลิกสไตล์ Apple และแจ้งเตือน "คัดลอกแล้ว"
  - [x] ดีไซน์มินิมอลสไตล์ Notion / Apple Health บนการ์ดสีดำกราไฟต์ พร้อมประกายเรืองแสงนุ่มนวล

---

### [SPRINT 8] Personalized Lifestyle Rewards & Milestone Ecosystem

#### 🔷 PBI-019: Personalized Lifestyle Rewards Shop & Grand Milestone Ecosystem
* **Status:** 🟢 **DONE**
* **Priority:** Highest (P0)
* **Estimation:** 5 Story Points
* **User Story:**
  > ในฐานะ **ผู้ใช้งานที่ต้องการให้ของรางวัลชีวิตตรงกับไลฟ์สไตล์และความสุขจริงของตนเอง**  
  > ฉันต้องการ **ให้ร้านค้าแลกรางวัลมีรายการรางวัลที่ครอบคลุมชีวิตจริง ทั้งเกมเมอร์ (สตรีมเมอร์, Battle Pass, Steam, Nintendo Switch 2), ของกินฮีลใจ (น้ำอัดลม 0 แคล, ไอศกรีม, มื้อดึก, ชาบูปิ้งย่าง), และของใช้/Gaming Gear พร้อมระบบคัดกรองหมวดหมู่ที่ใช้งานง่าย**  
  > เพื่อที่ **การออกกำลังกายในทุกวันจะมีเป้าหมายที่ชัดเจน น่าตื่นเต้น และช่วยขับเคลื่อนวินัยได้อย่างมีความสุข 100% Guilt-Free**
* **Acceptance Criteria (DoD):**
  - [x] ขยายของรางวัลชีวิตจากเดิม 5 รายการ เป็น **17 รายการ** แบ่งออกเป็น 4 ลำดับขั้นอย่างชัดเจน:
    - **Tier 1 (35 - 85 Coins):** น้ำอัดลม No Sugar 0 แคล (35), ดูสตรีมเมอร์ 1 ชม. (45), ดูซีรีส์ 1 ตอน (50), ไอศกรีมพรีเมียม (75), ขนมขบเคี้ยว/ป๊อปคอร์น (85)
    - **Tier 2 (120 - 380 Coins):** กาแฟ/ชานมหวานน้อย (120), มื้อดึกเดลิเวอรี่ (180), ตั๋วนอนตื่นสาย (200), ฟาสต์ฟู้ดคอมโบ (280), เล่นเกมมาราธอน 2 ชม. (350), เติมเกม/Battle Pass (380)
    - **Tier 3 (650 - 800 Coins):** บุฟเฟต์ชาบู/ปิ้งย่าง/สเต็ก Cheat Day (650), ซื้อเกมใหม่ใน Steam 1 เกม (750), งบช้อปปิ้งของที่อยากได้ (800)
    - **Tier 4 (1,200 - 3,500 Coins):** อัปเกรด Gaming Gear/Gadget (1,200), ช้อปปิ้งเสื้อผ้า/รองเท้าผ้าใบ (1,600), 🌟 **บอสใหญ่: เครื่องเกม Nintendo Switch 2 (3,500 Coins)**
  - [x] เพิ่มแท็บตัวกรองหมวดหมู่ (Category Filter Bar) ด้านบน: ทั้งหมด, ของกิน & เครื่องดื่ม ☕, เกม & บันเทิง 🎮, ช้อปปิ้ง & ไอที 🛍️, พักผ่อน 🛌 พร้อมแสดงจำนวนของรางวัลในแต่ละหมวด
  - [x] ระบบจับคู่ไอคอนและอิโมจิเฉพาะตัวสำหรับแต่ละรางวัล (เช่น 🥤, 🍦, 🍿, 🍔, 🥩, 🕹️, 🎧, 👟, 💎, 🌙, 📺, 🌟)
  - [x] ออกแบบการ์ดไฮไลต์พิเศษสำหรับรางวัลระดับบอสใหญ่ (Nintendo Switch 2) ด้วยขอบเรืองแสงสีทองและป้าย `🌟 บอสใหญ่แห่งวินัย`
  - [x] พัฒนาระบบ **Smart Merge** ใน Redux Store เพื่อนำเข้ารายการใหม่ให้ผู้ใช้เดิมที่มีข้อมูลบันทึกอยู่แล้วอัตโนมัติ โดยไม่สูญเสียจำนวนครั้งที่เคยแลกหรือของรางวัลที่สร้างเอง

