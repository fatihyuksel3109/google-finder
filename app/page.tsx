// app/page.tsx
'use client';

import { useState } from 'react';
import { SearchForm } from '@/components/restaurant-finder/search-form';
import { ResultsList } from '@/components/restaurant-finder/results-list';
import { SortOptions } from '@/components/restaurant-finder/sort-options';
import { SearchParams, Place } from '@/types/places';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Home() {
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [sortOption, setSortOption] = useState('rating-desc');

  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `/api/places?city=${encodeURIComponent(params.city)}&category=${encodeURIComponent(
          params.category
        )}`
      );
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setResults([]);
      } else {
        // Sort results initially
        const sortedResults = sortResults(data.results, sortOption);
        setResults(sortedResults);
      }
    } catch (err) {
      setError('Failed to fetch results. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const sortResults = (results: Place[], sortBy: string) => {
    const sortedResults = [...results];
    
    switch (sortBy) {
      case 'rating-desc':
        return sortedResults.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'rating-asc':
        return sortedResults.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      case 'reviews-desc':
        return sortedResults.sort((a, b) => (b.user_ratings_total || 0) - (a.user_ratings_total || 0));
      case 'reviews-asc':
        return sortedResults.sort((a, b) => (a.user_ratings_total || 0) - (b.user_ratings_total || 0));
      default:
        return sortedResults;
    }
  };

  const handleSort = (value: string) => {
    setSortOption(value);
    setResults(sortResults(results, value));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Find Restaurants & Cafes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <SearchForm onSearch={handleSearch} loading={loading} />
          
          {results.length > 0 && (
            <div className="flex justify-end">
              <SortOptions onSort={handleSort} />
            </div>
          )}
          
          {error && (
            <div className="p-4 text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <ResultsList results={results} />
        </CardContent>
      </Card>
    </main>
  );
}