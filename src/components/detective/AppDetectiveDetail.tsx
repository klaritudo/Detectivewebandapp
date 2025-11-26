
import React, { useState } from 'react';
import { ArrowLeft, Star, Shield, MapPin, Clock, Award, CheckCircle2, MessageSquare, Share2, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { AppRequestForm } from './AppRequestForm';

interface AppDetectiveDetailProps {
  detectiveName: string;
  onBack: () => void;
  onRequestChat: (requestData: any) => void;
}

export function AppDetectiveDetail({ detectiveName, onBack, onRequestChat }: AppDetectiveDetailProps) {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="h-full bg-slate-50 flex flex-col relative">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </Button>
        <span className="font-bold text-slate-800">탐정 프로필</span>
        <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
            </Button>
            <Button variant="ghost" size="icon">
                <Share2 className="w-6 h-6 text-slate-400" />
            </Button>
        </div>
      </div>

      {/* Content Scroll Area */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Profile Hero */}
        <div className="bg-white p-6 flex flex-col items-center text-center border-b border-slate-100">
            <div className="relative mb-4">
                <Avatar className="w-24 h-24 border-4 border-indigo-50">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>DT</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full border-4 border-white">
                    <Shield className="w-4 h-4 fill-white" />
                </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-1">
                {detectiveName} <CheckCircle2 className="w-5 h-5 text-blue-500" />
            </h2>
            <p className="text-sm text-slate-500 mb-4">탐정월드 공식 인증 파트너</p>
            
            <div className="flex justify-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">기업조사 전문</Badge>
                <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">증거수집</Badge>
                <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">법률지원</Badge>
            </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-slate-100 border-b border-slate-100">
            <div className="bg-white p-4 flex flex-col items-center">
                <span className="text-lg font-bold text-slate-900">98%</span>
                <span className="text-[11px] text-slate-400">만족도</span>
            </div>
            <div className="bg-white p-4 flex flex-col items-center">
                <span className="text-lg font-bold text-slate-900">150+</span>
                <span className="text-[11px] text-slate-400">해결 건수</span>
            </div>
            <div className="bg-white p-4 flex flex-col items-center">
                <span className="text-lg font-bold text-slate-900">10분</span>
                <span className="text-[11px] text-slate-400">평균 응답</span>
            </div>
        </div>

        {/* Details Tabs */}
        <div className="bg-white mt-2">
            <Tabs defaultValue="info" className="w-full">
                <TabsList className="w-full grid grid-cols-2 rounded-none bg-white border-b h-12 p-0">
                    <TabsTrigger 
                        value="info" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 h-full"
                    >
                        상세 정보
                    </TabsTrigger>
                    <TabsTrigger 
                        value="review" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 h-full"
                    >
                        의뢰인 후기 (42)
                    </TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="p-6 space-y-6">
                    <div className="space-y-3">
                        <h3 className="font-bold text-slate-900">전문가 소개</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            안녕하세요. 10년 경력의 민간조사 전문가 {detectiveName}입니다.
                            기업 보안 진단 및 산업 스파이 조사, 증거 수집을 전문으로 하고 있습니다.
                            합법적인 테두리 안에서 신속하고 정확하게 진실을 규명해드립니다.
                            <br /><br />
                            모든 조사는 탐정월드 관리자의 감독 하에 투명하게 진행되며, 의뢰인의 비밀 보장을 최우선으로 합니다.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-bold text-slate-900">활동 지역</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            서울, 경기, 인천 전 지역 (지방 출장 가능)
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="font-bold text-slate-900">주요 경력</h3>
                        <ul className="space-y-2">
                            <li className="text-sm text-slate-600 flex gap-2">
                                <Award className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                <span>前 대기업 보안팀장 (5년)</span>
                            </li>
                            <li className="text-sm text-slate-600 flex gap-2">
                                <Award className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                <span>PIA 민간조사사 자격 보유</span>
                            </li>
                            <li className="text-sm text-slate-600 flex gap-2">
                                <Award className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                                <span>탐정월드 우수 파트너 선정 (2023)</span>
                            </li>
                        </ul>
                    </div>
                </TabsContent>
                
                <TabsContent value="review" className="p-6">
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback className="bg-slate-100 text-[10px]">User</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium text-slate-900">익명 의뢰인</span>
                                    </div>
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 mb-2">
                                    정말 꼼꼼하게 조사해주셔서 감사합니다. 관리자분 통해서 안전하게 결제하고 진행하니 마음이 놓였어요.
                                </p>
                                <span className="text-xs text-slate-400">2024.05.20</span>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t px-4 py-3 pb-safe flex gap-3 shadow-lg z-20">
        <Button variant="outline" className="flex-1 h-12 text-slate-600 border-slate-300 font-bold" onClick={() => {}}>
            전화 상담
        </Button>
        <Button 
            className="flex-[2] h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-indigo-200 shadow-md"
            onClick={() => setShowRequestForm(true)}
        >
            <MessageSquare className="w-4 h-4 mr-2" />
            상담/의뢰 요청하기
        </Button>
      </div>

      {/* Request Form Modal */}
      <AppRequestForm 
        isOpen={showRequestForm} 
        onClose={() => setShowRequestForm(false)} 
        onSubmit={onRequestChat}
        targetDetective={detectiveName}
      />
    </div>
  );
}
