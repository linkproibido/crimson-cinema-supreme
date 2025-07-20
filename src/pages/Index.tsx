import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <MovieGrid title="Filmes em Destaque" />
        <MovieGrid title="Mais Assistidos" />
      </main>
    </div>
  );
};

export default Index;
