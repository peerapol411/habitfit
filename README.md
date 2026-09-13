# HabitFit — Minimalist Daily Fitness Quests & Rewards

> **HabitFit** is an Apple Health & Notion inspired daily fitness habit tracker. Complete daily workout quests to earn coins, and redeem them for real-life self-rewards. Zero gamification clutter — pure motivation and habit consistency.

---

## ✨ Key Features

- **🎯 Daily Fitness Quests:** Categorized into Easy (+10 Coins), Medium (+25 Coins), and Hard (+50 Coins) with 1-click completion and custom quest builder.
- **🎁 Real-Life Self-Rewards Shop:** Redeem earned coins for real-world rewards (e.g., Bubble Tea, Movie Night, Cheat Meal, Gaming session). Manage redeemed vouchers in your ticket inventory.
- **🔥 Daily Streak & Midnight Auto-Reset:** Automatic reset of daily quests at midnight without losing historical activity or streak counts.
- **⚖️ Body Metrics & Weight Progress Log:** Log weight, track BMI automatically with visual status badges, monitor weight changes, and earn a +50 Coins logging bonus.
- **📊 Weekly Insights & Activity Chart:** 7-day visual workout frequency bar chart with interactive hover tooltips and dynamic motivational insights.
- **⚡ Dual-Engine Cloud Sync (Upstash Redis + Local JSON):**
  - **Local Development / Offline:** Automatically falls back to zero-config local JSON persistence (`src/data/db.json`).
  - **Production / Vercel:** Seamlessly switches to Upstash Redis Cloud when environment variables are present, enabling 24/7 global cross-device synchronization over 4G/5G.
- **📲 Passwordless QR & PIN Pairing:** No email or password needed. Pair multiple devices (Laptop & Mobile) instantly using a QR Code or 6-digit PIN with a 2.5s real-time heartbeat sync engine.
- **📱 Progressive Web App (PWA):** Installable on iOS Safari and Android Chrome as a standalone app with offline caching and sleek mobile navigation.

---

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Visual Effects:** Canvas-Confetti
- **Cloud Storage:** [@upstash/redis](https://upstash.com/) (REST Serverless Client)
- **Local Fallback:** Node.js File System (`fs/promises`)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone <your-repo-url>
cd habitfit-app
npm install
```

### 2. Local Development

Run the development server with webpack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Production Deployment on Vercel

HabitFit is ready for 1-click deployment on [Vercel](https://vercel.com):

1. Push your repository to GitHub.
2. Import your GitHub repository into Vercel.
3. In your Vercel Project Dashboard:
   - Go to **Storage** tab.
   - Click **Create Database** -> Select **Upstash Redis**.
   - Click **Connect** to your project.
   - Vercel will automatically inject `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` into your environment variables.
4. Deploy! Your HabitFit web app will now sync seamlessly 24/7 across your laptop and smartphone.

---

## 📄 Environment Variables

See [.env.example](.env.example) for reference:

```env
UPSTASH_REDIS_REST_URL="https://your-database.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your_upstash_redis_token"
```

*Note: If these variables are not set, HabitFit operates gracefully in offline/local file mode.*

---

## 📱 Mobile PWA Installation

- **iOS (Safari):** Open your Vercel URL, tap the **Share** button, then tap **Add to Home Screen**.
- **Android (Chrome):** Open your Vercel URL, tap the three dots menu, then tap **Install App**.

---

## 📄 License

MIT
