// Representa un libro en la biblioteca del usuario
export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  totalPages: number;
  genre: string;
  rating: number;        // 1 a 5
  status: ReadingStatus;
  startDate: string;     // ISO 8601: '2024-01-15'
  finishDate?: string;   // Opcional, solo si terminó
  notes?: string;
}

// Los 3 estados posibles de un libro
export type ReadingStatus = 'reading' | 'completed' | 'want-to-read';

// Una sesión de lectura registrada por el usuario
export interface ReadingSession {
  id: string;
  bookId: string;
  date: string;          // '2024-03-15'
  pagesRead: number;
  notes?: string;
}

// Lo que devuelve Google Books API (simplificado)
export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    pageCount?: number;
    imageLinks?: { thumbnail: string };
    categories?: string[];
  };
}

// Estadísticas calculadas para el dashboard
export interface ReadingStats {
  totalBooks: number;
  booksThisYear: number;
  totalPages: number;
  avgPagesPerDay: number;
  currentStreak: number;   // Días seguidos leyendo
  longestStreak: number;
  favoriteGenre: string;
}
