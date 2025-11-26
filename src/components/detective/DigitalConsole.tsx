
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Minus, Square, Play, Save, ShieldAlert, Wifi } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

interface Log {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error' | 'input';
  message: string;
  timestamp: string;
}

export function DigitalConsole({ onClose }: { onClose: () => void }) {
  const [logs, setLogs] = useState<Log[]>([
    { id: 1, type: 'info', message: 'Initializing Sherlock.AI Digital Forensic Module v2.4.0...', timestamp: new Date().toLocaleTimeString() },
    { id: 2, type: 'info', message: 'Establishing secure connection to internal server...', timestamp: new Date().toLocaleTimeString() },
    { id: 3, type: 'success', message: 'Connection established. 256-bit encryption active.', timestamp: new Date().toLocaleTimeString() },
    { id: 4, type: 'warning', message: 'Target firewall detected. Engaging bypass protocol...', timestamp: new Date().toLocaleTimeString() },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      const newLog: Log = {
        id: Date.now(),
        type: 'input',
        message: `> ${inputValue}`,
        timestamp: new Date().toLocaleTimeString()
      };
      setLogs(prev => [...prev, newLog]);
      
      // Process command simulation
      setTimeout(() => {
        let responseMsg = '';
        let type: Log['type'] = 'info';

        if (inputValue.includes('trace')) {
          responseMsg = 'Tracing IP route... [192.168.0.1 -> 10.0.5.2 -> ???]';
        } else if (inputValue.includes('scan')) {
          responseMsg = 'Scanning target device ports... Open ports found: 80, 443, 8080.';
          type = 'warning';
        } else if (inputValue.includes('decrypt')) {
          responseMsg = 'Decryption started. Estimated time: 2 minutes.';
          type = 'success';
        } else if (inputValue.includes('help')) {
            responseMsg = 'Available commands: trace, scan, decrypt, analyze, clear, exit';
        } else if (inputValue.includes('clear')) {
            setLogs([]);
            return;
        } else {
          responseMsg = `Command not recognized: ${inputValue}. Type 'help' for list of commands.`;
          type = 'error';
        }

        setLogs(prev => [...prev, {
          id: Date.now() + 1,
          type,
          message: responseMsg,
          timestamp: new Date().toLocaleTimeString()
        }]);
      }, 600);

      setInputValue('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#1e1e1e] rounded-lg shadow-2xl border border-slate-700 overflow-hidden flex flex-col h-[600px]">
        {/* Terminal Header */}
        <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-black/40">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer" onClick={onClose} />
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer" />
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer" />
            </div>
            <span className="ml-3 text-xs text-slate-400 font-mono flex items-center gap-2">
              <ShieldAlert className="w-3 h-3" />
              sherlock-ai-forensic — -zsh — 80x24
            </span>
          </div>
          <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
            <Wifi className="w-3 h-3 text-green-500" />
            SSH: connected
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 bg-[#1e1e1e] p-4 font-mono text-sm overflow-y-auto" ref={scrollRef}>
          <div className="mb-4 text-slate-500">
            Last login: {new Date().toDateString()} on ttys001<br/>
            Sherlock Forensic System [Version 2.4.0]<br/>
            (c) 2024 Sherlock.AI. All rights reserved.
            <br/><br/>
            Type "help" to see available forensic commands.
          </div>
          
          {logs.map(log => (
            <div key={log.id} className="mb-1 flex gap-2">
              <span className="text-slate-600 select-none">[{log.timestamp}]</span>
              <span className={`${
                log.type === 'error' ? 'text-red-400' :
                log.type === 'success' ? 'text-green-400' :
                log.type === 'warning' ? 'text-yellow-400' :
                log.type === 'input' ? 'text-white font-bold' :
                'text-blue-300'
              }`}>
                {log.message}
              </span>
            </div>
          ))}
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-green-500 font-bold">➜</span>
            <span className="text-cyan-400">~</span>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent border-none outline-none text-white caret-white"
              autoFocus
            />
          </div>
        </div>

        {/* Terminal Footer / Status Bar */}
        <div className="bg-[#007acc] text-white px-3 py-1 text-xs font-mono flex justify-between">
             <div className="flex gap-4">
                <span>master*</span>
                <span>LF UTF-8</span>
                <span>JavaScript</span>
             </div>
             <div className="flex gap-4">
                <span>Ln 24, Col 80</span>
                <span>Spaces: 2</span>
             </div>
        </div>
      </div>
    </div>
  );
}
