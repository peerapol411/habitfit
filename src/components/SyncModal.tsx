'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setSyncModalOpen, setPin } from '@/store/settingsSlice';
import { sound } from '@/lib/audioService';
import QRCode from 'qrcode';
import { 
  X, 
  Smartphone, 
  Copy, 
  Check, 
  Wifi, 
  ArrowRight, 
  RefreshCw,
  QrCode
} from 'lucide-react';

export default function SyncModal() {
  const dispatch = useAppDispatch();
  const { isSyncModalOpen, pin } = useAppSelector((state) => state.settings);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [inputPin, setInputPin] = useState('');
  const [networkHost, setNetworkHost] = useState('localhost:3000');
  const [protocol, setProtocol] = useState('https:');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setNetworkHost(window.location.host);
      setProtocol(window.location.protocol);
    }
  }, []);

  const syncUrl = `${protocol}//${networkHost}/?pin=${pin}`;

  useEffect(() => {
    if (isSyncModalOpen && pin) {
      QRCode.toDataURL(syncUrl, {
        width: 240,
        margin: 1.5,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR code generation error:', err));
    }
  }, [isSyncModalOpen, pin, syncUrl]);

  if (!isSyncModalOpen) return null;

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(pin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnectPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPin.trim()) return;

    sound.playClick();
    const cleanPin = inputPin.trim().toUpperCase();
    dispatch(setPin(cleanPin));
    localStorage.setItem('habitfit_pin', cleanPin);
    window.location.search = `?pin=${encodeURIComponent(cleanPin)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            dispatch(setSyncModalOpen(false));
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">เชื่อมต่อกับสมาร์ตโฟน</h2>
        </div>
        <p className="text-xs text-zinc-400 mb-5">
          สแกน QR Code หรือใช้รหัส PIN เพื่อซิงก์ข้อมูลเควสต์และเหรียญระหว่างคอมและมือถือแบบ Real-time
        </p>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-zinc-950 border border-zinc-800 mb-5">
          {qrDataUrl ? (
            <div className="p-3 bg-white rounded-xl shadow-md">
              <img src={qrDataUrl} alt="Sync QR Code" className="w-48 h-48 rounded" />
            </div>
          ) : (
            <div className="w-48 h-48 bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 text-xs">
              กำลังสร้าง QR Code...
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
            <Wifi className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            {networkHost.includes('localhost') ? (
              <span className="text-amber-400/90 text-[11px]">
                กำลังรันบน Localhost: ให้เปิดแอปบนมือถือแล้วนำ PIN ด้านล่างไปกรอก หรือ Deploy บน Vercel เพื่อสแกนได้ทันที
              </span>
            ) : (
              <span>เปิดกล้องมือถือสแกน QR Code เพื่อจับคู่อัตโนมัติ</span>
            )}
          </div>
        </div>

        {/* Sync Instructions Guide Card */}
        <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs space-y-1.5 mb-4">
          <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
            <span>💡 วิธีจับคู่ซิงก์ระหว่างเครื่อง (ง่ายที่สุดใน 5 วินาที)</span>
          </div>
          <p className="text-zinc-300 leading-relaxed">
            1. ดูรหัส PIN บนเครื่องหลักของคุณ (เช่น <strong className="text-white font-mono">{pin}</strong>)
          </p>
          <p className="text-zinc-300 leading-relaxed">
            2. นำรหัส PIN นี้ไปใส่ในช่อง <strong>"เชื่อมต่อด้วย PIN อื่น"</strong> บนมือถือของคุณ แล้วกดเชื่อมต่อ
          </p>
          <p className="text-zinc-400 text-[11px] leading-relaxed">
            ทั้งสองเครื่องจะมี PIN เดียวกัน และทุกครั้งที่ติ๊กเควสต์ ข้อมูลจะซิงก์ตรงกันแบบ Real-time ทันที!
          </p>
        </div>

        {/* PIN Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-medium text-zinc-400 mb-1">
              รหัส PIN ประจำตัวของเครื่องนี้
            </label>
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
              <span className="font-mono text-base font-bold text-emerald-400 tracking-wider">
                {pin}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>คัดลอกแล้ว</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>คัดลอก</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Connect other PIN */}
          <form onSubmit={handleConnectPin} className="pt-2 border-t border-zinc-800">
            <label className="block text-[11px] font-medium text-zinc-400 mb-1.5">
              เชื่อมต่อด้วย PIN อื่น (จับคู่กับเครื่องของคุณ)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="กรอก PIN เช่น FIT-8821"
                value={inputPin}
                onChange={(e) => setInputPin(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:outline-none text-xs text-white font-mono placeholder-zinc-500"
              />
              <button
                type="submit"
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-all"
              >
                <span>เชื่อมต่อ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
