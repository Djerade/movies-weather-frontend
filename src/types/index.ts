import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export interface User {
  id: string;
  email: string;
  name: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}

export interface Movie {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
  plot?: string;
  imdbRating?: string;
  genre?: string;
  director?: string;
  actors?: string;
}

export interface MovieSearchResult {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
}

export interface MovieSearchResponse {
  search: MovieSearchResult[];
  totalResults: string;
}

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  uvIndex: number;
  sunrise: string;
  sunset: string;
  icon: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}
