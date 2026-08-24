import { ArrowUpRight } from "lucide-react";
import logos from "@/assets/logos.json";
import { stripProtocol } from "@/lib/domain";
import type { Platform } from "@/lib/platformsData";

export function PlatformCard({ platform }: { platform: Platform }) {
  const accentClasses = {
    orange: "group-hover:border-staf-orange/60 group-hover:shadow-[0_0_40px_-12px_var(--color-staf-orange)] focus-visible:ring-staf-orange",
    coral: "group-hover:border-staf-coral/60 group-hover:shadow-[0_0_40px_-12px_var(--color-staf-coral)] focus-visible:ring-staf-coral",
    slate: "group-hover:border-staf-slate/60 group-hover:shadow-[0_0_40px_-12px_var(--color-staf-slate)] focus-visible:ring-staf-slate",
  };

  const tagClasses = {
    orange: "bg-staf-orange/10 text-staf-orange-deep",
    coral: "bg-staf-coral/10 text-staf-coral",
    slate: "bg-staf-slate/10 text-staf-slate",
  };

  const logoUrl = logos[platform.logoKey];
  const domainDisplay = stripProtocol(platform.url);

  return (
    <a
      href={platform.url}
      target={platform.isExternal ? "_blank" : undefined}
      rel={platform.isExternal ? "noopener noreferrer" : undefined}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-card/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6 ${accentClasses[platform.accent]}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background/50 p-1.5 shadow-xs border border-border/40">
          <img
            src={logoUrl}
            alt={`${platform.name} logo`}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="rounded-full border border-border/80 bg-background p-1.5 opacity-60 transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      <h2 className="font-display text-lg font-bold text-card-foreground sm:text-xl">{platform.name}</h2>
      <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-muted-foreground">{platform.description}</p>

      <div className="mt-5 flex items-center justify-between">
        <span className={`rounded-full px-2.5 py-1 font-mono text-xs font-medium ${tagClasses[platform.accent]}`}>
          {domainDisplay}
        </span>
      </div>
    </a>
  );
}