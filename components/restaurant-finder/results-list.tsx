import { Place } from '@/types/places';
import { RestaurantCard } from './restaurant-card';

interface ResultsListProps {
  results: Place[];
}

export function ResultsList({ results }: ResultsListProps) {
  if (results.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No results found. Try a different search.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((place) => (
        <RestaurantCard key={place.place_id} place={place} />
      ))}
    </div>
  );
}