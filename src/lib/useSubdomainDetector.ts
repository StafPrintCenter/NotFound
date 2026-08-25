import { useEffect, useState } from "react";

interface SubdomainInfo {
  /** Full hostname (e.g. xyz.stafprint.com) */
  hostname: string;
  /** Subdomain extracted from hostname (e.g. xyz, or null for apex) */
  subdomain: string | null;
  /** URL complète d'origine ou courante */
  fullUrl: string;
  /** Indique si le domaine détecté appartient à stafprint.com */
  isStafprintDomain: boolean;
}

const STAFPRINT_DOMAIN = "stafprint.com";
const FALLBACK_HOST = "notfound.stafprint.com";

function extractSubdomain(hostname: string): string | null {
  if (!hostname) return null;
  const lower = hostname.toLowerCase();
  if (lower === STAFPRINT_DOMAIN || lower === `www.${STAFPRINT_DOMAIN}`) return null;
  if (lower.endsWith(`.${STAFPRINT_DOMAIN}`)) {
    return lower.slice(0, -STAFPRINT_DOMAIN.length - 1);
  }
  return lower;
}

function resolveDetectedHost(): { hostname: string; fullUrl: string } {
  if (typeof window === "undefined") {
    return { hostname: FALLBACK_HOST, fullUrl: `https://${FALLBACK_HOST}` };
  }

  const currentUrl = new URL(window.location.href);
  const fromParam = currentUrl.searchParams.get("from") || currentUrl.searchParams.get("ref");

  if (fromParam) {
    let sourceHost = fromParam.trim();
    // Nettoyage au cas où le paramètre contient un protocole (ex: https://foo.stafprint.com)
    sourceHost = sourceHost.replace(/^https?:\/\//i, "").split("/")[0];

    return {
      hostname: sourceHost,
      fullUrl: `https://${sourceHost}${currentUrl.pathname}${currentUrl.search}`,
    };
  }

  return {
    hostname: window.location.hostname,
    fullUrl: window.location.href,
  };
}

export function useSubdomainDetector(): SubdomainInfo {
  const [info, setInfo] = useState<SubdomainInfo>(() => {
    const { hostname, fullUrl } = resolveDetectedHost();
    return {
      hostname,
      subdomain: extractSubdomain(hostname),
      fullUrl,
      isStafprintDomain:
        hostname.toLowerCase().endsWith(STAFPRINT_DOMAIN) ||
        hostname.toLowerCase() === STAFPRINT_DOMAIN,
    };
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const { hostname, fullUrl } = resolveDetectedHost();
      setInfo({
        hostname,
        subdomain: extractSubdomain(hostname),
        fullUrl,
        isStafprintDomain:
          hostname.toLowerCase().endsWith(STAFPRINT_DOMAIN) ||
          hostname.toLowerCase() === STAFPRINT_DOMAIN,
      });
    };

    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return info;
}

export type { SubdomainInfo };
