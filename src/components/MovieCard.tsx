import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Star } from "lucide-react";

interface MovieCardProps {
  title: string;
  year: string;
  genre: string;
  rating: number;
  poster: string;
  onPlay?: () => void;
}

const MovieCard = ({ title, year, genre, rating, poster, onPlay }: MovieCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-card-gradient border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-crimson hover:scale-105">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img 
          src={poster} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={onPlay}
            className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-4 backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-crimson-glow"
          >
            <Play className="w-6 h-6 ml-1" />
          </button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="text-xs">
            {year}
          </Badge>
          <Badge variant="outline" className="text-xs border-primary/30">
            {genre}
          </Badge>
        </div>
        
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="w-4 h-4 fill-primary text-primary" />
          <span>{rating.toFixed(1)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;