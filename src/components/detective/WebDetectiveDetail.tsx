
import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, Shield, CheckCircle, MapPin, Clock, Award, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MOCK_REVIEWS } from './data';

interface WebDetectiveDetailProps {
  detective: any;
  onBack: () => void;
}

export function WebDetectiveDetail({ detective, onBack }: WebDetectiveDetailProps) {
  return (
    <div className="min-h-screen bg-white animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Image Area */}
      <div className="h-64 md:h-80 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60 blur-sm"
            alt="Office Background"
        />
        <div className="absolute top-0 left-0 p-6 z-20">
            <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/20 hover:text-white gap-2">
                <ArrowLeft className="w-5 h-5" /> 목록으로 돌아가기
            </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-20 relative z-30">
        <div className="flex flex-col md:flex-row gap-8">
            {/* Left Sidebar (Profile) */}
            <div className="md:w-1/3 lg:w-1/4">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
                    <div className="relative w-32 h-32 mx-auto -mt-20 mb-4 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                        <img src={detective.image} alt={detective.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">{detective.name}</h1>
                        <p className="text-indigo-600 font-medium">{detective.specialty} 전문</p>
                    </div>

                    <div className="flex justify-center gap-2 mb-6">
                        <Badge variant="secondary" className="flex gap-1 items-center px-3 py-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {detective.rating}
                        </Badge>
                        <Badge variant="secondary" className="flex gap-1 items-center px-3 py-1">
                            <Shield className="w-3 h-3 text-slate-500" />
                            인증됨
                        </Badge>
                    </div>

                    <div className="space-y-4 text-sm text-slate-600 border-t pt-4">
                        <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span>{detective.location || "서울시 강남구"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span>경력 {detective.career || "10년 이상"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Award className="w-4 h-4 text-slate-400" />
                            <span>해결 사건 {detective.cases}건</span>
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-500 h-12 text-lg">
                            상담 요청하기
                        </Button>
                        <Button variant="outline" className="w-full h-12">
                            <MessageSquare className="w-4 h-4 mr-2" /> 메시지 보내기
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="md:w-2/3 lg:w-3/4 pt-4">
                <Tabs defaultValue="intro" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 mb-8">
                        <TabsTrigger 
                            value="intro" 
                            className="data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 border-b-2 border-transparent rounded-none px-6 py-3"
                        >
                            소개
                        </TabsTrigger>
                        <TabsTrigger 
                            value="reviews" 
                            className="data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 border-b-2 border-transparent rounded-none px-6 py-3"
                        >
                            후기 ({MOCK_REVIEWS.length})
                        </TabsTrigger>
                        <TabsTrigger 
                            value="qna" 
                            className="data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 border-b-2 border-transparent rounded-none px-6 py-3"
                        >
                            Q&A
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="intro" className="space-y-8">
                        <section>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">탐정 소개</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {detective.intro || "안녕하세요. 진실을 찾는 여정에 함께하겠습니다. 다년간의 경험과 노하우를 바탕으로 의뢰인의 고민을 해결해드리겠습니다."}
                            </p>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-6 rounded-xl">
                                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" /> 전문 분야
                                </h4>
                                <ul className="space-y-2 text-slate-600">
                                    <li>• {detective.specialty} 심층 조사</li>
                                    <li>• 법적 증거 수집 및 분석</li>
                                    <li>• 리스크 매니지먼트</li>
                                    <li>• 실종자 소재 파악</li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-xl">
                                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-blue-500" /> 주요 경력
                                </h4>
                                <ul className="space-y-2 text-slate-600">
                                    <li>• 전 경찰청 지능범죄수사팀 근무</li>
                                    <li>• 민간조사사(PIA) 1급 보유</li>
                                    <li>• 기업 보안 컨설턴트 활동</li>
                                </ul>
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent value="reviews" className="space-y-6">
                        {MOCK_REVIEWS.map(review => (
                            <div key={review.id} className="border-b pb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-bold text-slate-900">{review.user}</span>
                                    </div>
                                    <span className="text-slate-400 text-sm">{review.date}</span>
                                </div>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                                    ))}
                                </div>
                                <p className="text-slate-600">{review.content}</p>
                            </div>
                        ))}
                    </TabsContent>
                    
                    <TabsContent value="qna">
                        <div className="text-center py-12 text-slate-500">
                            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>등록된 질문이 없습니다. 첫 번째 질문을 남겨보세요.</p>
                            <Button variant="outline" className="mt-4">질문 등록하기</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
      </div>
    </div>
  );
}
