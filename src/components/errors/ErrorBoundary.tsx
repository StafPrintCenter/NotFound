import { useRouter, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { AlertOctagon, RefreshCw, LayoutGrid, Terminal, ShieldAlert } from "lucide-react";
import { reportError } from "@/lib/error/reporting";
import { SITE } from "@/data/site";

export function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportError(error, { boundary: "stafprint_root_error_boundary" });
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6 py-12 overflow-hidden select-none">
      {/* Effet visuel d'erreur critique en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-destructive/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full">
        <div className="rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl p-8 md:p-10 shadow-2xl">

          {/* En-tête de l'erreur */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-destructive/15 text-destructive ring-8 ring-destructive/5">
              <AlertOctagon className="h-6 w-6" strokeWidth={2} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-destructive font-bold bg-destructive/10 px-2 py-0.5 rounded-md">
                  Runtime Exception
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground font-display">
                Interruption de service
              </h1>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Une erreur inattendue a bloqué le composant de l'application {SITE.name}.
              </p>
            </div>
          </div>

          {/* Console des détails techniques */}
          <div className="my-6 rounded-2xl bg-black/90 p-4 border border-slate-800 font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between text-slate-400 mb-2 pb-2 border-b border-slate-800/80 font-sans">
              <div className="flex items-center gap-2 text-xs font-semibold">
                <Terminal className="h-3.5 w-3.5 text-destructive" />
                <span className="text-slate-200">Stack Trace / Context</span>
              </div>
              <span className="text-[10px] text-slate-500">System Log</span>
            </div>
            <p className="font-semibold text-rose-400 mb-1">{error?.name || "UnhandledError"}</p>
            <div className="max-h-36 overflow-y-auto text-slate-300 whitespace-pre-wrap leading-relaxed pr-1 custom-scrollbar">
              {error?.message || "Aucun message d'erreur explicite fourni par le composant."}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={() => {
                router.invalidate();
                reset();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Réinitialiser l'application
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card/60 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted active:scale-95"
            >
              <LayoutGrid className="h-4 w-4" />
              Hub principal
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}