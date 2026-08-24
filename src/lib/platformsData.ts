import { Globe, BookOpen, Gamepad2, Video, Link2, GraduationCap, Users, type LucideIcon } from "lucide-react";
import { SITE, SITE_LINK } from "@/data/site";

export type PlatformTag = "principal" | "outil" | "formation" | "communication" | "divertissement";

export interface Platform {
  id: string;
  name: string;
  description: string;
  tag: string;
  url: string;
  icon: LucideIcon;
  accent: "orange" | "coral" | "slate";
  isExternal: boolean;
}

export const platforms: Platform[] = [
  {
    id: "principal",
    name: "Site vitrine",
    description: `Le site principal de ${SITE.name} : services, réalisations, formations, blog et contact.`,
    tag: "stafprint.com",
    url: SITE_LINK.landingUrl,
    icon: Globe,
    accent: "orange",
    isExternal: true,
  },
  {
    id: "shortener",
    name: "SPC Shortener",
    description: `Raccourcisseur de liens officiel, réservé exclusivement aux contenus de ${SITE.name}.`,
    tag: "go.stafprint.com",
    url: SITE_LINK.shortUrl,
    icon: Link2,
    accent: "orange",
    isExternal: true,
  },
  {
    id: "instructor",
    name: "Espace Formateur",
    description: `Préparer, animer et évaluer les sessions de formation : parcours, supports, présence, notation et suivi des apprenants pour ${SITE.name}.`,
    tag: "teach.stafprint.com",
    url: SITE_LINK.instructorUrl,
    icon: Users,
    accent: "slate",
    isExternal: true,
  },
  {
    id: "student",
    name: "Espace Apprenant",
    description: `S'inscrire à une formation, suivre ses cours, rendre ses devoirs et récupérer ses attestations depuis le Student Hub de ${SITE.name}.`,
    tag: "learn.stafprint.com",
    url: SITE_LINK.studentUrl,
    icon: GraduationCap,
    accent: "slate",
    isExternal: true,
  },
  {
    id: "meet",
    name: "SPC Meet",
    description: `Plateforme de visioconférence pour les réunions et sessions à distance de ${SITE.name}.`,
    tag: "meet.stafprint.com",
    url: SITE_LINK.meetUrl,
    icon: Video,
    accent: "coral",
    isExternal: true,
  },
  {
    id: "arcade",
    name: "SPC Arcade",
    description: `Hub de jeux interactifs pour se divertir tout en développant ses compétences techniques.`,
    tag: "play.stafprint.com",
    url: SITE_LINK.arcadeUrl,
    icon: Gamepad2,
    accent: "orange",
    isExternal: true,
  },
  {
    id: "documentation",
    name: "Documentation officielle",
    description: `Guides, procédures et ressources techniques de ${SITE.name}.`,
    tag: "docs.stafprint.com",
    url: SITE_LINK.docsUrl,
    icon: BookOpen,
    accent: "slate",
    isExternal: true,
  },
];

export const contactMailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
  "[Signalement 404] Sous-domaine inexistant"
)}`;

export type { LucideIcon };
