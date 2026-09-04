import { useEffect, useReducer, type SVGProps } from "react";

function CheckCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 3.5 22 20.5H2z" strokeLinejoin="round" />
      <path d="M12 10v4.5" strokeLinecap="round" />
      <circle cx="12" cy="17.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ErrorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" strokeLinecap="round" />
    </svg>
  );
}

type ToastType = "success" | "warning" | "error";

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

type Action =
  | { kind: "ADD"; toastType: ToastType; message: string }
  | { kind: "REMOVE"; id: number };

function reducer(state: Toast[], action: Action): Toast[] {
  switch (action.kind) {
    case "ADD": {
      const id = Date.now();
      return [...state, { id, type: action.toastType, message: action.message }];
    }
    case "REMOVE":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

function ToastRow({ toast, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const isWarning = toast.type === "warning";
  const bg =
    toast.type === "success"
      ? "var(--color-success-bg)"
      : toast.type === "warning"
      ? "var(--color-error-bg)"
      : "var(--color-error-bg)";
  const fg =
    toast.type === "success"
      ? "var(--color-success)"
      : toast.type === "warning"
      ? "var(--color-error)"
      : "var(--color-error)";
  const Icon = toast.type === "success" ? CheckCircleIcon : toast.type === "warning" ? WarningIcon : ErrorIcon;

  return (
    <div
      role="status"
      style={{
        background: bg,
        color: fg,
        borderRadius: "var(--radius-sm)",
        padding: "var(--space-3)",
        marginBottom: "var(--space-2)",
        display: isWarning ? "block" : "flex",
        alignItems: "center",
        gap: "var(--space-2)",
      }}
    >
      {isWarning ? (
        <>
          <Icon aria-hidden="true" />{toast.message}
        </>
      ) : (
        <>
          <Icon aria-hidden="true" />
          <span>{toast.message}</span>
        </>
      )}
    </div>
  );
}

export default function ToastCenter() {
  const [toasts, dispatch] = useReducer(reducer, []);

  const fireOne = (toastType: ToastType, message: string) =>
    dispatch({ kind: "ADD", toastType, message });

  const fireThreeAtOnce = () => {
    dispatch({ kind: "ADD", toastType: "success", message: "Saved changes" });
    dispatch({ kind: "ADD", toastType: "warning", message: "Storage almost full" });
    dispatch({ kind: "ADD", toastType: "error", message: "Upload failed" });
  };

  return (
    <div className="card" style={{ padding: "var(--space-4)" }}>
      <h2 style={{ marginTop: 0 }}>Notifications</h2>
      <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-4)" }}>
        <button className="btn btn-primary" onClick={() => fireOne("success", "Saved changes")}>
          Success
        </button>
        <button className="btn btn-secondary" onClick={() => fireOne("warning", "Storage almost full")}>
          Warning
        </button>
        <button className="btn btn-secondary" onClick={() => fireOne("error", "Upload failed")}>
          Error
        </button>
        <button className="btn btn-secondary" onClick={fireThreeAtOnce}>
          Fire 3 at once
        </button>
      </div>
      <div>
        {toasts.map((t) => (
          <ToastRow key={t.id} toast={t} onDismiss={(id) => dispatch({ kind: "REMOVE", id })} />
        ))}
        {toasts.length === 0 && <p style={{ color: "var(--color-text-muted)" }}>No notifications.</p>}
      </div>
    </div>
  );
}
