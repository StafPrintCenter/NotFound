import { SITE } from "@/data/site";
import {
  PlatformSearch,
  DiagnosticHeader,
  DiagnosticRow,
  LocationRow,
  LocalTime,
  DiagnosticTip,
  useDetectedRegion,
  useLocalTime,
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
  const region = useDetectedRegion();
  const { timeString, timeZoneOffset } = useLocalTime();

  const diagnosticData = {
    hostname,
    subdomain,
    fullUrl,
    isStafprintDomain,
    region,
    timeString,
    timeZoneOffset,
  };

  return (
    <div className="space-y-5">
      <PlatformSearch
        query={query}
        setQuery={setQuery}
        filteredCount={filteredCount}
        totalCount={totalCount}
      />

      <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
        <DiagnosticHeader data={diagnosticData} siteName={SITE.name} />

        <div className="space-y-3 font-mono text-xs">
          <DiagnosticRow label="Hôte détecté" value={hostname} />
          <DiagnosticRow
            label="Sous-domaine"
            value={subdomain ?? "Aucun (apex)"}
            highlight={Boolean(subdomain)}
          />
          <DiagnosticRow label="URL complète" value={fullUrl} />
          <DiagnosticRow label={`Domaine ${SITE.name}`} value={isStafprintDomain ? "Oui" : "Non"} />

          <LocationRow region={region} />
          <LocalTime timeString={timeString} timeZoneOffset={timeZoneOffset} />
        </div>
      </div>

      <DiagnosticTip />
    </div>
  );
}