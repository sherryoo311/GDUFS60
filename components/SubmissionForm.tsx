
import React, { useState, useRef } from 'react';
import { Identity, Story } from '../types';
import { Send, Upload, X, Image as ImageIcon } from 'lucide-react';

interface SubmissionFormProps {
  onSubmit: (story: Omit<Story, 'id' | 'date'>) => void;
}

export const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [identity, setIdentity] = useState<Identity | ''>('');
  const [college, setCollege] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [targetPerson, setTargetPerson] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [author, setAuthor] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity) return;

    setIsSubmitting(true);
    
    // Simulate network delay for better UX
    setTimeout(() => {
      onSubmit({
        identity: identity as Identity,
        college,
        graduationYear,
        targetPerson,
        content,
        image: image || undefined,
        author: author || '广东外语外贸大学某校友'
      });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
        <div className="bg-red-900 px-6 py-8 text-center">
          <h2 className="text-2xl font-bold text-white serif">分享您的师生故事</h2>
          <p className="mt-2 text-red-100 text-sm">每一个被记录的瞬间，都是永恒的温暖</p>
        </div>

        <form id="gdufs-teacher-student-story-submission-form" onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
          
          {/* Identity & Year Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="identity" className="block text-sm font-semibold text-stone-800">
                我在广东外语外贸大学的身份是： <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <select
                  id="identity"
                  required
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value as Identity)}
                  className="block w-full rounded-lg border-stone-200 bg-stone-50 shadow-sm focus:border-red-500 focus:ring-red-500 py-3 px-4 transition-colors"
                >
                  <option value="" disabled>请选择身份</option>
                  <option value="student">在校学生</option>
                  <option value="alumni">校友</option>
                  <option value="faculty">教职员工 (老师)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="graduation-year" className="block text-sm font-semibold text-stone-800">
                毕业年份 / 入学年份： <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="graduation-year"
                required
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                placeholder="例如：2018 / 2024"
                className="block w-full rounded-lg border-stone-200 bg-stone-50 shadow-sm focus:border-red-500 focus:ring-red-500 py-3 px-4 transition-colors"
              />
            </div>
          </div>

          {/* College Section */}
          <div className="space-y-2">
            <label htmlFor="college" className="block text-sm font-semibold text-stone-800">
              我所在的学院/单位（请填写准确名称）： <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="college"
              required
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="例如：新闻与传播学院 / 国际关系学院 / 国际商务英语学院"
              className="block w-full rounded-lg border-stone-200 bg-stone-50 shadow-sm focus:border-red-500 focus:ring-red-500 py-3 px-4 transition-colors"
            />
          </div>

          {/* Target Person Section - Highlighted */}
          <div className="space-y-2 bg-orange-50 p-4 rounded-lg border border-orange-100">
            <label htmlFor="target-person" className="block text-sm font-bold text-orange-900">
              故事的主角是（请填写老师或学生的准确姓名）： <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="target-person"
              required
              value={targetPerson}
              onChange={(e) => setTargetPerson(e.target.value)}
              placeholder="例如：XX老师 / XX同学"
              className="block w-full rounded-lg border-orange-200 bg-white shadow-sm focus:border-orange-500 focus:ring-orange-500 py-3 px-4 transition-colors"
            />
            <p className="text-xs text-orange-700/70">请确保填写真实姓名，以便让Ta看到这份温暖。</p>
          </div>

          {/* Content Section */}
          <div className="space-y-2">
            <label htmlFor="story-content" className="block text-sm font-semibold text-stone-800">
              分享您与这位老师/学生这段旅程中的温暖故事： <span className="text-red-600">*</span>
            </label>
            <textarea
              id="story-content"
              rows={8}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请分享让您感动、被启发或共同经历的难忘瞬间..."
              className="block w-full rounded-lg border-stone-200 bg-stone-50 shadow-sm focus:border-red-500 focus:ring-red-500 py-3 px-4 transition-colors resize-none"
            ></textarea>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-stone-800">
              添加照片 (可选)：
            </label>
            <p className="text-xs text-stone-500 mb-2">一张合影，或是一张有纪念意义的老照片。</p>
            
            {!image ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center hover:bg-stone-50 hover:border-red-300 transition-colors cursor-pointer group"
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mb-3 group-hover:bg-red-50 transition-colors">
                  <Upload className="w-6 h-6 text-stone-400 group-hover:text-red-500" />
                </div>
                <span className="text-stone-600 font-medium text-sm">点击上传图片</span>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden border border-stone-200 inline-block max-w-full">
                <img src={image} alt="Preview" className="max-h-64 object-contain bg-stone-50" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors backdrop-blur-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Signature Section */}
          <div className="space-y-2">
            <label htmlFor="anonymous-name" className="block text-sm font-semibold text-stone-800">
              您的署名：
            </label>
            <input
              type="text"
              id="anonymous-name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="您的姓名、昵称或填写 '广东外语外贸大学某校友'"
              className="block w-full rounded-lg border-stone-200 bg-stone-50 shadow-sm focus:border-red-500 focus:ring-red-500 py-3 px-4 transition-colors"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full flex items-center justify-center space-x-2 py-4 px-8 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white 
                ${isSubmitting ? 'bg-stone-400 cursor-not-allowed' : 'bg-red-900 hover:bg-red-800 focus:ring-2 focus:ring-offset-2 focus:ring-red-500'}
                transition-all duration-200
              `}
            >
              {isSubmitting ? (
                <span>提交中...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>提交故事，汇入共同的旅程</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
