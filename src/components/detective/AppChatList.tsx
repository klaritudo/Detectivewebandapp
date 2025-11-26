
import React, { useState } from 'react';
import { MessageSquare, Search, MoreHorizontal, Pin, Check, Clock, MapPin, Filter, ShieldCheck, FileSignature, Briefcase } from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

interface AppChatListProps {
  onSelectChat: (name: string) => void;
}

export function AppChatList({ onSelectChat }: AppChatListProps) {
  const [activeFilter, setActiveFilter] = useState<'active' | 'completed'>('active');

  return (
    <div className="h-full bg-slate-50 flex flex-col">
      <div className="px-4 py-4 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">내 의뢰 현황</h2>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-100">
                <Filter className="w-5 h-5" />
            </Button>
        </div>

        <Tabs defaultValue="active" className="w-full" onValueChange={(v) => setActiveFilter(v as any)}>
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 h-10">
                <TabsTrigger value="active" className="text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm">진행 중 (2)</TabsTrigger>
                <TabsTrigger value="completed" className="text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">종료 (5)</TabsTrigger>
            </TabsList>
        </Tabs>
      </div>
      
      <ScrollArea className="flex-1 pb-20 p-4">
        <div className="space-y-3">
           {activeFilter === 'active' ? (
             <>
               {/* Case 1: Contract Pending */}
               <div className="bg-white rounded-xl p-4 border border-orange-200 shadow-sm cursor-pointer hover:border-indigo-300 transition-colors" onClick={() => onSelectChat("김철수 탐정")}>
                 <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200 text-[10px] px-2 py-0.5 font-bold">
                            계약 대기
                        </Badge>
                        <span className="text-[10px] text-slate-400">2024.05.25</span>
                    </div>
                    <span className="flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5">1</span>
                 </div>
                 
                 <div className="flex gap-4 items-center">
                    <div className="relative shrink-0">
                        <Avatar className="w-12 h-12 border border-slate-100">
                            <AvatarFallback className="bg-indigo-100 text-indigo-600 font-bold text-xs">DT</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
                            <div className="bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-sm mb-1 truncate">기업 보안 진단 요청건</h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <FileSignature className="w-3.5 h-3.5 text-orange-500" />
                            <span className="truncate">전자계약서 서명이 필요합니다.</span>
                        </div>
                    </div>
                 </div>
               </div>

               {/* Case 2: Active Investigation */}
               <div className="bg-white rounded-xl p-4 border border-indigo-100 shadow-sm cursor-pointer hover:border-indigo-300 transition-colors" onClick={() => onSelectChat("박민수 탐정")}>
                 <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-indigo-50 text-indigo-600 border-indigo-200 text-[10px] px-2 py-0.5 font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3" /> 진행 중
                        </Badge>
                        <span className="text-[10px] text-slate-400">2024.05.20</span>
                    </div>
                 </div>
                 
                 <div className="flex gap-4 items-center">
                    <div className="relative shrink-0">
                        <Avatar className="w-12 h-12 border border-slate-100">
                            <AvatarFallback className="bg-slate-100 text-slate-500 font-bold text-xs">PM</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-sm mb-1 truncate">가사 문제 증거 수집 (박민수 탐정)</h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                            <span className="truncate">실시간 위치 공유 중입니다.</span>
                        </div>
                    </div>
                 </div>
               </div>
             </>
           ) : (
             <>
                {/* Completed Cases */}
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm opacity-70 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => onSelectChat(`탐정 ${i}`)}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 font-bold">
                                    종료됨
                                </Badge>
                                <span className="text-[10px] text-slate-400">2024.04.1{i}</span>
                            </div>
                        </div>
                        
                        <div className="flex gap-4 items-center">
                            <div className="relative shrink-0">
                                <Avatar className="w-12 h-12 border border-slate-100 grayscale">
                                    <AvatarFallback className="bg-slate-100 text-slate-400 text-xs">END</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-slate-700 text-sm mb-1 truncate">지난 상담 내역 {i}</h3>
                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                    <Check className="w-3.5 h-3.5" />
                                    <span className="truncate">의뢰가 정상적으로 종료되었습니다.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
             </>
           )}
        </div>

        {/* Empty State Hint */}
        {activeFilter === 'active' && (
             <div className="mt-8 text-center p-6 bg-white rounded-xl border border-dashed border-slate-200">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">새로운 의뢰가 필요하신가요?</h3>
                <p className="text-xs text-slate-500 mb-4">검증된 탐정에게 무료 상담을 요청해보세요.</p>
                <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                    탐정 찾기 바로가기
                </Button>
            </div>
        )}
      </ScrollArea>
    </div>
  );
}
