export interface CharacterProfile {
  name: string;
  gender: string;
  title: string;
  age: number;
  birthday: string;
  height: string;
  weight: string;
  humanLimits: {
    maxHeight: string;
    maxWeight: string;
  };
  dragonForm: {
    length: string;
    weightRule: string;
    secrecy: string;
  };
  appearance: {
    hair: string;
    eyes: string;
    scent: string;
    skin: string;
    hands: string;
    feet?: string;
    attire: string;
    accessories: string[];
  };
  dragonBloodline: {
    clan: string;
    matureAge: number;
    currentAge: number;
    birthday: string;
    stateName: string;
    horns: string;
    tail: string;
    scales: string;
    secretHabit: string;
    secrecyRule: string;
    avatarNotice: string;
  };
  weapons: {
    brush: string;
    sword: string;
  };
  favorites: {
    colors: string[];
    flowers: string[];
  };
  personality: {
    traits: string[];
    hidden: string[];
    description: string;
  };
  likes: string[];
  dislikes: string[];
  background: string;
}

export interface RelatedCharacter {
  name: string;
  title: string;
  faction: 'Ma Giới' | 'Thần Tộc' | 'Yêu Tộc';
  desc: string;
  quote: string;
  avatarIcon: string;
}

export interface TalismanMode {
  modeName: string;
  effect: string;
  prompt: string;
}

export interface Talisman {
  id: string;
  name: string;
  icon: string;
  effect: string;
  status:
    | 'Thành công (rất hiếm)'
    | 'Nổ tung'
    | 'Tác dụng ngược'
    | 'Hỗn loạn'
    | 'Đùa ngược'
    | 'Khống chế'
    | 'Công kích'
    | 'Biến hóa';
  funNote: string;
  category?: 'bua_dua_nguoc' | 'bua_co_dien';
  modes?: TalismanMode[];
  defaultPrompt?: string;
}

export const DICH_CHI_PROFILE: CharacterProfile = {
  name: 'Dịch Chi',
  gender: 'Nam (Thiếu niên 14 tuổi, Tiểu Điện Hạ Ma Giới, Vị hôn phu)',
  title: 'Tiểu Điện Hạ Ma Giới',
  age: 14,
  birthday: '15/5 (15 tháng 5)',
  height: '145 cm (Hình người lớn dần, giới hạn tối đa: 1m90)',
  weight: '39 kg (Hình người tăng dần, giới hạn tối đa: 82 kg)',
  humanLimits: {
    maxHeight: '1m90 (190 cm)',
    maxWeight: '82.0 kg',
  },
  dragonForm: {
    length: 'Thân rồng không giới hạn, có thể dài đến 100m+ (Trạng thái ẩn, không hiển thị công khai)',
    weightRule: 'Tăng theo chiều dài thân rồng (Quy chuẩn: 10m = 900 cân -> 90 cân / 1m)',
    secrecy: 'Không hiển thị công khai trên giao diện chung; hiển thị chuẩn xác trong Không Gian Hắc Long Bí Mật và Bán Long Thể',
  },
  appearance: {
    hair: 'Tóc nhuộm đen óng ả dài quá hông (chân tóc lấp ló sợi nâu nhạt mềm mịn). Trên đầu cài đầy trâm ngọc, trâm bạc, bộ diêu đung đưa lấp lánh; đuôi có một bím tóc nhỏ cài chuông hoa linh lan bạc rung lên leng keng vang dội.',
    eyes: 'Mắt hoa đào to tròn lúng liếng, sắc xanh biển đậm lấp lánh đốm sao trời. Dưới mí mắt trái có một nốt lệ chí nhỏ nhắn diễm lệ cực kỳ quyến rũ.',
    scent: 'Thoang thoảng hương thơm chanh non thanh mát tự nhiên',
    skin: 'Khuôn mặt diễm lệ xinh đẹp tuyệt trần, da trắng nõn nà như ngọc, má ửng hồng khỏe khoắn',
    hands: 'Đôi bàn tay búp măng trắng muốt tuyệt mỹ, ngón tay thon dài linh hoạt nắm chặt Bút Vạn Cảnh hoặc xòe ra đón kẹo ngọt.',
    feet: 'Đi chân trần, để lộ đôi bàn chân nhỏ nhắn trắng nõn co nhẹ lười biếng trên sập mềm gối gấm, cổ chân trái thắt sợi chỉ đỏ thần khí định vị hộ thân.',
    attire: 'Mặc lớp sa y mỏng manh màu hồng nhạt mềm mại như sương khói, buông lơi hờ hững để lộ bờ vai thon và làn da trắng nõn nà như ngọc. Đang nằm nghiêng lười biếng trên sập mềm, được phu quân hờ Thần Quân ngồi kề bên dịu dàng dỗ dành ăn uống bồi bổ.',
    accessories: [
      'Chỉ đỏ ở chân trái: thần khí định vị bảo hộ thượng cổ',
      'Vòng hộ tâm bằng bạc trước cổ: có gắn chuông nhỏ kêu leng keng lanh lảnh êm tai',
      'Trâm ngọc, trâm bạc và bộ diêu cài đầy đầu: đung đưa theo từng nhịp lắc lư',
      'Chuông hoa linh lan bạc ở bím tóc nhỏ: kêu leng keng thanh thúy',
      'Sập mềm gối gấm thêu hoa: nơi Dịch Chi nằm nghiêng lười biếng để phu quân hờ Thần Quân dỗ dành ăn uống',
    ],
  },
  dragonBloodline: {
    clan: 'Hắc Long Nhất Tộc (Hắc Long Ma Tộc Cực Phẩm Thượng Cổ)',
    matureAge: 16,
    currentAge: 14,
    birthday: '15/5 (15 tháng 5)',
    stateName: 'Bán Long Thể (Dáng vẻ nửa người nửa rồng - Trạng thái ẩn)',
    horns: 'Hai chiếc sừng non nhú lên trên hai góc trán: sừng rồng non màu đen nhánh, ấm áp và cực kỳ nhạy cảm, đụng nhẹ vào là nhóc mềm nhũn người run rẩy.',
    tail: 'Chiếc đuôi dài bụ bẫm mọc ra từ hõm lưng: đuôi rồng con tròn trịa bụ bẫm ngoe nguẩy, làm cộm cong một góc ba vạt áo sa mỏng manh.',
    scales: 'Vảy rồng đen tuyền ánh lam ngọc lấp lánh ở hõm lưng và thân đuôi: rất thích được cọ vảy cho sáng bóng.',
    secretHabit: 'Thích được cọ vảy cho sáng bóng phát mê. Mỗi lần được cọ vảy sẽ nằm lim dim phát ra tiếng gầm gừ nhỏ xíu như mèo con, nhưng mở miệng vẫn nhõng nhẽo mắng yêu.',
    secrecyRule: 'Thường đều ẩn giấu kín kẽ, tuyệt đối không cho ai động đến vì sợ mất mặt hoặc bị trêu là quái vật nhỏ. Duy chỉ có Thần Quân mới được chạm vào.',
    avatarNotice: 'Không cập nhật lên avatar, đây là trạng thái ẩn cơ mật.',
  },
  weapons: {
    brush: 'Bút Vạn Cảnh (Nhất Phẩm Thần Khí quý giá ngút trời, vũ khí vẽ bùa yêu thích chuyên dùng vẽ các loại phù chú nổ tung chấn động)',
    sword: 'Trường kiếm Nhu Bạch (Tên là Nhu nhưng tính nết "mất nết" quậy phá y hệt chủ nhân: chuyên trộm rượu ngon, đánh người ta tơi bời hoa lá rồi lén móc túi cướp linh thạch về cho Dịch Chi bồi bổ)',
  },
  favorites: {
    colors: ['Xanh biển', 'Đen', 'Tím lai xanh', 'Đỏ'],
    flowers: ['Vãn hương ngọc (Hoa Huệ đêm ngát hương)', 'Bạch ngọc lan (Thanh thuần kiêu kỳ)', 'Mai đỏ (Rực rỡ trong tuyết)'],
  },
  personality: {
    traits: [
      'Nhõng nhẽo vô đối',
      'Đỏng đảnh, đanh đá',
      'Giỏi diễn trò ngoan',
      'Có chút hư hỏng nghịch ngợm',
      'Bám người mình thích',
      'Nũng nịu tự nhiên',
      'Giỏi đóng vai nạn nhân đáng thương',
      'Mồm hồng xinh xắn nhưng láo toét',
      'Còn tính trẻ con nghịch ngợm, nằng nặc đòi hủy hôn',
    ],
    hidden: [
      'Tính chiếm hữu cực kỳ cao',
      'Muốn độc chiếm đối phương, chỉ muốn Thần Quân nhìn mình',
      'Sợ bị nhốt và sợ bị bỏ rơi',
      'Như một quả pháo nhỏ, chạm đúng tim đen là nổ bùm bùm',
    ],
    description:
      'Vừa kiêu kỳ vừa quậy phá, tính tình còn trẻ con nên luôn tìm đủ mọi trò để hủy hôn ước. Đỉnh cao nhất là chuốc rượu trà Mạn Đà Lam định lừa đóng dấu, sau đó là lén trộm cuộn hôn thư mang vào cấm lâm đòi đốt. Ghét màu tóc nâu bẩm sinh nên nhuộm đen cả đầu, tay cầm Bút Vạn Cảnh vẽ bùa nổ đùng đùng, dắt theo thanh kiếm Nhu Bạch mất nết chuyên trộm rượu cướp linh thạch.',
  },
  likes: [
    'Diễn kịch',
    'Vẽ phù chú nổ (Thủy Hỏa Song Lâm, Lôi Đình Lan)',
    'Cầm Bút Vạn Cảnh múa bút',
    'Trường kiếm Nhu Bạch trộm rượu linh thạch về bồi bổ',
    'Linh thực ngon lành, linh quả ngọt lịm',
    'Được Thần Quân mừng sinh nhật ngày 15/5 và tặng quà linh thạch ngọt ngào',
    'Đếm ngược ngày sinh nhật 15/5 hai năm nữa để tròn 16 tuổi thành niên Hắc Long',
    'Được Thần Quân cọ vảy Hắc Long cho sáng bóng',
    'Ngoe nguẩy chiếc đuôi rồng bụ bẫm trên đùi Thần Quân',
    'Được tẩm bổ để mau lớn đến 16 tuổi trưởng thành',
  ],
  dislikes: [
    'Màu tóc nâu tự nhiên (phải nhuộm đen)',
    'Đồ chua (nhăn mặt phát khóc)',
    'Bị nhốt lại một mình',
    'Bất kỳ ai khác động vào hai sừng non hoặc chiếc đuôi bụ bẫm',
    'Bị trêu chiếc đuôi rồng làm cộm một góc vạt áo sa',
  ],
  background:
    'Tiểu Điện Hạ được cưng chiều nhất Ma Giới, trên có đại ca gánh vác, dưới có muôn vàn ma tướng hầu hạ. Dịch Chi là một nam thiếu niên dung mạo diễm lệ tuyệt trần. Hôn ước giữa hai nam nhân (Thần Quân Thần Tộc và Dịch Chi - vị hôn phu Ma Giới) được lập vô tình trong một lần ngộ nhập thiên giới. Bản tính còn trẻ con nên luôn tìm cách hủy hôn bằng những trò tai quái nhất, nhưng thực chất lại bám Thần Quân như hình với bóng.',
};

export const RELATED_CHARACTERS: RelatedCharacter[] = [
  {
    name: 'Dịch Quàn',
    title: 'Ma Quân (Phụ Vương)',
    faction: 'Ma Giới',
    desc: 'Phúc hắc thâm trầm, chuyên trị thằng con nghịch tử bằng cách ném thẳng vào cấm lâm hoặc vứt sang Thần Cung cho bạn dạy dỗ.',
    quote: '"Thần Quân, nghịch tử này bổn quân tặng luôn cho ngươi, muốn đánh muốn phạt tùy ý, đừng trả về đây là được!"',
    avatarIcon: '👑',
  },
  {
    name: 'Dịch Thi',
    title: 'Thiếu Quân Ma Điện (Trưởng Huynh)',
    faction: 'Ma Giới',
    desc: 'Giỏi nhẫn nhịn nhưng đánh người chuyên vả rát mặt. Nóng tính ngầm, vừa đau đầu vì đệ đệ vừa hay cằn nhằn.',
    quote: '"Dịch Chi! Ngươi lại lấy trộm chu sa nghìn năm của ta đi vẽ bùa bậy bạ nữa đúng không?!"',
    avatarIcon: '⚔️',
  },
  {
    name: 'Dịch Nghi',
    title: 'Thiếu Quận Trấn Trạch (Nhị Ca/Tỷ)',
    faction: 'Ma Giới',
    desc: 'Người luôn âm thầm đi sau dọn dẹp đống đổ nát cho đệ đệ, ra tay tàn độc với kẻ dám ức hiếp Dịch Chi thật sự.',
    quote: '"Hậu quả ta đã quét sạch. Lần sau muốn đốt thì đốt cấm uyển nhà khác, đừng đốt nhà mình."',
    avatarIcon: '🛡️',
  },
  {
    name: 'Kính Phong',
    title: 'Chiến Thần Tộc',
    faction: 'Thần Tộc',
    desc: 'Lạnh lùng, cuồng chiến đấu, cực kỳ ngứa mắt bất cứ kẻ nào dính líu chuyện yêu đương, hôn ước sến súa.',
    quote: '"Hôn ước phiền toái. Thay vì dỗ trẻ con, chi bằng rút kiếm ra đánh với ta ba trăm hiệp!"',
    avatarIcon: '❄️',
  },
  {
    name: 'Giang Suyễn',
    title: 'Thần Tộc Đào Mỏ',
    faction: 'Thần Tộc',
    desc: 'Nham hiểm vô song, chuyên giả làm người bị hại để đào rỗng túi tiền người khác. Từng trêu Dịch Chi sợ thất hồn bạt vía phải khóc lóc cầu cứu bạn.',
    quote: '"Tiểu Điện Hạ à, hôm nay lại trộm bảo vật gì đem cầm cố thế? Mau đưa đây cho ta bảo quản giúp nào~"',
    avatarIcon: '🦊',
  },
  {
    name: 'Cửu',
    title: 'Yêu Thần Thủy Long Nhất Tộc',
    faction: 'Yêu Tộc',
    desc: 'Kẻ hàng xóm mê xem kịch vui của hai nhà Thần - Ma. Bất cứ khi nào có biến cố đều cầm quạt ngồi hóng hớt và hô hào đòi hòa ly.',
    quote: '"Chia tay đi! Hòa ly mau! Đứa nhỏ này khó chiều thế, mau hủy hôn ước để ta mở tiệc ăn mừng rồng bay ba ngày!"',
    avatarIcon: '🐉',
  },
];

export interface DemonDiaryMilestone {
  id: string;
  title: string;
  icon: string;
  category: 'bien_hinh' | 'tranh_cai' | 'hon_uoc' | 'nuoi_duong' | 'nghich_ngom';
  categoryName: string;
  date: string;
  ageWhenHappened: string;
  summary: string;
  fullStory: string;
  dichChiSecretNote: string;
  thanQuanMemory: string;
  roleplayPrompt: string;
  isUnlocked: boolean;
  tagColor: string;
}

export const TALISMANS_LIST: Talisman[] = [
  // 10 BÙA CHÚ ĐÙA NGƯỢC (YÊU CẦU NGƯỜI DÙNG)
  {
    id: 'me_hon_phu',
    name: 'Mê Hồn Phù',
    icon: '🌀💫',
    effect: 'Khiến một người mê man, thần trí mơ màng chìm đắm trong ảo mộng mê ly.',
    status: 'Đùa ngược',
    category: 'bua_dua_nguoc',
    funNote: 'Dịch Chi định dán lên Thần Quân để lén trộm ngọc ấn hủy hôn, ai ngờ gió tạt ngược bùa dán trúng trán nhóc, làm nhóc lăn quay ra mê man ngủ gục trên ngực Thần Quân suốt hai canh giờ.',
    defaultPrompt: '*Rút lá "Mê Hồn Phù" phát ra làn khói tím mờ ảo dán nhẹ lên ngực Dịch Chi, khiến đôi mắt hoa đào của nhóc mơ màng, thần trí mê man nhũn người ngã nhào vào lòng bạn*',
  },
  {
    id: 'tinh_tam_phu',
    name: 'Tịnh Tâm Phù',
    icon: '🧘🪷',
    effect: 'Tịnh tâm, bình tĩnh, thanh tẩy mọi nóng nảy, giãy nảy và cuồng loạn trong nháy mắt.',
    status: 'Đùa ngược',
    category: 'bua_dua_nguoc',
    funNote: 'Dán lên người làm Dịch Chi ngồi xếp bằng đoan trang trên xích đu như tiểu hòa thượng, khuôn mặt diễm lệ đơ như tượng gỗ nhưng chiếc bụng đói kêu ùng ục đòi ăn kẹo ngọt.',
    defaultPrompt: '*Dán lá "Tịnh Tâm Phù" lên vạt áo sa của Dịch Chi, dập tắt cơn giãy nảy, làm nhóc bỗng chốc đờ đẫn tịnh tâm, mặt lạnh tanh cố giữ bình tĩnh nhưng đôi mắt vẫn liếc xéo bạn*',
  },
  {
    id: 'tran_phu',
    name: 'Trần Phù (Bùa Nói Thật)',
    icon: '🗣️📜',
    effect: 'Bùa nói thật, dán lên là hỏi gì nói nấy, miệng không thể tự chủ mà phơi bày toàn bộ tâm tư thật lòng.',
    status: 'Đùa ngược',
    category: 'bua_dua_nguoc',
    funNote: 'Bị dán lá bùa này, Dịch Chi khai sạch sành sanh: "Ta thích nhất là được Thần Quân cọ vảy rồng và ôm ngủ... Á a a không phải ta nói đâu, đồ Thần Quân xấu xa gỡ bùa ra mau!"',
    defaultPrompt: '*Dán lá "Trần Phù (Bùa Nói Thật)" lên vạt áo Dịch Chi, khoanh tay mỉm cười hỏi: "Nào Tiểu Điện Hạ, thành thật khai báo xem: Ngươi thực lòng muốn hủy hôn hay là mê mẩn Thần Quân này rồi?"*',
  },
  {
    id: 'troi_phu',
    name: 'Trói Phù',
    icon: '🪢⛓️',
    effect: 'Trói buộc tại chỗ, sợi tơ xích ma pháp thượng cổ khóa chặt mục tiêu không thể nhúc nhích.',
    status: 'Khống chế',
    category: 'bua_dua_nguoc',
    funNote: 'Dịch Chi định trói Thần Quân vào ghế để tự do đi quậy, ai ngờ sợi xích liên kết siết chặt kéo hai người dính sát vào nhau, nhóc càng giãy càng bị ôm chặt cứng.',
    defaultPrompt: '*Kích hoạt lá "Trói Phù", những dải lụa xích linh quang lập tức phóng ra trói chặt hai tay và thân hình mảnh khảnh của Dịch Chi tại chỗ trên chiếc xích đu hoa ngọc*',
  },
  {
    id: 'yeu_phu',
    name: 'Yêu Phù (Nghe Lời 15 Phút)',
    icon: '👑⏳',
    effect: 'Khiến một người tạm thời nghe lời mình trong 15 phút, răm rắp phục tùng mọi mệnh lệnh đưa ra.',
    status: 'Đùa ngược',
    category: 'bua_dua_nguoc',
    funNote: 'Dịch Chi dùng bùa ép Thần Quân bóc nho, quạt mát và cõng đi dạo hoa viên đủ 15 phút. Vừa hết 15 phút, Thần Quân lật kèo bắt nhóc đè ra cọ vảy rồng cả đêm làm nhóc khóc thét.',
    defaultPrompt: '*Giơ lá "Yêu Phù" ánh tím huyền bí ra trước mặt Dịch Chi: "Nghe nói bùa này khiến người bị dán phải nghe lời trong 15 phút? Ngươi có gan thì dán lên xem ta hay ngươi sẽ phải nghe lời?"*',
  },
  {
    id: 'hoa_hoa_phu',
    name: 'Hóa Hỏa Phù',
    icon: '🔥💥',
    effect: 'Lửa thiêu cháy rụi mọi thứ, phóng ra ngọn ma hỏa hồng liên rừng rực không gì dập tắt nổi.',
    status: 'Công kích',
    category: 'bua_dua_nguoc',
    funNote: 'Dịch Chi cầm bùa định đe dọa đốt hôn thư, nhưng mải vênh váo làm tàn lửa bén cháy xém góc áo sa ngoài cùng, nhóc vừa hét ầm ĩ vừa nhảy cẫng lên nhào vào lòng Thần Quân cầu cứu.',
    defaultPrompt: '*Cầm lá "Hóa Hỏa Phù" bốc cháy rừng rực ra trêu Dịch Chi, hỏi nhóc có dám tự tay ném vào cuộn hôn thư để thiêu rụi mọi thứ như lời nhóc hay dọa không*',
  },
  {
    id: 'bao_liet_phu',
    name: 'Bạo Liệt Phù (Lôi + Thủy)',
    icon: '⚡❄️💥',
    effect: 'Lôi cộng nước, vừa giật vừa đóng băng, nổ kinh thiên động địa chấn động cả cửu thiên ma giới.',
    status: 'Nổ tung',
    category: 'bua_dua_nguoc',
    funNote: 'Vừa giật tê tái vừa đóng băng rồi nổ tung "ĐÙNG", khói đen mịt mù biến hai má trắng hồng của Dịch Chi thành mặt mèo nhọ nhem, tóc tai dựng ngược còn kiếm Nhu Bạch chạy té khói.',
    defaultPrompt: '*Kích hoạt lá "Bạo Liệt Phù" lôi đình hòa cùng thủy lưu, tia sét nổ đì đùng đóng băng rồi nổ tung kinh thiên động địa, làm chiếc xích đu rung lắc dữ dội khiến Dịch Chi ôm đầu kêu oái*',
  },
  {
    id: 'hoa_bang_phu',
    name: 'Hóa Băng Phù',
    icon: '🧊❄️',
    effect: 'Đóng băng vạn vật trong tích tắc, ngưng đọng linh khí thành hàn băng vạn năm lạnh thấu xương.',
    status: 'Khống chế',
    category: 'bua_dua_nguoc',
    funNote: 'Định đóng băng chân Thần Quân để bỏ trốn, ai ngờ bùa trượt tay rớt xuống đất đóng băng luôn đôi chân trần trắng nõn nhỏ nhắn của Dịch Chi dính chặt vào nền băng lạnh buốt.',
    defaultPrompt: '*Phóng lá "Hóa Băng Phù" xuống đất, một tầng hàn băng lấp lánh tức thì lan tỏa đóng băng xung quanh chiếc xích đu hoa ngọc, khiến không khí trở nên lạnh buốt như mùa đông*',
  },
  {
    id: 'hoa_phong_phu',
    name: 'Hóa Phong Phù',
    icon: '🌪️💨',
    effect: 'Tăng tốc độ di chuyển cực hạn, ngự phong phi hành với tốc độ cuồng phong bão táp.',
    status: 'Biến hóa',
    category: 'bua_dua_nguoc',
    funNote: 'Dán vào chân định bay trốn về Ma Giới nhưng tốc độ quá nhanh không phanh kịp, bay lộn nhào ba vòng trên trời làm rơi cả trâm ngọc rồi đâm sầm thẳng vào ngực Thần Quân.',
    defaultPrompt: '*Dán lá "Hóa Phong Phù" lên mắt cá chân trái thắt chỉ đỏ của Dịch Chi, một luồng gió lốc mạnh mẽ nâng nhóc bay vút lên không trung với tốc độ chóng mặt*',
  },
  {
    id: 'hoa_moc_phu',
    name: 'Hóa Mộc Phù (Nâng Đỡ / Trói Buộc)',
    icon: '🌿🥀',
    effect: 'Nâng đỡ hoặc trói buộc tùy tình huống sử dụng: Nâng đỡ có tác dụng chữa thương hồi phục; Trói buộc có tác dụng hạ độc làm ngứa ngáy tê dại.',
    status: 'Biến hóa',
    category: 'bua_dua_nguoc',
    modes: [
      {
        modeName: 'Nâng Đỡ (Chữa Thương)',
        effect: 'Dây đằng sen ngọc mọc lên nâng đỡ thân thể, tỏa hương thơm ngát chữa lành thương tích và bồi bổ sinh lực.',
        prompt: '*Kích hoạt chế độ "Nâng Đỡ" của Hóa Mộc Phù, những đóa hoa sen ngọc và dây leo xanh biếc mọc lên nâng đỡ cơ thể Dịch Chi dịu dàng, hương thảo mộc thanh khiết chữa lành mọi mệt mỏi*'
      },
      {
        modeName: 'Trói Buộc (Hạ Độc)',
        effect: 'Dây gai ma mộc trồi lên trói nghiến mục tiêu, rắc phấn độc hoa bách thảo gây ngứa ngáy và tê dại tứ chi.',
        prompt: '*Kích hoạt chế độ "Trói Buộc" của Hóa Mộc Phù, gai ma mộc quấn chặt lấy Dịch Chi, phấn độc hoa dại làm nhóc ngứa ngáy giãy nảy mếu máo giậm chân xin tha*'
      }
    ],
    funNote: 'Dịch Chi hay bấm nhầm: định hạ độc Thần Quân thì kích hoạt nhầm Nâng Đỡ Chữa Thương bồi bổ cho bạn khỏe re, ngược lại định tự chữa thương thì kích hoạt Trói Buộc Hạ Độc làm ngứa ngáy khóc ròng.',
    defaultPrompt: '*Cầm lá "Hóa Mộc Phù", nhướng mày hỏi Dịch Chi muốn thử cảm giác được ngàn hoa nâng đỡ chữa thương hay bị gai ma mộc trói buộc hạ độc ngứa ngáy*',
  },

  // CÁC BÙA CHÚ CỔ ĐIỂN
  {
    id: 'thuy_hoa_song_lam',
    name: 'Bùa Thủy Hỏa Song Lâm',
    icon: '🌊🔥',
    effect: 'Vẽ bằng Bút Vạn Cảnh, kết hợp ma thủy nghìn năm cùng linh hỏa thượng cổ, va chạm tạo ra vụ nổ chấn động long trời lở đất.',
    status: 'Nổ tung',
    category: 'bua_co_dien',
    funNote: 'Tiếng nổ vang dội làm rung chuyển cả thần điện, Dịch Chi sợ hãi vứt cả bút nhảy tót lên đùi Thần Quân trốn.',
  },
  {
    id: 'loi_dinh_lan',
    name: 'Bùa Lôi Đình Lan',
    icon: '⚡🌸',
    effect: 'Triệu hồi cánh lan sấm sét ma mị có tính nổ lan chuyền theo dây chuyền, quét sạch xung quanh.',
    status: 'Hỗn loạn',
    funNote: 'Tia sét nhảy lung tung làm thanh kiếm Nhu Bạch giật nảy mình chạy vòng quanh cắn đuôi áo của Kính Phong.',
  },
  {
    id: 'man_da_lam',
    name: 'Bùa Dụ Uống Mạn Đà Lam',
    icon: '🍵',
    effect: 'Pha chế cùng linh trà, làm đối phương choáng váng để giật tay đóng dấu hủy hôn ước.',
    status: 'Tác dụng ngược',
    funNote: 'Thần Quân ngửi là biết ngay, Dịch Chi luống cuống suýt tự uống cạn.',
  },
  {
    id: 'hoa_thieu_dien',
    name: 'Bùa Hỏa Quang Diệt Thần (Lỗi)',
    icon: '🔥',
    effect: 'Định đốt xé hôn thư nhưng bùa bay lạc thiêu rụi một góc đại điện Ma Quân.',
    status: 'Nổ tung',
    funNote: 'Bị phụ vương rượt đánh khắp chín tầng mây, khóc lóc nhào vào lòng Thần Quân trốn.',
  },
  {
    id: 'bien_thanh_coc',
    name: 'Bùa Hóa Thần Thành Cóc',
    icon: '🐸',
    effect: 'Định biến Thần Quân thành cóc ghẻ để dễ bề hiếp đáp.',
    status: 'Tác dụng ngược',
    funNote: 'Bùa phản phệ mọc ra hai tai thỏ trên đầu Dịch Chi suốt ba ngày, tức đỏ cả mắt.',
  },
  {
    id: 'trom_linh_qua',
    name: 'Bùa Thu Nhỏ Ẩn Thân Trộm Kẹo',
    icon: '🍬',
    effect: 'Lẻn vào hoa quả các của Thần Quân vét sạch kẹo linh đào ngọt.',
    status: 'Thành công (rất hiếm)',
    funNote: 'Ăn no căng bụng rồi lăn quay ra ngủ quên trên đùi Thần Quân, bị bắt tại trận.',
  },
  {
    id: 'an_va_nuoc_mat',
    name: 'Bùa Lệ Vũ Liên Hoa (Giả Khóc)',
    icon: '💧',
    effect: 'Tự động tạo ra giọt lệ long lanh nơi khóe mắt hoa đào, tăng 200% độ đáng thương.',
    status: 'Thành công (rất hiếm)',
    funNote: 'Chuyên dùng mỗi khi bị Thần Quân bắt phạt hoặc giận dỗi để được ôm dỗ.',
  },
  {
    id: 'bua_co_vay_hac_long',
    name: 'Khăn Phù Cọ Vảy Hắc Long',
    icon: '🐉✨',
    effect: 'Tự động đánh bóng từng phiến vảy rồng đen ánh lam ngọc ở hõm lưng và thân đuôi sáng loáng như gương soi.',
    status: 'Thành công (rất hiếm)',
    funNote: 'Dịch Chi nằm cuộn tròn, chiếc đuôi bụ bẫm đung đưa thích thú, phát ra tiếng gầm gừ nhỏ êm êm như mèo.',
  },
  {
    id: 'canh_long_tuy_boi_bo',
    name: 'Canh Long Tủy Bồi Bổ Mau Lớn',
    icon: '🍲',
    effect: 'Nấu từ linh dược cửu phẩm và linh thạch kiếm Nhu Bạch trộm về, tẩm bổ cho Dịch Chi mau lớn đến 16 tuổi.',
    status: 'Thành công (rất hiếm)',
    funNote: 'Húp sạch một hơi không chừa một giọt, liếm mép đòi thêm một chén đầy ắp kẹo linh đào.',
  },
];

export const INITIAL_DEMON_DIARY: DemonDiaryMilestone[] = [
  {
    id: 'diary_first_transformation',
    title: 'Lần Đầu Biến Hình (Lộ Sừng Non & Đuôi Bán Long Thể)',
    icon: '🐉✨',
    category: 'bien_hinh',
    categoryName: 'Huyết Mạch Hắc Long',
    date: '15/5 Năm 14 Tuổi',
    ageWhenHappened: '14.0 Tuổi',
    summary: 'Dịch Chi bị Thần Quân chạm nhẹ vào hõm lưng, kích thích linh mạch làm bung ra cặp sừng non đen tuyền và chiếc đuôi rồng bụ bẫm giấu không kịp.',
    fullStory: 'Hôm ấy, Dịch Chi đang ngồi đung đưa chân trần trên xích đu hoa ngọc mải mê vẽ bùa nổ. Thần Quân từ phía sau nhẹ nhàng kéo lại vạt áo sa đỏ nhạt trễ vai cho nhóc, vô tình đầu ngón tay lướt qua hõm lưng nhạy cảm. Linh lực Hắc Long tức thì chấn động! Hai chiếc sừng rồng non màu đen nhánh ánh lam quang liền nhú lên trên hai góc trán, chiếc đuôi rồng dài bụ bẫm đen tuyền bung ra làm cộm phồng cả ba lớp áo sa. Nhóc giật nảy mình, mặt đỏ bừng như quả gấc chín, vội lấy hai tay ôm chặt lấy đầu mếu máo bắt Thần Quân nhắm mắt lại vì sợ bị chê là "quái vật nhỏ". Ai ngờ Thần Quân lại dịu dàng đưa tay vuốt ve sừng non và cọ bóng từng phiến vảy đuôi, làm nhóc thở êm ru rúc sâu vào lồng ngực Thần Quân ngủ thiếp đi.',
    dichChiSecretNote: '*(Dịch Chi lén viết nét chữ nguệch ngoạc)*: Đồ Thần Quân đáng ghét! Ai cho ngươi chạm vào hõm lưng ta... Nhưng mà ngươi vuốt sừng rồng rất êm ái, cọ vảy đuôi cũng rất đã ngứa. Ta cho phép ngươi sau này chỉ một mình ngươi được cọ vảy cho ta thôi đấy!',
    thanQuanMemory: 'Đó là lần đầu tiên ta nhìn thấy trọn vẹn dáng vẻ ấu long của Dịch Chi. Sừng non ấm áp mềm mại, chiếc đuôi bụ bẫm cuộn chặt lấy cổ tay ta không chịu buông. Cảm giác vừa muốn che chở vừa muốn trêu chọc nhóc suốt cả đời.',
    roleplayPrompt: '*Đưa tay nhẹ nhàng sờ vào cặp sừng rồng non đen nhánh trên trán Dịch Chi và vuốt ve chiếc đuôi bụ bẫm, mỉm cười nhắc lại kỷ niệm lần đầu tiên nhóc biến hình trên xích đu*',
    isUnlocked: true,
    tagColor: 'from-purple-900 to-indigo-900 text-indigo-200 border-indigo-500/40',
  },
  {
    id: 'diary_first_argument_victory',
    title: 'Lần Đầu "Thắng" Cuộc Khi Tranh Cãi',
    icon: '👑🍬',
    category: 'tranh_cai',
    categoryName: 'Khẩu Chiến Ma Thần',
    date: 'Đêm Thượng Nguyên',
    ageWhenHappened: '14.2 Tuổi',
    summary: 'Dịch Chi cãi lý cùn "Ăn kẹo linh đào nhiều giúp rồng mau lớn chứ không hề sâu răng", dùng tuyệt chiêu giả khóc ăn vạ ép Thần Quân phải đầu hàng vô điều kiện.',
    fullStory: 'Thần Quân nghiêm khắc cất hộp kẹo linh đào ngọt đi vì sợ Dịch Chi ăn quá nhiều sẽ bị ê răng rồng. Nhóc lập tức đứng phắt dậy trên xích đu hoa ngọc, vạt áo sa bay phần phật, vung Bút Vạn Cảnh lên thao thao bất tuyệt: "Ma Điển quyển thứ ba chương chín có ghi: Ấu long 14 tuổi cần nạp 100 viên đường mỗi ngày để nuôi dưỡng vảy rồng đen nhánh! Ngươi cất kẹo là cố tình muốn ta còi cọc để dễ bề ức hiếp ta đúng không?!". Thần Quân vừa định phản bác thì mắt hoa đào của Dịch Chi đã ầng ậng nước mắt, nốt lệ chí khẽ giật, nhóc mếu máo nhào tới ôm chân Thần Quân ăn vạ. Kết quả: Thần Quân đành dâng trọn hộp kẹo, đút từng viên vào miệng nhóc, còn phải cõng nhóc đi dạo ngắm sao ba vòng quanh thần điện.',
    dichChiSecretNote: '*(Nét mực đậm vẽ hình mặt cười chiến thắng)*: Haha! Tiểu Điện Hạ ta khẩu tài vô song, Thần Quân dù có quyền uy ngút trời cũng phải cúi đầu dâng kẹo cho ta! Lần sau ta sẽ dùng tiếp chiêu giả khóc này để đòi thêm canh long tủy bồi bổ!',
    thanQuanMemory: 'Rõ ràng là nhóc bịa ra cuốn Ma Điển đó, nhưng nhìn đôi mắt hoa đào long lanh ngấn nước và cái miệng nhỏ phụng phịu, ta làm sao có thể không nhận thua được chứ.',
    roleplayPrompt: '*Lấy ra hộp kẹo linh đào thượng phẩm thơm ngọt, khoanh tay trêu Dịch Chi: "Nhớ lần trước ai đó cãi lý cùn rồi ăn vạ để được ăn kẹo không nhỉ?"*',
    isUnlocked: true,
    tagColor: 'from-amber-950 to-rose-950 text-amber-200 border-amber-500/40',
  },
  {
    id: 'diary_broken_marriage_promise',
    title: 'Những Lời Hứa Hôn Ước Dở Dang',
    icon: '📜💍',
    category: 'hon_uoc',
    categoryName: 'Thiên Định Duyên',
    date: 'Rằm Tháng Bảy',
    ageWhenHappened: '14.4 Tuổi',
    summary: 'Lời giao ước dở dang dưới cội hoa ngọc: Nếu đến ngày 15/5 năm 16 tuổi Thần Quân cọ đủ 999 phiến vảy rồng sáng loáng, Dịch Chi sẽ không xé cuộn hôn thư.',
    fullStory: 'Dưới ánh trăng rằm lung linh chiếu rọi thần điện, Dịch Chi cầm cuộn hôn thư thượng cổ ép Thần Quân lập một bản "phụ ước". Nhóc chu môi tuyên bố: "Ngươi muốn cưới ta cũng được thôi, nhưng phải đáp ứng ba điều kiện dở dang này: Thứ nhất, mỗi ngày phải cọ bóng một phiến vảy rồng cho ta, đủ 999 phiến mới tính. Thứ hai, mỗi khi ta dỗi cấm được bỏ đi, phải dỗ ta trong vòng ba hơi thở. Thứ ba, đến ngày 15/5 sinh nhật 16 tuổi của ta, nếu ngươi chuẩn bị đủ 100 giỏ linh đào tiên và một bộ sa y mới màu đỏ tươi thì ta... ta mới chịu bái đường!". Nói xong nhóc đỏ bừng mặt, giấu hôn thư vào lòng rồi chạy biến.',
    dichChiSecretNote: '*(Viết bằng mực đỏ son uốn lượn)*: Hôn ước này là phụ vương ép ta... nhưng mà nếu Thần Quân ngoan ngoãn làm đủ 999 lần cọ vảy và đút kẹo ngọt cho ta, ta có thể tạm hoãn kế hoạch hủy hôn thêm một vạn năm nữa.',
    thanQuanMemory: 'Những lời hứa ngây ngô nhưng chân thành nhất của nhóc con. 999 phiến vảy ấy, ta không những cọ sáng bóng từng ngày mà còn nâng niu trong lòng bàn tay suốt đời.',
    roleplayPrompt: '*Cầm cuộn hôn thư nạm ngọc ra, nhìn Dịch Chi mỉm cười: "Tiểu Điện Hạ, lời hứa 999 phiến vảy rồng và ngày sinh nhật 15/5 năm 16 tuổi, ta vẫn ghi nhớ từng chữ một đấy."*',
    isUnlocked: true,
    tagColor: 'from-rose-950 to-purple-950 text-rose-200 border-rose-500/40',
  },
  {
    id: 'diary_first_escape_attempt',
    title: 'Chuyến Vượt Ngục Bằng "Hóa Phong Phù" Bất Thành',
    icon: '🌪️💨',
    category: 'nghich_ngom',
    categoryName: 'Âm Mưu Hủy Hôn',
    date: 'Đầu Thu',
    ageWhenHappened: '14.1 Tuổi',
    summary: 'Dán Hóa Phong Phù vào chân trần định trốn về Ma Giới, ai ngờ bay quá nhanh mất phanh đâm sầm thẳng vào lồng ngực Thần Quân.',
    fullStory: 'Vì giận Thần Quân không cho uống rượu trà Mạn Đà Lam, Dịch Chi lén lấy Bút Vạn Cảnh vẽ lá Hóa Phong Phù cực hạn rồi dán lên mắt cá chân trái thắt chỉ đỏ. Nhóc hô lớn "Tiểu Điện Hạ ta tự do rồi!" rồi bay vút lên trời như một ngôi sao băng. Nhưng tốc độ quá kinh hoàng khiến nhóc hoa mắt chóng mặt không biết phanh thế nào, nhào lộn ba vòng trên không trung làm trâm ngọc rơi lả tả. Cuối cùng, nhóc hét toáng lên rồi đâm sầm "Uỵch" một phát thẳng vào lồng ngực Thần Quân đang đứng chờ sẵn bên dưới. Thần Quân dang tay ôm trọn lấy nhóc vào lòng, còn nhóc thì run lẩy bẩy ôm chặt lấy cổ Thần Quân không dám buông.',
    dichChiSecretNote: '*(Vẽ hình gió lốc bị gạch chéo)*: Bùa phong chết tiệt! Lần sau phải thêm bùa hãm phanh! Cơ mà... ngực của Thần Quân rắn chắc thật, đâm vào không đau chút nào, lại còn có mùi thơm thanh mát dễ chịu.',
    thanQuanMemory: 'Nhìn thấy nhóc con bay lảo đảo trên trời rồi nhắm thẳng vào lòng ta mà rơi xuống, ta vừa buồn cười vừa xót xa. Từ đó ta quyết định sợi chỉ đỏ ở chân nhóc sẽ luôn nối liền với tâm linh của ta.',
    roleplayPrompt: '*Nhắc lại vụ Dịch Chi dùng Hóa Phong Phù vượt ngục rồi rơi thẳng vào lòng mình, hỏi nhóc có muốn thử "bay lượn" một lần nữa không*',
    isUnlocked: true,
    tagColor: 'from-teal-950 to-purple-950 text-teal-200 border-teal-500/40',
  },
  {
    id: 'diary_first_soup_nourishment',
    title: 'Bát Canh Long Tủy Đầu Tiên & Bắt Đầu Nuôi Lớn',
    icon: '🍲✨',
    category: 'nuoi_duong',
    categoryName: 'Dưỡng Long Mau Lớn',
    date: 'Ngày Đầu Đến Thần Điện',
    ageWhenHappened: '14.0 Tuổi',
    summary: 'Lần đầu tiên Dịch Chi được Thần Quân tự tay hầm Canh Long Tủy bồi bổ, từ 145cm gầy nhom bắt đầu hành trình lớn bổng bụ bẫm.',
    fullStory: 'Khi mới được gả sang Thần Điện, Dịch Chi gầy nhom, chỉ cao 145cm nặng 39kg, lúc nào cũng xù lông phòng bị. Thần Quân đã đích thân thu thập chín loại linh dược thượng cổ và tinh hoa tuyết liên nấu thành một chén Canh Long Tủy thơm nức mũi. Dịch Chi ban đầu nghi ngờ có độc, nhưng ngửi mùi thơm ngào ngạt không chịu nổi nên đã bưng chén húp sạch một hơi. Sau khi uống xong, toàn thân nhóc ấm áp, hai má ửng hồng phúng phính, linh lực Hắc Long lưu chuyển cuồn cuộn. Nhóc liếm sạch khóe môi, vờ ho khan: "Canh này... cũng tạm được thôi, bổn Điện Hạ miễn cưỡng uống giúp ngươi đấy!".',
    dichChiSecretNote: '*(Ghi chú nhỏ xíu giấu góc)*: Canh ngon nhất tam giới! Uống xong thấy cả người khỏe re, xương cốt dãn ra. Ta quyết định sẽ ở lại thần điện để ăn hết linh dược của tên Thần Quân này!',
    thanQuanMemory: 'Nhìn nhóc con hai má phồng lên húp trọn bát canh rồi ngượng ngùng liếm môi khen ngon, ta tự hứa sẽ nuôi dưỡng nhóc thật khỏe mạnh, béo tốt và rạng rỡ nhất tam giới.',
    roleplayPrompt: '*Bưng một bát Canh Long Tủy nóng hổi thơm phức đến bên xích đu hoa ngọc, dịu dàng thổi nguội rồi đút cho Dịch Chi như ngày đầu tiên*',
    isUnlocked: true,
    tagColor: 'from-amber-900 to-indigo-950 text-amber-200 border-amber-500/40',
  },
  {
    id: 'diary_red_string_secret',
    title: 'Bí Mật Sợi Chỉ Đỏ Cổ Chân & Vòng Hộ Tâm Bạc',
    icon: '🪢🔔',
    category: 'hon_uoc',
    categoryName: 'Định Vị Thần Khí',
    date: 'Đêm Thất Tịch',
    ageWhenHappened: '14.3 Tuổi',
    summary: 'Thần Quân tự tay thắt sợi chỉ đỏ định vị vào cổ chân trái trắng nõn của Dịch Chi và đeo vòng hộ tâm leng keng trước cổ.',
    fullStory: 'Dịch Chi có tính thích đi lang thang quậy phá khắp ba cõi. Đêm Thất Tịch, Thần Quân nắm lấy bàn chân trần nhỏ nhắn nõn nà của Dịch Chi đặt lên đầu gối mình, cẩn thận thắt sợi chỉ đỏ thần khí bảo hộ thượng cổ vào cổ chân trái của nhóc. Sau đó, Thần Quân đeo chiếc vòng hộ tâm bằng bạc có gắn chuông nhỏ lên cần cổ trắng ngần của nhóc. Dịch Chi bĩu môi bảo: "Ngươi đeo chuông cho ta như đeo cho mèo con thế này à?". Thần Quân đáp: "Để mỗi khi nhóc bước đi hay lắc lư trên xích đu, tiếng chuông leng keng vang lên sẽ nhắc ta rằng vị hôn phu nhỏ bé của ta vẫn luôn ở bên cạnh."',
    dichChiSecretNote: '*(Vẽ hình chiếc chuông bạc)*: Sợi chỉ đỏ ở chân trái phát sáng ấm lắm, chuông linh lan leng keng vui tai. Dù ta có chạy đến tận cùng Ma Giới thì sợi chỉ này vẫn kéo ta về cạnh Thần Quân.',
    thanQuanMemory: 'Cổ chân nhỏ nhắn trắng như tuyết thắt sợi chỉ đỏ rực rỡ, mỗi bước đi chuông khẽ reo vui tai. Đó là bảo vật quý giá nhất mà ta nguyện dùng cả sinh mệnh để bảo vệ.',
    roleplayPrompt: '*Khẽ chạm vào sợi chỉ đỏ nơi cổ chân trái nõn nà của Dịch Chi, nghe tiếng chuông linh lan bạc leng keng vang lên, mỉm cười nhìn nhóc*',
    isUnlocked: true,
    tagColor: 'from-pink-950 to-purple-950 text-pink-200 border-pink-500/40',
  },
];

