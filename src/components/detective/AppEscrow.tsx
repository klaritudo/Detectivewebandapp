
import React from 'react';
import { ArrowLeft, Shield, CheckCircle, AlertCircle, CreditCard, Lock, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export function AppEscrow({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b flex items-center gap-3 sticky top-0 z-10">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-bold text-slate-900">안전결제(에스크로)</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        {/* Status Banner */}
        <div className="bg-indigo-600 p-6 text-white">
           <div className="flex items-center gap-2 mb-2 opacity-90">
               <Shield className="w-5 h-5" />
               <span className="text-sm font-bold">탐정월드 안전결제 보호 중</span>
           </div>
           <h1 className="text-2xl font-bold mb-1">결제 대기 중</h1>
           <p className="text-indigo-100 text-sm">의뢰인이 결제하면 대금이 안전하게 보관됩니다.</p>
        </div>

        {/* Progress Stepper */}
        <div className="bg-white p-6 border-b shadow-sm">
            <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-100 -z-10"></div>
                <div className="flex flex-col items-center gap-2 z-0">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center border-4 border-white shadow-sm">1</div>
                    <span className="text-[10px] font-bold text-indigo-600">결제대기</span>
                </div>
                <div className="flex flex-col items-center gap-2 z-0">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center border-4 border-white">2</div>
                    <span className="text-[10px] font-medium text-slate-400">진행중</span>
                </div>
                <div className="flex flex-col items-center gap-2 z-0">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center border-4 border-white">3</div>
                    <span className="text-[10px] font-medium text-slate-400">구매확정</span>
                </div>
            </div>
        </div>

        {/* Transaction Info */}
        <div className="p-4 space-y-4">
            <Card>
                <CardContent className="p-5">
                    <h3 className="font-bold text-slate-900 mb-4">거래 정보</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-slate-500">거래번호</span>
                            <span className="text-sm font-medium text-slate-900">20240525-00123</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-slate-500">상품명</span>
                            <span className="text-sm font-medium text-slate-900">배우자 외도 증거 수집 (심화)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-slate-500">탐정명</span>
                            <span className="text-sm font-medium text-slate-900">셜록 김탐정</span>
                        </div>
                         <div className="flex justify-between pt-3 border-t border-dashed">
                            <span className="text-sm font-bold text-slate-900">결제 금액</span>
                            <span className="text-lg font-bold text-indigo-600">1,500,000원</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

             {/* Safety Guide */}
             <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
                 <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                 <div>
                     <h4 className="text-sm font-bold text-blue-900 mb-1">안전결제란?</h4>
                     <p className="text-xs text-blue-700 leading-relaxed">
                         의뢰인이 결제한 금액을 '탐정월드'가 보관하다가, 
                         업무가 완료되고 의뢰인이 [구매확정]을 누르면 탐정에게 대금이 지급되는 안전한 시스템입니다.
                     </p>
                 </div>
             </div>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="bg-white p-4 border-t safe-bottom">
          <Button className="w-full h-14 text-lg bg-indigo-600 hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
              <Lock className="w-5 h-5" /> 1,500,000원 결제하기
          </Button>
          <p className="text-[10px] text-center text-slate-400 mt-3">
              결제 시 이용약관 및 개인정보처리방침에 동의하게 됩니다.
          </p>
      </div>
    </div>
  );
}
