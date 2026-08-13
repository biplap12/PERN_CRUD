import { useEffect, useState } from "react";

export default function RoleForm({ editingRole, saving, onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(
      editingRole
        ? { name: editingRole.name, description: editingRole.description || "" }
        : { name: "", description: "" },
    );
    setError("");
  }, [editingRole]);

  function submit(event) {
    event.preventDefault();
    if (!form.name.trim()) return setError("Role name is required.");
    setError("");
    onSubmit({
      name: form.name.trim(),
      description: form.description.trim() || null,
    });
  }

  return (
    <form className="card form-card" onSubmit={submit}>
      <div className="card-header">
        <div>
          <p className="eyebrow">Role</p>
          <h2>{editingRole ? "Edit Role" : "Create Role"}</h2>
        </div>
      </div>
      {error && <div className="error-box">{error}</div>}
      <label>
        Name
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Administrator"
        />
      </label>
      <label>
        Description
        <textarea
          rows="5"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe this role..."
        />
      </label>
      <div className="form-actions">
        <button className="primary" disabled={saving}>
          {saving ? "Saving..." : editingRole ? "Update Role" : "Create Role"}
        </button>
        {editingRole && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
