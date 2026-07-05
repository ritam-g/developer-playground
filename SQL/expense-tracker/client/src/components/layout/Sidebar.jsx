import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, ArrowRightLeft, Tag, BarChart2,
  User, LogOut, Wallet
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: ArrowRightLeft },
  { to: "/categories", label: "Categories", icon: Tag },
  { to: "/reports", label: "Reports", icon: BarChart2 },
  { to: "/profile", label: "Profile", icon: User },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  }

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-slate-100 bg-white shadow-sm">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
          <Wallet className="h-4 w-4 text-white" />
        </div>
        <span className="text-base font-bold text-slate-800">ExpenseTrack</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-slate-100 px-4 py-4">
        <p className="truncate text-xs font-medium text-slate-500">{user?.name}</p>
        <p className="truncate text-xs text-slate-400">{user?.email}</p>
        <button
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
