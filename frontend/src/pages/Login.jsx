import { useState } from "react";
import { Sparkles, Lock, Eye, EyeOff, LogIn } from "lucide-react";

export default function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [show,     setShow]     = useState(false);
  const [error,    setError]    = useState(false);
  const [loading,  setLoading]  = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    // Small delay so it doesn't feel instant (UX)
    setTimeout(() => {
      const ok = onLogin(password);
      if (!ok) {
        setError(true);
        setPassword("");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#091428] flex items-center justify-center px-4">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full top-[-10%] right-[-8%]"
          style={{ background: "radial-gradient(circle,rgba(42,74,130,0.35) 0%,transparent 70%)" }}/>
        <div className="absolute w-[400px] h-[400px] rounded-full bottom-[-10%] left-[-8%]"
          style={{ background: "radial-gradient(circle,rgba(24,52,95,0.5) 0%,transparent 70%)" }}/>
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a3566] to-[#0d1c3f] border border-yellow-500/30 flex items-center justify-center shadow-xl">
            <Sparkles size={24} className="text-yellow-400"/>
          </div>
          <div className="text-center">
            <p className="font-bold text-white text-xl tracking-tight">Keystoners</p>
            <p className="text-xs text-white/40 mt-0.5">Admin Dashboard</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#0d1c3f]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
              <Lock size={14} className="text-yellow-400"/>
            </div>
            <h1 className="font-bold text-white text-lg">Sign in</h1>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wide mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(false); }}
                  placeholder="Enter password"
                  autoFocus
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 pr-11 text-white text-sm placeholder-white/20 focus:outline-none transition-colors ${
                    error
                      ? "border-red-500/50 focus:border-red-500/70"
                      : "border-white/10 focus:border-yellow-500/50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShow(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {show ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-xs mt-2">Incorrect password. Try again.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!password || loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-400 text-[#0d1c3f] font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-opacity disabled:opacity-40 hover:opacity-90"
            >
              {loading
                ? <span className="animate-spin w-4 h-4 border-2 border-[#0d1c3f]/30 border-t-[#0d1c3f] rounded-full"/>
                : <><LogIn size={15}/>Sign In</>}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Keystoners Exterior Cleaning · Admin Only
        </p>
      </div>
    </div>
  );
}
