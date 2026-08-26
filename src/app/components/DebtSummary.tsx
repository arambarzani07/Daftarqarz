"use client";

import { Debt, CURRENCY_SYMBOLS } from "@/lib/types";
import { formatNumber } from "@/lib/storage";

interface DebtSummaryProps {
  debts: Debt[];
}

export default function DebtSummary({ debts }: DebtSummaryProps) {
  // کۆکردنەوەی بڕ بەپێی دراو
  const totalsByCurrency: Record<string, { owed: number; paid: number }> = {};
  for (const d of debts) {
    if (!totalsByCurrency[d.currency]) {
      totalsByCurrency[d.currency] = { owed: 0, paid: 0 };
    }
    if (d.status === "owed") totalsByCurrency[d.currency].owed += d.amount;
    else totalsByCurrency[d.currency].paid += d.amount;
  }

  const totalCount = debts.length;
  const owedCount = debts.filter((d) => d.status === "owed").length;
  const paidCount = debts.filter((d) => d.status === "paid").length;

  const currencies = Object.keys(totalsByCurrency);

  return (
    <div className="card">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">📊 کۆی گشتی</h2>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-slate-50 p-3">
          <div className="text-xs text-slate-500">کۆی گشتی</div>
          <div className="text-2xl font-bold text-slate-800">{totalCount}</div>
        </div>
        <div className="rounded-lg bg-amber-50 p-3">
          <div className="text-xs text-amber-700">نەدراوە</div>
          <div className="text-2xl font-bold text-amber-700">{owedCount}</div>
        </div>
        <div className="rounded-lg bg-emerald-50 p-3">
          <div className="text-xs text-emerald-700">دانراوە</div>
          <div className="text-2xl font-bold text-emerald-700">{paidCount}</div>
        </div>
      </div>

      {currencies.length > 0 && (
        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
          {currencies.map((cur) => {
            const t = totalsByCurrency[cur];
            return (
              <div
                key={cur}
                className="flex items-center justify-between text-sm"
              >
                <span className="font-medium text-slate-700">
                  {CURRENCY_SYMBOLS[cur as keyof typeof CURRENCY_SYMBOLS]} {cur}
                </span>
                <div className="flex gap-3">
                  <span className="text-amber-700">
                    {formatNumber(t.owed)} نەدراوە
                  </span>
                  <span className="text-emerald-700">
                    {formatNumber(t.paid)} دانراوە
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
