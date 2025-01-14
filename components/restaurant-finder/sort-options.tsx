// components/restaurant-finder/sort-options.tsx
import { Select } from "@/components/ui/select"

interface SortOptionsProps {
  onSort: (value: string) => void;
}

export function SortOptions({ onSort }: SortOptionsProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm font-medium">
        Sort by:
      </label>
      <select
        id="sort"
        onChange={(e) => onSort(e.target.value)}
        className="h-9 w-[200px] rounded-md border border-input bg-background px-3 text-sm"
      >
        <option value="rating-desc">Rating (High to Low)</option>
        <option value="rating-asc">Rating (Low to High)</option>
        <option value="reviews-desc">Most Reviewed</option>
        <option value="reviews-asc">Least Reviewed</option>
      </select>
    </div>
  )
}