import { useMemo } from 'react';
import type { Book, ReadingSession, ReadingStats } from '../types';
import { format, getYear } from 'date-fns';

export function useStats(books: Book[], sessions: ReadingSession[]) {
  return useMemo((): ReadingStats => {
    const currentYear = getYear(new Date());
    const completed = books.filter(b => b.status === 'completed');

    const booksThisYear = completed.filter(b =>
      b.finishDate && getYear(new Date(b.finishDate)) === currentYear
    ).length;

    const totalPages = sessions.reduce((acc, s) => acc + s.pagesRead, 0);

    const genres = completed.map(b => b.genre);
    const genreCount = genres.reduce((acc, g) => {
      acc[g] = (acc[g] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const favoriteGenre = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
      totalBooks: completed.length,
      booksThisYear,
      totalPages,
      avgPagesPerDay: Math.round(totalPages / 365),
      currentStreak: 0,  
      longestStreak: 0,  
      favoriteGenre,
    };
  }, [books, sessions]);
}
