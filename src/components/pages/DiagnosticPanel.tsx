import { useState } from "react";
import { Server, Copy, Check, MapPin, Clock, Search, HelpCircle, X } from "lucide-react";
import { SITE } from "@/data/site";

interface DiagnosticPanelProps {
  hostname: string;
  subdomain: string | null;
  fullUrl: string;
  isStafprintDomain: boolean;
  query: string;
  setQuery: (val: string) => void;
  filteredCount: number;
  totalCount: number;
}

export function DiagnosticPanel({
  hostname,
  subdomain,
  fullUrl,
  isStafprintDomain,
  query,
  setQuery,
  filteredCount,
  totalCount,
}: DiagnosticPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
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

      {/* Diagnostic Card */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2 font-display text-sm font-semibold text-card-foreground">
            <Server className="h-4 w-4 shrink-0 text-staf-coral" />
            <span className="truncate">Diagnostic de la requête</span>
          </div>
          <button
            type="button"
            onClick={handleCopyUrl}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 font-sans text-xs font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-staf-orange"
            aria-label="Copier l’URL complète"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Copié
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copier
              </>
            )}
          </button>
        </div>
        <div className="space-y-3 font-mono text-xs">
          <DiagnosticRow label="Hôte détecté" value={hostname} />
          <DiagnosticRow
            label="Sous-domaine"
            value={subdomain ?? "Aucun (apex)"}
            highlight={Boolean(subdomain)}
          />
          <DiagnosticRow label="URL complète" value={fullUrl} />

          <DiagnosticRow "Non"} "Oui" ${SITE.name}`} : ? label="{`Domaine" value="{isStafprintDomain"/>

<div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3">
  <span className="flex items-center gap-1.5 font-sans text-xs text-muted-foreground">
    Statut de détection
  </span>
  <span className="font-mono text-xs font-semibold text-staf-orange-deep">
    {isStafprintDomain ? "Domaine officiel" : "Domaine externe / local"}
  </span>
</div>


          <DiagnosticRow label="Domaine ${SITE.name}" value={isStafprintDomain ? "Oui" : "Non"} />
          <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              Région
            </span>
            <span className="text-right text-foreground">Porto-Novo, Bénin</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              Heure locale
            </span>
            <LocalTime />
          </div>
        </div>
      </div>

      {/* Quick Tip */}
      <div className="rounded-2xl border border-staf-orange/20 bg-staf-orange/5 p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-staf-orange/10">
            <HelpCircle className="h-5 w-5 text-staf-orange" />
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground">Pourquoi cette page ?</h3>
            <p className="mt-1 font-sans text-sm leading-relaxed text-muted-foreground">
              Ce sous-domaine n’est pas reconnu par l’écosystème ${SITE.name}. Vérifiez l’orthographe, utilisez
              la recherche ou sélectionnez une plateforme officielle ci-dessous.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiagnosticRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`max-w-[60%] truncate text-right ${highlight ? "font-semibold text-staf-coral" : "text-foreground"
          }`}
          title={value}
      >
          {value}
        </span>
      </div>
      );
}

      function LocalTime() {
  const now = new Date();
      const beninTime = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Porto-Novo" }));
      const timeString = beninTime.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
      minute: "2-digit",
  });
      return (
      <span className="text-right tabular-nums text-foreground">
        {timeString} <span className="text-muted-foreground">(UTC+1)</span>
      </span>
      );
}