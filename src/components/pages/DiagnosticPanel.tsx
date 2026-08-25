import { SITE } from "@/data/site";
import {
  PlatformSearch,
  DiagnosticHeader,
  DiagnosticRow, LocationRow, LocalTime,
  DiagnosticTip
} from "./diagnostic";

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
  return (
    <div className="space-y-5">
      <PlatformSearch
        query={query}
        setQuery={setQuery}
        filteredCount={filteredCount}
        totalCount={totalCount}
      />

      <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
        <DiagnosticHeader fullUrl={fullUrl} />

        <div className="space-y-3 font-mono text-xs">
          <DiagnosticRow label="Hôte détecté" value={hostname} />
          <DiagnosticRow
            label="Sous-domaine"
            value={subdomain ?? "Aucun (apex)"}
            highlight={Boolean(subdomain)}
          />
          <DiagnosticRow label="URL complète" value={fullUrl} />
          {/* <DiagnosticRow label={`Domaine ${SITE.name}`} value={isStafprintDomain ? "Oui" : "Non"} /> */}
          <DiagnosticRow label={`Domaine ${SITE.name}`} value={"Non"} />

          <LocationRow />
          <LocalTime />
        </div>
      </div>

      <DiagnosticTip />
    </div>
  );
}