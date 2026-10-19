// Fictional trading company. Millions of tomans; never customer results.
// All purchased units are sold. No inventory, tax, interest or depreciation.
export const fixture = {
  periods: ["previous", "current"],
  products: [
    {
      id: "A",
      name: { fa: "محصول الف", en: "Product A" },
      quantity: [60, 72],
      price: [10, 10],
      unitCost: [5.5, 6.75],
    },
    {
      id: "B",
      name: { fa: "محصول ب", en: "Product B" },
      quantity: [40, 48],
      price: [10, 10],
      unitCost: [6, 6.875],
    },
    {
      id: "C",
      name: { fa: "محصول پ", en: "Product C" },
      quantity: [20, 24],
      price: [10, 10],
      unitCost: [7.5, 8],
    },
  ],
  operatingCosts: [180, 216],
} as const;
export const report = fixture.periods.map((period, i) => {
  const rows = fixture.products.map((p) => ({
    id: p.id,
    name: p.name,
    quantity: p.quantity[i],
    unitCost: p.unitCost[i],
    sales: p.quantity[i] * p.price[i],
    purchase: p.quantity[i] * p.unitCost[i],
  }));
  const sales = rows.reduce((sum, r) => sum + r.sales, 0);
  const purchase = rows.reduce((sum, r) => sum + r.purchase, 0);
  const operating = fixture.operatingCosts[i];
  return {
    period,
    rows,
    sales,
    purchase,
    operating,
    profit: sales - purchase - operating,
    margin: ((sales - purchase - operating) / sales) * 100,
  };
});
export const previous = report[0];
export const current = report[1];
export const change = (before: number, after: number) =>
  ((after - before) / before) * 100;
export const differences = current.rows.map((r, i) => ({
  ...r,
  delta: r.purchase - previous.rows[i].purchase,
}));
export const number = (value: number, lang: "fa" | "en", digits = 0) =>
  new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-US", {
    maximumFractionDigits: digits,
  }).format(value);
export const percent = (value: number, lang: "fa" | "en") =>
  new Intl.NumberFormat(lang === "fa" ? "fa-IR" : "en-US", {
    style: "percent",
    maximumFractionDigits: 0,
    signDisplay: "exceptZero",
  }).format(value / 100);
