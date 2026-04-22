import { Sidebar } from "@/components/layout/Sidebar";
import { BottomNav } from "@/components/layout/BottomNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-1">
      <Sidebar />
      <main className="flex flex-1 flex-col pb-16 md:pb-0">{children}</main>
      <BottomNav />
    </div>
  );
}
