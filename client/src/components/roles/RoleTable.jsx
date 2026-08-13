export default function RoleTable({ roles, loading, onEdit, onDelete }) {
  return (
    <div className="card table-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Access</p>
          <h2>Roles</h2>
        </div>
        <span className="count-pill">{roles.length} roles</span>
      </div>
      {loading ? (
        <div className="loading">Loading roles...</div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th> 
                <th>Name</th>
                <th>Description</th>
                <th>Users</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty">
                    No roles found.
                  </td>
                </tr>
              ) : (
                roles.map((role) => (
                  <tr key={role.id}>
                    <td>#{role.id}</td>
                    <td>
                      <strong>{role.name}</strong>
                    </td>
                    <td>{role.description || "—"}</td>
                    <td>
                      <span className="badge">{role._count?.users ?? 0}</span>
                    </td>
                    <td>{new Date(role.createdAt).toLocaleDateString()}</td>
                    <td className="actions">
                      <button onClick={() => onEdit(role)}>Edit</button>
                      <button
                        className="danger-text"
                        onClick={() => onDelete(role)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
