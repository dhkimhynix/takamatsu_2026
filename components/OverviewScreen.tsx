import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  Plane,
  Hotel,
  Camera,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface OverviewScreenProps {
  onViewItinerary: () => void;
}

export function OverviewScreen({
  onViewItinerary,
}: OverviewScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1a2028] to-[#0F1419] pb-24 scrollbar-hide overflow-y-auto">
      {/* Premium Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1555284859-3de6f0646424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bnNldCUyMGphcGFuJTIwY2luZW1hdGljfGVufDF8fHx8MTc2NDc1MzgyNHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0F1419]"></div>
        <div className="absolute inset-0 film-grain opacity-20"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-6">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#C9A961]" />
              <p className="text-[#C9A961] text-xs tracking-[0.3em] uppercase font-light">
                Shikoku Premium Journey
              </p>
            </div>

            <h1 className="text-white text-4xl mb-4 leading-tight tracking-tight drop-shadow-2xl">
              2026년 2월
              <br />
              연세대학교 S.I.L
              <br />
              다카마쓰 여행
            </h1>

            <p className="text-white/70 text-sm mb-6 font-light leading-relaxed">
              예술섬과 자연이 만드는
              <br />
              완벽한 조화의 여정
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Calendar className="w-3.5 h-3.5 text-[#C9A961]" />
                <span className="text-white/90 text-xs">
                  3박 4일
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <MapPin className="w-3.5 h-3.5 text-[#C9A961]" />
                <span className="text-white/90 text-xs">
                  시코쿠지역 · 다카마쓰
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 pt-8 space-y-6">
        {/* Quick Info Cards */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            <div className="w-10 h-10 rounded-xl gold-metallic flex items-center justify-center mb-2 relative overflow-hidden">
              <div className="gold-shine absolute inset-0"></div>
              <Plane className="w-5 h-5 text-white relative z-10 drop-shadow-lg" />
            </div>
            <p className="text-white/50 text-xs mb-1">출발</p>
            <p className="text-white text-sm">2월 2일 (월)</p>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            <div className="w-10 h-10 rounded-xl gold-metallic flex items-center justify-center mb-2 relative overflow-hidden">
              <div className="gold-shine absolute inset-0"></div>
              <Hotel className="w-5 h-5 text-white relative z-10 drop-shadow-lg" />
            </div>
            <p className="text-white/50 text-xs mb-1">숙박</p>
            <p className="text-white text-sm">3박 4일</p>
          </div>
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            <div className="w-10 h-10 rounded-xl gold-metallic flex items-center justify-center mb-2 relative overflow-hidden">
              <div className="gold-shine absolute inset-0"></div>
              <Camera className="w-5 h-5 text-white relative z-10 drop-shadow-lg" />
            </div>
            <p className="text-white/50 text-xs mb-1">명소</p>
            <p className="text-white text-sm">15곳+</p>
          </div>
        </motion.div>

        {/* Highlights Section */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-xl">
              여행 하이라이트
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[#C9A961]/40 to-transparent ml-4"></div>
          </div>

          <div className="space-y-3">
            {/* Highlight Card 1 - Day 1 */}
            <div className="relative h-40 rounded-2xl overflow-hidden group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1644413239414-33a8bf405db9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRlbXBsZSUyMHNocmluZXxlbnwxfHx8fDE3NjQ3NjU1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="곤피라궁"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 film-grain opacity-15"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-1 rounded-full bg-[#C9A961]"></div>
                  <p className="text-[#C9A961] text-xs uppercase tracking-wider">
                    Day 1
                  </p>
                </div>
                <h3 className="text-white text-lg mb-1">
                  곤피라궁
                </h3>
                <p className="text-white/70 text-xs font-light">
                  785개 계단으로 이어지는 신성한 여정
                </p>
              </div>
            </div>

            {/* Highlight Card 2 - Day 2 */}
            <div className="relative h-40 rounded-2xl overflow-hidden group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1722228097356-bd0202d99367?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGl2ZSUyMGdyb3ZlJTIwbWVkaXRlcnJhbmVhbnxlbnwxfHx8fDE3NjQ3NTM4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="쇼도시마"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 film-grain opacity-15"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-1 rounded-full bg-[#C9A961]"></div>
                  <p className="text-[#C9A961] text-xs uppercase tracking-wider">
                    Day 2
                  </p>
                </div>
                <h3 className="text-white text-lg mb-1">
                  쇼도시마 올리브공원
                </h3>
                <p className="text-white/70 text-xs font-light">
                  지중해를 닮은 일본의 숨겨진 보석
                </p>
              </div>
            </div>

            {/* Highlight Card 3 - Day 3 */}
            <div className="relative h-40 rounded-2xl overflow-hidden group">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1667396543485-92c13ffd69f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5lc3NlJTIwYXJ0JTIwbXVzZXVtJTIwbmFvc2hpbWF8ZW58MXx8fHwxNzY0ODM4OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="나오시마"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 film-grain opacity-15"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-1 rounded-full bg-[#C9A961]"></div>
                  <p className="text-[#C9A961] text-xs uppercase tracking-wider">
                    Day 3
                  </p>
                </div>
                <h3 className="text-white text-lg mb-1">
                  나오시마 예술섬
                </h3>
                <p className="text-white/70 text-xs font-light">
                  안도 타다오의 건축과 현대미술의 만남
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={onViewItinerary}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-5 rounded-2xl shadow-2xl flex items-center justify-center gap-3 group relative overflow-hidden gold-metallic"
        >
          <div className="gold-shine absolute inset-0"></div>
          <span className="relative z-10 text-lg text-white drop-shadow-lg">
            전체 일정 보기
          </span>
          <ArrowRight className="w-5 h-5 relative z-10 text-white transition-transform group-hover:translate-x-1" />
        </motion.button>

        {/* Info Cards */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-5 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#C9A961]/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-[#C9A961]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-1">
                  여행 인원 : 17명
                </h3>
                <p className="text-white/60 text-sm font-light">
                  김창욱 교수님과 SIL 연구실 구성원
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-5 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#C9A961]/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#C9A961]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-1">
                  주요 방문지 : 시코쿠 지역
                </h3>
                <p className="text-white/60 text-sm font-light">
                  다카마쓰 · 쇼도시마 · 나오시마
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl p-5 border border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#C9A961]/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-[#C9A961]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white mb-1">특별한 경험</h3>
                <p className="text-white/60 text-sm font-light">
                  현대미술 · 온천 · 전통문화 · 자연경관
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}