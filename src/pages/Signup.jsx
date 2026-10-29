import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  function submit(e) {
    e.preventDefault(); setError('');
    const name = form.name.trim(); const email = form.email.trim().toLowerCase();
    if (!name || !email || !form.password) return setError('Please fill in all fields.');
    if (form.password.length < 6) return setError('Password must have at least 6 characters.');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    const users = JSON.parse(localStorage.getItem('smc_users') || '[]');
    if (users.some(u => u.email === email)) return setError('This email is already registered.');
    users.push({ name, email, password: form.password });
    localStorage.setItem('smc_users', JSON.stringify(users));
    navigate('/login', { state: { message: 'Account created! Please log in.' } });
  }
  return <main className="auth-shell"><section className="auth-side"><div className="auth-logo">✦ GradeFlow</div><div><span className="eyebrow light">YOUR ACADEMIC COMPANION</span><h1>Every great result starts with a little progress.</h1><p>Calculate your marks, understand your grades, and celebrate your achievements — all in one place.</p><div className="side-stats"><span>✧ Smart grading</span><span>✧ Instant results</span><span>✧ Track progress</span></div></div><small>Designed for students, built for success.</small></section><section className="auth-form-wrap"><form className="auth-card" onSubmit={submit}><span className="eyebrow">GET STARTED</span><h2>Create your account</h2><p className="muted">Join GradeFlow and start tracking your progress.</p><label>Full name<input required placeholder="e.g. Alex Johnson" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label><label>Email address<input required type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label><label>Password<input required type="password" minLength="6" placeholder="At least 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></label><label>Confirm password<input required type="password" placeholder="Re-enter password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} /></label>{error && <div className="error" role="alert">{error}</div>}<button className="primary full">Create account →</button><p className="auth-bottom">Already have an account? <Link to="/login">Log in</Link></p></form></section></main>;
}
