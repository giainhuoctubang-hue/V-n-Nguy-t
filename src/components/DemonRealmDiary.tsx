import React, { useState, useEffect } from 'react';
import { DemonDiaryMilestone, INITIAL_DEMON_DIARY } from '../data/characterData';
import { sound } from '../utils/audio';
import { BookOpen, Sparkles, Plus, Feather, Heart, Flame, Shield, History, MessageCircle, ChevronRight, X } from 'lucide-react';

interface DemonRealmDiaryProps {
  onUsePrompt: (promptText: string) => void;
  onNavigateToChat: () => void;
  currentAge: number;
}

const STORAGE_KEY = 'dich_chi_demon_diary_v1';

export const DemonRealmDiary: React.FC<DemonRealmDiaryProps> = ({
  onUsePrompt,
  onNavigateToChat,
  currentAge,
}) => {
  const [milestones, setMilestones] = useState<DemonDiaryMilestone[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_DEMON_DIARY;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeMilestone, setActiveMilestone] = useState<DemonDiaryMilestone | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Form states for new custom memory
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'bien_hinh' | 'tranh_cai' | 'hon_uoc' | 'nuoi_duong' | 'nghich_ngom'>('nuoi_duong');
  const [newDate, setNewDate] = useState(`Năm ${currentAge.toFixed(1)} Tuổi`);
  const [newStory, setNewStory] = useState('');
  const [newSecretNote, setNewSecretNote] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(milestones));
    } catch (e) {
      console.warn('Failed to save demon diary:', e);
    }
  }, [milestones]);

  const filteredMilestones = milestones.filter((m) => {
    if (selectedCategory === 'all') return true;
    return m.category === selectedCategory;
  });

  const handleRoleplayMilestone = (milestone: DemonDiaryMilestone) => {
    sound.playStamp();
    onUsePrompt(milestone.roleplayPrompt);
    onNavigateToChat();
  };

  const handleCreateNewMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newStory.trim()) return;

    sound.playChime();
    const newEntry: DemonDiaryMilestone = {
      id: `custom_memory_${Date.now()}`,
      title: newTitle.trim(),
      icon: newCategory === 'bien_hinh' ? '🐉' : newCategory === 'tranh_cai' ? '👑' : newCategory === 'hon_uoc' ? '📜' : newCategory === 'nuoi_duong' ? '🍲' : '✨',
      category: newCategory,
      categoryName:
        newCategory === 'bien_hinh'
          ? 'Huyết Mạch Hắc Long'
          : newCategory === 'tranh_cai'
          ? 'Khẩu Chiến Ma Thần'
          : newCategory === 'hon_uoc'
          ? 'Thiên Định Duyên'
          : newCategory === 'nuoi_duong'
          ? 'Dưỡng Long Mau Lớn'
          : 'Nghịch Ngợm Quậy Phá',
      date: newDate.trim() || `Năm ${currentAge.toFixed(1)} Tuổi`,
      ageWhenHappened: `${currentAge.toFixed(1)} Tuổi`,
      summary: newStory.slice(0, 90) + (newStory.length > 90 ? '...' : ''),
      fullStory: newStory.trim(),
      dichChiSecretNote: newSecretNote.trim()
        ? `*(Dịch Chi lén viết thêm)*: ${newSecretNote.trim()}`
        : `*(Dịch Chi chun mũi)*: Thần Quân lại lén ghi chép chuyện của ta vào sổ rồi đấy à?! Lần sau phải ghi ta thắng ngươi mới được tính!`,
      thanQuanMemory: `Kỷ niệm đẹp đẽ cùng Tiểu Điện Hạ Dịch Chi khi nhóc ${currentAge.toFixed(1)} tuổi.`,
      roleplayPrompt: `*Mở Nhật Ký Ma Giới ra trước mặt Dịch Chi, chỉ vào sự kiện "${newTitle.trim()}" vừa ghi chép rồi mỉm cười trêu nhóc*`,
      isUnlocked: true,
      tagColor: 'from-purple-950 to-indigo-950 text-purple-200 border-purple-500/40',
    };

    setMilestones([newEntry, ...milestones]);
    setNewTitle('');
    setNewStory('');
    setNewSecretNote('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="text-center space-y-2 relative">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/60 border border-amber-400/40 text-amber-200 text-xs font-semibold shadow-inner">
          <BookOpen size={14} className="text-amber-300" />
          <span>Biên Niên Sử Nuôi Dưỡng Ấu Long Ma Giới</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-200 to-amber-300">
          Nhật Ký Ma Giới
        </h2>
        <p className="text-xs sm:text-sm text-purple-300/80 max-w-xl mx-auto leading-relaxed">
          Ghi lại những mốc son đáng nhớ trong quá trình dưỡng dục và chung sống cùng Tiểu Điện Hạ Dịch Chi:
          từ lần đầu biến hình lộ sừng non, những trận khẩu chiến dở khóc dở cười, đến lời hứa hôn ước dở dang ngày 15/5.
        </p>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playChime();
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-rose-600 to-purple-700 hover:from-amber-500 hover:to-purple-600 text-white font-bold text-xs shadow-lg transition-all active:scale-95 border border-amber-300/50 cursor-pointer"
          >
            <Plus size={15} />
            <span>Ghi Chép Kỷ Niệm Mới Cùng Dịch Chi</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[
          { id: 'all', label: `Tất Cả (${milestones.length})`, icon: '📜' },
          { id: 'bien_hinh', label: '🐉 Huyết Mạch & Biến Hình', icon: '🐉' },
          { id: 'tranh_cai', label: '👑 Khẩu Chiến Thắng Thua', icon: '👑' },
          { id: 'hon_uoc', label: '💍 Hôn Ước Dở Dang', icon: '💍' },
          { id: 'nuoi_duong', label: '🍲 Dưỡng Long Mau Lớn', icon: '🍲' },
          { id: 'nghich_ngom', label: '🌪️ Nghịch Ngợm Quậy Phá', icon: '🌪️' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSelectedCategory(tab.id);
              sound.playChime();
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === tab.id
                ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow-md ring-1 ring-amber-300'
                : 'bg-purple-950/70 text-purple-300 hover:text-white border border-purple-800/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Milestones List Timeline */}
      <div className="space-y-4">
        {filteredMilestones.map((m, index) => (
          <div
            key={m.id}
            className="bg-purple-950/70 border border-purple-800/60 hover:border-amber-400/60 rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-xl space-y-3 relative group"
          >
            {/* Top row: Icon, Category tag, Date & Age */}
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-900/80 border border-purple-700/60 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-purple-900/80 text-amber-300 border border-amber-400/40">
                      {m.categoryName}
                    </span>
                    <span className="text-xs text-purple-300/80 font-mono">
                      📅 {m.date}
                    </span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-pink-950/70 text-pink-300 border border-pink-500/30 font-bold">
                      {m.ageWhenHappened}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-amber-200 mt-1 group-hover:text-amber-100 transition-colors">
                    {m.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveMilestone(m)}
                  className="px-3 py-1.5 rounded-xl bg-purple-900/70 hover:bg-purple-800 text-purple-200 hover:text-white border border-purple-600/50 text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen size={13} />
                  <span>Đọc Chi Tiết</span>
                </button>
                <button
                  onClick={() => handleRoleplayMilestone(m)}
                  className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                  title="Đưa ký ức này vào cuộc trò chuyện với Dịch Chi"
                >
                  <MessageCircle size={13} />
                  <span>Hồi Tưởng Cùng Nhóc</span>
                </button>
              </div>
            </div>

            {/* Summary preview */}
            <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed pl-1">
              {m.summary}
            </p>

            {/* Handwritten note from Dịch Chi */}
            <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-800/40 flex items-start gap-2.5">
              <span className="text-lg">✍️</span>
              <div className="text-xs text-pink-200/90 italic leading-relaxed">
                <span className="font-bold text-amber-300 not-italic">Lời Dịch Chi lén phê bút: </span>
                {m.dichChiSecretNote}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {activeMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-950 border border-amber-400/50 rounded-3xl max-w-2xl w-full p-5 sm:p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-2 border-b border-purple-800/60 pb-3">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{activeMilestone.icon}</div>
                <div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase">
                    {activeMilestone.categoryName} • {activeMilestone.date}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-amber-200 mt-1">
                    {activeMilestone.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveMilestone(null)}
                className="p-1.5 rounded-full bg-purple-900/60 hover:bg-purple-800 text-purple-300 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Story section */}
            <div className="space-y-3 text-xs sm:text-sm text-purple-100/95 leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-800/50 shadow-inner">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <History size={14} />
                  <span>Diễn Biến Sự Kiện:</span>
                </h4>
                <p className="whitespace-pre-line text-purple-200">{activeMilestone.fullStory}</p>
              </div>

              {/* Dịch Chi's Note */}
              <div className="p-3.5 rounded-2xl bg-pink-950/40 border border-pink-500/30">
                <h4 className="text-xs font-bold text-pink-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Feather size={14} />
                  <span>Bút Tích Bí Mật Của Dịch Chi:</span>
                </h4>
                <p className="italic text-pink-200">{activeMilestone.dichChiSecretNote}</p>
              </div>

              {/* Thần Quân's Note */}
              <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Heart size={14} />
                  <span>Ký Ức Trong Lòng Thần Quân:</span>
                </h4>
                <p className="text-indigo-200">{activeMilestone.thanQuanMemory}</p>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-purple-800/60">
              <button
                onClick={() => setActiveMilestone(null)}
                className="px-4 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-300 text-xs font-bold cursor-pointer"
              >
                Đóng Lại
              </button>
              <button
                onClick={() => {
                  handleRoleplayMilestone(activeMilestone);
                  setActiveMilestone(null);
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white text-xs font-bold shadow-lg transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle size={14} />
                <span>Trò Chuyện Sự Kiện Này Với Dịch Chi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Memory Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <form
            onSubmit={handleCreateNewMemory}
            className="bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-950 border border-amber-400/50 rounded-3xl max-w-lg w-full p-5 sm:p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-purple-800/60 pb-3">
              <div className="flex items-center gap-2">
                <Feather size={18} className="text-amber-300" />
                <h3 className="text-base font-serif font-bold text-amber-200">
                  Ghi Chép Kỷ Niệm Mới Cùng Dịch Chi
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-purple-300 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-purple-200 font-bold mb-1">
                  Tiêu Đề Kỷ Niệm:
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Đêm ngắm trăng trên cành mai đỏ..."
                  required
                  className="w-full px-3 py-2 rounded-xl bg-purple-950/80 border border-purple-700/60 text-amber-100 placeholder-purple-400/50 focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-purple-200 font-bold mb-1">
                    Phân Loại:
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-950/80 border border-purple-700/60 text-amber-100 focus:outline-none focus:border-amber-400 text-xs"
                  >
                    <option value="nuoi_duong">🍲 Dưỡng Long Mau Lớn</option>
                    <option value="bien_hinh">🐉 Huyết Mạch & Biến Hình</option>
                    <option value="tranh_cai">👑 Khẩu Chiến Thắng Thua</option>
                    <option value="hon_uoc">💍 Hôn Ước Dở Dang</option>
                    <option value="nghich_ngom">🌪️ Nghịch Ngợm Quậy Phá</option>
                  </select>
                </div>

                <div>
                  <label className="block text-purple-200 font-bold mb-1">
                    Thời Gian Diễn Ra:
                  </label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder={`Năm ${currentAge.toFixed(1)} Tuổi`}
                    className="w-full px-3 py-2 rounded-xl bg-purple-950/80 border border-purple-700/60 text-amber-100 focus:outline-none focus:border-amber-400 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-purple-200 font-bold mb-1">
                  Nội Dung Chi Tiết Kỷ Niệm:
                </label>
                <textarea
                  value={newStory}
                  onChange={(e) => setNewStory(e.target.value)}
                  rows={3}
                  placeholder="Ghi lại những gì đã xảy ra giữa bạn và Dịch Chi..."
                  required
                  className="w-full px-3 py-2 rounded-xl bg-purple-950/80 border border-purple-700/60 text-amber-100 placeholder-purple-400/50 focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div>
                <label className="block text-pink-300 font-bold mb-1">
                  Lời Dịch Chi Phê Bút / Phản Ứng (Tùy chọn):
                </label>
                <input
                  type="text"
                  value={newSecretNote}
                  onChange={(e) => setNewSecretNote(e.target.value)}
                  placeholder="Ví dụ: Đồ Thần Quân xấu xa, hôm đó ta chỉ nhường ngươi một bước thôi!"
                  className="w-full px-3 py-2 rounded-xl bg-purple-950/80 border border-purple-700/60 text-pink-200 placeholder-pink-400/40 focus:outline-none focus:border-pink-400 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-800/60">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-300 text-xs font-semibold cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white text-xs font-bold shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                Lưu Vào Nhật Ký
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
