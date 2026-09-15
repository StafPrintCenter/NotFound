import logo from "@/assets/logos.json";
import { SITE_LINK } from "@/data/site";
import { SpcDeskLogo, SpcMobLogo } from "@/components/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:flex sm:flex-wrap sm:justify-between sm:px-6 lg:px-8">
        <a href={SITE_LINK.landingUrl} className="flex items-center">
          <SpcMobLogo className="h-10 w-auto sm:hidden" />
          <SpcDeskLogo className="hidden h-10 w-auto sm:block md:h-12" />
        </a>

        <div className="shrink-0 flex items-center gap-2 rounded-full border border-staf-coral/30 bg-staf-coral/10 px-3 py-1.5 font-sans text-xs font-medium text-staf-coral sm:text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-staf-coral opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-staf-coral" />
          </span>
          Erreur 404 <span className="hidden sm:block ">- Sous-domaine inexistant</span>
        </div>
      </div>
    </header>
  );
}