
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { SubmissionForm } from './components/SubmissionForm';
import { StoryWall } from './components/StoryWall';
import { Story, ViewState } from './types';
import { Heart } from 'lucide-react';

// Initial stories cleared as requested
const INITIAL_STORIES: Story[] = [];

const STORAGE_KEY = 'gdufs_stories_data_v1';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  
  // Initialize state from localStorage with strict validation to prevent white screen crashes
  const [stories, setStories] = useState<Story[]>(() => {
    try {
      const savedStories = localStorage.getItem(STORAGE_KEY);
      if (!savedStories) return INITIAL_STORIES;

      const parsed = JSON.parse(savedStories);
      // Critical Check: Ensure the parsed data is actually an array
      if (Array.isArray(parsed)) {
        return parsed;
      }
      // If data is corrupted or in wrong format, return empty default
      return INITIAL_STORIES;
    } catch (error) {
      console.error('Failed to load stories from local storage:', error);
      return INITIAL_STORIES;
    }
  });
  
  const [showToast, setShowToast] = useState(false);

  // Persist stories to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
    } catch (error) {
      console.error('Failed to save stories to local storage:', error);
    }
  }, [stories]);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleStorySubmit = (newStoryData: Omit<Story, 'id' | 'date'>) => {
    const newStory: Story = {
      ...newStoryData,
      id: Date.now().toString(), // Use timestamp for unique ID
      date: new Date().toISOString().split('T')[0]
    };
    
    setStories(prev => [newStory, ...prev]);
    setCurrentView('wall');
    
    // Trigger success toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-grow">
        {currentView === 'landing' && (
          <LandingPage onNavigate={setCurrentView} />
        )}
        
        {currentView === 'form' && (
          <SubmissionForm onSubmit={handleStorySubmit} />
        )}
        
        {currentView === 'wall' && (
          <StoryWall stories={stories} />
        )}
      </main>

      {/* Footer with Counter */}
      <footer className="bg-stone-900 text-stone-400 py-10 text-center text-sm border-t border-stone-800 mt-auto">
        <div className="max-w-5xl mx-auto px-4 space-y-4">
          <div>
            <p className="mb-1 font-bold text-stone-300 text-lg serif">广东外语外贸大学：共同的旅程</p>
            <p className="text-xs text-stone-600 uppercase tracking-widest">GDUFS Shared Journey</p>
          </div>
          
          {/* Story Counter */}
          <div className="py-4">
             <div className="inline-flex items-center gap-2 bg-stone-800/50 px-6 py-2 rounded-full border border-stone-700">
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                <span className="text-stone-300">
                  已汇聚 <span className="text-white font-bold text-lg mx-1">{stories.length}</span> 个师生温暖瞬间
                </span>
             </div>
          </div>

          <div className="pt-4 border-t border-stone-800/50 text-xs text-stone-600">
            <p>Copyright © {new Date().getFullYear()} All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-up z-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="font-bold">提交成功！</p>
            <p className="text-sm opacity-90">您的故事已汇入共同的旅程。</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
