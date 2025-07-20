export interface Movie {
  id: string;
  title: string;
  description: string | null;
  poster_url: string;
  embed_url: string;
  created_at: string;
  updated_at: string;
}