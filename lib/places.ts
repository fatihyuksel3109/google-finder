// lib/places.ts
import { SearchParams, SearchResponse } from '@/types/places';

export async function searchPlaces({ city, category }: SearchParams): Promise<SearchResponse> {
  try {
    // Validate inputs
    if (!city.trim() || !category.trim()) {
      return {
        results: [],
        error: 'City and category are required'
      };
    }

    // First, geocode the city
    const geocodeUrl = new URL('https://maps.googleapis.com/maps/api/geocode/json');
    geocodeUrl.searchParams.append('address', city);
    geocodeUrl.searchParams.append('key', process.env.GOOGLE_MAPS_API_KEY || '');

    const geocodeRes = await fetch(geocodeUrl.toString(), {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!geocodeRes.ok) {
      throw new Error('Failed to connect to Google Geocoding API');
    }

    const geocodeData = await geocodeRes.json();

    // Handle specific geocoding errors
    if (geocodeData.status === 'ZERO_RESULTS') {
      return {
        results: [],
        error: `Could not find location: ${city}. Please check the spelling and try again.`
      };
    }

    if (geocodeData.status === 'REQUEST_DENIED') {
      console.error('Geocoding API error:', geocodeData.error_message);
      return {
        results: [],
        error: 'Location search is temporarily unavailable. Please try again later.'
      };
    }

    if (geocodeData.status !== 'OK') {
      console.error('Geocoding API error:', geocodeData.status, geocodeData.error_message);
      return {
        results: [],
        error: 'Failed to search location. Please try again later.'
      };
    }

    const { lat, lng } = geocodeData.results[0].geometry.location;

    // Then, search for places
    const placesUrl = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
    placesUrl.searchParams.append('location', `${lat},${lng}`);
    placesUrl.searchParams.append('radius', '5000');
    placesUrl.searchParams.append('type', category);
    placesUrl.searchParams.append('key', process.env.GOOGLE_MAPS_API_KEY || '');

    const placesRes = await fetch(placesUrl.toString(), {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!placesRes.ok) {
      throw new Error('Failed to connect to Google Places API');
    }

    const placesData = await placesRes.json();

    // Handle specific places API errors
    if (placesData.status === 'ZERO_RESULTS') {
      return {
        results: [],
        error: `No ${category}s found in ${city}. Try a different category or location.`
      };
    }

    if (placesData.status === 'REQUEST_DENIED') {
      console.error('Places API error:', placesData.error_message);
      return {
        results: [],
        error: 'Place search is temporarily unavailable. Please try again later.'
      };
    }

    if (placesData.status !== 'OK') {
      console.error('Places API error:', placesData.status, placesData.error_message);
      return {
        results: [],
        error: 'Failed to search places. Please try again later.'
      };
    }

    return {
  results: placesData.results.map((place: any) => ({
    name: place.name,
    rating: place.rating,
    vicinity: place.vicinity,
    price_level: place.price_level,
    place_id: place.place_id,
    user_ratings_total: place.user_ratings_total,
  })),
    };
  } catch (error) {
    console.error('Search places error:', error);
    return {
      results: [],
      error: error instanceof Error ? error.message : 'Failed to fetch places. Please try again.'
    };
  }
}