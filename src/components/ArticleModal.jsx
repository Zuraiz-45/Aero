import { X } from 'lucide-react';

export default function ArticleModal({ article, onClose }) {
  if (!article) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-5" role="dialog" aria-modal="true">
      <div className="paper-panel press-shadow max-h-[90vh] w-full max-w-2xl overflow-y-auto p-7">
        <div className="flex justify-between border-b-2 border-charcoal pb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-inkred">{article.source}</span>
          <button onClick={onClose} aria-label="Close article"><X /></button>
        </div>
        <h2 className="mt-6 font-display text-4xl font-black leading-tight">{article.title}</h2>
        <p className="mt-3 font-mono text-xs uppercase">{article.publishedAt} / {article.topic}</p>
        <div className="mt-7 space-y-4 font-body leading-relaxed">
          {(article.summary || []).map((point) => <p key={point} className="border-l-4 border-inkred pl-4">{point}</p>)}
          <p className="border-t-2 border-charcoal pt-5 text-sm">This reading view is ready to display the full article content from the AERO backend.</p>
        </div>
      </div>
    </div>
  );
}
