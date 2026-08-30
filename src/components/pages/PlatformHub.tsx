import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X } from "lucide-react";
import type { APIEcosystemSite } from "@/data/ecosystem";
import { PlatformCard } from "./PlatformCard";
import { PlatformSkeleton } from "./PlatformSkeleton";
import { PlatformSearch } from "./diagnostic/PlatformSearch";

interface PlatformHubProps {
  isLoading: boolean;
  query: string;
  setQuery: (q: string) => void;
  filteredPlatforms: APIEcosystemSite[];
  totalCount: number;
  containerVariants: Variants;
  itemVariants: Variants;
}

export function PlatformHub({
  isLoading,
  query,
  setQuery,
  filteredPlatforms,
  totalCount,
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
        <motion.div
          variants={itemVariants}
          className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
              Plateformes officielles
            </h2>
            <p className="mt-1 font-sans text-sm text-muted-foreground">
              Choisissez directement la destination adaptée à votre besoin.
            </p>
          </div>

          <div className="w-full lg:w-96">
            <PlatformSearch
              query={query}
              setQuery={setQuery}
              filteredCount={filteredPlatforms.length}
              totalCount={totalCount}
              isLoading={isLoading}
            />
          </div>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {isLoading ? (
            <motion.div
              key="skeletons"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {Array.from({ length: 6 }).map((_, idx) => (
                <motion.div key={`skeleton-${idx}`} variants={itemVariants}>
                  <PlatformSkeleton />
                </motion.div>
              ))}
            </motion.div>
          ) : filteredPlatforms.length > 0 ? (
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
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 rounded-2xl border border-dashed border-border bg-card p-8 text-center"
            >
              <p className="font-display text-base font-semibold text-foreground">
                Aucune plateforme trouvée
              </p>
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
        </AnimatePresence>
      </motion.div>
    </section>
  );
}