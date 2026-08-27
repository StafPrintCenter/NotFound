import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useSubdomainDetector } from "@/lib/useSubdomainDetector";
import { platforms } from "@/lib/platformsData";
import { stripProtocol } from "@/lib/domain";
import { SITE, SITE_LINK } from "@/data/site";
import { Header, Footer, HeroSection, PlatformHub } from "@/components/pages";

export const Route = createFileRoute("/")({
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

  const mainDomain = stripProtocol(SITE_LINK.landingUrl);
  const displayDomain = isStafprintDomain && subdomain ? `${subdomain}.${mainDomain}` : hostname;

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
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 paper-grid opacity-[0.35]" aria-hidden="true" />

      <Header />

      <main className="relative z-10 flex flex-1 flex-col overflow-x-hidden">
        <HeroSection
          displayDomain={displayDomain}
          hostname={hostname}
          subdomain={subdomain}
          fullUrl={fullUrl}
          isStafprintDomain={isStafprintDomain}
          query={query}
          setQuery={setQuery}
          filteredCount={filteredPlatforms.length}
          totalCount={platforms.length}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />

        <PlatformHub
          query={query}
          setQuery={setQuery}
          filteredPlatforms={filteredPlatforms}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
        />
      </main>

      <Footer />
    </div>
  );
}