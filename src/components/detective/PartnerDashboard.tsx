
import React, { useState } from 'react';
import { FileSearch, MessageSquare, Calendar, DollarSign, Terminal, MapPin, Power } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

import { PartnerCaseDetail } from './PartnerCaseDetail';
import { DigitalConsole } from './DigitalConsole';
import { MOCK_CASES } from './data';

export function PartnerDashboard() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [showConsole, setShowConsole] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);

  if (selectedCase) {
    return (
        <div className="min-h-screen bg-slate-50 font-sans p-6">
            <PartnerCaseDetail caseData={MOCK_CASES.find(c => c.id === selectedCase) || MOCK_CASES[0]} onBack={() => setSelectedCase(null)} />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
        {showConsole && <DigitalConsole onClose={() => setShowConsole(false)} />}

        {/* Partner Header */}
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
                <div>
                    <h1 className="font-bold text-slate-900">파트너 센터</h1>
                    <p className="text-xs text-slate-500">김철수 탐정님, 환영합니다.</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                {/* Work Mode Toggle */}
                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all ${isWorkMode ? 'bg-indigo-50 border-indigo-200' : 'bg-slate-50 border-slate-200'}`}>
                    <Switch id="work-mode" checked={isWorkMode} onCheckedChange={setIsWorkMode} className="data-[state=checked]:bg-indigo-600" />
                    <Label htmlFor="work-mode" className="text-xs font-bold cursor-pointer select-none flex items-center gap-1.5">
                        {isWorkMode ? (
                            <>
                                <MapPin className="w-3 h-3 text-indigo-600 animate-bounce" />
                                <span className="text-indigo-700">위치 공유 중</span>
                            </>
                        ) : (
                            <span className="text-slate-500">업무 종료</span>
                        )}
                    </Label>
                </div>

                <div className="h-6 w-px bg-slate-200 mx-1"></div>

                <Button variant="outline" size="sm" className="gap-2 border-slate-300 text-slate-600 hover:bg-slate-900 hover:text-green-400 hover:border-slate-900 transition-all" onClick={() => setShowConsole(true)}>
                    <Terminal className="w-4 h-4" /> 
                    <span className="hidden sm:inline">Digital Forensic</span>
                </Button>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>KC</AvatarFallback>
                </Avatar>
            </div>
        </header>

        <main className="container mx-auto p-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">진행중인 사건</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3건</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">이번 달 수익</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₩ 4,250,000</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">고객 평점</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold flex items-center gap-1">4.9 <span className="text-sm font-normal text-slate-400">/ 5.0</span></div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="requests" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-[400px] mb-6">
                    <TabsTrigger value="requests">새 의뢰 요청</TabsTrigger>
                    <TabsTrigger value="active">진행 사건</TabsTrigger>
                    <TabsTrigger value="messages">메시지</TabsTrigger>
                </TabsList>
                
                <TabsContent value="requests" className="space-y-4">
                    <Card className="border-l-4 border-l-indigo-500">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="outline" className="mb-2 text-indigo-600 border-indigo-200">AI 매칭 점수 98점</Badge>
                                    <CardTitle>기업 내부 자금 횡령 의심 조사</CardTitle>
                                    <CardDescription>서울 강남구 • 예산 협의가능</CardDescription>
                                </div>
                                <span className="text-sm text-slate-400">10분 전</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600 text-sm bg-slate-50 p-4 rounded-lg">
                                "최근 회계 장부에서 알 수 없는 자금 이탈이 발견되었습니다. 내부 직원 소행으로 의심되며, 비밀리에 조사를 진행하고 싶습니다..."
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline">거절하기</Button>
                            <Button className="bg-indigo-600 hover:bg-indigo-500" onClick={() => setSelectedCase('C-2024-001')}>제안서 보내기</Button>
                        </CardFooter>
                    </Card>

                    <Card className="opacity-75">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="outline" className="mb-2 text-slate-600">AI 매칭 점수 75점</Badge>
                                    <CardTitle>오래된 채무자 소재 파악</CardTitle>
                                    <CardDescription>경기도 수원시 • 200만원</CardDescription>
                                </div>
                                <span className="text-sm text-slate-400">2시간 전</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600 text-sm bg-slate-50 p-4 rounded-lg">
                                "3년 전 돈을 빌려주고 잠적한 지인을 찾고 싶습니다. 마지막 거주지는..."
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline">거절하기</Button>
                            <Button variant="secondary">관심 등록</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                
                <TabsContent value="active">
                     {/* Clickable mock item for demo */}
                     <div className="space-y-4 cursor-pointer" onClick={() => setSelectedCase('C-2024-001')}>
                        <Card className="hover:border-indigo-300 transition-all">
                             <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Badge className="mb-2 bg-green-500 hover:bg-green-600">진행중</Badge>
                                        <CardTitle>C-2024-001: 기업 내부 자금 횡령 의심 조사</CardTitle>
                                        <CardDescription>서울 강남구 • 2주차 진행중</CardDescription>
                                    </div>
                                    <Button variant="ghost" size="sm">상세보기</Button>
                                </div>
                            </CardHeader>
                        </Card>
                     </div>
                </TabsContent>
            </Tabs>
        </main>
    </div>
  );
}
