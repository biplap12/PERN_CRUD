import { useEffect, useState } from "react";

const initial = { name: "", email: "", roleId: "" };

export default function UserForm({
  roles,
  editingUser,
  saving,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(
      editingUser
        ? {
            name: editingUser.name,
            email: editingUser.email,
            roleId: String(editingUser.roleId),
          }
        : initial,
    );
    setError("");
  }, [editingUser]);

  function submit(event) {
    event.preventDefault();
    if (!form.name.trim()) return setError("Name is required.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return setError("Enter a valid email.");
    if (!form.roleId) return setError("Role is required.");

    setError("");
    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      roleId: String(form.roleId),
    });
  }

  return (
    <form className="card form-card" onSubmit={submit}>
      <div className="card-header">
        <div>
          <p className="eyebrow">User</p>
          <h2>{editingUser ? "Edit User" : "Create User"}</h2>
        </div>
      </div>

      {error && <div className="error-box">{error}</div>}

      <label>
        Name
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="John Doe"
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="john@example.com"
        />
      </label>
      <label>
        Role
        <select
          value={form.roleId}
          onChange={(e) => setForm({ ...form, roleId: e.target.value })}>
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </label>

      <div className="form-actions">
        <button className="primary" disabled={saving}>
          {saving ? "Saving..." : editingUser ? "Update User" : "Create User"}
        </button>
        {editingUser && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
