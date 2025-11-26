
import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function AppLanding({ onLogin, onSignup, onBrowse }: { onLogin: () => void, onSignup: () => void, onBrowse: () => void }) {
    return (
        <div className="h-full flex flex-col bg-slate-50 relative overflow-hidden">
            
            {/* Top Image Section */}
            <div className="relative h-[60%] bg-slate-900 overflow-hidden rounded-b-[2.5rem] shadow-2xl shadow-slate-200 z-10">
                 <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=1000&fit=crop" 
                    className="w-full h-full object-cover opacity-80 mix-blend-overlay" 
                    alt="Background" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-slate-900/50 to-slate-900/30"></div>
                
                {/* Text Logo on Top */}
                <div className="absolute top-16 left-8">
                     <h1 className="text-white/90 text-[5.5rem] font-black tracking-tighter leading-[0.85] drop-shadow-2xl">
                         탐정<br/>월드
                     </h1>
                     <div className="w-24 h-2 bg-indigo-500 mt-4 rounded-full"></div>
                </div>

                <div className="absolute bottom-10 left-6 right-6 text-white">
                    <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 mb-4">
                         <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                         <span className="text-[10px] font-bold tracking-wide">실시간 전문가 매칭</span>
                    </div>
                    <h1 className="text-3xl font-extrabold leading-tight mb-3">
                        진실을 향한<br/>
                        가장 확실한 선택
                    </h1>
                    <p className="text-indigo-200 text-sm font-medium">
                        탐정월드는 당신의 고민을 해결해 줄<br/>최고의 전문가와 함께합니다.
                    </p>
                </div>
            </div>

            {/* Bottom Content Section */}
            <div className="flex-1 flex flex-col px-6 pt-8 pb-10 relative z-0">
                
                {/* Feature List */}
                <div className="space-y-3 mb-8">
                     {[
                        '엄격한 신원 인증을 거친 전문가',
                        '100% 비밀 보장 및 보안 채팅',
                        'AI 기반 맞춤형 탐정 매칭'
                     ].map((feature, i) => (
                         <div key={i} className="flex items-center gap-3">
                             <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                                 <CheckCircle2 className="w-3.5 h-3.5" />
                             </div>
                             <span className="text-sm text-slate-600 font-medium">{feature}</span>
                         </div>
                     ))}
                </div>

                {/* Actions */}
                <div className="mt-auto space-y-3">
                    <Button 
                        onClick={onLogin}
                        className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-base font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
                    >
                        로그인
                    </Button>
                    
                    <div className="grid grid-cols-2 gap-3">
                         <Button 
                            onClick={onSignup}
                            variant="outline" 
                            className="h-14 rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50 font-bold"
                        >
                            회원가입
                        </Button>
                         <Button 
                            onClick={onBrowse}
                            variant="ghost"
                            className="h-14 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold flex items-center gap-1"
                        >
                            둘러보기 <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
