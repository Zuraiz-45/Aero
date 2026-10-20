# AERO Frontend

> A personalised AI news aggregator built as a MERN stack semester project.

**Authors:** Rao M. Zuraiz, Aleeshba Shahbaz  
**Roll Number:** SP24-BCS-111, SP24-BCS-075  
**Institution:** COMSATS University Sahiwal Campus

## Folder structure

```text
src/
├── components/
│   ├── ArticleModal.jsx
│   ├── NewsCard.jsx
│   ├── TopicFilter.jsx
│   └── layout/SiteLayout.jsx
├── context/AuthContext.jsx
├── context/SavedArticlesContext.jsx
├── hooks/useNewsFeed.js
├── lib/api.js
├── pages/
│   ├── Feed.jsx
│   ├── Login.jsx
│   ├── Preferences.jsx
│   ├── Profile.jsx
│   └── Saved.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Setup

```bash
npm install
npm run dev
```

Set `VITE_API_URL` in a `.env` file to point to the backend (defaults to `http://localhost:5000`). The frontend expects login and registration responses shaped as `{ token, user }`, and a feed response shaped as `{ articles: [] }`.

## Frontend demo mode

If the backend is offline, login and registration automatically create a local demo session when the request cannot connect. Use any valid email and password, then visit the available screens. The feed uses sample articles until `/api/news/feed` is available.

## Included

- React Router v6 public/protected routes
- Auth context with persisted JWT session
- Shared saved-article context with local persistence
- Axios request interceptor for Bearer tokens
- React Query feed polling every five minutes
- Responsive feed, saved archive, preferences, profile, and article detail modal
- React Query infinite pagination with a five-minute background refresh
- Retro letterpress ink-and-woodblock visual system implemented with Tailwind CSS
