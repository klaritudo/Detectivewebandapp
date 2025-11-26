
import React, { useState } from 'react';
import { ArrowLeft, FileText, ImageIcon, Film, Download, Calendar, MapPin, User, Search, ChevronRight, Clock, AlertCircle, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../ui/dialog';

// Mock Data
const MY_CASES = [
    {
        id: 'C-20240525-01',
        type: '기업조사',
        status: '진행중',
        detective: '김철수 탐정',
        date: '2024.05.25',
        title: '사내 보안 유출 의심 건',
        description: '영업 비밀 유출 정황이 포착되어 증거 수집 및 경로 추적 요청',
        progress: 65,
        evidence: [
            { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop', name: '현장_사진_01.jpg', date: '2024.05.26 14:30' },
            { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=200&fit=crop', name: 'CCTV_캡처_03.png', date: '2024.05.26 15:45' },
            { id: 3, type: 'video', thumbnail: 'https://images.unsplash.com/photo-1535007813616-ef7b3015c71b?w=300&h=200&fit=crop', name: '녹취_현장_01.mp4', date: '2024.05.26 16:20' },
        ],
        reports: [
            { id: 1, name: '중간_보고서_1차.pdf', date: '2024.05.27', size: '2.4MB' }
        ]
    },
    {
        id: 'C-20240410-05',
        type: '사람찾기',
        status: '완료',
        detective: '이영희 탐정',
        date: '2024.04.10',
        title: '실종된 반려견 찾기',
        description: '강남구 역삼동 인근에서 실종된 골든리트리버 수색 요청',
        progress: 100,
        evidence: [
            { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=200&fit=crop', name: '발견_당시.jpg', date: '2024.04.12 10:00' },
        ],
        reports: [
            { id: 2, name: '최종_결과_보고서.pdf', date: '2024.04.13', size: '1.8MB' }
        ]
    }
];

interface AppCaseHistoryProps {
    onBack: () => void;
    onOpenChat?: (detectiveName: string) => void;
}

export function AppCaseHistory({ onBack, onOpenChat }: AppCaseHistoryProps) {
    const [selectedCase, setSelectedCase] = useState<typeof MY_CASES[0] | null>(null);
    const [activeTab, setActiveTab] = useState('evidence');

    // Detail View
    if (selectedCase) {
        return (
            <div className="h-full flex flex-col bg-slate-50">
                {/* Detail Header */}
                <div className="bg-white px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedCase(null)}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="flex-1">
                        <h2 className="text-base font-bold text-slate-900 truncate pr-4">{selectedCase.title}</h2>
                        <p className="text-xs text-slate-500">{selectedCase.id}</p>
                    </div>
                    <Badge variant={selectedCase.status === '완료' ? 'secondary' : 'default'}>
                        {selectedCase.status}
                    </Badge>
                </div>

                <ScrollArea className="flex-1">
                    <div className="p-4 space-y-6 pb-20">
                        {/* Case Info Card */}
                        <Card className="border-none shadow-sm">
                            <CardContent className="p-5">
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                                    <Avatar>
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${selectedCase.detective}`} />
                                        <AvatarFallback>DT</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{selectedCase.detective}</p>
                                        <p className="text-xs text-slate-500">담당 탐정</p>
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="ml-auto h-8 text-xs gap-1 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                                        onClick={() => onOpenChat?.(selectedCase.detective)}
                                    >
                                        <MessageSquare className="w-3 h-3" />
                                        상담방 이동
                                    </Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-xs text-slate-400 mb-1">의뢰 유형</p>
                                        <p className="font-medium text-slate-700">{selectedCase.type}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 mb-1">의뢰 일자</p>
                                        <p className="font-medium text-slate-700">{selectedCase.date}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-slate-500">진행률</span>
                                        <span className="font-bold text-indigo-600">{selectedCase.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${selectedCase.progress}%` }}></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Evidence & Reports Tabs */}
                        <Tabs defaultValue="evidence" className="w-full" onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-2 mb-4 bg-white p-1 border shadow-sm h-11 rounded-xl">
                                <TabsTrigger value="evidence" className="rounded-lg text-xs font-medium">
                                    증거 자료 ({selectedCase.evidence.length})
                                </TabsTrigger>
                                <TabsTrigger value="reports" className="rounded-lg text-xs font-medium">
                                    보고서 ({selectedCase.reports.length})
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="evidence" className="mt-0">
                                <div className="grid grid-cols-2 gap-3">
                                    {selectedCase.evidence.map((item) => (
                                        <Dialog key={item.id}>
                                            <DialogTrigger asChild>
                                                <div className="group relative aspect-square bg-slate-200 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all">
                                                    <img src={item.type === 'video' ? item.thumbnail : item.url} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                                    
                                                    {/* Type Icon Badge */}
                                                    <div className="absolute top-2 right-2 w-6 h-6 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                                                        {item.type === 'image' ? <ImageIcon className="w-3 h-3" /> : <Film className="w-3 h-3" />}
                                                    </div>

                                                    {/* Date Overlay */}
                                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-6">
                                                        <p className="text-[10px] text-white/90 truncate">{item.name}</p>
                                                        <p className="text-[9px] text-white/60">{item.date}</p>
                                                    </div>
                                                </div>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-[90vw] p-0 overflow-hidden bg-black border-none text-white">
                                                <DialogTitle className="sr-only">
                                                    {item.name}
                                                </DialogTitle>
                                                <DialogDescription className="sr-only">
                                                    {item.date}에 업로드된 증거 자료 상세 보기
                                                </DialogDescription>
                                                
                                                <div className="relative w-full h-[60vh] flex items-center justify-center bg-black">
                                                     <img src={item.url || item.thumbnail} className="max-w-full max-h-full object-contain" alt={item.name} />
                                                </div>
                                                <div className="p-4 bg-white text-slate-900">
                                                    <h3 className="font-bold mb-1">{item.name}</h3>
                                                    <p className="text-xs text-slate-500 mb-4">{item.date} 업로드됨</p>
                                                    <Button className="w-full gap-2">
                                                        <Download className="w-4 h-4" /> 다운로드
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    ))}
                                </div>
                                {selectedCase.evidence.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                                        <ImageIcon className="w-10 h-10 mb-2 opacity-20" />
                                        <p className="text-xs">등록된 증거 자료가 없습니다.</p>
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="reports" className="mt-0 space-y-3">
                                {selectedCase.reports.map((report) => (
                                    <div key={report.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-colors">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500 flex-shrink-0">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600">{report.name}</h4>
                                                <p className="text-xs text-slate-500 flex items-center gap-2">
                                                    <span>{report.date}</span>
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                                    <span>{report.size}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-600">
                                            <Download className="w-5 h-5" />
                                        </Button>
                                    </div>
                                ))}
                                 {selectedCase.reports.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                                        <FileText className="w-10 h-10 mb-2 opacity-20" />
                                        <p className="text-xs">등록된 보고서가 없습니다.</p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                        
                        <div className="bg-blue-50 p-4 rounded-xl text-xs text-blue-700 flex gap-3 items-start">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p>모든 증거물과 보고서는 보안 규정에 따라 암호화되어 저장됩니다. 의뢰 종료 후 30일 뒤 자동으로 파기될 수 있습니다.</p>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        );
    }

    // List View
    return (
        <div className="h-full flex flex-col bg-slate-50">
            <div className="bg-white px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={onBack}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-lg font-bold text-slate-900">의뢰 내역</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 pb-20 space-y-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input placeholder="의뢰명, 탐정 이름 검색" className="pl-10 bg-white border-slate-200 shadow-sm" />
                </div>

                {/* List */}
                <div className="space-y-3">
                    {MY_CASES.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => setSelectedCase(item)}
                            className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 active:scale-[0.98] transition-all cursor-pointer group hover:shadow-md"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <Badge variant={item.status === '완료' ? 'secondary' : 'default'} className="shadow-sm">
                                    {item.status}
                                </Badge>
                                <span className="text-xs text-slate-400 font-mono">{item.date}</span>
                            </div>
                            
                            <h3 className="font-bold text-slate-900 mb-1 text-base group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                            <p className="text-sm text-slate-500 line-clamp-2 mb-4">{item.description}</p>
                            
                            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                <div className="flex items-center gap-2">
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage src={`https://i.pravatar.cc/150?u=${item.detective}`} />
                                        <AvatarFallback>DT</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs font-bold text-slate-700">{item.detective}</span>
                                </div>
                                <div className="flex items-center text-xs text-slate-400 gap-1">
                                    증거 {item.evidence.length}건 <ChevronRight className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center py-6">
                    <p className="text-xs text-slate-400">최근 1년 간의 의뢰 내역만 표시됩니다.</p>
                </div>
            </div>
        </div>
    );
}
