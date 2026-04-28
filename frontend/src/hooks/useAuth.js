import { useState } from "react";

const SESSION_KEY = "ks_admin_authed";
const CORRECT     = import.meta.env.VITE_ADMIN_PASSWORD;

export function useAuth() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");

  function login(password) {
    if (password === CORRECT) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      return true;
    }
    return false;
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }

  return { authed, login, logout };
}
