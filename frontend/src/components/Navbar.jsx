import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-slate-900 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight">JobTrack</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-slate-300 text-sm">{user.name}</span>
          <button
            onClick={logout}
            className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-md transition-colors"
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;