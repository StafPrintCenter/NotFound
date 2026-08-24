import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X } from "lucide-react";
import type { Platform } from "@/lib/platformsData";
import { PlatformCard } from "./PlatformCard";

interface PlatformHubProps {
  query: string;
  setQuery: (q: string) => void;
  filteredPlatforms: Platform[];
  containerVariants: Variants;
  itemVariants: Variants;
}

export function PlatformHub({
  query,
  setQuery,
  filteredPlatforms,
  containerVariants,
  itemVariants,
}: PlatformHubProps) {
  return (
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
              <motion.div key={platform.id} variants={itemVariants} className="h-full">
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
  );
}