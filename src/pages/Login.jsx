import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
export default function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('');
  const navigate = useNavigate(); const location = useLocation();
  function submit(e) {
    e.preventDefault(); setError('');
    const users = JSON.parse(localStorage.getItem('smc_users') || '[]');
    const user = users.find(u => u.email === email.trim().toLowerCase() && u.password === password);
    if (!user) return setError('Incorrect email or password.');
    localStorage.setItem('smc_session', JSON.stringify({ name: user.name, email: user.email }));
    navigate('/dashboard', { replace: true });
  }
  return <main className="auth-shell"><section className="auth-side"><div className="auth-logo">✦ GradeFlow</div><div><span className="eyebrow light">LEARN • GROW • ACHIEVE</span><h1>Your grades. Your growth. Your journey.</h1><p>A beautiful, simple space to calculate results and stay motivated every step of the way.</p><div className="side-stats"><span>✧ 5 Subjects</span><span>✧ Grade insights</span><span>✧ Saved history</span></div></div><small>Small steps. Big achievements.</small></section><section className="auth-form-wrap"><form className="auth-card" onSubmit={submit}><span className="eyebrow">WELCOME BACK</span><h2>Log in to GradeFlow</h2><p className="muted">Pick up right where you left off.</p>{location.state?.message && <div className="success">{location.state.message}</div>}<label>Email address<input type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} /></label><label>Password<input type="password" required placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} /></label>{error && <div className="error" role="alert">{error}</div>}<button className="primary full">Log in →</button><p className="auth-bottom">Don't have an account? <Link to="/signup">Sign up for free</Link></p></form></section></main>;
}
