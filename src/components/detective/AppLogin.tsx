
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Label } from '../ui/label';

type LoginView = 'login' | 'reset';

export function AppLogin({ onBack, onLoginSuccess }: { onBack: () => void, onLoginSuccess: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [view, setView] = useState<LoginView>('login');

    const handleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onLoginSuccess();
        }, 1000);
    };

    // --- Password Reset View ---
    const PasswordResetView = () => {
        const [resetStep, setResetStep] = useState(1);
        const [code, setCode] = useState('');
        
        return (
            <div className="h-full flex flex-col bg-white">
                <div className="px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10 bg-white">
                    <Button variant="ghost" size="icon" onClick={() => setView('login')}>
                        <ArrowLeft className="w-6 h-6" />
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
                                <p className="text-sm text-slate-500">가입하신 이메일 주소를 입력하시면<br/>인증번호를 보내드립니다.</p>
                            </div>
                            <div className="space-y-2">
                                <Label>이메일 주소</Label>
                                <Input placeholder="example@email.com" className="bg-slate-50 h-12" />
                            </div>
                            <Button onClick={() => setResetStep(2)} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 mt-4">인증번호 전송</Button>
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
                                        className="tracking-widest text-center text-lg h-12" 
                                        maxLength={6}
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                    <div className="flex items-center justify-center px-4 bg-slate-100 rounded-md text-sm font-medium text-red-500 w-24 h-12">
                                        02:59
                                    </div>
                                </div>
                            </div>
                            <Button onClick={() => setResetStep(3)} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 mt-4" disabled={code.length < 6}>인증 확인</Button>
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
                                <Input type="password" placeholder="새 비밀번호 입력" className="h-12" />
                                <p className="text-xs text-slate-500">영문, 숫자, 특수문자 포함 8자 이상</p>
                            </div>
                            <div className="space-y-2">
                                <Label>새 비밀번호 확인</Label>
                                <Input type="password" placeholder="새 비밀번호 재입력" className="h-12" />
                            </div>
                            <Button onClick={() => setResetStep(4)} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 mt-4">변경 완료</Button>
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
                            <Button onClick={() => setView('login')} className="w-full h-12 bg-slate-900 hover:bg-slate-800">로그인하러 가기</Button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (view === 'reset') return <PasswordResetView />;

    return (
        <div className="h-full flex flex-col bg-white">
            <div className="px-4 py-3">
                <Button variant="ghost" size="icon" onClick={onBack}>
                    <ArrowLeft className="w-6 h-6" />
                </Button>
            </div>
            
            <div className="flex-1 px-6 pt-6">
                {/* Text Logo Header */}
                <div className="mb-8">
                    <h2 className="text-lg font-black text-indigo-600 tracking-tighter mb-1">탐정월드</h2>
                    <h1 className="text-2xl font-bold text-slate-900">로그인</h1>
                    <p className="text-slate-500 text-sm mt-2">탐정월드 서비스를 이용하기 위해 로그인해주세요.</p>
                </div>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">이메일</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                            <Input placeholder="example@email.com" className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700">비밀번호</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                            <Input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="비밀번호 입력" 
                                className="pl-10 pr-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors rounded-xl" 
                            />
                            <button 
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-4 mb-8">
                     <button 
                        className="text-xs text-slate-500 hover:text-slate-800 hover:underline underline-offset-2"
                        onClick={() => setView('reset')}
                    >
                        비밀번호를 잊으셨나요?
                    </button>
                </div>

                <Button className="w-full h-14 text-lg bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200 font-bold" onClick={handleLogin} disabled={isLoading}>
                    {isLoading ? '로그인 중...' : '로그인하기'}
                </Button>

                <div className="mt-8 relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-100"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-400 font-medium">SNS 계정으로 시작</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                    <Button variant="outline" className="h-12 rounded-xl border-slate-200 gap-2 bg-[#FEE500] border-[#FEE500] text-[#3C1E1E] hover:bg-[#FEE500]/90 font-medium">
                        <span className="text-lg">K</span> 카카오
                    </Button>
                    <Button variant="outline" className="h-12 rounded-xl border-slate-200 gap-2 bg-[#03C75A] border-[#03C75A] text-white hover:bg-[#03C75A]/90 font-medium">
                        <span className="text-lg font-serif">N</span> 네이버
                    </Button>
                </div>
            </div>
            
            <div className="p-6 text-center">
                <p className="text-xs text-slate-400">
                    계정이 없으신가요? <button className="text-indigo-600 font-bold hover:underline ml-1" onClick={onBack}>회원가입</button>
                </p>
            </div>
        </div>
    );
}
