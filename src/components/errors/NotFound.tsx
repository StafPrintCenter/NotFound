import { Link, useNavigate } from "@tanstack/react-router";
import { Home, ArrowLeft, SearchX, Globe, Compass } from "lucide-react";
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
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-6 md:p-12 font-sans select-none">
      {/* Top Header Minimalist */}
      <header className="flex items-center justify-between border-b border-border/40 pb-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-staf-orange animate-ping" />
          <span className="font-display font-bold text-sm tracking-tight">{SITE.name}</span>
        </div>
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          ERR_404_NOT_FOUND
        </span>
      </header>

      {/* Hero Central Bento Grid */}
      <main className="max-w-6xl mx-auto w-full py-12 my-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

          {/* Bloc 1: Le grand chiffre 404 */}
          <div className="md:col-span-7 rounded-3xl bg-muted/30 border border-border/60 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group">
            <Compass className="absolute -right-10 -bottom-10 h-64 w-64 text-muted-foreground/5 transition-transform duration-700 group-hover:rotate-45" />

            <div className="space-y-4 relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-staf-orange/30 bg-staf-orange/10 px-3.5 py-1 font-mono text-xs font-semibold text-staf-orange">
                <SearchX className="h-3.5 w-3.5" />
                Ressource introuvable
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-black tracking-tight leading-none text-foreground">
                Hors radar.
              </h1>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
                L'adresse renseignée ne pointe vers aucun service ou module actif de l'écosystème <strong className="text-foreground">{SITE.name}</strong>.
              </p>
            </div>

            <div className="pt-8 flex flex-wrap gap-4 relative z-10">
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 rounded-2xl bg-foreground px-6 py-3.5 font-sans text-sm font-semibold text-background transition-transform active:scale-95 shadow-md"
              >
                <Home className="h-4 w-4" />
                Retour au Hub
              </Link>
              <button
                type="button"
                onClick={handleGoBack}
                className="inline-flex items-center gap-2.5 rounded-2xl border border-border bg-card px-6 py-3.5 font-sans text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-95 shadow-xs cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                Étape précédente
              </button>
            </div>
          </div>

          {/* Bloc 2: Statut de la requête */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex-1 rounded-3xl border border-border/60 bg-card p-6 md:p-8 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">REQUÊTE CLIENT</span>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="my-6 space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-muted-foreground">Statut</span>
                  <span className="font-bold text-destructive">404 (Introuvable)</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-muted-foreground">Sous-domaine</span>
                  <span className="text-foreground truncate max-w-[150px]">
                    {typeof window !== "undefined" ? window.location.hostname : "Inconnu"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Protocole</span>
                  <span className="text-foreground">HTTPS / Secure</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Vérifiez si l'URL contient une faute de frappe ou naviguez via les liens officiels.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Minimalist */}
      <footer className="max-w-6xl mx-auto w-full pt-6 border-t border-border/40 text-center md:text-left text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {SITE.name}. Plateformes & Infrastructures Réseau.
      </footer>
    </div>
  );
}