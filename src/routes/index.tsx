import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowUpRight, Mail, Search, HelpCircle, Server, Clock, MapPin, Copy, Check, X } from "lucide-react";
import { useState, useMemo } from "react";

import { useSubdomainDetector } from "@/lib/useSubdomainDetector";
import {
  platforms,
  contactMailto,
} from "@/lib/platformsData";

import { SITE, SITE_LINK } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "404 — Sous-domaine inexistant | STAF PRINT CENTER" },
      {
        name: "description",
        content:
          "Ce sous-domaine de l’écosystème STAF PRINT CENTER n’existe pas. Diagnostiquez la requête et rejoignez directement les plateformes officielles.",
      },
      { property: "og:title", content: "404 — Sous-domaine inexistant | STAF PRINT CENTER" },
      {
        property: "og:description",
        content:
          "Catch-all 404 de l’écosystème STAF PRINT CENTER. Diagnostic en temps réel et redirection rapide vers les plateformes officielles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NotFoundPage,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const panelVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function NotFoundPage() {
  const { hostname, subdomain, fullUrl, isStafprintDomain } = useSubdomainDetector();
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const displayDomain = isStafprintDomain && subdomain ? `${subdomain}.stafprint.com` : hostname;

  const filteredPlatforms = useMemo(() => {
    if (!query.trim()) return platforms;
    const q = query.toLowerCase().trim();
    return platforms.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
    );
  }, [query]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silently ignored
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
      {/* Paper grid background */}
      <div className="pointer-events-none fixed inset-0 paper-grid opacity-[0.35]" aria-hidden="true" />

      {/* Header */}
      <header className="relative z-10 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:flex sm:flex-wrap sm:justify-between sm:px-6 lg:px-8">
          <a
            href="https://stafprint.com"
            className="group flex min-w-0 items-center gap-3 transition-opacity hover:opacity-90"
            aria-label="Retourner sur le site principal de STAF PRINT CENTER"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-staf-orange to-staf-orange-deep font-display text-lg font-bold text-primary-foreground shadow-sm">
              SP
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-display text-base font-bold leading-tight tracking-tight text-foreground">
                STAF PRINT
              </span>
              <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Center
              </span>
            </div>
          </a>

          <div className="shrink-0 flex items-center gap-2 rounded-full border border-staf-coral/30 bg-staf-coral/10 px-3 py-1.5 font-sans text-xs font-medium text-staf-coral sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-staf-coral opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-staf-coral" />
            </span>
            Erreur 404 — Sous-domaine inexistantzz
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-1 flex-col">
        <section className="px-4 pb-8 pt-12 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Left column — message */}
              <motion.div
                className="flex flex-col justify-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="mb-6 inline-flex items-center justify-center lg:justify-start">
                  <div className="relative flex h-28 w-28 items-center justify-center sm:h-36 sm:w-36">
                    <div className="absolute inset-0 rounded-full bg-linear-to-tr from-staf-orange/20 to-staf-coral/20 blur-2xl" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-staf-coral/20 bg-background shadow-xl sm:h-32 sm:w-32">
                      <span className="font-display text-5xl font-bold text-staf-coral sm:text-6xl">404</span>
                    </div>
                  </div>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="mb-4 inline-flex items-center justify-center gap-2 self-start rounded-full border border-staf-orange/20 bg-staf-orange/10 px-4 py-1.5 font-mono text-sm text-staf-orange-deep lg:justify-start"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span className="truncate">https://{displayDomain}</span>
                </motion.p>

                <motion.h1
                  variants={itemVariants}
                  className="font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl"
                >
                  Oups ! Ce sous-domaine n’existe pas.
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                >
                  Le sous-domaine que vous tentez de rejoindre est introuvable ou a été déplacé. Utilisez la recherche
                  ou le diagnostic pour trouver votre chemin, puis rejoignez directement l’une des plateformes
                  officielles de STAF PRINT CENTER.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="mt-8 flex flex-wrap items-center gap-3"
                >
                  <a
                    href="https://stafprint.com"
                    className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-staf-orange to-staf-orange-deep px-5 py-3 font-sans text-sm font-semibold text-primary-foreground shadow-lg shadow-staf-orange/20 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-staf-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Aller sur le site principal
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <a
                    href={contactMailto}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-staf-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <Mail className="h-4 w-4" />
                    Signaler le problème
                  </a>
                </motion.div>
              </motion.div>

              {/* Right column — interactive details */}
              <motion.div
                className="flex flex-col justify-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="space-y-5">
                  {/* Search */}
                  <motion.div
                    variants={panelVariants}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
                    <label
                      htmlFor="platform-search"
                      className="mb-3 flex items-center gap-2 font-display text-sm font-semibold text-card-foreground"
                    >
                      <Search className="h-4 w-4 text-staf-orange" />
                      Trouver une plateforme
                    </label>
                    <div className="relative">
                      <input
                        id="platform-search"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ex: docs, meet, learning, arcade…"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 pl-10 font-sans text-sm text-foreground placeholder:text-muted-foreground focus:border-staf-orange/50 focus:outline-none focus:ring-2 focus:ring-staf-orange/20"
                        aria-label="Rechercher une plateforme officielle"
                      />
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      {query && (
                        <button
                          type="button"
                          onClick={() => setQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                          aria-label="Effacer la recherche"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="mt-2 font-sans text-xs text-muted-foreground">
                      {filteredPlatforms.length} plateforme{filteredPlatforms.length > 1 ? "s" : ""} trouvée
                      {filteredPlatforms.length > 1 ? "s" : ""} sur {platforms.length}
                    </p>
                  </motion.div>

                  {/* Diagnostic card */}
                  <motion.div
                    variants={panelVariants}
                    className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                  >
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
                    <div className="space-y-3 font-mono text-xs">
                      <DiagnosticRow label="Hôte détecté" value={hostname} />
                      <DiagnosticRow
                        label="Sous-domaine"
                        value={subdomain ?? "Aucun (apex)"}
                        highlight={Boolean(subdomain)}
                      />
                      <DiagnosticRow label="URL complète" value={fullUrl} />
                      <DiagnosticRow label="Domaine STAF PRINT" value={isStafprintDomain ? "Oui" : "Non"} />
                      <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          Région
                        </span>
                        <span className="text-right text-foreground">Porto-Novo, Bénin</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          Heure locale
                        </span>
                        <LocalTime />
                      </div>
                    </div>
                  </motion.div>

                  {/* Quick tip */}
                  <motion.div
                    variants={panelVariants}
                    className="rounded-2xl border border-staf-orange/20 bg-staf-orange/5 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-staf-orange/10">
                        <HelpCircle className="h-5 w-5 text-staf-orange" />
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-semibold text-foreground">Pourquoi cette page ?</h3>
                        <p className="mt-1 font-sans text-sm leading-relaxed text-muted-foreground">
                          Ce sous-domaine n’est pas reconnu par l’écosystème STAF PRINT. Vérifiez l’orthographe, utilisez
                          la recherche ou sélectionnez une plateforme officielle dans la liste ci-dessous.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Platform hub */}
        <section className="flex-1 px-4 pb-16 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-7xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                Plateformes officielles
              </h2>
              <p className="mt-1 font-sans text-sm text-muted-foreground">
                Choisissez directement la destination adaptée à votre besoin.
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={query}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              >
                {filteredPlatforms.map((platform) => (
                  <motion.div key={platform.id} variants={itemVariants}>
                    <PlatformCard platform={platform} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredPlatforms.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 rounded-2xl border border-dashed border-border bg-card p-8 text-center"
              >
                <p className="font-display text-base font-semibold text-foreground">Aucune plateforme trouvée</p>
                <p className="mt-1 font-sans text-sm text-muted-foreground">
                  Essayez un autre mot-clé ou effacez la recherche pour voir toutes les plateformes.
                </p>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-sans text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                  Effacer la recherche
                </button>
              </motion.div>
            )}
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/60 bg-background/80 px-4 py-8 backdrop-blur-md sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <p className="text-center font-sans text-sm text-muted-foreground sm:text-left">
            © {new Date().getFullYear()} {SITE.name} - {SITE.slogan}.
          </p>

          <a
            href={contactMailto}
            className="group inline-flex items-center justify-center gap-2 justify-self-center rounded-full border border-staf-orange/30 bg-background px-5 py-2.5 font-sans text-sm font-medium text-staf-orange-deep transition-all hover:bg-staf-orange/10 hover:shadow-staf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-staf sm:justify-self-end"
          >
            <Mail className="h-4 w-4 transition-transform group-hover:-rotate-12" />
            Signaler un problème / Contact
          </a>
        </div>
      </footer>
    </div>
  );
}

function DiagnosticRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={`max-w-[60%] truncate text-right ${highlight ? "font-semibold text-staf-coral" : "text-foreground"
          }`}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}

function LocalTime() {
  // Porto-Novo, Bénin — UTC+1 (no DST)
  const now = new Date();
  const beninTime = new Date(now.toLocaleString("en-US", { timeZone: "Africa/Porto-Novo" }));
  const timeString = beninTime.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <span className="text-right tabular-nums text-foreground">
      {timeString} <span className="text-muted-foreground">(UTC+1)</span>
    </span>
  );
}

function PlatformCard({ platform }: { platform: (typeof platforms)[number] }) {
  const accentClasses = {
    orange: "group-hover:border-staf-orange/60 group-hover:shadow-[0_0_40px_-12px_var(--color-staf-orange)] focus-visible:ring-staf-orange",
    coral: "group-hover:border-staf-coral/60 group-hover:shadow-[0_0_40px_-12px_var(--color-staf-coral)] focus-visible:ring-staf-coral",
    slate: "group-hover:border-staf-slate/60 group-hover:shadow-[0_0_40px_-12px_var(--color-staf-slate)] focus-visible:ring-staf-slate",
  };

  const iconClasses = {
    orange: "bg-staf-orange/10 text-staf-orange",
    coral: "bg-staf-coral/10 text-staf-coral",
    slate: "bg-staf-slate/10 text-staf-slate",
  };

  const tagClasses = {
    orange: "bg-staf-orange/10 text-staf-orange-deep",
    coral: "bg-staf-coral/10 text-staf-coral",
    slate: "bg-staf-slate/10 text-staf-slate",
  };

  const Icon = platform.icon;

  return (
    <a
      href={platform.url}
      target={platform.isExternal ? "_blank" : undefined}
      rel={platform.isExternal ? "noopener noreferrer" : undefined}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-card/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-6 ${accentClasses[platform.accent]}`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClasses[platform.accent]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="rounded-full border border-border/80 bg-background p-1.5 opacity-60 transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      <h2 className="font-display text-lg font-bold text-card-foreground sm:text-xl">{platform.name}</h2>
      <p className="mt-2 flex-1 font-sans text-sm leading-relaxed text-muted-foreground">{platform.description}</p>

      <div className="mt-5 flex items-center justify-between">
        <span className={`rounded-full px-2.5 py-1 font-mono text-xs font-medium ${tagClasses[platform.accent]}`}>
          {platform.tag}
        </span>
      </div>
    </a>
  );
}
