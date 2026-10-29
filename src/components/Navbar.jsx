import { useNavigate } from 'react-router-dom';
export default function Navbar({ user }) {
  const navigate = useNavigate();
  function logout() { localStorage.removeItem('smc_session'); navigate('/login', { replace: true }); }
  return <header className="navbar"><div className="brand"><span className="brand-icon">✦</span> GradeFlow <span className="brand-sub">Student Portal</span></div><div className="nav-right"><span className="user-chip">{user?.name?.charAt(0).toUpperCase() || 'S'}</span><span className="nav-name">{user?.name || 'Student'}</span><button className="logout" onClick={logout}>Log out ↗</button></div></header>;
}
