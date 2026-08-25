import logos from "@/assets/logos.json";
import { SITE, SITE_LINK } from "@/data/site";

export type PlatformStatus = "available" | "building";

export interface Platform {
  id: string;
  name: string;
  description: string;
  url: string;
  logoKey: keyof typeof logos;
  isExternal: boolean;
  status: PlatformStatus;
}

export const platforms: Platform[] = [
  {
    id: "principal",
    name: "Site vitrine",
    description: `Le site principal de ${SITE.name} : services, réalisations, formations, blog et contact.`,
    url: SITE_LINK.landingUrl,
    logoKey: "mc",
    isExternal: true,
    status: "available",
  },
  {
    id: "shortener",
    name: "SPC Shortener",
    description: `Raccourcisseur de liens officiel, réservé exclusivement aux contenus de ${SITE.name}.`,
    url: SITE_LINK.shortUrl,
    logoKey: "shortener",
    isExternal: true,
    status: "available",
  },
  {
    id: "instructor",
    name: "Espace Formateur",
    description: `Préparer, animer et évaluer les sessions de formation : parcours, supports, présence, notation et suivi des apprenants pour ${SITE.name}.`,
    url: SITE_LINK.instructorUrl,
    logoKey: "instructor",
    isExternal: true,
    status: "building",
  },
  {
    id: "student",
    name: "Espace Apprenant",
    description: `S'inscrire à une formation, suivre ses cours, rendre ses devoirs et récupérer ses attestations depuis le Student Hub de ${SITE.name}.`,
    url: SITE_LINK.studentUrl,
    logoKey: "student",
    isExternal: true,
    status: "building",
  },
  {
    id: "meet",
    name: "SPC Meet",
    description: `Plateforme de visioconférence pour les réunions et sessions à distance de ${SITE.name}.`,
    url: SITE_LINK.meetUrl,
    logoKey: "meet",
    isExternal: true,
    status: "building",
  },
  {
    id: "arcade",
    name: "SPC Arcade",
    description: `Hub de jeux interactifs pour se divertir tout en développant ses compétences techniques.`,
    url: SITE_LINK.arcadeUrl,
    logoKey: "arcade",
    isExternal: true,
    status: "available",
  },
  {
    id: "documentation",
    name: "Documentation officielle",
    description: `Guides, procédures et ressources techniques de ${SITE.name}.`,
    url: SITE_LINK.docsUrl,
    logoKey: "docs",
    isExternal: true,
    status: "available",
  },
];

export const contactMailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
  "[Signalement 404] Sous-domaine inexistant"
)}`;
