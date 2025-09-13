import { gql } from "@apollo/client";

// Auth mutations
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
      city
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup(
    $name: String!
    $email: String!
    $password: String!
    $city: String!
  ) {
    signup(name: $name, email: $email, password: $password, city: $city) {
      id
      email
      name
      city
      token
    }
  }
`;

// User queries
export const GET_USER_QUERY = gql`
  query GetUser {
    getUser {
      id
      email
      name
      city
    }
  }
`;

// Movie queries and mutations
export const SEARCH_MOVIES_QUERY = gql`
  query SearchMovies($query: String!) {
    searchMovies(query: $query) {
      search {
        title
        year
        imdbID
        type
        poster
      }
      totalResults
    }
  }
`;

export const ADD_TO_FAVORITES_MUTATION = gql`
  mutation AddFavoriteMovie($userId: ID!, $imdbId: String!) {
    addFavoriteMovie(userId: $userId, imdbId: $imdbId) {
      id
      name
      favoriteMovies
    }
  }
`;

export const REMOVE_FROM_FAVORITES_MUTATION = gql`
  mutation RemoveFavoriteMovie($userId: ID!, $imdbId: String!) {
    removeFavoriteMovie(userId: $userId, imdbId: $imdbId) {
      id
      name
      favoriteMovies
    }
  }
`;

export const GET_FAVORITES_QUERY = gql`
  query GetFavorites($userId: ID!) {
    getFavoriteMovies(userId: $userId) {
      title
      year
      plot
      poster
      imdbRating
      imdbID
      genre
      director
      actors
    }
  }
`;

// Weather queries
export const GET_WEATHER_QUERY = gql`
  query GetWeather($city: String) {
    weather(city: $city) {
      city
      country
      temperature
      feelsLike
      description
      humidity
      pressure
      windSpeed
      windDirection
      visibility
      uvIndex
      sunrise
      sunset
      icon
    }
  }
`;
