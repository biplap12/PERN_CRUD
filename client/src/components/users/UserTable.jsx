export default function UserTable({ users, loading, onEdit, onDelete }) {
  return (
    <div className="card table-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">Directory</p>
          <h2>Users</h2>
        </div>
        <span className="count-pill">{users.length} shown</span>
      </div>

      {loading ? <div className="loading">Loading users...</div> : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Created</th><th>Actions</th></tr></thead>
            <tbody>
              {users.length === 0 ? <tr><td colSpan="6" className="empty">No users found.</td></tr> :
                users.map((user) => (
                  <tr key={user.id}>
                    <td>#{user.id}</td><td>{user.name}</td><td>{user.email}</td>
                    <td><span className="badge">{user.role?.name}</span></td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="actions"><button onClick={() => onEdit(user)}>Edit</button><button className="danger-text" onClick={() => onDelete(user)}>Delete</button></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
