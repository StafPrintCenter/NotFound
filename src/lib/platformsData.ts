import type { LucideIcon } from "lucide-react";
import {
  Globe,
  BookOpen,
  Gamepad2,
  Video,
  Link2,
  GraduationCap,
  Users,
  type LucideIcon as LucideIconType,
} from "lucide-react";

export type PlatformTag = "principal" | "docs" | "arcade" | "meet" | "shortener" | "learning" | "training";

export interface Platform {
  id: PlatformTag;
  name: string;
  description: string;
  tag: string;
  url: string;
  icon: LucideIconType;
  accent: "orange" | "coral" | "slate";
  isExternal: boolean;
}

export const platforms: Platform[] = [
  {
    id: "principal",
    name: "Site Principal",
    description: "Services d’impression, devis personnalisés, formations et contact officiel de STAF PRINT CENTER.",
    tag: "stafprint.com",
    url: "https://stafprint.com",
    icon: Globe,
    accent: "orange",
    isExternal: true,
  },
  {
    id: "docs",
    name: "Documentation Officielle",
    description: "Guides, procédures et ressources techniques pour tirer le meilleur de l’écosystème STAF PRINT.",
    tag: "docs.stafprint.com",
    url: "https://docs.stafprint.com",
    icon: BookOpen,
    accent: "slate",
    isExternal: true,
  },
  {
    id: "arcade",
    name: "SPC Arcade",
    description: "Hub de jeux et gamification pour la communauté STAF PRINT. Détendez-vous entre deux projets.",
    tag: "play.stafprint.com",
    url: "https://stafprint.com/arcade",
    icon: Gamepad2,
    accent: "orange",
    isExternal: true,
  },
  {
    id: "meet",
    name: "SPC Meet",
    description: "Plateforme de visioconférence et réunions en ligne pour les équipes et clients STAF PRINT.",
    tag: "meet.stafprint.com",
    url: "https://meet.stafprint.com",
    icon: Video,
    accent: "coral",
    isExternal: true,
  },
  {
    id: "shortener",
    name: "SPC Shortener",
    description: "Raccourcisseur officiel de liens pour partager facilement les ressources de l’écosystème.",
    tag: "go.stafprint.com",
    url: "https://go.stafprint.com",
    icon: Link2,
    accent: "orange",
    isExternal: true,
  },
  {
    id: "learning",
    name: "Espace Apprenant",
    description: "Portail d’accès aux cours, supports et parcours de formation de STAF PRINT CENTER.",
    tag: "learn.stafprint.com",
    url: "https://learn.stafprint.com",
    icon: GraduationCap,
    accent: "slate",
    isExternal: true,
  },
  {
    id: "training",
    name: "Espace Formateur",
    description: "Interface de gestion des cours, étudiants et sessions pour les formateurs agréés.",
    tag: "teach.stafprint.com",
    url: "https://teach.stafprint.com",
    icon: Users,
    accent: "slate",
    isExternal: true,
  },
];

export const statusBadge = {
  label: "Erreur 404 — Sous-domaine inexistant",
  dotColor: "bg-staf-coral",
};

export const contactMailto = `mailto:contact@stafprint.com?subject=${encodeURIComponent(
  "[Signalement 404] Sous-domaine inexistant"
)}`;

export const officialCopy = {
  brandName: "STAF PRINT CENTER",
  tagline: "L’empreinte de votre succès",
  copyright: `© ${new Date().getFullYear()} STAF PRINT CENTER — L’empreinte de votre succès`,
};

export type { LucideIcon };
