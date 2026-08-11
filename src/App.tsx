import { useState } from "react";
import SearchableUserList from "./components/SearchableUserList";
import FAQAccordion from "./components/FAQAccordion";
import UserTable from "./components/UserTable";
import ToastCenter from "./components/ToastCenter";
import ProfileForm from "./components/ProfileForm";

const TABS = [
  { id: "list", label: "1. User List", Component: SearchableUserList },
  { id: "accordion", label: "2. FAQ Accordion", Component: FAQAccordion },
  { id: "table", label: "3. Customer Table", Component: UserTable },
  { id: "toasts", label: "4. Notifications", Component: ToastCenter },
  { id: "form", label: "5. Profile Form", Component: ProfileForm },
];

export default function App() {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0];
  const Active = active.Component;

  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "var(--space-5)" }}>
      <header style={{ marginBottom: "var(--space-5)" }}>
        <h1 style={{ marginBottom: "var(--space-1)" }}>UI Engineer Interview — Bug Hunt</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: 0 }}>
          Review each component below. Find the logical bug and fix it in the source. Compare
          the rendered UI against <code>src/styles/tokens.css</code> and note any
          inconsistencies in <code>FINDINGS_TEMPLATE.md</code>. No screenshots — describe what
          you find in writing.
        </p>
      </header>

      <nav
        style={{
          display: "flex",
          gap: "var(--space-2)",
          marginBottom: "var(--space-5)",
          borderBottom: "1px solid var(--color-border)",
          paddingBottom: "var(--space-3)",
          flexWrap: "wrap",
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            className={t.id === activeId ? "btn btn-primary" : "btn btn-secondary"}
            onClick={() => setActiveId(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <Active />
    </div>
  );
}
