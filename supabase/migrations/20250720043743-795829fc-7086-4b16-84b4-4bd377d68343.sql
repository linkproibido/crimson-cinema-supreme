-- Create movies table
CREATE TABLE public.movies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  poster_url TEXT NOT NULL,
  embed_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view movies)
CREATE POLICY "Anyone can view movies" 
ON public.movies 
FOR SELECT 
USING (true);

-- Create policy for admin insert/update/delete (authenticated users can manage)
CREATE POLICY "Authenticated users can insert movies" 
ON public.movies 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update movies" 
ON public.movies 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete movies" 
ON public.movies 
FOR DELETE 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_movies_updated_at
  BEFORE UPDATE ON public.movies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample movies
INSERT INTO public.movies (title, description, poster_url, embed_url) VALUES
('Matrix', 'Um filme revolucionário sobre realidade virtual e controle mental. Neo descobre que o mundo que conhece é apenas uma simulação.', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop', 'https://www.youtube.com/embed/vKQi3bBA1y8'),
('Senhor dos Anéis', 'Uma épica jornada pela Terra Média, onde um hobbit deve destruir um anel poderoso para salvar o mundo.', 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop', 'https://www.youtube.com/embed/V75dMMIW2B4'),
('Pulp Fiction', 'Histórias entrelaçadas de crime e redenção na Los Angeles dos anos 90, dirigido por Quentin Tarantino.', 'https://images.unsplash.com/photo-1489599856927-85ddc34b7304?w=400&h=600&fit=crop', 'https://www.youtube.com/embed/s7EdQ4FqbhY'),
('O Poderoso Chefão', 'A saga da família Corleone e sua ascensão no mundo do crime organizado americano.', 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop', 'https://www.youtube.com/embed/UaVTIH8mujA'),
('Cidade de Deus', 'A violenta realidade das favelas cariocas contada através dos olhos de um jovem fotógrafo.', 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop', 'https://www.youtube.com/embed/dcUOO4Itgmw'),
('Interstellar', 'Uma jornada épica através do espaço e tempo em busca de um novo lar para a humanidade.', 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop', 'https://www.youtube.com/embed/zSWdZVtXT7E'),
('Batman: O Cavaleiro das Trevas', 'Batman enfrenta seu maior desafio contra o Coringa em Gotham City.', 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop', 'https://www.youtube.com/embed/EXeTwQWrcwY'),
('Forrest Gump', 'A extraordinária jornada de um homem simples através dos momentos mais importantes da história americana.', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop', 'https://www.youtube.com/embed/bLvqoHBptjg');