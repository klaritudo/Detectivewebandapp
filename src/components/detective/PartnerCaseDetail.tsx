
import React from 'react';
import { ArrowLeft, Calendar, DollarSign, MoreHorizontal, FileText, Plus, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

interface PartnerCaseDetailProps {
  caseData: any;
  onBack: () => void;
}

export function PartnerCaseDetail({ caseData, onBack }: PartnerCaseDetailProps) {
  if (!caseData) return <div>Loading...</div>;

  return (
    <div className="h-full flex flex-col animate-in slide-in-from-right-8 duration-500">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        {caseData.id}
                        <Badge className={caseData.status === '진행중' ? 'bg-green-500' : 'bg-slate-500'}>
                            {caseData.status}
                        </Badge>
                    </h2>
                    <p className="text-sm text-slate-500">의뢰일: {caseData.date}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">보고서 작성</Button>
                <Button className="bg-indigo-600 hover:bg-indigo-500">진행사항 업데이트</Button>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-6 h-full">
            {/* Left Col: Case Info */}
            <div className="col-span-2 space-y-6">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-medium text-slate-500">의뢰 상세 내용</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                            {caseData.type} 관련 의뢰
                        </h3>
                        <div className="p-4 bg-slate-50 rounded-lg text-slate-700 text-sm leading-relaxed mb-6">
                            {caseData.description || "의뢰 상세 내용이 없습니다."}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 border rounded-lg">
                                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                                    <DollarSign className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">예산 규모</p>
                                    <p className="font-bold text-sm">{caseData.budget || "미정"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 border rounded-lg">
                                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">예상 기간</p>
                                    <p className="font-bold text-sm">2주 소요</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                        <CardTitle className="text-base font-medium text-slate-500">활동 타임라인</CardTitle>
                        <Button variant="ghost" size="sm" className="text-xs"><Plus className="w-3 h-3 mr-1"/> 기록 추가</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="relative pl-6 border-l-2 border-slate-100 space-y-8">
                            {(caseData.timeline || []).map((item: any, idx: number) => (
                                <div key={idx} className="relative">
                                    <div className="absolute -left-[29px] top-0 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white ring-2 ring-indigo-100"></div>
                                    <p className="text-xs text-slate-400 mb-1">{item.date}</p>
                                    <p className="text-sm font-medium text-slate-800">{item.content}</p>
                                </div>
                            ))}
                            <div className="relative">
                                <div className="absolute -left-[29px] top-0 w-3 h-3 rounded-full bg-slate-300 border-2 border-white"></div>
                                <p className="text-xs text-slate-400 mb-1">오늘</p>
                                <p className="text-sm text-slate-400 italic">기록된 활동이 없습니다.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Col: Client Info & Files */}
            <div className="space-y-6">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-medium text-slate-500">의뢰인 정보</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                                {caseData.client.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-slate-900">{caseData.client}</p>
                                <p className="text-xs text-slate-500">안심번호 0505-xxxx-xxxx</p>
                            </div>
                            <Button variant="ghost" size="icon" className="ml-auto">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                         </div>
                         <Button className="w-full" variant="outline">1:1 채팅하기</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-medium text-slate-500">첨부 파일</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 cursor-pointer transition-colors">
                                <FileText className="w-5 h-5 text-slate-400" />
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-medium text-slate-700 truncate">사건_경위서_v1.pdf</p>
                                    <p className="text-[10px] text-slate-400">2.4 MB</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 cursor-pointer transition-colors">
                                <FileText className="w-5 h-5 text-slate-400" />
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-medium text-slate-700 truncate">참고_사진_모음.zip</p>
                                    <p className="text-[10px] text-slate-400">15.8 MB</p>
                                </div>
                            </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-2 text-xs text-slate-500 hover:text-indigo-600">
                            + 파일 업로드
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
