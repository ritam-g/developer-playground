import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import CategoryService from "../services/category.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import { Card, Button, Input, Select, Badge, EmptyState, Spinner } from "../components/ui";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.enum(["income", "expense"], { required_error: "Select a type" }),
});

function CategoryForm({ initial, onSave, onCancel }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initial || { name: "", type: "expense" },
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="space-y-4">
      <Input label="Category Name" placeholder="e.g. Food" error={errors.name?.message} {...register("name")} />
      <Select label="Type" error={errors.type?.message} {...register("type")}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </Select>
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

export default function CategoriesPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  async function fetchCategories() {
    try {
      const res = await CategoryService.getAll();
      setCategories(res.data.data || []);
    } catch {
      toast.error("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchCategories(); }, []);

  async function handleSave(data) {
    try {
      if (editing) {
        await CategoryService.update(editing.id, data);
        toast.success("Category updated!");
      } else {
        await CategoryService.create(data);
        toast.success("Category created!");
      }
      setShowForm(false);
      setEditing(null);
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed.");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this category?")) return;
    try {
      await CategoryService.delete(id);
      toast.success("Category deleted.");
      fetchCategories();
    } catch {
      toast.error("Could not delete category.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Categories</h1>
          <p className="text-sm text-slate-500">Manage your income and expense categories</p>
        </div>
        <Button onClick={() => { setEditing(null); setShowForm(true); }}>
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">{editing ? "Edit Category" : "New Category"}</h2>
          <CategoryForm initial={editing} onSave={handleSave} onCancel={() => { setShowForm(false); setEditing(null); }} />
        </Card>
      )}

      <Card>
        {loading ? (
          <div className="flex justify-center py-12"><Spinner /></div>
        ) : categories.length === 0 ? (
          <EmptyState icon={Tag} title="No categories yet" description='Click "Add Category" to create your first one.' />
        ) : (
          <div className="divide-y divide-slate-50">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${cat.type === "income" ? "bg-emerald-50" : "bg-red-50"}`}>
                    <Tag className={`h-4 w-4 ${cat.type === "income" ? "text-emerald-600" : "text-red-500"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{cat.name}</p>
                    <Badge variant={cat.type}>{cat.type}</Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => { setEditing(cat); setShowForm(true); }}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(cat.id)}>
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
