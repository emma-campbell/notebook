import { Navigation } from "./Navigation";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center max-w-2xl mx-auto">
      <Navigation />
      {children}
    </div>
  );
}
