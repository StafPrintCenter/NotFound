import { motion, type Variants } from "framer-motion";
import { AlertTriangle, ArrowUpRight, Mail } from "lucide-react";
import { SITE, SITE_LINK } from "@/data/site";
import { contactMailto } from "@/lib/platformsData";
import { DiagnosticPanel } from "./DiagnosticPanel";

interface HeroSectionProps {
  displayDomain: string;
  hostname: string;
  subdomain: string | null;
  fullUrl: string;
  isStafprintDomain: boolean;
  query: string;
  setQuery: (q: string) => void;
  filteredCount: number;
  totalCount: number;
  containerVariants: Variants;
  itemVariants: Variants;
}

export function HeroSection({
  displayDomain,
  hostname,
  subdomain,
  fullUrl,
  isStafprintDomain,
  query,
  setQuery,
  filteredCount,
  totalCount,
  containerVariants,
  itemVariants,
}: HeroSectionProps) {
  return (
    <section className="px-4 pb-8 pt-12 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gauche : Titre et actions */}
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
              officielles de ${SITE.name}.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href={SITE_LINK.landingUrl}
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-staf-orange to-staf-orange-deep px-5 py-3 font-sans text-sm font-semibold text-primary-foreground shadow-lg shadow-staf-orange/20 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-staf-orange focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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

          {/* Droite : Panel de diagnostic */}
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
              filteredCount={filteredCount}
              totalCount={totalCount}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}