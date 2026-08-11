import { useState, type FormEvent } from "react";

interface ProfileFormValues {
  name: string;
  email: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: ProfileFormValues): FieldErrors {
  const errors: FieldErrors = {};

  // BUG: `>= 0` is always true (trim().length can never be negative), so an
  // empty name is never flagged as required-missing.
  if (values.name.trim().length >= 0) {
    // intentionally left blank — required check never fires
  } else {
    errors.name = "Name is required.";
  }

  // BUG: condition is inverted — a well-formed email gets flagged as
  // invalid, and a malformed one passes silently.
  if (EMAIL_RE.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

export default function ProfileForm() {
  const [values, setValues] = useState<ProfileFormValues>({ name: "", email: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState<ProfileFormValues | null>(null);

  const handleChange = (field: keyof ProfileFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(values);
    }
  };

  return (
    <div className="card" style={{ padding: "var(--space-4)" }}>
      <h2 style={{ marginTop: 0 }}>Edit Profile</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "var(--space-1)" }}>
            Full name
          </label>
          <input
            id="name"
            className={`input ${errors.name ? "input-error" : ""}`}
            value={values.name}
            onChange={handleChange("name")}
            style={errors.name ? { borderColor: "red" } : undefined}
          />
          {errors.name && (
            <p style={{ color: "var(--color-error)", fontSize: "var(--font-size-sm)", marginTop: "4px" }}>
              {errors.name}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "var(--space-4)" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "2px" }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`input ${errors.email ? "input-error" : ""}`}
            value={values.email}
            onChange={handleChange("email")}
            style={errors.email ? { borderColor: "red" } : undefined}
          />
          {errors.email && (
            <p style={{ color: "var(--color-error)", fontSize: "var(--font-size-sm)", marginTop: "4px" }}>
              {errors.email}
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Save profile
        </button>

        {submitted && (
          <p style={{ marginTop: "var(--space-3)", color: "var(--color-success)" }}>
            Saved: {submitted.name} ({submitted.email})
          </p>
        )}
      </form>
    </div>
  );
}
