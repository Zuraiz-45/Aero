import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const topics = ['Technology', 'World', 'Business', 'Science', 'Culture', 'Climate', 'Design', 'Sport'];
export default function Preferences() {
  const { user, updateUser } = useAuth();
  const [selected, setSelected] = useState(user?.preferences || ['Technology', 'Science']);
  const navigate = useNavigate();
  const toggle = (topic) => setSelected((current) => current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]);
  const savePreferences = () => {
    updateUser({ preferences: selected });
    navigate('/feed');
  };
  return <section className="mx-auto max-w-3xl">
    <p className="font-mono text-xs uppercase tracking-widest text-inkred">Edition 01 / Setup</p>
    <h1 className="mt-2 font-display text-5xl font-black">Choose your front page.</h1>
    <p className="mt-4 max-w-xl font-body">Select the subjects you want AERO to watch. You can change this composition whenever you like.</p>
    <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">{topics.map((topic) => <button key={topic} onClick={() => toggle(topic)} className={`min-h-28 border-2 border-charcoal p-4 text-left font-display text-xl font-black ${selected.includes(topic) ? 'bg-inkred text-paper' : 'bg-paper hover:bg-faded'}`}><span className="font-mono text-xs">{selected.includes(topic) ? '[x]' : '[ ]'}</span><br />{topic}</button>)}</div>
    <button onClick={savePreferences} disabled={!selected.length} className="press-button mt-8 disabled:cursor-not-allowed disabled:opacity-50">Print my feed</button>
  </section>;
}
