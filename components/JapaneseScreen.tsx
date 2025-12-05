import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Star, X, Languages } from 'lucide-react';

interface PhraseItem {
  kr: string;
  jp: string;
  roman: string;
}

interface Category {
  category: string;
  icon: string;
  items: PhraseItem[];
}

interface PhraseDetailModalProps {
  phrase: PhraseItem | null;
  category: string;
  onClose: () => void;
  onToggleFavorite: (phrase: PhraseItem) => void;
  isFavorite: boolean;
}

function PhraseDetailModal({ phrase, category, onClose, onToggleFavorite, isFavorite }: PhraseDetailModalProps) {
  if (!phrase) return null;

  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(phrase.jp);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const openGoogleTranslate = () => {
    const url = `https://translate.google.com/?sl=ja&tl=ko&text=${encodeURIComponent(phrase.jp)}&op=translate`;
    window.open(url, '_blank');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-br from-[#0F1419] via-[#1a2028] to-[#0F1419] rounded-t-3xl z-50 max-w-[430px] mx-auto border-t border-white/10 shadow-2xl pb-24"
      >
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <p className="text-white/60 text-xs mb-2 font-light">{category}</p>
              <h3 className="text-white text-xl mb-1">{phrase.kr}</h3>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Japanese Text */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-5 mb-4 border border-white/10">
            <p className="text-white text-2xl mb-2 tracking-wide">{phrase.jp}</p>
            <p className="text-white/60 text-sm font-light">{phrase.roman}</p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={playAudio}
              className="bg-gradient-to-br from-[#C9A961] to-[#D4B976] text-white rounded-xl px-4 py-3 flex items-center justify-center gap-2 shadow-lg"
            >
              <Volume2 className="w-5 h-5" />
              <span className="text-sm font-light">음성</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openGoogleTranslate}
              className="bg-gradient-to-br from-white/20 to-white/10 text-white rounded-xl px-4 py-3 flex items-center justify-center gap-2 border border-white/20"
            >
              <Languages className="w-5 h-5" />
              <span className="text-sm font-light">번역</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function JapaneseScreen() {
  const [selectedPhrase, setSelectedPhrase] = useState<PhraseItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('기본 표현');
  const [selectedPhraseCategory, setSelectedPhraseCategory] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');

  const phrases: Category[] = [
    {
      category: "기본 표현",
      icon: "👋",
      items: [
        {"kr": "안녕하세요", "jp": "こんにちは", "roman": "곤니치와"},
        {"kr": "감사합니다", "jp": "ありがとうございます", "roman": "아리가토 고자이마스"},
        {"kr": "죄송합니다", "jp": "すみません", "roman": "스미마센"},
        {"kr": "부탁드립니다", "jp": "お願いします", "roman": "오네가이시마스"},
        {"kr": "이해했어요", "jp": "分かりました", "roman": "와카리마시타"},
        {"kr": "모르겠어요", "jp": "分かりません", "roman": "와카리마센"},
        {"kr": "다시 말해 주세요", "jp": "もう一度お願いします", "roman": "모-이치도 오네가이시마스"},
        {"kr": "천천히 말해 주세요", "jp": "ゆっくり話してください", "roman": "윳쿠리 하나시테 쿠다사이"},
        {"kr": "이것은 무엇인가요?", "jp": "これはなんですか？", "roman": "코레와 난데스까"},
        {"kr": "이거 주세요", "jp": "これください", "roman": "코레 쿠다사이"}
      ]
    },
    {
      category: "길 찾기",
      icon: "🗺️",
      items: [
        {"kr": "어디인가요?", "jp": "どこですか？", "roman": "도코데스까"},
        {"kr": "화장실은 어디인가요?", "jp": "トイレはどこですか？", "roman": "토이레와 도코데스까"},
        {"kr": "어떻게 가나요?", "jp": "どうやって行きますか？", "roman": "도-얏테 이키마스까"},
        {"kr": "이쪽이 맞나요?", "jp": "こちらでいいですか？", "roman": "코치라데 이이데스까"},
        {"kr": "길을 잃었어요", "jp": "道に迷いました", "roman": "미치니 마요이마시타"},
        {"kr": "지하철역은 어디예요?", "jp": "駅はどこですか？", "roman": "에키와 도코데스까"},
        {"kr": "버스터미널은 어디예요?", "jp": "バスターミナルはどこですか？", "roman": "바스타미나루와 도코데스까"},
        {"kr": "택시 불러주세요", "jp": "タクシーを呼んでください", "roman": "타쿠시-욘데 쿠다사이"},
        {"kr": "여기로 가주세요", "jp": "ここまでお願いします", "roman": "코코마데 오네가이시마스"},
        {"kr": "얼마나 걸려요?", "jp": "どれくらいかかりますか？", "roman": "도레쿠라이 카카리마스까"}
      ]
    },
    {
      category: "쇼핑",
      icon: "🛍️",
      items: [
        {"kr": "얼마입니까?", "jp": "いくらですか？", "roman": "이쿠라데스까"},
        {"kr": "더 싼 거 있나요?", "jp": "安いのありますか？", "roman": "야스이노 아리마스까"},
        {"kr": "다른 색상 있나요?", "jp": "ほかの色ありますか？", "roman": "호카노 이로 아리마스까"},
        {"kr": "사이즈 있나요?", "jp": "サイズありますか？", "roman": "사이즈 아리마스까"},
        {"kr": "입어봐도 되나요?", "jp": "試着してもいいですか？", "roman": "시착 시테모 이이데스까"},
        {"kr": "이것으로 할게요", "jp": "これにします", "roman": "코레니 시마스"},
        {"kr": "카드 되나요?", "jp": "カード使えますか？", "roman": "카도 츠카에마스까"},
        {"kr": "현금만 되나요?", "jp": "現金だけですか？", "roman": "겐킨 다케데스까"},
        {"kr": "어디서 살 수 있나요?", "jp": "どこで買えますか？", "roman": "도코데 카에마스까"},
        {"kr": "면세 가능한가요?", "jp": "免税できますか？", "roman": "멘제이 데키마스까"}
      ]
    },
    {
      category: "식당/카페",
      icon: "🍽️",
      items: [
        {"kr": "예약했어요", "jp": "予約しました", "roman": "요야쿠 시마시타"},
        {"kr": "두 명이요", "jp": "二人です", "roman": "후타리데스"},
        {"kr": "메뉴 주세요", "jp": "メニューお願いします", "roman": "메뉴 오네가이시마스"},
        {"kr": "추천해 주세요", "jp": "おすすめをください", "roman": "오스스메오 쿠다사이"},
        {"kr": "이것은 뭐예요?", "jp": "これはなんですか？", "roman": "코레와 난데스까"},
        {"kr": "맵나요?", "jp": "辛いですか？", "roman": "카라이데스까"},
        {"kr": "물 주세요", "jp": "お水ください", "roman": "오미즈 쿠다사이"},
        {"kr": "계산서 주세요", "jp": "お会計お願いします", "roman": "오카이케이 오네가이시마스"},
        {"kr": "카드 결제 되나요?", "jp": "カードで払えますか？", "roman": "카도데 하루에마스까"},
        {"kr": "정말 맛있어요", "jp": "とてもおいしいです", "roman": "토테모 오이시이데스"}
      ]
    },
    {
      category: "호텔",
      icon: "🏨",
      items: [
        {"kr": "체크인하고 싶어요", "jp": "チェックインしたいです", "roman": "첵크잉 시타이데스"},
        {"kr": "체크아웃 할게요", "jp": "チェックアウトお願いします", "roman": "첵쿠아우토 오네가이시마스"},
        {"kr": "짐 맡아 주세요", "jp": "荷物を預けてください", "roman": "니모츠오 아즈케테 쿠다사이"},
        {"kr": "조식은 몇 시예요?", "jp": "朝食は何時ですか？", "roman": "초쇼쿠와 난지데스까"},
        {"kr": "방 청소 부탁해요", "jp": "部屋の掃除お願いします", "roman": "헤야노 소지 오네가이시마스"},
        {"kr": "와이파이 비밀번호 알려주세요", "jp": "Wi-Fiのパスワードを教えてください", "roman": "와이파이노 파스와도오 오시에테 쿠다사이"},
        {"kr": "에어컨 조절해 주세요", "jp": "エアコンを調整してください", "roman": "에아콘오 쵸-세이 시테 쿠다사이"},
        {"kr": "화장실이 고장났어요", "jp": "トイレが壊れています", "roman": "토이레가 코와레테이마스"},
        {"kr": "물/수건 더 주세요", "jp": "水／タオルをもっとください", "roman": "미즈/타오루 모또 쿠다사이"},
        {"kr": "방을 바꿀 수 있을까요?", "jp": "部屋を変えられますか？", "roman": "헤야오 카에라레 마스까"}
      ]
    },
    {
      category: "편의점",
      icon: "🏪",
      items: [
        {"kr": "이거 어디 있나요?", "jp": "これはどこにありますか？", "roman": "코레와 도코니 아리마스까"},
        {"kr": "계산대는 어디인가요?", "jp": "レジはどこですか？", "roman": "레지와 도코데스까"},
        {"kr": "따뜻한 음식인가요?", "jp": "温かい食べ物ですか？", "roman": "아타타카이 타베모노데스까"},
        {"kr": "데워 주시나요?", "jp": "温めてもらえますか？", "roman": "아타타메테 모라에마스까"},
        {"kr": "포크/스푼 주세요", "jp": "フォーク／スプーンお願いします", "roman": "포쿠/스푼 오네가이시마스"},
        {"kr": "전자레인지 사용 가능해요?", "jp": "電子レンジ使えますか？", "roman": "덴시렌지 츠카에마스까"},
        {"kr": "봉투 필요 없어요", "jp": "袋はいりません", "roman": "후쿠로와 이리마센"},
        {"kr": "얼음컵 있나요?", "jp": "氷のカップありますか？", "roman": "코오리노 캟푸 아리마스까"},
        {"kr": "이거 복권이에요?", "jp": "これは宝くじですか？", "roman": "코레와 타카라쿠지 데스까"},
        {"kr": "젓가락을 더 주세요", "jp": "お箸をもう一本ください", "roman": "오하시오 모- 잇뽕 쿠다사이"}
      ]
    },
    {
      category: "비상상황",
      icon: "🚨",
      items: [
        {"kr": "도움이 필요해요", "jp": "手伝ってください", "roman": "테츠닷테 쿠다사이"},
        {"kr": "아파요", "jp": "具合が悪いです", "roman": "구아이 가 와루이데스"},
        {"kr": "약국은 어디예요?", "jp": "薬局はどこですか？", "roman": "약쿄쿠와 도코데스까"},
        {"kr": "병원은 어디예요?", "jp": "病院はどこですか？", "roman": "뵤-잉와 도코데스까"},
        {"kr": "경찰 불러주세요", "jp": "警察を呼んでください", "roman": "케이사츠오 욘데 쿠다사이"},
        {"kr": "지갑을 잃어버렸어요", "jp": "財布をなくしました", "roman": "사이후오 나쿠시마시타"},
        {"kr": "여권을 잃어버렸어요", "jp": "パスポートをなくしました", "roman": "파스포-토오 나쿠시마시타"},
        {"kr": "위험해요! 도와주세요!", "jp": "危ない！助けて！", "roman": "아부나이! 타스케테!"},
        {"kr": "길을 잃었어요", "jp": "道に迷いました", "roman": "미치니 마요이마시타"},
        {"kr": "응급실은 어디예요?", "jp": "救急外来はどこですか？", "roman": "큐큐-가이라이와 도코데스까"}
      ]
    }
  ];

  const getFilteredPhrases = () => {
    if (activeTab === 'favorites') {
      // 즐겨찾기 탭: 모든 카테고리에서 즐겨찾기 항목 가져오기
      const allFavorites: { phrase: PhraseItem; category: string }[] = [];
      phrases.forEach(cat => {
        cat.items.forEach(item => {
          if (favorites.has(JSON.stringify(item))) {
            allFavorites.push({ phrase: item, category: cat.category });
          }
        });
      });
      return allFavorites;
    }
    
    // 전체 표현 탭: 현재 카테고리의 항목만
    const currentCategory = phrases.find(cat => cat.category === selectedCategory);
    if (!currentCategory) return [];
    return currentCategory.items.map(item => ({ phrase: item, category: currentCategory.category }));
  };

  const toggleFavorite = (phrase: PhraseItem) => {
    const key = JSON.stringify(phrase);
    const newFavorites = new Set(favorites);
    if (newFavorites.has(key)) {
      newFavorites.delete(key);
    } else {
      newFavorites.add(key);
    }
    setFavorites(newFavorites);
  };

  const isFavorite = (phrase: PhraseItem) => {
    return favorites.has(JSON.stringify(phrase));
  };

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
            <p className="text-[#C9A961] text-xs tracking-[0.3em] uppercase font-light">Japanese Phrases</p>
          </div>
          <h1 className="text-2xl mb-1 tracking-tight">일본어 회화</h1>
          <p className="text-white/60 text-sm font-light">여행 필수 표현 70개</p>
        </motion.div>

        {/* All/Favorites Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-3 mt-5"
        >
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-3 rounded-xl text-sm transition-all relative overflow-hidden ${
              activeTab === 'all'
                ? 'gold-metallic text-white shadow-lg'
                : 'bg-gradient-to-br from-white/10 to-white/5 text-white/70 border border-white/10'
            }`}
          >
            {activeTab === 'all' && <div className="gold-shine absolute inset-0"></div>}
            <span className="relative z-10">전체 표현</span>
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-3 rounded-xl text-sm transition-all relative overflow-hidden ${
              activeTab === 'favorites'
                ? 'gold-metallic text-white shadow-lg'
                : 'bg-gradient-to-br from-white/10 to-white/5 text-white/70 border border-white/10'
            }`}
          >
            {activeTab === 'favorites' && <div className="gold-shine absolute inset-0"></div>}
            <span className="relative z-10">
              <Star className="w-4 h-4 inline mr-1" />
              즐겨찾기 ({favorites.size})
            </span>
          </button>
        </motion.div>

        {/* Category Tabs */}
        {activeTab === 'all' && (
          <div className="mt-4 overflow-x-auto pb-1 scrollbar-hide">
            <div className="flex gap-2">
              {phrases.map((cat) => (
                <motion.button
                  key={cat.category}
                  onClick={() => setSelectedCategory(cat.category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm transition-all relative overflow-hidden ${
                    selectedCategory === cat.category
                      ? 'gold-metallic text-white shadow-lg'
                      : 'bg-gradient-to-br from-white/10 to-white/5 text-white/70 border border-white/10'
                  }`}
                >
                  {selectedCategory === cat.category && <div className="gold-shine absolute inset-0"></div>}
                  <span className="relative z-10">
                    <span className="mr-2">{cat.icon}</span>
                    {cat.category}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-6 pt-6">
        {/* Phrases List */}
        <div className="space-y-3">
          {getFilteredPhrases().length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Star className="w-12 h-12 text-white/30 mx-auto mb-3" />
              <p className="text-white/60 text-sm">즐겨찾기한 표현이 없습니다</p>
            </motion.div>
          ) : (
            getFilteredPhrases().map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setSelectedPhrase(item.phrase);
                  setSelectedPhraseCategory(item.category);
                }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 cursor-pointer hover:from-white/15 hover:to-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-light">{item.phrase.kr}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const utterance = new SpeechSynthesisUtterance(item.phrase.jp);
                        utterance.lang = 'ja-JP';
                        utterance.rate = 0.8;
                        speechSynthesis.speak(utterance);
                      }}
                      className="w-9 h-9 rounded-lg gold-metallic flex items-center justify-center hover:scale-110 transition-transform shadow-lg relative overflow-hidden"
                    >
                      <div className="gold-shine absolute inset-0"></div>
                      <Volume2 className="w-4 h-4 text-white relative z-10 drop-shadow-lg" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.phrase);
                      }}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center hover:scale-110 transition-transform ${
                        isFavorite(item.phrase)
                          ? 'bg-yellow-500/20 border border-yellow-500/30'
                          : 'bg-white/10 border border-white/10'
                      }`}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isFavorite(item.phrase) ? 'fill-yellow-400 text-yellow-400' : 'text-white/70'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <p className="text-white/70 text-sm mb-1">{item.phrase.jp}</p>
                <p className="text-white/50 text-xs font-light">{item.phrase.roman}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Phrase Detail Modal */}
      <AnimatePresence>
        {selectedPhrase && (
          <PhraseDetailModal
            phrase={selectedPhrase}
            category={selectedPhraseCategory}
            onClose={() => setSelectedPhrase(null)}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite(selectedPhrase)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}