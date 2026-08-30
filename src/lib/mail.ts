import { SITE } from "@/data/site";
import type { DiagnosticData } from "@/components/pages/diagnostic/DiagnosticHeader";

export function getContactMailto(data?: Partial<DiagnosticData>): string {
  const subject = `[Signalement 404] Sous-domaine inexistant - ${data?.hostname || "Inconnu"}`;

  const bodyLines = [
    "Bonjour l'équipe " + SITE.name + ",",
    "",
    "Je souhaite vous signaler un problème d'accès concernant le sous-domaine ci-dessous :",
    "",
    "=== Informations de diagnostic ===",
    `• Hôte détecté : ${data?.hostname ?? "Non spécifié"}`,
    `• Sous-domaine : ${data?.subdomain ?? "Aucun (apex)"}`,
    `• URL complète : ${data?.fullUrl ?? "Non spécifiée"}`,
    `• Domaine officiel : ${data?.isStafprintDomain ? "Oui" : "Non"}`,
    `• Date / Heure locale : ${data?.timeString || "Non disponible"} ${data?.timeZoneOffset ? `(${data?.timeZoneOffset})` : ""}`,
    `• Région estimée : ${data?.region ?? "Non détectée"}`,
    "==================================",
    "",
    "Description du problème / Remarques complémentaires :",
    "[Renseignez ici toute information complémentaire utile]",
    "",
    "Cordialement,",
  ];

  const body = bodyLines.join("\n");

  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
