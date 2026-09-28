import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { CharacterAvatar } from './components/CharacterAvatar';
import { ChatView, ChatMessage } from './components/ChatView';
import { EventChainView } from './components/EventChainView';
import { MarriageContractModal } from './components/MarriageContractModal';
import { CharacterLoreModal } from './components/CharacterLoreModal';
import { TalismanDrawer } from './components/TalismanDrawer';
import { DemonRealmDiary } from './components/DemonRealmDiary';
import { BlackDragonSecretModal } from './components/BlackDragonSecretModal';
import { FeedingGrowthPanel } from './components/FeedingGrowthPanel';
import { GrowthStats, FoodItem, FOOD_MENU, INITIAL_GROWTH } from './types/growth';
import { sound } from './utils/audio';

const INITIAL_GREETING: ChatMessage = {
  id: 'init-1',
  role: 'model',
  timestamp: 'Vừa xong',
  content:
    '*Dịch Chi lười biếng nằm nghiêng trên chiếc sập mềm trải gối gấm thêu hoa, lớp sa y mỏng manh màu hồng nhạt mềm mại như sương khói buông lơi hờ hững để lộ cần cổ trắng ngần nõn nà và bờ vai thon quyến rũ. Đôi chân trần nhỏ nhắn trắng muốt thắt sợi chỉ đỏ định vị co nhẹ trên đệm gấm, mái tóc đen óng ả dài quá hông xõa tung lung linh cài trâm ngọc, bím tóc nhỏ có chuông hoa linh lan bạc khẽ rung lên leng keng thanh thúy. Đôi mắt hoa đào to tròn màu xanh biển đậm thăm thẳm ngập sao trời, nốt lệ chí nhỏ nhắn dưới mí mắt trái càng thêm kiều diễm. Thấy Thần Quân ngồi kề bên cầm chén thìa dỗ dành đút ăn, nhóc hé đôi môi hồng ngọt ngào, chu môi làm nũng nhưng giọng điệu vẫn đanh đá đáng yêu:* "Này! Phu quân hờ mặt dày kia, ngươi ngồi ngắm cái gì mà chưa chịu đút tiên quả cho ta?! Lớp sa y hồng nhạt này ta mặc nằm sập mềm cho mát mẻ, cấm ngươi nhìn lung tung! Mau đút thìa canh long tủy và bánh ngọt tận miệng cho Tiểu Điện Hạ ta đi, đút chậm một chút là ta bảo kiếm Nhu Bạch đến chém ngươi đấy!"',
};

// Client-side dynamic anti-repetition fallback generator
const clientRecentReplies: string[] = [];

function getClientFallbackReply(text: string, activeGrowth: GrowthStats): string {
  const lower = text.toLowerCase();
  const ageStr = activeGrowth.age.toFixed(1);
  const heightStr = activeGrowth.height.toFixed(1);
  const weightStr = activeGrowth.weight.toFixed(1);
  const isDragon = activeGrowth.dragonPotential >= 100 || activeGrowth.isDragonFormAwakened;

  let pool: string[] = [];

  if (lower.includes('nhật ký') || lower.includes('kỷ niệm') || lower.includes('sự kiện') || lower.includes('lần đầu') || lower.includes('hứa') || lower.includes('dở dang')) {
    if (lower.includes('biến hình') || lower.includes('sừng non') || lower.includes('hõm lưng')) {
      pool = [
        `*Dịch Chi hai má đỏ bừng, vội đưa tay ôm lấy hai sừng non đen tuyền trên trán, chiếc đuôi rồng bụ bẫm giật nảy lên*: "Ngươi... ngươi lại nhắc chuyện lần đầu ta biến hình trên xích đu đấy à?! Hôm đó ai bảo ngươi chạm vào hõm lưng ta... Nhưng mà ngươi vuốt sừng rồng rất êm ái, ta cho phép ngươi ghi vào Nhật Ký Ma Giới đấy!"`,
        `*Dịch Chi chớp mắt hoa đào, nốt lệ chí khẽ giật, nhóc rúc đầu vào hõm cổ bạn làm nũng*: "Lần đầu biến hình ta xấu hổ muốn chết, tưởng bị ngươi chê là quái vật... Ai ngờ ngươi lại cọ vảy cho ta bóng loáng. Sau này cấm được quên đấy nhé!"`,
      ];
    } else if (lower.includes('tranh cãi') || lower.includes('thắng') || lower.includes('kẹo')) {
      pool = [
        `*Dịch Chi hếch cằm lên đắc ý, chuông hoa linh lan bạc kêu leng keng giòn giã*: "Haha! Nhớ vụ ta thắng cãi lý đòi ăn trọn hộp kẹo linh đào chưa?! Ta dùng Ma Điển ép ngươi phải chịu thua dâng kẹo và cõng ta đi dạo ba vòng quanh thần điện đấy nhé! Mau dâng thêm kẹo thưởng cho ta đi!"`,
      ];
    } else if (lower.includes('hứa') || lower.includes('999') || lower.includes('hôn ước')) {
      pool = [
        `*Dịch Chi ôm chặt cuộn hôn thư nạm ngọc, hai má ửng hồng*: "Lời hứa 999 phiến vảy rồng và ngày 15/5 năm 16 tuổi ta vẫn ghi trong lòng! Ngươi phải cọ bóng đủ 999 phiến vảy và chuẩn bị 100 giỏ linh đào thì ta mới suy nghĩ xem có bái đường không!"`,
      ];
    } else {
      pool = [
        `*Dịch Chi ghé đầu nhìn vào cuốn Nhật Ký Ma Giới của bạn, đôi mắt hoa đào biếc long lanh*: "Ngươi ghi chép chuyện của ta vào sổ có đầy đủ không đấy? Nhớ ghi ta lúc nào cũng xinh đẹp và thông minh hơn ngươi đấy nhé!"`,
      ];
    }
  } else if (isDragon && (lower.includes('sừng') || lower.includes('đuôi') || lower.includes('hắc long') || lower.includes('bán long'))) {
    pool = [
      `*Dịch Chi đưa ngón tay búp măng khẽ sờ hai sừng rồng đen nhánh ánh lam quang uy vũ trên trán, chiếc đuôi rồng bụ bẫm cộm vạt áo sa khẽ đung đưa*: "Hừ! Tiềm năng Hắc Long đầy 100% rồi, sừng và đuôi của ta lộ rõ mồn một thế này, ngươi còn dám trêu chọc ta sao?! Mau lại đây cọ vảy đuôi cho ta, nếu không ta dùng sừng húc rách áo thần của ngươi!"`,
      `*Chiếc đuôi rồng dài bụ bẫm đen tuyền ánh lam ngọc quấn chặt lấy cổ tay bạn, Dịch Chi phồng má nhõng nhẽo*: "Sừng rồng của ta nhạy cảm lắm, cấm ngươi véo! Nhưng vảy ở hõm lưng thì ngứa quá... Thần Quân ngươi mau dùng linh dịch cọ bóng cho ta đi, cọ cho sáng lấp lánh vào đấy!"`,
      `*Dịch Chi chớp đôi mắt hoa đào biếc, nốt lệ chí khẽ giật, hai sừng rồng đen tuyền phát ra uy áp mờ ảo nhưng giọng điệu lại đầy vẻ làm nũng*: "Ngươi nuôi ta no nê làm tiềm năng Hắc Long bùng nổ, giờ ta hóa Bán Long Thể rồi! Ngươi mê mẩn sừng rồng và đuôi của ta đúng không? Thừa nhận đi, ta tha thứ cho!"`,
    ];
  } else if (lower.includes('chiều cao') || lower.includes('cân nặng') || lower.includes('bao nhiêu cm') || lower.includes('bao nhiêu cân') || lower.includes('thân rồng dài')) {
    pool = [
      `*Dịch Chi hếch cằm lên kiêu kỳ, lớp sa y hồng nhạt buông lơi để lộ bờ vai thon nõn nà*: "Ngươi hỏi vóc dáng của ta à? Hình người của ta hiện tại cao ${heightStr}cm, nặng ${weightStr}kg (cực hạn đạt tới 1m90 và 82kg đấy)! Thân rồng ẩn thì dài ${activeGrowth.dragonLength ? activeGrowth.dragonLength.toFixed(1) : '3.5'} mét uy phong lẫm liệt! Đẹp đôi với ngươi chưa?!"`,
    ];
  } else if (lower.includes('ăn') || lower.includes('đút') || lower.includes('bánh') || lower.includes('kẹo') || lower.includes('đào') || lower.includes('thạch') || lower.includes('canh') || lower.includes('bồi bổ') || lower.includes('nuôi')) {
    pool = [
      `*Dịch Chi nằm nghiêng trên sập mềm gối gấm, lớp sa y hồng nhạt buông lơi hờ hững để lộ cần cổ trắng ngần, nhóc xoa xoa chiếc bụng nhỏ no tròn thơm mùi chanh non*: "Ưm... ngươi đút ta ăn ngon ngọt thế này, long mạch toàn thân ấm sực lên rồi! Ngon quá đi mất... Mau đút thêm nữa đi, ta sắp thành niên 16 tuổi rồi!"`,
      `*Dịch Chi hé môi đón lấy viên kẹo ngọt mọng nước từ tay bạn, hai má phồng lên như sóc nhỏ, nốt lệ chí dưới mắt trái khẽ rung rung*: "Hừ! Mồm thì mắng ta lười nằm sập mềm, tay thì cứ đút kẹo ngọt không ngừng! Ngon thế này thì ta tạm thời tha lỗi cho ngươi, mau dâng thêm thìa canh bổ nữa đây!"`,
      `*Dịch Chi liếm sạch khóe môi dính chút mật ngọt, thân rồng dài bụ bẫm cộm sau lớp sa y hồng nhạt khẽ ngoe nguẩy mãn nguyện*: "Ngon quá đi mất... Coi như phu quân hờ ngươi còn có chút ích lợi! Nuôi ta cho béo tốt phổng phao, sau này ta làm đại long 16 tuổi sẽ dẫn ngươi đi quậy khắp tam giới!"`,
      `*Dịch Chi chun mũi, đôi mắt hoa đào long lanh giảo hoạt nhìn Thần Quân ngồi kề bên*: "Đút ta ăn nhiều thế này, có phải ngươi sợ ta đói rồi phụ vương ta tìm ngươi tính sổ không? Nhưng mà canh bổ ngon thật... đút thêm cho ta một thìa nữa mau!"`,
      `*Dịch Chi vươn vai lười biếng, co nhẹ đôi chân trần trắng nõn trên đệm gấm*: "Ăn no rồi lại muốn ngủ một giấc... Thần Quân ngươi ngồi yên đấy làm gối cho ta dựa, vừa đút thêm viên kẹo đào vừa quạt mát cho ta mau!"`,
    ];
  } else if (lower.includes('hủy hôn') || lower.includes('hôn ước') || lower.includes('hôn thư')) {
    pool = [
      `*Dịch Chi bĩu môi hờn dỗi, lén giấu cuộn hôn thư xuống dưới đệm gấm sập mềm:* "Ngươi đừng hòng dụ ta! Ta nhất định phải hủy hôn ước! Cơ mà... nếu ngươi chịu cọ vảy rồng cho ta sáng bóng và dâng mười giỏ linh đào, ta có thể suy nghĩ lại!"`,
      `*Dịch Chi trợn tròn đôi mắt hoa đào xanh biếc, co chân trần trên sập mềm giãy nảy:* "Ngươi dám đồng ý hủy hôn thật đấy à?! Đồ phu quân hờ bạc tình vô nghĩa! Ta đùa một tí mà ngươi dám ruồng bỏ ta thật à?! Ta không hủy nữa, ta trói ngươi lại bằng sợi chỉ đỏ bây giờ!"`,
      `*Dịch Chi đưa chén rượu trà Mạn Đà Lam tới trước mặt bạn, chớp mắt ngọt xớt giả nai:* "Thần Quân uống ngụm trà này đi mà~ Uống say rồi ký giấy hủy hôn cho ta một cái thôi, nha nha?"`,
    ];
  } else {
    pool = [
      `*Dịch Chi nằm nghiêng trên sập mềm, lớp sa y hồng nhạt mỏng manh lay động, đôi mắt hoa đào xanh biếc lúng liếng nhìn ngươi đầy vẻ tinh quái, chiếc chuông linh lan bạc ở đuôi bím tóc khẽ kêu leng keng:* "Hừ! Phu quân hờ mặt dày, ngươi nói năng đường hoàng thế mà hành động lại nhìn chằm chằm ta là ý gì?! Mau dâng linh quả ngọt lên đây rồi ta mới suy nghĩ xem có tha thứ cho ngươi không!"`,
      `*Dịch Chi ôm lấy góc gối gấm thêu hoa, chớp chớp mắt rưng rưng làm bộ đáng thương tội nghiệp, nốt lệ chí khẽ giật:* "Thần Quân ca ca... ngươi nỡ lòng nào ức hiếp một tiểu ấu long 14 tuổi như ta chứ? Mau lại đây dỗ ta, xoa đầu và đút kẹo cho ta mau lên!"`,
      `*Dịch Chi liếc mắt một cái sắc lẻm, vung nhẹ Bút Vạn Cảnh vẽ một vòng sáng chu sa chớp nháy:* "Ngươi tưởng quyền cao chức trọng là ta sợ ngươi chắc? Chọc Tiểu Điện Hạ ta giận là ta cho nổ tung cả thần cung của ngươi đấy!"`,
      `*Dịch Chi co nhẹ đôi chân trần trắng nõn thắt chỉ đỏ trên sập mềm, lớp sa y hồng nhạt buông lơi trễ vai:* "Ngươi đứng ngẩn ngơ ở đó làm gì? Lại đây đút đồ ngọt cho ta! Hầu hạ Tiểu Điện Hạ ta cho chu đáo vào, không thì ta sai kiếm Nhu Bạch đến khoắng sạch bảo khố của ngươi!"`,
      `*Dịch Chi chu môi phồng má, đanh đá nhưng giấu không nổi vẻ nũng nịu:* "Miệng thì bảo chăm sóc ta, mà chẳng chịu đút đồ ngon tận miệng cho ta! Ta mà đói là ta ăn vạ ngay tại sập mềm này cho ngươi xem!"`,
    ];
  }

  const fresh = pool.filter((p) => !clientRecentReplies.includes(p));
  const picked = fresh.length > 0 ? fresh[Math.floor(Math.random() * fresh.length)] : pool[Math.floor(Math.random() * pool.length)];

  clientRecentReplies.push(picked);
  if (clientRecentReplies.length > 15) clientRecentReplies.shift();

  return picked;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [stability, setStability] = useState<number>(65);
  const [schemeProgress, setSchemeProgress] = useState<number>(75);
  const [mood, setMood] = useState<string>('Nhõng nhẽo đòi ăn ngọt');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isDragonModalOpen, setIsDragonModalOpen] = useState<boolean>(false);

  // Growth Stats: Age, Height, Weight and Feed Count
  const [growth, setGrowth] = useState<GrowthStats>(() => {
    try {
      const saved = localStorage.getItem('dich_chi_growth_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not parse saved growth stats:', e);
    }
    return INITIAL_GROWTH;
  });

  // Save growth stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dich_chi_growth_v2', JSON.stringify(growth));
    } catch (e) {
      console.warn('Could not save growth stats:', e);
    }
  }, [growth]);

  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Send message to backend Gemini API
  const handleSendMessage = async (text: string, customDisplayPrompt?: string, overrideGrowth?: GrowthStats) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: customDisplayPrompt || text,
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setIsLoading(true);

    const activeGrowth = overrideGrowth || growth;

    // If chat contains feeding keywords and not triggered by handleFeedCharacter, grant potential & growth
    const isChatFeeding = /cho ăn|đút|bánh|kẹo|canh|đào|linh quả|bồi bổ|nuôi|thạch|mật ong|đồ ngọt|hóa long đan/i.test(text);
    if (isChatFeeding && !overrideGrowth) {
      setGrowth((prev) => {
        const nextP = Math.min(100, (prev.dragonPotential || 25) + 15);
        return {
          ...prev,
          age: Math.min(20.0, +(prev.age + 0.1).toFixed(2)),
          height: Math.min(190.0, +(prev.height + 0.8).toFixed(1)),
          weight: Math.min(82.0, +(prev.weight + 0.45).toFixed(1)),
          dragonLength: +( (prev.dragonLength || 3.5) + 1.5 ).toFixed(1),
          feedCount: prev.feedCount + 1,
          dragonPotential: nextP,
          isDragonFormAwakened: nextP >= 100,
        };
      });
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          currentContext: {
            stability,
            mood,
            schemeProgress,
            growth: {
              age: activeGrowth.age,
              height: Math.min(190.0, activeGrowth.height),
              weight: Math.min(82.0, activeGrowth.weight),
              dragonLength: activeGrowth.dragonLength || 3.5,
              feedCount: activeGrowth.feedCount,
              dragonPotential: activeGrowth.dragonPotential,
              isDragonFormAwakened: activeGrowth.isDragonFormAwakened,
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const botReply = data.reply || '*Dịch Chi bĩu môi quay mặt đi, không thèm trả lời ngươi!*';

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: botReply,
      };

      setMessages((prev) => [...prev, botMsg]);
      sound.playChime();

      // Slightly adjust mood dynamically based on conversation keywords
      if (text.includes('chua') || text.includes('chanh')) {
        setMood('Xù lông giãy nảy vì đồ chua');
      } else if (text.includes('ngọt') || text.includes('kẹo') || text.includes('đào') || text.includes('ăn')) {
        setMood('No nê ngọt ngào • Đang lớn phổng phao');
        setStability((s) => Math.min(100, s + 3));
      } else if (text.includes('hôn thư') || text.includes('hủy hôn')) {
        setMood('Đỏ mặt đòi hủy hôn');
      }
    } catch (error) {
      console.warn('Chat request notice:', error);
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: getClientFallbackReply(text, activeGrowth),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Main Feeding Action Handler: increases age, height, weight and dragonPotential!
  const handleFeedCharacter = (food: FoodItem) => {
    sound.playSweetBite();

    const potentialGain = food.dragonPotentialGain || 20;
    const currentPotential = typeof growth.dragonPotential === 'number' ? growth.dragonPotential : 25;
    const nextPotential = Math.min(100, currentPotential + potentialGain);
    const isAwakened = nextPotential >= 100 || growth.isDragonFormAwakened;

    const nextHeight = Math.min(190.0, +(growth.height + food.heightGain).toFixed(1));
    const nextWeight = Math.min(82.0, +(growth.weight + food.weightGain).toFixed(1));
    const nextDragonLength = +( (growth.dragonLength || 3.5) + (food.dragonLengthGain || 2.0) ).toFixed(1);

    const nextGrowth: GrowthStats = {
      age: Math.min(20.0, +(growth.age + food.ageGain).toFixed(2)),
      height: nextHeight,
      weight: nextWeight,
      dragonLength: nextDragonLength,
      feedCount: growth.feedCount + 1,
      dragonPotential: nextPotential,
      isDragonFormAwakened: isAwakened,
      lastFedItem: food.name,
      lastGainText: `+${food.ageGain.toFixed(1)}T • +${food.heightGain.toFixed(1)}cm • +${food.weightGain.toFixed(1)}kg • +${(food.dragonLengthGain || 2).toFixed(1)}m Rồng • +${potentialGain}% Tiềm Năng`,
    };

    setGrowth(nextGrowth);
    setStability((s) => Math.min(100, s + 4));
    setMood(isAwakened ? 'Bán Long tỉnh thức • Lộ sừng và đuôi rồng kiều diễm' : 'No nê ngọt ngào • Vóc dáng lớn phổng phao');

    // Automatically send feeding action to chat so Dịch Chi reacts immediately
    handleSendMessage(food.prompt, undefined, nextGrowth);
  };

  // Reset Growth to 14 years old / 145cm / 39kg
  const handleResetGrowth = () => {
    setGrowth(INITIAL_GROWTH);
    try {
      localStorage.removeItem('dich_chi_growth_v2');
    } catch (e) {
      // ignore
    }
  };

  const handleResetChat = () => {
    if (window.confirm('Bạn có muốn bắt đầu lại cuộc trò chuyện với Dịch Chi không?')) {
      setMessages([INITIAL_GREETING]);
      setStability(65);
      setSchemeProgress(75);
      setMood('Nhõng nhẽo đòi ăn ngọt');
      sound.playChime();
    }
  };

  const handleInjectEventToChat = (
    userChoiceText: string,
    dichChiReaction: string,
    eventTitle: string,
  ) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `evt-u-${Date.now()}`,
      role: 'user',
      timestamp: timeStr,
      content: `[Lựa chọn trong "${eventTitle}"]: ${userChoiceText}`,
      sourceEvent: eventTitle,
    };

    const botMsg: ChatMessage = {
      id: `evt-b-${Date.now()}`,
      role: 'model',
      timestamp: timeStr,
      content: dichChiReaction,
      sourceEvent: eventTitle,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  return (
    <div className="min-h-screen bg-[#0d0718] text-purple-100 flex flex-col selection:bg-purple-600 selection:text-amber-200">
      {/* Background Starry Mist */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0d0718]/80 to-[#07030c] -z-10" />

      {/* Main Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stability={stability}
        schemeProgress={schemeProgress}
        mood={mood}
        growth={growth}
        onResetChat={handleResetChat}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenDragonSecret={() => setIsDragonModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Desktop Sidebar: Character Avatar & Live Gauges */}
        <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-20 bg-purple-950/70 border border-purple-800/40 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md space-y-4">
          <CharacterAvatar
            mood={mood}
            stability={stability}
            schemeProgress={schemeProgress}
            growth={growth}
            onFeed={handleFeedCharacter}
            onQuickInteract={(promptText) => {
              handleSendMessage(promptText);
              if (activeTab !== 'chat') setActiveTab('chat');
            }}
          />

          {/* Quick Tab to Feeding Panel */}
          <button
            onClick={() => {
              sound.playSweetBite();
              setActiveTab('feed');
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r from-amber-950/80 via-rose-950/80 to-purple-950/80 border border-amber-500/50 hover:border-amber-400 text-xs text-amber-200 transition-all shadow-md group active:scale-98 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg group-hover:scale-110 transition-transform">🍲</span>
              <div className="text-left">
                <div className="font-bold text-[11px] text-amber-300">
                  Bàn Thần Thực • Đút Ăn Mau Lớn
                </div>
                <div className="text-[10px] text-purple-300/80">
                  Tăng chiều cao & cân nặng
                </div>
              </div>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
              {growth.age.toFixed(1)} Tuổi
            </span>
          </button>

          {/* Hidden Dragon Bloodline Trigger Button */}
          <button
            onClick={() => {
              sound.playChime();
              setIsDragonModalOpen(true);
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gradient-to-r from-neutral-950 via-purple-950 to-neutral-900 border border-amber-500/40 hover:border-amber-400 text-xs text-amber-200 transition-all shadow-md group active:scale-98 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl group-hover:scale-110 transition-transform">🐉</span>
              <div className="text-left">
                <div className="font-bold text-[11px] text-amber-300 flex items-center gap-1">
                  <span>Huyết Mạch Hắc Long</span>
                </div>
                <div className="text-[10px] text-purple-300/80">Trạng thái ẩn • Bán Long Thể</div>
              </div>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
              {growth.age.toFixed(1)}/16.0 Tuổi
            </span>
          </button>

          <div className="pt-2 border-t border-purple-800/40 space-y-2 text-xs">
            <div className="flex items-center justify-between text-purple-300">
              <span>Độ bám dính / Chiếm hữu:</span>
              <span className="font-bold text-pink-300 font-mono">
                {Math.min(100, 100 - schemeProgress + 20)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-purple-950 rounded-full overflow-hidden border border-purple-800">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-500"
                style={{ width: `${Math.min(100, 100 - schemeProgress + 20)}%` }}
              />
            </div>
            <p className="text-[10px] text-purple-400/80 italic text-center pt-1">
              "Miệng bảo ghét bỏ đòi hủy hôn, nhưng chân lại bám dính không rời."
            </p>
          </div>
        </aside>

        {/* Right Active View Container */}
        <section className="lg:col-span-8 xl:col-span-9 bg-purple-950/40 border border-purple-800/30 rounded-2xl shadow-xl overflow-hidden min-h-[600px] flex flex-col justify-start">
          {activeTab === 'chat' && (
            <ChatView
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              stability={stability}
              schemeProgress={schemeProgress}
              mood={mood}
              growth={growth}
              onFeedFood={handleFeedCharacter}
              onSelectActionChip={(prompt) => handleSendMessage(prompt)}
            />
          )}

          {activeTab === 'feed' && (
            <div className="p-4 sm:p-6 space-y-6">
              <FeedingGrowthPanel
                growth={growth}
                onFeed={handleFeedCharacter}
                onResetGrowth={handleResetGrowth}
              />
            </div>
          )}

          {activeTab === 'diary' && (
            <DemonRealmDiary
              onUsePrompt={(prompt) => handleSendMessage(prompt)}
              onNavigateToChat={() => setActiveTab('chat')}
              currentAge={growth.age}
            />
          )}

          {activeTab === 'events' && (
            <EventChainView
              stability={stability}
              setStability={setStability}
              schemeProgress={schemeProgress}
              setSchemeProgress={setSchemeProgress}
              setMood={setMood}
              onInjectEventToChat={handleInjectEventToChat}
              onNavigateToChat={() => setActiveTab('chat')}
            />
          )}

          {activeTab === 'contract' && (
            <MarriageContractModal
              stability={stability}
              onAttemptStamp={(outcome) => {
                handleSendMessage(outcome, '*Bắt quả tang Dịch Chi đang lén lút cầm con dấu hủy hôn định đóng vào cuộn lụa hôn thư!*');
              }}
            />
          )}

          {activeTab === 'lore' && (
            <CharacterLoreModal
              growth={growth}
              onAskDichChiAbout={(prompt) => handleSendMessage(prompt)}
              onNavigateToChat={() => setActiveTab('chat')}
            />
          )}

          {activeTab === 'talismans' && (
            <TalismanDrawer
              onUseTalisman={(prompt) => handleSendMessage(prompt)}
              onNavigateToChat={() => setActiveTab('chat')}
            />
          )}
        </section>
      </main>

      {/* Secret Black Dragon Modal (Hidden State) */}
      <BlackDragonSecretModal
        isOpen={isDragonModalOpen}
        onClose={() => setIsDragonModalOpen(false)}
        growth={growth}
        onFeedFood={handleFeedCharacter}
        onInteract={(prompt) => {
          handleSendMessage(prompt);
          if (activeTab !== 'chat') setActiveTab('chat');
        }}
      />
    </div>
  );
}

