import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ArrowLeft, CheckCircle2, ChevronRight, ShieldCheck, Smartphone, User } from 'lucide-react';

export function AppSignup({ onBack, onSignupSuccess }: { onBack: () => void, onSignupSuccess: () => void }) {
    const [step, setStep] = useState(1); // 1: Terms, 2: Phone, 3: Info

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else onSignupSuccess();
    };

    return (
        <div className="h-full flex flex-col bg-white">
             <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-50">
                <Button variant="ghost" size="icon" onClick={step === 1 ? onBack : () => setStep(step - 1)}>
                    <ArrowLeft className="w-6 h-6" />
                </Button>
                <div className="flex-1 flex justify-center items-center gap-2">
                    <span className="text-lg font-black text-indigo-600 tracking-tighter">탐정월드</span>
                    <span className="text-sm font-bold text-slate-900">회원가입</span>
                </div>
                <div className="w-10"></div> {/* Spacer */}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-1 bg-slate-100">
                <div className="h-full bg-indigo-600 transition-all duration-300 ease-out" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>

            <div className="flex-1 px-6 pt-8 pb-10 overflow-y-auto">
                {step === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300 fade-in">
                        <div className="text-center mb-8">
                            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">서비스 이용 약관</h2>
                            <p className="text-slate-500 text-sm">탐정월드 서비스 이용을 위해<br/>약관에 동의해주세요.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 border-2 border-indigo-100 bg-indigo-50/50 rounded-xl flex gap-3 items-start cursor-pointer active:scale-[0.98] transition-transform">
                                <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-slate-900">전체 동의하기</p>
                                    <p className="text-xs text-slate-500 mt-1">필수 및 선택 정보 수집에 모두 동의합니다.</p>
                                </div>
                            </div>
                            <div className="space-y-2 pt-2">
                                {['서비스 이용약관 (필수)', '개인정보 처리방침 (필수)', '위치기반 서비스 이용약관 (필수)', '마케팅 정보 수신 동의 (선택)'].map((term, i) => (
                                    <button key={i} className="w-full flex items-center justify-between py-3 px-2 hover:bg-slate-50 rounded-lg transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 ${i < 3 ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'} flex items-center justify-center`}>
                                                {i < 3 && <CheckCircle2 className="w-3 h-3 text-white" />}
                                            </div>
                                            <span className={`text-sm ${i < 3 ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>{term}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300 fade-in">
                         <div className="text-center mb-8">
                            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">휴대폰 인증</h2>
                            <p className="text-slate-500 text-sm">본인 확인을 위해 휴대폰 인증을 진행해주세요.</p>
                        </div>
                        
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700">이름</label>
                                <Input placeholder="실명 입력" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                            </div>
                             <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700">휴대폰 번호</label>
                                <div className="flex gap-2">
                                    <Input placeholder="010-0000-0000" className="h-12 bg-slate-50 border-slate-200 flex-1 rounded-xl" />
                                    <Button className="h-12 px-4 bg-slate-900 text-white rounded-xl">인증요청</Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700">인증번호</label>
                                <Input placeholder="인증번호 6자리" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                                <p className="text-xs text-indigo-600 text-right pt-1">남은 시간 2:59</p>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300 fade-in">
                         <div className="text-center mb-8">
                            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                                <User className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">계정 정보 입력</h2>
                            <p className="text-slate-500 text-sm">로그인에 사용할 정보를 입력해주세요.</p>
                        </div>
                        
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700">이메일</label>
                                <Input placeholder="example@email.com" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700">비밀번호</label>
                                <Input type="password" placeholder="영문, 숫자, 특수문자 포함 8자 이상" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700">비밀번호 확인</label>
                                <Input type="password" placeholder="비밀번호 재입력" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                            </div>
                             <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700">닉네임</label>
                                <Input placeholder="탐정월드에서 사용할 닉네임" className="h-12 bg-slate-50 border-slate-200 rounded-xl" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 bg-white border-t border-slate-50">
                <Button className="w-full h-14 text-lg bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 font-bold" onClick={handleNext}>
                    {step === 3 ? '가입 완료' : '다음'}
                </Button>
            </div>
        </div>
    );
}
