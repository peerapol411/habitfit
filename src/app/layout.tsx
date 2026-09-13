import type { Metadata, Viewport } from "next";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider";
import PwaRegister from "@/components/PwaRegister";

export const viewport: Viewport = {
  themeColor: "#090a0f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "HabitFit — Daily Fitness Quests & Rewards",
  description: "ระบบเควสต์ออกกำลังกายประจำวัน สะสมเหรียญแลกรางวัลชีวิต",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HabitFit",
  },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-emerald-500 selection:text-black">
        <StoreProvider>
          {children}
          <PwaRegister />
        </StoreProvider>
      </body>
    </html>
  );
}
