
import { User, Shield, Search, Briefcase, AlertCircle, CheckCircle2 } from "lucide-react";

export const MOCK_DETECTIVES = [
  {
    id: 1,
    name: "김철수 탐정",
    specialty: "기업 조사",
    rating: 4.9,
    cases: 120,
    status: "available",
    image: "https://images.unsplash.com/photo-1691316749874-e89297ee4cf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHByb2Zlc3Npb25hbCUyMG1hbiUyMHN1aXQlMjBkZXRlY3RpdmV8ZW58MXx8fHwxNzY0MDMzMDE4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "전직 형사 출신, 기업 내부 비리 및 산업 스파이 조사 전문입니다.",
    location: "서울 강남구",
    career: "15년",
    intro: "진실을 밝히는 것은 단순한 직업이 아닌 저의 소명입니다. 15년간의 형사 생활 노하우로 기업의 리스크를 완벽하게 제거해드립니다."
  },
  {
    id: 2,
    name: "이영희 탐정",
    specialty: "가사/민사",
    rating: 4.8,
    cases: 85,
    status: "busy",
    image: "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwc3VpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NDAzMzAxOHww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "섬세한 조사와 확실한 증거 수집. 가사 사건 및 실종자 찾기 전문.",
    location: "경기도 분당",
    career: "8년",
    intro: "의뢰인의 아픔을 내 일처럼 생각합니다. 합법적인 테두리 안에서 최대한의 증거를 확보해드립니다."
  },
  {
    id: 3,
    name: "박진호 탐정",
    specialty: "사이버/디지털",
    rating: 5.0,
    cases: 200,
    status: "available",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: "디지털 포렌식 전문가. 사이버 스토킹 및 해킹 피해 조사.",
    location: "서울 마포구",
    career: "12년",
    intro: "삭제된 데이터도, 숨겨진 흔적도 모두 찾아냅니다. 디지털 세상의 셜록 홈즈가 되어드리겠습니다."
  }
];

export const MOCK_CASES = [
  { 
    id: "C-2024-001", 
    type: "기업 조사", 
    status: "진행중", 
    client: "익명 고객 A", 
    date: "2024-05-20", 
    matchScore: 98,
    description: "사내 기밀 유출이 의심되는 정황이 포착되었습니다. 특정 부서 팀장의 외부 접속 기록과 계좌 흐름 파악이 필요합니다.",
    budget: "5,000,000원 ~ 8,000,000원",
    timeline: [
      { date: "2024-05-20", content: "의뢰 접수 및 상담 시작" },
      { date: "2024-05-21", content: "계약 체결 완료 (착수금 입금 확인)" },
      { date: "2024-05-22", content: "1차 현장 조사 시작" }
    ]
  },
  { 
    id: "C-2024-002", 
    type: "사람 찾기", 
    status: "완료", 
    client: "익명 고객 B", 
    date: "2024-05-18", 
    matchScore: 85,
    description: "20년 전 헤어진 초등학교 동창을 찾고 싶습니다.",
    budget: "1,000,000원",
    timeline: []
  },
  { 
    id: "C-2024-003", 
    type: "증거 수집", 
    status: "매칭 대기", 
    client: "익명 고객 C", 
    date: "2024-05-21", 
    matchScore: 0,
    description: "층간 소음으로 인한 피해 증거 수집",
    budget: "500,000원",
    timeline: []
  },
];

export const MOCK_STATS = [
  { label: "총 의뢰 건수", value: "1,240", icon: Briefcase, color: "text-blue-500" },
  { label: "활동 탐정", value: "48", icon: Shield, color: "text-indigo-500" },
  { label: "매칭 성공률", value: "94%", icon: CheckCircle2, color: "text-green-500" },
  { label: "긴급 요청", value: "5", icon: AlertCircle, color: "text-red-500" },
];

export const MOCK_MESSAGES = [
  { id: 1, sender: "detective", text: "안녕하세요, 의뢰주신 내용 확인했습니다. 몇 가지 추가 질문이 있어 연락드립니다.", time: "오전 10:30" },
  { id: 2, sender: "user", text: "네, 안녕하세요 탐정님. 어떤 부분이 궁금하신가요?", time: "오전 10:32" },
  { id: 3, sender: "detective", text: "말씀하신 '특정 시점'이 정확히 언제인지 알 수 있을까요?", time: "오전 10:33" },
  { id: 4, sender: "user", text: "지난 주 수요일 저녁 8시쯤이었습니다.", time: "오전 10:35" },
];

export const MOCK_REVIEWS = [
  { id: 1, user: "김**", rating: 5, date: "2024.05.15", content: "정말 막막했는데 덕분에 해결책을 찾았습니다. 친절하고 전문적이세요." },
  { id: 2, user: "P**", rating: 4, date: "2024.05.10", content: "빠른 피드백이 좋았습니다. 결과도 만족스럽네요." },
  { id: 3, user: "이**", rating: 5, date: "2024.05.01", content: "다른 곳에서는 못한다고 했는데 여기서 해결해주셨어요. 감사합니다." },
];
