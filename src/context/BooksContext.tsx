import { createContext, useContext, useState, useMemo } from 'react';
import type { Book, ReadingStatus } from '../types';
import { mockBooks } from '../data/mockBooks';

interface BooksContextType {
  books: Book[];
  filteredBooks: Book[];
  filter: ReadingStatus | 'all';
  search: string;
  setFilter: (f: ReadingStatus | 'all') => void;
  setSearch: (s: string) => void;
  addBook: (book: Book) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
}

const BooksContext = createContext<BooksContextType | null>(null);

export function BooksProvider({ children }: { children: React.ReactNode }) {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [filter, setFilter] = useState<ReadingStatus | 'all'>('all');
  const [search, setSearch] = useState('');

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

  return (
    <BooksContext.Provider value={{
      books, filteredBooks, filter, search,
      setFilter, setSearch, addBook, updateBook, deleteBook
    }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const ctx = useContext(BooksContext);
  if (!ctx) throw new Error('useBooks must be used within BooksProvider');
  return ctx;
}