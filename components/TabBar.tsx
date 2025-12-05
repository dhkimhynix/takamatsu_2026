import { motion } from 'motion/react';
import {
  Home,
  Calendar,
  Languages,
  CheckSquare,
  User,
} from "lucide-react";

interface TabBarProps {
  activeTab:
    | "onboarding"
    | "overview"
    | "itinerary"
    | "japanese"
    | "checklist"
    | "mypage";
  onTabChange: (
    tab:
      | "onboarding"
      | "overview"
      | "itinerary"
      | "japanese"
      | "checklist"
      | "mypage",
  ) => void;
}

export function TabBar({
  activeTab,
  onTabChange,
}: TabBarProps) {
  const tabs = [
    { id: "overview" as const, icon: Home, label: "홈" },
    { id: "itinerary" as const, icon: Calendar, label: "일정" },
    { id: "japanese" as const, icon: Languages, label: "회화" },
    {
      id: "checklist" as const,
      icon: CheckSquare,
      label: "체크",
    },
    { id: "mypage" as const, icon: User, label: "마이" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0F1419] via-[#1a2028]/95 to-transparent backdrop-blur-xl border-t border-white/5 z-50 safe-area-bottom shadow-2xl">
      <div className="max-w-[430px] mx-auto flex justify-around items-center h-20 px-2 relative">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex flex-col items-center justify-center gap-1.5 flex-1 py-2 transition-all duration-300"
            >
              {/* Active Background */}
              {isActive && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-gradient-to-t from-[#C9A961]/10 to-transparent rounded-2xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Icon */}
              <div className="relative">
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-[#C9A961] to-[#D4B976] rounded-xl blur-lg opacity-40"
                  />
                )}
                <motion.div
                  animate={{
                    y: isActive ? -2 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`relative p-2 rounded-xl transition-all duration-300 ${
                    isActive 
                      ? "bg-gradient-to-br from-[#C9A961] to-[#D4B976] shadow-lg" 
                      : "bg-transparent"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/40"
                    }`}
                  />
                </motion.div>
              </div>

              {/* Label */}
              <motion.span
                animate={{
                  scale: isActive ? 1 : 0.95,
                  fontWeight: isActive ? 500 : 400,
                }}
                className={`text-xs transition-colors duration-300 relative z-10 ${
                  isActive ? "text-[#C9A961]" : "text-white/60"
                }`}
              >
                {tab.label}
              </motion.span>

              {/* Active Indicator Dot */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 w-1 h-1 bg-gradient-to-r from-[#C9A961] to-[#D4B976] rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}