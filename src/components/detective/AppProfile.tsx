
import React, { useState } from 'react';
import { User, Settings, CreditCard, Bell, Shield, HelpCircle, LogOut, ChevronRight, Camera, FileText, Lock, MapPin, Landmark, Plus, Trash2, ArrowLeft, Phone, Mail, MessageCircle, CheckCircle, X, Star, Info, FileQuestion } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
  DrawerClose,
} from "../ui/drawer";

import { AppCaseHistory } from './AppCaseHistory';

type ProfileView = 'main' | 'payment' | 'location' | 'history' | 'password' | 'support' | 'password_reset' | 'reviews' | 'notices';

export function AppProfile({ onLogout }: { onLogout?: () => void }) {
  const [currentView, setCurrentView] = useState<ProfileView>('main');

  // --- Sub-views ---
  
  const PaymentView = () => (
    <div className="h-full flex flex-col bg-slate-50">
        <div className="bg-white px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={() => setCurrentView('main')}>
                <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-bold text-slate-900">결제 관리</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 pb-20">
                <Tabs defaultValue="card" className="w-full mb-6">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="card">카드 관리</TabsTrigger>
                    <TabsTrigger value="account">계좌 관리</TabsTrigger>
                </TabsList>
                
                <TabsContent value="card" className="space-y-4">
                    {/* Registered Card */}
                    <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10"></div>
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-medium text-slate-300">Hyundai Card</span>
                                <Badge variant="outline" className="text-white border-white/20 bg-white/10">기본</Badge>
                            </div>
                            <div className="text-2xl font-mono tracking-wider">
                                **** **** **** 1234
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] text-slate-400">Card Holder</p>
                                    <p className="text-sm font-medium">HONG GIL DONG</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-[10px] text-slate-400">Expires</p>
                                    <p className="text-sm font-medium">12/25</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add New Card Button */}
                    <Button variant="outline" className="w-full h-14 border-dashed border-2 flex items-center gap-2 text-slate-500 hover:border-indigo-500 hover:text-indigo-600">
                        <Plus className="w-5 h-5" /> 새 카드 등록하기
                    </Button>
                </TabsContent>

                <TabsContent value="account" className="space-y-4">
                     <Card>
                         <CardContent className="p-4 flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                     <Landmark className="w-5 h-5" />
                                 </div>
                                 <div>
                                     <p className="font-bold text-slate-900">신한은행</p>
                                     <p className="text-xs text-slate-500">110-***-******</p>
                                 </div>
                             </div>
                             <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500">
                                 <Trash2 className="w-4 h-4" />
                             </Button>
                         </CardContent>
                     </Card>
                     <Button variant="outline" className="w-full h-14 border-dashed border-2 flex items-center gap-2 text-slate-500 hover:border-indigo-500 hover:text-indigo-600">
                        <Plus className="w-5 h-5" /> 새 계좌 연결하기
                    </Button>
                </TabsContent>
            </Tabs>

            <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900">결제 내역</h3>
                {[
                    { title: '탐정 상담료 (김철수)', date: '2024.05.20', amount: '- 50,000원' },
                    { title: '프리미엄 의뢰 착수금', date: '2024.05.15', amount: '- 1,000,000원' },
                ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                        <div>
                            <p className="text-sm font-medium text-slate-800">{item.title}</p>
                            <p className="text-xs text-slate-400">{item.date}</p>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{item.amount}</span>
                    </div>
                ))}
            </div>
            </div>
        </div>
    </div>
  );

  const LocationView = () => (
    <div className="h-full flex flex-col bg-slate-50">
        <div className="bg-white px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={() => setCurrentView('main')}>
                <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-bold text-slate-900">위치 관리</h2>
        </div>
        
        <div className="h-48 bg-slate-200 relative flex-shrink-0">
             {/* Mock Map */}
             <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200/50 backdrop-blur-sm">
                 <div className="text-center">
                     <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                     <span className="text-xs">지도 보기</span>
                 </div>
             </div>
        </div>

        <div className="flex-1 overflow-y-auto">
             <div className="px-4 py-6 space-y-4 pb-20">
             <div className="flex justify-between items-center mb-2">
                 <h3 className="text-sm font-bold text-slate-900">저장된 장소</h3>
                 <Button variant="link" size="sm" className="text-indigo-600 text-xs h-auto p-0">편집</Button>
             </div>

             <Card className="border-indigo-200 shadow-sm">
                 <CardContent className="p-4 flex gap-4">
                     <div className="mt-1">
                         <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                             <MapPin className="w-4 h-4" />
                         </div>
                     </div>
                     <div className="flex-1">
                         <div className="flex justify-between">
                             <span className="font-bold text-sm text-slate-900">우리집</span>
                             <Badge variant="secondary" className="text-[10px]">기본</Badge>
                         </div>
                         <p className="text-xs text-slate-500 mt-1">서울시 강남구 테헤란로 123, 강남아파트 101동</p>
                     </div>
                 </CardContent>
             </Card>

             <Card className="shadow-sm">
                 <CardContent className="p-4 flex gap-4">
                     <div className="mt-1">
                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                             <BriefcaseIcon className="w-4 h-4" />
                         </div>
                     </div>
                     <div className="flex-1">
                         <span className="font-bold text-slate-900">회사</span>
                         <p className="text-xs text-slate-500 mt-1">서울시 서초구 서초대로 456, 오피스빌딩 5층</p>
                     </div>
                 </CardContent>
             </Card>

             <Button className="w-full mt-4 bg-slate-900 hover:bg-slate-800">
                 <Plus className="w-4 h-4 mr-2" /> 새 장소 추가
             </Button>
             </div>
        </div>
    </div>
  );

  const PasswordView = () => (
    <div className="h-full flex flex-col bg-slate-50">
        <div className="bg-white px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={() => setCurrentView('main')}>
                <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-bold text-slate-900">비밀번호 변경</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>현재 비밀번호</Label>
                    <Input type="password" placeholder="현재 비밀번호 입력" />
                </div>
                
                {/* Forgot Password Link */}
                <div className="text-right">
                    <button 
                        onClick={() => setCurrentView('password_reset')}
                        className="text-xs text-indigo-600 font-medium hover:underline"
                    >
                        현재 비밀번호를 모르시나요? 이메일 인증으로 재설정
                    </button>
                </div>

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-100"></span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>새 비밀번호</Label>
                    <Input type="password" placeholder="새 비밀번호 입력" />
                    <p className="text-xs text-slate-500">영문, 숫자, 특수문자 포함 8자 이상</p>
                </div>
                <div className="space-y-2">
                    <Label>새 비밀번호 확인</Label>
                    <Input type="password" placeholder="새 비밀번호 재입력" />
                </div>
                <Button className="w-full h-12 mt-4 bg-indigo-600 hover:bg-indigo-700">변경 완료</Button>
            </div>
        </div>
    </div>
  );

  const PasswordResetView = () => {
      const [resetStep, setResetStep] = useState(1);
      const [code, setCode] = useState('');
      
      return (
        <div className="h-full flex flex-col bg-slate-50">
            <div className="bg-white px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => setCurrentView('password')}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-lg font-bold text-slate-900">비밀번호 재설정</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
                {resetStep === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right">
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">이메일 인증</h3>
                            <p className="text-sm text-slate-500">회원가입 시 등록한 이메일로<br/>인증번호를 전송합니다.</p>
                        </div>
                        <div className="space-y-2">
                            <Label>이메일 주소</Label>
                            <Input value="hong@example.com" disabled className="bg-slate-100 text-slate-500" />
                        </div>
                        <Button onClick={() => setResetStep(2)} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700">인증번호 전송</Button>
                    </div>
                )}

                {resetStep === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right">
                         <div className="text-center py-4">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">인증번호 입력</h3>
                            <p className="text-sm text-slate-500">메일로 전송된 6자리 인증번호를 입력해주세요.</p>
                        </div>
                        <div className="space-y-2">
                            <Label>인증번호</Label>
                            <div className="flex gap-2">
                                <Input 
                                    placeholder="123456" 
                                    className="tracking-widest text-center text-lg" 
                                    maxLength={6}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                <div className="flex items-center justify-center px-4 bg-slate-100 rounded-md text-sm font-medium text-red-500 w-24">
                                    02:59
                                </div>
                            </div>
                        </div>
                        <Button onClick={() => setResetStep(3)} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700" disabled={code.length < 6}>인증 확인</Button>
                        <button className="w-full text-xs text-slate-500 underline py-2" onClick={() => setResetStep(1)}>인증번호 재전송</button>
                    </div>
                )}

                {resetStep === 3 && (
                    <div className="space-y-6 animate-in slide-in-from-right">
                        <div className="text-center py-4">
                             <h3 className="text-xl font-bold text-slate-900 mb-2">비밀번호 재설정</h3>
                             <p className="text-sm text-slate-500">새로운 비밀번호를 설정해주세요.</p>
                        </div>
                        <div className="space-y-2">
                            <Label>새 비밀번호</Label>
                            <Input type="password" placeholder="새 비밀번호 입력" />
                            <p className="text-xs text-slate-500">영문, 숫자, 특수문자 포함 8자 이상</p>
                        </div>
                        <div className="space-y-2">
                            <Label>새 비밀번호 확인</Label>
                            <Input type="password" placeholder="새 비밀번호 재입력" />
                        </div>
                        <Button onClick={() => setResetStep(4)} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700">변경 완료</Button>
                    </div>
                )}

                {resetStep === 4 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-300 py-10">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">비밀번호 변경 완료</h3>
                            <p className="text-sm text-slate-500">성공적으로 비밀번호가 변경되었습니다.<br/>새로운 비밀번호로 로그인해주세요.</p>
                        </div>
                        <Button onClick={() => setCurrentView('main')} className="w-full h-12 bg-slate-900 hover:bg-slate-800">마이페이지로 돌아가기</Button>
                    </div>
                )}
            </div>
        </div>
      );
  }

  const SupportView = () => (
    <div className="h-full flex flex-col bg-slate-50">
        <div className="bg-white px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={() => setCurrentView('main')}>
                <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-bold text-slate-900">고객센터</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
                {/* Contact Options */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-indigo-300 transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                            <Phone className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold text-slate-800">전화 상담</span>
                    </div>
                    
                    <Drawer>
                        <DrawerTrigger asChild>
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-indigo-300 transition-colors cursor-pointer">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-bold text-slate-800">1:1 문의</span>
                            </div>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-sm">
                                <DrawerHeader className="text-center">
                                    <DrawerTitle className="text-xl font-bold">문의 방법 선택</DrawerTitle>
                                    <DrawerDescription>원하시는 문의 방법을 선택해주세요.</DrawerDescription>
                                </DrawerHeader>
                                <div className="p-4 space-y-4">
                                    <Button className="w-full h-14 text-lg flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800">
                                        <MessageCircle className="w-5 h-5" /> 실시간 채팅 문의
                                    </Button>
                                    <Button variant="outline" className="w-full h-14 text-lg flex items-center justify-center gap-3 border-slate-200">
                                        <Mail className="w-5 h-5" /> 이메일 문의
                                    </Button>
                                </div>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                        <Button variant="ghost" className="w-full">취소</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-slate-100">
                        <h3 className="text-sm font-bold text-slate-900">자주 묻는 질문 (FAQ)</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {['비밀 보장은 확실한가요?', '비용 결제는 어떻게 하나요?', '상담 후 취소가 가능한가요?'].map((q, i) => (
                            <button key={i} className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-slate-50">
                                <span className="text-sm text-slate-600">{q}</span>
                                <ChevronRight className="w-4 h-4 text-slate-300" />
                            </button>
                        ))}
                    </div>
                </div>

                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
                     <h3 className="text-sm font-bold text-slate-900 mb-2">운영시간 안내</h3>
                     <div className="text-xs text-slate-500 space-y-1">
                         <p>평일: 09:00 ~ 18:00</p>
                         <p>주말/공휴일: 휴무 (긴급상담은 24시간 가능)</p>
                     </div>
                 </div>
            </div>
        </div>
    </div>
  );

  const NoticeView = () => (
    <div className="h-full flex flex-col bg-slate-50">
        <div className="bg-white px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={() => setCurrentView('main')}>
                <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-bold text-slate-900">공지사항</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
             <div className="divide-y divide-slate-100 bg-white">
                 {[
                     { title: '[중요] 탐정월드 서비스 이용약관 개정 안내', date: '2024.05.20', isNew: true },
                     { title: '시스템 점검 안내 (5/25 02:00~04:00)', date: '2024.05.18' },
                     { title: '개인정보 처리방침 변경 안내', date: '2024.05.01' },
                     { title: '탐정월드 신규 서비스 오픈 이벤트', date: '2024.04.15' },
                 ].map((notice, i) => (
                     <div key={i} className="p-4 hover:bg-slate-50 cursor-pointer">
                         <div className="flex items-center gap-2 mb-1">
                             {notice.isNew && <Badge className="bg-red-500 text-[10px] h-5 px-1.5">NEW</Badge>}
                             <h3 className="text-sm font-medium text-slate-900 truncate">{notice.title}</h3>
                         </div>
                         <p className="text-xs text-slate-400">{notice.date}</p>
                     </div>
                 ))}
             </div>
        </div>
    </div>
  );

  const ReviewView = () => (
    <div className="h-full flex flex-col bg-slate-50">
        <div className="bg-white px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10">
            <Button variant="ghost" size="icon" onClick={() => setCurrentView('main')}>
                <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-bold text-slate-900">내가 쓴 리뷰</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[1].map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>DT</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-xs font-bold text-slate-900">김철수 탐정</p>
                                <div className="flex items-center">
                                    {[1,2,3,4,5].map(s => (
                                        <Star key={s} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-slate-400">2024.05.10</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed mb-3">
                        처음 의뢰해보는데 정말 친절하게 상담해주시고, 일처리도 깔끔하게 해주셔서 감사합니다. 덕분에 고민이 해결되었어요.
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs">수정</Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs text-red-500 hover:text-red-600">삭제</Button>
                    </div>
                </div>
            ))}
            
            {/* Empty State */}
            <div className="py-10 text-center">
                <p className="text-sm text-slate-400">작성한 리뷰가 더 이상 없습니��.</p>
            </div>
        </div>
    </div>
  );

  // --- Main View ---

  if (currentView === 'payment') return <PaymentView />;
  if (currentView === 'location') return <LocationView />;
  if (currentView === 'history') return <AppCaseHistory onBack={() => setCurrentView('main')} />;
  if (currentView === 'password') return <PasswordView />;
  if (currentView === 'password_reset') return <PasswordResetView />;
  if (currentView === 'support') return <SupportView />;
  if (currentView === 'notices') return <NoticeView />;
  if (currentView === 'reviews') return <ReviewView />;

  return (
    <div className="h-full bg-slate-50 flex flex-col">
      {/* Profile Header */}
      <div className="bg-white p-6 pb-8 rounded-b-3xl shadow-sm z-10 flex-shrink-0">
        <div className="flex items-center justify-between mb-6">
             <h2 className="text-lg font-bold text-slate-900">마이페이지</h2>
             <Button variant="ghost" size="icon" className="text-slate-400">
                 <Settings className="w-5 h-5" />
             </Button>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="relative">
                <Avatar className="w-16 h-16 border-2 border-white shadow-md">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>USER</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 p-1 bg-slate-900 text-white rounded-full border-2 border-white">
                    <Camera className="w-3 h-3" />
                </button>
            </div>
            <div>
                <h3 className="text-lg font-bold text-slate-900">홍길동 고객님</h3>
                <p className="text-xs text-slate-500">hong@example.com</p>
                <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-100 text-[10px]">VIP 회원</Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100 text-[10px] flex items-center gap-0.5"><Shield className="w-2.5 h-2.5"/> 본인인증 완료</Badge>
                </div>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 space-y-6 pb-20">
        {/* My Status */}
        <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-1">2</div>
                <p className="text-[10px] text-slate-500 font-medium">진행중 의뢰</p>
            </div>
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-center">
                <div className="text-2xl font-bold text-slate-900 mb-1">5</div>
                <p className="text-[10px] text-slate-500 font-medium">관심 전문가</p>
            </div>
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-center">
                <div className="text-2xl font-bold text-slate-900 mb-1">0</div>
                <p className="text-[10px] text-slate-500 font-medium">쿠폰</p>
            </div>
        </div>

        {/* Menu Sections */}
        <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-50 text-xs font-bold text-slate-400">계정 및 보안</div>
                <MenuButton icon={FileText} label="의뢰 내역" onClick={() => setCurrentView('history')} />
                <MenuButton icon={Star} label="내가 쓴 리뷰" onClick={() => setCurrentView('reviews')} />
                <MenuButton icon={MapPin} label="위치 관리" onClick={() => setCurrentView('location')} value="집, 회사" />
                <MenuButton icon={CreditCard} label="결제 관리" onClick={() => setCurrentView('payment')} value="카드 1개" />
                <MenuButton icon={Lock} label="비밀번호 변경" onClick={() => setCurrentView('password')} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-50 text-xs font-bold text-slate-400">앱 설정</div>
                <div className="px-4 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                            <Bell className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">알림 설정</span>
                    </div>
                    <Switch />
                </div>
                <MenuButton icon={Info} label="공지사항" onClick={() => setCurrentView('notices')} />
                <MenuButton icon={FileQuestion} label="이용약관 및 정책" />
                <MenuButton icon={HelpCircle} label="고객센터" onClick={() => setCurrentView('support')} />
            </div>

            <div className="text-center py-4">
                <p className="text-[10px] text-slate-300">버전 정보 1.0.2</p>
            </div>
            
            {onLogout && (
                <Button 
                    variant="ghost" 
                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 h-12"
                    onClick={onLogout}
                >
                    <LogOut className="w-4 h-4 mr-2" /> 로그아웃
                </Button>
            )}
        </div>
        </div>
      </div>
    </div>
  );
}

function MenuButton({ icon: Icon, label, value, onClick }: { icon: any, label: string, value?: string, onClick?: () => void }) {
    return (
        <button onClick={onClick} className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-700">{label}</span>
            </div>
            <div className="flex items-center gap-2">
                {value && <span className="text-xs text-slate-400">{value}</span>}
                <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
        </button>
    )
}

// Icon for Location View
function BriefcaseIcon({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
    )
}
