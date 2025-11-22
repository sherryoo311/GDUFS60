import React from 'react';
import { BookOpen, PenTool } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: 'form' | 'wall') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-stone-50 px-4 text-center py-12">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
        
        {/* Logo/Icon Graphic Placeholder */}
        <div className="w-24 h-24 bg-red-900 rounded-full mx-auto flex items-center justify-center shadow-xl mb-6">
           <BookOpen className="w-12 h-12 text-stone-50" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-red-950 serif leading-tight">
            广东外语外贸大学：<br className="hidden sm:block" />
            <span className="text-red-800">共同的旅程</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 font-light tracking-wide italic">
            记录师生情谊的温暖瞬间
          </p>
          <p className="text-stone-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed pt-4">
            每一位老师都是引路人，每一位学生都是传承者。
            <br />
            在这里，让我们写下彼此生命中交织的感动，汇聚成广外人共同的记忆。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 w-full max-w-md mx-auto sm:max-w-none">
          <button
            onClick={() => onNavigate('form')}
            className="flex-1 sm:flex-none group relative px-8 py-4 bg-red-900 text-white rounded-xl shadow-lg hover:bg-red-800 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg font-medium"
          >
            <PenTool className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>分享我的师生故事</span>
          </button>
          
          <button
            onClick={() => onNavigate('wall')}
            className="flex-1 sm:flex-none group relative px-8 py-4 bg-white text-red-900 border border-red-200 rounded-xl shadow-md hover:border-red-300 hover:bg-red-50 transition-all duration-300 flex items-center justify-center gap-3 text-lg font-medium"
          >
            <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>查看师生故事墙</span>
          </button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-3 gap-8 text-stone-400 text-sm max-w-2xl w-full border-t border-stone-200 pt-8">
        <div className="text-center">
          <span className="block font-bold text-red-900 text-xl serif">58+</span>
          <span>年建校历史</span>
        </div>
        <div className="text-center">
          <span className="block font-bold text-red-900 text-xl serif">1000+</span>
          <span>温暖故事</span>
        </div>
        <div className="text-center">
          <span className="block font-bold text-red-900 text-xl serif">∞</span>
          <span>师生情谊</span>
        </div>
      </div>
    </div>
  );
};