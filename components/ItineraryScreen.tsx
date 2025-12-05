import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TimelineCard } from "./TimelineCard";
import { ChevronUp } from "lucide-react";

interface ItineraryScreenProps {
  onPlaceClick: (place: PlaceDetail) => void;
}

export interface PlaceDetail {
  name: string;
  description: string;
  image: string;
  location: string;
  tags: string[];
}

export function ItineraryScreen({
  onPlaceClick,
}: ItineraryScreenProps) {
  const [activeDay, setActiveDay] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);

  const days = [
    {
      day: 1,
      date: "2월 2일 (월)",
      highlight: "다카마쓰 도착",
      activities: [
        {
          time: "08:45",
          title: "인천공항 출발",
          description: "에어서울 RS741편",
          image:
            "https://images.unsplash.com/photo-1634557250864-148750dd4d1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGRlcGFydHVyZSUyMGFpcnBvcnR8ZW58MXx8fHwxNzY0ODM4MjEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["출발"],
          location: "인천국제공항",
        },
        {
          time: "10:30",
          title: "다카마쓰공항 도착",
          description: "입국 후 전용버스 미팅",
          image:
            "https://images.unsplash.com/photo-1665946460052-ccebf469ac31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwYXJyaXZhbCUyMHRlcm1pbmFsfGVufDF8fHx8MTc2NDgzODIxMXww&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["도착"],
          location: "다카마쓰 공항",
        },
        {
          time: "11:00",
          title: "리츠린공원",
          description:
            "일본 3대 정원 중 하나. 에도시대 다이묘 정원의 아름다움",
          image:
            "https://images.unsplash.com/photo-1759301248923-96589a0e6628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGdhcmRlbiUyMHBvbmQlMjBjaW5lbWF0aWN8ZW58MXx8fHwxNzY0NzUzODIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["정원", "포토존", "자연"],
          location: "리츠린공원",
        },
        {
          time: "12:30",
          title: "야시마 전망대",
          description: "세토나이카이의 절경을 한눈에",
          image:
            "https://images.unsplash.com/photo-1555284859-3de6f0646424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bnNldCUyMGphcGFuJTIwY2luZW1hdGljfGVufDF8fHx8MTc2NDc1MzgyNHww&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["전망", "자연"],
          location: "야시마 전망대",
        },
        {
          time: "13:00",
          title: "야시마 다카라베키",
          description: "전통 기념품샵 및 특산물 쇼핑",
          image:
            "https://images.unsplash.com/photo-1747014914522-2777a6947b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMGphcGFuJTIwc291dmVuaXJ8ZW58MXx8fHwxNzY0ODM4MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["쇼핑"],
          location: "야시마 다카라베키",
        },
        {
          time: "13:30",
          title: "중식",
          description: "현지식 (포함)",
          image:
            "https://images.unsplash.com/photo-1711010345222-cbb7aa69dd16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRyYWRpdGlvbmFsJTIwbWVhbHxlbnwxfHx8fDE3NjQ4MzgyMTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["식사"],
          location: "다카마쓰시",
        },
        {
          time: "14:30",
          title: "사누키 영업 전망대",
          description: "360도 파노라마 뷰",
          image:
            "https://images.unsplash.com/photo-1555284859-3de6f0646424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bnNldCUyMGphcGFuJTIwY2luZW1hdGljfGVufDF8fHx8MTc2NDc1MzgyNHww&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["전망"],
          location: "사누키 영업 전망대",
        },
        {
          time: "15:30",
          title: "고토히라 이동",
          description: "전용버스",
          image:
            "https://images.unsplash.com/photo-1756723701257-46513cd36fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXMlMjB0cmFuc3BvcnRhdGlvbnxlbnwxfHx8fDE3NjQ4MzgyMTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["이동"],
          location: "고토히라",
        },
        {
          time: "16:30",
          title: "곤피라궁 투어",
          description: "785개 계단으로 이어지는 신성한 신사",
          image:
            "https://images.unsplash.com/photo-1644413239414-33a8bf405db9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRlbXBsZSUyMHNocmluZXxlbnwxfHx8fDE3NjQ3NjU1NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["신사", "문화", "전통"],
          location: "곤피라궁",
        },
        {
          time: "18:00",
          title: "코토히라 온천 코바이테이 호텔 체크인",
          description: "전통 온천 료칸",
          image:
            "https://images.unsplash.com/photo-1758448500688-3ababa93fd67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGNoZWNrJTIwaW4lMjBsdXh0cnl8ZW58MXx8fHwxNzY0ODM4MjEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["숙박", "온천"],
          location: "코토히라 온천 코바이테이 호텔",
        },
        {
          time: "18:30",
          title: "자유식",
          description: "1,000엔 지급",
          image:
            "https://images.unsplash.com/photo-1679279726946-a158b8bcaa23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWlzZW5kb24lMjBqYXBhbmVzZSUyMHNlYWZvb2QlMjByaWNlJTIwYm93bHxlbnwxfHx8fDE3NjQ4NTMwODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["식사", "카이센동"],
          location: "고토히라",
        },
        {
          time: "20:00",
          title: "자유시간",
          description: "온천욕 및 휴식",
          image:
            "https://images.unsplash.com/photo-1764057146191-ffbdc2c9c687?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMG9uc2VuJTIwb3V0ZG9vciUyMGhvdCUyMHNwcmluZ3xlbnwxfHx8fDE3NjQ4Mzk2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["온천", "휴식"],
          location: "코토히라 온천 코바이테이 호텔",
        },
      ],
    },
    {
      day: 2,
      date: "2월 3일 (화)",
      highlight: "쇼도시마 투어",
      activities: [
        {
          time: "08:00",
          title: "조식",
          description: "호텔식 (포함)",
          image:
            "https://images.unsplash.com/photo-1722477936580-84aa10762b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBob3RlbCUyMGJ1ZmZldHxlbnwxfHx8fDE3NjQ4MzgyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["식사"],
          location: "코토히라 온천 코바이테이 호텔",
        },
        {
          time: "08:30",
          title: "다카마쓰항 이동",
          description: "전용버스",
          image:
            "https://images.unsplash.com/photo-1756723701257-46513cd36fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXMlMjB0cmFuc3BvcnRhdGlvbnxlbnwxfHx8fDE3NjQ4MzgyMTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["이동"],
          location: "다카마쓰항",
        },
        {
          time: "09:30",
          title: "페리 탑승",
          description: "쇼도시마로 이동",
          image:
            "https://images.unsplash.com/photo-1751412189089-5f2e062e5469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyeSUyMGJvYXQlMjBvY2VhbnxlbnwxfHx8fDE3NjQ4MzgyMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["페리"],
          location: "다카마쓰항",
        },
        {
          time: "10:20",
          title: "올리브공원",
          description: "지중해 풍경의 올리브 농장과 포토존",
          image:
            "https://images.unsplash.com/photo-1722228097356-bd0202d99367?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGl2ZSUyMGdyb3ZlJTIwbWVkaXRlcnJhbmVhbnxlbnwxfHx8fDE3NjQ3NTM4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["자연", "포토존", "핫플"],
          location: "쇼도시마 올리브공원",
        },
        {
          time: "11:30",
          title: "간카케이 협곡",
          description: "로프웨이로 오르는 일본 3대 계곡 미경",
          image:
            "https://images.unsplash.com/photo-1710752968127-6290b021e68a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGdvcmdlJTIwbmF0dXJlfGVufDF8fHx8MTc2NDc1MzgyNXww&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["자연", "전망", "로프웨이"],
          location: "간카케이 쇼도시마",
        },
        {
          time: "12:30",
          title: "중식",
          description: "현지식 (포함)",
          image:
            "https://images.unsplash.com/photo-1722192966855-75aa007abe09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHN1c2hpJTIwZnJlc2h8ZW58MXx8fHwxNzY0ODUzMDgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["식사", "초밥"],
          location: "쇼도시마",
        },
        {
          time: "13:30",
          title: "24개의 눈동자 영화마을",
          description: "1950년대 일본의 향수를 느낄 수 있는 영화 세트장",
          image:
            "https://images.unsplash.com/photo-1599579086763-717c15444c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHNjaG9vbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2NDgzODIxNHww&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["영화촬영지", "레트로", "문화", "포토존"],
          location: "24개의 눈동자 영화마을",
        },
        {
          time: "15:00",
          title: "엔젤로드",
          description: "썰물 때만 나타나는 신비한 길",
          image:
            "https://images.unsplash.com/photo-1691422066850-de273fe9008d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwbGFuZHNjYXBlJTIwYmVhY2glMjBzdW5zZXR8ZW58MXx8fHwxNzY0NzUzODI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["해변", "포토존", "자연"],
          location: "엔젤로드 쇼도시마",
        },
        {
          time: "16:30",
          title: "페리 탑승",
          description: "다카마쓰항 복귀",
          image:
            "https://images.unsplash.com/photo-1751412189089-5f2e062e5469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyeSUyMGJvYXQlMjBvY2VhbnxlbnwxfHx8fDE3NjQ4MzgyMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["페리"],
          location: "쇼도시마항",
        },
        {
          time: "17:35",
          title: "다카마쓰 도착",
          image:
            "https://images.unsplash.com/photo-1665946460052-ccebf469ac31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwYXJyaXZhbCUyMHRlcm1pbmFsfGVufDF8fHx8MTc2NDgzODIxMXww&ixlib=rb-4.1.0&q=80&w=1080",
          location: "다카마쓰항",
        },
        {
          time: "18:30",
          title: "석식",
          description: "호텔식 (포함)",
          image:
            "https://images.unsplash.com/photo-1763627719029-d7122ae87e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGhvbWUlMjBjb29raW5nJTIwdGVpc2hva3V8ZW58MXx8fHwxNzY0ODUzMDgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["식사", "일본가정식"],
          location: "코토히라 온천 코바이테이 호텔",
        },
        {
          time: "20:00",
          title: "자유시간",
          description: "쇼핑, 야경, 산책",
          image:
            "https://images.unsplash.com/photo-1644949064195-e60f39dd2b3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbmlnaHQlMjB3YWxrfGVufDF8fHx8MTc2NDgzODIxNHww&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["휴식"],
          location: "고토히라",
        },
      ],
    },
    {
      day: 3,
      date: "2월 4일 (수)",
      highlight: "나오시마 예술섬",
      activities: [
        {
          time: "08:00",
          title: "조식",
          description: "호텔식 (포함)",
          image:
            "https://images.unsplash.com/photo-1722477936580-84aa10762b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBob3RlbCUyMGJ1ZmZldHxlbnwxfHx8fDE3NjQ4MzgyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["식사"],
          location: "코토히라 온천 코바이테이 호텔",
        },
        {
          time: "08:30",
          title: "다카마쓰항 이동",
          description: "전용버스",
          image:
            "https://images.unsplash.com/photo-1756723701257-46513cd36fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXMlMjB0cmFuc3BvcnRhdGlvbnxlbnwxfHx8fDE3NjQ4MzgyMTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["이동"],
          location: "다카마쓰항",
        },
        {
          time: "09:30",
          title: "페리 탑승",
          description: "나오시마로 이동",
          image:
            "https://images.unsplash.com/photo-1751412189089-5f2e062e5469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyeSUyMGJvYXQlMjBvY2VhbnxlbnwxfHx8fDE3NjQ4MzgyMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["페리"],
          location: "다카마쓰항",
        },
        {
          time: "10:20",
          title: "베네세 하우스 외부 작품",
          description: "현대미술과 자연의 조화",
          image:
            "https://images.unsplash.com/photo-1667396543485-92c13ffd69f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZW5lc3NlJTIwYXJ0JTIwbXVzZXVtJTIwbmFvc2hpbWF8ZW58MXx8fHwxNzY0ODM4OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["예술", "미술관", "건축"],
          location: "베네세 하우스 나오시마",
        },
        {
          time: "11:00",
          title: "치추 미술관 · 지중 미술관",
          description: "안도 타다오 설계, 지하에 숨겨진 미술관",
          image:
            "https://images.unsplash.com/photo-1686616099216-116637548f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGljaHUlMjBhcnQlMjBtdXNldW0lMjB0YWRhbyUyMGFuZG98ZW58MXx8fHwxNzY0ODM4OTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["예술", "건축", "안도타다오"],
          location: "치추 미술관 나오시마",
        },
        {
          time: "12:00",
          title: "중식 (자유식)",
          description: "패키지 비용 불포함",
          image:
            "https://images.unsplash.com/photo-1608855815815-4edc035e39ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHlha2luaWt1JTIwZ3JpbGxlZCUyMG1lYXR8ZW58MXx8fHwxNzY0ODUzNDI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["식사", "야키니쿠"],
          location: "나오시마",
        },
        {
          time: "14:00",
          title: "레드 펌킨",
          description: "쿠사마 야요이의 상징적인 호박 조형물",
          image:
            "https://images.unsplash.com/photo-1762776639828-bb304c9acb6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBwdW1wa2luJTIwc2N1bHB0dXJlJTIwYXJ0fGVufDF8fHx8MTc2NDg0OTA2MHww&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["예술", "포토존", "핫플"],
          location: "레드 펌킨 나오시마",
        },
        {
          time: "15:30",
          title: "이우환 미술관",
          description: "안도 타다오 프로젝트",
          image:
            "https://images.unsplash.com/photo-1645986321095-e2b0cc845c9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBtdXNldW0lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQ4Mzg5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["예술", "미술관"],
          location: "이우환 미술관 나오시마",
        },
        {
          time: "17:00",
          title: "페리 탑승",
          description: "다카마쓰항 복귀",
          image:
            "https://images.unsplash.com/photo-1751412189089-5f2e062e5469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyeSUyMGJvYXQlMjBvY2VhbnxlbnwxfHx8fDE3NjQ4MzgyMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["페리"],
          location: "나오시마항",
        },
        {
          time: "18:00",
          title: "다카마쓰 도착",
          image:
            "https://images.unsplash.com/photo-1665946460052-ccebf469ac31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwYXJyaXZhbCUyMHRlcm1pbmFsfGVufDF8fHx8MTc2NDgzODIxMXww&ixlib=rb-4.1.0&q=80&w=1080",
          location: "다카마쓰항",
        },
        {
          time: "18:30",
          title: "석식",
          description: "호텔식 (포함)",
          image:
            "https://images.unsplash.com/photo-1742968922494-d464972b81a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWlzZWtpJTIwcnlvcmklMjBqYXBhbmVzZSUyMGN1aXNpbmV8ZW58MXx8fHwxNzY0ODUzMDgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["식사", "가이세키"],
          location: "다이와로이넷 호텔",
        },
        {
          time: "20:00",
          title: "자유시간",
          description: "호텔 휴식 또는 온천",
          image:
            "https://images.unsplash.com/photo-1761585455811-6d4d232ddf52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGNvbnZlbmllbmNlJTIwc3RvcmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjQ4NTMwODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["편의점", "쇼핑"],
          location: "다이와로이넷 호텔",
        },
      ],
    },
    {
      day: 4,
      date: "2월 5일 (목)",
      highlight: "귀국",
      activities: [
        {
          time: "08:00",
          title: "조식 후 체크아웃",
          description: "호텔식 (포함)",
          image:
            "https://images.unsplash.com/photo-1722477936580-84aa10762b0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBob3RlbCUyMGJ1ZmZldHxlbnwxfHx8fDE3NjQ4MzgyMTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["식사"],
          location: "다이와로이넷 호텔",
        },
        {
          time: "09:00",
          title: "공항 이동",
          description: "전용버스",
          image:
            "https://images.unsplash.com/photo-1756723701257-46513cd36fc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXMlMjB0cmFuc3BvcnRhdGlvbnxlbnwxfHx8fDE3NjQ4MzgyMTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["이동"],
          location: "다카마쓰 공항",
        },
        {
          time: "11:35",
          title: "다카마쓰공항 출발",
          description: "에어서울 RS742편",
          image:
            "https://images.unsplash.com/photo-1634557250864-148750dd4d1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGRlcGFydHVyZSUyMGFpcnBvcnR8ZW58MXx8fHwxNzY0ODM4MjEwfDA&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["출발"],
          location: "다카마쓰 공항",
        },
        {
          time: "13:20",
          title: "인천공항 도착",
          description: "즐거운 여행을 마치며",
          image:
            "https://images.unsplash.com/photo-1665946460052-ccebf469ac31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwYXJyaXZhbCUyMHRlcm1pbmFsfGVufDF8fHx8MTc2NDgzODIxMXww&ixlib=rb-4.1.0&q=80&w=1080",
          tags: ["도착"],
          location: "인천국제공항",
        },
      ],
    },
  ];

  // Scroll-based day detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      // Show/hide top button
      setShowTopButton(window.scrollY > 300);

      // Find active day based on scroll position
      for (let i = dayRefs.current.length - 1; i >= 0; i--) {
        const dayElement = dayRefs.current[i];
        if (
          dayElement &&
          dayElement.offsetTop <= scrollPosition
        ) {
          setActiveDay(i);
          break;
        }
      }
    };

    const currentRef = dayRefs.current;
    if (currentRef) {
      window.addEventListener("scroll", handleScroll);
      return () =>
        window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToDay = (index: number) => {
    const dayElement = dayRefs.current[index];
    if (dayElement) {
      const offsetTop = dayElement.offsetTop - 180;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1419] via-[#1a2028] to-[#0F1419] pb-24">
      {/* Premium Minimal Header - Sticky */}
      <div className="bg-gradient-to-br from-[#0F1419] via-[#1a2028] to-[#0F1419] text-white pt-10 pb-6 px-6 sticky top-0 z-30 border-b border-white/5 shadow-2xl backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-6 bg-[#C9A961]"></div>
            <p className="text-[#C9A961] text-xs tracking-[0.3em] uppercase font-light">
              Travel Schedule
            </p>
          </div>
          <h1 className="text-2xl mb-1 tracking-tight">
            여행 일정
          </h1>
          <p className="text-white/60 text-sm font-light">
            4일간의 롯데관광 패키지 투어 일정
          </p>
        </motion.div>

        {/* Day Navigation Pills - Enhanced */}
        <div className="flex gap-2 mt-5 overflow-x-auto pb-1 scrollbar-hide">
          {days.map((day, index) => (
            <motion.button
              key={day.day}
              onClick={() => scrollToDay(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all duration-500 overflow-hidden ${
                activeDay === index
                  ? "text-white shadow-xl gold-metallic"
                  : "bg-white/10 text-white/70 backdrop-blur-sm hover:bg-white/15"
              }`}
            >
              {activeDay === index && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 gold-shine"
                  transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              )}
              <span className="relative z-10 font-medium">
                Day {day.day}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Days Content */}
      <div className="px-6">
        {days.map((currentDay, dayIndex) => (
          <div
            key={currentDay.day}
            ref={(el) => (dayRefs.current[dayIndex] = el)}
            className="pt-10 pb-16"
          >
            {/* Day Header - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 gold-metallic rounded-2xl blur-xl opacity-50"></div>
                  <div className="relative w-16 h-16 rounded-2xl gold-metallic flex items-center justify-center shadow-2xl overflow-hidden">
                    <div className="gold-shine absolute inset-0"></div>
                    <span className="text-white text-2xl font-light relative z-10 drop-shadow-lg">
                      {currentDay.day}
                    </span>
                  </div>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-white/60 text-sm mb-1 font-light tracking-wide">
                    {currentDay.date}
                  </p>
                  <h2 className="text-white text-2xl tracking-tight">
                    {currentDay.highlight}
                  </h2>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-[#C9A961]/60 via-[#C9A961]/30 to-transparent"></div>
            </motion.div>

            {/* Timeline */}
            <div className="space-y-6">
              {currentDay.activities.map((activity, index) => (
                <TimelineCard
                  key={index}
                  index={index}
                  dayNumber={currentDay.day}
                  time={activity.time}
                  title={activity.title}
                  description={activity.description}
                  image={activity.image}
                  tags={activity.tags}
                  location={activity.location}
                  onClick={
                    activity.image
                      ? () =>
                          onPlaceClick({
                            name: activity.title,
                            description:
                              activity.description || "",
                            image: activity.image!,
                            location:
                              activity.location || "시코쿠",
                            tags: activity.tags || [],
                          })
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to Top Button - Enhanced */}
      <AnimatePresence>
        {showTopButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-28 right-6 w-14 h-14 bg-gradient-to-br from-[#0F1419] via-[#1a2028] to-[#0F1419] text-white rounded-2xl shadow-2xl flex items-center justify-center z-40 backdrop-blur-sm border border-white/10"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}