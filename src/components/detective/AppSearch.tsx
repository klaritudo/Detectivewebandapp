
import React, { useState } from 'react';
import { Search, MapPin, Star, Filter, List, Map as MapIcon, ChevronRight } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { MOCK_DETECTIVES } from './data';

interface AppSearchProps {
  onSelectDetective: (name: string) => void;
}

export function AppSearch({ onSelectDetective }: AppSearchProps) {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  return (
    <div className="h-full bg-slate-50 flex flex-col relative">
      <div className="bg-white p-4 sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-900">탐정 찾기</h2>
            <div className="bg-slate-100 p-1 rounded-lg flex">
                <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
                >
                    <List className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => setViewMode('map')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}
                >
                    <MapIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="이름, 전문분야, 지역 검색" className="pl-10 h-11 bg-slate-100 border-none rounded-xl focus-visible:ring-indigo-500" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
           <Button variant="outline" size="sm" className="rounded-full h-8 border-slate-300 text-slate-600 flex-shrink-0">
             <Filter className="w-3 h-3 mr-1" /> 필터
           </Button>
           {['기업조사', '가사', '사이버', '경호', '실종', '법률'].map((tag) => (
             <Button key={tag} variant="secondary" size="sm" className="rounded-full h-8 bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 flex-shrink-0 transition-colors">
               {tag}
             </Button>
           ))}
        </div>
      </div>

      {viewMode === 'list' ? (
          <ScrollArea className="flex-1 px-4 py-4">
            <div className="space-y-2 mb-6">
               <p className="text-xs font-medium text-slate-500 mb-2">인기 검색어</p>
               <div className="flex flex-wrap gap-2">
                  {['#산업스파이', '#배우자외도', '#사이버스토킹', '#신변보호'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white border rounded-full text-xs text-slate-600 cursor-pointer hover:border-indigo-200 hover:text-indigo-600 transition-colors shadow-sm">
                          {tag}
                      </span>
                  ))}
               </div>
            </div>

            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-slate-900">검색 결과 <span className="text-indigo-600 ml-1">{MOCK_DETECTIVES.length}</span></h3>
                <span className="text-xs text-slate-500">정확도순</span>
            </div>

            <div className="space-y-3 pb-20">
              {MOCK_DETECTIVES.map((detective) => (
                <div key={detective.id} className="bg-white p-4 rounded-xl border border-slate-100 flex gap-3 cursor-pointer hover:border-indigo-200 hover:shadow-md transition-all group" onClick={() => onSelectDetective(detective.name)}>
                  <div className="relative">
                      <img src={detective.image} className="w-20 h-20 rounded-lg object-cover" alt={detective.name} />
                      {detective.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{detective.name}</h4>
                        <p className="text-xs text-slate-500 flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-0.5 text-slate-400" /> {detective.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-amber-700">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold">{detective.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2 flex-wrap">
                        <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-normal text-indigo-600 border-indigo-100 bg-indigo-50">{detective.specialty}</Badge>
                        <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-normal text-slate-500 border-slate-200 bg-slate-50">경력 {detective.career}</Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-1">{detective.description}</p>
                  </div>
                </div>
              ))}
               
               {/* Loading Skeletons */}
               {[1, 2].map((i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 flex gap-3 opacity-60">
                      <div className="w-20 h-20 bg-slate-100 rounded-lg animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                          <div className="h-4 bg-slate-100 rounded w-1/3 animate-pulse"></div>
                          <div className="h-3 bg-slate-100 rounded w-1/2 animate-pulse"></div>
                          <div className="h-8 bg-slate-100 rounded w-full animate-pulse mt-2"></div>
                      </div>
                  </div>
               ))}
            </div>
          </ScrollArea>
      ) : (
          <div className="flex-1 relative bg-slate-200 overflow-hidden">
              {/* Mock Map View */}
              <div className="absolute inset-0 opacity-50" style={{ 
                  backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
                  backgroundSize: '20px 20px' 
              }}></div>
              
               {/* Mock Map Elements */}
               <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-xl"></div>
               <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-indigo-100 rounded-full opacity-20 blur-xl"></div>

               {/* Pins */}
               {MOCK_DETECTIVES.map((detective, idx) => (
                   <div 
                        key={detective.id} 
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ top: `${30 + idx * 15}%`, left: `${20 + idx * 20}%` }}
                        onClick={() => onSelectDetective(detective.name)}
                   >
                       <div className="relative flex flex-col items-center">
                           <div className="bg-white p-1 rounded-full shadow-lg border border-white group-hover:scale-110 transition-transform">
                               <img src={detective.image} className="w-10 h-10 rounded-full object-cover" alt={detective.name} />
                           </div>
                           <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white shadow-sm"></div>
                           
                           {/* Tooltip on Hover */}
                           <div className="absolute bottom-full mb-2 bg-slate-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                               {detective.name}
                           </div>
                       </div>
                   </div>
               ))}
               
               {/* Map Controls */}
               <div className="absolute bottom-24 right-4 flex flex-col gap-2">
                   <Button size="icon" className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg rounded-full h-10 w-10">
                       <MapPin className="w-5 h-5" />
                   </Button>
               </div>
          </div>
      )}
    </div>
  );
}
