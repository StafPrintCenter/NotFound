import { Search, X } from "lucide-react";

interface PlatformSearchProps {
  query: string;
  setQuery: (val: string) => void;
  filteredCount: number;
  totalCount: number;
}

export function PlatformSearch({
  query,
  setQuery,
  filteredCount,
  totalCount,
}: PlatformSearchProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
      <label
        htmlFor="platform-search"
        className="mb-3 flex items-center gap-2 font-display text-sm font-semibold text-card-foreground"
      >
        <Search className="h-4 w-4 text-staf-orange" />
        Trouver une plateforme
      </label>
      <div className="relative">
        <input
          id="platform-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: docs, meet, learn, arcade…"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 pl-10 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-staf-orange/50 focus:outline-none focus:ring-2 focus:ring-staf-orange/20"
          aria-label="Rechercher une plateforme officielle"
        />
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Effacer la recherche"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      <p className="mt-2 font-sans text-xs text-muted-foreground">
        {filteredCount} plateforme{filteredCount > 1 ? "s" : ""} trouvée
        {filteredCount > 1 ? "s" : ""} sur {totalCount}
      </p>
    </div>
  );
}