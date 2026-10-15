const topics = ['All dispatches', 'Technology', 'World', 'Business', 'Science', 'Culture'];

export default function TopicFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto border-y-2 border-charcoal py-3">
      {topics.map((topic) => (
        <button key={topic} onClick={() => onChange(topic)} className={`whitespace-nowrap border-2 border-charcoal px-3 py-1 font-mono text-xs uppercase tracking-wide ${active === topic ? 'bg-inkred text-paper' : 'bg-paper hover:bg-faded'}`}>
          {topic}
        </button>
      ))}
    </div>
  );
}
