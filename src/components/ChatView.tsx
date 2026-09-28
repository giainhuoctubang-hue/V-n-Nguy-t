import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, RefreshCw, User, Flame, Utensils, Heart } from 'lucide-react';
import { sound } from '../utils/audio';
import { GrowthStats, FoodItem, FOOD_MENU, getGrowthStage } from '../types/growth';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  sourceEvent?: string;
}

interface ChatViewProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, customDisplayPrompt?: string) => Promise<void>;
  isLoading: boolean;
  stability: number;
  schemeProgress: number;
  mood: string;
  growth: GrowthStats;
  onSelectActionChip: (text: string) => void;
  onFeedFood?: (food: FoodItem) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  onSendMessage,
  isLoading,
  stability,
  schemeProgress,
  mood,
  growth,
  onSelectActionChip,
  onFeedFood,
}) => {
  const [inputText, setInputText] = useState('');
  const [feedTrayOpen, setFeedTrayOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const stage = getGrowthStage(growth.age);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    sound.playChime();
    const text = inputText.trim();
    setInputText('');
    onSendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Quick Action Chips to Tease Dịch Chi & Change Attire / Setting
  const quickActions = [
    { label: '🥣 Dỗ dành đút ăn trên sập mềm', prompt: '*Ngồi sát bên mép sập mềm, múc một thìa canh long tủy ngào ngạt hương thơm và đưa viên kẹo linh đào ngọt lịm dỗ dành đút tận miệng cho Dịch Chi đang nằm nghiêng lười biếng trong lớp sa y hồng nhạt*' },
    { label: '🌸 Ngắm sa y hồng nhạt buông lơi', prompt: '*Khẽ kéo nhẹ vạt sa y mỏng manh màu hồng nhạt đang buông lơi hờ hững để lộ bờ vai thon nõn nà của Dịch Chi khi nhóc nằm nghiêng trên sập mềm, mỉm cười trêu nhóc vừa xinh đẹp vừa quyến rũ*' },
    { label: '👘 Đổi sang Hắc Sa Y Ma Tộc cao quý', prompt: '*Lấy ra bộ Hắc Sa Y thêu hoa văn rồng vàng ma tộc huyền bí, nhẹ nhàng khoác lên người cho Dịch Chi và ngắm nhìn khí chất Tiểu Điện Hạ vừa tôn quý vừa ma mị*' },
    { label: '🌹 Ướm thử Hỷ Phục Đỏ Long Phụng', prompt: '*Lấy bộ Hỷ Phục thượng phẩm màu đỏ thắm thêu kim tuyến Long Phụng Thần Ma ướm lên người Dịch Chi, mỉm cười trêu nhóc mặc thử áo cưới xem ngày 15/5 sau này bái đường có vừa không*' },
    { label: '🍃 Bế ra xích đu hoa ngọc ngoài vườn', prompt: '*Dịu dàng bế Dịch Chi từ sập mềm ra chiếc xích đu hoa ngọc ngập tràn hoa mai đỏ và hoa huệ đêm, để tà áo sa mỏng manh bay lượn trong gió thoang thoảng hương chanh non*' },
    { label: '🎂 Chúc mừng sinh nhật 15/5 & Tặng quà', prompt: '*Lấy ra hộp gấm thêu hoa mai đỏ chứa đầy linh thạch ngũ sắc ngọt ngào, xoa đầu chúc mừng sinh nhật ngày 15/5 của Dịch Chi và hỏi nhóc muốn gì*' },
    { label: '✨ Chạm nốt lệ chí dưới mắt', prompt: '*Đưa ngón tay khẽ chạm vào nốt lệ chí nhỏ nhắn diễm lệ bên dưới mí mắt trái của Dịch Chi, ngắm nhìn khuôn mặt xinh đẹp tuyệt trần của nhóc*' },
    { label: '🐉 Cọ vảy Hắc Long cho sáng bóng', prompt: '*Lấy khăn lụa tẩm linh dịch nhẹ nhàng cọ từng phiến vảy rồng đen tuyền ánh lam ngọc ở hõm lưng và thân đuôi của Dịch Chi cho sáng bóng lấp lánh*' },
    { label: '🦌 Xoa 2 sừng rồng non trên trán', prompt: '*Vén lọn tóc đen nhánh sang bên, nhẹ nhàng xoa xoa hai chiếc sừng rồng non mềm mại đang nhú lên trên hai góc trán của Dịch Chi*' },
    { label: '🐾 Vuốt đuôi rồng bụ bẫm cộm vạt áo', prompt: '*Khẽ chạm vào chiếc đuôi rồng dài bụ bẫm đang nhú ra từ hõm lưng làm cộm một góc ba vạt áo sa mỏng manh của Dịch Chi*' },
    { label: '🍲 Đút Canh Long Tủy bồi bổ mau lớn (16 tuổi)', prompt: '*Bưng một chén Canh Long Tủy thơm nức ngào ngạt nấu từ linh thạch kiếm Nhu Bạch vừa trộm về, dỗ dành đút cho tiểu Hắc Long bồi bổ mau lớn đến 16 tuổi*' },
    { label: '⏳ Đếm ngược sinh nhật 15/5 tròn 16 tuổi', prompt: '*Mỉm cười nhắc nhở Dịch Chi sinh ngày 15/5, chỉ còn tròn hai lần sinh nhật 15/5 nữa là nhóc sẽ chạm mốc 16 tuổi thoát khỏi kiếp ấu long*' },
    { label: '🔔 Gảy chuông hoa linh lan', prompt: '*Khẽ gảy chiếc chuông hoa linh lan bạc ở đuôi bím tóc nhỏ của Dịch Chi, khiến tiếng chuông giòn tan ngân vang*' },
    { label: '🖌️ Xem phù chú mới tạo', prompt: '*Ghé sát lại xem Dịch Chi đang cầm Bút Vạn Cảnh hào hứng vẽ phù chú mới, mỉm cười hỏi nhóc lá bùa nổ này định dùng để dọa ai*' },
    { label: '🦶 Trêu đôi chân trần & chỉ đỏ', prompt: '*Cúi nhìn đôi chân trần trắng nõn của Dịch Chi đung đưa trên sập mềm gối gấm, khẽ chạm vào sợi chỉ đỏ định vị ở cổ chân trái*' },
    { label: '⚔️ Tịch thu kiếm Nhu Bạch trộm linh thạch', prompt: '*Tóm lấy chuôi kiếm Nhu Bạch đang lén nhét túi linh thạch vừa trộm được vào tay áo Dịch Chi, nhướng mày hỏi tội cả hai*' },
    { label: '🖤 Trêu chân tóc nâu mới nhú', prompt: '*Nhẹ nhàng vén lọn tóc đen dài của Dịch Chi, khẽ cười trêu chân tóc lại mới nhú mấy cọng màu nâu nhạt kìa*' },
    { label: '🤲 Nắm bàn tay búp măng tuyệt mỹ', prompt: '*Cầm lấy bàn tay thon dài trắng muốt như ngọc của Dịch Chi, khen ngợi tay nhóc vừa múa kiếm đẹp vừa vẽ bùa giỏi*' },
    { label: '🌸 Tặng Nhành Mai Đỏ & Bạch Ngọc Lan', prompt: '*Lấy ra một bó hoa Mai Đỏ rực rỡ cài lẫn Bạch Ngọc Lan và Vãn Hương Ngọc ngào ngạt hương thơm, đưa trước mặt Dịch Chi*' },
    { label: '🍵 Nhắc vụ rượu trà Mạn Đà Lam', prompt: '*Nhấp một ngụm trà, mỉm cười hỏi dạo này Dịch Chi còn định chuốc rượu trà Mạn Đà Lam để ép ta hủy hôn nữa không*' },
  ];

  // Helper to render text with *actions* highlighted differently from quotes
  const renderMessageContent = (content: string) => {
    // Regex splits by *actions*
    const parts = content.split(/(\*[^*]+\*)/g);

    return (
      <div className="space-y-1.5 leading-relaxed font-serif text-sm sm:text-base">
        {parts.map((part, index) => {
          if (part.startsWith('*') && part.endsWith('*')) {
            const inner = part.slice(1, -1);
            return (
              <span
                key={index}
                className="text-pink-300/90 italic font-sans text-xs sm:text-sm block py-0.5 px-2 rounded bg-purple-900/40 border-l-2 border-pink-400/60 my-1"
              >
                *{inner}*
              </span>
            );
          }
          if (!part.trim()) return null;
          return (
            <span key={index} className="text-purple-100">
              {part}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[500px] max-w-5xl mx-auto p-2 sm:p-4">
      {/* Current Roleplay Status Bar */}
      <div className="bg-purple-950/80 border border-purple-800/40 rounded-xl px-4 py-2.5 mb-2 flex flex-wrap items-center justify-between gap-2.5 text-xs shadow-md">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-purple-200">
            Dịch Chi: <strong className="text-amber-200 font-mono">{growth.age.toFixed(1)} tuổi</strong>
          </span>
          <span className="text-purple-400">•</span>
          <span className="text-cyan-300 font-mono font-semibold">{growth.height.toFixed(1)}cm</span>
          <span className="text-purple-400">•</span>
          <span className="text-pink-300 font-mono font-semibold">{growth.weight.toFixed(1)}kg</span>
          <span className={`text-[10px] px-2 py-0.2 rounded-full bg-gradient-to-r ${stage.badgeColor} text-white font-bold ml-1`}>
            {stage.stageName}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-purple-300">
            Tâm trạng: <strong className="text-pink-300 italic">{mood}</strong>
          </span>
          <span className="hidden sm:inline text-purple-400">•</span>
          <span className="hidden sm:inline text-amber-300">
            Hôn ước: <strong>{stability}%</strong>
          </span>
        </div>
      </div>

      {/* Attire & Setting Live State Bar */}
      <div className="bg-gradient-to-r from-pink-950/40 via-purple-950/60 to-purple-900/40 border border-pink-500/30 rounded-xl px-3.5 py-1.5 mb-3 flex items-center justify-between gap-2 text-[11px] text-pink-200 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-pink-400 font-semibold shrink-0">🌸 Bối Cảnh & Trang Phục:</span>
          <span className="text-pink-100/90 truncate">
            Lớp sa y mỏng manh màu hồng nhạt • Nằm nghiêng trên sập mềm gối gấm • Được phu quân hờ dịu dàng dỗ dành ăn uống
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 shrink-0 font-medium">
          Đã cập nhật Avatar ✨
        </span>
      </div>

      {/* Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto rounded-2xl bg-purple-950/50 border border-purple-800/30 p-4 sm:p-6 space-y-4 shadow-inner">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 border shadow-md ${
                  isUser
                    ? 'bg-gradient-to-tr from-amber-600 to-amber-400 border-amber-300 text-purple-950 font-bold text-xs'
                    : 'bg-gradient-to-tr from-purple-800 to-pink-600 border-purple-400 text-amber-200 text-sm'
                }`}
              >
                {isUser ? <User size={16} /> : '👑'}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3.5 sm:p-4 shadow-lg ${
                  isUser
                    ? 'bg-gradient-to-br from-amber-900/80 to-amber-950/90 border border-amber-600/40 text-amber-100 rounded-tr-none'
                    : 'bg-gradient-to-br from-purple-900/90 via-purple-950/90 to-indigo-950/90 border border-purple-700/50 text-purple-100 rounded-tl-none'
                }`}
              >
                {/* Header label */}
                <div className="flex items-center justify-between text-[11px] mb-1.5 opacity-70 gap-2">
                  <span className="font-semibold">{isUser ? 'Thần Quân (Bạn)' : 'Dịch Chi (Tiểu Điện Hạ)'}</span>
                  <span className="font-mono text-[10px]">{msg.timestamp}</span>
                </div>

                {/* Event tag if injected */}
                {msg.sourceEvent && (
                  <div className="mb-2 flex items-center gap-1 text-[11px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                    <Flame size={12} />
                    <span>Biến cố: {msg.sourceEvent}</span>
                  </div>
                )}

                {/* Content */}
                {renderMessageContent(msg.content)}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-800 to-pink-600 border border-purple-400 text-amber-200 text-sm flex items-center justify-center shrink-0">
              👑
            </div>
            <div className="bg-purple-900/80 border border-purple-700/50 rounded-2xl rounded-tl-none p-3.5 shadow-lg flex items-center gap-2 text-purple-200 text-xs sm:text-sm">
              <RefreshCw className="animate-spin text-amber-400" size={15} />
              <span className="italic font-serif">
                Dịch Chi đang bĩu môi, đảo tròn mắt hoa đào suy tính cách trả đũa ngươi...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Feeding & Quick Action Chips Bar */}
      <div className="pt-2 space-y-1.5">
        {/* Quick Feeding Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-amber-300 shrink-0 px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-500/40 flex items-center gap-1">
            <Utensils size={12} className="text-amber-400" />
            <span>Cho Ăn Mau Lớn:</span>
          </span>
          {FOOD_MENU.map((food) => (
            <button
              key={food.id}
              onClick={() => {
                sound.playSweetBite();
                if (onFeedFood) {
                  onFeedFood(food);
                } else {
                  onSendMessage(food.prompt);
                }
              }}
              className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-950/70 via-purple-950/80 to-neutral-900 hover:from-amber-900/80 hover:to-purple-900 border border-amber-500/40 hover:border-amber-400 text-amber-200 transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
            >
              <span>{food.icon}</span>
              <span>{food.name}</span>
              <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 font-mono">
                +{food.heightGain.toFixed(1)}cm
              </span>
            </button>
          ))}
        </div>

        {/* Trick Talismans Fast Casting Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-pink-300 shrink-0 px-1.5 py-0.5 rounded bg-pink-950/70 border border-pink-500/40 flex items-center gap-1">
            <span>📜</span>
            <span>Bùa Đùa Ngược:</span>
          </span>
          <button
            onClick={() => {
              sound.playChime();
              onSendMessage('*Rút lá "Mê Hồn Phù" phát ra làn khói tím mờ ảo dán nhẹ lên ngực Dịch Chi, khiến đôi mắt hoa đào của nhóc mơ màng, thần trí mê man nhũn người ngã nhào vào lòng bạn*');
            }}
            className="text-xs px-2.5 py-0.8 rounded-full bg-purple-900/60 hover:bg-pink-900/60 border border-purple-600/40 text-purple-200 hover:text-pink-100 transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>🌀 Mê Hồn Phù</span>
          </button>
          <button
            onClick={() => {
              sound.playChime();
              onSendMessage('*Dán lá "Tịnh Tâm Phù" lên vạt áo sa của Dịch Chi, dập tắt cơn giãy nảy, làm nhóc bỗng chốc đờ đẫn tịnh tâm, mặt lạnh tanh cố giữ bình tĩnh nhưng đôi mắt vẫn liếc xéo bạn*');
            }}
            className="text-xs px-2.5 py-0.8 rounded-full bg-purple-900/60 hover:bg-teal-900/60 border border-purple-600/40 text-purple-200 hover:text-teal-100 transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>🧘 Tịnh Tâm Phù</span>
          </button>
          <button
            onClick={() => {
              sound.playStamp();
              onSendMessage('*Dán lá "Trần Phù (Bùa Nói Thật)" lên vạt áo Dịch Chi, khoanh tay mỉm cười hỏi: "Nào Tiểu Điện Hạ, thành thật khai báo xem: Ngươi thực lòng muốn hủy hôn hay là mê mẩn Thần Quân này rồi?"*');
            }}
            className="text-xs px-2.5 py-0.8 rounded-full bg-purple-900/60 hover:bg-amber-900/60 border border-purple-600/40 text-purple-200 hover:text-amber-100 transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>🗣️ Trần Phù (Nói Thật)</span>
          </button>
          <button
            onClick={() => {
              sound.playStamp();
              onSendMessage('*Kích hoạt lá "Trói Phù", những dải lụa xích linh quang lập tức phóng ra trói chặt hai tay và thân hình mảnh khảnh của Dịch Chi tại chỗ trên chiếc xích đu hoa ngọc*');
            }}
            className="text-xs px-2.5 py-0.8 rounded-full bg-purple-900/60 hover:bg-indigo-900/60 border border-purple-600/40 text-purple-200 hover:text-indigo-100 transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>🪢 Trói Phù</span>
          </button>
          <button
            onClick={() => {
              sound.playStamp();
              onSendMessage('*Giơ lá "Yêu Phù" ánh tím huyền bí ra trước mặt Dịch Chi: "Bùa này khiến người bị dán phải nghe lời trong 15 phút. Ngươi có gan thì dán lên xem ta hay ngươi sẽ phải nghe lời?"*');
            }}
            className="text-xs px-2.5 py-0.8 rounded-full bg-purple-900/60 hover:bg-rose-900/60 border border-purple-600/40 text-purple-200 hover:text-rose-100 transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>👑 Yêu Phù (15 Phút)</span>
          </button>
          <button
            onClick={() => {
              sound.playFireBoom();
              onSendMessage('*Cầm lá "Hóa Hỏa Phù" bốc cháy rừng rực ra trêu Dịch Chi, hỏi nhóc có dám tự tay ném vào cuộn hôn thư để thiêu rụi mọi thứ như lời nhóc hay dọa không*');
            }}
            className="text-xs px-2.5 py-0.8 rounded-full bg-purple-900/60 hover:bg-red-900/60 border border-purple-600/40 text-purple-200 hover:text-red-100 transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>🔥 Hóa Hỏa Phù</span>
          </button>
          <button
            onClick={() => {
              sound.playFireBoom();
              onSendMessage('*Kích hoạt lá "Bạo Liệt Phù" lôi đình hòa cùng thủy lưu, tia sét nổ đì đùng đóng băng rồi nổ tung kinh thiên động địa, làm chiếc xích đu rung lắc dữ dội khiến Dịch Chi ôm đầu kêu oái*');
            }}
            className="text-xs px-2.5 py-0.8 rounded-full bg-purple-900/60 hover:bg-amber-900/60 border border-purple-600/40 text-purple-200 hover:text-amber-100 transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>⚡ Bạo Liệt Phù (Lôi+Thủy)</span>
          </button>
          <button
            onClick={() => {
              sound.playChime();
              onSendMessage('*Phóng lá "Hóa Băng Phù" xuống đất, một tầng hàn băng lấp lánh tức thì lan tỏa đóng băng xung quanh chiếc xích đu hoa ngọc, khiến không khí trở nên lạnh buốt như mùa đông*');
            }}
            className="text-xs px-2.5 py-0.8 rounded-full bg-purple-900/60 hover:bg-cyan-900/60 border border-purple-600/40 text-purple-200 hover:text-cyan-100 transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>🧊 Hóa Băng Phù</span>
          </button>
          <button
            onClick={() => {
              sound.playChime();
              onSendMessage('*Dán lá "Hóa Phong Phù" lên mắt cá chân trái thắt chỉ đỏ của Dịch Chi, một luồng gió lốc mạnh mẽ nâng nhóc bay vút lên không trung với tốc độ chóng mặt*');
            }}
            className="text-xs px-2.5 py-0.8 rounded-full bg-purple-900/60 hover:bg-emerald-900/60 border border-purple-600/40 text-purple-200 hover:text-emerald-100 transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>🌪️ Hóa Phong Phù</span>
          </button>
          <button
            onClick={() => {
              sound.playChime();
              onSendMessage('*Kích hoạt chế độ "Nâng Đỡ" của Hóa Mộc Phù, những đóa hoa sen ngọc và dây leo xanh biếc mọc lên nâng đỡ cơ thể Dịch Chi dịu dàng, hương thảo mộc thanh khiết chữa lành mọi mệt mỏi*');
            }}
            className="text-xs px-2.5 py-0.8 rounded-full bg-purple-900/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 hover:text-emerald-100 transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>🌿 Hóa Mộc (Nâng Đỡ)</span>
          </button>
          <button
            onClick={() => {
              sound.playStamp();
              onSendMessage('*Kích hoạt chế độ "Trói Buộc" của Hóa Mộc Phù, gai ma mộc quấn chặt lấy Dịch Chi, phấn độc hoa dại làm nhóc ngứa ngáy giãy nảy mếu máo giậm chân xin tha*');
            }}
            className="text-xs px-2.5 py-0.8 rounded-full bg-purple-900/60 hover:bg-rose-900/60 border border-rose-500/40 text-rose-200 hover:text-rose-100 transition-all whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            <span>🥀 Hóa Mộc (Trói Độc)</span>
          </button>
        </div>

        {/* Teasing & Lore Action Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-purple-300/80 shrink-0 px-1 flex items-center gap-1">
            <Sparkles size={12} />
            <span>Tương Tác:</span>
          </span>
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelectActionChip(action.prompt);
                sound.playChime();
              }}
              className="text-xs px-2.5 py-0.8 rounded-full bg-purple-900/50 hover:bg-purple-800/70 border border-purple-700/40 text-purple-200 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="relative mt-1">
        <div className="relative flex items-end gap-2 bg-purple-950/90 border border-purple-700/60 rounded-2xl p-2 shadow-xl focus-within:border-amber-400 transition-all">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nói chuyện hoặc trêu chọc Dịch Chi... (dùng *để diễn tả hành động*)..."
            rows={2}
            className="w-full bg-transparent text-purple-100 placeholder-purple-400/50 text-sm sm:text-base resize-none focus:outline-none px-2 py-1 max-h-28 scrollbar-none font-sans"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`p-2.5 rounded-xl font-bold transition-all shrink-0 ${
              inputText.trim() && !isLoading
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-purple-950 shadow-md hover:scale-105 active:scale-95'
                : 'bg-purple-900/50 text-purple-500 cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-purple-400/60 mt-1 px-2 flex justify-between">
          <span>Mẹo: Bạn có thể viết lời thoại hoặc hành động trong *dấu sao* (ví dụ: *đút kẹo cho Dịch Chi*)</span>
          <span>Nhấn Enter để gửi</span>
        </p>
      </form>
    </div>
  );
};
