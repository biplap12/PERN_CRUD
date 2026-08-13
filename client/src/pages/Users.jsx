import { useEffect, useState } from "react";
import { rolesApi, usersApi } from "../services/api.js";
import UserForm from "../components/users/UserForm.jsx";
import UserTable from "../components/users/UserTable.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [roleId, setRoleId] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 1,
  });
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const [userResponse, roleResponse] = await Promise.all([
        usersApi.list({
          page,
          limit: 10,
          search,
          ...(roleId ? { roleId } : {}),
        }),
        rolesApi.list(),
      ]);
      setUsers(userResponse.data.data);
      setPagination(userResponse.data.pagination);
      setRoles(roleResponse.data.data);
      setError("");
    } catch (e) {
      setError(e.response?.data?.message || "Could not load users.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [page, search, roleId]);

  async function save(data) {
    setSaving(true);
    try {
      if (editing) await usersApi.update(editing.id, data);
      else await usersApi.create(data);
      setEditing(null);
      await load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not save user.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(user) {
    if (!window.confirm(`Are you sure you want to delete ${user.name}?`))
      return;
    try {
      await usersApi.remove(user.id);
      await load();
    } catch (e) {
      setError(e.response?.data?.message || "Could not delete user.");
    }
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Directory</p>
          <h1>User Management</h1>
          <p>Manage users, roles, and access from one place.</p>
        </div>
      </div>
      {error && <div className="error-box global-error">{error}</div>}
      <div className="toolbar">
        <input
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          placeholder="Search users by name, email, or role..."
        />
        <select
          value={roleId}
          onChange={(e) => {
            setPage(1);
            setRoleId(e.target.value);
          }}>
          <option value="">All Roles</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>
      <div className="content-grid">
        <UserForm
          roles={roles}
          editingUser={editing}
          saving={saving}
          onSubmit={save}
          onCancel={() => setEditing(null)}
        />
        <div>
          <UserTable
            users={users}
            loading={loading}
            onEdit={setEditing}
            onDelete={remove}
          />
          <div className="pagination">
            <span>
              Showing {users.length} of {pagination.total} users
            </span>
            <div>
              <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                Previous
              </button>
              <strong>
                {pagination.page} / {pagination.totalPages}
              </strong>
              <button
                disabled={page >= pagination.totalPages}
                onClick={() => setPage(page + 1)}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
