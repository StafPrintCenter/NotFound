import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ArrowUpRight, Mail, X } from "lucide-react";
import { useState, useMemo } from "react";

import { useSubdomainDetector } from "@/lib/useSubdomainDetector";
import { platforms, contactMailto } from "@/lib/platformsData";
import { stripProtocol } from "@/lib/domain";
import { Header, Footer, DiagnosticPanel, PlatformCard } from "@/components/pages";

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

function NotFoundPage() {
  const { hostname, subdomain, fullUrl, isStafprintDomain } = useSubdomainDetector();
  const [query, setQuery] = useState("");

  const displayDomain = isStafprintDomain && subdomain ? `${subdomain}.stafprint.com` : hostname;

  const filteredPlatforms = useMemo(() => {
    if (!query.trim()) return platforms;
    const q = query.toLowerCase().trim();
    return platforms.filter((p) => {
      const domain = stripProtocol(p.url).toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        domain.includes(q)
      );
    });
  }, [query]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
      {/* Paper grid background */}
      <div className="pointer-events-none fixed inset-0 paper-grid opacity-[0.35]" aria-hidden="true" />

      {/* Header */}
      <Header />

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
                <DiagnosticPanel
                  hostname={hostname}
                  subdomain={subdomain}
                  fullUrl={fullUrl}
                  isStafprintDomain={isStafprintDomain}
                  query={query}
                  setQuery={setQuery}
                  filteredCount={filteredPlatforms.length}
                  totalCount={platforms.length}
                />
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
      <Footer />
    </div>
  );
}
