import React, { useEffect } from 'react';

export function AppSplash({ onFinish }: { onFinish: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onFinish, 2000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="h-full w-full bg-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
             {/* Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-indigo-600/20 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-purple-600/20 blur-[100px] rounded-full"></div>

            <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-700">
                <h1 className="text-5xl font-black mb-2 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">
                    탐정월드
                </h1>
                <div className="w-12 h-1 bg-indigo-500 rounded-full mb-4"></div>
                <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">Detective World</p>
            </div>

             <div className="absolute bottom-10 text-slate-600 text-xs font-medium tracking-wider">
                PREMIUM INVESTIGATION SERVICE
            </div>
        </div>
    );
}
