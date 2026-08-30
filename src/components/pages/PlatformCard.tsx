import { ArrowUpRight, CheckCircle2, Construction } from "lucide-react";
import { stripProtocol } from "@/lib/domain";
import type { APIEcosystemSite } from "@/data/ecosystem";

export function PlatformCard({ platform }: { platform: APIEcosystemSite }) {
  const logoSrc = platform.logoUrl || platform.logoVariants?.mc;
  const domainDisplay = stripProtocol(platform.url);
  const isBuilding = platform.status === "building";

  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-staf-orange/40 hover:bg-card/95 hover:shadow-lg hover:shadow-staf-orange/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-staf-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/40 bg-background/50 p-1.5 shadow-xs transition-colors duration-500 group-hover:border-staf-orange/20">
          <img
            src={logoSrc}
            alt={`${platform.name} logo`}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex items-center gap-2">
          {isBuilding ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              <Construction className="h-3 w-3" /> En construction
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3 w-3" /> Disponible
            </span>
          )}

          <div className="rounded-full border border-border/80 bg-background p-1.5 opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:border-staf-orange/30">
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-staf-orange" />
          </div>
        </div>
      </div>

      <h2 className="font-display text-lg font-bold text-card-foreground transition-colors duration-500 group-hover:text-staf-orange-deep sm:text-xl">
        {platform.name}
      </h2>

      <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-muted-foreground">
        {platform.description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="rounded-full bg-staf-orange/10 px-2.5 py-1 font-mono text-xs font-medium text-staf-orange-deep transition-colors duration-500 group-hover:bg-staf-orange/15">
          {domainDisplay}
        </span>
      </div>
    </a>
  );
}