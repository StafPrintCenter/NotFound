import { useEffect, useState } from "react";

interface SubdomainInfo {
  /** Full hostname (e.g. xyz.stafprint.com) */
  hostname: string;
  /** Subdomain extracted from hostname (e.g. xyz, or null for apex) */
  subdomain: string | null;
  /** Full error URL built from hostname */
  fullUrl: string;
  /** Whether the detected hostname belongs to stafprint.com */
  isStafprintDomain: boolean;
}

const STAFPRINT_DOMAIN = "stafprint.com";
const FALLBACK_HOST = "notfound.stafprint.com";

function buildUrl(hostname: string): string {
  if (typeof window === "undefined") return `https://${hostname}`;
  return `${window.location.protocol}//${hostname}${window.location.pathname}${window.location.search}`;
}

function extractSubdomain(hostname: string): string | null {
  if (!hostname) return null;
  const lower = hostname.toLowerCase();
  if (lower === STAFPRINT_DOMAIN || lower === `www.${STAFPRINT_DOMAIN}`) return null;
  if (lower.endsWith(`.${STAFPRINT_DOMAIN}`)) {
    return lower.slice(0, -STAFPRINT_DOMAIN.length - 1);
  }
  // For non-stafprint domains, return the full hostname as the "subdomain" display.
  return lower;
}

export function useSubdomainDetector(): SubdomainInfo {
  const [info, setInfo] = useState<SubdomainInfo>(() => {
    const hostname = typeof window !== "undefined" ? window.location.hostname : FALLBACK_HOST;
    return {
      hostname,
      subdomain: extractSubdomain(hostname),
      fullUrl: buildUrl(hostname),
      isStafprintDomain: hostname.toLowerCase().endsWith(STAFPRINT_DOMAIN) || hostname.toLowerCase() === STAFPRINT_DOMAIN,
    };
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      const hostname = window.location.hostname;
      setInfo({
        hostname,
        subdomain: extractSubdomain(hostname),
        fullUrl: buildUrl(hostname),
        isStafprintDomain: hostname.toLowerCase().endsWith(STAFPRINT_DOMAIN) || hostname.toLowerCase() === STAFPRINT_DOMAIN,
      });
    };

    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return info;
}

export type { SubdomainInfo };
