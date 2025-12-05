import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Plane,
  Hotel,
  Calendar,
  Cloud,
  CloudRain,
  Sun,
  CloudSnow,
  CloudDrizzle,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";

export function MyPageScreen() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Countdown to February 2, 2026
  useEffect(() => {
    const targetDate = new Date(
      "2026-02-02T08:45:00",
    ).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
              (1000 * 60 * 60),
          ),
          minutes: Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60),
          ),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch weather data for Takamatsu
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Using open-meteo API (no API key required)
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=34.3428&longitude=134.0469&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia%2FTokyo&forecast_days=7",
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return { emoji: "☀️" };
    if (code <= 3) return { emoji: "☁️" };
    if (code <= 67) return { emoji: "🌧️" };
    if (code <= 77) return { emoji: "❄️" };
    if (code <= 99) return { emoji: "⛈️" };
    return { emoji: "☁️" };
  };

  const flightInfo = [
    {
      label: "출발",
      value: "2월 2일 (월) 08:45 인천공항 출발",
      detail: "에어서울 RS741 - 제2여객터미널 E2~E10 체크인",
    },
    {
      label: "귀국",
      value: "2월 5일 (목) 11:35 다카마쓰공항 출발",
      detail: "에어서울 RS742",
    },
  ];

  const hotelInfo = [
    {
      label: "1~2일차",
      value: "코토히라 온천 코바이테이 호텔 (혹은 동급)",
    },
    { label: "3일차", value: "다이와로이넷 호텔 다카마쓰" },
    { label: "객실", value: "트윈룸 (2인 1실)" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1a2028] to-[#0F1419] pb-24 scrollbar-hide overflow-y-auto">
      {/* Premium Header */}
      <div className="relative text-white pt-10 pb-20 px-6 overflow-hidden border-b border-white/5">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A961] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4B976] rounded-full blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-6 bg-[#C9A961]"></div>
            <p className="text-[#C9A961] text-xs tracking-[0.3em] uppercase font-light">
              My Page
            </p>
          </div>
          <h1 className="text-2xl mb-1 tracking-tight">
            마이페이지
          </h1>
          <p className="text-white/60 text-sm font-light">
            나의 여행 정보
          </p>
        </motion.div>
      </div>

      <div className="px-6 -mt-16">
        {/* Countdown Card - Metallic Gold Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl shadow-2xl p-7 mb-5 overflow-hidden gold-metallic"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Calendar className="w-6 h-6 text-white drop-shadow-lg" />
              </motion.div>
              <p className="text-white text-sm tracking-wider font-light drop-shadow-lg">
                여행 출발까지
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "일", value: countdown.days },
                { label: "시간", value: countdown.hours },
                { label: "분", value: countdown.minutes },
                { label: "초", value: countdown.seconds },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-black/50 backdrop-blur-md rounded-2xl p-3 text-center border border-white/20"
                >
                  <motion.p
                    key={item.value}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="text-white text-2xl mb-1 tabular-nums font-light drop-shadow-lg"
                  >
                    {String(item.value).padStart(2, "0")}
                  </motion.p>
                  <p className="text-white/80 text-xs font-light">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Audio Player */}
        <AudioPlayer src="/다카마쓰 트립 2026.mp3" title="다카마쓰 트립 2026" />

        {/* Weather Info - Dark Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl gold-metallic flex items-center justify-center shadow-xl relative overflow-hidden">
              <div className="gold-shine absolute inset-0"></div>
              <Cloud className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
            </div>
            <h2 className="text-white text-lg font-light">
              다카마쓰 주간 날씨
            </h2>
          </div>

          {loading ? (
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
              <p className="text-white/60 text-sm font-light">
                날씨 정보 로딩 중...
              </p>
            </div>
          ) : weather ? (
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
              <div className="grid grid-cols-7 gap-2">
                {weather.daily.time.map(
                  (date: string, index: number) => {
                    const weatherInfo = getWeatherIcon(
                      weather.daily.weathercode[index],
                    );
                    const dateObj = new Date(date);
                    const dayName = [
                      "일",
                      "월",
                      "화",
                      "수",
                      "목",
                      "금",
                      "토",
                    ][dateObj.getDay()];
                    const dateStr = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-col items-center gap-1"
                      >
                        <p className="text-white/40 text-xs font-light">
                          {dateStr}
                        </p>
                        <p className="text-white/60 text-xs font-light">
                          {dayName}
                        </p>
                        <p className="text-2xl">
                          {weatherInfo.emoji}
                        </p>
                        <p className="text-white text-sm font-light">
                          {Math.round(
                            weather.daily.temperature_2m_max[
                              index
                            ],
                          )}
                          °
                        </p>
                        <p className="text-white/60 text-xs font-light">
                          {Math.round(
                            weather.daily.temperature_2m_min[
                              index
                            ],
                          )}
                          °
                        </p>
                      </motion.div>
                    );
                  },
                )}
              </div>
              <div className="mt-3 pt-3 border-t border-white/10">
                <p className="text-white/60 text-xs font-light text-center">
                  실시간 다카마쓰 날씨 정보
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
              <p className="text-white/60 text-sm font-light">
                날씨 정보를 불러올 수 없습니다
              </p>
            </div>
          )}
        </motion.div>

        {/* Exchange Rate - Button to Naver */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl gold-metallic flex items-center justify-center shadow-xl relative overflow-hidden">
              <div className="gold-shine absolute inset-0"></div>
              <TrendingUp className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
            </div>
            <h2 className="text-white text-lg font-light">
              실시간 환율
            </h2>
          </div>

          <motion.button
            onClick={() =>
              window.open(
                "https://search.naver.com/search.naver?query=엔화+환율",
                "_blank",
              )
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C9A961]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#C9A961]" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-light mb-1">
                  네이버 엔화 환율
                </p>
                <p className="text-white/60 text-xs font-light">
                  실시간 환율 정보 확인하기
                </p>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-[#C9A961] transition-transform group-hover:translate-x-1" />
          </motion.button>
        </motion.div>

        {/* Flight Info - Dark Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl gold-metallic flex items-center justify-center shadow-xl relative overflow-hidden">
              <div className="gold-shine absolute inset-0"></div>
              <Plane className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
            </div>
            <h2 className="text-white text-lg font-light">
              항공 정보
            </h2>
          </div>

          <div className="space-y-3">
            {flightInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
              >
                <p className="text-white/60 text-xs mb-1 font-light">
                  {info.label}
                </p>
                <p className="text-white text-sm font-light mb-1">
                  {info.value}
                </p>
                <p className="text-white/70 text-xs font-light">
                  {info.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hotel Info - Dark Premium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl gold-metallic flex items-center justify-center shadow-xl relative overflow-hidden">
              <div className="gold-shine absolute inset-0"></div>
              <Hotel className="w-6 h-6 text-white relative z-10 drop-shadow-lg" />
            </div>
            <h2 className="text-white text-lg font-light">
              숙박 정보
            </h2>
          </div>

          <div className="space-y-3">
            {hotelInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
              >
                <p className="text-white/60 text-xs mb-1 font-light">
                  {info.label}
                </p>
                <p className="text-white text-sm font-light">
                  {info.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}