import { ReactNode } from 'react';

import AIAssistant from '@/components/AIAssistant';

// NOTE: The shared chrome (Navbar, Sidebar, Footer, StreamClientProvider) lives
// in the parent (root)/layout.tsx. This layout only adds the floating AI
// copilot so the home pages don't render duplicate navbars/sidebars.
const HomeLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      {children}
      <AIAssistant />
    </>
  );
};

export default HomeLayout;
