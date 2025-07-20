import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-primary">
            Cinema<span className="text-foreground">Supreme</span>
          </h1>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Início
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Filmes
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Séries
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Categorias
            </a>
          </nav>
        </div>
        
        {/* Search and User */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden sm:flex items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar filmes..."
              className="pl-10 w-80 bg-muted/50 border-border/50 focus:border-primary/50"
            />
          </div>
          
          {/* User Profile */}
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <User className="w-5 h-5" />
          </Button>
          
          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;