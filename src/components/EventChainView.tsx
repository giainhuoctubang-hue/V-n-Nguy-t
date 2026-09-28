import React, { useState } from 'react';
import { BREAK_ENGAGEMENT_EVENTS, BreakEngagementEvent, EventChoice } from '../data/eventChains';
import { sound } from '../utils/audio';
import { Flame, ShieldAlert, Sparkles, CheckCircle2, MessageSquare, ArrowRight, RefreshCw } from 'lucide-react';

interface EventChainViewProps {
  stability: number;
  setStability: React.Dispatch<React.SetStateAction<number>>;
  schemeProgress: number;
  setSchemeProgress: React.Dispatch<React.SetStateAction<number>>;
  setMood: (mood: string) => void;
  onInjectEventToChat: (userChoiceText: string, dichChiReaction: string, eventTitle: string) => void;
  onNavigateToChat: () => void;
}

export const EventChainView: React.FC<EventChainViewProps> = ({
  stability,
  setStability,
  schemeProgress,
  setSchemeProgress,
  setMood,
  onInjectEventToChat,
  onNavigateToChat,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<BreakEngagementEvent>(BREAK_ENGAGEMENT_EVENTS[0]);
  const [selectedChoice, setSelectedChoice] = useState<EventChoice | null>(null);
  const [reactionText, setReactionText] = useState<string | null>(null);
  const [isLoadingReaction, setIsLoadingReaction] = useState(false);
  const [completedEvents, setCompletedEvents] = useState<Record<string, { choice: EventChoice; reaction: string }>>({});

  const handleSelectChoice = async (choice: EventChoice) => {
    setSelectedChoice(choice);
    setIsLoadingReaction(true);
    setReactionText(null);

    // Audio cue based on choice type
    if (choice.id.includes('tea') || choice.id.includes('sweet') || choice.id.includes('clean')) {
      sound.playSweetBite();
    } else if (choice.id.includes('fire') || choice.id.includes('threaten')) {
      sound.playFireBoom();
    } else if (choice.id.includes('swap') || choice.id.includes('illusion')) {
      sound.playSwordClash();
    } else {
      sound.playStamp();
    }

    // Apply stability delta (clamped 0 - 100)
    const newStability = Math.min(100, Math.max(0, stability + choice.stabilityDelta));
    setStability(newStability);

    // Shift scheme progress
    const schemeDelta = choice.stabilityDelta > 0 ? -15 : +10;
    setSchemeProgress(Math.min(100, Math.max(10, schemeProgress + schemeDelta)));

    // Update Dịch Chi's mood
    setMood(choice.resultingMood);

    // Fetch dynamic live reaction from AI backend
    try {
      const response = await fetch('/api/event-reaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventTitle: selectedEvent.title,
          userChoiceText: choice.label,
          stabilityChange: choice.stabilityDelta,
          currentStability: newStability,
        }),
      });

      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      const generated = data.reaction || choice.cannedReaction;
      setReactionText(generated);
      setCompletedEvents((prev) => ({
        ...prev,
        [selectedEvent.id]: { choice, reaction: generated },
      }));
    } catch (err) {
      console.warn('Using canned reaction:', err);
      setReactionText(choice.cannedReaction);
      setCompletedEvents((prev) => ({
        ...prev,
        [selectedEvent.id]: { choice, reaction: choice.cannedReaction },
      }));
    } finally {
      setIsLoadingReaction(false);
    }
  };

  const handleSendToChat = () => {
    if (!selectedChoice || !reactionText) return;
    onInjectEventToChat(selectedChoice.label, reactionText, selectedEvent.title);
    sound.playChime();
    onNavigateToChat();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Intro Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-950 via-indigo-950 to-rose-950 border border-purple-700/50 p-5 sm:p-7 shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Flame size={16} className="text-amber-400 animate-pulse" />
            <span>Chuỗi Âm Mưu Nghịch Ngợm Của Tiểu Điện Hạ</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 tracking-wide">
            Biến Cố Hủy Hôn Ước
          </h2>
          <p className="mt-2 text-sm text-purple-200/90 leading-relaxed font-sans">
            Dịch Chi một lòng muốn hủy bỏ hôn ước tình cờ giữa Ma Giới và Thần Tộc, liên tục bày mưu tính kế
            từ chuốc trà Mạn Đà Lam, đốt đại điện cho đến cướp hôn thư chạy trốn. Hãy đưa ra quyết định
            của Thần Quân để xem nhóc tì phản ứng và xoay xở thế nào!
          </p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-15 translate-x-12 translate-y-12 text-9xl select-none pointer-events-none">
          🍵
        </div>
      </div>

      {/* Event Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {BREAK_ENGAGEMENT_EVENTS.map((evt) => {
          const isSelected = selectedEvent.id === evt.id;
          const isDone = !!completedEvents[evt.id];

          return (
            <button
              key={evt.id}
              onClick={() => {
                setSelectedEvent(evt);
                setSelectedChoice(null);
                setReactionText(null);
                sound.playChime();
              }}
              className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-purple-900/80 border-amber-400/80 shadow-lg shadow-purple-950/50 scale-[1.02]'
                  : 'bg-purple-950/50 border-purple-800/40 hover:bg-purple-900/40 hover:border-purple-600/60'
              }`}
            >
              <div className="text-2xl p-2 rounded-lg bg-purple-900/60 border border-purple-700/50 shrink-0">
                {evt.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-amber-200 truncate">{evt.title}</h3>
                  {isDone && <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />}
                </div>
                <p className="text-[11px] text-purple-300/80 line-clamp-1 mt-0.5">{evt.subTitle}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Event Interactive Stage */}
      <div className="bg-purple-950/70 border border-purple-800/50 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
        {/* Situation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-800/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedEvent.icon}</span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-200">
                {selectedEvent.title}
              </h3>
            </div>
            <p className="text-xs text-purple-300/80 mt-1">{selectedEvent.subTitle}</p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-purple-900/70 border border-purple-700/50 px-3 py-1.5 rounded-lg text-purple-200 w-fit">
            <span>Tâm trạng ban đầu:</span>
            <span className="font-semibold text-pink-300">{selectedEvent.initialMood}</span>
          </div>
        </div>

        {/* Narrative Box */}
        <div className="bg-purple-900/30 border border-purple-700/30 rounded-xl p-4 sm:p-5 text-sm sm:text-base text-purple-100/90 leading-relaxed font-serif space-y-3">
          <p className="italic">{selectedEvent.situation}</p>

          <div className="pt-2 border-t border-purple-800/40">
            <p className="text-xs text-purple-400 font-sans font-semibold uppercase tracking-wider mb-1">
              Hành động của Dịch Chi:
            </p>
            <p className="text-purple-200 italic">{selectedEvent.dichChiAction}</p>
          </div>

          <div className="bg-purple-950/80 border-l-4 border-amber-400 p-3 rounded-r-lg">
            <p className="text-xs text-amber-300 font-sans font-semibold mb-0.5">
              Dịch Chi nũng nịu nói:
            </p>
            <p className="text-amber-100 font-serif italic text-base">"{selectedEvent.dichChiQuote}"</p>
          </div>
        </div>

        {/* Choices List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={16} />
              <span>Quyết Định Của Thần Quân (Lựa chọn cách ứng biến):</span>
            </h4>
            <span className="text-xs text-purple-300/70">Chọn một phương án để xem phản ứng</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedEvent.choices.map((choice) => {
              const isPicked = selectedChoice?.id === choice.id;
              const isPositive = choice.stabilityDelta > 0;

              return (
                <button
                  key={choice.id}
                  onClick={() => handleSelectChoice(choice)}
                  disabled={isLoadingReaction}
                  className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    isPicked
                      ? 'bg-gradient-to-br from-purple-800 to-indigo-900 border-amber-300 shadow-xl ring-2 ring-amber-400/40 scale-[1.01]'
                      : 'bg-purple-900/40 border-purple-700/40 hover:bg-purple-850/60 hover:border-purple-500/60'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-sm font-bold text-amber-100 leading-snug">
                        {choice.label}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 font-mono ${
                          isPositive
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {isPositive ? `+${choice.stabilityDelta}% Bền` : `${choice.stabilityDelta}% Rung chuyển`}
                      </span>
                    </div>
                    <p className="text-xs text-purple-200/80 leading-relaxed">{choice.detail}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-purple-800/40 flex items-center justify-between text-[11px] text-purple-300">
                    <span>Tâm trạng: <strong className="text-pink-300">{choice.resultingMood}</strong></span>
                    <span className="text-amber-400/90 font-medium">Bấm để thực hiện →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reaction Result Banner */}
        {isLoadingReaction && (
          <div className="p-6 rounded-xl bg-purple-900/40 border border-purple-700/40 text-center space-y-2">
            <RefreshCw className="animate-spin text-amber-400 mx-auto" size={24} />
            <p className="text-sm text-purple-200 font-serif italic">
              Dịch Chi đang tròn mắt phản ứng trước quyết định của ngươi...
            </p>
          </div>
        )}

        {reactionText && !isLoadingReaction && selectedChoice && (
          <div className="p-5 rounded-xl bg-gradient-to-br from-purple-900/90 via-indigo-950 to-purple-950 border-2 border-amber-400/60 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎭</span>
                <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                  Phản Ứng Của Tiểu Điện Hạ Dịch Chi:
                </h4>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-200 border border-pink-500/30">
                {selectedChoice.resultingMood}
              </span>
            </div>

            <div className="text-base text-amber-100 font-serif leading-relaxed italic bg-purple-950/60 p-4 rounded-lg border border-purple-800/40">
              {reactionText}
            </div>

            <div className="text-xs text-purple-200/90 bg-purple-900/40 p-3 rounded-lg border border-purple-800/30 space-y-1">
              <p>
                <strong>Hậu quả:</strong> {selectedChoice.outcomeDescription}
              </p>
              <p>
                <strong>Nhận thức của Dịch Chi:</strong> {selectedChoice.resultingPerception}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                onClick={handleSendToChat}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-purple-950 font-bold text-sm shadow-lg transition-all"
              >
                <MessageSquare size={16} />
                <span>Tiếp Tục Trêu Nhóc Trong Chat</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
