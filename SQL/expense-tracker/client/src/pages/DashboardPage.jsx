import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ReportService from "../services/report.service";
import {
  TrendingUp, TrendingDown, Wallet, ArrowRightLeft, Tag
} from "lucide-react";
import {
  StatCard, Card, Badge, EmptyState, Spinner
} from "../components/ui";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const PIE_COLORS = ["#6366f1","#f59e0b","#10b981","#ef4444","#8b5cf6","#06b6d4","#f97316","#84cc16"];

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [monthly, setMonthly] = useState(null);
  const [categories, setCategories] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      if (!user?.id) return;
      try {
        const [s, m, c, r] = await Promise.all([
          ReportService.getSummary(),
          ReportService.getMonthlyTrends(new Date().getFullYear()),
          ReportService.getCategoryExpense(),
          ReportService.getRecent(5),
        ]);
        setSummary(s.data.data);
        setMonthly(m.data.data);
        setCategories(c.data.data);
        setRecent(r.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const chartData = monthly?.months.map((m) => ({
    name: MONTHS[m.month - 1],
    income: m.income,
    expense: m.expense,
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500">Welcome back, {user?.name} 👋</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Income"
          value={formatCurrency(summary?.totalIncome || 0)}
          icon={TrendingUp}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-50"
        />
        <StatCard
          label="Total Expense"
          value={formatCurrency(summary?.totalExpense || 0)}
          icon={TrendingDown}
          colorClass="text-red-500"
          bgClass="bg-red-50"
        />
        <StatCard
          label="Balance"
          value={formatCurrency(summary?.balance || 0)}
          icon={Wallet}
          colorClass="text-indigo-600"
          bgClass="bg-indigo-50"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Area Chart – takes 3 of 5 columns */}
        <Card className="col-span-3 p-5">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">Monthly Trends — {monthly?.year}</h2>
          {chartData?.length ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Area type="monotone" dataKey="income" stroke="#10b981" fill="url(#income)" strokeWidth={2} />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="url(#expense)" strokeWidth={2} />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState icon={TrendingUp} title="No data yet" description="Add some transactions to see trends." />
          )}
        </Card>

        {/* Pie Chart – takes 2 of 5 columns */}
        <Card className="col-span-2 p-5">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">Expense by Category</h2>
          {categories?.length ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={categories} dataKey="totalAmount" nameKey="categoryName" cx="50%" cy="50%" outerRadius={75} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                  {categories.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Legend formatter={(v) => v.slice(0, 12)} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState icon={Tag} title="No expenses yet" />
          )}
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-slate-700">Recent Transactions</h2>
        </div>
        {recent?.length ? (
          <div className="divide-y divide-slate-50">
            {recent.map((t) => (
              <div key={t.id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-sm font-medium text-slate-700">{t.title}</p>
                  <p className="text-xs text-slate-400">
                    {t.Category?.name} • {formatDate(t.transactionDate)}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${t.type === "income" ? "text-emerald-600" : "text-red-500"}`}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </p>
                  <Badge variant={t.type}>{t.type}</Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={ArrowRightLeft} title="No transactions yet" description="Go to Transactions to add your first entry." />
        )}
      </Card>
    </div>
  );
}
