import { useState, useMemo } from 'react';
import type { Book, ReadingStatus } from '../types';
import { mockBooks } from '../data/mockBooks';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [filter, setFilter] = useState<ReadingStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  // useMemo evita recalcular en cada render
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchStatus = filter === 'all' || book.status === filter;
      const matchSearch = book.title.toLowerCase().includes(search.toLowerCase())
        || book.author.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [books, filter, search]);

  const addBook = (book: Book) => setBooks(prev => [...prev, book]);

  const updateBook = (id: string, updates: Partial<Book>) =>
    setBooks(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b));

  const deleteBook = (id: string) =>
    setBooks(prev => prev.filter(b => b.id !== id));

  return { books, filteredBooks, filter, search,
           setFilter, setSearch, addBook, updateBook, deleteBook };
}
