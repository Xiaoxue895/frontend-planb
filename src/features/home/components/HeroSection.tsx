

import React from 'react';
import { useNavigate } from 'react-router-dom';

const JoinWaitlistSection: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // 默认点击行为，比如跳转到 waitlist 页面
      navigate('/waitlist');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center py-20" style={{ backgroundColor: '#eafbff', fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative">

          {/* 左侧功能区 */}
          <div className="absolute left-0 top-24 space-y-6 hidden lg:block w-56">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 w-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-envelope text-orange-500"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">No more ghosting</div>
                  <div className="text-xs text-gray-600">Talk directly with Hiring Manager</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 w-full mt-48 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="/images/avatar-1.svg" alt="Interviewer" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm">Mock Interview</div>
                  <div className="text-xs text-gray-600 mb-2">Today at 12:00 PM</div>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold py-2 px-4 rounded-full transition-colors shadow-md">
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧功能区 */}
          <div className="absolute right-0 top-32 hidden lg:block w-56">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 w-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-check text-green-500"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">One click to apply</div>
                  <div className="text-xs text-gray-600">No more filling out applications.</div>
                </div>
              </div>
            </div>
          </div>

          {/* 中间主内容 */}
          <div className="text-center mx-auto max-w-3xl px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className="text-orange-500">Find your </span>
              <span className="text-blue-600">first</span>
              <span className="text-orange-500"> job within</span>
              <br />
              <span className="text-blue-600">one week</span>
            </h1>

            <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Enter your name and email to connect with <span className="font-semibold">500+</span> startups and launch your <span className="font-semibold">first</span> job.
            </p>

            {/* 这里先是纯按钮，后续可替换成输入框表单 */}
            <button
              onClick={handleClick}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-colors w-full sm:w-auto text-sm shadow-lg"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Join Waitlist
            </button>

            {/* 底部角色图片 */}
            <div className="flex justify-center mt-12">
              <img
                src="/images/ChickenFriends1.png"
                alt="JobHatch Characters"
                className="w-80 h-auto max-w-full"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 底部曲线 */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0,80 Q360,40 720,80 T1440,80 V150 H0 V80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default JoinWaitlistSection;
