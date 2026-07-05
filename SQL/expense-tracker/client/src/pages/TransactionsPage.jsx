import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TransactionService from "../services/transaction.service";
import CategoryService from "../services/category.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, ArrowRightLeft, Calendar, Filter } from "lucide-react";
import { Card, Button, Input, Select, Badge, EmptyState, Spinner } from "../components/ui";

const schema = z.object({
  title: z.string().min(2, "Title is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  type: z.enum(["income", "expense"]),
  categoryId: z.coerce.number().min(1, "Select a category"),
  transactionDate: z.string().nonempty("Date is required"),
  notes: z.string().optional(),
});

function TransactionForm({ initial, categories, onSave, onCancel }) {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initial || {
      title: "",
      amount: "",
      type: "expense",
      categoryId: "",
      transactionDate: new Date().toISOString().split("T")[0],
      notes: "",
    },
  });

  const selectedType = watch("type");
  const filteredCategories = categories.filter((c) => c.type === selectedType);

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Title" placeholder="e.g. Groceries" error={errors.title?.message} {...register("title")} />
        <Input label="Amount" type="number" step="0.01" error={errors.amount?.message} {...register("amount")} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Select label="Type" error={errors.type?.message} {...register("type")}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </Select>

        <Select label="Category" error={errors.categoryId?.message} {...register("categoryId")}>
          <option value="">-- Select --</option>
          {filteredCategories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </Select>

        <Input label="Date" type="date" error={errors.transactionDate?.message} {...register("transactionDate")} />
      </div>

      <Input label="Notes (Optional)" placeholder="Additional details..." {...register("notes")} />

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function TransactionsPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  // Filters
  const [filterType, setFilterType] = useState("");
  const [filterSearch, setFilterSearch] = useState("");

  async function fetchAll() {
    try {
      const [txnRes, catRes] = await Promise.all([
        TransactionService.getAll({ type: filterType || undefined, search: filterSearch || undefined }),
        CategoryService.getAll(),
      ]);
      setTransactions(txnRes.data.data.transactions || []);
      setCategories(catRes.data.data || []);
    } catch (e) {
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchAll(); }, [filterType, filterSearch]);

  async function handleSave(data) {
    try {
      const payload = { ...data };
      if (editing) {
        await TransactionService.update(editing.id, payload);
        toast.success("Transaction updated!");
      } else {
        await TransactionService.create(payload);
        toast.success("Transaction created!");
      }
      setShowForm(false);
      setEditing(null);
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this transaction?")) return;
    try {
      await TransactionService.delete(id);
      toast.success("Transaction deleted.");
      fetchAll();
    } catch {
      toast.error("Could not delete transaction.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Transactions</h1>
          <p className="text-sm text-slate-500">View and manage your income and expenses</p>
        </div>
        <Button onClick={() => { setEditing(null); setShowForm(true); }}>
          <Plus className="h-4 w-4" /> Add Transaction
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">{editing ? "Edit Transaction" : "New Transaction"}</h2>
          <TransactionForm initial={editing} categories={categories} onSave={handleSave} onCancel={() => { setShowForm(false); setEditing(null); }} />
        </Card>
      )}

      {/* Filters */}
      <Card className="p-4 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input 
            label="Search" 
            placeholder="Search by title..." 
            value={filterSearch} 
            onChange={(e) => setFilterSearch(e.target.value)} 
          />
        </div>
        <div className="w-full sm:w-48">
          <Select label="Filter by Type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
        </div>
      </Card>

      <Card>
        {loading ? (
          <div className="flex justify-center py-12"><Spinner /></div>
        ) : transactions.length === 0 ? (
          <EmptyState icon={ArrowRightLeft} title="No transactions found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs font-medium uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-5 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        {formatDate(t.transactionDate)}
                      </div>
                    </td>
                    <td className="px-5 py-3 font-medium text-slate-700">{t.title}</td>
                    <td className="px-5 py-3"><Badge variant="default">{t.Category?.name}</Badge></td>
                    <td className="px-5 py-3">
                      <span className={`font-semibold ${t.type === "income" ? "text-emerald-600" : "text-red-500"}`}>
                        {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => {
                           // Format date for the input field (YYYY-MM-DD)
                           const dateOnly = new Date(t.transactionDate).toISOString().split("T")[0];
                           setEditing({ ...t, transactionDate: dateOnly }); 
                           setShowForm(true); 
                        }}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(t.id)}>
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
