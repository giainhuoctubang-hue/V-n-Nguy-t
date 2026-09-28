import React, { useState } from 'react';
import portraitImg from '../assets/images/dich_chi_pink_robe_1790605680051.jpg';
import dragonFormImg from '../assets/images/dich_chi_dragon_form_1790590147564.jpg';
import { sound } from '../utils/audio';
import { GrowthStats, FoodItem, FOOD_MENU, getGrowthStage } from '../types/growth';
import { Flame, Eye, Sparkles } from 'lucide-react';

interface CharacterAvatarProps {
  mood: string;
  stability: number;
  schemeProgress: number;
  growth: GrowthStats;
  onQuickInteract?: (text: string) => void;
  onFeed?: (food: FoodItem) => void;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  mood,
  stability,
  schemeProgress,
  growth,
  onQuickInteract,
  onFeed,
}) => {
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [isPouting, setIsPouting] = useState(false);
  const [feedToast, setFeedToast] = useState<string | null>(null);
  const [forcePreviewMode, setForcePreviewMode] = useState<'auto' | 'normal' | 'dragon'>('auto');

  const stage = getGrowthStage(growth.age);
  const isDragonAwakened =
    forcePreviewMode === 'dragon' ||
    (forcePreviewMode === 'auto' && (growth.dragonPotential >= 100 || growth.isDragonFormAwakened));

  const currentAvatarSrc = isDragonAwakened ? dragonFormImg : portraitImg;

  const handleQuickFeed = (food: FoodItem) => {
    sound.playSweetBite();
    setFeedToast(`+${food.ageGain.toFixed(1)}T • +${food.heightGain.toFixed(1)}cm • +${food.dragonPotentialGain}% Tiềm Năng`);
    if (onFeed) {
      onFeed(food);
    }
    setTimeout(() => setFeedToast(null), 2500);
  };

  const handleAvatarClick = (
    zone: 'cheek' | 'hair' | 'bell' | 'anklet' | 'brush' | 'sword' | 'hand' | 'barefoot' | 'robe' | 'mole' | 'swing' | 'lilybell' | 'birthday' | 'horns' | 'tail'
  ) => {
    setIsPouting(true);
    if (zone === 'horns') {
      sound.playSweetBite();
      setBubbleText('*Dịch Chi ôm lấy hai sừng rồng non đen nhánh mềm mại trên trán, khuôn mặt diễm lệ đỏ ửng như ráng chiều*: "A... đừng chạm vào sừng rồng của ta! Tiềm năng Hắc Long đầy làm sừng nhạy cảm lắm, ngươi xoa làm cả người ta mềm nhũn rồi này!"');
      if (onQuickInteract) onQuickInteract('*Nhẹ nhàng đưa ngón tay ấm áp xoa nắn hai chiếc sừng rồng đen nhánh đang phát ra ánh lam quang uy vũ trên trán Dịch Chi*');
    } else if (zone === 'tail') {
      sound.playStamp();
      setBubbleText('*Chiếc đuôi rồng dài bụ bẫm đen tuyền ánh lam ngọc quấn chặt lấy cổ tay bạn*: "Đuôi của ta lộ ra rồi... cấm ngươi được chê cười! Ngươi nuôi ta no nê làm long khí tràn trề đấy nhé, mau lại đây cọ bóng vảy đuôi cho ta!"');
      if (onQuickInteract) onQuickInteract('*Cầm lấy chiếc đuôi rồng bụ bẫm đen tuyền đang ngoe nguẩy cộm cả vạt áo sa mỏng manh của Dịch Chi, cưng nựng xoa vuốt*');
    } else if (zone === 'birthday') {
      sound.playChime();
      setBubbleText('*Dịch Chi hai mắt sáng rực như sao, chuông hoa linh lan reo leng keng*: "Ngươi nhớ sinh nhật ngày 15/5 của ta sao?! Thế... quà sinh nhật đâu? 14 tuổi rồi, ta muốn ăn thật nhiều linh thạch ngọt ngào và đòi Thần Quân cọ vảy rồng cơ!"');
      if (onQuickInteract) onQuickInteract('*Mỉm cười xoa đầu Dịch Chi, nhắc nhớ ngày sinh nhật 15/5 của nhóc và hỏi nhóc sinh nhật tuổi 14 năm nay muốn được tặng quà gì*');
    } else if (zone === 'mole') {
      sound.playSweetBite();
      setBubbleText('*Dịch Chi chớp đôi mắt hoa đào xanh biếc ngập nước, nốt lệ chí dưới mí mắt trái khẽ rung*: "Này... ngươi nhìn chằm chằm nốt lệ chí của ta làm gì chứ?! Người ta bảo có lệ chí là hay khóc, nhưng ta chỉ khóc để bắt đền ngươi thôi đấy!"');
      if (onQuickInteract) onQuickInteract('*Đưa ngón tay khẽ chạm vào nốt lệ chí nhỏ nhắn diễm lệ bên dưới mí mắt trái của Dịch Chi, mỉm cười khen nhóc có nốt lệ chí vừa xinh đẹp vừa kiều diễm*');
    } else if (zone === 'cheek') {
      sound.playSweetBite();
      setBubbleText('*Dịch Chi phồng má kêu oái*: "Này! Ai cho Thần Quân véo má ta?! Má ta để dành ăn linh quả, không phải để ngươi nghịch!"');
      if (onQuickInteract) onQuickInteract('*Bất ngờ đưa tay véo nhẹ hai chiếc má phúng phính trắng hồng thơm mùi chanh non của Dịch Chi*');
    } else if (zone === 'hair') {
      sound.playChime();
      setBubbleText('*Trâm ngọc, trâm bạc và bộ diêu trên đầu Dịch Chi đung đưa leng keng*: "Đừng nghịch trâm ngọc và bộ diêu của ta! Rơi một chiếc là ngươi phải đền mười cây trâm thần giới đấy!"');
      if (onQuickInteract) onQuickInteract('*Ngắm nhìn những cây trâm ngọc, trâm bạc và bộ diêu tinh xảo đung đưa lấp lánh trên mái tóc đen nhánh cài đầy hoa ngọc của Dịch Chi*');
    } else if (zone === 'lilybell') {
      sound.playChime();
      setBubbleText('*Chiếc chuông hoa linh lan bạc ở đuôi bím tóc nhỏ kêu leng keng giòn tan*: "Tiếng chuông linh lan này dễ thương lắm đúng không? Ta chỉ lắc cho Thần Quân ngươi nghe thôi đấy!"');
      if (onQuickInteract) onQuickInteract('*Khẽ gảy nhẹ chiếc chuông hoa linh lan bạc ở đuôi bím tóc nhỏ của Dịch Chi, lắng nghe tiếng chuông leng keng ngân vang trong gió*');
    } else if (zone === 'hand') {
      sound.playSweetBite();
      setBubbleText('*Dịch Chi giật tay lại, hai má đỏ ửng*: "Tay ta đẹp là do luyện kiếm và vẽ bùa, ai cho ngươi cầm lấy ngắm nghía lung tung chứ?!"');
      if (onQuickInteract) onQuickInteract('*Nắm lấy đôi bàn tay búp măng trắng muốt tuyệt mỹ của Dịch Chi, khen ngợi đôi tay vừa thon thả vừa nắm chắc bút kiếm*');
    } else if (zone === 'brush') {
      sound.playFireBoom();
      setBubbleText('*Bút Vạn Cảnh lóe sáng chu sa*: "Mau lùi ra! Ta đang nằm trên sập mềm vẽ phù chú mới đấy, đừng có làm phiền Tiểu Điện Hạ ta tạo linh phù hủy hôn... à không, hộ mệnh!"');
      if (onQuickInteract) onQuickInteract('*Thích thú ngồi bên cạnh ngắm nhìn Dịch Chi nằm nghiêng trên sập mềm vung Bút Vạn Cảnh say mê vẽ phù chú mới, tà sa y hồng nhạt buông lơi*');
    } else if (zone === 'swing') {
      sound.playChime();
      setBubbleText('*Dịch Chi lười biếng nằm nghiêng trên sập mềm gối gấm*: "Nằm trên sập mềm của ngươi thoải mái thật đấy... Đút kẹo thì đút tận miệng cho ta, cấm bắt Tiểu Điện Hạ ta phải ngồi dậy!"');
      if (onQuickInteract) onQuickInteract('*Ngồi sát bên mép sập mềm, mỉm cười xoa nhẹ lưng áo sa hồng nhạt của Dịch Chi và đút đồ ngọt tận miệng dỗ dành nhóc*');
    } else if (zone === 'barefoot') {
      sound.playStamp();
      setBubbleText('*Dịch Chi co nhẹ đôi chân trần trắng nõn trên sập mềm lại, sợi chỉ đỏ khẽ rung*: "Lạnh quá! Ai cho ngươi chạm vào chân trần của ta chứ?! Đồ phu quân hờ không đứng đắn!"');
      if (onQuickInteract) onQuickInteract('*Cúi nhìn đôi bàn chân trần nhỏ nhắn trắng nõn co lười biếng trên sập mềm của Dịch Chi, khẽ chạm vào sợi chỉ đỏ định vị nơi mắt cá chân trái*');
    } else if (zone === 'robe') {
      sound.playSweetBite();
      setBubbleText('*Lớp sa y mỏng manh màu hồng nhạt buông lơi hờ hững để lộ bờ vai thon nõn nà*: "Ngươi nhìn cái gì chứ?! Lớp sa y hồng nhạt này mỏng nhẹ là để nằm cho thoải mái, ai cho Thần Quân ngươi vừa đút ăn vừa nhìn chằm chằm vai ta thế hả?!"');
      if (onQuickInteract) onQuickInteract('*Kéo nhẹ mép sa y mỏng manh màu hồng nhạt đang buông lơi nơi bờ vai thon trắng nõn của Dịch Chi lên, khẽ trêu nhóc mặc sa y hồng nhạt nằm nghiêng trên sập mềm vừa xinh đẹp vừa kiều diễm*');
    } else if (zone === 'bell') {
      sound.playChime();
      setBubbleText('*Tiếng chuông nhỏ trên vòng hộ tâm ở cổ kêu lanh lảnh leng keng êm tai*: "Này! Đụng vào chuông hộ tâm của ta làm gì! Tiếng chuông kêu là phụ vương và đại ca biết ta đang ở cạnh ngươi đấy!"');
      if (onQuickInteract) onQuickInteract('*Đưa ngón tay khẽ gảy nhẹ chiếc chuông bạc nhỏ trên chiếc vòng hộ tâm trước cổ Dịch Chi, lắng nghe tiếng chuông lanh lảnh êm tai*');
    } else if (zone === 'anklet') {
      sound.playStamp();
      setBubbleText('*Sợi chỉ đỏ thần khí ở cổ chân trái Dịch Chi lóe sáng*: "Sợi chỉ đỏ định vị này là do ngươi trói ta lại đúng không?! Đi tới đâu ngươi cũng tìm ra ta, ghét ghê!"');
      if (onQuickInteract) onQuickInteract('*Khẽ chạm vào sợi chỉ đỏ thần khí định vị bảo hộ đeo nơi cổ chân trái của Dịch Chi, mỉm cười trêu nhóc chạy đâu cũng không thoát*');
    }

    setTimeout(() => {
      setIsPouting(false);
    }, 4500);
  };

  // Determine aura colors based on stability & dragon awakened state
  const getAuraColor = () => {
    if (isDragonAwakened) {
      return 'from-amber-400 via-rose-600 to-cyan-400 animate-pulse';
    }
    if (stability >= 75) return 'from-teal-400/40 via-rose-400/30 to-amber-300/40';
    if (stability >= 45) return 'from-emerald-500/40 via-pink-500/30 to-indigo-600/30';
    return 'from-rose-600/40 via-amber-500/30 to-purple-800/40';
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Floating speech bubble when interacted */}
      {bubbleText && (
        <div className="absolute -top-16 z-30 max-w-xs animate-bounce bg-purple-950/95 border border-purple-400/50 text-purple-100 text-xs px-3 py-2 rounded-xl shadow-xl backdrop-blur-md text-center">
          <p className="italic font-serif leading-relaxed">{bubbleText}</p>
          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-purple-950" />
        </div>
      )}

      {/* Portrait with Glowing Xianxia Rim */}
      <div className="relative group cursor-pointer">
        <div
          className={`absolute -inset-2 rounded-full bg-gradient-to-r ${getAuraColor()} blur-md transition duration-500 ${
            isDragonAwakened ? 'scale-110 opacity-90' : 'group-hover:scale-105 opacity-70'
          }`}
        />

        <div
          className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 shadow-2xl bg-neutral-900 transition-all duration-500 ${
            isDragonAwakened
              ? 'border-amber-400 ring-4 ring-amber-400/60 shadow-[0_0_30px_rgba(245,158,11,0.6)]'
              : 'border-teal-400/60'
          }`}
        >
          <img
            src={currentAvatarSrc}
            alt={isDragonAwakened ? 'Dịch Chi (Bán Long Thể Lộ Sừng & Đuôi)' : 'Dịch Chi'}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
              isPouting ? 'scale-105 saturate-125' : ''
            }`}
          />

          {/* Interactive touch targets */}
          {/* Nốt lệ chí dưới mắt trái */}
          <button
            title="Chạm vào nốt lệ chí kiều diễm dưới mí mắt trái"
            onClick={(e) => {
              e.stopPropagation();
              handleAvatarClick('mole');
            }}
            className="absolute top-[42%] left-[36%] w-6 h-6 rounded-full hover:bg-rose-500/40 active:scale-95 transition-all border border-rose-300/30 cursor-pointer"
          />

          {/* Sừng rồng (chạm góc trán) */}
          <button
            title={isDragonAwakened ? 'Xoa 2 sừng rồng non đen tuyền ánh lam quang' : 'Chạm trán / Vùng sừng rồng ẩn'}
            onClick={(e) => {
              e.stopPropagation();
              handleAvatarClick('horns');
            }}
            className="absolute top-1 left-1/2 -translate-x-1/2 w-24 h-12 rounded-full hover:bg-amber-500/30 active:scale-95 transition-all cursor-pointer border border-amber-400/20"
          />

          {/* Véo má */}
          <button
            title="Véo má Dịch Chi"
            onClick={(e) => {
              e.stopPropagation();
              handleAvatarClick('cheek');
            }}
            className="absolute top-1/2 left-1/4 -translate-y-1/2 w-8 h-8 rounded-full hover:bg-pink-500/20 active:scale-95 transition-all cursor-pointer"
          />

          {/* Gảy chuông bạc hộ tâm ở cổ */}
          <button
            title="Gảy chuông nhỏ trên vòng hộ tâm ở cổ"
            onClick={(e) => {
              e.stopPropagation();
              handleAvatarClick('bell');
            }}
            className="absolute top-[68%] left-1/2 -translate-x-1/2 w-12 h-8 rounded-full hover:bg-cyan-500/30 active:scale-95 transition-all border border-cyan-400/20 cursor-pointer"
          />
        </div>

        {/* Small floating tags */}
        {isDragonAwakened ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAvatarClick('horns');
              }}
              title="Sừng rồng non đen tuyền ánh lam quang"
              className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 via-rose-600 to-indigo-800 text-amber-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-300 shadow-xl flex items-center gap-1 animate-bounce cursor-pointer z-10"
            >
              <span>🦌 Sừng Rồng Đã Lộ</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAvatarClick('tail');
              }}
              title="Đuôi rồng đen tuyền bụ bẫm"
              className="absolute -bottom-2 -left-2 bg-gradient-to-r from-neutral-900 to-indigo-950 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/60 shadow-md flex items-center gap-1 cursor-pointer z-10"
            >
              <span>🐾 Đuôi Bán Long</span>
            </button>
          </>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAvatarClick('mole');
            }}
            title="Nốt lệ chí kiều diễm dưới mắt trái"
            className="absolute -bottom-2 -left-2 bg-gradient-to-r from-rose-600 to-pink-700 text-rose-100 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-300 shadow-md hover:scale-105 transition-transform flex items-center gap-1 cursor-pointer"
          >
            <span>✨ Nốt Lệ Chí</span>
          </button>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAvatarClick('lilybell');
          }}
          title="Chuông linh lan ở bím tóc nhỏ"
          className="absolute -bottom-2 -right-2 bg-gradient-to-r from-emerald-700 via-teal-800 to-indigo-900 text-teal-100 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-300 shadow-md hover:scale-105 transition-transform flex items-center gap-1 cursor-pointer"
        >
          <span>🔔 Chuông Linh Lan</span>
        </button>

        {/* Divan couch badge & Pale pink robe badges */}
        <div className="absolute -top-1 -left-2 bg-purple-950/90 border border-purple-400/50 text-purple-200 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
          <span>🛋️</span>
          <span>Sập mềm</span>
        </div>

        <div className="absolute -top-1 -right-2 bg-pink-950/90 border border-pink-400/50 text-pink-200 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
          <span>👘</span>
          <span>Sa y hồng nhạt</span>
        </div>
      </div>

      {/* Floating feed toast */}
      {feedToast && (
        <div className="absolute top-12 z-30 animate-bounce bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 text-amber-50 text-xs px-3 py-1.5 rounded-full font-bold shadow-2xl border border-amber-300">
          ✨ {feedToast}
        </div>
      )}

      {/* Thanh trạng thái: Tiềm Năng Hắc Long (User Requested) */}
      <div className="w-full mt-3.5 bg-gradient-to-r from-neutral-950 via-purple-950/90 to-neutral-950 border border-amber-500/50 rounded-xl p-2.5 shadow-lg space-y-1.5 relative overflow-hidden">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <span className={`text-sm ${growth.dragonPotential >= 100 ? 'animate-bounce text-amber-400' : 'text-purple-300'}`}>
              🐉
            </span>
            <span className="font-bold text-amber-200 font-serif">
              Tiềm Năng Hắc Long
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono">
            <span className="font-bold text-amber-300 text-xs">
              {growth.dragonPotential}%
            </span>
            {growth.dragonPotential >= 100 ? (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-300 font-bold border border-amber-400/50 animate-pulse">
                ĐÃ ĐẦY
              </span>
            ) : (
              <span className="text-[9px] text-purple-300/80">
                ({100 - growth.dragonPotential}% nữa)
              </span>
            )}
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-3 bg-neutral-950 rounded-full overflow-hidden border border-purple-800/80 p-0.5 relative">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out relative ${
              growth.dragonPotential >= 100
                ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-cyan-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]'
                : 'bg-gradient-to-r from-purple-700 via-indigo-500 to-cyan-400'
            }`}
            style={{ width: `${Math.min(100, Math.max(8, growth.dragonPotential))}%` }}
          >
            <div className="absolute inset-0 bg-white/25 animate-pulse" />
          </div>
        </div>

        {/* Description & Awakening Status */}
        <div className="flex items-center justify-between text-[10px] pt-0.5">
          {growth.dragonPotential >= 100 ? (
            <div className="w-full flex items-center justify-between text-amber-300">
              <span className="font-bold flex items-center gap-1">
                <Flame size={12} className="text-amber-400 animate-pulse" />
                <span>Bán Long Thể: Lộ rõ sừng & đuôi rồng!</span>
              </span>
              <button
                onClick={() => setForcePreviewMode((prev) => (prev === 'dragon' ? 'normal' : 'dragon'))}
                title="Bấm để đổi góc nhìn avatar (Thường / Bán Long)"
                className="text-[9px] px-1.5 py-0.5 rounded bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-600/40 flex items-center gap-0.5 cursor-pointer"
              >
                <Eye size={10} />
                <span>{forcePreviewMode === 'normal' ? 'Lộ sừng' : 'Đổi ảnh'}</span>
              </button>
            </div>
          ) : (
            <span className="text-purple-300/80 italic">
              Cho Dịch Chi ăn để nạp đầy tiềm năng, kích hoạt lộ sừng & đuôi rồng!
            </span>
          )}
        </div>
      </div>

      {/* Name and Title */}
      <div className="mt-2.5 text-center w-full">
        <h2 className="text-lg sm:text-xl font-bold font-serif text-amber-200 tracking-wider flex items-center justify-center gap-1.5 flex-wrap">
          <span>Dịch Chi</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-400/40 font-sans font-semibold shadow-sm">
            ♂️ Nam • Vị Hôn Phu
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-900 to-indigo-900 text-amber-300 border border-amber-400/40 font-mono font-bold shadow-sm">
            {growth.age.toFixed(1)} tuổi • {growth.height.toFixed(1)}cm • {growth.weight.toFixed(1)}kg
          </span>
          <button
            onClick={() => handleAvatarClick('birthday')}
            title="Sinh ngày 15/5 (Bấm để chúc mừng sinh nhật Dịch Chi)"
            className="text-[11px] px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-950 via-rose-900 to-purple-950 text-pink-200 border border-pink-400/50 hover:border-pink-300 hover:text-pink-100 font-sans font-medium flex items-center gap-1 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <span>🎂 15/5</span>
          </button>
        </h2>

        {/* Growth Stage Badge */}
        <div className="mt-1 flex items-center justify-center gap-1.5 flex-wrap">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${stage.badgeColor} text-white shadow-sm`}>
            ⭐ {stage.stageName}
          </span>
          {isDragonAwakened && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-sm flex items-center gap-1 animate-pulse">
              🐉 Bán Long Thể
            </span>
          )}
          <span className="text-[10px] text-purple-300/80">
            {growth.age >= 16 ? 'Đã thành niên 16 tuổi' : `Còn ${(16 - growth.age).toFixed(1)} tuổi nữa thành niên`}
          </span>
        </div>
      </div>

      {/* Attire description pill */}
      <button
        onClick={() => handleAvatarClick('robe')}
        title="Bấm để khen ngợi 3 vạt áo mỏng manh trễ vai và xích đu hoa ngọc của Dịch Chi"
        className="mt-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-950/70 via-teal-950/70 to-rose-950/70 border border-rose-500/40 text-[10px] text-rose-200 text-center max-w-xs hover:border-amber-400 transition-colors cursor-pointer flex items-center gap-1 mx-auto"
      >
        <span>👘 3 vạt áo sa mỏng manh trễ vai • Xích đu hoa ngọc</span>
      </button>

      {/* Mood indicator badge */}
      <div className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-400/30 text-purple-200 text-xs">
        <span className="animate-pulse">✨</span>
        <span className="font-semibold text-amber-300">Tâm trạng:</span>
        <span className="italic">{mood}</span>
      </div>

      {/* Quick Feeding Bar */}
      <div className="w-full mt-3 bg-purple-950/60 p-2.5 rounded-xl border border-amber-500/30 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-amber-300">
          <span className="font-semibold flex items-center gap-1">
            <span>🍲 Đút Ăn Mau Lớn:</span>
          </span>
          <span className="text-[10px] text-purple-300 font-mono">
            {growth.feedCount} lần ăn
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 text-[10px]">
          <button
            onClick={() => handleQuickFeed(FOOD_MENU[0])}
            title="Đút Canh Long Tủy (+0.2T, +1.5cm, +0.8kg)"
            className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 hover:border-amber-400 text-amber-200 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-base">🍲</span>
            <span className="font-bold truncate w-full text-center">Canh Tủy</span>
            <span className="text-[9px] text-emerald-400 font-mono">+1.5cm</span>
          </button>
          <button
            onClick={() => handleQuickFeed(FOOD_MENU[1])}
            title="Đút Đào Tiên Vạn Năm (+0.1T, +0.8cm, +0.5kg)"
            className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 hover:border-rose-400 text-rose-200 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-base">🍑</span>
            <span className="font-bold truncate w-full text-center">Đào Tiên</span>
            <span className="text-[9px] text-pink-400 font-mono">+0.5kg</span>
          </button>
          <button
            onClick={() => handleQuickFeed(FOOD_MENU[2])}
            title="Đút Linh Thạch Ngũ Sắc (+0.25T, +1.8cm, +1.0kg)"
            className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 hover:border-indigo-400 text-indigo-200 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-base">💎</span>
            <span className="font-bold truncate w-full text-center">Linh Thạch</span>
            <span className="text-[9px] text-cyan-400 font-mono">+0.25T</span>
          </button>
        </div>
      </div>

      {/* Micro Status Indicators */}
      <div className="w-full mt-2.5 grid grid-cols-2 gap-2 text-[11px]">
        <div className="bg-purple-950/60 p-2 rounded-lg border border-purple-800/40 text-center">
          <div className="text-purple-300/80 mb-0.5">Khế Ước Hôn Thư</div>
          <div className="font-bold text-amber-300 font-mono">{stability}% Bền Vững</div>
        </div>
        <div className="bg-purple-950/60 p-2 rounded-lg border border-purple-800/40 text-center">
          <div className="text-purple-300/80 mb-0.5">Âm Mưu Hủy Hôn</div>
          <div className="font-bold text-rose-400 font-mono">{schemeProgress}% Bại Lộ</div>
        </div>
      </div>
    </div>
  );
};
