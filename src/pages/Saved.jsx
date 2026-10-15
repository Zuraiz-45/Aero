import { useState } from 'react';
import NewsCard from '../components/NewsCard';
import ArticleModal from '../components/ArticleModal';
import { useSavedArticles } from '../context/SavedArticlesContext';
export default function Saved() {
  const [selected, setSelected] = useState(null);
  const { articles: saved, removeSaved } = useSavedArticles();
  return <section><p className="font-mono text-xs uppercase tracking-widest text-inkred">Personal archive</p><h1 className="mt-2 font-display text-5xl font-black">Saved dispatches.</h1>{saved.length === 0 ? <div className="paper-panel mt-8 p-10 text-center"><p className="font-display text-2xl font-bold">Your archive is empty.</p><p className="mt-2 font-mono text-xs">Bookmark a story from the news desk and it will appear here.</p></div> : <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">{saved.map((article) => <NewsCard key={article.id} article={article} isSaved onSave={() => removeSaved(article.id)} onOpen={setSelected} />)}</div>}<ArticleModal article={selected} onClose={() => setSelected(null)} /></section>;
}
