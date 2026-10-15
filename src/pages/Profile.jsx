import { useAuth } from '../context/AuthContext';
export default function Profile() {
  const { user } = useAuth();
  return <section className="max-w-2xl"><p className="font-mono text-xs uppercase tracking-widest text-inkred">Reader file</p><h1 className="mt-2 font-display text-5xl font-black">Profile & settings.</h1><div className="paper-panel press-shadow mt-8 p-6"><dl className="divide-y-2 divide-charcoal">{[['Name', user?.name || 'AERO Reader'], ['Email', user?.email || 'reader@example.com'], ['Edition', 'Personal / AI arranged']].map(([label, value]) => <div key={label} className="grid gap-2 py-4 md:grid-cols-3"><dt className="font-mono text-xs uppercase tracking-widest text-inkred">{label}</dt><dd className="font-display text-xl font-bold md:col-span-2">{value}</dd></div>)}</dl><button className="press-button mt-5">Save settings</button></div></section>;
}
