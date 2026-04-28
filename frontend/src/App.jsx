import { useAuth } from "./hooks/useAuth";
import Login     from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { authed, login, logout } = useAuth();

  if (!authed) return <Login onLogin={login}/>;
  return <Dashboard onLogout={logout}/>;
}
