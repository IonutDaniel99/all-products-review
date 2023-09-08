import NavigationBar from "@/components/NavigationBar";
import { useSession } from "next-auth/react";
import React, { PropsWithChildren } from "react";
import { redirect } from 'next/navigation'
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='mx-auto max-w-7xl h-screen bg-background'>
      <NavigationBar />
      {children}
    </div>
  );
};
export default Layout;