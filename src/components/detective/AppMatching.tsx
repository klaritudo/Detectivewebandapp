
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, ChevronRight, MapPin, Camera, FileText, Calendar, User, MessageSquare, Building2, Heart, Shield, Eye, Scale, Users, MoreHorizontal, Sparkles, List, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Card } from '../ui/card';

// Updated Categories for the Matching Flow
const MATCHING_CATEGORIES = [
    { id: 'adultery', name: '불륜조사', icon: Heart, description: '배우자의 외도 증거 수집' },
    { id: 'corporate', name: '기업조사', icon: Building2, description: '횡령, 산업스파이, 부정부패' },
    { id: 'insurance', name: '보험조사', icon: FileText, description: '보험사기 및 허위청구' },
    { id: 'evidence', name: '증거수집', icon: Camera, description: '소송 및 분쟁 해결을 위한 증거' },
    { id: 'missing', name: '사람찾기', icon: Users, description: '가출, 실종, 연락두절' },
    { id: 'legal', name: '법률연계', icon: Scale, description: '변호사 연계 및 법적 조언' },
    { id: 'security', name: '경호', icon: Shield, description: '신변보호 및 시설경호' },
    { id: 'stalking', name: '스토킹', icon: Eye, description: '스토킹 피해 증거 및 보호' },
    { id: 'other', name: '기타조사', icon: MoreHorizontal, description: '그 외 특수 조사 의뢰' },
];

interface AppMatchingProps {
    onBack: () => void;
    onComplete: () => void;
    isGuest?: boolean;
    onLoginRequest?: () => void;
    initialCategory?: string | null;
}

export function AppMatching({ onBack, onComplete, isGuest, onLoginRequest, initialCategory }: AppMatchingProps) {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        location: '',
        description: '',
        contact: ''
    });

    // Initialize with category if provided
    useEffect(() => {
        if (initialCategory) {
            setSelectedCategory(initialCategory);
            setStep(2); // Skip step 1
        }
    }, [initialCategory]);

    const totalSteps = 5; // Increased from 4 to 5
    const progress = (step / totalSteps) * 100;

    const handleNext = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    // This function handles the "Check Result" logic, but now it's moving to Step 4 (Selection)
    // Login check will be performed when user chooses an option in Step 4.
    const handleToSelection = () => {
        handleNext(); // Go to step 4
    };

    const handleOptionSelect = (option: 'ai' | 'direct' | 'consult') => {
        if (isGuest) {
            // All final options require login to see result
            if (confirm("매칭 결과를 확인하고 서비스를 이용하려면 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?")) {
                if (onLoginRequest) onLoginRequest();
            }
            return;
        }

        if (option === 'ai') {
            handleNext(); // Go to step 5 (AI Loading)
        } else if (option === 'direct') {
            alert("탐정 목록 페이지로 이동합니다.");
            onBack(); // Return to home/list
        } else if (option === 'consult') {
            alert("상담 채팅방이 개설되었습니다.");
            onComplete(); // Finish flow
        }
    };

    const handlePrev = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            onBack();
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Header */}
            <div className="bg-white px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={handlePrev}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h2 className="text-lg font-bold text-slate-900">무료 매칭 신청</h2>
                    <p className="text-[10px] text-slate-500">AI가 최적의 탐정을 찾아드립니다</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-1">
                <div 
                    className="bg-indigo-600 h-1 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 pb-20">
                {/* Step 1: Category Selection */}
                {step === 1 && (
                    <div className="space-y-4 animate-in slide-in-from-right duration-300">
                        <div className="text-center py-4">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">어떤 도움이 필요하신가요?</h3>
                            <p className="text-sm text-slate-500">가장 적합한 전문가를 연결해 드리기 위해<br/>의뢰 분야를 선택해주세요.</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                            {MATCHING_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setSelectedCategory(cat.id);
                                        handleNext();
                                    }}
                                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                                        selectedCategory === cat.id 
                                        ? 'border-indigo-600 bg-indigo-50' 
                                        : 'border-transparent bg-white shadow-sm hover:border-indigo-100'
                                    }`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${
                                        selectedCategory === cat.id ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                        <cat.icon className="w-5 h-5" />
                                    </div>
                                    <div className="font-bold text-slate-900">{cat.name}</div>
                                    <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">{cat.description}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Location & Details */}
                {step === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                        <div className="text-center py-4">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                {selectedCategory ? MATCHING_CATEGORIES.find(c => c.id === selectedCategory)?.name : '의뢰'} 세부 내용
                            </h3>
                            <p className="text-sm text-slate-500">구체적으로 적어주실수록<br/>정확한 견적을 받을 수 있습니다.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>희망 지역</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                                    <Input 
                                        className="pl-10 h-12 bg-white" 
                                        placeholder="예) 서울 강남구, 부산 해운대구"
                                        value={formData.location}
                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>의뢰 내용</Label>
                                <Textarea 
                                    className="min-h-[200px] bg-white resize-none p-4 leading-relaxed" 
                                    placeholder="발생 일시, 상황, 원하시는 결과 등을 자유롭게 적어주세요. (비밀은 철저히 보장됩니다)"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                />
                            </div>
                        </div>

                        <Button onClick={handleNext} className="w-full h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 rounded-xl" disabled={!formData.location || !formData.description}>
                            다음 단계로
                        </Button>
                    </div>
                )}

                {/* Step 3: Contact Info */}
                {step === 3 && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300">
                         <div className="text-center py-4">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">연락처를 남겨주세요</h3>
                            <p className="text-sm text-slate-500">안심번호로 연결되며,<br/>실제 연락처는 전문가에게 공개되지 않습니다.</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center space-y-4">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                                <Shield className="w-8 h-8 text-indigo-600" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">안심번호 보호 시스템 적용 중</h4>
                                <p className="text-xs text-slate-500 mt-1">고객님의 개인정보는 암호화되어 안전하게 보호됩니다.</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>연락처 (휴대폰)</Label>
                            <Input 
                                className="h-12 bg-white text-lg tracking-wider" 
                                placeholder="010-0000-0000"
                                type="tel"
                                value={formData.contact}
                                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                            />
                        </div>

                        <Button onClick={handleToSelection} className="w-full h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 rounded-xl" disabled={!formData.contact}>
                            다음 단계로
                        </Button>
                    </div>
                )}

                {/* Step 4: Method Selection */}
                {step === 4 && (
                    <div className="space-y-6 animate-in slide-in-from-right duration-300 pt-4">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">매칭 방식을 선택해주세요</h3>
                            <p className="text-sm text-slate-500">원하시는 방법으로 전문가를 연결해 드립니다.</p>
                        </div>

                        <div className="space-y-3">
                            {/* Option 1: AI Matching */}
                            <button 
                                onClick={() => handleOptionSelect('ai')}
                                className="w-full bg-indigo-600 text-white p-5 rounded-2xl shadow-lg shadow-indigo-200 flex items-center gap-4 text-left hover:bg-indigo-700 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">AI 스마트 매칭 시작</h4>
                                    <p className="text-xs text-indigo-100 opacity-90 mt-1">내 상황에 딱 맞는 최적의 전문가 자동 추천</p>
                                </div>
                            </button>

                            {/* Option 2: Direct Selection */}
                            <button 
                                onClick={() => handleOptionSelect('direct')}
                                className="w-full bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4 text-left hover:bg-slate-50 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                                    <List className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900">탐정 직접 선택</h4>
                                    <p className="text-xs text-slate-500 mt-1">프로필을 보고 마음에 드는 전문가 선택</p>
                                </div>
                            </button>

                            {/* Option 3: Consultation First */}
                            <button 
                                onClick={() => handleOptionSelect('consult')}
                                className="w-full bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center gap-4 text-left hover:bg-slate-50 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-900">상담 후 매칭</h4>
                                    <p className="text-xs text-slate-500 mt-1">채팅으로 먼저 상담하고 천천히 결정</p>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 5: Loading / Matching (Previously Step 4) */}
                {step === 5 && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in duration-500 pt-10">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-indigo-100 flex items-center justify-center animate-pulse">
                                <SearchAnimation />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                AI 분석중
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">최적의 탐정을 찾는 중...</h3>
                            <p className="text-slate-500">고객님의 상황에 가장 적합한<br/>상위 1% 전문가를 매칭하고 있습니다.</p>
                        </div>

                        <div className="w-full max-w-xs space-y-3">
                             <div className="flex items-center justify-between text-xs text-slate-400">
                                 <span>전문 분야 분석</span>
                                 <span className="text-indigo-600 font-bold">완료</span>
                             </div>
                             <Progress value={100} className="h-1.5" />
                             
                             <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                                 <span>지역 거리 계산</span>
                                 <span className="text-indigo-600 font-bold">완료</span>
                             </div>
                             <Progress value={100} className="h-1.5" />

                             <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                                 <span>평점 및 리뷰 검토</span>
                                 <span className="text-indigo-600 font-bold animate-pulse">진행중...</span>
                             </div>
                             <Progress value={60} className="h-1.5" />
                        </div>

                        {/* Auto transition for demo */}
                        <div className="hidden">
                            {setTimeout(() => {
                                onComplete();
                            }, 3000)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function SearchAnimation() {
    return (
        <svg className="w-12 h-12 text-indigo-600 animate-spin-slow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    );
}
