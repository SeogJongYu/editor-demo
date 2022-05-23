import React from 'react';

import MenuList from './MenuList';

export default function Page({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* <MenuList /> */}
      <div className="flex-1 px-2">{children}</div>
    </div>
  );
}
