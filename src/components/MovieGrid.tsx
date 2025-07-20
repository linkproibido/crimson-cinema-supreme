import { useState } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import { useMovies } from "@/hooks/useMovies";
import { Movie } from "@/types/movie";

interface MovieGridProps {
  title: string;
}

const MovieGrid = ({ title }: MovieGridProps) => {
  const { movies, loading } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlay = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {title}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-muted aspect-[2/3] rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            {title}
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                year={new Date(movie.created_at).getFullYear().toString()}
                genre="Filme"
                rating={0}
                poster={movie.poster_url}
                onPlay={() => handlePlay(movie)}
              />
            ))}
          </div>
          
          {movies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum filme disponível no momento.
              </p>
            </div>
          )}
        </div>
      </section>

      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default MovieGrid;