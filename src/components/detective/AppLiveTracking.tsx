
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, Shield, Clock, MapPin, Navigation, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

interface AppLiveTrackingProps {
  detectiveName: string;
  onBack: () => void;
}

export function AppLiveTracking({ detectiveName, onBack }: AppLiveTrackingProps) {
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [timeLeft, setTimeLeft] = useState('02:45:00');

  return (
    <div className="h-full flex flex-col bg-slate-100 relative overflow-hidden">
      {/* Map Layer (Mock) */}
      <div className="absolute inset-0 z-0 bg-[#e5e7eb]">
        {/* Mock Map Background */}
        <div className="w-full h-full opacity-30" style={{ 
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
        }}></div>
        
        {/* Roads (Mock) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M0 100 C 100 100, 200 300, 400 200" stroke="white" strokeWidth="20" fill="none" />
            <path d="M100 0 L 100 800" stroke="white" strokeWidth="15" fill="none" />
            <path d="M0 400 L 400 500" stroke="white" strokeWidth="12" fill="none" />
        </svg>

        {/* Current Location Marker (Detective) */}
        <div className="absolute top-[30%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 animate-bounce">
            <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1691316749874-e89297ee4cf3?w=100&h=100&fit=crop" alt="Detective" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
            </div>
            <div className="bg-white px-3 py-1 rounded-full shadow-md mt-2 text-xs font-bold whitespace-nowrap">
                {detectiveName}
            </div>
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white mt-[-1px]"></div>
        </div>

        {/* User Location Marker */}
        <div className="absolute bottom-[20%] right-[20%] flex flex-col items-center opacity-50">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm ring-4 ring-blue-500/20"></div>
        </div>
      </div>

      {/* Header Overlay */}
      <div className="relative z-10 pt-4 px-4">
          <Button variant="secondary" size="icon" className="rounded-full shadow-lg bg-white hover:bg-slate-100" onClick={onBack}>
              <ArrowLeft className="w-5 h-5 text-slate-900" />
          </Button>
      </div>

      {/* Bottom Card Overlay */}
      <div className="mt-auto relative z-10 p-4">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100 flex items-center gap-1 animate-pulse">
                              <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                              실시간 위치 공유 중
                          </Badge>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {timeLeft} 남음
                          </span>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-slate-100">
                          <AlertTriangle className="w-4 h-4 text-slate-400" />
                      </Button>
                  </div>

                  <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1">
                          <h3 className="font-bold text-lg text-slate-900">현장 조사 진행 중</h3>
                          <p className="text-xs text-slate-500 mt-0.5">서울시 강남구 역삼동 인근 이동 중</p>
                      </div>
                      <div className="flex gap-2">
                          <Button size="icon" className="rounded-full bg-green-500 hover:bg-green-600 shadow-lg h-10 w-10">
                              <Phone className="w-4 h-4 text-white" />
                          </Button>
                          <Button size="icon" className="rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg h-10 w-10">
                              <Navigation className="w-4 h-4 text-white" />
                          </Button>
                      </div>
                  </div>

                  {/* Timeline Snippet */}
                  <div className="bg-slate-50 rounded-xl p-3 space-y-3">
                      <div className="flex gap-3 relative">
                          {/* Line */}
                          <div className="absolute top-2 left-[5px] bottom-0 w-0.5 bg-slate-200"></div>
                          
                          {/* Item 1 */}
                          <div className="relative z-10">
                              <div className="w-3 h-3 bg-indigo-500 rounded-full border-2 border-white shadow-sm"></div>
                          </div>
                          <div className="flex-1 -mt-1">
                              <p className="text-xs font-bold text-slate-900">역삼역 4번 출구 도착</p>
                              <p className="text-[10px] text-slate-400">14:30</p>
                          </div>
                      </div>
                       <div className="flex gap-3 relative">
                          <div className="relative z-10">
                              <div className="w-3 h-3 bg-slate-300 rounded-full border-2 border-white shadow-sm"></div>
                          </div>
                          <div className="flex-1 -mt-1">
                              <p className="text-xs font-medium text-slate-500">이동 시작</p>
                              <p className="text-[10px] text-slate-400">14:10</p>
                          </div>
                      </div>
                  </div>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
