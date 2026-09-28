import React, { useState } from 'react';
import { TALISMANS_LIST, Talisman, TalismanMode } from '../data/characterData';
import { sound } from '../utils/audio';
import { Sparkles, Flame, Wand2, ShieldAlert, Zap, Wind, Snowflake, Leaf, Skull } from 'lucide-react';

interface TalismanDrawerProps {
  onUseTalisman: (promptText: string) => void;
  onNavigateToChat: () => void;
}

export const TalismanDrawer: React.FC<TalismanDrawerProps> = ({
  onUseTalisman,
  onNavigateToChat,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'bua_dua_nguoc' | 'bua_co_dien'>('bua_dua_nguoc');

  const filteredTalismans = TALISMANS_LIST.filter((talisman) => {
    if (selectedCategory === 'all') return true;
    return talisman.category === selectedCategory;
  });

  const handleCastTalisman = (talisman: Talisman, specificMode?: TalismanMode) => {
    if (talisman.id.includes('hoa') || talisman.id.includes('bao_liet') || talisman.id.includes('thuy_hoa')) {
      sound.playFireBoom();
    } else if (talisman.id.includes('tinh_tam') || talisman.id.includes('me_hon')) {
      sound.playChime();
    } else if (talisman.id.includes('troi') || talisman.id.includes('yeu') || talisman.id.includes('tran')) {
      sound.playStamp();
    } else {
      sound.playSweetBite();
    }

    let actionText = '';
    if (specificMode) {
      actionText = specificMode.prompt;
    } else if (talisman.defaultPrompt) {
      actionText = talisman.defaultPrompt;
    } else {
      actionText = `*Lấy ra lá phù chú "${talisman.name}" mà Dịch Chi từng vẽ, nhướng mày hỏi nhóc có muốn thử kích hoạt lại lá bùa này một lần nữa không*`;
    }

    onUseTalisman(actionText);
    onNavigateToChat();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đùa ngược':
        return 'bg-pink-500/20 text-pink-300 border-pink-500/40';
      case 'Khống chế':
        return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      case 'Công kích':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'Biến hóa':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
      case 'Nổ tung':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Tác dụng ngược':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Title & Introduction */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 border border-amber-400/40 text-amber-200 text-xs font-semibold">
          <Wand2 size={14} className="text-amber-300" />
          <span>Bút Vạn Cảnh • Bí Truyền Ma Phù Của Tiểu Điện Hạ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
          Túi Phù Chú Đùa Ngược Của Dịch Chi
        </h2>
        <p className="text-xs sm:text-sm text-purple-300/80 max-w-xl mx-auto leading-relaxed">
          Bộ sưu tập 10 bùa chú đùa ngược độc đáo do Dịch Chi tự tay vẽ bằng Bút Vạn Cảnh.
          Chọn bất kỳ lá bùa nào để trêu chọc hoặc phản phệ nhóc trong cuộc trò chuyện!
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => {
            setSelectedCategory('bua_dua_nguoc');
            sound.playChime();
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'bua_dua_nguoc'
              ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-lg ring-1 ring-amber-300'
              : 'bg-purple-950/70 text-purple-300 hover:text-white border border-purple-800/60'
          }`}
        >
          🎭 10 Bùa Đùa Ngược Mới (Hot)
        </button>
        <button
          onClick={() => {
            setSelectedCategory('bua_co_dien');
            sound.playChime();
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'bua_co_dien'
              ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg ring-1 ring-purple-400'
              : 'bg-purple-950/70 text-purple-300 hover:text-white border border-purple-800/60'
          }`}
        >
          💥 Bùa Nổ & Phản Phệ Cổ Điển
        </button>
        <button
          onClick={() => {
            setSelectedCategory('all');
            sound.playChime();
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-gradient-to-r from-neutral-800 to-purple-800 text-white shadow-lg ring-1 ring-neutral-400'
              : 'bg-purple-950/70 text-purple-300 hover:text-white border border-purple-800/60'
          }`}
        >
          📜 Tất Cả ({TALISMANS_LIST.length})
        </button>
      </div>

      {/* Grid of Talismans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTalismans.map((talisman) => {
          const hasModes = Boolean(talisman.modes && talisman.modes.length > 0);

          return (
            <div
              key={talisman.id}
              className="bg-purple-950/70 border border-purple-800/50 hover:border-amber-400/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-xl space-y-3.5 relative group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-900/60 border border-purple-700/60 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform">
                    {talisman.icon}
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${getStatusColor(
                      talisman.status
                    )}`}
                  >
                    {talisman.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-amber-200 group-hover:text-amber-100 transition-colors">
                    {talisman.name}
                  </h3>
                  <p className="text-xs text-purple-200/90 mt-1 leading-relaxed">
                    {talisman.effect}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-900/40 border border-purple-800/30 text-[11px] text-purple-300 italic">
                  <strong className="text-amber-300 not-italic">Đặc tính trớ trêu:</strong> {talisman.funNote}
                </div>
              </div>

              {/* Action buttons */}
              {hasModes ? (
                <div className="space-y-2 pt-1 border-t border-purple-800/40">
                  <span className="text-[10px] font-semibold text-amber-300 block">
                    Chọn chế độ kích hoạt:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleCastTalisman(talisman, talisman.modes![0])}
                      className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-700 hover:to-teal-700 border border-emerald-500/50 text-[11px] font-bold text-emerald-100 shadow transition-all active:scale-95 cursor-pointer"
                      title={talisman.modes![0].effect}
                    >
                      <Leaf size={12} className="text-emerald-300" />
                      <span>Nâng Đỡ (Chữa)</span>
                    </button>
                    <button
                      onClick={() => handleCastTalisman(talisman, talisman.modes![1])}
                      className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-gradient-to-r from-rose-900 to-purple-900 hover:from-rose-800 hover:to-purple-800 border border-rose-500/50 text-[11px] font-bold text-rose-100 shadow transition-all active:scale-95 cursor-pointer"
                      title={talisman.modes![1].effect}
                    >
                      <Skull size={12} className="text-rose-300" />
                      <span>Trói Buộc (Độc)</span>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleCastTalisman(talisman)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-800 via-indigo-800 to-purple-900 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 border border-purple-500/40 hover:border-amber-400/50 text-xs font-semibold text-amber-200 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Sparkles size={14} className="text-amber-300" />
                  <span>Dán Bùa Này Lên Dịch Chi</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
