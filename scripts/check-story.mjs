import assert from "node:assert/strict";
import {
  current,
  previous,
  report,
  differences,
  change,
} from "../lib/story-data.ts";
for (const r of report) {
  assert.equal(
    r.rows.reduce((sum, row) => sum + row.sales, 0),
    r.sales,
  );
  assert.equal(
    r.rows.reduce((sum, row) => sum + row.purchase, 0),
    r.purchase,
  );
  assert.equal(r.sales - r.purchase - r.operating, r.profit);
  r.rows.forEach((row) =>
    assert.equal(row.quantity * row.unitCost, row.purchase),
  );
}
assert.equal(previous.profit, 300);
assert.equal(current.profit, 216);
assert.equal(change(previous.sales, current.sales), 20);
assert.equal(change(previous.purchase, current.purchase), 40);
assert.ok(Math.abs(change(previous.profit, current.profit) + 28) < 1e-10);
assert.equal(
  differences.reduce((sum, row) => sum + row.delta, 0),
  current.purchase - previous.purchase,
);
assert.equal(
  previous.profit +
    (current.sales - previous.sales) -
    (current.purchase - previous.purchase) -
    (current.operating - previous.operating),
  current.profit,
);
assert.equal(
  differences[0].delta,
  Math.max(...differences.map((row) => row.delta)),
);
console.log(
  "PASS: row totals, period totals, profit bridge, deltas, and largest cost driver reconcile.",
);
