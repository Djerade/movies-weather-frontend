export interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface Weather {
  id: string;
  city: string;
  country: string;
  temperature: number;
  description: string;
  humidity: number;
  wind_speed: number;
  icon: string;
}
