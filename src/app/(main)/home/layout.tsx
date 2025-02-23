"use client";

import { SessionProvider } from "next-auth/react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="h-full w-full">{children}</div>
    </SessionProvider>
  );
}
