'use client';

import React from 'react';

export const BackgroundVideo = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover scale-105 transition-opacity duration-1000"
      >
        <source 
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_034306_229eccbe-fd8f-40fb-8002-9868ef2bb1a8.mp4" 
          type="video/mp4" 
        />
      </video>
      
      {/* Light overlay for maximum readability of text & white glass cards */}
      <div className="absolute inset-0 bg-slate-950/25 backdrop-blur-[2px]" />
    </div>
  );
};
