import type { ReactNode } from "react";
import { Header, Footer } from ".";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="pointer-events-none fixed inset-0 paper-grid opacity-[0.35]" aria-hidden="true" />
      <main className="flex-1 py-8 ">{children}</main>
      <Footer />
    </div>
  );
}