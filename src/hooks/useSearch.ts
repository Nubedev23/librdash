import { useState, useCallback } from 'react';
import type { GoogleBook } from '../types';
import { searchBooks } from '../lib/api';

export function useSearch() {
  const [results, setResults] = useState<GoogleBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchBooks(query);
      setResults(data);
    } catch (err) {
      setError('No se pudieron cargar los resultados');
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search };
}
