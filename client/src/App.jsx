import { useState } from "react";
import Users from "./pages/Users.jsx";
import Roles from "./pages/Roles.jsx";

export default function App() {
  const [page, setPage] = useState("users");

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><div className="brand-mark">UM</div><div><strong>User Management</strong><span>Admin Dashboard</span></div></div>
      <nav><button className={page === "users" ? "nav-active" : ""} onClick={() => setPage("users")}>Users</button><button className={page === "roles" ? "nav-active" : ""} onClick={() => setPage("roles")}>Roles</button></nav>
    </header>
    <main>{page === "users" ? <Users /> : <Roles />}</main>
  </div>;
}
