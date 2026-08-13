import { useEffect, useState } from "react";
import { rolesApi } from "../services/api.js";
import RoleForm from "../components/roles/RoleForm.jsx";
import RoleTable from "../components/roles/RoleTable.jsx";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const response = await rolesApi.list();
      setRoles(response.data.data);
      setError("");
    } catch (e) {
      setError(e.response?.data?.message || "Could not load roles.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);

  async function save(data) {
    setSaving(true);
    try {
      if (editing) await rolesApi.update(editing.id, data);
      else await rolesApi.create(data);
      setEditing(null);
      await load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not save role.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(role) {
    if (!window.confirm(`Are you sure you want to delete ${role.name}?`))
      return;
    try {
      await rolesApi.remove(role.id);
      await load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not delete role.");
    }
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Access Control</p>
          <h1>Role Management</h1>
          <p>Create and maintain the roles used by your users.</p>
        </div>
      </div>
      {error && <div className="error-box global-error">{error}</div>}
      <div className="content-grid">
        <RoleForm
          editingRole={editing}
          saving={saving}
          onSubmit={save}
          onCancel={() => setEditing(null)}
        />
        <RoleTable
          roles={roles}
          loading={loading}
          onEdit={setEditing}
          onDelete={remove}
        />
      </div>
    </div>
  );
}
