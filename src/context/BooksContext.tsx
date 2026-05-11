import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import type { Book, ReadingStatus } from '../types';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface BooksContextType {
  books: Book[];
  filteredBooks: Book[];
  filter: ReadingStatus | 'all';
  search: string;
  loading: boolean;
  setFilter: (f: ReadingStatus | 'all') => void;
  setSearch: (s: string) => void;
  addBook: (book: Omit<Book, 'id'>) => Promise<void>;
  updateBook: (id: string, updates: Partial<Book>) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
}

const BooksContext = createContext<BooksContextType | null>(null);

export function BooksProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ReadingStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const fetchBooks = useCallback(async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) console.error('Error fetching books:', error);
    if (data) setBooks(data.map(mapFromDb));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!user) { setBooks([]); setLoading(false); return; }
    fetchBooks(user.id);
  }, [user?.id]);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchStatus = filter === 'all' || book.status === filter;
      const matchSearch = book.title.toLowerCase().includes(search.toLowerCase())
        || book.author.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [books, filter, search]);

  const addBook = async (book: Omit<Book, 'id'>) => {
    if (!user) throw new Error('No hay sesión activa');
    const { error } = await supabase
      .from('books')
      .insert([mapToDb(book, user.id)]);
    if (error) throw error;
    // Re-fetch desde Supabase para evitar duplicados en el estado local
    await fetchBooks(user.id);
  };

  const updateBook = async (id: string, updates: Partial<Book>) => {
    if (!user) throw new Error('No hay sesión activa');
    const { data, error } = await supabase
      .from('books')
      .update(mapToDb(updates as Book, user.id))
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    setBooks(prev => prev.map(b => b.id === id ? mapFromDb(data) : b));
  };

  const deleteBook = async (id: string) => {
    if (!user) throw new Error('No hay sesión activa');
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);   // seguridad extra: solo borra tus propios libros
    if (error) throw error;
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <BooksContext.Provider value={{
      books, filteredBooks, filter, search, loading,
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

// Convierte snake_case de Supabase a camelCase del frontend
function mapFromDb(row: any): Book {
  return {
    id:         row.id,
    title:      row.title,
    author:     row.author,
    coverUrl:   row.cover_url ?? '',
    totalPages: row.total_pages,
    pagesRead: row.pages_read ?? 0,
    genre:      row.genre ?? '',
    rating:     row.rating ?? 0,
    status:     row.status,
    startDate:  row.start_date ?? '',
    finishDate: row.finish_date ?? undefined,
    notes:      row.notes ?? undefined,
  };
}

// Convierte camelCase del frontend a snake_case de Supabase
function mapToDb(book: Partial<Book>, userId: string) {
  return {
    user_id:     userId,
    title:       book.title,
    author:      book.author,
    cover_url:   book.coverUrl,
    total_pages: book.totalPages,
    pages_read: book.pagesRead,
    genre:       book.genre,
    rating:      book.rating || null,
    status:      book.status,
    start_date:  book.startDate || null,
    finish_date: book.finishDate || null,
    notes:       book.notes || null,
  };
  
}
