import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ReportService from "../services/report.service";
import { Card, Spinner, StatCard, EmptyState, Badge } from "../components/ui";
import { ArrowDown, ArrowUp, BarChart2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

export default function ReportsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [highest, setHighest] = useState(null);
  const [lowest, setLowest] = useState(null);
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      if (!user?.id) return;
      try {
        const [hRes, lRes, tcRes] = await Promise.all([
          ReportService.getHighestExpense(),
          ReportService.getLowestExpense(),
          ReportService.getTopCategories(10),
        ]);
        setHighest(hRes.data.data);
        setLowest(lRes.data.data);
        setTopCategories(tcRes.data.data);
      } catch (e) {
        console.error("Failed to load reports", e);
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, [user]);

  if (loading) {
    return <div className="flex h-64 justify-center items-center"><Spinner size="lg" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Reports</h1>
        <p className="text-sm text-slate-500">Detailed insights into your spending habits</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {highest ? (
          <StatCard 
            label={`Highest Expense (${highest.Category?.name})`}
            value={formatCurrency(highest.amount)}
            icon={ArrowUp}
            colorClass="text-red-600"
            bgClass="bg-red-50"
          />
        ) : (
          <Card className="p-5 flex items-center justify-center text-slate-400">No highest expense</Card>
        )}
        
        {lowest ? (
          <StatCard 
            label={`Lowest Expense (${lowest.Category?.name})`}
            value={formatCurrency(lowest.amount)}
            icon={ArrowDown}
            colorClass="text-emerald-600"
            bgClass="bg-emerald-50"
          />
        ) : (
          <Card className="p-5 flex items-center justify-center text-slate-400">No lowest expense</Card>
        )}
      </div>

      <Card className="p-5">
        <h2 className="mb-4 text-sm font-semibold text-slate-700">Top Spending Categories</h2>
        {topCategories?.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCategories} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="categoryName" type="category" tick={{ fontSize: 11 }} width={80} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Bar dataKey="totalAmount" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState icon={BarChart2} title="No spending data" description="Add expenses to see top categories." />
        )}
      </Card>

      {topCategories?.length > 0 && (
         <Card>
            <div className="px-5 py-4 border-b border-slate-100">
               <h2 className="text-sm font-semibold text-slate-700">Category Breakdown Details</h2>
            </div>
            <div className="divide-y divide-slate-50">
               {topCategories.map((c, i) => (
                  <div key={i} className="flex justify-between items-center px-5 py-3">
                     <div>
                        <p className="font-medium text-slate-700 text-sm">{c.categoryName}</p>
                        <p className="text-xs text-slate-400">{c.transactionCount} transactions</p>
                     </div>
                     <span className="font-semibold text-slate-700">{formatCurrency(c.totalAmount)}</span>
                  </div>
               ))}
            </div>
         </Card>
      )}
    </div>
  );
}
