import { useEffect, useState } from "react";

interface SubdomainInfo {
  /** Hostname détecté (ex: foo.stafprint.com ou fallback) */
  hostname: string;
  /** Sous-domaine extrait (ex: foo, ou null si aucun) */
  subdomain: string | null;
  /** URL complète d'origine */
  fullUrl: string;
  /** Indique s'il s'agit d'un domaine de l'écosystème stafprint */
  isStafprintDomain: boolean;
}

const STAFPRINT_DOMAIN = "stafprint.com";
const NOTFOUND_HOST = "notfound.stafprint.com";
const FALLBACK_HOST = "notfound.stafprint.com";

function extractSubdomain(hostname: string): string | null {
  if (!hostname) return null;
  const lower = hostname.toLowerCase();

  if (
    lower === STAFPRINT_DOMAIN ||
    lower === `www.${STAFPRINT_DOMAIN}` ||
    lower === NOTFOUND_HOST
  ) {
    return null;
  }

  if (lower.endsWith(`.${STAFPRINT_DOMAIN}`)) {
    return lower.slice(0, -STAFPRINT_DOMAIN.length - 1);
  }

  return lower;
}

function resolveContextInfo(): SubdomainInfo {
  if (typeof window === "undefined") {
    return {
      hostname: FALLBACK_HOST,
      subdomain: extractSubdomain(FALLBACK_HOST),
      fullUrl: `https://${FALLBACK_HOST}`,
      isStafprintDomain: true,
    };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const originalUrlParam = searchParams.get("original_url") || searchParams.get("from");

  let targetHostname = window.location.hostname;
  let targetFullUrl = window.location.href;

  // Si l'URL contient un paramètre renvoyant le domaine d'origine
  if (originalUrlParam) {
    try {
      const parsedUrl = new URL(originalUrlParam);
      targetHostname = parsedUrl.hostname;
      targetFullUrl = originalUrlParam;
    } catch {
      // Si la valeur reçue est juste un nom d'hôte (ex: foo.stafprint.com)
      if (!originalUrlParam.startsWith("http")) {
        targetHostname = originalUrlParam;
        targetFullUrl = `https://${originalUrlParam}`;
      }
    }
  }

  const isStafprint =
    targetHostname.toLowerCase().endsWith(STAFPRINT_DOMAIN) ||
    targetHostname.toLowerCase() === STAFPRINT_DOMAIN;

  return {
    hostname: targetHostname,
    subdomain: extractSubdomain(targetHostname),
    fullUrl: targetFullUrl,
    isStafprintDomain: isStafprint,
  };
}

export function useSubdomainDetector(): SubdomainInfo {
  const [info, setInfo] = useState<SubdomainInfo>(resolveContextInfo);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      setInfo(resolveContextInfo());
    };

    update();
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return info;
}

export type { SubdomainInfo };
