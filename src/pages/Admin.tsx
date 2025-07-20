import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { useMovies } from '@/hooks/useMovies';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, LogOut } from 'lucide-react';
import { Movie } from '@/types/movie';

interface MovieFormData {
  title: string;
  description: string;
  poster_url: string;
  embed_url: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { movies, loading, addMovie, deleteMovie, refetch } = useMovies();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<MovieFormData>();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session?.user) {
        navigate('/auth');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const onSubmit = async (data: MovieFormData) => {
    try {
      await addMovie(data);
      reset();
      toast({
        title: "Filme adicionado!",
        description: "O filme foi adicionado com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o filme.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja deletar "${title}"?`)) {
      try {
        await deleteMovie(id);
        toast({
          title: "Filme removido!",
          description: "O filme foi removido com sucesso."
        });
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível remover o filme.",
          variant: "destructive"
        });
      }
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-accent">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Admin - Crimson Cinema</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário de Adicionar Filme */}
          <Card className="bg-card border-accent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Plus className="w-5 h-5" />
                Adicionar Novo Filme
              </CardTitle>
              <CardDescription>
                Preencha os dados do filme para adicioná-lo ao catálogo
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    {...register('title', { required: 'Título é obrigatório' })}
                    placeholder="Nome do filme"
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    {...register('description')}
                    placeholder="Sinopse do filme"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="poster_url">URL da Capa</Label>
                  <Input
                    {...register('poster_url', { required: 'URL da capa é obrigatória' })}
                    placeholder="https://exemplo.com/capa.jpg"
                  />
                  {errors.poster_url && (
                    <p className="text-sm text-destructive">{errors.poster_url.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="embed_url">URL Embed do Vídeo</Label>
                  <Input
                    {...register('embed_url', { required: 'URL do vídeo é obrigatória' })}
                    placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  />
                  {errors.embed_url && (
                    <p className="text-sm text-destructive">{errors.embed_url.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Filme
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Lista de Filmes */}
          <Card className="bg-card border-accent">
            <CardHeader>
              <CardTitle className="text-primary">Filmes Cadastrados</CardTitle>
              <CardDescription>
                {movies.length} filme(s) no catálogo
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Carregando filmes...</p>
              ) : movies.length === 0 ? (
                <p className="text-muted-foreground">Nenhum filme cadastrado ainda.</p>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {movies.map((movie) => (
                    <div key={movie.id} className="flex items-center gap-4 p-4 bg-background rounded-lg border border-accent">
                      <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{movie.title}</h3>
                        {movie.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {movie.description}
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={() => handleDelete(movie.id, movie.title)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;