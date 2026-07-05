/** Shared UI: Spinner for loading states */
export function Spinner({ size = "md" }) {
  const s = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-10 w-10" : "h-6 w-6";
  return (
    <div className={`animate-spin rounded-full border-2 border-slate-200 border-t-indigo-500 ${s}`} />
  );
}

/** Shared UI: Button with variants */
export function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2 text-sm", lg: "px-6 py-3 text-base" };
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "text-slate-600 hover:bg-slate-100",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

/** Shared UI: Input field */
export function Input({ label, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <input
        className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-800 placeholder-slate-400 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          error ? "border-red-400 bg-red-50" : "border-slate-200 bg-white hover:border-slate-300"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

/** Shared UI: Select dropdown */
export function Select({ label, error, children, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <select
        className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          error ? "border-red-400 bg-red-50" : "border-slate-200 bg-white"
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

/** Shared UI: Card wrapper */
export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border border-slate-100 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

/** Shared UI: Badge */
export function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-slate-100 text-slate-600",
    income: "bg-emerald-100 text-emerald-700",
    expense: "bg-red-100 text-red-600",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}

/** Shared UI: Empty state placeholder */
export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center text-slate-400">
      {Icon && <Icon className="h-12 w-12 opacity-30" />}
      <p className="text-base font-medium text-slate-500">{title}</p>
      {description && <p className="text-sm">{description}</p>}
    </div>
  );
}

/** Shared UI: Stat card for dashboard */
export function StatCard({ label, value, icon: Icon, colorClass = "text-indigo-600", bgClass = "bg-indigo-50" }) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
          <p className={`mt-1 text-2xl font-bold ${colorClass}`}>{value}</p>
        </div>
        <div className={`rounded-full p-3 ${bgClass}`}>
          <Icon className={`h-5 w-5 ${colorClass}`} />
        </div>
      </div>
    </Card>
  );
}
