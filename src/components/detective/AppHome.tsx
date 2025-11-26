
import React from 'react';
import { Search, MapPin, ChevronRight, Bell, Star, Shield, AlertCircle, Clock, Briefcase, Users, Camera, Laptop, Home, Scale, Ban, Car, MoreHorizontal, HeartHandshake, Heart, Building2, FileText, Eye } from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { MOCK_DETECTIVES } from './data';

interface AppHomeProps {
  onSelectDetective: (name: string) => void;
  isGuest?: boolean;
  onStartMatching?: (categoryId?: string) => void;
}

export function AppHome({ onSelectDetective, isGuest, onStartMatching }: AppHomeProps) {

  const handleServiceCategoryClick = (categoryId: string) => {
      if (onStartMatching) onStartMatching(categoryId);
  };

  const handleFreeMatchingClick = () => {
      if (onStartMatching) onStartMatching();
  };

  return (
    <>
      {/* App Header - Minimal & Mobile First */}
      <header className="bg-white px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex flex-col">
             <h1 className="text-lg font-black text-indigo-600 tracking-tighter leading-none">탐정월드</h1>
             <div className="flex items-center gap-1 text-xs font-bold text-slate-900 cursor-pointer mt-1">
                <MapPin className="w-3 h-3 text-slate-500" /> 서울시 강남구 역삼동 <ChevronRight className="w-3 h-3 text-slate-400" />
            </div>
        </div>
        <div className="relative">
            <Bell className="w-6 h-6 text-slate-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white ring-1 ring-white"></span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 bg-slate-50">
        
        {/* Search Bar */}
        <div className="px-4 py-4 bg-white pb-6 rounded-b-3xl shadow-sm">
            <div className="relative shadow-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-500" />
                <Input placeholder="어떤 도움이 필요하신가요?" className="pl-10 bg-slate-50 border-slate-200 h-12 rounded-xl focus-visible:ring-indigo-500 transition-all text-base" />
            </div>
        </div>

        {/* Active Case Widget - Hide if Guest */}
        {!isGuest && (
            <div className="px-4 -mt-3 mb-2 relative z-10">
                <div className="bg-slate-900 rounded-2xl p-4 shadow-lg text-white flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors" onClick={() => onSelectDetective("김철수 탐정")}>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge className="bg-indigo-500 hover:bg-indigo-600 text-[10px] px-1.5 h-5 border-none">진행중</Badge>
                            <span className="text-xs text-slate-300 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> 실시간 현장 조사
                            </span>
                        </div>
                        <h3 className="font-bold text-sm">김철수 탐정이 이동 중입니다.</h3>
                    </div>
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full border-2 border-indigo-500 p-0.5">
                            <img src="https://images.unsplash.com/photo-1691316749874-e89297ee4cf3?w=100&h=100&fit=crop" className="w-full h-full rounded-full object-cover" alt="" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
                    </div>
                </div>
            </div>
        )}

        {/* Categories (App Style: Horizontal Scroll) */}
        <div className="mt-6 px-4">
            <div className="flex justify-between items-end mb-3">
                <h3 className="text-sm font-bold text-slate-900">서비스 카테고리</h3>
                <button onClick={() => handleServiceCategoryClick('')} className="text-[10px] text-slate-400 hover:text-indigo-600">전체보기</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
                {[
                    { id: 'adultery', name: '불륜조사', icon: Heart, color: 'bg-pink-50 text-pink-600' },
                    { id: 'corporate', name: '기업조사', icon: Building2, color: 'bg-blue-50 text-blue-600' },
                    { id: 'insurance', name: '보험조사', icon: FileText, color: 'bg-green-50 text-green-600' },
                    { id: 'evidence', name: '증거수집', icon: Camera, color: 'bg-purple-50 text-purple-600' },
                    { id: 'missing', name: '사람찾기', icon: Users, color: 'bg-orange-50 text-orange-600' },
                    { id: 'legal', name: '법률연계', icon: Scale, color: 'bg-slate-100 text-slate-600' },
                    { id: 'security', name: '경호', icon: Shield, color: 'bg-indigo-50 text-indigo-600' },
                    { id: 'stalking', name: '스토킹', icon: Eye, color: 'bg-red-50 text-red-600' },
                    { id: 'other', name: '기타조사', icon: MoreHorizontal, color: 'bg-gray-50 text-gray-600' }
                ].map((cat) => (
                    <button 
                        key={cat.id} 
                        className="flex flex-col items-center gap-2 p-1 hover:scale-105 transition-transform"
                        onClick={() => handleServiceCategoryClick(cat.id)}
                    >
                        <div className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center text-xl shadow-sm`}>
                            <cat.icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-medium text-slate-600 tracking-tight">{cat.name}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* AI Match Banner */}
        <div 
            className="mx-4 mt-8 mb-6 p-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white relative overflow-hidden shadow-lg group cursor-pointer"
            onClick={handleFreeMatchingClick}
        >
            <div className="relative z-10">
                <Badge className="bg-white/20 hover:bg-white/30 text-white mb-3 border-none backdrop-blur-sm">AI 스마트 매칭</Badge>
                <h3 className="text-xl font-bold mb-1 leading-tight">내 사건에 딱 맞는<br/>탐정을 찾아드려요</h3>
                <p className="text-indigo-100 text-xs mb-4 opacity-90">복잡한 고민, AI가 분석하여 최적의 전문가를 연결합니다.</p>
                <Button size="sm" className="bg-white text-indigo-600 hover:bg-indigo-50 rounded-full px-6 font-bold shadow-md group-hover:scale-105 transition-transform">무료 매칭 시작하기</Button>
            </div>
            <div className="absolute right-[-20px] bottom-[-40px] opacity-20 group-hover:opacity-30 transition-opacity">
                <Shield className="w-40 h-40" />
            </div>
            <div className="absolute top-10 right-10 w-20 h-20 bg-white opacity-10 rounded-full blur-2xl"></div>
        </div>

        {/* Detective List (Card Style) */}
        <div className="px-4 mt-2">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">이달의 우수 탐정</h3>
                <button className="text-xs text-slate-500">랭킹 보기</button>
            </div>

            {/* Partner Banner */}
            <div className="mb-6 bg-slate-900 rounded-xl p-4 flex items-center justify-between text-white shadow-md cursor-pointer hover:bg-slate-800 transition-colors">
                <div>
                    <h4 className="font-bold text-sm mb-1">탐정님이신가요?</h4>
                    <p className="text-xs text-slate-400">탐정월드 파트너로 등록하고<br/>더 많은 의뢰인을 만나보세요.</p>
                </div>
                <Button size="sm" variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/10 h-8 text-xs">
                    파트너 등록
                </Button>
            </div>
            
            <div className="space-y-4">
                {MOCK_DETECTIVES.map((detective) => (
                    <div key={detective.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelectDetective(detective.name)}>
                        <div className="relative">
                             <img src={detective.image} className="w-16 h-16 rounded-2xl object-cover bg-slate-200" alt="" />
                             {detective.rating >= 4.9 && (
                                 <div className="absolute -top-2 -left-2 bg-yellow-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white shadow-sm">TOP</div>
                             )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-slate-900 text-base truncate">{detective.name}</h4>
                                <div className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded-lg">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs font-bold text-slate-700">{detective.rating}</span>
                                </div>
                            </div>
                            <p className="text-xs text-indigo-600 font-medium mt-0.5">{detective.specialty} 전문</p>
                            <p className="text-xs text-slate-500 mt-2 line-clamp-1">{detective.description}</p>
                            
                            {/* Tags */}
                            <div className="flex gap-1 mt-3 overflow-hidden">
                                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md whitespace-nowrap">#신속처리</span>
                                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md whitespace-nowrap">#비밀보장</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </main>
    </>
  );
}
