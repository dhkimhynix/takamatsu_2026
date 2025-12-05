import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { OverviewScreen } from './components/OverviewScreen';
import { ItineraryScreen, PlaceDetail } from './components/ItineraryScreen';
import { JapaneseScreen } from './components/JapaneseScreen';
import { ChecklistScreen } from './components/ChecklistScreen';
import { MyPageScreen } from './components/MyPageScreen';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { TabBar } from './components/TabBar';

type Screen = 'onboarding' | 'overview' | 'itinerary' | 'japanese' | 'checklist' | 'mypage';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetail | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleStartJourney = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen('overview');
  };

  const handleViewItinerary = () => {
    setCurrentScreen('itinerary');
  };

  const handleTabChange = (tab: Screen) => {
    if (tab !== 'onboarding') {
      setCurrentScreen(tab);
    }
  };

  // 탭 변경 시 스크롤 위치를 맨 위로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  const handlePlaceClick = (place: PlaceDetail) => {
    setSelectedPlace(place);
  };

  const handleClosePlaceModal = () => {
    setSelectedPlace(null);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#0F1419] via-[#1a2028] to-[#0F1419]">
      <div className="max-w-[430px] mx-auto relative min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1a2028] to-[#0F1419] overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentScreen === 'onboarding' && !hasCompletedOnboarding && (
            <OnboardingScreen key="onboarding" onStart={handleStartJourney} />
          )}
        </AnimatePresence>

        {hasCompletedOnboarding && (
          <>
            <div className="min-h-screen">
              {currentScreen === 'overview' && (
                <OverviewScreen onViewItinerary={handleViewItinerary} />
              )}
              {currentScreen === 'itinerary' && (
                <ItineraryScreen onPlaceClick={handlePlaceClick} />
              )}
              {currentScreen === 'japanese' && <JapaneseScreen />}
              {currentScreen === 'checklist' && <ChecklistScreen />}
              {currentScreen === 'mypage' && <MyPageScreen />}
            </div>

            <TabBar activeTab={currentScreen} onTabChange={handleTabChange} />
          </>
        )}

        {/* Place Detail Modal */}
        <PlaceDetailModal place={selectedPlace} onClose={handleClosePlaceModal} />
      </div>
    </div>
  );
}