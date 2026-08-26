"use client";

import { useState, FormEvent } from "react";
import { Currency, Debt, CURRENCY_LABELS } from "@/lib/types";
import { uid } from "@/lib/storage";

interface DebtFormProps {
  onAdd: (debt: Debt) => void;
}

export default function DebtForm({ onAdd }: DebtFormProps) {
  const [personName, setPersonName] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("IQD");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!personName.trim()) {
      setError("تکایە ناوی کەسە بنووسە");
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("تکایە بڕێکی دروست بنووسە");
      return;
    }

    const newDebt: Debt = {
      id: uid(),
      personName: personName.trim(),
      amount: numAmount,
      currency,
      description: description.trim() || undefined,
      dueDate: dueDate || undefined,
      date: new Date().toISOString(),
      status: "owed",
    };

    onAdd(newDebt);

    // پاککردنەوەی فۆڕم
    setPersonName("");
    setAmount("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">➕ زیادکردنی قەرزی نوێ</h2>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          ناوی کەسە <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="input"
          placeholder="بۆ نمونە: ئاری کاکە"
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            بڕ <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            className="input"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            دراو
          </label>
          <select
            className="input"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
          >
            {(Object.keys(CURRENCY_LABELS) as Currency[]).map((c) => (
              <option key={c} value={c}>
                {CURRENCY_LABELS[c]} ({c})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          وەسف (هەڵبژاردنە)
        </label>
        <input
          type="text"
          className="input"
          placeholder="بۆ نمونە: پارەی نان، ئیلتزامات..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          بەرواری دانەوە (هەڵبژاردنە)
        </label>
        <input
          type="date"
          className="input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      {error && (
        <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          ⚠️ {error}
        </div>
      )}

      <button type="submit" className="btn-primary w-full">
        زیادکردن
      </button>
    </form>
  );
}
