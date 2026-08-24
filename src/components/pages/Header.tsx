import logo from "@/assets/logos.json";
import { SITE, SITE_LINK } from "@/data/site";

export function Header() {
  return (
    <header className="relative z-10 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:flex sm:flex-wrap sm:justify-between sm:px-6 lg:px-8">
        <a href={SITE_LINK.landingUrl} className="flex items-center">
          <img src={logo.dc} alt="Logo SPC" className="h-10 md:h-12 w-auto" />
        </a>

        <div className="shrink-0 flex items-center gap-2 rounded-full border border-staf-coral/30 bg-staf-coral/10 px-3 py-1.5 font-sans text-xs font-medium text-staf-coral sm:text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-staf-coral opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-staf-coral" />
          </span>
          Erreur 404 — Sous-domaine inexistant
        </div>
      </div>
    </header>
  );
}