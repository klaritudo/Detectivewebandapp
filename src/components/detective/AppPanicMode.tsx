
import React from 'react';
import { Cloud, Sun, Wind, Droplets } from 'lucide-react';

interface AppPanicModeProps {
  onExit: () => void;
}

export function AppPanicMode({ onExit }: AppPanicModeProps) {
  return (
    <div className="h-full bg-gradient-to-b from-sky-400 to-sky-200 flex flex-col text-white p-6 relative">
      {/* Secret Exit Trigger: Long Press or Triple Click on the Icon */}
      <div 
        className="absolute top-6 left-6 p-4 opacity-0 z-50"
        onDoubleClick={onExit}
      >
        SECRET_EXIT
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-medium mb-1">Seoul</h2>
        <p className="text-sm opacity-80">South Korea</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        <Sun className="w-32 h-32 text-yellow-300 mb-4 animate-pulse" />
        <h1 className="text-6xl font-light mb-2">24°</h1>
        <p className="text-xl font-medium">Sunny</p>
        
        <div className="flex justify-center gap-8 mt-12 w-full max-w-xs">
          <div className="flex flex-col items-center">
            <Wind className="w-6 h-6 mb-2 opacity-80" />
            <span className="text-sm font-medium">3km/h</span>
            <span className="text-xs opacity-60">Wind</span>
          </div>
          <div className="flex flex-col items-center">
            <Droplets className="w-6 h-6 mb-2 opacity-80" />
            <span className="text-sm font-medium">48%</span>
            <span className="text-xs opacity-60">Humidity</span>
          </div>
          <div className="flex flex-col items-center">
            <Cloud className="w-6 h-6 mb-2 opacity-80" />
            <span className="text-sm font-medium">0%</span>
            <span className="text-xs opacity-60">Rain</span>
          </div>
        </div>
      </div>

      <div className="bg-white/20 rounded-3xl p-6 backdrop-blur-md">
        <h3 className="text-sm font-medium mb-4 opacity-90">Weekly Forecast</h3>
        <div className="flex justify-between">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <span className="text-xs opacity-80">{day}</span>
              {i % 2 === 0 ? <Sun className="w-5 h-5 text-yellow-300" /> : <Cloud className="w-5 h-5" />}
              <span className="text-sm font-medium">{22 + i}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
