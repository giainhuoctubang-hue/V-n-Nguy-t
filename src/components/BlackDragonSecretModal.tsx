import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Sparkles, Heart, Shield, Droplets, Flame, X, Info } from 'lucide-react';
import { DICH_CHI_PROFILE } from '../data/characterData';
import {
  GrowthStats,
  FoodItem,
  FOOD_MENU,
  getGrowthStage,
  calculateDragonWeight,
  MAX_HUMAN_HEIGHT,
  MAX_HUMAN_WEIGHT,
} from '../types/growth';

interface BlackDragonSecretModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInteract: (prompt: string) => void;
  growth: GrowthStats;
  onFeedFood?: (food: FoodItem) => void;
}

export const BlackDragonSecretModal: React.FC<BlackDragonSecretModalProps> = ({
  isOpen,
  onClose,
  onInteract,
  growth,
  onFeedFood,
}) => {
  const [scaleShineLevel, setScaleShineLevel] = useState<number>(60);
  const [reactionText, setReactionText] = useState<string | null>(null);
  const [isSparkling, setIsSparkling] = useState<boolean>(false);

  if (!isOpen) return null;

  const stage = getGrowthStage(growth.age);
  const progressPercent = Math.min(100, Math.max(0, Math.round(((growth.age - 14) / (16 - 14)) * 100)));

  const dragonLen = growth.dragonLength || 3.5;
  const dragonWeightCan = calculateDragonWeight(dragonLen);

  const handleBrushScales = () => {
    sound.playChime();
    setIsSparkling(true);
    setScaleShineLevel((prev) => Math.min(100, prev + 15));
    const quotes = [
      `*Dịch Chi nằm cuộn tròn trong lòng bạn, thân rồng dài ${dragonLen.toFixed(1)}m bụ bẫm đen tuyền ánh lam ngọc quấn chặt lấy eo bạn, từng phiến vảy sáng loáng như gương soi*: "Ưm... cọ chỗ vảy ở hõm lưng nữa đi... Thân rồng ta dài ${dragonLen.toFixed(1)}m nặng tới ${dragonWeightCan.toLocaleString('vi-VN')} cân đấy, ngươi cọ cho cẩn thận từng phiến một vào!"`,
      `*Dịch Chi thở dốc run rẩy, cả người mềm oặt dựa vào ngực Thần Quân, phát ra tiếng gầm gừ nhỏ êm ái như tiếng mèo rên*: "Thoải mái quá... Vảy Hắc Long của ta sáng bóng nhất đúng không? Nhìn xem, phản chiếu cả ánh trăng rồi kìa!"`,
      `*Thân rồng đen tuyền ${dragonLen.toFixed(1)}m khẽ siết lấy cổ tay bạn nũng nịu*: "Cọ nhẹ tay thôi đồ ngốc! Nhưng mà... đừng có dừng lại... tiếp tục cọ vảy cho ta đi~"`,
    ];
    const picked = quotes[Math.floor(Math.random() * quotes.length)];
    setReactionText(picked);
    setTimeout(() => setIsSparkling(false), 1500);
  };

  const handleTouchHorns = () => {
    sound.playSweetBite();
    const quotes = [
      '*Dịch Chi ôm lấy hai chiếc sừng non đen nhánh mềm mại trên trán, khuôn mặt diễm lệ đỏ ửng như ráng chiều, nốt lệ chí dưới mắt trái khẽ rung*: "A... đừng... Sừng non của ta mới nhú, cực kỳ mẫn cảm... Ngươi xoa như thế làm cả người ta mềm oặt ra rồi này!"',
      '*Dịch Chi ngửa đầu, để mặc ngón tay ấm áp của bạn xoa nắn hai sừng rồng non, đôi mắt hoa đào xanh biếc ngập nước ầng ậng*: "Ngươi xấu xa... Chỗ nhạy cảm nhất của Hắc Long ta mà ngươi cũng dám nghịch... Nhưng mà... ấm quá..."',
    ];
    setReactionText(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const handlePetChubbyTail = () => {
    sound.playStamp();
    const quotes = [
      `*Thân rồng dài ${dragonLen.toFixed(1)}m nặng ${dragonWeightCan.toLocaleString('vi-VN')} cân cộm sau ba vạt áo sa giật nảy lên, sau đó quấn chặt lấy eo bạn*: "Này! Thân rồng của ta chỉ hơi bụ bẫm một chút xíu thôi! Ai cho ngươi bảo là làm cộm vạt áo sa chứ?! Mau thả đuôi ta ra!"`,
      '*Dịch Chi đỏ mặt vội vàng lấy vạt áo sa đỏ nhạt kéo xuống che đuôi nhưng không kịp, chiếc đuôi bụ bẫm cứ ngoe nguẩy đập đập xuống giường*: "Không được sờ nữa! Người ngoài nhìn thấy là tưởng ta là quái vật nhỏ cho xem... Chỉ... chỉ có ngươi mới được nhìn thôi đấy!"',
    ];
    setReactionText(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const handleFeed = (type: 'soup' | 'stone' | 'fruit') => {
    sound.playSweetBite();
    let foodItem = FOOD_MENU[0];
    if (type === 'stone') foodItem = FOOD_MENU[2];
    if (type === 'fruit') foodItem = FOOD_MENU[1];

    if (onFeedFood) {
      onFeedFood(foodItem);
    }

    setReactionText(foodItem.reactionQuote);
  };

  const handleSendToChat = () => {
    if (reactionText) {
      onInteract(reactionText);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-neutral-950 via-purple-950 to-indigo-950 border-2 border-amber-500/50 rounded-2xl shadow-2xl p-4 sm:p-6 text-purple-100 overflow-hidden my-auto">
        {/* Glow & Sparkles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-2 rounded-full bg-purple-900/50 hover:bg-rose-900/60 text-purple-300 hover:text-rose-200 transition-colors border border-purple-700/40"
        >
          <X size={18} />
        </button>

        {/* Header with Secret Seal */}
        <div className="flex items-start gap-3 border-b border-purple-800/60 pb-3 sm:pb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-neutral-900 via-purple-900 to-amber-500 p-0.5 shadow-lg shrink-0">
            <div className="w-full h-full bg-neutral-950 rounded-[10px] flex items-center justify-center text-2xl">
              🐉
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-amber-300">
                Huyết Mạch Hắc Long (Trạng Thái Ẩn)
              </h3>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-neutral-900 text-amber-200 border border-amber-500/40 font-semibold tracking-wide">
                BÁN LONG THỂ • CƠ MẬT
              </span>
            </div>
            <p className="text-xs text-purple-300/90 mt-0.5 flex items-center gap-1.5 flex-wrap">
              <span>Huyết mạch Hắc Long</span>
              <span>•</span>
              <span className="text-pink-300 font-semibold bg-pink-950/70 px-1.5 py-0.5 rounded border border-pink-500/30">🎂 Sinh ngày 15/5</span>
              <span>•</span>
              <span>Cần tẩm bổ đến sinh nhật 15/5 năm 16 tuổi mới thành niên</span>
            </p>
          </div>
        </div>

        {/* Notice: Avatar remains normal */}
        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200">
          <Info size={16} className="shrink-0 text-amber-400" />
          <span>
            <strong>Quy tắc bí mật:</strong> Thân rồng dài không giới hạn (đến 100m+) và cân nặng (10m = 900 cân) được ẩn kín, không hiển thị công khai ở ngoài. Avatar vẫn giữ diện mạo 3 vạt áo sa mỏng manh.
          </span>
        </div>

        {/* Two Forms Side by Side Cards */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Card 1: Hình Người */}
          <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-700/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <span>👤 Vóc Dáng Hình Người:</span>
              </span>
              <span className="text-[10px] bg-purple-950 px-2 py-0.5 rounded text-purple-300">Công khai</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
              <div className="bg-purple-950/70 p-1.5 rounded border border-purple-800">
                <div className="text-purple-300 text-[10px]">Chiều Cao:</div>
                <div className="text-cyan-300 font-bold">{growth.height.toFixed(1)} cm</div>
                <div className="text-[9px] text-purple-400">Giới hạn: 1m90</div>
              </div>
              <div className="bg-purple-950/70 p-1.5 rounded border border-purple-800">
                <div className="text-purple-300 text-[10px]">Cân Nặng:</div>
                <div className="text-pink-300 font-bold">{growth.weight.toFixed(1)} kg</div>
                <div className="text-[9px] text-purple-400">Giới hạn: 82.0 kg</div>
              </div>
            </div>
          </div>

          {/* Card 2: Thân Rồng Cơ Mật */}
          <div className="p-3 rounded-xl bg-neutral-900/80 border border-amber-500/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <span>🐉 Chân Thân Hắc Long (Ẩn):</span>
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">Cơ mật</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
              <div className="bg-neutral-950 p-1.5 rounded border border-neutral-700">
                <div className="text-amber-200 text-[10px]">Chiều Dài Rồng:</div>
                <div className="text-amber-300 font-bold">{dragonLen.toFixed(1)} mét</div>
                <div className="text-[9px] text-emerald-400">Đến 100m+</div>
              </div>
              <div className="bg-neutral-950 p-1.5 rounded border border-neutral-700">
                <div className="text-pink-200 text-[10px]">Cân Nặng Rồng:</div>
                <div className="text-pink-300 font-bold">{dragonWeightCan.toLocaleString('vi-VN')} Cân</div>
                <div className="text-[9px] text-pink-400">10m = 900 Cân</div>
              </div>
            </div>
          </div>
        </div>

        {/* Growth & Nourishment Progress Bar (14 -> 16 years old) */}
        <div className="mt-3 p-3.5 rounded-xl bg-purple-900/40 border border-purple-700/50 space-y-2">
          <div className="flex items-center justify-between text-xs flex-wrap gap-1">
            <span className="font-semibold text-amber-200 flex items-center gap-1.5">
              <span>🍲 Tiến Độ Nuôi Dưỡng Tẩm Bổ Hắc Long:</span>
            </span>
            <div className="flex items-center gap-2 font-mono text-xs flex-wrap">
              <span className="font-bold text-amber-300">
                {growth.age.toFixed(1)} / 16.0 Tuổi
              </span>
              <span className="text-amber-400 font-bold px-1.5 py-0.2 rounded bg-amber-500/20 border border-amber-400/40">
                🐉 {growth.dragonPotential || 25}% Tiềm Năng
              </span>
            </div>
          </div>
          <div className="w-full h-3 bg-neutral-950 rounded-full overflow-hidden border border-purple-800 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-pink-500 to-teal-400 rounded-full transition-all duration-700 relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-purple-300/80">
            <span>Ấu Long (14 Tuổi • 145cm)</span>
            <span className="text-amber-300 font-semibold">{stage.stageName}</span>
            <span>Trưởng Thành (16 Tuổi • Hướng tới 1m90 & Thân rồng 100m)</span>
          </div>

          {/* Quick feeding buttons */}
          <div className="pt-1 flex flex-wrap gap-2">
            <button
              onClick={() => handleFeed('soup')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-900/50 hover:bg-amber-800/70 border border-amber-600/40 text-xs text-amber-200 transition-all active:scale-95 cursor-pointer"
            >
              <span>🍲 Canh Long Tủy (+3m rồng)</span>
            </button>
            <button
              onClick={() => handleFeed('stone')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-900/50 hover:bg-indigo-800/70 border border-indigo-500/40 text-xs text-indigo-200 transition-all active:scale-95 cursor-pointer"
            >
              <span>💎 Linh Thạch (+4.5m rồng)</span>
            </button>
            <button
              onClick={() => handleFeed('fruit')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-900/50 hover:bg-rose-800/70 border border-rose-500/40 text-xs text-rose-200 transition-all active:scale-95 cursor-pointer"
            >
              <span>🍑 Đào Tiên Vạn Năm (+1.5m rồng)</span>
            </button>
            <button
              onClick={() => {
                sound.playChime();
                if (onFeedFood) {
                  onFeedFood(FOOD_MENU[6]); // Cửu chuyển hóa long đan
                }
                setReactionText(
                  `*Dịch Chi ôm lấy hộp quà bọc lụa thêu hoa mai đỏ bạn tặng mừng sinh nhật 15/5, hai mắt sáng lấp lánh như sao trời, thân rồng dài ${dragonLen.toFixed(1)}m nặng ${dragonWeightCan.toLocaleString('vi-VN')} cân ngoe nguẩy đập đập liên hồi vào đùi bạn*: "Oa! Ngươi nhớ sinh nhật 15/5 của ta thật này! Thân rồng ta vừa dài thêm một khúc rồi! Mau bồi bổ tiếp cho ta mau lớn tới 16 tuổi đi!"`
                );
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-900/60 to-rose-900/60 hover:from-pink-800/80 hover:to-rose-800/80 border border-pink-400/50 text-xs text-pink-200 transition-all active:scale-95 cursor-pointer"
            >
              <span>🎂 Quà Sinh Nhật 15/5 (+8m rồng)</span>
            </button>
          </div>
        </div>

        {/* Dragon Scale Shine Gauge & Polishing */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-neutral-900/80 border border-amber-500/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <span>✨ Độ Sáng Bóng Của Vảy Hắc Long:</span>
              </span>
              <span className="font-mono text-teal-300 font-bold">{scaleShineLevel}%</span>
            </div>
            <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden border border-neutral-700">
              <div
                className="h-full bg-gradient-to-r from-neutral-600 via-teal-400 to-amber-300 transition-all duration-500"
                style={{ width: `${scaleShineLevel}%` }}
              />
            </div>
            <p className="text-[11px] text-purple-300/80 italic">
              "Thích được cọ vảy cho sáng bóng phát mê, cọ càng sáng thì càng ngoan ngoãn."
            </p>
          </div>

          <div className="p-3 rounded-xl bg-purple-900/30 border border-purple-700/40 space-y-1.5">
            <span className="font-bold text-pink-300 block">Đặc điểm Bán Long Thể:</span>
            <p className="text-[11px] text-purple-200">
              • <strong>Hai sừng non trên góc trán:</strong> Mềm mại, đen nhánh, cực kỳ mẫn cảm.
            </p>
            <p className="text-[11px] text-purple-200">
              • <strong>Thân rồng dài uy vũ ({dragonLen.toFixed(1)}m):</strong> Mọc từ hõm lưng, ngoe nguẩy làm cộm một góc ba vạt áo sa.
            </p>
            <p className="text-[11px] text-purple-200">
              • <strong>Giữ kín như bưng:</strong> Tuyệt đối không cho ai khác chạm vào, chỉ cho Thần Quân cưng nựng.
            </p>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="mt-3.5 space-y-2">
          <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} />
            <span>Tương Tác Cùng Dáng Vẻ Bán Long:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={handleBrushScales}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center text-center gap-1 transition-all active:scale-95 ${
                isSparkling
                  ? 'bg-amber-600/40 border-amber-300 text-amber-100 scale-102 shadow-lg shadow-amber-500/20'
                  : 'bg-gradient-to-b from-amber-950/60 to-purple-950/80 hover:bg-amber-900/60 border-amber-500/40 text-amber-200'
              }`}
            >
              <span className="text-xl">✨🐉</span>
              <span className="text-xs font-bold">Cọ Vảy Cho Sáng Bóng</span>
              <span className="text-[10px] text-purple-300/80">Sở thích bí mật tột đỉnh</span>
            </button>

            <button
              onClick={handleTouchHorns}
              className="p-2.5 rounded-xl bg-gradient-to-b from-purple-950/60 to-indigo-950/80 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 flex flex-col items-center justify-center text-center gap-1 transition-all active:scale-95"
            >
              <span className="text-xl">🦌</span>
              <span className="text-xs font-bold">Xoa 2 Sừng Non Góc Trán</span>
              <span className="text-[10px] text-pink-300/80">Nhạy cảm, mềm nhũn người</span>
            </button>

            <button
              onClick={handlePetChubbyTail}
              className="p-2.5 rounded-xl bg-gradient-to-b from-rose-950/60 to-purple-950/80 hover:bg-rose-900/60 border border-rose-500/40 text-rose-200 flex flex-col items-center justify-center text-center gap-1 transition-all active:scale-95"
            >
              <span className="text-xl">🐾</span>
              <span className="text-xs font-bold">Vuốt Thân Rồng Bụ Bẫm</span>
              <span className="text-[10px] text-rose-300/80">Làm cộm một góc áo sa</span>
            </button>
          </div>
        </div>

        {/* Live Reaction Box */}
        {reactionText && (
          <div className="mt-4 p-3.5 rounded-xl bg-purple-950/90 border border-pink-500/50 shadow-lg space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between text-[11px] text-pink-300">
              <span className="font-bold flex items-center gap-1">
                <span>👑 Dịch Chi (Bán Long Thể):</span>
              </span>
              <span className="italic">Vừa phản ứng</span>
            </div>
            <p className="text-xs sm:text-sm text-purple-100 font-serif leading-relaxed italic">
              {reactionText}
            </p>
            <div className="pt-1 flex justify-end">
              <button
                onClick={handleSendToChat}
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-pink-600 hover:from-amber-500 hover:to-pink-500 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <span>Gửi lời trêu này vào cuộc trò chuyện 💬</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

