import { useMemo, useState } from 'react';
import TopicFilter from '../components/TopicFilter';
import NewsCard from '../components/NewsCard';
import ArticleModal from '../components/ArticleModal';
import { useNewsFeed } from '../hooks/useNewsFeed';
import { useSavedArticles } from '../context/SavedArticlesContext';

const sampleArticles = [
  { id: 1, source: 'techcrunch.com', topic: 'Technology', title: 'Small teams are building the next great internet utilities', publishedAt: '2 hours ago', summary: ['Independent builders are choosing focused tools over sprawling platforms.', 'The shift is changing how early products find their first users.', 'A new generation of software is being made for communities, not crowds.'] },
  { id: 2, source: 'nature.com', topic: 'Science', title: 'A patient approach to restoring the world’s damaged wetlands', publishedAt: '4 hours ago', summary: ['Researchers are measuring recovery in years rather than news cycles.', 'Local stewardship remains the strongest predictor of lasting results.', 'The methods offer a practical model for other fragile ecosystems.'] },
  { id: 3, source: 'theguardian.com', topic: 'Culture', title: 'The return of the beautifully made, deliberately slow object', publishedAt: 'Yesterday', summary: ['Craft has become a response to disposable digital experiences.', 'Collectors are valuing provenance and repair over novelty.', 'Studios are finding new audiences through small, direct editions.'] }
];

export default function Feed() {
  const [topic, setTopic] = useState('All dispatches');
  const [selected, setSelected] = useState(null);
  const { isSaved, toggleSaved } = useSavedArticles();
  const { data, isLoading, isError, isFetchingNextPage, hasNextPage, fetchNextPage } = useNewsFeed({ topic });
  const articles = useMemo(() => {
    const remoteArticles = data?.pages?.flatMap((page) => page?.articles || []) || [];
    return remoteArticles.length ? remoteArticles : sampleArticles;
  }, [data]);
  const filtered = topic === 'All dispatches' ? articles : articles.filter((article) => article.topic === topic);
  return <section>
    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="font-mono text-xs uppercase tracking-widest text-inkred">Thursday / The morning edition</p><h1 className="mt-2 font-display text-5xl font-black">Your news desk.</h1></div><p className="max-w-xs font-mono text-xs uppercase leading-relaxed">AI-summarised dispatches, selected from the subjects you follow.</p></div>
    <TopicFilter active={topic} onChange={setTopic} />
    {isLoading && <p className="py-10 font-mono text-sm">Setting the type...</p>}
    {isError && <p className="py-10 font-mono text-sm text-inkred">The wire is quiet. Showing the latest saved press proof.</p>}
    <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">{filtered.map((article) => <NewsCard key={article.id} article={article} isSaved={isSaved(article.id)} onSave={toggleSaved} onOpen={setSelected} />)}</div>
    <div className="mt-10 text-center"><button disabled={isFetchingNextPage || !hasNextPage} onClick={() => fetchNextPage()} className="press-button disabled:cursor-not-allowed disabled:opacity-50">{isFetchingNextPage ? 'Setting more type...' : hasNextPage ? 'Load more dispatches' : 'End of the edition'}</button></div>
    <ArticleModal article={selected} onClose={() => setSelected(null)} />
  </section>;
}
