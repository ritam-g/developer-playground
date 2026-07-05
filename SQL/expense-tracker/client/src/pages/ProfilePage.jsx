import { useAuth } from "../context/AuthContext";
import { Card, Button } from "../components/ui";
import { User, Mail, Calendar, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  }

  if (!user) return null;

  const joinDate = user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "long", year: "numeric", day: "numeric"
      })
    : "Recently";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Profile</h1>
        <p className="text-sm text-slate-500">Manage your account settings</p>
      </div>

      <Card className="max-w-xl">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-800">{user.name}</h2>
              <p className="text-slate-500 text-sm">Active Member</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-600 border-b border-slate-100 pb-3">
              <User className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Full Name</p>
                <p className="text-sm font-medium text-slate-800">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-600 border-b border-slate-100 pb-3">
              <Mail className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Email Address</p>
                <p className="text-sm font-medium text-slate-800">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-600 border-b border-slate-100 pb-3">
              <Calendar className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Joined On</p>
                <p className="text-sm font-medium text-slate-800">{joinDate}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4">
             <Button variant="danger" className="w-full" onClick={handleLogout}>
                <LogOut className="h-4 w-4" /> Sign Out
             </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
