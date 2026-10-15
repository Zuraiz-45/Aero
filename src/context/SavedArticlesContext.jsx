import React, { createContext, useContext, useMemo, useState } from 'react';

const SavedArticlesContext = createContext(null);

function readSavedArticles() {
  try {
    const saved = JSON.parse(localStorage.getItem('aero_saved'));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function SavedArticlesProvider({ children }) {
  const [articles, setArticles] = useState(readSavedArticles);

  const toggleSaved = (article) => {
    setArticles((current) => {
      const next = current.some((item) => item.id === article.id)
        ? current.filter((item) => item.id !== article.id)
        : [...current, article];
      localStorage.setItem('aero_saved', JSON.stringify(next));
      return next;
    });
  };

  const removeSaved = (articleId) => {
    setArticles((current) => {
      const next = current.filter((article) => article.id !== articleId);
      localStorage.setItem('aero_saved', JSON.stringify(next));
      return next;
    });
  };

  const value = useMemo(
    () => ({
      articles,
      isSaved: (articleId) => articles.some((article) => article.id === articleId),
      toggleSaved,
      removeSaved
    }),
    [articles]
  );

  return <SavedArticlesContext.Provider value={value}>{children}</SavedArticlesContext.Provider>;
}

export function useSavedArticles() {
  const context = useContext(SavedArticlesContext);
  if (!context) throw new Error('useSavedArticles must be used inside SavedArticlesProvider');
  return context;
}
