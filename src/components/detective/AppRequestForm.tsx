
import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '../ui/drawer';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ShieldCheck } from 'lucide-react';

interface AppRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  targetDetective?: string;
}

export function AppRequestForm({ isOpen, onClose, onSubmit, targetDetective }: AppRequestFormProps) {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!category || !location || !description) {
        alert("모든 항목을 입력해주세요.");
        return;
    }
    
    onSubmit({
        category,
        location,
        description,
        targetDetective
    });
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="bg-slate-50 max-w-md mx-auto rounded-t-[24px]">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="text-left px-6 pt-6">
            <div className="flex items-center gap-2 mb-2">
                <div className="bg-indigo-100 p-1.5 rounded-full">
                    <ShieldCheck className="w-5 h-5 text-indigo-600" />
                </div>
                <DrawerTitle className="text-lg font-bold text-slate-900">의뢰 요청서 작성</DrawerTitle>
            </div>
            <DrawerDescription className="text-xs text-slate-500">
              작성하신 내용은 {targetDetective ? `'${targetDetective}'님 지정 요청건으로 ` : ''}
              탐정월드 관리자에게 전달되며, 담당 매니저가 배정되어 상담을 진행합니다.
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="px-6 py-2 space-y-4">
            <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">의뢰 분야</Label>
                <Select onValueChange={setCategory}>
                    <SelectTrigger className="bg-white border-slate-200">
                        <SelectValue placeholder="분야 선택 (예: 기업조사, 증거수집)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="corporate">기업 조사 / 산업 스파이</SelectItem>
                        <SelectItem value="evidence">증거 수집 / 사실 확인</SelectItem>
                        <SelectItem value="family">가사 / 가족 문제</SelectItem>
                        <SelectItem value="cyber">사이버 / 디지털 포렌식</SelectItem>
                        <SelectItem value="person">사람 찾기 / 소재 파악</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">활동 지역</Label>
                <Input 
                    placeholder="예: 서울 강남구, 경기도 성남시" 
                    className="bg-white border-slate-200"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">상담 내용 요약</Label>
                <Textarea 
                    placeholder="의뢰하시려는 내용을 간략히 적어주세요. (관리자 확인용)" 
                    className="bg-white border-slate-200 min-h-[100px] resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="bg-indigo-50 p-3 rounded-lg mt-2">
                <p className="text-[10px] text-indigo-800 leading-snug">
                    * 제출 시 탐정월드 관리자 채팅방이 생성됩니다.<br/>
                    * 초기 상담은 무료이며, 정식 의뢰 시 견적서가 발행됩니다.
                </p>
            </div>
          </div>

          <DrawerFooter className="px-6 pb-8 pt-4">
            <Button className="w-full h-12 text-md font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200" onClick={handleSubmit}>
              상담 요청 및 채팅 시작
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost" className="h-10 text-slate-400">취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
