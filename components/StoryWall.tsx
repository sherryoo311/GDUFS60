
import React, { useState, useMemo } from 'react';
import { Story, Identity } from '../types';
import { User, BookOpen, GraduationCap, School, Calendar, Quote } from 'lucide-react';

interface StoryWallProps {
  stories: Story[];
}

export const StoryWall: React.FC<StoryWallProps> = ({ stories }) => {
  const [filterIdentity, setFilterIdentity] = useState<Identity | 'all'>('all');
  const [filterCollege, setFilterCollege] = useState<string>('');

  // Derive unique colleges for filter dropdown with safety check
  const colleges = useMemo(() => {
    if (!Array.isArray(stories)) return [];
    const unique = new Set(stories.map(s => s.college).filter(Boolean));
    return Array.from(unique).sort();
  }, [stories]);

  const filteredStories = useMemo(() => {
    if (!Array.isArray(stories)) return [];
    return stories.filter(story => {
      const matchIdentity = filterIdentity === 'all' || story.identity === filterIdentity;
      const matchCollege = filterCollege === '' || story.college === filterCollege;
      return matchIdentity && matchCollege;
    });
  }, [stories, filterIdentity, filterCollege]);

  const getIdentityBadge = (identity: Identity) => {
    switch (identity) {
      case 'student': return <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1"><User className="w-3 h-3" /> 在校生</span>;
      case 'alumni': return <span className="bg-amber-50 text-amber-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1"><GraduationCap className="w-3 h-3" /> 校友</span>;
      case 'faculty': return <span className="bg-red-50 text-red-700 px-2 py-1 rounded text-xs font-medium flex items-center gap-1"><BookOpen className="w-3 h-3" /> 老师</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Header / Filter Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-red-950 serif mb-2">共同的旅程 · 故事墙</h2>
          <p className="text-stone-600">汇聚 {stories?.length || 0} 个温暖瞬间</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 flex flex-col md:flex-row gap-4 justify-between items-center sticky top-20 z-40">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="text-sm font-semibold text-stone-500 whitespace-nowrap">筛选:</span>
            <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
              <button 
                onClick={() => setFilterIdentity('all')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterIdentity === 'all' ? 'bg-red-900 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                全部
              </button>
              <button 
                onClick={() => setFilterIdentity('student')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterIdentity === 'student' ? 'bg-blue-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                在校生
              </button>
              <button 
                onClick={() => setFilterIdentity('alumni')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterIdentity === 'alumni' ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                校友
              </button>
              <button 
                onClick={() => setFilterIdentity('faculty')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterIdentity === 'faculty' ? 'bg-red-600 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                老师
              </button>
            </div>
          </div>

          <div className="w-full md:w-64">
             <select 
               value={filterCollege} 
               onChange={(e) => setFilterCollege(e.target.value)}
               className="w-full rounded-lg border-stone-200 bg-stone-50 text-stone-700 text-sm p-2 focus:ring-red-500 focus:border-red-500"
             >
               <option value="">所有学院 / 单位</option>
               {colleges.map(c => <option key={c} value={c}>{c}</option>)}
             </select>
          </div>
        </div>
      </div>

      {/* Masonry-like Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.length === 0 ? (
          <div className="col-span-full py-20 text-center text-stone-500">
            <p className="text-lg">暂无符合条件的故事。</p>
            <p className="text-sm mt-2">成为第一个分享的人吧！</p>
          </div>
        ) : (
          filteredStories.map((story) => (
            <div key={story.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-stone-200 overflow-hidden flex flex-col">
              
              {/* Optional Image Display */}
              {story.image && (
                <div className="w-full h-48 overflow-hidden bg-stone-100">
                  <img src={story.image} alt="故事图片" className="w-full h-full object-cover" />
                </div>
              )}

              {/* Card Header */}
              <div className="p-5 border-b border-stone-100 bg-stone-50/50">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex gap-2 items-center">
                    {getIdentityBadge(story.identity)}
                    {story.graduationYear && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-stone-200 text-stone-600 rounded-md font-medium">
                            {story.graduationYear}届
                        </span>
                    )}
                  </div>
                  <span className="text-xs text-stone-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {story.date}
                  </span>
                </div>
                
                <div className="text-xs text-stone-500 flex items-center gap-1 font-medium">
                   <School className="w-3 h-3 text-stone-400" /> {story.college}
                </div>
              </div>

              {/* Target Person Highlight */}
              <div className="px-5 py-3 bg-orange-50/50 border-b border-orange-100/50">
                <p className="text-sm text-orange-900 font-medium">
                  <span className="text-orange-700/60 text-xs uppercase tracking-wider mr-1">To:</span> 
                  {story.targetPerson}
                </p>
              </div>

              {/* Content */}
              <div className="p-5 flex-grow">
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 text-stone-100 fill-stone-100 -z-10" />
                  <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-wrap line-clamp-[8]">
                    {story.content}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 pb-5 pt-2 mt-auto">
                <div className="flex justify-between items-end border-t border-stone-100 pt-3">
                  <div className="text-xs font-medium text-stone-800">
                    From: {story.author}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
