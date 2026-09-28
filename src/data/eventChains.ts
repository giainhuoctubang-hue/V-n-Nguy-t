export interface EventChoice {
  id: string;
  label: string;
  detail: string;
  stabilityDelta: number; // e.g. +15 or -10
  outcomeDescription: string;
  resultingMood: string;
  resultingPerception: string;
  cannedReaction: string;
}

export interface BreakEngagementEvent {
  id: string;
  title: string;
  subTitle: string;
  icon: string;
  situation: string;
  dichChiQuote: string;
  dichChiAction: string;
  initialMood: string;
  choices: EventChoice[];
}

export const BREAK_ENGAGEMENT_EVENTS: BreakEngagementEvent[] = [
  {
    id: 'man_da_lam_tea',
    title: 'Vụ Án Dụ Uống Trà Mạn Đà Lam',
    subTitle: 'Kế hoạch đánh thuốc mê lừa đóng dấu hủy hôn',
    icon: '🍵',
    situation:
      'Dịch Chi bước vào tẩm điện với vẻ mặt tươi cười ngoan ngoãn khác thường, hai tay bưng khay trà ngọc bích bốc khói hương hoa dìu dịu. Giữa khay là một chung trà tím biếc lấp lánh linh quang — chính là Mạn Đà Lam ngàn năm trân quý của Ma Giới, có công hiệu gây choáng váng thần trí tạm thời. Ẩn dưới ống tay áo cẩm y tím của nhóc là Cuộn Giấy Hủy Hôn Ước đã trải sẵn vết son đỏ!',
    dichChiAction:
      '*Dịch Chi chớp chớp đôi mắt hoa đào to tròn xanh biếc đượm ánh sao, nụ cười ngọt như mật đường, nũng nịu dâng trà tới tận môi bạn*',
    dichChiQuote:
      'Thần Quân vất vả rồi nha~ Đây là Mạn Đà Lam quý giá ta lén trộm từ mật khố của phụ vương để kính dâng ngài tẩm bổ đấy! Ngài uống cạn một hơi đi, sau đó... sau đó tiện tay đóng giúp ta một dấu triện nhỏ lên tờ giấy này nhé?',
    initialMood: 'Giả vờ bé ngoan mưu mô',
    choices: [
      {
        id: 'swap_cup',
        label: 'Hoán đổi chén trà rồi mỉm cười mời Dịch Chi uống trước',
        detail:
          'Dùng thần lực chớp nhoáng tráo đổi chén trà với ly nước mật ong của mình, thong thả đẩy lại trước mặt Dịch Chi.',
        stabilityDelta: 15,
        outcomeDescription:
          'Dịch Chi trợn tròn mắt, cổ họng nghẹn ứ, luống cuống tìm cách gạt đổ chén trà rồi giậm chân giãy nảy vì bị bắt bài!',
        resultingMood: 'Xù lông giãy nảy',
        resultingPerception: 'Tức tối nhưng thầm phục Thần Quân mưu mô hơn cả mình.',
        cannedReaction:
          '*Dịch Chi giật thót lùi lại ba bước, hai má đỏ bừng vì xấu hổ, bĩu môi hờn dỗi giậm chân rầm rầm:* "Ngươi... ngươi gian xảo! Ai thèm uống chứ! Đồ Thần Quân mắt quạ, sao cái gì ngươi cũng nhìn thấu vậy hả?! Trả giấy hủy hôn lại cho ta mau!"',
      },
      {
        id: 'fake_faint',
        label: 'Uống cạn một hơi rồi nhắm mắt giả vờ ngất xỉu',
        detail:
          'Bình thản uống cạn chén trà (thần thể vốn miễn nhiễm độc dược), sau đó giả bộ choáng váng gục đầu xuống bàn.',
        stabilityDelta: 20,
        outcomeDescription:
          'Dịch Chi mừng rỡ rút con dấu định ịn, nhưng khi thấy bạn bất động thì hoảng hốt quăng cả dấu, vội vàng ôm lấy bạn khóc lóc cầu xin tỉnh lại!',
        resultingMood: 'Hoảng sợ bám dính',
        resultingPerception: 'Nhận ra bản thân không thể chịu đựng được cảnh Thần Quân xảy ra chuyện.',
        cannedReaction:
          '*Dịch Chi vội vàng quăng phăng cuộn hôn thư, hai mắt hoa đào ứa lệ nhào tới ôm chặt lấy cánh tay bạn lắc điên cuồng:* "Này! Thần Quân! Ngươi đừng có chết mà hu hu! Ta chỉ đùa chút thôi... Thần tộc các ngươi sao mà yếu ớt thế hả?! Mở mắt ra nhìn ta đi, ta không hủy hôn nữa là được chứ gì hu hu..."',
      },
      {
        id: 'sour_drop',
        label: 'Thả một quả Linh Sơn Tra siêu chua vào chén trà',
        detail:
          'Lấy từ trong tay áo một quả sơn tra rừng chua gắt, thả tõm vào chén trà Mạn Đà Lam thơm ngát.',
        stabilityDelta: 10,
        outcomeDescription:
          'Mùi chua gắt xộc thẳng vào mũi! Dịch Chi - người ghét đồ chua nhất lục giới - lập tức bịt mũi nhảy dựng lên, mặt nhăn như quả táo tàu.',
        resultingMood: 'Đanh đá uất ức',
        resultingPerception: 'Căm ghét đồ chua, đanh đá tuyên bố Thần Quân là kẻ tàn nhẫn nhất thiên hạ.',
        cannedReaction:
          '*Dịch Chi bịt chặt chiếc mũi nhỏ, lui tít ra tận cửa điện, xù lông trừng mắt xanh biếc nhìn bạn:* "Á á á chua quá! Ngươi là đồ tà ác! Ngươi dám bỏ thứ dơ bẩn chua lét đó vào trà quý của ta! Ta thề sẽ không bao giờ nấu trà cho ngươi nữa, đồ Thần Quân xấu xa!"',
      },
      {
        id: 'strict_scold',
        label: 'Tịch thu chén trà và con dấu, nghiêm giọng răn đe',
        detail:
          'Hất nhẹ tay khiến chén trà hóa thành bụi linh quang, lạnh lùng thu hồi con dấu hủy hôn ước.',
        stabilityDelta: -10,
        outcomeDescription:
          'Dịch Chi lập tức chuyển sang chế độ diễn kịch nạn nhân bị ức hiếp: cuộn tròn góc giường sụt sịt, tố cáo Thần Quân ỷ lớn hiếp nhỏ.',
        resultingMood: 'Diễn vai nạn nhân sụt sịt',
        resultingPerception: 'Ấm ức, muốn được dỗ dành nhưng ngoài miệng cứng cỏi trách móc.',
        cannedReaction:
          '*Dịch Chi lập tức ngồi sụp xuống đất, ôm hai đầu gối giấu mặt, giọng nói nghẹn ngào ấm ức phát ra sau làn tóc nâu:* "Ngươi hung dữ với ta... Ta chỉ muốn được tự do thôi mà... Ngươi cậy thần lực cao cường rồi ức hiếp tiểu hài tử... Ta ghét ngươi, hu hu ta ghét ngươi nhất!"',
      },
    ],
  },
  {
    id: 'burn_great_hall',
    title: 'Hỏa Thiêu Đại Điện Ma Giới',
    subTitle: 'Nghịch dại vẽ bùa nổ suýt thiêu rụi Ma Cung',
    icon: '🔥',
    situation:
      'Ầm! Một tiếng nổ rung chuyển cõi Ma Giới, lửa ma quang màu tím đỏ bốc cháy ngùn ngụt thiêu rụi một góc mái vòm lưu ly của Đại Điện Ma Quân! Bên ngoài vang lên tiếng gầm thịnh nộ của Ma Quân Dịch Quàn. Cửa phòng bạn bị đạp tung, Dịch Chi cả người lấm lem tro bụi, vạt áo cháy xém, ôm chặt thanh mộc kiếm và xấp bùa nổ lủi thẳng vào lòng bạn trốn!',
    dichChiAction:
      '*Dịch Chi hai má dính vệt tro đen, tóc nâu xốc xếch thoang thoảng mùi khét lẫn hương chanh, ôm chặt eo bạn không buông, ngước đôi mắt ngập nước cầu cứu*',
    dichChiQuote:
      'Thần Quân cứu ta với hu hu! Phụ vương phát điên rồi, đòi lột da ta đem treo lên cấm lâm! Ta... ta thề là ta chỉ định vẽ "Bùa Hủy Hôn Chấn Thiên" để đốt tờ hôn thư thôi, ai ngờ gió thổi tạt lửa sang rèm đại điện... Ngươi mau giấu ta đi!',
    initialMood: 'Hoảng loạn ăn vạ',
    choices: [
      {
        id: 'shield_dich_chi',
        label: 'Giấu Dịch Chi sau lưng, đứng ra lãnh trách nhiệm với Ma Quân',
        detail:
          'Kéo tà áo thần bào che chắn cho nhóc tì, ngẩng đầu đối diện Ma Quân Dịch Quàn đang đằng đằng sát khí.',
        stabilityDelta: 25,
        outcomeDescription:
          'Ma Quân thấy Thần Quân che chở liền thở phào ném luôn con dại cho bạn. Dịch Chi trốn sau lưng bạn thè lưỡi trêu phụ vương, tim đập thình thịch vì cảm kích.',
        resultingMood: 'Nũng nịu bám dính',
        resultingPerception: 'Coi Thần Quân là bến đỗ an toàn nhất, dính chặt không rời.',
        cannedReaction:
          '*Dịch Chi thò cái đầu nhỏ sau vạt áo thần quang của bạn, nắm chặt lấy tay áo bạn giật giật, hai má đỏ ửng lí nhí:* "Thần Quân... ngươi tốt với ta thật đấy... Nhưng mà phụ vương nói đúng một câu, từ nay ngươi phải nuôi ta, cấm được trả ta về cấm lâm đấy nhé!"',
      },
      {
        id: 'handover_dad',
        label: 'Xách cổ áo nhóc nộp ngay cho Ma Quân Dịch Quàn',
        detail:
          'Túm lấy cổ áo sau của Dịch Chi nhấc bổng lên như mèo con, thản nhiên đưa cho Ma Quân xử lý.',
        stabilityDelta: -15,
        outcomeDescription:
          'Dịch Chi hai chân chới với giữa không trung, trợn mắt uất ức thề sẽ vẽ một ngàn lá bùa nguyền rủa bạn.',
        resultingMood: 'Oán hận giãy giụa',
        resultingPerception: 'Tức giận vì bị phản bội, quyết tâm báo thù bằng những trò phá phách mới.',
        cannedReaction:
          '*Dịch Chi bị xách lơ lửng, hai tay hai chân quơ quào loạn xạ, gào tướng lên:* "Đồ hôn phu bạc bẽo vô tình! Ngươi nộp ta cho lão già đó à?! Ta nguyền rủa ngươi cả đời này không cưới được ai ngoài ta! Thả ta xuống hu hu đại ca cứu đệ với!"',
      },
      {
        id: 'clean_and_sweet',
        label: 'Lau má hồng dính tro rồi nhét kẹo hồ lô linh quả vào miệng',
        detail:
          'Rút khăn lụa lau sạch vệt tro trên gương mặt xinh xắn, rồi đút một viên kẹo ngọt lịm vào chiếc mồm đang liến thoắng.',
        stabilityDelta: 20,
        outcomeDescription:
          'Chiếc mồm đanh đá lập tức bị vị ngọt ngào khuất phục! Dịch Chi chớp chớp mắt nuốt ực một cái, mặt đỏ bừng ngượng ngùng.',
        resultingMood: 'Ngượng ngùng ngoan ngoãn',
        resultingPerception: 'Bị đồ ngọt mua chuộc, ngoan ngoãn như chú mèo con được cho ăn cá.',
        cannedReaction:
          '*Dịch Chi đang định thao thao bất tuyệt thì bị viên kẹo ngọt ngào nhét vào miệng, má phồng lên như sóc nhỏ, vị ngọt thanh tan chảy nơi đầu lưỡi:* "Ưm... ai thèm ăn... Ngon quá... Nhưng mà ngươi đừng hòng mua chuộc Tiểu Điện Hạ này bằng một viên kẹo! Ít nhất... ít nhất phải mười viên!"',
      },
      {
        id: 'copy_rules',
        label: 'Phạt Dịch Chi ngồi ngay ngắn chép phạt Hôn Thư Quy Tắc 100 lần',
        detail:
          'Đặt bàn bút mực ra trước mặt, bắt nhóc quỳ gối chép phạt để sửa tính nghịch dại.',
        stabilityDelta: 5,
        outcomeDescription:
          'Dịch Chi nằm bò ra bàn ăn vạ, vừa chép vừa vẽ râu mèo lên tên của bạn trong bản quy tắc.',
        resultingMood: 'Hờn dỗi lười biếng',
        resultingPerception: 'Cảm thấy Thần Quân quá nghiêm khắc nhưng vẫn ngoan ngoãn ngồi chép vì sợ bị nhốt.',
        cannedReaction:
          '*Dịch Chi cầm cây bút lông gõ côm cốp xuống bàn, môi trề ra cả tấc:* "Chép phạt cái gì chứ! Chữ ngươi xấu như gà bới mà bắt ta chép! Hừ, ta sẽ vẽ thêm mười con rùa lên mặt ngươi trên tờ giấy này cho bõ ghét!"',
      },
    ],
  },
  {
    id: 'forest_escapade',
    title: 'Cấm Lâm Đào Tẩu & Cướp Hôn Thư',
    subTitle: 'Trộm khế ước chạy vào rừng cấm uy hiếp Thần Quân',
    icon: '🌲',
    situation:
      'Lợi dụng lúc bạn đang nhắm mắt tĩnh tọa điều hòa linh khí, Dịch Chi đã nhanh tay nẫng mất Cuộn Hôn Thư Thượng Cổ rồi phi thân trốn vào Cấm Lâm Ma Giới — nơi đầy rẫy chướng khí và ma thú cổ đại. Khi bạn đuổi tới ngọn Cổ Ma Thụ cao ngàn trượng, nhóc tì đang ngồi vắt vẻo trên cành cao, tay giơ cao cuộn hôn thư vàng óng uy hiếp!',
    dichChiAction:
      '*Dịch Chi đung đưa đôi chân thon thả, mái tóc nâu dài bay trong gió rừng lộng lẫy, nụ cười tinh quái đầy đắc thắng*',
    dichChiQuote:
      'Đứng lại đó! Ngươi dám bước thêm một bước nữa, ta sẽ ném ngay cuộn hôn thư này xuống đầm lầy Hóa Tiên Cốt bên dưới! Mau giao nộp mười giỏ Quả Bách Linh và một thanh kiếm phát sáng ra đây chuộc, nếu không hôn ước này chấm dứt tại đây!',
    initialMood: 'Đắc thắng trêu ngươi',
    choices: [
      {
        id: 'illusion_catch',
        label: 'Tạo tiếng rồng gầm sau lưng làm nhóc giật mình rồi bay lên đỡ lấy',
        detail:
          'Hóa ảo ảnh rồng thần gầm vang sau lưng nhóc, khi nhóc trượt chân rơi xuống thì nhẹ nhàng lướt tới ôm trọn vào lòng.',
        stabilityDelta: 20,
        outcomeDescription:
          'Dịch Chi hét toáng lên, sợ hãi ôm chặt cổ bạn, cả người run rẩy ngửi thấy hương chanh non cùng mùi linh hương quen thuộc.',
        resultingMood: 'Bám dính run rẩy',
        resultingPerception: 'Biết mình không bao giờ thoát khỏi bàn tay của Thần Quân, ỷ lại hoàn toàn.',
        cannedReaction:
          '*Dịch Chi vùi chặt mặt vào hõm cổ bạn, hai tay bấu chặt vai thần bào không chịu buông, tim đập thình thịch qua lồng ngực nhỏ:* "Đồ xấu xa... Ngươi dọa chết ta rồi... Ngươi dám thả rồng dọa tiểu hài tử! Ngươi phải bế ta về, ta không thèm tự đi đâu!"',
      },
      {
        id: 'spiritual_peach_bait',
        label: 'Lấy đĩa Bánh Linh Đào thơm nức ra thong thả ngồi ăn dưới gốc cây',
        detail:
          'Bày đĩa bánh ngọt ngào hương sen tuyết và mật ong thiên giới, nhấp một ngụm trà không thèm ngẩng lên nhìn.',
        stabilityDelta: 15,
        outcomeDescription:
          'Mùi bánh ngọt ngào xông lên ngọn cây khiến bụng Dịch Chi reo ùng ục. Nhóc tì chịu không nổi tự giác tụt xuống cướp bánh.',
        resultingMood: 'Bị đồ ngọt khuất phục',
        resultingPerception: 'Tự trách cái bụng không có tiền đồ, nhưng bánh ngọt Thần Quân mang tới quá ngon.',
        cannedReaction:
          '*Dịch Chi ôm cuộn hôn thư tụt phắt từ trên cây xuống đất, giật lấy đĩa bánh nhét đầy hai má, lúng búng nói không rõ chữ:* "Cái... cái này là do bánh bay vào tay ta trước nhé! Ta ăn xong rồi mới bàn chuyện hủy hôn tiếp!"',
      },
      {
        id: 'threaten_giang_xuyen',
        label: 'Rút ngọc phù truyền âm: "Giang Suyễn à, Tiểu Điện Hạ ở đây này..."',
        detail:
          'Giả vờ kích hoạt ngọc phù gọi kẻ thù số một của Dịch Chi là Giang Suyễn tới đào rỗng túi trữ vật.',
        stabilityDelta: 25,
        outcomeDescription:
          'Vừa nghe thấy tên Giang Suyễn, Dịch Chi xanh cả mặt, vứt phăng cuộn hôn thư nhào xuống ôm chặt chân bạn khóc thét.',
        resultingMood: 'Sợ hãi tột cùng',
        resultingPerception: 'Chỉ có Thần Quân mới bảo vệ được tài sản và tính mạng của mình khỏi tên cáo già Giang Suyễn.',
        cannedReaction:
          '*Dịch Chi trèo ào ào xuống như sóc con, hai tay ôm ghì lấy bắp chân bạn, ngước đôi mắt tròn xoe ngập nước van xin:* "Đừng gọi hắn! Đừng gọi tên cướp cạn Giang Suyễn đó! Hắn sẽ lột sạch bảo bối của ta mất! Ta ngoan mà, ta trả hôn thư cho ngươi đây hu hu!"',
      },
    ],
  },
  {
    id: 'gossip_tribunal',
    title: 'Hội Đồng Hóng Hớt: Cửu & Giang Suyễn Nhúng Tay',
    subTitle: 'Tranh cãi sính lễ và lời xúi giục hòa ly từ hàng xóm',
    icon: '🐉',
    situation:
      'Cửu (Yêu thần Thủy Long) mang theo quạt lông chim và vò quỳnh tương ngọc dịch sang Thần Cung hóng hớt, liên tục xúi giục: "Hòa ly đi! Mau ký giấy hủy hôn cho ta mở tiệc mừng!". Ngay cạnh đó, Giang Suyễn Thần Tộc nở nụ cười gian xảo đang ngồi gảy bàn tính đòi phân chia sính lễ. Dịch Chi ngồi giữa, vừa muốn tỏ vẻ kiêu kỳ hủy hôn cho oai, vừa thấy hai tên này lăm le đụng vào hôn phu và tài sản của mình, trong lòng nổi lên tính chiếm hữu ngùn ngụt!',
    dichChiAction:
      '*Dịch Chi khoanh hai tay trước ngực, đôi mắt hoa đào sắc sảo liếc nhìn bạn rồi lại liếc hai kẻ phá đám, môi hồng mím chặt*',
    dichChiQuote:
      'Này Thần Quân! Hai tên này bảo ngươi yếu đuối không bảo vệ được ta kìa! Tên Cửu bảo ta nên hòa ly, còn tên Giang Suyễn đòi chia nửa thần cung của ngươi! Ngươi có phải là thần không mà để người ta bắt nạt trước mặt ta thế hả?!',
    initialMood: 'Chiếm hữu bùng nổ',
    choices: [
      {
        id: 'declare_possession',
        label: 'Nắm chặt tay Dịch Chi tuyên bố: "Hôn sự do trời định, ai dám xúi giục ta trấn áp dưới đáy biển 500 năm!"',
        detail:
          'Kéo Dịch Chi sát vào lòng, tỏa ra uy áp thần linh cực hạn khiến Cửu và Giang Suyễn lập tức im bặt rút lui.',
        stabilityDelta: 30,
        outcomeDescription:
          'Cửu chuồn lẹ, Giang Suyễn cất bàn tính. Dịch Chi được nắm tay thì mặt đỏ bừng như gấc chín, tim đập thình thịch đầy tự hào.',
        resultingMood: 'Đỏ mặt tự hào kiêu ngạo',
        resultingPerception: 'Cảm nhận được sự bảo bọc tuyệt đối, tính chiếm hữu được thỏa mãn tột cùng.',
        cannedReaction:
          '*Dịch Chi đứng chết trân trong cái nắm tay ấm áp của bạn, gò má trắng ngần đỏ ửng lan tận mang tai, giọng nói bỗng nhỏ như muỗi kêu:* "Hừ... coi như ngươi còn chút uy phong của Thần Quân... Ai cho ngươi nắm tay ta chặt thế chứ... Nhưng mà... không được buông ra trước mặt bọn họ đâu đấy!"',
      },
      {
        id: 'pretend_agree_divorce',
        label: 'Gật đầu với Cửu: "Cũng đúng, nếu Tiểu Điện Hạ chê ta phiền, chi bằng hủy hôn luôn đi."',
        detail:
          'Thản nhiên cầm bút lông chuẩn bị ký vào đơn hủy hôn trước sự ngỡ ngàng của tất cả mọi người.',
        stabilityDelta: 25,
        outcomeDescription:
          'Dịch Chi sững sờ, hốc mắt lập tức đỏ hoe, đập bàn đứng phắt dậy giật phăng cây bút ném đi, gào lên: "Ta không hủy nữa!".',
        resultingMood: 'Ghen tuông giãy nảy',
        resultingPerception: 'Sợ hãi tột độ khi nghĩ tới việc Thần Quân thật sự không cần mình nữa, quyết tâm bám chặt cả đời.',
        cannedReaction:
          '*Dịch Chi nhảy chồm lên bàn giật lấy cây bút lông bẻ làm đôi, hốc mắt ầng ậng nước mắt trừng bạn:* "Ngươi dám đồng ý thật sao?! Ngươi chán ghét ta rồi đúng không?! Ta nói cho ngươi biết, trừ khi ta chết, ngươi đừng hòng đuổi ta đi! Ta sẽ quậy cho Thần Cung của ngươi long trời lở đất!"',
      },
      {
        id: 'pinch_cheeks_dismiss',
        label: 'Ném vò rượu đuổi Cửu đi rồi quay sang véo má phúng phính của Dịch Chi',
        detail:
          'Xua đuổi hai kẻ nhiều chuyện, véo nhẹ hai má phúng phính thơm mùi chanh non của Dịch Chi.',
        stabilityDelta: 15,
        outcomeDescription:
          'Dịch Chi bị véo má kêu oái oái, xoa xoa má trừng mắt nhưng khóe môi cong lên thỏa mãn.',
        resultingMood: 'Đỏng đảnh đanh đá',
        resultingPerception: 'Thích được cưng chiều theo cách trêu đùa riêng của Thần Quân.',
        cannedReaction:
          '*Dịch Chi ôm lấy hai má bị véo đỏ ửng, trừng đôi mắt hoa đào lấp lánh sao trời:* "Đau chết ta rồi! Ngươi coi ta là con nít ba tuổi đấy à?! Muốn ta tha thứ thì tối nay phải đưa ta đi chợ đêm Ma Giới mua kẹo hồ lô linh quả, nghe rõ chưa hả Thần Quân xấu xa!"',
      },
    ],
  },
  {
    id: 'hac_long_ban_long_the',
    title: 'Biến Cố: Lộ Huyết Mạch Hắc Long & Bí Mật Cọ Vảy',
    subTitle: 'Hai sừng non trên trán cùng chiếc đuôi dài bụ bẫm cộm một góc áo sa',
    icon: '🐉',
    situation:
      'Sau một buổi chiều quậy phá vẽ bùa nổ mệt nhoài, Dịch Chi nằm ngủ say trên trường tháp của bạn. Do không kiểm soát được bản thân khi say giấc, huyết mạch Hắc Long bỗng trỗi dậy: hai chiếc sừng non đen nhánh mềm mại nhú lên trên hai góc trán, chiếc đuôi rồng dài bụ bẫm từ hõm lưng ngoe nguẩy làm cộm cong một góc ba vạt áo sa mỏng manh! Trên thân đuôi lộ ra những phiến vảy rồng đen tuyền ánh lam ngọc lấp lánh. Khi bạn khẽ lay nhóc dậy, Dịch Chi giật mình luống cuống lấy hai tay che đầu, chiếc đuôi quấn chặt lấy eo bạn giấu không kịp!',
    dichChiAction:
      '*Dịch Chi trợn tròn đôi mắt hoa đào xanh biếc ngập nước, khuôn mặt diễm lệ đỏ ửng như ráng chiều, hai chiếc sừng non khẽ rung lên nhạy cảm, chiếc đuôi rồng bụ bẫm quấn quýt lấy cổ chân bạn*',
    dichChiQuote:
      'Ngươi... ngươi nhìn thấy hết rồi sao?! Không được nhìn! Bình thường ta đều ẩn đi cơ mà... Hai cái sừng non này... với lại cái đuôi này... Ta mới 14 tuổi, phải tẩm bổ tới 16 tuổi mới hóa hình hoàn mỹ! Ngươi dám chê ta làm cộm vạt áo sa thì ta... ta cắn chết ngươi!',
    initialMood: 'Ngượng ngùng muốn giấu đuôi rồng',
    choices: [
      {
        id: 'brush_scales',
        label: 'Lấy khăn lụa thần giới dịu dàng cọ từng phiến vảy rồng cho sáng bóng',
        detail:
          'Biết loài Hắc Long cực mê được cọ vảy, bạn thong thả ngồi xuống dùng khăn lụa tẩm linh dịch đánh bóng từng phiến vảy rồng đen tuyền lấp lánh.',
        stabilityDelta: 35,
        outcomeDescription:
          'Dịch Chi ban đầu kháng cự yếu ớt, nhưng sau đó sướng rên hừ hừ, cả người mềm nhũn đổ ập vào ngực bạn, chiếc đuôi bụ bẫm ngoe nguẩy đầy sung sướng.',
        resultingMood: 'Mềm nhũn sung sướng vì được cọ vảy',
        resultingPerception: 'Nhận ra Thần Quân không hề xa lánh hình dạng rồng con của mình, trái lại còn chiều chuộng hết mực.',
        cannedReaction:
          '*Dịch Chi thở dốc một hơi run rẩy, hai má đỏ bừng rúc sâu vào ngực bạn, chiếc đuôi rồng bụ bẫm quấn chặt lấy hông bạn rên rỉ nhỏ xíu:* "Ưm... thoải mái quá... Ngươi... ngươi cọ chỗ vảy ở gốc đuôi nữa đi... Chỗ đó chưa sáng bóng bằng chỗ trên lưng... Sau này... sau này chỉ cho một mình ngươi cọ vảy cho ta thôi đấy!"',
      },
      {
        id: 'stroke_horns',
        label: 'Nhẹ nhàng đưa ngón tay xoa xoa hai chiếc sừng rồng non trên góc trán',
        detail:
          'Vén lọn tóc đen nhánh sang bên, dùng đầu ngón tay ấm áp xoa nắn hai chiếc sừng non mềm mại đang nhú lên.',
        stabilityDelta: 25,
        outcomeDescription:
          'Sừng rồng non cực kỳ mẫn cảm, Dịch Chi giật thót người, hai mắt ngấn lệ hoa đào long lanh, bám chặt lấy áo bạn run rẩy.',
        resultingMood: 'Mẫn cảm run rẩy bám chặt',
        resultingPerception: 'Điểm yếu chí mạng nhất của loài rồng đã hoàn toàn nằm trọn trong tay Thần Quân.',
        cannedReaction:
          '*Dịch Chi thở hắt ra, đôi chân trần trắng nõn cuộn tròn lại, nốt lệ chí dưới mí mắt trái ửng hồng theo:* "A... đừng... sừng non của ta nhạy cảm lắm... Ngươi sờ như thế làm cả người ta mềm oặt ra rồi này... Tên Thần Quân xấu xa, ngươi bắt nạt rồng con hu hu..."',
      },
      {
        id: 'feed_dragon_soup',
        label: 'Múc một chén Canh Long Tủy nóng hổi tẩm bổ: "Ngoan, uống cho mau lớn đến 16 tuổi"',
        detail:
          'Lấy ra chén linh canh ngàn năm thơm nức ngào ngạt, thổi nguội rồi đút từng thìa cho tiểu Hắc Long bồi bổ.',
        stabilityDelta: 20,
        outcomeDescription:
          'Dịch Chi ngửi thấy mùi linh dược thơm ngọt liền sáng rực mắt, ngoan ngoãn há miệng ăn sạch, chiếc đuôi bụ bẫm đập nhịp nhàng xuống đệm.',
        resultingMood: 'Ngoan ngoãn được bồi bổ mau lớn',
        resultingPerception: 'Cảm thấy được nuôi dưỡng, nuông chiều như bảo bối quý giá nhất trần đời.',
        cannedReaction:
          '*Dịch Chi liếm sạch khóe môi còn vương giọt canh ngọt, chiếc đuôi dài bụ bẫm cộm một góc áo sa khẽ vẫy qua vẫy lại:* "Ngon lắm... Kiếm Nhu Bạch cũng vừa trộm thêm mười viên linh thạch thượng phẩm về đấy, tối nay ngươi nấu tiếp cho ta nhé? Ta muốn nhanh lớn đến 16 tuổi để... để đánh bại ngươi!"',
      },
    ],
  },
  {
    id: 'sinh_nhat_15_thang_5',
    title: 'Đại Tiệc Sinh Nhật 15/5 & Mưu Kế Đòi Hủy Hôn',
    subTitle: 'Sinh nhật 15/5 tuổi 14: Vừa đòi quà ngọt vừa lén xin chữ ký hủy hôn',
    icon: '🎂',
    situation:
      'Hôm nay là ngày 15/5 — đúng ngày sinh nhật tròn 14 tuổi của Dịch Chi! Nhóc diện ba vạt áo mỏng manh mới tinh: trắng ngà thuần khiết, xanh ngọc nhạt và lớp áo sa đỏ nhạt trễ vai rực rỡ, trên đầu cài trâm ngọc trâm bạc lấp lánh, bím tóc nhỏ gắn chuông linh lan ngân vang rộn ràng. Nhóc ngồi đung đưa trên xích đu hoa ngọc, đôi chân trần trắng nõn với sợi chỉ đỏ đung đưa trong gió, vẻ mặt vừa háo hức mong đợi quà của bạn, vừa lấm lét giấu một cuộn giấy hủy hôn mới vẽ sau lưng!',
    dichChiAction:
      '*Dịch Chi ngửa khuôn mặt diễm lệ xinh đẹp tuyệt trần nhìn bạn, nốt lệ chí dưới mí mắt trái ửng hồng e thẹn, hai mắt hoa đào sáng lúng liếng như sao đêm, giơ hai bàn tay búp măng trắng muốt ra trước mặt*',
    dichChiQuote:
      'Thần Quân! Hôm nay là 15/5, sinh nhật bổn Điện Hạ đấy! Ngươi đã chuẩn bị quà cho ta chưa?! Ta tròn 14 tuổi rồi, chỉ còn hai năm nữa là 16 tuổi thành niên... Quà sinh nhật năm nay của ta rất đơn giản: Ngươi chỉ cần ký tên đóng dấu vào cuộn hôn thư hủy hôn này là được nha~!',
    initialMood: 'Háo hức đợi quà sinh nhật 15/5',
    choices: [
      {
        id: 'birthday_treasure_box',
        label: 'Tặng hộp gấm ngàn năm chứa đầy Thần Cấp Linh Thạch ngọt ngào và bánh hoa mai đỏ',
        detail:
          'Lấy ra hộp ngọc chứa các loại linh thạch ngọt lịm do Thần Giới tích lũy ngàn năm, kèm theo đĩa bánh hoa mai thơm lừng.',
        stabilityDelta: 30,
        outcomeDescription:
          'Dịch Chi vừa nhìn thấy linh thạch ngũ sắc tỏa hương ngọt ngào liền vứt phăng cuộn giấy hủy hôn, ôm chặt hộp quà cười tít mắt, chiếc đuôi rồng dài bụ bẫm cộm góc áo sa ngoe nguẩy cuống cuồng.',
        resultingMood: 'Mê mẩn ôm trọn quà sinh nhật ngọt ngào',
        resultingPerception: 'Cảm thấy Thần Quân luôn nhớ rõ ngày sinh 15/5 của mình và cưng chiều mình nhất thiên hạ.',
        cannedReaction:
          '*Dịch Chi reo lên một tiếng giòn tan, nhảy tót xuống xích đu ôm chầm lấy cổ bạn, chuông linh lan leng keng vang dội:* "Oa! Toàn là linh thạch ngọt ngào thượng phẩm! Còn có cả bánh hoa mai đỏ ta thích nhất nữa! Coi như Thần Quân ngươi thức thời... Chuyện hủy hôn hôm nay tạm gác lại, năm sau tính tiếp!"',
      },
      {
        id: 'call_bluff_birthday_stamp',
        label: 'Giả vờ cầm bút định ký hủy hôn: "Được thôi, ta ký làm quà sinh nhật cho ngươi nhé?"',
        detail:
          'Nghiêm túc rút bút chu sa làm bộ chuẩn bị ấn dấu triện đồng ý hủy bỏ hôn ước.',
        stabilityDelta: 35,
        outcomeDescription:
          'Dịch Chi tái mặt hốt hoảng, vội vàng lao tới giật phắt lấy cuộn hôn thư giấu biến ra sau lưng, hai mắt hoa đào ầng ậng nước mắt vì uất ức.',
        resultingMood: 'Mếu máo giật lại hôn thư',
        resultingPerception: 'Biết tỏng bản thân chỉ dám mồm mép đòi hủy hôn chứ trong lòng sợ mất Thần Quân chết đi được.',
        cannedReaction:
          '*Dịch Chi bổ nhào tới ôm chặt lấy tay cầm bút của bạn, mồm mếu xệch, nốt lệ chí dưới mắt trái rung rung ngấn lệ:* "Ngươi... ngươi dám ký thật sao?! Hôm nay là sinh nhật 15/5 của ta mà ngươi dám bắt nạt ta! Không cho ký! Hôn thư này là của ta, khi nào ta bảo ký mới được ký hu hu..."',
      },
      {
        id: 'brush_scales_birthday',
        label: 'Kéo nhóc vào lòng, cọ sáng bóng từng phiến vảy rồng và xoa nhẹ hai sừng non',
        detail:
          'Dùng khăn lụa tẩm linh dịch ấm áp đánh bóng toàn bộ vảy rồng đen ánh lam ngọc ở hõm lưng, nhẹ nhàng xoa nắn hai sừng non.',
        stabilityDelta: 25,
        outcomeDescription:
          'Được cọ vảy rồng đúng ngày sinh nhật, Dịch Chi sung sướng ngửa cổ thở dốc, hai sừng non mẫn cảm run rẩy, cả người mềm oặt vùi đầu vào lồng ngực bạn.',
        resultingMood: 'Mềm nhũn hạnh phúc trong vòng tay',
        resultingPerception: 'Cảm nhận trọn vẹn tình cảm ấm áp, nguyện ý để Thần Quân nuôi dưỡng đến 16 tuổi.',
        cannedReaction:
          '*Dịch Chi vùi khuôn mặt diễm lệ đỏ ửng vào vai bạn, phát ra tiếng gầm gừ nhỏ êm ái như mèo con:* "Ưm... sướng quá đi mất... Vảy rồng của ta sáng bóng nhất cõi trời đất rồi... Thần Quân ca ca, mỗi năm sinh nhật 15/5 ngươi đều phải cọ vảy cho ta thế này đấy nhé..."',
      },
    ],
  },
];
