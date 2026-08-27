import { Mail } from "lucide-react";
import { SITE } from "@/data/site";
import { getContactMailto } from "@/lib/platformsData";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/60 bg-background/80 px-4 py-8 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        <p className="text-center font-sans text-sm text-muted-foreground sm:text-left">
          © {new Date().getFullYear()} {SITE.name} - {SITE.slogan}.
        </p>

        <a
          href={getContactMailto()}
          className="group inline-flex items-center justify-center gap-2 justify-self-center rounded-full border border-staf-orange/30 bg-background px-5 py-2.5 font-sans text-sm font-medium text-staf-orange-deep transition-all hover:bg-staf-orange/10 hover:shadow-staf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-staf sm:justify-self-end"
        >
          <Mail className="h-4 w-4 transition-transform group-hover:-rotate-12" />
          Signaler un problème
        </a>
      </div>
    </footer>
  );
}