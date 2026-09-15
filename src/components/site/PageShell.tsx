import type { ReactNode } from "react";
import { Header, Footer } from ".";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">{children}</main>
      <Footer />
    </div>
  );
}