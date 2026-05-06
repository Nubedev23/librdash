import type { GoogleBook } from '../types';

const BASE_URL = 'https://www.googleapis.com/books/v1';

export async function searchBooks(query: string): Promise<GoogleBook[]> {
  if (!query.trim()) return [];

  const url = `${BASE_URL}/volumes?q=${encodeURIComponent(query)}&maxResults=12`;
  const res = await fetch(url);

  if (!res.ok) throw new Error('Error al buscar libros');

  const data = await res.json();
  return data.items || [];
}

// Convierte un GoogleBook al formato interno de la app
export function mapGoogleBook(gb: GoogleBook, status = 'want-to-read') {
  return {
    id: gb.id,
    title: gb.volumeInfo.title,
    author: gb.volumeInfo.authors?.[0] || 'Desconocido',
    coverUrl: gb.volumeInfo.imageLinks?.thumbnail || '',
    totalPages: gb.volumeInfo.pageCount || 0,
    genre: gb.volumeInfo.categories?.[0] || 'General',
    rating: 0,
    status,
    startDate: new Date().toISOString().split('T')[0],
  };
}
