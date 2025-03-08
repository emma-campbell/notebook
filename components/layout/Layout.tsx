import { Navigation } from "./Navigation";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center max-w-xl mx-auto">
      <header className="w-full flex justify-between items-center">
        <Navigation />
      </header>
      {children}
    </div>
  );
}
