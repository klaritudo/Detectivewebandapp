
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, MessageSquare, Calendar, ChevronRight, ShieldCheck, Clock, AlertCircle, FileCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface AppMyCasesProps {
  onSelectChat: (detectiveName: string) => void;
}

// Mock Data
const MY_CASES = [
    {
        id: 'C-240525-01',
        detective: '김철수 탐정',
        title: '기업 산업 스파이 보안 진단',
        status: 'in_progress', // reviewing, payment_needed, in_progress, completed
        progress: 60,
        lastMessage: '현장 증거 수집 2일차 진행 중입니다. 중간 보고서 확인 부탁드립니다.',
        date: '방금 전',
        badge: '진행중'
    },
    {
        id: 'C-240520-03',
        detective: '이영희 탐정',
        title: '가정 문제 사실 확인 조사',
        status: 'payment_needed',
        progress: 30,
        lastMessage: '전자 계약서 서명이 완료되었습니다. 에스크로 결제를 진행해주세요.',
        date: '1시간 전',
        badge: '결제대기'
    },
    {
        id: 'C-240510-09',
        detective: '박지성 탐정',
        title: '스토킹 피해 증거 수집',
        status: 'reviewing',
        progress: 10,
        lastMessage: '안녕하세요 매니저입니다. 의뢰 내용을 분석하고 있습니다.',
        date: '어제',
        badge: '검토중'
    },
    {
        id: 'C-240415-02',
        detective: '최강림 탐정',
        title: '실종자 소재 파악',
        status: 'completed',
        progress: 100,
        lastMessage: '의뢰가 최종 승인되었습니다. 이용해 주셔서 감사합니다.',
        date: '2024.04.20',
        badge: '완료됨'
    }
];

export function AppMyCases({ onSelectChat }: AppMyCasesProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  const filteredCases = MY_CASES.filter(c => 
      activeTab === 'active' ? c.status !== 'completed' : c.status === 'completed'
  );

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'reviewing': return 'bg-slate-500';
          case 'payment_needed': return 'bg-indigo-600';
          case 'in_progress': return 'bg-green-600';
          case 'completed': return 'bg-slate-400';
          default: return 'bg-slate-500';
      }
  };

  const getStatusIcon = (status: string) => {
      switch(status) {
          case 'reviewing': return <Clock className="w-3 h-3" />;
          case 'payment_needed': return <AlertCircle className="w-3 h-3" />;
          case 'in_progress': return <ShieldCheck className="w-3 h-3" />;
          case 'completed': return <FileCheck className="w-3 h-3" />;
          default: return <Clock className="w-3 h-3" />;
      }
  };

  return (
    <div className="h-full bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b sticky top-0 z-10">
        <h1 className="text-lg font-bold text-slate-900">내 의뢰 관리</h1>
        <Button variant="ghost" size="icon">
            <Filter className="w-5 h-5 text-slate-600" />
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b bg-white">
          <button 
            className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'active' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
            onClick={() => setActiveTab('active')}
          >
              진행 중인 의뢰 ({MY_CASES.filter(c => c.status !== 'completed').length})
          </button>
          <button 
            className={`flex-1 py-3 text-sm font-bold border-b-2 ${activeTab === 'completed' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400'}`}
            onClick={() => setActiveTab('completed')}
          >
              완료된 의뢰
          </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredCases.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <FileCheck className="w-12 h-12 mb-2 opacity-20" />
                <p className="text-sm">의뢰 내역이 없습니다.</p>
            </div>
        ) : (
            filteredCases.map((item) => (
                <div 
                    key={item.id} 
                    className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden active:scale-[0.98] transition-transform cursor-pointer"
                    onClick={() => onSelectChat(item.detective)}
                >
                    {/* Card Header */}
                    <div className="px-4 py-3 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                        <span className="text-[10px] font-bold text-slate-500">{item.id}</span>
                        <Badge variant="secondary" className={`text-[10px] h-5 gap-1 text-white border-none ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                            {item.badge}
                        </Badge>
                    </div>

                    {/* Card Body */}
                    <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">{item.title}</h3>
                                <div className="flex items-center gap-1.5">
                                    <Avatar className="w-5 h-5">
                                        <AvatarFallback className="text-[9px] bg-slate-200">DT</AvatarFallback>
                                    </Avatar>
                                    <span className="text-xs text-slate-600">{item.detective}</span>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300" />
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4 space-y-1.5">
                            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                                <span>진행률</span>
                                <span>{item.progress}%</span>
                            </div>
                            <Progress value={item.progress} className="h-1.5 bg-slate-100" indicatorClassName={getStatusColor(item.status)} />
                        </div>

                        {/* Last Message Preview */}
                        <div className="bg-slate-50 rounded-lg p-3 flex gap-3 items-start">
                            <MessageSquare className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-slate-600 line-clamp-1">{item.lastMessage}</p>
                                <span className="text-[10px] text-slate-400 mt-1 block">{item.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
}
