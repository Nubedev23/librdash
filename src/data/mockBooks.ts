import type { Book, ReadingSession } from '../types';

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'El Nombre del Viento',
    author: 'Patrick Rothfuss',
    coverUrl: 'https://covers.openlibrary.org/b/id/8741500-M.jpg',
    totalPages: 662,
    genre: 'Fantasy',
    rating: 5,
    status: 'completed',
    startDate: '2024-01-05',
    finishDate: '2024-01-28',
  },
  {
    id: '2',
    title: 'Dune',
    author: 'Frank Herbert',
    coverUrl: 'https://covers.openlibrary.org/b/id/8745234-M.jpg',
    totalPages: 896,
    genre: 'Sci-Fi',
    rating: 5,
    status: 'completed',
    startDate: '2024-02-01',
    finishDate: '2024-02-25',
  },
 
];

// Sesiones de lectura: simula el historial diario
export const mockSessions: ReadingSession[] = [
  { id: 's1', bookId: '1', date: '2026-01-05', pagesRead: 45 },
  { id: 's2', bookId: '1', date: '2026-01-06', pagesRead: 62 },
  { id: 's3', bookId: '1', date: '2026-01-08', pagesRead: 38 },
  { id: 's4', bookId: '1', date: '2026-01-10', pagesRead: 10 },
  { id: 's5', bookId: '1', date: '2026-01-11', pagesRead: 2 },
  { id: 's6', bookId: '1', date: '2026-01-12', pagesRead: 0 },
  { id: 's7', bookId: '1', date: '2026-01-13', pagesRead: 50 },
  { id: 's8', bookId: '1', date: '2026-01-14', pagesRead: 48 },
  { id: 's9', bookId: '1', date: '2026-01-15', pagesRead: 37 },
  { id: 's10', bookId: '2', date: '2026-01-16', pagesRead: 20 },
  { id: 's11', bookId: '2', date: '2026-01-17', pagesRead: 62 },
  { id: 's12', bookId: '1', date: '2026-01-18', pagesRead: 38 },
  { id: 's13', bookId: '1', date: '2026-01-19', pagesRead: 40 },
  { id: 's14', bookId: '1', date: '2026-01-20', pagesRead: 23 },
  { id: 's15', bookId: '1', date: '2026-01-21', pagesRead: 5 },
 
];
