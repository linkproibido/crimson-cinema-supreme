import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Movie } from '@/types/movie';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
        return;
      }

      setMovies(data || []);
    } catch (err) {
      setError('Erro ao carregar filmes');
    } finally {
      setLoading(false);
    }
  };

  const addMovie = async (movieData: Omit<Movie, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('movies')
        .insert([movieData])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      await fetchMovies(); // Refresh the list
      return data;
    } catch (err) {
      throw new Error('Erro ao adicionar filme');
    }
  };

  const deleteMovie = async (id: string) => {
    try {
      const { error } = await supabase
        .from('movies')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      await fetchMovies(); // Refresh the list
    } catch (err) {
      throw new Error('Erro ao deletar filme');
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return {
    movies,
    loading,
    error,
    addMovie,
    deleteMovie,
    refetch: fetchMovies
  };
};