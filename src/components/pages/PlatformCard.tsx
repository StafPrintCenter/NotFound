import { ArrowUpRight } from "lucide-react";
import logos from "@/assets/logos.json";
import { stripProtocol } from "@/lib/domain";
import type { Platform } from "@/lib/platformsData";

export function PlatformCard({ platform }: { platform: Platform }) {
  const logoUrl = logos[platform.logoKey];
  const domainDisplay = stripProtocol(platform.url);

  return (
    <a
      href={platform.url}
      target={platform.isExternal ? "_blank" : undefined}
      rel={platform.isExternal ? "noopener noreferrer" : undefined}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-staf-orange/60 hover:bg-card/90 hover:shadow-[0_0_40px_-12px_var(--color-staf-orange)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-staf-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/40 bg-background/50 p-1.5 shadow-xs">
          <img
            src={logoUrl}
            alt={`${platform.name} logo`}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="rounded-full border border-border/80 bg-background p-1.5 opacity-60 transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>

      <h2 className="font-display text-lg font-bold text-card-foreground sm:text-xl">
        {platform.name}
      </h2>

      {/* flex-1 pousse le footer au bas de la carte de manière égale */}
      <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-muted-foreground">
        {platform.description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="rounded-full bg-staf-orange/10 px-2.5 py-1 font-mono text-xs font-medium text-staf-orange-deep">
          {domainDisplay}
        </span>
      </div>
    </a>
  );
}