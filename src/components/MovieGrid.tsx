import MovieCard from "./MovieCard";

const mockMovies = [
  {
    id: 1,
    title: "O Senhor dos Anéis: A Sociedade do Anel",
    year: "2001",
    genre: "Fantasia",
    rating: 8.8,
    poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop"
  },
  {
    id: 2,
    title: "Matrix",
    year: "1999",
    genre: "Ficção Científica",
    rating: 8.7,
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop"
  },
  {
    id: 3,
    title: "Pulp Fiction",
    year: "1994",
    genre: "Crime",
    rating: 8.9,
    poster: "https://images.unsplash.com/photo-1489599856927-85ddc34b7304?w=400&h=600&fit=crop"
  },
  {
    id: 4,
    title: "O Poderoso Chefão",
    year: "1972",
    genre: "Drama",
    rating: 9.2,
    poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop"
  },
  {
    id: 5,
    title: "Cidade de Deus",
    year: "2002",
    genre: "Drama",
    rating: 8.6,
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop"
  },
  {
    id: 6,
    title: "Interstellar",
    year: "2014",
    genre: "Ficção Científica",
    rating: 8.6,
    poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop"
  },
  {
    id: 7,
    title: "O Cavaleiro das Trevas",
    year: "2008",
    genre: "Ação",
    rating: 9.0,
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop"
  },
  {
    id: 8,
    title: "Forrest Gump",
    year: "1994",
    genre: "Drama",
    rating: 8.8,
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop"
  }
];

interface MovieGridProps {
  title: string;
}

const MovieGrid = ({ title }: MovieGridProps) => {
  const handlePlay = (movieId: number) => {
    console.log(`Playing movie ${movieId}`);
    // Aqui você conectará com o sistema de reprodução
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          {title}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {mockMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              genre={movie.genre}
              rating={movie.rating}
              poster={movie.poster}
              onPlay={() => handlePlay(movie.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieGrid;