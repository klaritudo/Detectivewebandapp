
import React, { useState } from 'react';
import { Users, FileText, TrendingUp, Settings, AlertCircle, LogOut, Menu, Bell, Search, ChevronRight, Filter, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MOCK_STATS, MOCK_CASES } from './data';
import { AppLiveTracking } from './AppLiveTracking';

type AdminTab = 'dashboard' | 'users' | 'cases' | 'reports' | 'settings';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [trackingTarget, setTrackingTarget] = useState<string | null>(null);

  // ... MobileHeader, MobileBottomNav, NavButton components ...

  // Mobile Content Components
  const MobileHeader = () => (
    <header className="bg-white border-b px-4 py-3 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">AD</div>
            <h1 className="font-bold text-slate-900 text-lg">Admin</h1>
        </div>
        <div className="flex items-center gap-3">
            <button className="relative">
                <Bell className="w-6 h-6 text-slate-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
            </Avatar>
        </div>
    </header>
  );

  const MobileBottomNav = () => (
    <nav className="fixed bottom-0 w-full bg-white border-t border-slate-200 px-6 py-2 flex justify-between items-center pb-6 z-30 md:hidden">
        <NavButton tab="dashboard" icon={TrendingUp} label="홈" />
        <NavButton tab="users" icon={Users} label="회원" />
        <NavButton tab="cases" icon={FileText} label="의뢰" />
        <NavButton tab="reports" icon={AlertCircle} label="신고" />
        <NavButton tab="settings" icon={Settings} label="설정" />
    </nav>
  );

  const NavButton = ({ tab, icon: Icon, label }: { tab: AdminTab, icon: any, label: string }) => (
      <button 
        onClick={() => setActiveTab(tab)}
        className={`flex flex-col items-center gap-1 ${activeTab === tab ? 'text-slate-900' : 'text-slate-400'}`}
      >
          <Icon className={`w-6 h-6 ${activeTab === tab ? 'fill-slate-100' : ''}`} />
          <span className="text-[10px] font-medium">{label}</span>
      </button>
  );

  const MobileCaseList = () => (
      <div className="space-y-3 pb-20">
          {MOCK_CASES.map((c) => (
              <div key={c.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="bg-slate-50">{c.id}</Badge>
                      <div className="flex items-center gap-2">
                          {c.status === '진행중' && (
                              <Button size="sm" variant="ghost" className="h-6 text-[10px] text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2" onClick={() => setTrackingTarget("김철수 탐정")}>
                                  <MapPin className="w-3 h-3 mr-1" /> 위치추적
                              </Button>
                          )}
                          <Badge variant={c.status === '완료' ? 'secondary' : c.status === '진행중' ? 'default' : 'outline'}>
                              {c.status}
                          </Badge>
                      </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{c.type}</h3>
                  <div className="text-xs text-slate-500 flex flex-col gap-1 mb-3">
                      <span>의뢰인: {c.client}</span>
                      <span>날짜: {c.date}</span>
                  </div>
                  <div className="flex items-center justify-between border-t pt-3">
                      <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500" style={{ width: `${c.matchScore}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-indigo-600">{c.matchScore}% 매칭</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 text-xs">상세보기 <ChevronRight className="w-3 h-3 ml-1"/></Button>
                  </div>
              </div>
          ))}
      </div>
  );

  const DashboardContent = () => (
    <div className="space-y-6">
        {/* ... Stats Grid ... */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_STATS.map((stat, i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
                <CardTitle className="text-xs font-medium text-slate-500">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-xl font-bold">{stat.value}</div>
                <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                    <span className="text-green-500 font-bold">↑ 20%</span> 지난 달 대비
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Cases Section */}
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-900">최근 의뢰</h2>
                <Button variant="ghost" size="sm" className="text-xs text-slate-500">전체보기</Button>
            </div>
            
            {/* Mobile View: List */}
            <div className="md:hidden">
                <MobileCaseList />
            </div>

            {/* Desktop View: Table */}
            <Card className="hidden md:block shadow-sm">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>의뢰 번호</TableHead>
                                <TableHead>유형</TableHead>
                                <TableHead>의뢰인</TableHead>
                                <TableHead>날짜</TableHead>
                                <TableHead>상태</TableHead>
                                <TableHead>매칭 점수</TableHead>
                                <TableHead className="text-right">관리</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {MOCK_CASES.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell className="font-medium">{c.id}</TableCell>
                                    <TableCell>{c.type}</TableCell>
                                    <TableCell>{c.client}</TableCell>
                                    <TableCell>{c.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={c.status === '완료' ? 'secondary' : c.status === '진행중' ? 'default' : 'outline'}>
                                            {c.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500" style={{ width: `${c.matchScore}%` }}></div>
                                            </div>
                                            <span className="text-xs text-slate-500">{c.matchScore}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {c.status === '진행중' && (
                                            <Button size="sm" variant="ghost" className="mr-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50" onClick={() => setTrackingTarget("김철수 탐정")}>
                                                <MapPin className="w-3 h-3 mr-1" /> 위치
                                            </Button>
                                        )}
                                        <Button size="sm" variant="ghost">상세보기</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </div>
  );

  // ... UsersContent ...
  const UsersContent = () => (
      <div className="space-y-4 pb-20">
          {/* ... content ... */}
           <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 sticky top-0 z-10">
              <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="회원 이름, 이메일 검색" className="pl-10 bg-slate-50 border-none" />
              </div>
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  <Button size="sm" variant="outline" className="rounded-full text-xs h-8">전체</Button>
                  <Button size="sm" variant="secondary" className="rounded-full text-xs h-8">일반회원</Button>
                  <Button size="sm" variant="secondary" className="rounded-full text-xs h-8">탐정</Button>
                  <Button size="sm" variant="secondary" className="rounded-full text-xs h-8">블랙리스트</Button>
              </div>
          </div>

          <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-4">
                      <Avatar>
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                          <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                          <div className="flex justify-between">
                              <h4 className="font-bold text-slate-900 text-sm">user_{i}</h4>
                              <Badge variant="outline" className="text-[10px] h-5">일반</Badge>
                          </div>
                          <p className="text-xs text-slate-500">user{i}@example.com</p>
                      </div>
                      <Button variant="ghost" size="icon"><Settings className="w-4 h-4 text-slate-400" /></Button>
                  </div>
              ))}
          </div>
      </div>
  );

  if (trackingTarget) {
      return (
          <div className="h-screen flex flex-col bg-slate-100 relative">
              <div className="absolute top-4 left-4 z-50">
                  <Button variant="secondary" onClick={() => setTrackingTarget(null)} className="shadow-lg bg-white">
                      <ChevronRight className="w-4 h-4 rotate-180 mr-1" /> 돌아가기
                  </Button>
              </div>
              <AppLiveTracking detectiveName={trackingTarget} onBack={() => setTrackingTarget(null)} />
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-slate-300 flex-col fixed h-full">
        <div className="p-6">
           <h2 className="text-2xl font-bold text-white tracking-wider">ADMIN</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Button variant="ghost" className={`w-full justify-start ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`} onClick={() => setActiveTab('dashboard')}>
            <TrendingUp className="mr-2 h-4 w-4" /> 대시보드
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === 'users' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`} onClick={() => setActiveTab('users')}>
            <Users className="mr-2 h-4 w-4" /> 회원 관리
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === 'cases' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`} onClick={() => setActiveTab('cases')}>
            <FileText className="mr-2 h-4 w-4" /> 의뢰 관리
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === 'reports' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`} onClick={() => setActiveTab('reports')}>
            <AlertCircle className="mr-2 h-4 w-4" /> 신고 처리
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`} onClick={() => setActiveTab('settings')}>
            <Settings className="mr-2 h-4 w-4" /> 설정
          </Button>
        </nav>
        <div className="p-4">
            <Button variant="outline" className="w-full border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white">
                <LogOut className="mr-2 h-4 w-4" /> 로그아웃
            </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">
        
        {/* Desktop Header (Hidden on Mobile) */}
        <header className="hidden md:flex bg-white border-b px-8 py-4 justify-between items-center">
            <h1 className="text-xl font-bold text-slate-900">
                {activeTab === 'dashboard' && '관리자 대시보드'}
                {activeTab === 'users' && '회원 관리'}
                {activeTab === 'cases' && '의뢰 관리'}
                {activeTab === 'reports' && '신고 처리'}
                {activeTab === 'settings' && '설정'}
            </h1>
            <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Admin Account</span>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
            </div>
        </header>

        {/* Mobile Header (Visible on Mobile) */}
        <div className="md:hidden">
            <MobileHeader />
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-8">
             {activeTab === 'dashboard' && <DashboardContent />}
             {activeTab === 'users' && <UsersContent />}
             {activeTab === 'cases' && (
                 <div className="space-y-4 pb-20">
                    <div className="md:hidden"><MobileCaseList /></div>
                    <div className="hidden md:block">
                        <Card>
                            <CardHeader><CardTitle>전체 의뢰 목록</CardTitle></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>상태</TableHead><TableHead>관리</TableHead></TableRow></TableHeader>
                                    <TableBody>{MOCK_CASES.map(c => (
                                        <TableRow key={c.id}>
                                            <TableCell>{c.id}</TableCell>
                                            <TableCell>{c.status}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    {c.status === '진행중' && (
                                                        <Button size="sm" variant="outline" onClick={() => setTrackingTarget("김철수 탐정")}>
                                                            <MapPin className="w-3 h-3 mr-1" /> 위치
                                                        </Button>
                                                    )}
                                                    <Button size="sm">보기</Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}</TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                 </div>
             )}
             {activeTab === 'settings' && (
                 <div className="flex items-center justify-center h-full text-slate-400 flex-col gap-2">
                     <Settings className="w-10 h-10 opacity-20" />
                     <p>설정 페이지 준비중입니다.</p>
                 </div>
             )}
             {activeTab === 'reports' && (
                 <div className="flex items-center justify-center h-full text-slate-400 flex-col gap-2">
                     <AlertCircle className="w-10 h-10 opacity-20" />
                     <p>신고 내역이 없습니다.</p>
                 </div>
             )}
        </div>

        {/* Mobile Bottom Nav */}
        <MobileBottomNav />
      </main>
    </div>
  );
}
