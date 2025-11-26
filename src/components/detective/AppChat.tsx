
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MoreVertical, Send, Image as ImageIcon, Phone, Paperclip, MapPin, Plus, Camera, FileText, ShieldAlert, AlertTriangle, DollarSign, CreditCard, X, Shield, CheckCircle2, Scale, MessageSquare, Headset, FileSignature, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MOCK_MESSAGES } from './data';
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '../ui/drawer';
import { AppContract } from './AppContract';

interface AppChatProps {
  detectiveName?: string;
  initialRequestData?: any;
  onBack: () => void;
  onOpenTracking?: () => void;
}

interface Message {
  id: number;
  sender: 'user' | 'detective' | 'system';
  text?: string;
  image?: string;
  type?: 'text' | 'image' | 'system' | 'offer' | 'approval_request' | 'service_choice';
  time?: string;
  offerAmount?: string; // For offer type
  offerStatus?: 'pending' | 'signed' | 'paid'; // For offer type
}

export function AppChat({ detectiveName, initialRequestData, onBack, onOpenTracking }: AppChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Contract State
  const [showContract, setShowContract] = useState(false);
  const [activeOfferId, setActiveOfferId] = useState<number | null>(null);

  // Initialize
  useEffect(() => {
      const initMsgs: Message[] = [
        {
            id: 0,
            sender: 'system',
            type: 'system',
            text: '탐정월드 매니저와의 상담 채널입니다. 의뢰인의 안전을 위해 모든 대화는 관리자가 모니터링하며 안심번호가 적용됩니다.'
        }
      ];

      // If there's initial request data, add it
      if (initialRequestData) {
          initMsgs.push({
              id: 1,
              sender: 'user',
              type: 'text',
              text: `[의뢰 요청서]\n• 대상 탐정: ${detectiveName}\n• 분야: ${initialRequestData.category}\n• 지역: ${initialRequestData.location}\n• 내용: ${initialRequestData.description}`,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
          
          // Simulate Manager Response
          setTimeout(() => {
              setMessages(prev => [
                  ...prev,
                  {
                      id: 2,
                      sender: 'detective',
                      type: 'text',
                      text: `안녕하세요. 탐정월드 매니저입니다. 접수해주신 의뢰 내용을 확인하고 있습니다. \n'${detectiveName}' 탐정님 지정 요청건으로 접수되었으며, AI 가이드라인에 따라 예상 견적을 분석 중입니다.`,
                      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
              ]);
          }, 1000);
      } else {
          initMsgs.push(...MOCK_MESSAGES.map(m => ({ ...m, type: 'text' as const, sender: m.sender as 'user' | 'detective' })));
      }

      setMessages(initMsgs);
  }, [initialRequestData, detectiveName]);


  // Hidden inputs for browser native behavior
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, showPlusMenu]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      type: 'text',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInputValue("");

    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        sender: 'detective',
        type: 'text',
        text: "네, 확인했습니다. 상세한 내용은 안심번호로 통화 가능하실까요?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const newMessage: Message = {
            id: messages.length + 1,
            sender: 'user',
            type: 'image',
            image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=500&auto=format&fit=crop&q=60', 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMessage]);
        setShowPlusMenu(false);
      }
  };

  const triggerAlbum = () => fileInputRef.current?.click();
  const triggerCamera = () => cameraInputRef.current?.click();
  
  const triggerLocation = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
              (position) => {
                  const newMessage: Message = {
                    id: messages.length + 1,
                    sender: 'user',
                    type: 'text',
                    text: `[위치 전송]\n위도: ${position.coords.latitude.toFixed(4)}\n경도: ${position.coords.longitude.toFixed(4)}`,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  };
                  setMessages([...messages, newMessage]);
                  setShowPlusMenu(false);
              },
              (error) => {
                  alert("위치 정보를 가져올 수 없습니다. 권한을 확인해주세요.");
              }
          );
      } else {
          alert("이 브라우저에서는 위치 서비스를 지원하지 않습니다.");
      }
  };

  const triggerCall = () => {
      window.location.href = 'tel:050-1234-5678';
  };

  const handleRequestQuote = () => {
      const newMessage: Message = {
          id: messages.length + 1,
          sender: 'user',
          type: 'text',
          text: "견적서를 요청드립니다.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setShowPlusMenu(false);

      setTimeout(() => {
          const aiAnalysisMsg: Message = {
              id: messages.length + 2,
              sender: 'system',
              type: 'system',
              text: 'AI 시스템이 의뢰 내용을 분석하여 적정 견적을 산출하고 있습니다...'
          };
          setMessages(prev => [...prev, aiAnalysisMsg]);

          setTimeout(() => {
            const guidelineMsg: Message = {
                id: messages.length + 3,
                sender: 'system',
                type: 'system',
                text: '탐정월드 가이드라인에 따른 추천 견적가는 [500,000원 ~ 700,000원] 입니다.'
            };
            setMessages(prev => [...prev, guidelineMsg]);

            setTimeout(() => {
                const offerMsg: Message = {
                    id: messages.length + 4,
                    sender: 'detective',
                    type: 'offer',
                    offerAmount: '500,000',
                    offerStatus: 'pending',
                    text: '가이드라인에 맞춰 견적서를 발송해드립니다. 증거 수집 및 결과 보고서가 포함된 금액입니다.',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, offerMsg]);
            }, 1500);
          }, 1500);
      }, 1000);
  };

  const handleOpenContract = (msgId: number) => {
      setActiveOfferId(msgId);
      setShowContract(true);
  };

  const handleContractSigned = () => {
      if (activeOfferId === null) return;

      // Update status to signed
      setMessages(prev => prev.map(m => m.id === activeOfferId ? { ...m, offerStatus: 'signed' } : m));
      
      // Add System Message
      const signedMsg: Message = {
          id: Date.now(),
          sender: 'system',
          type: 'system',
          text: '전자 계약 체결이 완료되었습니다. 이제 에스크로 안심결제를 진행해주세요.'
      };
      setMessages(prev => [...prev, signedMsg]);
  };

  const handlePayment = (msgId: number) => {
    // 1. Update the offer status to paid
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, offerStatus: 'paid' } : m));

    // 2. Show system message
    setTimeout(() => {
        const paidMsg: Message = {
            id: Date.now(),
            sender: 'system',
            type: 'system',
            text: '결제 대금이 탐정월드 에스크로 계좌에 안전하게 예치되었습니다. 탐정이 의뢰를 시작합니다.'
        };
        setMessages(prev => [...prev, paidMsg]);

        // 3. Simulate work completion (after 3 seconds for demo)
        setTimeout(() => {
            const workDoneMsg: Message = {
                id: Date.now() + 1,
                sender: 'detective',
                type: 'text',
                text: '의뢰하신 업무가 모두 완료되었습니다. 결과 보고서를 확인하시고 업무 마감(구매 확정) 부탁드립니다.',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            const approvalMsg: Message = {
                id: Date.now() + 2,
                sender: 'system',
                type: 'approval_request',
                text: '의뢰인이 확정하면 에스크로 대금이 탐정에게 지급되며 의뢰가 완전히 종료됩니다.'
            };

            setMessages(prev => [...prev, workDoneMsg, approvalMsg]);
        }, 3000);
    }, 1000);
  };

  const handleApprove = () => {
      const completeMsg: Message = {
          id: Date.now(),
          sender: 'system',
          type: 'system',
          text: '업무 마감 및 구매 확정이 완료되었습니다. 에스크로 예치금이 탐정에게 지급되었습니다.'
      };

      const nextStepMsg: Message = {
          id: Date.now() + 1,
          sender: 'system',
          type: 'service_choice',
          text: '모든 의뢰가 종료되었습니다. 확보된 증거를 토대로 법률 상담을 진행하시겠습니까?'
      };

      setMessages(prev => [...prev, completeMsg, nextStepMsg]);
  };

  const handleRequestRequote = () => {
      const requoteMsg: Message = {
          id: messages.length + 1,
          sender: 'user',
          type: 'text',
          text: '제시해주신 견적이 예산보다 높습니다. 금액 조정이 가능할까요? 다시 견적 부탁드립니다.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, requoteMsg]);

      setTimeout(() => {
          const responseMsg: Message = {
              id: messages.length + 2,
              sender: 'detective',
              type: 'text',
              text: '네, 알겠습니다. 의뢰 내용 중 일부 항목을 제외하여 비용을 낮춘 수정 견적서를 다시 보내드리겠습니다.',
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, responseMsg]);
      }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-[#F2F4F7] relative">
      <AppContract 
        isOpen={showContract} 
        onClose={() => setShowContract(false)} 
        onSignComplete={handleContractSigned}
        contractData={{
            detectiveName: detectiveName || '지정 탐정',
            amount: '500,000원',
            period: '착수일로부터 7일'
        }}
      />

      {/* Hidden Inputs for Native Behavior */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileSelect} 
      />
      <input 
        type="file" 
        ref={cameraInputRef} 
        className="hidden" 
        accept="image/*" 
        capture="environment" 
        onChange={handleFileSelect} 
      />

      {/* Chat Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2 text-slate-600 hover:bg-slate-100 rounded-full">
                <ArrowLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Avatar className="w-10 h-10 border border-slate-100 bg-indigo-600">
                        <AvatarFallback className="text-white bg-indigo-600"><Headset className="w-5 h-5" /></AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div>
                    <div className="flex items-center gap-1">
                        <h3 className="font-bold text-slate-900 text-sm">탐정월드 매니저</h3>
                        <Shield className="w-3 h-3 text-indigo-600 fill-indigo-600" />
                    </div>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                        {detectiveName ? `${detectiveName} 지정 요청` : '실시간 상담 중'}
                    </span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100 rounded-full" onClick={triggerCall}>
                <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-100 rounded-full">
                <MoreVertical className="w-5 h-5" />
            </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth" ref={scrollRef}>
        <div className="text-center py-4">
            <span className="text-[11px] text-slate-400 bg-slate-200/60 px-3 py-1 rounded-full">2024년 5월 25일</span>
        </div>
        
        {messages.map((msg) => {
            if (msg.type === 'system') {
                return (
                    <div key={msg.id} className="flex justify-center my-4 px-4">
                        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 flex gap-3 max-w-sm items-start">
                            <AlertTriangle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                            <p className="text-xs text-indigo-900 leading-relaxed text-left">{msg.text}</p>
                        </div>
                    </div>
                );
            }

            if (msg.type === 'service_choice') {
                return (
                    <div key={msg.id} className="flex justify-center my-6 px-4 animate-in slide-in-from-bottom-5 fade-in duration-500">
                        <div className="bg-white border border-indigo-200 rounded-xl p-5 shadow-md w-full max-w-xs text-center">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2">의뢰가 완료되었습니다</h3>
                            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                                {msg.text}
                            </p>
                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="h-auto py-3 flex flex-col gap-1 border-slate-200 hover:bg-slate-50" onClick={() => {}}>
                                    <X className="w-5 h-5 text-slate-400" />
                                    <span className="text-xs font-medium">종료하기</span>
                                </Button>
                                <Button className="h-auto py-3 flex flex-col gap-1 bg-indigo-600 hover:bg-indigo-700" onClick={() => {}}>
                                    <Scale className="w-5 h-5" />
                                    <span className="text-xs font-bold">법률 상담 연결</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            }

            if (msg.type === 'approval_request') {
                return (
                    <div key={msg.id} className="flex justify-center my-6 px-4 animate-in slide-in-from-bottom-5 fade-in duration-500">
                        <div className="bg-white border border-indigo-200 rounded-xl overflow-hidden shadow-md w-full max-w-xs">
                            <div className="bg-slate-900 px-4 py-3 flex justify-between items-center">
                                <span className="text-xs font-bold text-white">업무 마감(구매 확정) 요청</span>
                                <ShieldAlert className="w-4 h-4 text-yellow-400" />
                            </div>
                            <div className="p-5">
                                <h4 className="text-sm font-bold text-slate-800 mb-2">업무가 완료되었습니다</h4>
                                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                                    {msg.text}
                                </p>
                                <div className="bg-yellow-50 border border-yellow-100 rounded p-3 mb-4">
                                    <p className="text-[11px] text-yellow-800 font-medium">
                                        ⏳ 7일 내 미응답 시 자동 구매 확정 처리됩니다.
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="flex-1 text-xs h-9 border-slate-200">이의 제기</Button>
                                    <Button className="flex-1 text-xs h-9 bg-indigo-600 hover:bg-indigo-700" onClick={handleApprove}>확정 및 종료</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }

            const isMe = msg.sender === 'user';
            
            return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-end gap-2 max-w-[80%]`}>
                        {!isMe && (
                            <Avatar className="w-8 h-8 mb-4 border border-white shadow-sm">
                                {isMe ? (
                                    <AvatarFallback className="bg-slate-200 text-[10px]">ME</AvatarFallback>
                                ) : (
                                    <AvatarFallback className="bg-indigo-600 text-white text-[10px]"><Headset className="w-4 h-4" /></AvatarFallback>
                                )}
                            </Avatar>
                        )}
                        
                        <div className="flex flex-col gap-1">
                            {/* Text Message */}
                            {msg.type === 'text' && (
                                <div className={`px-4 py-2.5 text-sm shadow-sm relative ${
                                    isMe 
                                    ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none' 
                                    : 'bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-tl-none'
                                }`}>
                                    <pre className="whitespace-pre-wrap font-sans">{msg.text}</pre>
                                </div>
                            )}

                            {/* Image Message */}
                            {msg.type === 'image' && (
                                <div className={`rounded-2xl overflow-hidden shadow-sm border border-slate-100 ${
                                    isMe ? 'rounded-tr-none' : 'rounded-tl-none'
                                }`}>
                                    <img src={msg.image} alt="sent" className="max-w-[200px] max-h-[200px] object-cover" />
                                </div>
                            )}

                            {/* Offer Message (Escrow) */}
                            {msg.type === 'offer' && (
                                <div className="bg-white border border-indigo-100 rounded-xl overflow-hidden shadow-sm w-72">
                                    <div className={`${msg.offerStatus === 'paid' ? 'bg-slate-700' : 'bg-indigo-600'} px-4 py-3 flex justify-between items-center transition-colors`}>
                                        <div className="flex items-center gap-1.5">
                                            <Shield className="w-4 h-4 text-white fill-white" />
                                            <span className="text-xs font-bold text-white">
                                                {msg.offerStatus === 'paid' ? '에스크로 예치 완료' : (msg.offerStatus === 'signed' ? '계약 체결 완료' : '안심결제 견적서')}
                                            </span>
                                        </div>
                                        {msg.offerStatus === 'paid' && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                                    </div>
                                    <div className="p-4">
                                        <p className="text-sm text-slate-600 mb-1 font-medium">{msg.text}</p>
                                        <p className="text-xs text-slate-400 mb-4">서비스 완료 승인 시까지 대금이 안전하게 보호됩니다.</p>
                                        
                                        <div className="flex justify-between items-end mb-4 pb-4 border-b border-slate-100">
                                            <span className="text-xs text-slate-500">결제 금액</span>
                                            <div className="text-xl font-bold text-slate-900">{msg.offerAmount}원</div>
                                        </div>

                                        {msg.offerStatus === 'pending' && (
                                            <div className="bg-orange-50 rounded-lg p-2 mb-3 flex gap-2 items-start">
                                                <FileSignature className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                                                <p className="text-[11px] text-orange-700 leading-snug">
                                                    결제 전 전자계약서 서명이 필요합니다.
                                                </p>
                                            </div>
                                        )}
                                        
                                        {msg.offerStatus !== 'pending' && (
                                            <div className="bg-slate-50 rounded-lg p-2 mb-3 flex gap-2 items-start">
                                                <ShieldAlert className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                                <p className="text-[11px] text-slate-500 leading-snug">
                                                    탐정월드가 결제 대금을 보관하며, 의뢰인이 최종 승인해야 탐정에게 지급됩니다.
                                                </p>
                                            </div>
                                        )}

                                        {/* Buttons Grid */}
                                        <div className="space-y-2">
                                            {msg.offerStatus === 'pending' && (
                                                <Button 
                                                    className="w-full h-10 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100"
                                                    onClick={() => handleOpenContract(msg.id)}
                                                >
                                                    <FileSignature className="w-4 h-4 mr-2" />
                                                    전자계약서 확인 및 서명
                                                </Button>
                                            )}

                                            {msg.offerStatus === 'pending' && (
                                                <Button 
                                                    variant="outline"
                                                    className="w-full h-10 text-xs font-bold text-slate-600 border-slate-200 hover:bg-slate-50"
                                                    onClick={handleRequestRequote}
                                                >
                                                    <RefreshCw className="w-3.5 h-3.5 mr-2 text-slate-400" />
                                                    재견적 요청
                                                </Button>
                                            )}

                                            {msg.offerStatus === 'signed' && (
                                                <Button 
                                                    className="w-full h-10 text-xs font-bold bg-green-600 hover:bg-green-700 shadow-green-100"
                                                    onClick={() => handlePayment(msg.id)}
                                                >
                                                    <CreditCard className="w-4 h-4 mr-2" />
                                                    에스크로 결제 진행
                                                </Button>
                                            )}

                                            {msg.offerStatus === 'paid' && (
                                                <Button 
                                                    className="w-full h-10 text-xs font-bold bg-slate-100 text-slate-400 hover:bg-slate-100 shadow-none cursor-not-allowed"
                                                    disabled
                                                >
                                                    결제 완료 (보관 중)
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <span className="text-[10px] text-slate-400 mb-1 min-w-[40px] whitespace-nowrap">
                            {msg.time}
                        </span>
                    </div>
                </div>
            );
        })}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t pb-safe">
        {/* Expandable Menu */}
        {showPlusMenu && (
            <div className="grid grid-cols-4 gap-4 p-4 pb-2 bg-slate-50 border-b animate-in slide-in-from-bottom-10 fade-in duration-200">
                {[
                    { icon: ImageIcon, label: '앨범', action: triggerAlbum },
                    { icon: Camera, label: '카메라', action: triggerCamera },
                    { icon: FileText, label: '파일', action: triggerAlbum }, // Re-use album for file demo
                    { icon: MapPin, label: '위치', action: triggerLocation },
                    { icon: DollarSign, label: '견적요청', action: handleRequestQuote },
                    { icon: Phone, label: '안심통화', action: triggerCall },
                ].map((item, i) => (
                    <button key={i} onClick={item.action} className="flex flex-col items-center gap-2 p-2 group">
                        <div className="w-12 h-12 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-600 group-active:scale-95 group-hover:border-indigo-400 group-hover:text-indigo-600 transition-all shadow-sm">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] text-slate-500">{item.label}</span>
                    </button>
                ))}
            </div>
        )}

        <div className="px-3 py-2 flex items-end gap-2">
            <Button 
                variant="ghost" 
                size="icon" 
                className={`text-slate-400 hover:text-indigo-600 h-10 w-10 rounded-full shrink-0 transition-transform ${showPlusMenu ? 'rotate-45 bg-slate-100 text-slate-600' : ''}`}
                onClick={() => setShowPlusMenu(!showPlusMenu)}
            >
                <Plus className="w-6 h-6" />
            </Button>
            
            <div className="flex-1 bg-slate-100 rounded-[24px] flex items-center min-h-[42px] px-4 py-1 transition-colors focus-within:bg-white focus-within:ring-1 focus-within:ring-indigo-200 focus-within:border-indigo-200 border border-transparent">
                <Input 
                    className="border-none bg-transparent shadow-none focus-visible:ring-0 px-0 h-full text-sm py-2 resize-none"
                    placeholder="메시지를 입력하세요..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    autoComplete="off"
                />
            </div>

            <Button 
                size="icon" 
                className={`h-10 w-10 rounded-full shrink-0 transition-all ${inputValue ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'bg-slate-200 text-slate-400'}`}
                onClick={handleSend}
                disabled={!inputValue}
            >
                <Send className="w-5 h-5 ml-0.5" />
            </Button>
        </div>
      </div>
    </div>
  );
}
