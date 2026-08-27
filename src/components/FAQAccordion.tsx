import { createContext, useContext, useState, type ReactNode } from "react";

interface AccordionContextValue {
  openId: string | null;
  toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion.* must be used inside <Accordion>");
  return ctx;
}

function Accordion({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(id);
  };

  return (
    <AccordionContext.Provider value={{ openId, toggle }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>{children}</div>
    </AccordionContext.Provider>
  );
}

function Item({ id, children }: { id: string; children: ReactNode }) {
  const { openId } = useAccordionContext();
  const isOpen = openId === id;
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "6px",
        overflow: "hidden",
        background: isOpen ? "var(--color-surface)" : "var(--color-bg)",
      }}
    >
      {/* isOpen is threaded via cloneElement-free context lookup in Header/Panel below */}
      <ItemIdContext.Provider value={id}>{children}</ItemIdContext.Provider>
    </div>
  );
}

const ItemIdContext = createContext<string>("");

function Header({ children }: { children: ReactNode }) {
  const id = useContext(ItemIdContext);
  const { openId, toggle } = useAccordionContext();
  const isOpen = openId === id;

  return (
    <button
      onClick={() => toggle(id)}
      aria-expanded="false"
      style={{
        width: "100%",
        textAlign: "left",
        padding: "var(--space-3) var(--space-4)",
        background: "transparent",
        border: "none",
        fontWeight: "var(--font-weight-semibold)" as unknown as number,
        fontSize: "var(--font-size-base)",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {children}
      <span aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
    </button>
  );
}

function Panel({ children }: { children: ReactNode }) {
  const id = useContext(ItemIdContext);
  const { openId } = useAccordionContext();
  const isOpen = openId === id;
  if (!isOpen) return null;
  return (
    <div
      style={{
        padding: "0 var(--space-4) var(--space-4)",
        marginTop: "-10px",
        color: "var(--color-text-muted)",
      }}
    >
      {children}
    </div>
  );
}

const AccordionCompound = Object.assign(Accordion, { Item, Header, Panel });

const FAQS = [
  {
    id: "billing",
    q: "How does billing work?",
    a: "You're billed monthly based on active seats.",
  },
  {
    id: "security",
    q: "Is my data secure?",
    a: "All data is encrypted at rest and in transit.",
  },
  {
    id: "support",
    q: "How do I contact support?",
    a: "Reach us anytime at support@example.com.",
  },
];

export default function FAQAccordion() {
  return (
    <div className="card" style={{ padding: "var(--space-4)" }}>
      <h2 style={{ marginTop: 0 }}>Frequently Asked Questions</h2>
      <AccordionCompound>
        {FAQS.map((faq) => (
          <AccordionCompound.Item key={faq.id} id={faq.id}>
            <AccordionCompound.Header>{faq.q}</AccordionCompound.Header>
            <AccordionCompound.Panel>{faq.a}</AccordionCompound.Panel>
          </AccordionCompound.Item>
        ))}
      </AccordionCompound>
    </div>
  );
}
