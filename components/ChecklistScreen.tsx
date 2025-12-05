import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Wallet, 
  UtensilsCrossed, 
  DollarSign, 
  Battery,
  Footprints,
  CloudRain,
  Droplets,
  PillBottle,
  Plug,
  Check,
  Sparkles
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ChecklistItem {
  id: string;
  icon: any;
  title: string;
  description: string;
  important?: boolean;
  image?: string;
}

export function ChecklistScreen() {
  const STORAGE_KEY = 'takamatsu-trip-checklist';
  
  // localStorage에서 체크 상태 불러오기
  const loadCheckedItems = (): Set<string> => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return new Set(parsed);
      }
    } catch (error) {
      console.error('체크리스트 상태 불러오기 실패:', error);
    }
    return new Set();
  };

  const [checkedItems, setCheckedItems] = useState<Set<string>>(loadCheckedItems);

  // 체크 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    try {
      const itemsArray = Array.from(checkedItems);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itemsArray));
    } catch (error) {
      console.error('체크리스트 상태 저장 실패:', error);
    }
  }, [checkedItems]);

  const checklistItems: ChecklistItem[] = [
    {
      id: '1',
      icon: FileText,
      title: '여권 유효기간 확인',
      description: '출국일 기준 3개월 이상 여유 필요',
      important: true,
    },
    {
      id: '2',
      icon: Wallet,
      title: '가이드·기사 경비',
      description: '현금 4,000엔 준비 (약 40,000원)',
      important: true,
    },
    {
      id: '3',
      icon: DollarSign,
      title: '본인 부담금 입금',
      description: '총무에게 12월 중 입금',
      important: true,
    },
    {
      id: '4',
      icon: Plug,
      title: '110V 변환기',
      description: '필수 지참 (일본 전압 110V)',
      important: true,
    },
    {
      id: '5',
      icon: Battery,
      title: '보조배터리',
      description: '사진 촬영이 많으니 필수 지참',
    },
    {
      id: '6',
      icon: Footprints,
      title: '편한 신발',
      description: '곤피라궁 785 계단, 걷기 편한 신발 필수',
    },
    {
      id: '7',
      icon: CloudRain,
      title: '우천 대비 준비물',
      description: '우산 또는 레인코트',
    },
    {
      id: '8',
      icon: Droplets,
      title: '개인 세면도구',
      description: '호텔에서 제공하지만 개인용품 권장',
    },
    {
      id: '9',
      icon: PillBottle,
      title: '개인 상비약',
      description: '멀미약, 소화제 등',
    },
    {
      id: '10',
      icon: UtensilsCrossed,
      title: '3일차 나오시마 중식',
      description: '불포함 - 개인 부담 (약 10,000~15,000원)',
    },
  ];

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const checkedCount = checkedItems.size;
  const totalCount = checklistItems.length;
  const progress = (checkedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1a2028] to-[#0F1419] pb-24">
      {/* Premium Header - Sticky */}
      <div className="bg-gradient-to-br from-[#0F1419] via-[#1a2028] to-[#0F1419] text-white pt-10 pb-6 px-6 sticky top-0 z-30 border-b border-white/5 shadow-2xl backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-6 bg-[#C9A961]"></div>
            <p className="text-[#C9A961] text-xs tracking-[0.3em] uppercase font-light">Checklist</p>
          </div>
          <h1 className="text-2xl mb-1 tracking-tight">여행 준비</h1>
          <p className="text-white/60 text-sm font-light">체크리스트를 확인해보세요</p>
        </motion.div>

        {/* Progress - Inside Sticky Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl shadow-xl p-5 mt-5 overflow-hidden gold-metallic"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white drop-shadow-lg" />
                <span className="text-white text-sm font-light drop-shadow-lg">진행상황</span>
              </div>
              <motion.span
                key={checkedCount}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-white text-lg tabular-nums font-light drop-shadow-lg"
              >
                {checkedCount}/{totalCount}
              </motion.span>
            </div>

            <div className="relative h-2.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-white rounded-full shadow-lg"
              />
            </div>

            {checkedCount === totalCount && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/90 text-xs mt-2 text-center font-light drop-shadow-lg"
              >
                ✨ 모든 준비가 완료되었습니다!
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>

      <div className="px-6 pt-6">
        {/* Checklist Items */}
        <div className="space-y-3">
          {checklistItems.map((item, index) => {
            const Icon = item.icon;
            const isChecked = checkedItems.has(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => toggleItem(item.id)}
                className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-gradient-to-br from-[#C9A961]/20 to-[#D4B976]/10 border-[#C9A961]/30'
                    : 'bg-gradient-to-br from-white/10 to-white/5 border-white/10'
                } border backdrop-blur-xl`}
              >
                {item.image && (
                  <div className="absolute right-0 top-0 bottom-0 w-24 opacity-30 overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F1419] to-transparent"></div>
                  </div>
                )}

                <div className="relative p-4 flex items-start gap-4">
                  {/* Checkbox */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                      isChecked
                        ? 'bg-gradient-to-br from-[#C9A961] to-[#D4B976] shadow-lg'
                        : 'bg-white/10 border border-white/20'
                    }`}
                  >
                    <AnimatePresence>
                      {isChecked && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-1">
                      <div className={`p-2 rounded-xl ${
                        item.important 
                          ? 'bg-gradient-to-br from-[#C9A961] to-[#D4B976]' 
                          : 'bg-white/10'
                      }`}>
                        <Icon className={`w-4 h-4 ${
                          item.important ? 'text-white' : 'text-white/70'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-white mb-1 transition-all ${
                          isChecked ? 'line-through opacity-60' : ''
                        }`}>
                          {item.title}
                          {item.important && (
                            <span className="ml-2 text-xs bg-[#C9A961]/20 text-[#C9A961] px-2 py-0.5 rounded-full border border-[#C9A961]/30">
                              필수
                            </span>
                          )}
                        </h3>
                        <p className={`text-sm font-light transition-all ${
                          isChecked ? 'text-white/40' : 'text-white/60'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}