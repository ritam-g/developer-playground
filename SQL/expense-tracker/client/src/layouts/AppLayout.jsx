import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";

/** AppLayout wraps all protected pages with the sidebar */
export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
