  import { Place } from '@/types/places';
  import { Card, CardContent } from '@/components/ui/card';

  interface RestaurantCardProps {
    place: Place;
  }

  export function RestaurantCard({ place }: RestaurantCardProps) {
    const getPriceLevel = (level?: number) => '💰'.repeat(level || 1);

    return (
      <Card>
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold">{place.name}</h3>
          <div className="mt-2 space-y-1 text-gray-600">
            <p className="flex items-center gap-2">
              <span>Rating: ⭐ {place.rating || 'N/A'}</span>
              <span className="text-gray-400">|</span>
              <span>{getPriceLevel(place.price_level)}</span>
            </p>
            <p>Reviews: {place.user_ratings_total?.toLocaleString() || 'No reviews'}</p>
            <p>{place.vicinity}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
