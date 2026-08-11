import { useEffect, useMemo, useState } from "react";

interface User {
  id: number;
  name: string;
  role: string;
}

const USERS: User[] = [
  { id: 1, name: "Asha Verma", role: "Frontend Engineer" },
  { id: 2, name: "Liam Chen", role: "Backend Engineer" },
  { id: 3, name: "Priya Nair", role: "Product Designer" },
  { id: 4, name: "Marco Silva", role: "QA Engineer" },
  { id: 5, name: "Fatima Khan", role: "Engineering Manager" },
  { id: 6, name: "Tom Becker", role: "Frontend Engineer" },
  { id: 7, name: "Ines Ortega", role: "Data Engineer" },
];

/**
 * Debounces a fast-changing value so downstream filtering doesn't run on
 * every keystroke.
 */
function useDebouncedValue(value: string, delayMs: number): string {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebounced(value);
    }, delayMs);
    return () => clearTimeout(handle);
  }, [delayMs]);

  return debounced;
}

export default function SearchableUserList() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return USERS;
    return USERS.filter(
      (u) => u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q)
    );
  }, [debouncedQuery]);

  return (
    <div className="card" style={{ padding: "var(--space-4)" }}>
      <h2 style={{ marginTop: 0 }}>Team Directory</h2>
      <input
        className="input"
        placeholder="Search by name or role…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "6px 10px", borderRadius: "2px", marginBottom: "var(--space-3)" }}
      />
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {results.map((u) => (
          <li
            key={u.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "var(--space-2) var(--space-3)",
              borderBottom: "1px solid var(--color-border)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e0e7ff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <span>{u.name}</span>
            <span style={{ color: "var(--color-text-muted)" }}>{u.role}</span>
          </li>
        ))}
        {results.length === 0 && (
          <li style={{ padding: "var(--space-3)", color: "var(--color-text-muted)" }}>
            No matches.
          </li>
        )}
      </ul>
    </div>
  );
}
