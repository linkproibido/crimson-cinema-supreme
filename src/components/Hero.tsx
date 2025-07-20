import { Button } from "@/components/ui/button";
import { Play, Plus } from "lucide-react";
import heroImage from "@/assets/hero-cinema.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Cinema Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-foreground">
            Cinema
            <span className="block text-primary drop-shadow-crimson-glow">
              Supreme
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Descubra os melhores filmes em alta qualidade. 
            Sua experiência cinematográfica começa aqui.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-crimson hover:shadow-crimson-glow transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Assistir Agora
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary px-8 py-6 text-lg font-semibold transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Minha Lista
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;