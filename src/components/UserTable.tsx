import { useCallback, useMemo, useState } from "react";

interface Row {
  id: number;
  name: string;
  email: string;
}

const PAGE_SIZE = 5;

function makeRows(count: number): Row[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
  }));
}

const ROWS = makeRows(23);

export default function UserTable() {
  const [page, setPage] = useState(1); // 1-indexed

  // BUG: should be Math.ceil so a trailing partial page is reachable.
  // With 23 rows / 5 per page this yields 4 instead of 5, silently
  // dropping the last 3 rows from ever being shown.
  const totalPages = useMemo(() => Math.floor(ROWS.length / PAGE_SIZE), []);

  const pageRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return ROWS.slice(start, start + PAGE_SIZE);
  }, [page]);

  const goPrev = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const goNext = useCallback(() => setPage((p) => Math.min(totalPages, p + 1)), [totalPages]);

  return (
    <div className="card" style={{ padding: "var(--space-4)" }}>
      <h2 style={{ marginTop: 0 }}>Customers ({ROWS.length} total)</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "10px 6px", borderBottom: "2px solid var(--color-border)" }}>
              Name
            </th>
            <th style={{ textAlign: "left", padding: "10px 6px", borderBottom: "2px solid var(--color-border)" }}>
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {pageRows.map((row) => (
            <tr key={row.id}>
              <td style={{ padding: "var(--space-3) var(--space-2)", borderBottom: "1px solid var(--color-border)" }}>
                {row.name}
              </td>
              <td style={{ padding: "var(--space-3) var(--space-2)", borderBottom: "1px solid var(--color-border)" }}>
                {row.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-4)", alignItems: "center" }}>
        <button className="btn btn-secondary" onClick={goPrev} disabled={page === 1}>
          Prev
        </button>
        <span style={{ color: "var(--color-text-muted)" }}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={page === totalPages}
          style={{
            background: "#3b6fe0",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "9px 14px",
            fontWeight: 600,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
