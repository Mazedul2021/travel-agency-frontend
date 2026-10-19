import { useEffect, useMemo, useState } from 'react';

// Loads a gallery list and returns it newest first.
export function useGalleryItems(fetcher) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetcher().then((data) => {
      if (!alive) return;
      setItems(data);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [fetcher]);

  const sorted = useMemo(
    () => [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [items],
  );

  return { items: sorted, loading };
}
