import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await (mode === 'login' ? login(form) : register(form));
      navigate('/feed');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'The press could not verify your details.');
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <div className="paper-panel press-shadow w-full max-w-md p-2">
        <div className="border-2 border-charcoal p-7">
          <Link to="/login" className="font-display text-5xl font-black">AERO<span className="text-inkred">.</span></Link>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest">Your intelligent daily dispatch</p>
          <p className="mt-5 border-l-2 border-inkred pl-3 font-mono text-[10px] uppercase leading-relaxed">
            Demo mode is available while the backend is offline. Use any valid email and password.
          </p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            {mode === 'register' && <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border-2 border-charcoal bg-transparent p-3 font-mono text-sm outline-none focus:border-inkred" />}
            <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border-2 border-charcoal bg-transparent p-3 font-mono text-sm outline-none focus:border-inkred" />
            <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full border-2 border-charcoal bg-transparent p-3 font-mono text-sm outline-none focus:border-inkred" />
            {error && <p className="font-mono text-xs text-inkred">{error}</p>}
            <button className="press-button w-full">{mode === 'login' ? 'Enter the newsroom' : 'Join AERO'}</button>
          </form>
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="mt-5 font-mono text-xs underline">{mode === 'login' ? 'New reader? Register' : 'Already registered? Log in'}</button>
        </div>
      </div>
    </main>
  );
}
