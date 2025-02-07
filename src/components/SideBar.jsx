import React, { useEffect, useState } from 'react';

export default function SideBar({ children, className = '', ...props }) {
  return (
    <div className={`min-w-[12rem] pl-2 h-[calc(100vh-4rem)] flex flex-col items-start bg-slate-800 z-50 shadow-slate-900 ${className}`} {...props}>
      <div className="w-full h-full">
        <div className="space-y-4 mt-4 text-slate-100 whitespace-nowrap h-[95%]">
          <div className="flex flex-col space-y-4 ml-3 mr-5 h-full">
            <div className="flex flex-col space-y-4 h-full w-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}