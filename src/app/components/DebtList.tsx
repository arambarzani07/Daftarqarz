"use client";

import { Debt, CURRENCY_SYMBOLS } from "@/lib/types";
import { formatDate, formatNumber } from "@/lib/storage";

interface DebtListProps {
  debts: Debt[];
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function DebtList({ debts, onToggleStatus, onDelete }: DebtListProps) {
  if (debts.length === 0) {
    return (
      <div className="card text-center text-slate-500">
        <div className="mb-2 text-4xl">📭</div>
        <p>هیچ قەرزێک نییە. سەرەتا قەرزێک زیاد بکە!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {debts.map((debt) => {
        const isPaid = debt.status === "paid";
        return (
          <div
            key={debt.id}
            className={`card transition-all ${
              isPaid ? "bg-emerald-50/60 opacity-75" : ""
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    className={`text-base font-semibold ${
                      isPaid ? "text-slate-500 line-through" : "text-slate-800"
                    }`}
                  >
                    {debt.personName}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      isPaid
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {isPaid ? "✓ دانراوە" : "⏳ نەدراوە"}
                  </span>
                </div>

                <div className="mt-1 flex items-baseline gap-1">
                  <span
                    className={`text-2xl font-bold ${
                      isPaid ? "text-slate-500" : "text-brand-700"
                    }`}
                  >
                    {formatNumber(debt.amount)}
                  </span>
                  <span className="text-sm text-slate-500">
                    {CURRENCY_SYMBOLS[debt.currency]} {debt.currency}
                  </span>
                </div>

                {debt.description && (
                  <p className="mt-1 text-sm text-slate-600">{debt.description}</p>
                )}

                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span>📅 {formatDate(debt.date)}</span>
                  {debt.dueDate && <span>⏰ دانەوە: {formatDate(debt.dueDate)}</span>}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onToggleStatus(debt.id)}
                  className={isPaid ? "btn-secondary" : "btn-success"}
                  title={isPaid ? "گێڕانەوە بۆ نەدراو" : "دانراوە"}
                >
                  {isPaid ? "↩️ گێڕانەوە" : "✓ دانراوە"}
                </button>
                <button
                  onClick={() => onDelete(debt.id)}
                  className="btn-danger"
                  title="سڕینەوە"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
