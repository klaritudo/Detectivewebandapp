
import React from 'react';
import { Lock, Fingerprint, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/button';

interface AppSecurityOverlayProps {
  onUnlock: () => void;
}

export function AppSecurityOverlay({ onUnlock }: AppSecurityOverlayProps) {
  return (
    <div className="absolute inset-0 z-50 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center text-white p-6 animate-in fade-in duration-300">
      <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-8 shadow-2xl ring-4 ring-indigo-500/20">
        <Lock className="w-8 h-8 text-indigo-400" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">탐정월드 잠금</h2>
      <p className="text-slate-400 mb-12 text-center text-sm">
        개인정보 보호를 위해 앱이 잠겨있습니다.<br/>
        해제하려면 아래 버튼을 누르세요.
      </p>

      <Button 
        className="w-full max-w-xs h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-bold gap-3 shadow-lg shadow-indigo-900/50"
        onClick={onUnlock}
      >
        <Fingerprint className="w-6 h-6" />
        잠금 해제
      </Button>

      <div className="mt-8 flex items-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="w-3 h-3" />
        <span>안심 보안 모드 작동 중</span>
      </div>
    </div>
  );
}
