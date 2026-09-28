import React from 'react';
import { Volume2, VolumeX, RotateCcw, Sparkles, ScrollText, Flame, MessageCircle, Users, BookOpen, Utensils } from 'lucide-react';
import { sound } from '../utils/audio';
import { GrowthStats } from '../types/growth';

export type ActiveTab = 'chat' | 'feed' | 'diary' | 'events' | 'contract' | 'lore' | 'talismans';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  stability: number;
  schemeProgress: number;
  mood: string;
  growth: GrowthStats;
  onResetChat: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (v: boolean) => void;
  onOpenDragonSecret: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  stability,
  schemeProgress,
  mood,
  growth,
  onResetChat,
  soundEnabled,
  setSoundEnabled,
  onOpenDragonSecret,
}) => {
  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.enabled = nextState;
    if (nextState) sound.playChime();
  };

  return (
    <header className="sticky top-0 z-40 bg-purple-950/90 backdrop-blur-md border-b border-purple-800/40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3">
        {/* Top bar with Branding, Mood and Controls */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-purple-800 via-pink-600 to-amber-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-purple-950 rounded-[10px] flex items-center justify-center text-lg">
                👑
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-serif font-bold text-amber-200 tracking-wide">
                  Dịch Chi
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Tiểu Điện Hạ Ma Giới
                </span>
              </div>
              <p className="text-[11px] text-purple-300/80 hidden sm:block">
                Hôn ước Thần - Ma • <span className="text-amber-300 font-semibold">{growth.age.toFixed(1)} tuổi</span> • <span className="text-cyan-300">{growth.height.toFixed(1)}cm</span> • <span className="text-pink-300">{growth.weight.toFixed(1)}kg</span> • Nhõng nhẽo, quậy phá, mồm mép đanh đá
              </p>
            </div>
          </div>

          {/* Quick status bar on Desktop */}
          <div className="hidden md:flex items-center gap-6 bg-purple-900/40 border border-purple-700/30 px-4 py-1.5 rounded-xl">
            {/* Stability meter */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between text-[11px] text-purple-200 mb-1 gap-4">
                <span>Độ Bền Hôn Ước:</span>
                <span className="font-bold text-amber-300 font-mono">{stability}%</span>
              </div>
              <div className="w-32 h-2 bg-purple-950 rounded-full overflow-hidden border border-purple-800">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 via-purple-400 to-amber-400 transition-all duration-700"
                  style={{ width: `${stability}%` }}
                />
              </div>
            </div>

            {/* Scheme meter */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between text-[11px] text-purple-200 mb-1 gap-4">
                <span>Âm Mưu Hủy Hôn:</span>
                <span className="font-bold text-rose-400 font-mono">{schemeProgress}%</span>
              </div>
              <div className="w-28 h-2 bg-purple-950 rounded-full overflow-hidden border border-purple-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-700"
                  style={{ width: `${schemeProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                sound.playChime();
                onOpenDragonSecret();
              }}
              title="Bí mật Huyết Mạch Hắc Long (Trạng Thái Ẩn - Bán Long Thể)"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-neutral-900 via-purple-900 to-amber-900/80 hover:from-neutral-800 hover:to-amber-800 border border-amber-500/50 text-amber-200 text-xs font-semibold shadow-md active:scale-95 transition-all"
            >
              <span className="text-sm">🐉</span>
              <span className="hidden sm:inline">Huyết Mạch Hắc Long</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Trạng thái ẩn
              </span>
            </button>
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
              className="p-2 rounded-lg bg-purple-900/60 hover:bg-purple-800/80 border border-purple-700/40 text-purple-200 hover:text-amber-200 transition-colors"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              onClick={onResetChat}
              title="Làm mới cuộc trò chuyện"
              className="p-2 rounded-lg bg-purple-900/60 hover:bg-rose-900/40 border border-purple-700/40 text-purple-200 hover:text-rose-300 transition-colors"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-2.5 overflow-x-auto scrollbar-none pb-0.5">
          <button
            onClick={() => {
              setActiveTab('chat');
              sound.playChime();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
              activeTab === 'chat'
                ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-amber-200 shadow-md border border-purple-400/40 font-semibold'
                : 'text-purple-300 hover:text-purple-100 hover:bg-purple-900/40'
            }`}
          >
            <MessageCircle size={15} />
            <span>Trò Chuyện Cùng Dịch Chi</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('feed');
              sound.playSweetBite();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
              activeTab === 'feed'
                ? 'bg-gradient-to-r from-amber-600 via-rose-600 to-purple-700 text-white shadow-md border border-amber-300 font-semibold'
                : 'text-amber-300 hover:text-amber-100 hover:bg-amber-950/40 border border-amber-500/30'
            }`}
          >
            <span>🍲</span>
            <span>Bồi Bổ & Mau Lớn</span>
            <span className="text-[10px] bg-amber-400/30 text-amber-200 font-mono font-bold px-1.5 py-0.2 rounded-full border border-amber-400/40">
              {growth.age.toFixed(1)}T
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('diary');
              sound.playChime();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
              activeTab === 'diary'
                ? 'bg-gradient-to-r from-amber-600 via-pink-600 to-purple-800 text-white shadow-md border border-amber-300 font-semibold ring-1 ring-amber-400/40'
                : 'text-amber-200 hover:text-white hover:bg-purple-900/40 border border-purple-800/40'
            }`}
          >
            <BookOpen size={15} className="text-amber-300" />
            <span>Nhật Ký Ma Giới</span>
            <span className="text-[10px] bg-pink-500/30 text-pink-200 font-bold px-1.5 py-0.2 rounded-full border border-pink-400/40">
              Kỷ Niệm
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('events');
              sound.playFireBoom();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
              activeTab === 'events'
                ? 'bg-gradient-to-r from-rose-700 to-amber-700 text-amber-100 shadow-md border border-amber-400/50 font-semibold animate-pulse'
                : 'text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 border border-rose-900/30'
            }`}
          >
            <Flame size={15} className="text-amber-400" />
            <span>Biến Cố Hủy Hôn</span>
            <span className="text-[10px] bg-rose-500 text-white font-bold px-1.5 py-0.2 rounded-full">
              HOT
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('contract');
              sound.playStamp();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
              activeTab === 'contract'
                ? 'bg-gradient-to-r from-amber-700 to-purple-800 text-amber-200 shadow-md border border-amber-400/40 font-semibold'
                : 'text-purple-300 hover:text-purple-100 hover:bg-purple-900/40'
            }`}
          >
            <ScrollText size={15} />
            <span>Khế Ước Hôn Thư</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('lore');
              sound.playChime();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
              activeTab === 'lore'
                ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-amber-200 shadow-md border border-purple-400/40 font-semibold'
                : 'text-purple-300 hover:text-purple-100 hover:bg-purple-900/40'
            }`}
          >
            <Users size={15} />
            <span>Sổ Tay Ma Thần</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('talismans');
              sound.playChime();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0 ${
              activeTab === 'talismans'
                ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-amber-200 shadow-md border border-purple-400/40 font-semibold'
                : 'text-purple-300 hover:text-purple-100 hover:bg-purple-900/40'
            }`}
          >
            <Sparkles size={15} />
            <span>Túi Phù Chú ({mood})</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
