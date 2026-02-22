import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { GlassCard } from '../components/GlassCard';
import { ArrowLeft, Upload, Image } from 'lucide-react';

export function UploadScreen() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const recentImages = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    'https://images.unsplash.com/photo-1620121692029-d088224ddc74',
    'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4',
    'https://images.unsplash.com/photo-1635322966219-b75ed372eb01',
    'https://images.unsplash.com/photo-1639762681485-074b7f938ba0',
  ];

  return (
    <div className="screen-container">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-8 pb-4 backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/home')} className="nav-icon">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl">Upload</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full px-6 pt-24 pb-8">
        {/* Drop Zone */}
        <div className="flex-1 flex items-center justify-center mb-8">
          <GlassCard
            className={`drop-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="icon-wrapper p-6">
                <Upload className="w-12 h-12" />
              </div>
              <h2 className="text-xl">Drop files here</h2>
              <p className="text-sm opacity-60">or click to browse</p>
            </div>
          </GlassCard>
        </div>

        {/* Recent Gallery */}
        <div>
          <h3 className="text-lg mb-4 opacity-80">Recent</h3>
          <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
            {recentImages.map((img, idx) => (
              <GlassCard key={idx} className="flex-shrink-0 p-1">
                <img
                  src={img}
                  alt={`Recent ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded-2xl"
                />
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}




