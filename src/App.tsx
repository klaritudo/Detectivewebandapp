
import React, { useState } from 'react';
import { WebLanding } from './components/detective/WebLanding';
import { AppView } from './components/detective/AppView';
import { AdminDashboard } from './components/detective/AdminDashboard';
import { PartnerDashboard } from './components/detective/PartnerDashboard';
import { Monitor, Smartphone, UserCog, Users } from 'lucide-react';

// Helper component for the floating switcher
const ViewSwitcher = ({ currentView, setView }: { currentView: string, setView: (v: string) => void }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] bg-slate-900 text-white p-2 rounded-full shadow-2xl flex items-center gap-1 border border-slate-700">
      <button 
        onClick={() => setView('web')} 
        className={`p-2 rounded-full transition-all ${currentView === 'web' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        title="User Web View"
      >
        <Monitor size={20} />
      </button>
      <button 
        onClick={() => setView('app')} 
        className={`p-2 rounded-full transition-all ${currentView === 'app' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        title="User App View"
      >
        <Smartphone size={20} />
      </button>
      <div className="w-px h-6 bg-slate-700 mx-1"></div>
      <button 
        onClick={() => setView('partner')} 
        className={`p-2 rounded-full transition-all ${currentView === 'partner' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        title="Partner Dashboard"
      >
        <Users size={20} />
      </button>
      <button 
        onClick={() => setView('admin')} 
        className={`p-2 rounded-full transition-all ${currentView === 'admin' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
        title="Admin Dashboard"
      >
        <UserCog size={20} />
      </button>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState('web');

  return (
    <div className="relative min-h-screen bg-black">
      <ViewSwitcher currentView={currentView} setView={setCurrentView} />
      
      {currentView === 'web' && <WebLanding />}
      
      {currentView === 'app' && (
        <div className="w-full min-h-screen bg-slate-200 flex items-center justify-center p-4 md:p-8">
             {/* Phone Frame Simulation */}
             <div className="w-full max-w-[400px] h-[800px] bg-black rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-50"></div>
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    <AppView />
                </div>
             </div>
        </div>
      )}
      
      {currentView === 'admin' && <AdminDashboard />}
      
      {currentView === 'partner' && <PartnerDashboard />}
    </div>
  );
}
