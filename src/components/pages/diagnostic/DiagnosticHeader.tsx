import { useState } from "react";
import { Server, Copy, Check } from "lucide-react";

export function DiagnosticHeader({ fullUrl }: { fullUrl: string }) {
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
  );
}