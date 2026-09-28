import React, { useState } from 'react';
import {
  GrowthStats,
  FoodItem,
  FOOD_MENU,
  getGrowthStage,
  calculateDragonWeight,
  formatHumanHeight,
  formatHumanWeight,
  formatDragonLength,
  formatDragonWeight,
  MAX_HUMAN_HEIGHT,
  MAX_HUMAN_WEIGHT,
} from '../types/growth';
import { sound } from '../utils/audio';
import { Sparkles, Utensils, TrendingUp, Award, RotateCcw, Heart, ChevronRight, Eye, EyeOff, Shield } from 'lucide-react';

interface FeedingGrowthPanelProps {
  growth: GrowthStats;
  onFeed: (food: FoodItem) => void;
  onResetGrowth: () => void;
}

export const FeedingGrowthPanel: React.FC<FeedingGrowthPanelProps> = ({
  growth,
  onFeed,
  onResetGrowth,
}) => {
  const [selectedFood, setSelectedFood] = useState<FoodItem>(FOOD_MENU[0]);
  const [isFeedingAnim, setIsFeedingAnim] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'human' | 'dragon'>('human');
  const [lastFeedToast, setLastFeedToast] = useState<{
    foodName: string;
    ageGain: number;
    heightGain: number;
    weightGain: number;
    dragonLengthGain?: number;
  } | null>(null);

  const stage = getGrowthStage(growth.age);
  const progressTo16 = Math.min(100, Math.max(0, ((growth.age - 14) / (16 - 14)) * 100));

  const dragonLen = growth.dragonLength || 3.5;
  const dragonWeightCan = calculateDragonWeight(dragonLen);

  const handleFeedAction = (food: FoodItem) => {
    sound.playSweetBite();
    setIsFeedingAnim(true);
    setLastFeedToast({
      foodName: food.name,
      ageGain: food.ageGain,
      heightGain: food.heightGain,
      weightGain: food.weightGain,
      dragonLengthGain: food.dragonLengthGain,
    });

    onFeed(food);

    setTimeout(() => {
      setIsFeedingAnim(false);
    }, 1200);
  };

  return (
    <div className="bg-gradient-to-br from-purple-950/80 via-neutral-950/90 to-purple-900/70 border border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-5 text-purple-100 relative overflow-hidden backdrop-blur-md">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Feed Toast */}
      {lastFeedToast && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 animate-bounce bg-gradient-to-r from-amber-600 to-rose-600 text-amber-50 px-4 py-1.5 rounded-full text-xs font-bold shadow-xl border border-amber-300 flex items-center gap-2 whitespace-nowrap">
          <span>✨ Đã đút {lastFeedToast.foodName}:</span>
          <span className="bg-neutral-950/50 px-1.5 py-0.5 rounded text-amber-200">
            +{lastFeedToast.ageGain.toFixed(1)}T
          </span>
          <span className="bg-neutral-950/50 px-1.5 py-0.5 rounded text-emerald-200">
            +{lastFeedToast.heightGain.toFixed(1)}cm (Người)
          </span>
          <span className="bg-neutral-950/50 px-1.5 py-0.5 rounded text-pink-200">
            +{lastFeedToast.weightGain.toFixed(1)}kg (Người)
          </span>
          {lastFeedToast.dragonLengthGain && (
            <span className="bg-neutral-950/50 px-1.5 py-0.5 rounded text-amber-300">
              +{lastFeedToast.dragonLengthGain.toFixed(1)}m (Thân rồng)
            </span>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-purple-800/50 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-xl shadow-lg border border-amber-300/40">
            🍲
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-amber-200 flex items-center gap-2">
              <span>Bồi Bổ & Cho Ăn Mau Lớn</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-sans font-normal">
                Tăng Tuổi • Vóc Dáng • Huyết Mạch
              </span>
            </h3>
            <p className="text-[11px] text-purple-300/80">
              Đút tiên thực, linh thạch và canh bổ để Tiểu Điện Hạ lớn nhanh thành Hắc Long trưởng thành 16 tuổi!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Mode toggle */}
          <div className="flex items-center bg-purple-950 p-0.5 rounded-lg border border-purple-800/60 text-[11px]">
            <button
              onClick={() => {
                setViewMode('human');
                sound.playChime();
              }}
              className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                viewMode === 'human'
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              👤 Hình Người (Max 1m90)
            </button>
            <button
              onClick={() => {
                setViewMode('dragon');
                sound.playChime();
              }}
              className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'dragon'
                  ? 'bg-purple-700 text-amber-200 shadow-sm'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              <Shield size={12} className="text-amber-300" />
              <span>🐉 Thân Rồng (Ẩn)</span>
            </button>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn đặt lại vóc dáng và tuổi tác của Dịch Chi về 14 tuổi, 145cm, 39kg ban đầu không?')) {
                onResetGrowth();
                sound.playChime();
              }
            }}
            title="Đặt lại tuổi tác và vóc dáng ban đầu (14 tuổi / 145cm / 39kg)"
            className="text-[11px] text-purple-400 hover:text-rose-300 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-950/60 hover:bg-rose-950/50 border border-purple-800/50 transition-colors cursor-pointer"
          >
            <RotateCcw size={12} />
            <span>Đặt lại</span>
          </button>
        </div>
      </div>

      {/* Stats Cards based on View Mode */}
      {viewMode === 'human' ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 animate-fadeIn">
          {/* Tuổi tác Card */}
          <div className="bg-gradient-to-br from-purple-900/60 to-purple-950/80 border border-purple-700/50 rounded-xl p-2.5 sm:p-3 text-center shadow-md relative overflow-hidden group">
            <div className="text-[10px] text-purple-300/80 font-medium flex items-center justify-center gap-1">
              <span>🎂 Tuổi Tác</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold font-serif text-amber-300 mt-0.5 tracking-tight group-hover:scale-105 transition-transform">
              {growth.age.toFixed(1)} <span className="text-xs font-sans text-amber-200/80">Tuổi</span>
            </div>
            <div className="text-[9px] text-emerald-400 font-mono mt-0.5">
              +{((growth.age - 14.0)).toFixed(1)} tuổi từ lúc nuôi
            </div>
          </div>

          {/* Chiều cao Card (Hình Người) */}
          <div className="bg-gradient-to-br from-indigo-900/60 to-purple-950/80 border border-indigo-700/50 rounded-xl p-2.5 sm:p-3 text-center shadow-md relative overflow-hidden group">
            <div className="text-[10px] text-indigo-300/80 font-medium flex items-center justify-center gap-1">
              <span>📏 Chiều Cao Hình Người</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold font-serif text-cyan-300 mt-0.5 tracking-tight group-hover:scale-105 transition-transform">
              {growth.height.toFixed(1)} <span className="text-xs font-sans text-cyan-200/80">cm</span>
            </div>
            <div className="text-[9px] text-cyan-300 font-mono mt-0.5">
              {growth.height >= MAX_HUMAN_HEIGHT ? (
                <span className="text-amber-300 font-bold">✨ Đạt cực hạn 1m90!</span>
              ) : (
                <span>Còn {(MAX_HUMAN_HEIGHT - growth.height).toFixed(1)}cm tới 1m90</span>
              )}
            </div>
          </div>

          {/* Cân nặng Card (Hình Người) */}
          <div className="bg-gradient-to-br from-rose-900/60 to-purple-950/80 border border-rose-700/50 rounded-xl p-2.5 sm:p-3 text-center shadow-md relative overflow-hidden group">
            <div className="text-[10px] text-rose-300/80 font-medium flex items-center justify-center gap-1">
              <span>⚖️ Cân Nặng Hình Người</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold font-serif text-pink-300 mt-0.5 tracking-tight group-hover:scale-105 transition-transform">
              {growth.weight.toFixed(1)} <span className="text-xs font-sans text-pink-200/80">kg</span>
            </div>
            <div className="text-[9px] text-pink-300 font-mono mt-0.5">
              {growth.weight >= MAX_HUMAN_WEIGHT ? (
                <span className="text-amber-300 font-bold">✨ Đạt cực hạn 82kg!</span>
              ) : (
                <span>Giới hạn tối đa: 82.0 kg</span>
              )}
            </div>
          </div>

          {/* Tiềm Năng Hắc Long Card */}
          <div className="bg-gradient-to-br from-amber-950/60 via-purple-950/90 to-neutral-950 border border-amber-500/50 rounded-xl p-2.5 sm:p-3 text-center shadow-md relative overflow-hidden group">
            <div className="text-[10px] text-amber-300/80 font-medium flex items-center justify-center gap-1">
              <span>🐉 Tiềm Năng Hắc Long</span>
            </div>
            <div className="text-lg sm:text-2xl font-bold font-serif text-amber-400 mt-0.5 tracking-tight group-hover:scale-105 transition-transform flex items-center justify-center gap-1">
              <span>{growth.dragonPotential || 25}%</span>
            </div>
            <div className="text-[9px] text-amber-300 font-mono mt-0.5">
              {(growth.dragonPotential || 25) >= 100 ? (
                <span className="text-emerald-400 font-bold">✨ Bán Long Thể!</span>
              ) : (
                <span>Còn {100 - (growth.dragonPotential || 25)}% nữa đầy</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Dragon Form Secret Stats */
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 animate-fadeIn">
          {/* Chiều Dài Thân Rồng */}
          <div className="bg-gradient-to-br from-neutral-950 via-purple-950 to-indigo-950 border border-amber-500/60 rounded-xl p-3 text-center shadow-md relative overflow-hidden group">
            <div className="text-[10px] text-amber-300 font-medium flex items-center justify-center gap-1">
              <span>🐉 Chiều Dài Thân Rồng (Không Giới Hạn)</span>
            </div>
            <div className="text-xl sm:text-3xl font-bold font-serif text-amber-300 mt-1 tracking-tight group-hover:scale-105 transition-transform">
              {dragonLen.toFixed(1)} <span className="text-sm font-sans text-amber-200">Mét</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-mono mt-1">
              {dragonLen >= 100 ? '👑 Đạt mốc Đại Long 100m+ uy vũ!' : `Có thể vươn dài đến 100m (${(100 - dragonLen).toFixed(1)}m nữa)`}
            </div>
          </div>

          {/* Cân Nặng Thân Rồng */}
          <div className="bg-gradient-to-br from-neutral-950 via-rose-950 to-purple-950 border border-rose-500/60 rounded-xl p-3 text-center shadow-md relative overflow-hidden group">
            <div className="text-[10px] text-pink-300 font-medium flex items-center justify-center gap-1">
              <span>⚖️ Cân Nặng Thân Rồng (10m = 900 Cân)</span>
            </div>
            <div className="text-xl sm:text-3xl font-bold font-serif text-pink-300 mt-1 tracking-tight group-hover:scale-105 transition-transform">
              {dragonWeightCan.toLocaleString('vi-VN')} <span className="text-sm font-sans text-pink-200">Cân</span>
            </div>
            <div className="text-[10px] text-pink-300/80 font-mono mt-1">
              Tỉ lệ chuẩn xác: 90 Cân / 1 Mét chiều dài
            </div>
          </div>

          {/* Quy Tắc Bảo Mật */}
          <div className="bg-gradient-to-br from-neutral-950 via-purple-950 to-neutral-900 border border-purple-700/60 rounded-xl p-3 text-left shadow-md flex flex-col justify-center">
            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
              <Shield size={12} />
              <span>Trạng Thái Ẩn Cơ Mật:</span>
            </div>
            <p className="text-[11px] text-purple-200/90 leading-relaxed">
              Thân rồng dài không giới hạn và cân nặng khổng lồ được giữ kín, chỉ hiển thị tại đây và khi tương tác cùng Thần Quân!
            </p>
          </div>
        </div>
      )}

      {/* Growth Stage & 16-Year Milestone Bar */}
      <div className="bg-purple-950/60 border border-purple-800/60 rounded-xl p-3 space-y-2">
        <div className="flex items-center justify-between text-xs flex-wrap gap-1">
          <div className="flex items-center gap-1.5">
            <Award size={14} className="text-amber-400" />
            <span className="text-purple-300 font-medium">Giai đoạn vóc dáng:</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r ${stage.badgeColor} text-white shadow-sm`}>
              {stage.stageName}
            </span>
          </div>
          <div className="text-[11px] text-amber-300 font-mono">
            {growth.age >= 16 ? (
              <span className="text-emerald-300 font-bold">🎉 Đã Đạt Mốc Trưởng Thành 16 Tuổi!</span>
            ) : (
              <span>Còn {(16 - growth.age).toFixed(1)} tuổi nữa đến mốc 16 tuổi</span>
            )}
          </div>
        </div>

        {/* Milestone Progress Bar */}
        <div className="w-full bg-purple-950 rounded-full h-2.5 overflow-hidden border border-purple-800/80 relative">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-500 transition-all duration-700 ease-out"
            style={{ width: `${progressTo16}%` }}
          />
        </div>

        <p className="text-[11px] text-purple-200/90 italic font-serif leading-relaxed">
          "{stage.description}"
        </p>
        <div className="text-[10px] text-amber-300/80 flex items-center gap-1 bg-amber-950/40 px-2 py-1 rounded border border-amber-500/20">
          <span>🐉 Dấu ấn long thể:</span>
          <span>{stage.dragonState}</span>
        </div>
      </div>

      {/* Menu of Divine Foods to Feed */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
            <Utensils size={14} className="text-amber-400" />
            <span>Thực Đơn Bồi Bổ (Bấm món để đút cho Dịch Chi):</span>
          </span>
          <span className="text-[11px] text-purple-400 font-mono">
            Đã cho ăn: <strong className="text-amber-300">{growth.feedCount}</strong> lần
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {FOOD_MENU.map((food) => {
            const isSelected = selectedFood.id === food.id;

            return (
              <button
                key={food.id}
                onClick={() => {
                  setSelectedFood(food);
                  handleFeedAction(food);
                }}
                className={`text-left p-2.5 rounded-xl border transition-all relative overflow-hidden group active:scale-97 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-amber-950/80 to-purple-950/90 border-amber-400/80 shadow-lg ring-1 ring-amber-400/40'
                    : 'bg-purple-950/50 hover:bg-purple-900/60 border-purple-800/40 hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-2xl group-hover:scale-110 transition-transform shrink-0 mt-0.5">
                    {food.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-xs text-amber-200 truncate group-hover:text-amber-100">
                        {food.name}
                      </h4>
                    </div>
                    <p className="text-[10px] text-purple-300/80 line-clamp-1 mt-0.5">
                      {food.desc}
                    </p>

                    {/* Stat Boost Pills */}
                    <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono font-bold border border-amber-500/30">
                        +{food.ageGain.toFixed(1)} Tuổi
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/30">
                        +{food.heightGain.toFixed(1)} cm
                      </span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-300 font-mono font-bold border border-pink-500/30">
                        +{food.weightGain.toFixed(1)} kg
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
