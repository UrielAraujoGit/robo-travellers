import type { ReactNode } from "react";
import { Header } from "./Header";

/** Page shell shared by every route: space background, side gutters and the site header. */
export function Page({ children }: { children: ReactNode }) {
  return (
    // Top padding = header height, since the fixed header is out of the page flow
    <main className="space-background relative min-h-screen overflow-hidden px-4.5 pt-17 pb-8 tablet:px-6 tablet:pt-19 tablet:pb-10 desktop:px-[5vw] desktop:pt-24 desktop:pb-16">
      <Header />
      {children}
    </main>
  );
}
