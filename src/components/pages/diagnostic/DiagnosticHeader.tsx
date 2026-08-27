import { useState } from "react";
import { Server, Copy, Check, Download } from "lucide-react";

export interface DiagnosticData {
  hostname: string;
  subdomain: string | null;
  fullUrl: string;
  isStafprintDomain: boolean;
  region: string;
  timeString: string;
  timeZoneOffset: string;
}

interface DiagnosticHeaderProps {
  data: DiagnosticData;
  siteName: string;
}

export function DiagnosticHeader({ data, siteName }: DiagnosticHeaderProps) {
  const [copied, setCopied] = useState(false);

  const generateReportText = () => {
    return [
      `=== Rapport de Diagnostic ${siteName} ===`,
      `Date/Heure : ${data.timeString || "Non disponible"} ${data.timeZoneOffset ? `(${data.timeZoneOffset})` : ""}`,
      `Hôte détecté : ${data.hostname}`,
      `Sous-domaine : ${data.subdomain ?? "Aucun (apex)"}`,
      `URL complète : ${data.fullUrl}`,
      `Domaine ${siteName} : ${data.isStafprintDomain ? "Oui" : "Non"}`,
      `Région estimée : ${data.region}`,
      `===========================================`,
    ].join("\n");
  };

  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(generateReportText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  const handleDownloadReport = () => {
    const reportText = generateReportText();
    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `spc-notfound-diagnostic-${data.hostname || "report"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2 font-display text-sm font-semibold text-card-foreground">
        <Server className="h-4 w-4 shrink-0 text-staf-coral" />
        <span className="truncate">Diagnostic de la requête</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopyReport}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 font-sans text-xs font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-staf-orange cursor-pointer"
          aria-label="Copier le rapport complet"
          title="Copier le rapport complet"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              Copié
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copier le rapport
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDownloadReport}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5 font-sans text-xs font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-staf-orange cursor-pointer"
          aria-label="Télécharger le rapport"
          title="Télécharger le rapport (.txt)"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Télécharger</span>
        </button>
      </div>
    </div>
  );
}