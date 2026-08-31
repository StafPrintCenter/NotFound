import { FormEvent, useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface PlatformSearchProps {
  query: string;
  setQuery: (val: string) => void;
  filteredCount: number;
  totalCount: number;
  isLoading?: boolean;
}

export function PlatformSearch({
  query,
  setQuery,
  filteredCount,
  totalCount,
  isLoading = false,
}: PlatformSearchProps) {
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim().length >= 2 || inputValue.trim().length === 0) {
      setQuery(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue("");
    setQuery("");
  };

  const isButtonDisabled = inputValue.trim().length > 0 && inputValue.trim().length < 2;
  const realTotal = Math.max(totalCount, filteredCount);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            id="platform-search"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Rechercher (ex: docs, meet, arcade...)"
            className="w-full rounded-xl border border-border bg-background px-4 py-2.5 pl-10 pr-9 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-staf-orange/50 focus:outline-none focus:ring-2 focus:ring-staf-orange/20"
            aria-label="Rechercher une plateforme officielle"
          />
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Effacer la recherche"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isButtonDisabled}
          className="shrink-0 rounded-xl bg-staf-orange px-4 py-2.5 font-sans text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Rechercher
        </button>
      </form>

      {isButtonDisabled ? (
        <p className="mt-1.5 font-sans text-xs text-destructive">
          Saisissez au moins 2 caractères pour rechercher.
        </p>
      ) : isLoading ? (
        <div className="mt-1.5 h-3.5 w-28 animate-pulse rounded bg-muted" />
      ) : (
        <p className="mt-1.5 font-sans text-xs text-muted-foreground">
          {filteredCount} plateforme{filteredCount > 1 ? "s" : ""} trouvée
          {filteredCount > 1 ? "s" : ""} sur {realTotal}
        </p>
      )}
    </div>
  );
}