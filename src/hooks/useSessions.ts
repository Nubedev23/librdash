// src/hooks/useSessions.ts
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ReadingSession } from '../types';

export function useSessions() {
  const [sessions, setSessions] = useState<ReadingSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('reading_sessions')
      .select('*')
      .order('date', { ascending: false })
      .then(({ data }) => {
        if (data) setSessions(data.map(s => ({
          id: s.id,
          bookId: s.book_id,
          date: s.date,
          pagesRead: s.pages_read,
          notes: s.notes,
        })));
        setLoading(false);
      });
  }, []);

  const addSession = async (session: Omit<ReadingSession, 'id'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data } = await supabase
      .from('reading_sessions')
      .insert({
        book_id: session.bookId,
        date: session.date,
        pages_read: session.pagesRead,
        notes: session.notes,
        user_id: user?.id,
      })
      .select()
      .single();

    if (data) setSessions(prev => [{ ...session, id: data.id }, ...prev]);
  };

  return { sessions, loading, addSession };
}