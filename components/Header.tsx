import React from 'react';
import { ViewState } from '../types';
import { GraduationCap, Home } from 'lucide-react';

interface HeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('landing')}
          className="flex items-center space-x-2 text-red-900 hover:opacity-80 transition-opacity"
        >
          <GraduationCap className="w-6 h-6" />
          <span className="font-bold text-lg tracking-wide serif hidden sm:block">广外：共同的旅程</span>
          <span className="font-bold text-lg tracking-wide serif sm:hidden">GDUFS</span>
        </button>

        <nav className="flex items-center space-x-4 text-sm font-medium text-stone-600">
          {currentView !== 'landing' && (
            <button 
              onClick={() => onNavigate('landing')}
              className="flex items-center space-x-1 hover:text-red-800 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">首页</span>
            </button>
          )}
          <button 
            onClick={() => onNavigate('wall')}
            className={`hover:text-red-800 transition-colors ${currentView === 'wall' ? 'text-red-800 font-bold' : ''}`}
          >
            故事墙
          </button>
          <button 
            onClick={() => onNavigate('form')}
            className={`px-4 py-2 rounded-full transition-all ${
              currentView === 'form' 
                ? 'bg-red-100 text-red-900' 
                : 'bg-red-900 text-white hover:bg-red-800'
            }`}
          >
            分享故事
          </button>
        </nav>
      </div>
    </header>
  );
};