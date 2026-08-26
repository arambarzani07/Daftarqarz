// پێناسەی جۆرەکان (Type definitions) بۆ ئەپی قەرزەکان

export type DebtStatus = "owed" | "paid"; // نەدراوە | دانراوە

export type Currency = "IQD" | "USD" | "EUR" | "TRY" | "GBP";

export interface Debt {
  id: string;
  personName: string;     // ناوی کەسە
  amount: number;         // بڕی قەرز
  currency: Currency;     // دراو
  description?: string;   // وەسف (هەڵبژاردنە)
  date: string;           // بەرواری درووستکردن (ISO)
  dueDate?: string;       // بەرواری دانەوە (هەڵبژاردنە)
  status: DebtStatus;     // دۆخ
}

export const CURRENCY_LABELS: Record<Currency, string> = {
  IQD: "دیناری عێراقی",
  USD: "دۆلاری ئەمریکی",
  EUR: "یۆرۆ",
  TRY: "لیرەی تورکی",
  GBP: "پاوەندی بەریتانی",
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  IQD: "د.ع",
  USD: "$",
  EUR: "€",
  TRY: "₺",
  GBP: "£",
};
