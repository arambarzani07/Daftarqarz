"use client";

import { useEffect, useMemo, useState } from "react";
import { Debt } from "@/lib/types";
import { loadDebts, saveDebts } from "@/lib/storage";
import DebtForm from "./components/DebtForm";
import DebtList from "./components/DebtList";
import DebtSummary from "./components/DebtSummary";

type FilterType = "all" | "owed" | "paid";

export default function Home() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [hydrated, setHydrated] = useState(false);

  // لۆدکردن لە localStorage لە یەکەم ڕەندەر
  useEffect(() => {
    setDebts(loadDebts());
    setHydrated(true);
  }, []);

  // پاشەکەوتکردن لە localStorage هەر جارێک debts دەگۆڕێت
  useEffect(() => {
    if (hydrated) saveDebts(debts);
  }, [debts, hydrated]);

  const handleAdd = (debt: Debt) => {
    setDebts((prev) => [debt, ...prev]);
  };

  const handleToggleStatus = (id: string) => {
    setDebts((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "owed" ? "paid" : "owed" }
          : d
      )
    );
  };

  const handleDelete = (id: string) => {
    if (typeof window !== "undefined" && window.confirm("دڵنیایت لە سڕینەوەی ئەم قەرزە؟")) {
      setDebts((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const filtered = useMemo(() => {
    return debts.filter((d) => {
      // فلتەری دۆخ
      if (filter === "owed" && d.status !== "owed") return false;
      if (filter === "paid" && d.status !== "paid") return false;
      // گەڕان
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const hay = `${d.personName} ${d.description ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [debts, filter, search]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* سەرەوەی پەیج */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          📒 لیستی قەرز
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          ئەپێکی ساکار بۆ تۆمارکردن و بەدواداچوونی قەرزەکانت
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ستوونی چەپ — فۆڕم و کۆی گشتی */}
        <aside className="space-y-6 lg:order-1">
          <DebtForm onAdd={handleAdd} />
          <DebtSummary debts={debts} />
        </aside>

        {/* ستوونی ڕاست — لیست */}
        <section className="lg:col-span-2 lg:order-2">
          <div className="card mb-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                📋 لیستی قەرزەکان
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={filter === "all" ? "btn-primary" : "btn-secondary"}
                >
                  هەموو
                </button>
                <button
                  onClick={() => setFilter("owed")}
                  className={filter === "owed" ? "btn-primary" : "btn-secondary"}
                >
                  نەدراوە
                </button>
                <button
                  onClick={() => setFilter("paid")}
                  className={filter === "paid" ? "btn-primary" : "btn-secondary"}
                >
                  دانراوە
                </button>
              </div>
            </div>

            <div className="mt-3">
              <input
                type="search"
                className="input"
                placeholder="🔎 گەڕان بەدوای ناو یان وەسف..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <DebtList
            debts={filtered}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
          />
        </section>
      </div>

      <footer className="mt-12 text-center text-xs text-slate-500">
        درووستکراوە بە ❤️ — Daftarqarz v0.1.0
      </footer>
    </main>
  );
}
