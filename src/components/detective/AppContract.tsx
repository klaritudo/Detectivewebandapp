
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, FileText, CheckCircle2, PenTool, ShieldCheck, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '../ui/drawer';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

interface AppContractProps {
  isOpen: boolean;
  onClose: () => void;
  onSignComplete: () => void;
  contractData?: {
      detectiveName: string;
      amount: string;
      period: string;
  };
}

export function AppContract({ isOpen, onClose, onSignComplete, contractData }: AppContractProps) {
  const [step, setStep] = useState<'view' | 'sign' | 'complete'>('view');
  const [agreed, setAgreed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSigned, setIsSigned] = useState(false);

  // Simple signature pad logic
  useEffect(() => {
      if (step === 'sign' && canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.strokeStyle = '#000';

          let drawing = false;

          const startDraw = (e: any) => {
              drawing = true;
              const rect = canvas.getBoundingClientRect();
              const x = (e.clientX || e.touches[0].clientX) - rect.left;
              const y = (e.clientY || e.touches[0].clientY) - rect.top;
              ctx.beginPath();
              ctx.moveTo(x, y);
          };

          const draw = (e: any) => {
              if (!drawing) return;
              const rect = canvas.getBoundingClientRect();
              const x = (e.clientX || e.touches[0].clientX) - rect.left;
              const y = (e.clientY || e.touches[0].clientY) - rect.top;
              ctx.lineTo(x, y);
              ctx.stroke();
              setIsSigned(true);
          };

          const stopDraw = () => {
              drawing = false;
          };

          canvas.addEventListener('mousedown', startDraw);
          canvas.addEventListener('mousemove', draw);
          canvas.addEventListener('mouseup', stopDraw);
          canvas.addEventListener('touchstart', startDraw);
          canvas.addEventListener('touchmove', draw);
          canvas.addEventListener('touchend', stopDraw);

          return () => {
              canvas.removeEventListener('mousedown', startDraw);
              canvas.removeEventListener('mousemove', draw);
              canvas.removeEventListener('mouseup', stopDraw);
              canvas.removeEventListener('touchstart', startDraw);
              canvas.removeEventListener('touchmove', draw);
              canvas.removeEventListener('touchend', stopDraw);
          };
      }
  }, [step]);

  const handleClear = () => {
      if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          setIsSigned(false);
      }
  };

  const renderContent = () => {
      if (step === 'view') {
          return (
              <div className="px-6 py-4 space-y-4 overflow-y-auto max-h-[60vh]">
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-600 leading-relaxed h-64 overflow-y-scroll">
                      <h4 className="font-bold text-slate-900 mb-2 text-center">[ 탐정 업무 위임 계약서 ]</h4>
                      <p>
                          <strong>제1조 (목적)</strong><br/>
                          본 계약은 의뢰인(이하 "갑")이 탐정월드 파트너(이하 "을")에게 특정 업무를 위임하고, "을"이 이를 성실히 수행함을 목적으로 한다.
                      </p>
                      <br/>
                      <p>
                          <strong>제2조 (업무 내용 및 기간)</strong><br/>
                          - 담당 탐정: {contractData?.detectiveName || '배정된 탐정'}<br/>
                          - 계약 금액: {contractData?.amount || '견적서 참조'}<br/>
                          - 수행 기간: {contractData?.period || '착수일로부터 7일'}
                      </p>
                      <br/>
                      <p>
                          <strong>제3조 (비밀 유지)</strong><br/>
                          "을"은 업무 수행 중 알게 된 "갑"의 모든 개인정보 및 의뢰 내용을 제3자에게 누설해서는 안 된다.
                      </p>
                      <br/>
                      <p>
                          <strong>제4조 (책임의 한계)</strong><br/>
                          "을"은 현행법을 준수하며, 불법적인 수단(도청, 해킹 등)을 사용하지 않는다. 불법 의뢰 시 계약은 즉시 파기된다.
                      </p>
                      <div className="mt-4 text-center text-slate-400">
                          - 이하 생략 -
                      </div>
                  </div>

                  <div className="flex items-center space-x-2 py-2">
                      <Checkbox id="terms" checked={agreed} onCheckedChange={(c) => setAgreed(c === true)} />
                      <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          위 계약 내용을 모두 확인하였으며 이에 동의합니다.
                      </Label>
                  </div>

                  <Button 
                      className="w-full bg-indigo-600 hover:bg-indigo-700" 
                      disabled={!agreed}
                      onClick={() => setStep('sign')}
                  >
                      다음: 전자 서명
                  </Button>
              </div>
          );
      }

      if (step === 'sign') {
          return (
              <div className="px-6 py-4 space-y-4">
                  <div className="text-center space-y-1">
                      <h3 className="font-bold text-lg">전자 서명</h3>
                      <p className="text-xs text-slate-500">아래 영역에 서명해주세요.</p>
                  </div>
                  
                  <div className="border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 touch-none h-48 relative">
                      <canvas 
                          ref={canvasRef} 
                          width={300} 
                          height={192} 
                          className="w-full h-full rounded-xl cursor-crosshair"
                      />
                      {!isSigned && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-300">
                              <PenTool className="w-8 h-8 opacity-20" />
                          </div>
                      )}
                  </div>

                  <div className="flex gap-2">
                      <Button variant="outline" onClick={handleClear} className="flex-1">지우기</Button>
                      <Button 
                          className="flex-[2] bg-indigo-600 hover:bg-indigo-700" 
                          disabled={!isSigned}
                          onClick={() => setStep('complete')}
                      >
                          서명 완료
                      </Button>
                  </div>
              </div>
          );
      }

      if (step === 'complete') {
          return (
              <div className="px-6 py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ShieldCheck className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900">계약 체결 완료</h3>
                  <p className="text-sm text-slate-500">
                      전자 계약이 정상적으로 체결되었습니다.<br/>
                      계약서는 이메일로 발송되며,<br/>이제 안심결제를 진행하실 수 있습니다.
                  </p>
                  
                  <Button variant="outline" className="w-full gap-2 text-slate-600">
                      <Download className="w-4 h-4" />
                      계약서 다운로드
                  </Button>
                  
                  <Button 
                      className="w-full bg-indigo-600 hover:bg-indigo-700 mt-2" 
                      onClick={() => {
                          onSignComplete();
                          onClose();
                      }}
                  >
                      확인 및 결제 진행
                  </Button>
              </div>
          );
      }
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-white max-w-md mx-auto rounded-t-[24px]">
        <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
                <DrawerTitle className="flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    {step === 'complete' ? '완료' : '전자 계약서 작성'}
                </DrawerTitle>
            </DrawerHeader>
            
            {renderContent()}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
