// یاریدەدەرەکانی پاشەکەوتکردن لە localStorage

import { Debt } from "./types";

const STORAGE_KEY = "daftarqarz.debts.v1";

export function loadDebts(): Debt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as Debt[];
  } catch (err) {
    console.error("هەڵە لە خوێندنەوەی localStorage:", err);
    return [];
  }
}

export function saveDebts(debts: Debt[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(debts));
  } catch (err) {
    console.error("هەڵە لە نووسینی localStorage:", err);
  }
}

export function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("ckb-IQ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("ckb-IQ", {
    maximumFractionDigits: 2,
  }).format(num);
}

export function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}
