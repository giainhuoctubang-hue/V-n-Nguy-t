import React from 'react';
import { DICH_CHI_PROFILE, RELATED_CHARACTERS, RelatedCharacter } from '../data/characterData';
import { sound } from '../utils/audio';
import { Sparkles, MessageCircle, Heart, Shield, Swords, AlertOctagon } from 'lucide-react';
import { GrowthStats, getGrowthStage } from '../types/growth';

interface CharacterLoreModalProps {
  growth: GrowthStats;
  onAskDichChiAbout: (characterName: string) => void;
  onNavigateToChat: () => void;
}

export const CharacterLoreModal: React.FC<CharacterLoreModalProps> = ({
  growth,
  onAskDichChiAbout,
  onNavigateToChat,
}) => {
  const stage = getGrowthStage(growth.age);

  const handleAskCharacter = (char: RelatedCharacter) => {
    sound.playChime();
    onAskDichChiAbout(`*Hỏi Dịch Chi nghĩ gì về ${char.name} (${char.title}) và lý do tại sao nhóc lại hay bị người này làm cho đau đầu*`);
    onNavigateToChat();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
          Sổ Tay Nhân Vật & Quan Hệ Ma Thần
        </h2>
        <p className="text-xs sm:text-sm text-purple-300/80 max-w-xl mx-auto">
          Hồ sơ chi tiết về Tiểu Điện Hạ Dịch Chi và những nhân vật thường xuyên góp mặt trong chuỗi
          ngày gà bay chó sủa giữa hai cõi Thần - Ma.
        </p>
      </div>

      {/* Dịch Chi Main Detailed Dossier */}
      <div className="bg-gradient-to-br from-purple-950 via-indigo-950 to-purple-900 border-2 border-purple-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-purple-800/50 pb-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-3xl">👑</span>
              <h3 className="text-2xl font-serif font-bold text-amber-200">
                {DICH_CHI_PROFILE.name}
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                {DICH_CHI_PROFILE.title}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-semibold">
                ♂️ Giới tính: Nam (Thiếu niên 14 tuổi • Vị hôn phu)
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ⚔️ Hôn ước Đam Mỹ: Thần Quân (Nam) x Dịch Chi (Nam)
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r ${stage.badgeColor} text-white font-bold`}>
                ⭐ {stage.stageName}
              </span>
            </div>
            <p className="text-xs text-purple-300/80 mt-1 font-mono flex items-center gap-2 flex-wrap">
              <span className="text-amber-300 font-bold">Tuổi: {growth.age.toFixed(1)}</span>
              <span>•</span>
              <span className="text-pink-300 font-semibold bg-pink-950/60 px-2 py-0.5 rounded border border-pink-500/30">🎂 Sinh nhật: {DICH_CHI_PROFILE.birthday}</span>
              <span>•</span>
              <span className="text-cyan-300 font-bold">Chiều cao: {growth.height.toFixed(1)} cm</span>
              <span>•</span>
              <span className="text-rose-300 font-bold">Cân nặng: {growth.weight.toFixed(1)} kg</span>
              <span>•</span>
              <span className="text-emerald-400 font-sans">({growth.feedCount > 0 ? `Đã lớn thêm +${(growth.height - 145).toFixed(1)}cm sau ${growth.feedCount} lần bồi bổ` : 'Khởi điểm 14 tuổi, được đút ăn sẽ mau lớn'})</span>
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
            <span>🍋 Mùi hương đặc trưng:</span>
            <strong>{DICH_CHI_PROFILE.appearance.scent}</strong>
          </div>
        </div>

        {/* Appearance Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="bg-purple-900/40 p-3 rounded-xl border border-purple-800/40">
            <span className="text-purple-400 font-semibold block mb-1">Mái tóc & Nhuộm đen:</span>
            <p className="text-purple-100">{DICH_CHI_PROFILE.appearance.hair}</p>
          </div>
          <div className="bg-purple-900/40 p-3 rounded-xl border border-purple-800/40">
            <span className="text-purple-400 font-semibold block mb-1">Ánh mắt hoa đào:</span>
            <p className="text-purple-100">{DICH_CHI_PROFILE.appearance.eyes}</p>
          </div>
          <div className="bg-purple-900/40 p-3 rounded-xl border border-purple-800/40">
            <span className="text-purple-400 font-semibold block mb-1">Đôi bàn tay tuyệt mỹ:</span>
            <p className="text-purple-100">{DICH_CHI_PROFILE.appearance.hands}</p>
          </div>
          <div className="bg-purple-900/40 p-3 rounded-xl border border-purple-800/40">
            <span className="text-purple-400 font-semibold block mb-1">Làn da & Khí chất:</span>
            <p className="text-purple-100">{DICH_CHI_PROFILE.appearance.skin}</p>
          </div>
        </div>

        {/* Secret Black Dragon Bloodline Dossier */}
        <div className="bg-gradient-to-r from-neutral-950 via-purple-950 to-neutral-900 border-2 border-amber-500/50 rounded-xl p-4 sm:p-5 space-y-3.5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-amber-500/30 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐉</span>
              <h4 className="text-sm sm:text-base font-bold text-amber-300 font-serif tracking-wide">
                Bí Mật Huyết Mạch: Hắc Long Nhất Tộc
              </h4>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-neutral-950 text-amber-300 border border-amber-400/50 font-bold uppercase tracking-wider">
                Trạng Thái Ẩn (Không đổi Avatar)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-200 border border-rose-600/40 font-mono">
                🎂 Sinh nhật: 15/5
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900 text-purple-200 border border-purple-600/40 font-mono">
                14 / 16 Tuổi Trưởng Thành
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-purple-950/60 p-3 rounded-xl border border-amber-500/30 space-y-1.5">
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <span>🦌 Hai Sừng Non Góc Trán:</span>
              </span>
              <p className="text-purple-200 leading-relaxed">
                {DICH_CHI_PROFILE.dragonBloodline.horns}
              </p>
            </div>

            <div className="bg-purple-950/60 p-3 rounded-xl border border-purple-600/30 space-y-1.5">
              <span className="font-bold text-pink-300 flex items-center gap-1">
                <span>🐾 Đuôi Rồng Bụ Bẫm Cộm Áo:</span>
              </span>
              <p className="text-purple-200 leading-relaxed">
                {DICH_CHI_PROFILE.dragonBloodline.tail}
              </p>
            </div>

            <div className="bg-purple-950/60 p-3 rounded-xl border border-teal-500/30 space-y-1.5">
              <span className="font-bold text-teal-300 flex items-center gap-1">
                <span>✨ Sở Thích Cọ Vảy Sáng Bóng:</span>
              </span>
              <p className="text-purple-200 leading-relaxed">
                {DICH_CHI_PROFILE.dragonBloodline.secretHabit}
              </p>
            </div>
          </div>

          <div className="bg-neutral-950/70 p-3 rounded-lg border border-purple-800/40 text-xs text-purple-200/90 leading-relaxed space-y-1">
            <p>
              <strong className="text-amber-300">Cơ chế nuôi dưỡng tẩm bổ & Ngày sinh 15/5: </strong>
              Dịch Chi sinh ngày <strong>15/5</strong>, hiện tại 14 tuổi. Là ấu long mang huyết mạch tôn quý của Hắc Long nhất tộc, nhóc cần được Thần Quân nuôi dưỡng, bồi bổ linh dược quý hiếm đến đúng ngày sinh nhật 15/5 năm 16 tuổi (tròn 2 năm nữa) mới đủ tuổi trưởng thành và hóa hình rồng hoàn mỹ. Trường kiếm Nhu Bạch hay đi đánh người ta tơi bời rồi cướp linh thạch tha về chính là để bồi bổ cho cơ thể rồng non của Dịch Chi mau lớn.
            </p>
            <p>
              <strong className="text-rose-300">Tính cách & Cấm kỵ: </strong>
              Thường ngày Dịch Chi giấu nhẹm Bán Long Thể đi, tuyệt đối không cho ai động đến sừng non hay đuôi bụ bẫm vì sợ mất mặt. Chỉ khi xúc động, giận dỗi, say giấc hoặc nũng nịu thì sừng và đuôi mới lén nhú ra cộm vạt áo, và chỉ có Thần Quân mới được chạm vào cọ vảy.
            </p>
          </div>
        </div>

        {/* Weapons Showcase: Bút Vạn Cảnh & Kiếm Nhu Bạch */}
        <div className="bg-gradient-to-r from-amber-950/40 via-purple-950/60 to-indigo-950/50 border border-amber-600/40 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
            <span>⚔️ Vũ Khí & Pháp Bảo Độc Môn Của Tiểu Điện Hạ</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-purple-900/40 p-3.5 rounded-xl border border-amber-500/30 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <span>🖌️ Bút Vạn Cảnh</span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-200">
                  Nhất Phẩm Thần Khí
                </span>
              </div>
              <p className="text-xs text-purple-200 leading-relaxed">
                {DICH_CHI_PROFILE.weapons.brush}
              </p>
            </div>

            <div className="bg-purple-900/40 p-3.5 rounded-xl border border-indigo-500/30 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                <span>⚔️ Trường Kiếm Nhu Bạch</span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-200">
                  Kiếm Linh Mất Nết
                </span>
              </div>
              <p className="text-xs text-purple-200 leading-relaxed">
                {DICH_CHI_PROFILE.weapons.sword}
              </p>
            </div>
          </div>
        </div>

        {/* Attire & Accessories Detailed Showcase */}
        <div className="bg-gradient-to-r from-sky-950/60 via-purple-950/70 to-rose-950/60 border border-purple-700/40 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <span>👘 Y Phục Hôm Nay & Phụ Kiện Hộ Thân</span>
            </h4>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
              3 Lớp Mỏng Manh • Chân Trần
            </span>
          </div>

          <div className="bg-purple-900/40 p-3 rounded-lg border border-purple-700/30 text-xs text-purple-100 leading-relaxed space-y-1.5">
            <p>
              <strong className="text-rose-300">Ba vạt áo mỏng manh hôm nay: </strong>
              Lớp trong cùng màu trắng ngà thuần khiết, phối cùng lớp giữa màu xanh ngọc nhạt thanh tân dịu mát, bên ngoài khoác áo sa mỏng manh màu đỏ nhạt trễ hờ hững xuống một bên vai để lộ cần cổ trắng ngần cuốn hút.
            </p>
            <p>
              <strong className="text-emerald-300">Xích đu hoa ngọc: </strong>
              Dịch Chi ngồi đung đưa trên chiếc xích đu kết bằng hoa ngọc lung linh, chân trần trắng nõn đung đưa, cổ chân trái thắt chỉ đỏ định vị, tay cầm Bút Vạn Cảnh hào hứng vẽ linh phù mới giữa không trung.
            </p>
            <p>
              <strong className="text-pink-300">Nốt lệ chí kiều diễm & Phụ kiện: </strong>
              Dưới mí mắt trái điểm xuyết một nốt lệ chí nhỏ nhắn quyến rũ; trên đầu cài trâm ngọc, trâm bạc và bộ diêu lấp lánh; một bím tóc nhỏ có chuông hoa linh lan bạc rung lên leng keng vang dội hòa cùng tiếng chuông nhỏ trên vòng hộ tâm ở cổ.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {DICH_CHI_PROFILE.appearance.accessories.map((acc, idx) => (
              <div key={idx} className="bg-purple-900/50 p-2.5 rounded-lg border border-purple-700/30 text-xs flex items-start gap-2">
                <span className="text-amber-400 shrink-0">❖</span>
                <span className="text-purple-200">{acc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Favorite Colors & Favorite Flowers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-purple-900/30 border border-purple-700/30 p-3.5 rounded-xl space-y-2">
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <span>🎨 Màu Sắc Yêu Thích:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2.5 py-1 rounded-lg bg-blue-950 text-blue-200 border border-blue-500/40 font-medium">
                🌊 Xanh biển
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-neutral-950 text-neutral-200 border border-neutral-600/40 font-medium">
                🌑 Đen
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-200 border border-indigo-500/40 font-medium">
                🔮 Tím lai xanh
              </span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-rose-950 text-rose-200 border border-rose-500/40 font-medium">
                🥀 Đỏ thắm
              </span>
            </div>
          </div>

          <div className="bg-purple-900/30 border border-purple-700/30 p-3.5 rounded-xl space-y-2">
            <span className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
              <span>🌸 Hoa Yêu Thích:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {DICH_CHI_PROFILE.favorites.flowers.map((flw, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-purple-950/80 text-pink-200 border border-pink-500/30">
                  🌺 {flw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Personality Deep-Dive */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={15} />
            <span>Đặc Điểm Tính Cách:</span>
          </h4>

          <div className="flex flex-wrap gap-2">
            {DICH_CHI_PROFILE.personality.traits.map((trait, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-lg bg-purple-900/60 text-purple-200 border border-purple-700/40"
              >
                ✦ {trait}
              </span>
            ))}
          </div>

          <div className="bg-rose-950/40 border border-rose-800/40 rounded-xl p-4 mt-3 space-y-1.5 text-xs text-rose-200">
            <span className="font-bold text-rose-300 block mb-1 flex items-center gap-1.5">
              <AlertOctagon size={14} />
              <span>Góc Khuất Nội Tâm (Ẩn Tàng):</span>
            </span>
            {DICH_CHI_PROFILE.personality.hidden.map((h, idx) => (
              <p key={idx} className="leading-relaxed">
                • {h}
              </p>
            ))}
          </div>
        </div>

        {/* Likes and Dislikes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-purple-900/30 border border-purple-700/30 p-3.5 rounded-xl space-y-2">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
              <span>💖 Sở Thích:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {DICH_CHI.likes.map((like, i) => (
                <span key={i} className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-200">
                  {like}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-purple-900/30 border border-purple-700/30 p-3.5 rounded-xl space-y-2">
            <span className="text-xs font-bold text-rose-300 flex items-center gap-1">
              <span>💔 Sở Ghét Cực Độ:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {DICH_CHI.dislikes.map((dislike, i) => (
                <span key={i} className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-200">
                  {dislike}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Characters Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold font-serif text-amber-200 flex items-center gap-2">
          <span>👥 Các Nhân Vật Liên Quan Trong Lore</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RELATED_CHARACTERS.map((char) => (
            <div
              key={char.name}
              className="bg-purple-950/60 border border-purple-800/40 rounded-xl p-4 flex flex-col justify-between hover:border-purple-600/60 transition-all space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{char.avatarIcon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-amber-200">{char.name}</h4>
                      <p className="text-[11px] text-purple-300/80">{char.title}</p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      char.faction === 'Ma Giới'
                        ? 'bg-purple-900 text-purple-200 border border-purple-700'
                        : char.faction === 'Thần Tộc'
                        ? 'bg-amber-900/60 text-amber-200 border border-amber-600'
                        : 'bg-cyan-900/60 text-cyan-200 border border-cyan-600'
                    }`}
                  >
                    {char.faction}
                  </span>
                </div>

                <p className="text-xs text-purple-200/90 leading-relaxed mb-3">{char.desc}</p>

                <div className="p-2.5 rounded-lg bg-purple-900/40 border border-purple-800/30 text-[11px] text-amber-100/90 italic font-serif">
                  {char.quote}
                </div>
              </div>

              <button
                onClick={() => handleAskCharacter(char)}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-purple-900/50 hover:bg-purple-800/70 border border-purple-700/40 text-xs text-purple-200 hover:text-amber-200 transition-colors"
              >
                <MessageCircle size={13} />
                <span>Hỏi Dịch Chi về {char.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const DICH_CHI = DICH_CHI_PROFILE;
