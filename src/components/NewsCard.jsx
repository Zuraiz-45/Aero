import { Bookmark, BookmarkCheck, ExternalLink } from 'lucide-react';

export default function NewsCard({ article, isSaved, onSave, onOpen }) {
  return (
    <article className="paper-panel press-shadow flex min-h-[280px] flex-col p-5">
      <div className="flex items-start justify-between gap-3 border-b border-charcoal/40 pb-3 font-mono text-[10px] uppercase tracking-widest">
        <span className="text-inkred">{article.source}</span>
        <span>{article.publishedAt || 'Today'} · {article.topic}</span>
      </div>
      <button onClick={() => onOpen(article)} className="mt-4 text-left">
        <h2 className="font-display text-2xl font-black leading-tight hover:text-inkred">{article.title}</h2>
      </button>
      <ul className="mt-4 flex-1 space-y-2 border-l-2 border-inkred pl-4 font-mono text-xs leading-relaxed">
        {(article.summary || []).slice(0, 3).map((point) => <li key={point}>{point}</li>)}
      </ul>
      <div className="mt-5 flex items-center justify-between border-t-2 border-charcoal pt-3">
        <button onClick={() => onOpen(article)} className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider hover:text-inkred">Read dispatch <ExternalLink size={13} /></button>
        <button aria-label={isSaved ? 'Remove bookmark' : 'Save article'} onClick={() => onSave(article)} className="text-inkred hover:scale-110">
          {isSaved ? <BookmarkCheck fill="currentColor" /> : <Bookmark />}
        </button>
      </div>
    </article>
  );
}
