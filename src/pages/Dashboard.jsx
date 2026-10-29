import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
const subjects = ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer Science'];
const emptyMarks = () => Object.fromEntries(subjects.map(s => [s, '']));
function gradeFor(pct, pass) { if (!pass) return 'F'; if (pct >= 90) return 'A+'; if (pct >= 80) return 'A'; if (pct >= 70) return 'B'; if (pct >= 60) return 'C'; if (pct >= 50) return 'D'; return 'E'; }
export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('smc_session') || 'null');
  const storageKey = `smc_results_${user?.email || 'guest'}`;
  const [name, setName] = useState(''); const [roll, setRoll] = useState(''); const [marks, setMarks] = useState(emptyMarks);
  const [results, setResults] = useState(() => JSON.parse(localStorage.getItem(storageKey) || '[]'));
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [noticeType, setNoticeType] = useState('success');
  const average = useMemo(() => results.length ? (results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(1) : '0.0', [results]);
  const passed = results.filter(r => r.passed).length;
  function saveResults(next) { setResults(next); localStorage.setItem(storageKey, JSON.stringify(next)); }
  function calculate(e) {
    e.preventDefault(); setMessage('');
    const scores = subjects.map(s => Number(marks[s]));
    if (subjects.some(s => marks[s] === '') || scores.some(v => !Number.isFinite(v) || v < 0 || v > 100)) { setNoticeType('error'); setMessage('Enter marks between 0 and 100 for every subject.'); return; }
    const total = scores.reduce((a, b) => a + b, 0);
    const percentage = Number((total / subjects.length).toFixed(2));
    const isPassed = scores.every(v => v >= 35);
    const previous = results.find(r => r.id === editingId);
    const record = { id: editingId ?? crypto.randomUUID(), name: name.trim(), roll: roll.trim(), marks: { ...marks }, total, percentage, grade: gradeFor(percentage, isPassed), passed: isPassed, date: previous?.date ?? new Date().toLocaleDateString() };
    if (editingId && previous) {
      saveResults(results.map(r => r.id === editingId ? record : r));
      setMessage(`Result updated successfully for ${record.name}!`);
    } else {
      saveResults([record, ...results]);
      setMessage(`Result saved for ${record.name}!`);
    }
    setNoticeType('success');
    setEditingId(null); setName(''); setRoll(''); setMarks(emptyMarks());
  }
  function clearForm() { setEditingId(null); setName(''); setRoll(''); setMarks(emptyMarks()); setMessage(''); }
  function editResult(record) {
    setEditingId(record.id); setName(record.name); setRoll(record.roll); setMarks({ ...record.marks }); setMessage('');
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function remove(id) { saveResults(results.filter(r => r.id !== id)); if (editingId === id) clearForm(); }
  const latest = results[0];
  return <div className="app-shell"><Navbar user={user} /><main className="dashboard"><div className="dash-top"><div><span className="eyebrow">STUDENT DASHBOARD</span><h1>Good to see you, {user?.name?.split(' ')[0] || 'Student'} <span>👋</span></h1><p className="muted">Here's your academic overview. Keep up the great work!</p></div><div className="date-pill">✦ Your learning space</div></div>
    <section className="hero"><div><span className="hero-tag">✦ YOUR SUCCESS STARTS HERE</span><h2>Make every mark count.</h2><p>Enter your subject scores below and see your results come to life.</p><a href="#calculator" className="hero-link">Calculate marks ↓</a></div><div className="hero-art"><div className="art-ring"><span>★</span><strong>A+</strong><small>YOU GOT THIS</small></div></div></section>
    <section className="stat-grid"><article className="stat-card"><div className="stat-icon purple">▦</div><span>Total Results</span><strong>{results.length}</strong><small>Records calculated</small></article><article className="stat-card"><div className="stat-icon blue">◉</div><span>Average Score</span><strong>{average}%</strong><small>Across all results</small></article><article className="stat-card"><div className="stat-icon green">✓</div><span>Passed</span><strong>{passed}</strong><small>Successful results</small></article><article className="stat-card"><div className="stat-icon orange">✦</div><span>Latest Grade</span><strong>{latest?.grade || '—'}</strong><small>Most recent result</small></article></section>
    <div className="content-grid"><section className="panel" id="calculator"><div className="panel-heading"><div><span className="eyebrow">LET'S GET STARTED</span><h2>{editingId ? "Edit Student Marks" : "Marks Calculator"}</h2><p>{editingId ? "Correct the marks below, then save your changes." : "Fill in student details and marks out of 100."}</p></div><span className="panel-emoji">📝</span></div><form onSubmit={calculate}><div className="two-cols"><label>Student name<input required value={name} placeholder="Enter student name" onChange={e => setName(e.target.value)} /></label><label>Roll number<input required value={roll} placeholder="e.g. STU001" onChange={e => setRoll(e.target.value)} /></label></div><h3 className="subject-title">Subject Marks <span>Max: 100 each</span></h3><div className="subjects">{subjects.map((s, i) => <label className="subject-row" key={s}><span><span className="subject-number">{String(i + 1).padStart(2, '0')}</span>{s}</span><div className="mark-field"><input type="number" required min="0" max="100" step="any" placeholder="0" value={marks[s]} onChange={e => setMarks({ ...marks, [s]: e.target.value })} /><small>/ 100</small></div></label>)}</div>{message && <div className={noticeType === 'success' ? 'success' : 'error'} role="status">{message}</div>}<div className="form-actions"><button className="secondary" type="button" onClick={clearForm}>{editingId ? 'Cancel Edit' : 'Clear'}</button><button className="primary" type="submit">{editingId ? 'Save Updated Marks ✓' : 'Calculate & Save →'}</button></div></form></section>
    <aside className="right-col"><section className="panel grade-panel"><span className="eyebrow">GRADING SYSTEM</span><h2>Know your grades</h2><p className="muted">Each subject needs at least 35 marks to pass.</p>{[['A+', '90–100%', 'Excellent'], ['A', '80–89%', 'Very good'], ['B', '70–79%', 'Good'], ['C', '60–69%', 'Above average'], ['D', '50–59%', 'Average'], ['E', 'Below 50%', 'Pass if all subjects ≥35'], ['F', 'Any subject below 35', 'Fail']].map(([g, range, label]) => <div className="grade-row" key={g}><span className={`grade-badge ${g === 'F' ? 'fail' : ''}`}>{g}</span><span>{range}</span><small>{label}</small></div>)}</section><section className="tip-card"><span>💡</span><h3>Little tip, big impact</h3><p>Consistent practice is the secret to better grades. Keep learning, one subject at a time!</p></section></aside></div>
    <section className="panel history-panel"><div className="history-head"><div><span className="eyebrow">YOUR PROGRESS</span><h2>Recent Results</h2><p className="muted">All your saved student calculations.</p></div><span className="count-chip">{results.length} records</span></div>{results.length === 0 ? <div className="empty"><span>📚</span><h3>No results yet</h3><p>Calculate your first student result to see it here.</p></div> : <div className="table-wrap"><table><thead><tr><th>Student</th><th>Roll No.</th><th>Total / 500</th><th>Percentage</th><th>Grade</th><th>Status</th><th>Actions</th></tr></thead><tbody>{results.map(r => <tr key={r.id}><td><strong>{r.name}</strong><small>{r.date}</small></td><td>{r.roll}</td><td>{r.total}</td><td>{r.percentage}%</td><td><span className={`grade-badge ${r.grade === 'F' ? 'fail' : ''}`}>{r.grade}</span></td><td><span className={r.passed ? 'status-pass' : 'status-fail'}>{r.passed ? '● Pass' : '● Fail'}</span></td><td><div className="result-actions"><button className="edit-btn" type="button" aria-label={`Edit ${r.name}'s marks`} onClick={() => editResult(r)}>✎ Edit</button><button className="delete" type="button" aria-label={`Delete ${r.name}'s result`} onClick={() => remove(r.id)}>Delete</button></div></td></tr>)}</tbody></table></div>}</section><footer>✦ GradeFlow · Made for students who aim higher.</footer></main></div>;
}
