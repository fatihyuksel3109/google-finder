// types/places.ts
export interface Place {
  name: string;
  rating?: number;
  vicinity: string;
  price_level?: number;
  place_id: string;
  user_ratings_total?: number;
}  
  export interface SearchParams {
    city: string;
    category: string;
  }
  
  export interface SearchResponse {
    results: Place[];
    error?: string;
  }