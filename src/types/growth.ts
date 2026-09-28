export const MAX_HUMAN_HEIGHT = 190.0; // 1m90 (190cm)
export const MAX_HUMAN_WEIGHT = 82.0; // 82kg
export const DRAGON_WEIGHT_RATIO = 90; // 10m = 900 cân -> 90 cân / 1 mét

export interface GrowthStats {
  age: number; // e.g. 14.0 -> 16.0+
  height: number; // in cm, 145.0 -> max 190.0 cm (1m90)
  weight: number; // in kg, 39.0 -> max 82.0 kg
  dragonLength: number; // in meters, 3.5m -> 10m -> 100m+ (không giới hạn)
  feedCount: number;
  dragonPotential: number; // 0 to 100%
  isDragonFormAwakened: boolean;
  lastFedItem?: string;
  lastGainText?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  icon: string;
  category: 'Linh Quả' | 'Canh Bổ' | 'Linh Thạch' | 'Điểm Tâm' | 'Linh Dược';
  desc: string;
  ageGain: number;
  heightGain: number; // cm (caps at 190cm)
  weightGain: number; // kg (caps at 82kg)
  dragonLengthGain: number; // meters added to dragon form
  dragonPotentialGain: number; // % (e.g. 15% - 40%)
  prompt: string;
  reactionQuote: string;
}

export const INITIAL_GROWTH: GrowthStats = {
  age: 14.0,
  height: 145.0,
  weight: 39.0,
  dragonLength: 3.5, // Thân rồng ấu long ban đầu 3.5m
  feedCount: 0,
  dragonPotential: 25, // Baseline 25%
  isDragonFormAwakened: false,
};

// Calculate dragon weight in "cân": 10m = 900 cân (90 cân / 1m)
export function calculateDragonWeight(dragonLengthMeters: number): number {
  return Math.round(dragonLengthMeters * DRAGON_WEIGHT_RATIO);
}

export function formatHumanHeight(heightCm: number): string {
  if (heightCm >= 190) return '1m90 (190 cm - Đạt Giới Hạn)';
  if (heightCm >= 100) {
    const meters = Math.floor(heightCm / 100);
    const cm = Math.round(heightCm % 100);
    return `${meters}m${cm < 10 ? '0' + cm : cm} (${heightCm.toFixed(1)} cm)`;
  }
  return `${heightCm.toFixed(1)} cm`;
}

export function formatHumanWeight(weightKg: number): string {
  if (weightKg >= 82) return '82.0 kg (Đạt Giới Hạn)';
  return `${weightKg.toFixed(1)} kg`;
}

export function formatDragonLength(lengthMeters: number): string {
  return `${lengthMeters.toFixed(1)} mét`;
}

export function formatDragonWeight(dragonWeightCan: number): string {
  return `${dragonWeightCan.toLocaleString('vi-VN')} Cân`;
}

export function getGrowthStage(age: number): {
  stageName: string;
  badgeColor: string;
  description: string;
  dragonState: string;
} {
  if (age < 14.5) {
    return {
      stageName: 'Ấu Long Bé Bỏng',
      badgeColor: 'from-pink-600 to-purple-600',
      description: 'Tiểu Điện Hạ 14 tuổi nhõng nhẽo, 3 vạt áo sa mỏng manh trễ vai, ngồi xích đu hoa ngọc đung đưa đôi chân trần trắng nõn thắt chỉ đỏ.',
      dragonState: 'Sừng non mềm mại mới nhú, đuôi bụ bẫm cộm vạt áo, cần được bồi bổ nhiều kẹo ngọt.',
    };
  } else if (age < 15.0) {
    return {
      stageName: 'Tiểu Long Trổ Mã',
      badgeColor: 'from-amber-600 to-rose-600',
      description: 'Bắt đầu lớn phổng phao thấy rõ! Đôi chân dài ra trên xích đu, dáng người thanh thoát, đôi mắt hoa đào biếc thêm phần diễm lệ.',
      dragonState: 'Hai sừng rồng nhú dài thêm và cứng cáp hơn, vảy rồng ở hõm lưng bắt đầu phát sáng ánh lam ngọc.',
    };
  } else if (age < 15.5) {
    return {
      stageName: 'Thiếu Niên Bán Long',
      badgeColor: 'from-emerald-600 to-teal-600',
      description: 'Khí chất thiếu niên ma tộc xuất trần, vạt áo sa đỏ nhạt tung bay theo từng bước chân, múa kiếm Nhu Bạch vừa uyển chuyển vừa sắc sảo.',
      dragonState: 'Vảy rồng đen tuyền ánh lam ngọc sáng bóng như gương, đuôi rồng thon dài quấn quýt bên Thần Quân.',
    };
  } else if (age < 16.0) {
    return {
      stageName: 'Đại Long Nhập Thể',
      badgeColor: 'from-purple-600 to-indigo-600',
      description: 'Dáng dấp cao ráo yêu kiều, mị lực ma thần nghịch thiên. Bút Vạn Cảnh phát ra uy áp chấn động tứ hải, chỉ còn bước ngắn là chạm mốc 16 tuổi!',
      dragonState: 'Sừng rồng uy dũng đen nhánh, long uy tỏa ra mờ ảo, nhưng vẫn đỏ mặt khi được Thần Quân cọ vảy.',
    };
  } else {
    return {
      stageName: 'Hắc Long Thành Thục (Trưởng Thành)',
      badgeColor: 'from-amber-500 via-rose-600 to-purple-700',
      description: 'Đã chính thức đạt mốc trưởng thành 16 tuổi! Thoát khỏi kiếp ấu long, thần thái vạn người mê, danh chấn hai cõi Thần Ma.',
      dragonState: 'Long thể hoàn chỉnh uy phong lẫm liệt, hoàn toàn làm chủ huyết mạch thượng cổ nhưng vẫn thích nép vào lòng Thần Quân nhõng nhẽo.',
    };
  }
}

export const FOOD_MENU: FoodItem[] = [
  {
    id: 'soup',
    name: 'Canh Long Tủy Thượng Phẩm',
    icon: '🍲',
    category: 'Canh Bổ',
    desc: 'Nấu từ tủy rồng thượng cổ và linh chi ngàn năm, mùi thơm ngào ngạt bổ huyết ích khí.',
    ageGain: 0.2,
    heightGain: 1.5,
    weightGain: 0.8,
    dragonLengthGain: 3.0, // +3m thân rồng
    dragonPotentialGain: 25,
    prompt: '*Bưng một chén Canh Long Tủy thượng phẩm thơm nức ngào ngạt, cẩn thận thổi nguội rồi đút từng muỗng cho Dịch Chi ăn để mau lớn cao khỏe*',
    reactionQuote: '*Dịch Chi hai mắt sáng rực, phồng má húp cạn chén Canh Long Tủy thơm lừng, xoa xoa chiếc bụng nhỏ no tròn*: "Ngon quá đi mất! Canh Long Tủy của Thần Quân quả nhiên là linh dược số một... Mau nhìn xem, ta có cảm giác mình vừa cao thêm rồi này!"',
  },
  {
    id: 'peach',
    name: 'Đào Tiên Vạn Năm Dao Trì',
    icon: '🍑',
    category: 'Linh Quả',
    desc: 'Linh đào ngọt lịm mọng nước hái từ Dao Trì thượng giới, một miếng ngập tràn tiên khí.',
    ageGain: 0.1,
    heightGain: 0.8,
    weightGain: 0.5,
    dragonLengthGain: 1.5, // +1.5m thân rồng
    dragonPotentialGain: 15,
    prompt: '*Lấy từ ngực áo ra quả Đào Tiên Vạn Năm ngọt lịm mọng nước, lau sạch sẽ rồi đút tận miệng dỗ dành Dịch Chi cắn ăn*',
    reactionQuote: '*Dịch Chi há miệng cắn ngập quả đào tiên, nước mật ngọt lịm chảy ra khóe môi khiến nhóc liếm môi chùn chụt*: "Ngọt lịm à~ Cắn một miếng mà tiên khí dâng trào khắp kinh mạch! Thần Quân ngươi đút khéo thế này thì ta sắp lớn bằng ngươi thật rồi!"',
  },
  {
    id: 'stone',
    name: 'Linh Thạch Ngũ Sắc Kiếm Trộm Về',
    icon: '💎',
    category: 'Linh Thạch',
    desc: 'Linh thạch ngũ sắc thượng cấp do kiếm Nhu Bạch vừa đánh người cướp về, đậm đặc tinh hoa trời đất.',
    ageGain: 0.25,
    heightGain: 1.8,
    weightGain: 1.0,
    dragonLengthGain: 4.5, // +4.5m thân rồng
    dragonPotentialGain: 28,
    prompt: '*Lấy nắm Linh Thạch Ngũ Sắc thượng phẩm kiếm Nhu Bạch vừa trộm về, luyện hóa thành kẹo ngọc ngọt ngào đút cho Dịch Chi bồi bổ huyết mạch*',
    reactionQuote: '*Dịch Chi ngậm trọn nắm linh thạch đã luyện hóa, vảy rồng ở hõm lưng lập tức lóe sáng lấp lánh ánh lam ngọc, hai sừng non rung rinh*: "Ưm! Hấp thụ đã quá! Kiếm Nhu Bạch ngoan, Thần Quân ngươi cũng rất hiểu chuyện! Ta thấy cả người tràn đầy sức mạnh rồi!"',
  },
  {
    id: 'pastry',
    name: 'Bánh Ngọt Bạch Ngọc Thần Tộc',
    icon: '🍡',
    category: 'Điểm Tâm',
    desc: 'Bánh điểm tâm làm từ bột tuyết liên và mật hoa ngọc, thơm dịu mềm xốp tan ngay đầu lưỡi.',
    ageGain: 0.15,
    heightGain: 1.1,
    weightGain: 0.65,
    dragonLengthGain: 2.0, // +2m thân rồng
    dragonPotentialGain: 16,
    prompt: '*Mở hộp gấm bày ra từng chiếc Bánh Bạch Ngọc trắng ngần thơm ngát, đút từng miếng bánh ngọt mềm cho Dịch Chi ăn lót dạ trên xích đu*',
    reactionQuote: '*Dịch Chi phồng hai má nhai nhồm nhoàm bánh Bạch Ngọc, vụn bánh dính ở khóe môi, hai chân trần đung đưa tít mù*: "Bánh này mềm tan ngon quá... Hai má ta có phải béo tròn thêm rồi không?! Nhưng mà mặc kệ, ta phải ăn cho lớn phổng phao để không bị ngươi bắt nạt nữa!"',
  },
  {
    id: 'honey',
    name: 'Mật Ong Bách Hoa Thần Rừng',
    icon: '🍯',
    category: 'Điểm Tâm',
    desc: 'Mật ong thu thập từ ngàn đóa hoa tiên rừng thẳm, óng ánh sắc vàng giúp nhuận sắc tăng cân.',
    ageGain: 0.08,
    heightGain: 0.6,
    weightGain: 0.4,
    dragonLengthGain: 1.0, // +1m thân rồng
    dragonPotentialGain: 12,
    prompt: '*Dùng thìa ngọc múc một thìa Mật Ong Bách Hoa vàng óng ngọt ngào, nhẹ nhàng đưa tới bên môi đút cho Dịch Chi thưởng thức*',
    reactionQuote: '*Dịch Chi hé đôi môi hồng hào ngậm lấy thìa mật ong ngọt ngào, đuôi rồng dài bụ bẫm thích thú ngoe nguẩy đập đập xuống xích đu*: "Ngọt thấu tận tâm can luôn! Thần Quân ngươi ngày nào cũng dỗ ta bằng mật ngọt thế này thì làm sao ta nỡ ký giấy hủy hôn chứ... Ơ ta lỡ lời rồi!"',
  },
  {
    id: 'mandalam',
    name: 'Rượu Trà Mạn Đà Lam Thần Khí',
    icon: '🍶',
    category: 'Canh Bổ',
    desc: 'Loại rượu trà bí truyền Dịch Chi từng định chuốc say Thần Quân, chứa linh dịch hồi phục và kích thích long mạch.',
    ageGain: 0.18,
    heightGain: 1.3,
    weightGain: 0.75,
    dragonLengthGain: 3.5, // +3.5m thân rồng
    dragonPotentialGain: 22,
    prompt: '*Rót một chén nhỏ Rượu Trà Mạn Đà Lam thơm nồng đượm vị linh thảo, dỗ dành Dịch Chi nhấp từng ngụm nhỏ để lưu thông khí huyết và bồi bổ thân thể*',
    reactionQuote: '*Dịch Chi nhấp cạn chén trà rượu, hai gò má trắng nõn lập tức ửng đỏ như ráng chiều, ánh mắt hoa đào mông lung say sưa*: "Nấc... rượu trà này bổ thật đấy... Cả người ta ấm ran lên rồi... Thần Quân ca ca, ngươi nhìn xem chân ta có phải dài ra chạm tới đất rồi không..."',
  },
  {
    id: 'elixir',
    name: 'Cửu Chuyển Hóa Long Đan',
    icon: '💊',
    category: 'Linh Dược',
    desc: 'Thần đan cực phẩm luyện chế từ cửu thiên thần hỏa, giúp ấu long trổ mã tăng vọt chiều cao, tuổi tác và vươn dài thân rồng!',
    ageGain: 0.35,
    heightGain: 2.5,
    weightGain: 1.5,
    dragonLengthGain: 8.0, // +8m thân rồng
    dragonPotentialGain: 40,
    prompt: '*Lấy ra viên Cửu Chuyển Hóa Long Đan tỏa hào quang rực rỡ chín tầng mây, nhẹ nhàng đặt vào tay áo rồi đút cho Dịch Chi nuốt trọn để bứt phá tăng trưởng*',
    reactionQuote: '*Viên thần đan vừa trôi vào bụng, một luồng long khí đen tuyền ánh kim phóng thẳng lên trời! Dịch Chi giật mình sờ sừng rồng và thân người, kêu lên oái oái*: "Trời đất ơi! Ta cảm giác xương cốt kêu răng rắc luôn này! Cao thêm một khúc rồi! Thân rồng dài ra uy vũ quá! Ngươi nuôi ta thành đại long thật rồi sao?!"',
  },
];
