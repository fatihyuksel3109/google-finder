import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchParams } from '@/types/places';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  loading: boolean;
}

export function SearchForm({ onSearch, loading }: SearchFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSearch({
      city: formData.get('city') as string,
      category: formData.get('category') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          name="city"
          placeholder="Enter City"
          required
          className="flex-1"
        />
        <Input
          name="category"
          placeholder="Enter Category"
          required
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? (
            'Searching...'
          ) : (
            <div className="flex items-center gap-2">
              <Search size={20} />
              <span>Search</span>
            </div>
          )}
        </Button>
      </div>
    </form>
  );
}