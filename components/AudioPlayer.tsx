import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Info,
  Music,
  Download,
} from "lucide-react";
import { Slider } from "./ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface AudioPlayerProps {
  src: string;
  title?: string;
}

export function AudioPlayer({ src, title = "다카마쓰 트립 2026" }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showInfoDialog, setShowInfoDialog] = useState(false);

  // 오디오 메타데이터 로드
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // 재생/일시정지 토글
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 시간 포맷팅
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 진행 바 변경
  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  // 음원 다운로드
  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("다운로드 실패:", error);
    }
  };


  // 10초 앞으로/뒤로
  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + 10, duration);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl gold-metallic flex items-center justify-center shadow-xl relative overflow-hidden">
          <div className="gold-shine absolute inset-0"></div>
          <Music className="w-6 h-6 text-white drop-shadow-lg relative z-10" />
        </div>
        <h2 className="text-white text-lg font-light">여행 음악</h2>
      </div>

      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
        {/* 제목 */}
        <div className="mb-5">
          <p className="text-white text-base font-medium mb-2 tracking-wide">{title}</p>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C9A961]/40 to-transparent"></div>
        </div>

        {/* 진행 바 */}
        <div className="mb-5">
          <div className="relative mb-3 group">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="[&_[data-slot=slider-track]]:h-1.5 [&_[data-slot=slider-track]]:bg-white/10 [&_[data-slot=slider-range]]:bg-gradient-to-r from-[#C9A961] via-[#D4B976] to-[#C9A961] [&_[data-slot=slider-thumb]]:w-4 [&_[data-slot=slider-thumb]]:h-4 [&_[data-slot=slider-thumb]]:bg-[#C9A961] [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-white/30 [&_[data-slot=slider-thumb]]:ring-2 [&_[data-slot=slider-thumb]]:ring-[#C9A961]/30 [&_[data-slot=slider-thumb]]:shadow-lg hover:[&_[data-slot=slider-thumb]]:scale-110 transition-transform"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/70 text-xs font-medium tabular-nums">
              {formatTime(currentTime)}
            </span>
            <span className="text-white/70 text-xs font-medium tabular-nums">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* 컨트롤 버튼들 */}
        <div className="flex items-center justify-center gap-3 mb-4">
          {/* 정보 버튼 */}
          <motion.button
            onClick={() => setShowInfoDialog(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all border border-white/5"
            title="음악 정보"
          >
            <Info className="w-4 h-4 text-white/80" />
          </motion.button>

          {/* 뒤로 10초 */}
          <motion.button
            onClick={skipBackward}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all border border-white/5"
          >
            <SkipBack className="w-4 h-4 text-white/80" />
          </motion.button>

          {/* 재생/일시정지 */}
          <motion.button
            onClick={togglePlayPause}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-2xl gold-metallic flex items-center justify-center shadow-xl relative overflow-hidden border-2 border-white/20"
          >
            <div className="gold-shine absolute inset-0"></div>
            {isPlaying ? (
              <Pause className="w-7 h-7 text-white relative z-10 drop-shadow-lg" />
            ) : (
              <Play className="w-7 h-7 text-white relative z-10 drop-shadow-lg ml-0.5" />
            )}
          </motion.button>

          {/* 앞으로 10초 */}
          <motion.button
            onClick={skipForward}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all border border-white/5"
          >
            <SkipForward className="w-4 h-4 text-white/80" />
          </motion.button>

          {/* 다운로드 버튼 */}
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all border border-white/5"
            title="음원 다운로드"
          >
            <Download className="w-4 h-4 text-white/80" />
          </motion.button>
        </div>

        {/* 재생 상태 표시 */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full bg-[#C9A961] shadow-[0_0_8px_rgba(201,169,97,0.6)]"
            />
            <span className="text-white/70 text-xs font-medium">
              재생 중
            </span>
          </motion.div>
        )}

        {/* 숨겨진 오디오 엘리먼트 */}
        <audio ref={audioRef} src={src} preload="metadata" />
      </div>

      {/* 정보 다이얼로그 */}
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="bg-gradient-to-br from-[#1a2028] to-[#0F1419] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-medium mb-2">
              음악 정보
            </DialogTitle>
            <DialogDescription className="text-white/80 text-sm leading-relaxed">
              2026년 연세대 산업공학과 시스템 인텔리전스 랩의 다카마쓰 여행을 맞이해서 발표한 남성 래퍼와 여자 보컬의 설레는 여행의 느낌을 담은 신곡
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

