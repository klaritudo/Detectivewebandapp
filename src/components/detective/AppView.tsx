
import React, { useState, useEffect } from 'react';
import { Home, MessageSquare, User, Search as SearchIcon, LogIn, Sun } from 'lucide-react';

import { AppHome } from './AppHome';
import { AppSearch } from './AppSearch';
import { AppChat } from './AppChat';
import { AppProfile } from './AppProfile';
import { AppLiveTracking } from './AppLiveTracking';
import { AppMatching } from './AppMatching';
import { AppDetectiveDetail } from './AppDetectiveDetail';
import { AppCaseHistory } from './AppCaseHistory';
import { AppPanicMode } from './AppPanicMode';
import { AppSecurityOverlay } from './AppSecurityOverlay';

// Auth Components
import { AppSplash } from './AppSplash';
import { AppLanding } from './AppLanding';
import { AppLogin } from './AppLogin';
import { AppSignup } from './AppSignup';
import { Button } from '../ui/button';

type AppState = 'splash' | 'landing' | 'login' | 'signup' | 'main' | 'matching';

export function AppView() {
  const [appState, setAppState] = useState<AppState>('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDetective, setSelectedDetective] = useState<string | null>(null);
  const [showTracking, setShowTracking] = useState(false);
  
  // Chat Session State
  const [chatSession, setChatSession] = useState<{ detectiveName: string, requestData?: any } | null>(null);
  
  // Guest mode state
  const [isGuest, setIsGuest] = useState(false);
  
  // Matching state
  const [matchingInitialCategory, setMatchingInitialCategory] = useState<string | null>(null);

  // Security State
  const [panicMode, setPanicMode] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Auto-Lock on Background
  useEffect(() => {
      const handleVisibilityChange = () => {
          if (document.hidden) {
              // App went to background -> Lock it
              setIsLocked(true);
          }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Handle navigation to chat detail from any tab
  const handleSelectDetective = (name: string) => {
    if (isGuest) {
        if (confirm("상담을 위해서는 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
            setAppState('login');
        }
        return;
    }
    setSelectedDetective(name);
  };

  const handleRequestChat = (requestData: any) => {
      // When request form is submitted in Detail view
      if (selectedDetective) {
          setChatSession({
              detectiveName: selectedDetective,
              requestData: requestData
          });
          setSelectedDetective(null); // Close detail view
      }
  };

  const handleSelectChatList = (name: string) => {
      // From Case List, we just open chat directly
      setChatSession({
          detectiveName: name
      });
  };

  const handleLoginSuccess = () => {
      setIsGuest(false);
      setAppState('main');
      setActiveTab('home');
  };

  const handleSignupSuccess = () => {
      setIsGuest(false);
      setAppState('main');
  };
  
  const handleGuestBrowse = () => {
      setIsGuest(true);
      setAppState('main');
      setActiveTab('home');
  }

  const handleLogout = () => {
      setAppState('landing');
      setIsGuest(false);
      setActiveTab('home');
  }

  const handleStartMatching = (categoryId?: string) => {
      // Allow Guest to start matching, we will check at the end
      setMatchingInitialCategory(categoryId || null);
      setAppState('matching');
  }

  // --- Panic Mode Render ---
  if (panicMode) {
      return <AppPanicMode onExit={() => setPanicMode(false)} />;
  }

  // --- Auth Flow ---

  if (appState === 'splash') {
      return <AppSplash onFinish={() => setAppState('landing')} />;
  }

  if (appState === 'landing') {
      return <AppLanding onLogin={() => setAppState('login')} onSignup={() => setAppState('signup')} onBrowse={handleGuestBrowse} />;
  }

  if (appState === 'login') {
      return <AppLogin onBack={() => setAppState('landing')} onLoginSuccess={handleLoginSuccess} />;
  }

  if (appState === 'signup') {
      return <AppSignup onBack={() => setAppState('landing')} onSignupSuccess={handleSignupSuccess} />;
  }

  // --- Main App Flow ---

  // Security Overlay (Only when logged in and not in auth screens)
  if (isLocked && !isGuest && appState === 'main') {
      return <AppSecurityOverlay onUnlock={() => setIsLocked(false)} />;
  }

  if (appState === 'matching') {
      return <AppMatching 
        onBack={() => {
            setAppState('main');
            setMatchingInitialCategory(null);
        }} 
        isGuest={isGuest}
        initialCategory={matchingInitialCategory}
        onLoginRequest={() => {
            setAppState('login');
        }}
        onComplete={() => {
            alert("매칭 요청이 접수되었습니다.");
            setAppState('main');
            setMatchingInitialCategory(null);
        }} 
      />;
  }

  if (showTracking) {
      return <AppLiveTracking detectiveName={chatSession?.detectiveName || "김철수 탐정"} onBack={() => setShowTracking(false)} />;
  }

  // Chat Session (Higher priority than Detective Detail)
  if (chatSession) {
      return (
        <AppChat 
            detectiveName={chatSession.detectiveName} 
            initialRequestData={chatSession.requestData}
            onBack={() => setChatSession(null)} 
            onOpenTracking={() => setShowTracking(true)} 
        />
      );
  }

  // Detective Detail View
  if (selectedDetective) {
    return (
        <AppDetectiveDetail 
            detectiveName={selectedDetective} 
            onBack={() => setSelectedDetective(null)} 
            onRequestChat={handleRequestChat}
        />
    );
  }

  // Render content based on active tab
  const renderContent = () => {
      if (isGuest && (activeTab === 'chat' || activeTab === 'profile')) {
          return (
              <div className="flex flex-col items-center justify-center h-full px-6 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                      <User className="w-10 h-10 text-indigo-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">로그인이 필요합니다</h2>
                  <p className="text-slate-500 mb-8">
                      {activeTab === 'chat' ? '전문가와의 상담 내역을 확인하려면' : '나의 활동 내역과 정보를 확인하려면'}
                      <br />로그인이 필요합니다.
                  </p>
                  <Button 
                    className="w-full h-14 text-lg font-bold bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-200"
                    onClick={() => setAppState('login')}
                  >
                      로그인 하러 가기
                  </Button>
              </div>
          );
      }

      switch (activeTab) {
          case 'home': return <AppHome onSelectDetective={handleSelectDetective} isGuest={isGuest} onStartMatching={handleStartMatching} />;
          case 'search': return <AppSearch onSelectDetective={handleSelectDetective} />;
          case 'chat': return <AppCaseHistory onBack={() => setActiveTab('home')} onOpenChat={handleSelectChatList} />; // Use CaseHistory (Dashboard)
          case 'profile': return <AppProfile onLogout={handleLogout} />; 
          default: return <AppHome onSelectDetective={handleSelectDetective} isGuest={isGuest} onStartMatching={handleStartMatching} />;
      }
  };

  return (
    <div className="h-full bg-slate-50 flex flex-col overflow-hidden max-w-md mx-auto border-x border-slate-200 shadow-2xl relative">
      
      {/* Panic Button (Hidden-ish) */}
      <button 
        onClick={() => setPanicMode(true)}
        className="absolute top-2 left-2 z-50 p-2 opacity-20 hover:opacity-100 transition-opacity text-yellow-500"
      >
          <Sun className="w-4 h-4" />
      </button>

      <div className="flex-1 overflow-hidden flex flex-col">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-slate-100 px-6 py-2 flex justify-between items-center pb-6 z-30">
        {[
            { id: 'home', icon: Home, label: '홈' },
            { id: 'search', icon: SearchIcon, label: '검색' },
            { id: 'chat', icon: MessageSquare, label: '내 의뢰' }, // Renamed label
            { id: 'profile', icon: isGuest ? LogIn : User, label: isGuest ? '로그인' : '마이' },
        ].map((item) => (
            <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
                <item.icon className={`w-6 h-6 ${activeTab === item.id ? 'fill-indigo-100' : ''}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
            </button>
        ))}
      </nav>
    </div>
  );
}
