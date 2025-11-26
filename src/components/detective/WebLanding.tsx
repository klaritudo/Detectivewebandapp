
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Shield, Star, ArrowRight, Menu, X, Check, Briefcase, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { MOCK_DETECTIVES } from './data';

import { WebDetectiveDetail } from './WebDetectiveDetail';

export function WebLanding() {
  const [view, setView] = useState<'landing' | 'detail'>('landing');
  const [selectedDetective, setSelectedDetective] = useState(null);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [step, setStep] = useState(1);

  const handleDetectiveClick = (detective: any) => {
    setSelectedDetective(detective);
    setView('detail');
    setIsRequestOpen(false); // Close dialog if open
  };

  if (view === 'detail' && selectedDetective) {
    return <WebDetectiveDetail detective={selectedDetective} onBack={() => setView('landing')} />;
  }

  const handleRequest = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(2); // Show results
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Web Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <Search className="h-6 w-6 text-indigo-600" />
            <span>Sherlock.AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">서비스 소개</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">탐정 찾기</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">이용 후기</a>
            <Button variant="default" className="bg-slate-900 hover:bg-slate-800">탐정 등록 파트너</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 z-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1662352561579-8146c1b49ad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900 z-10" />
        
        <div className="container relative z-20 px-4 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 text-yellow-400 border-yellow-400/50 px-4 py-1">
              AI 기반 탐정 매칭 플랫폼
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              진실을 밝히는 가장 확실한 방법,<br />
              <span className="text-indigo-400">Sherlock.AI</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              복잡한 문제, 혼자 고민하지 마세요. <br/>
              AI가 당신의 상황을 분석하여 최적의 전문 탐정을 매칭해드립니다.
            </p>
            
            <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/20">
                  무료 AI 매칭 시작하기 <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>AI 탐정 매칭</DialogTitle>
                </DialogHeader>
                
                {step === 1 && !isAnalyzing && (
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>의뢰 분야</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {['기업 조사', '가사/민사', '사람 찾기', '디지털 포렌식', '경호/신변보호', '기타'].map((cat) => (
                          <Button key={cat} variant="outline" className="justify-start hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200">
                            {cat}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>상황 설명 (AI 분석용)</Label>
                      <Textarea placeholder="현재 겪고 계신 상황을 간략히 적어주시면 AI가 적합한 전문가를 분석합니다." className="h-32" />
                    </div>
                    <Button onClick={handleRequest} className="w-full bg-indigo-600 hover:bg-indigo-500">
                      분석 및 매칭 시작
                    </Button>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">AI가 의뢰 내용을 분석 중입니다...</h3>
                      <p className="text-sm text-slate-500">최적의 전문가 프로필과 매칭 점수를 계산하고 있습니다.</p>
                    </div>
                  </div>
                )}

                {step === 2 && !isAnalyzing && (
                  <div className="space-y-4 py-4">
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg mb-4">
                      <Check className="h-5 w-5" />
                      <span className="font-medium">분석 완료: 3명의 추천 탐정을 찾았습니다.</span>
                    </div>
                    <div className="space-y-3">
                      {MOCK_DETECTIVES.map(detective => (
                        <div key={detective.id} onClick={() => handleDetectiveClick(detective)} className="flex items-start gap-4 p-4 rounded-lg border hover:border-indigo-200 hover:bg-indigo-50/50 transition-all cursor-pointer">
                          <img src={detective.image} alt={detective.name} className="w-12 h-12 rounded-full object-cover" />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-slate-900">{detective.name}</h4>
                              <Badge variant="secondary" className="bg-slate-100 text-slate-700">{detective.specialty}</Badge>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{detective.description}</p>
                            <div className="flex items-center gap-1 mt-2">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{detective.rating}</span>
                              <span className="text-xs text-slate-400">({detective.cases}건 해결)</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" onClick={() => setIsRequestOpen(false)}>상담 요청하기</Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">왜 Sherlock.AI 인가요?</h2>
            <p className="text-slate-500">검증된 탐정과 안전한 거래 시스템을 제공합니다.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "AI 스마트 매칭", desc: "의뢰 내용을 자연어 처리(NLP)로 분석하여 가장 적합한 전문 분야의 탐정을 연결합니다.", icon: <Briefcase className="w-10 h-10 text-indigo-600" /> },
              { title: "신원 검증 시스템", desc: "모든 파트너 탐정은 엄격한 신원 확인과 자격 검증을 거쳐 활동합니다.", icon: <Shield className="w-10 h-10 text-indigo-600" /> },
              { title: "안전 결제 에스크���", desc: "의뢰가 완료될 때까지 대금을 안전하게 보관하며, 불만족 시 중재를 지원합니다.", icon: <CheckCircle2 className="w-10 h-10 text-indigo-600" /> },
            ].map((feature, idx) => (
              <Card key={idx} className="border-none shadow-lg shadow-slate-100 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="mb-4 p-3 bg-indigo-50 w-fit rounded-xl">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Web Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <Search className="h-6 w-6 text-indigo-500" />
              <span>Sherlock.AI</span>
            </div>
            <p className="text-sm">당신의 고민을 해결하는<br/>가장 스마트한 방법</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>탐정 찾기</li>
              <li>기업 의뢰</li>
              <li>파트너 등록</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm">
              <li>공지사항</li>
              <li>자주 묻는 질문</li>
              <li>1:1 문의</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>support@sherlock.ai</li>
              <li>02-1234-5678</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
