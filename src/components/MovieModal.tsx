import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Movie } from "@/types/movie";

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal = ({ movie, isOpen, onClose }: MovieModalProps) => {
  if (!movie) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full bg-background border-accent">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {movie.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Video Player */}
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
            <iframe
              src={movie.embed_url}
              title={movie.title}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
          
          {/* Description */}
          {movie.description && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Descrição</h3>
              <p className="text-muted-foreground leading-relaxed">
                {movie.description}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieModal;