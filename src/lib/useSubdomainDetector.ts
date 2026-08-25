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

/**
 * Le sous-domaine d'origine (foo.stafprint.com) est perdu lors de la
 * redirection 301 vers notfound.stafprint.com : le navigateur navigue
 * réellement vers ce nouvel hôte. L'edge function Netlify (host-redirect)
 * transmet donc le host d'origine via ?host=... avant de rediriger.
 * On le lit ici en priorité, avec un fallback sur window.location.hostname.
 */
function getOriginHost(): string {
  if (typeof window === "undefined") return FALLBACK_HOST;

  const params = new URLSearchParams(window.location.search);
  const forwarded = params.get("host");

  if (forwarded && /^[a-z0-9.-]+$/i.test(forwarded)) {
    return forwarded.toLowerCase();
  }

  return window.location.hostname;
}

function buildUrl(hostname: string): string {
  if (typeof window === "undefined") return `https://${hostname}`;

  // On retire le param "host" (technique, interne) de l'URL affichée
  const params = new URLSearchParams(window.location.search);
  params.delete("host");
  const search = params.toString();

  return `${window.location.protocol}//${hostname}${window.location.pathname}${search ? `?${search}` : ""}`;
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

function computeInfo(): SubdomainInfo {
  const hostname = getOriginHost();
  return {
    hostname,
    subdomain: extractSubdomain(hostname),
    fullUrl: buildUrl(hostname),
    isStafprintDomain:
      hostname.toLowerCase().endsWith(STAFPRINT_DOMAIN) || hostname.toLowerCase() === STAFPRINT_DOMAIN,
  };
}

export function useSubdomainDetector(): SubdomainInfo {
  const [info, setInfo] = useState<SubdomainInfo>(() => computeInfo());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => setInfo(computeInfo());

    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return info;
}

export type { SubdomainInfo };