import { Link, useNavigate } from "@tanstack/react-router";
import { Home, ArrowLeft, Network, AlertTriangle, ExternalLink } from "lucide-react";
import { SITE } from "@/data/site";

export function NotFoundComponent() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 2) {
      window.history.back();
    } else {
      navigate({ to: "/" });
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-6 md:p-12 select-none overflow-hidden">
      {/* Halos lumineux d'arrière-plan */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-destructive/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 grid w-full max-w-4xl gap-8 items-center md:grid-cols-12 md:gap-12">

        {/* Colonne Gauche : Diagnostic de Routage Réseau */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-sm rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl p-5 shadow-2xl space-y-4">

            {/* Header style Widget Système */}
            <div className="flex items-center justify-between pb-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <Network className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-xs font-mono font-semibold text-foreground/80 tracking-wide uppercase">
                  {SITE.name} Router
                </span>
              </div>
              <span className="flex h-2 w-2 rounded-full bg-rose-500 ring-4 ring-rose-500/20" />
            </div>

            {/* Terminal de diagnostic */}
            <div className="rounded-2xl bg-black/90 p-4 font-mono text-xs text-slate-300 space-y-2.5 border border-slate-800 shadow-inner">
              <div className="flex items-center gap-2 text-slate-500">
                <span>$</span>
                <span>net.resolveRoute(current_url)</span>
              </div>

              <div className="text-rose-400 font-semibold flex items-center gap-1.5 pt-1">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>404 : HTTP_NODE_NOT_FOUND</span>
              </div>

              <p className="text-slate-400 pl-3 border-l-2 border-rose-500/40 text-[11px] leading-relaxed">
                Le sous-domaine, la ressource ou l'emplacement demandé ne répond pas sur ce nœud.
              </p>

              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/80 font-mono">
                <span>STATUS: DISCONNECTED</span>
                <span className="text-amber-400">PING: TIMEOUT</span>
              </div>
            </div>

            {/* Badge de statut */}
            <div className="flex justify-center">
              <span className="px-3 py-1 text-[11px] font-mono font-bold tracking-wider text-destructive bg-destructive/10 border border-destructive/20 rounded-full uppercase">
                Sous-domaine / Route introuvable
              </span>
            </div>
          </div>
        </div>

        {/* Colonne Droite : Explications & Actions */}
        <div className="md:col-span-7 text-center md:text-left flex flex-col justify-center">
          <div className="inline-flex mx-auto md:mx-0 items-center gap-2 px-3 py-1 text-xs font-mono font-medium text-primary bg-primary/10 border border-primary/20 rounded-full w-fit">
            <span>ERR_404_PAGE_MISSING</span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Destination introuvable.
          </h1>

          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-lg">
            La page ou le service auquel vous tentez d'accéder a été déplacé, renommé ou n'existe pas dans l'écosystème <strong className="text-foreground font-semibold">{SITE.name}</strong>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
            <Link
              to="/"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              <Home className="h-4 w-4" />
              Accueil de l'écosystème
            </Link>

            <button
              onClick={handleGoBack}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-border bg-card/80 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted hover:border-border/80 active:scale-95 cursor-pointer shadow-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Page précédente
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}