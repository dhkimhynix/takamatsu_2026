import { motion } from "motion/react";
import { Plane, Calendar } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface OnboardingScreenProps {
  onStart: () => void;
}

export function OnboardingScreen({
  onStart,
}: OnboardingScreenProps) {
  return (
    <div className="h-screen bg-[#0F1419] relative overflow-hidden scrollbar-hide">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1555284859-3de6f0646424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bnNldCUyMGphcGFuJTIwY2luZW1hdGljfGVufDF8fHx8MTc2NDc1MzgyNHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1419]/80 via-[#0F1419]/60 to-[#0F1419]/90"></div>
        <div className="absolute inset-0 film-grain opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-8 pb-12">
        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="pt-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                duration: 1,
                delay: 0.5,
              }}
              className="relative w-12 h-12 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 gold-metallic"></div>
              <div className="gold-shine absolute inset-0"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Plane className="w-6 h-6 text-white drop-shadow-lg" />
              </div>
            </motion.div>
            <div className="h-px flex-1 bg-gradient-to-r from-[#C9A961]/50 to-transparent"></div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-[#C9A961] text-sm tracking-[0.4em] uppercase mb-4 font-light"
          >
            2026 Winter Travel
          </motion.p>
        </motion.div>

        {/* Center Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 flex items-center"
        >
          <div>
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-white text-5xl leading-tight mb-6 tracking-tight"
            >
              2026년 2월
              <br />
              연세대학교 S.I.L
              <br />
              다카마쓰 여행
              <br />
              <span className="text-[#C9A961] font-light">
                3박 4일
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-white/70 text-lg mb-8 leading-relaxed font-light"
            >
              예술과 자연을 만나는
              <br />
              시코쿠지역 프리미엄 여행
            </motion.p>

            {/* Date Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mb-8"
            >
              <Calendar className="w-5 h-5 text-[#C9A961]" />
              <span className="text-white text-sm font-light">
                2026년 2월 2일 (월) ~ 5일 (목)
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="w-full gold-metallic text-white py-5 rounded-2xl shadow-2xl overflow-hidden relative"
          >
            <div className="gold-shine absolute inset-0"></div>
            <span className="relative z-10 text-lg tracking-wider drop-shadow-lg">
              여행 시작하기
            </span>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-white/50 text-xs text-center mt-6 font-light tracking-wide"
          >
            Designed by D.H.KIM
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}