import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Scroll, Sparkles, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';

interface MarriageContractModalProps {
  stability: number;
  onAttemptStamp: (outcomeText: string) => void;
}

export const MarriageContractModal: React.FC<MarriageContractModalProps> = ({
  stability,
  onAttemptStamp,
}) => {
  const [stampFeedback, setStampFeedback] = useState<string | null>(null);

  const handleSneakStamp = () => {
    sound.playStamp();

    // Funny random outcomes when Dịch Chi tries to stamp the annulment
    const outcomes = [
      {
        soundType: 'sweet',
        msg: '*Dịch Chi nhón chân cầm con dấu hủy hôn định ịn vào thì bị bạn nhanh tay nhét một viên kẹo ngọt vào miệng! Con dấu rơi tõm vào đĩa mật ong.*',
      },
      {
        soundType: 'boom',
        msg: '*Vừa chạm con dấu vào mép lụa vàng, lôi kiếp thượng cổ lập tức lóe sáng đánh văng con dấu ra xa ba thước. Dịch Chi xoa xoa mu bàn tay tê rần, tức tối giậm chân!*',
      },
      {
        soundType: 'chime',
        msg: '*Dịch Chi đè con dấu xuống thật mạnh, nhưng mực chu sa lại bay biến thành hình một con mèo con xù lông, khiến nhóc đỏ mặt vội vàng giấu đi!*',
      },
    ];

    const random = outcomes[Math.floor(Math.random() * outcomes.length)];
    if (random.soundType === 'sweet') sound.playSweetBite();
    else if (random.soundType === 'boom') sound.playFireBoom();
    else sound.playChime();

    setStampFeedback(random.msg);
    onAttemptStamp(random.msg);
  };

  const getStatusDisplay = () => {
    if (stability >= 70) {
      return {
        label: 'Kim Thạch Bất Phá (Vững Chắc Vô Song)',
        color: 'text-amber-300 border-amber-500/50 bg-amber-950/60',
        icon: <ShieldCheck className="text-amber-400" size={16} />,
      };
    }
    if (stability >= 40) {
      return {
        label: 'Linh Quang Ổn Định (Vẫn Chưa Thể Hủy)',
        color: 'text-purple-300 border-purple-500/50 bg-purple-950/60',
        icon: <Sparkles className="text-purple-400" size={16} />,
      };
    }
    return {
      label: 'Khế Ước Rung Chuyển (Dịch Chi Đang Mừng Thầm)',
      color: 'text-rose-300 border-rose-500/50 bg-rose-950/60',
      icon: <AlertTriangle className="text-rose-400" size={16} />,
    };
  };

  const status = getStatusDisplay();

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Scroll Presentation Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
          <Scroll size={14} />
          <span>Vật Định Tình Thiên Cổ • Vô Tình Thành Lập</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
          Thiên Địa Thần Ma Hôn Thư
        </h2>
        <p className="text-xs sm:text-sm text-purple-300/80 max-w-xl mx-auto">
          Cuộn khế ước thượng cổ dệt bằng tơ Kim Thiền và ma tơ ngàn năm, ghi nhận hôn ước thiên định
          giữa hai nam nhân: Thần Quân Thần Tộc chí cao và Tiểu Điện Hạ Ma Giới Dịch Chi (Vị hôn phu).
        </p>
      </div>

      {/* The Ancient Scroll Body */}
      <div className="relative mx-auto max-w-2xl bg-gradient-to-b from-[#2a1b18] via-[#3a2620] to-[#251714] border-4 border-[#8b5a2b] rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden font-serif">
        {/* Decorative corner patterns */}
        <div className="absolute top-2 left-2 text-[#d4af37] text-xl opacity-40 select-none">❖</div>
        <div className="absolute top-2 right-2 text-[#d4af37] text-xl opacity-40 select-none">❖</div>
        <div className="absolute bottom-2 left-2 text-[#d4af37] text-xl opacity-40 select-none">❖</div>
        <div className="absolute bottom-2 right-2 text-[#d4af37] text-xl opacity-40 select-none">❖</div>

        {/* Scroll Roller Tops */}
        <div className="absolute -top-3 left-0 right-0 h-4 bg-gradient-to-r from-[#5c3a21] via-[#d4af37] to-[#5c3a21] rounded-full shadow-md" />
        <div className="absolute -bottom-3 left-0 right-0 h-4 bg-gradient-to-r from-[#5c3a21] via-[#d4af37] to-[#5c3a21] rounded-full shadow-md" />

        {/* Main Inscription */}
        <div className="text-center space-y-4 pt-2">
          <div className="text-xs tracking-widest text-[#d4af37] uppercase">
            ❖ Cửu Thiên Thập Địa • Chứng Giám Hôn Minh (Đam Mỹ Tiên Hiệp) ❖
          </div>

          <div className="text-xl sm:text-2xl font-bold text-[#f5deb3] tracking-wider py-2 border-y border-[#8b5a2b]/40">
            HÔN ƯỚC MINH THƯ
          </div>

          <p className="text-sm sm:text-base text-[#e6c280] leading-relaxed italic px-2 sm:px-6">
            "Thiên địa hữu linh, nhật nguyệt minh giám. Thần Quân Thiên Giới (Nam) cùng Tiểu Điện Hạ Dịch Chi (Nam thiếu niên Ma Giới)
            kết duyên ước định phu phu. Một khi chưa có sự đồng thuận từ hai phương, bất kỳ âm mưu
            lừa dối, chuốc trà Mạn Đà Lam hay đốt phá đại điện đều vô hiệu trước thiên đạo."
          </p>

          {/* Signatures and Seals */}
          <div className="grid grid-cols-2 gap-6 pt-6 mt-4 border-t border-[#8b5a2b]/30">
            {/* God's Seal */}
            <div className="flex flex-col items-center">
              <span className="text-xs text-[#d4af37] mb-2 font-sans font-semibold">THẦN QUÂN (NAM NHÂN)</span>
              <div className="w-16 h-16 rounded-xl border-2 border-amber-400 bg-amber-500/10 flex items-center justify-center text-amber-300 font-bold text-xs rotate-[-6deg] shadow-lg">
                THẦN TỘC
                <br />
                THÁNH ẤN
              </div>
              <span className="text-[10px] text-amber-200/70 mt-2">Đã Đóng Dấu Vĩnh Cửu</span>
            </div>

            {/* Dịch Chi's Seal Area */}
            <div className="flex flex-col items-center relative">
              <span className="text-xs text-rose-300 mb-2 font-sans font-semibold">DỊCH CHI (NAM • VỊ HÔN PHU)</span>
              <div className="w-16 h-16 rounded-xl border-2 border-dashed border-rose-400/80 bg-rose-500/10 flex flex-col items-center justify-center text-rose-300 text-[10px] rotate-[4deg] shadow-lg p-1 text-center">
                <span>DỊCH CHI</span>
                <span className="text-[8px] text-rose-400/70">(Chưa chịu ấn)</span>
              </div>
              <span className="text-[10px] text-rose-300/80 mt-2 flex items-center gap-1">
                <Flame size={10} className="text-rose-400" />
                <span>Rình rập đóng dấu HỦY</span>
              </span>
            </div>
          </div>

          {/* Current Stability Badge */}
          <div className="pt-4 flex justify-center">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold ${status.color}`}>
              {status.icon}
              <span>{status.label} • {stability}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Stamp Mini-Game Area */}
      <div className="bg-purple-950/70 border border-purple-800/50 rounded-2xl p-5 text-center space-y-3">
        <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider">
          Phòng Ngự Hôn Thư Khỏi Trò Phá Của Dịch Chi
        </h3>
        <p className="text-xs text-purple-300/80 max-w-md mx-auto">
          Dịch Chi đang lén giấu con dấu hủy hôn ước sau lưng áo tím, rón rén bước tới gần cuộn hôn thư...
        </p>

        <div className="pt-2">
          <button
            onClick={handleSneakStamp}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 via-purple-700 to-amber-600 hover:from-rose-600 hover:to-amber-500 text-amber-100 font-bold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            🐾 Bắt Quả Tang Dịch Chi Đang Rình Đóng Dấu Hủy Hôn!
          </button>
        </div>

        {stampFeedback && (
          <div className="mt-3 p-3.5 rounded-xl bg-purple-900/60 border border-purple-700/50 text-xs sm:text-sm text-amber-200 font-serif italic max-w-lg mx-auto animate-fade-in">
            {stampFeedback}
          </div>
        )}
      </div>
    </div>
  );
};
