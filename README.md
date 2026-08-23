# Lost & Found Hub

# PROMPT : DEVELOPPEMENT DE LA PAGE CATCH-ALL 404 DE L'ECOSYSTEME (NOTFOUND.STAFPRINT.COM)

Tu es un développeur Full-Stack Senior & UI/UX Designer Expert React / TypeScript / Tailwind CSS / Framer Motion.

Tu dois concevoir et développer une application web légère, ultra-rapide et responsive dédiée au sous-domaine **`notfound.stafprint.com`** de **STAF PRINT CENTER** (Porto-Novo, Bénin). 

Cette page sert de **page d'atterrissage globale (Catch-All 404)** lorsqu'un utilisateur tente d'accéder à un sous-domaine inexistant de l'écosystème STAF PRINT (ex: `doc.stafprint.com`, `met.stafprint.com`, etc.).

---

## 🎨 1. DESIGN SYSTEM & CHARTE GRAPHIQUE (STRICTE)

L'interface doit s'aligner rigoureusement sur le Design System officiel de STAF PRINT CENTER :
- **Palette de Couleurs :**
  - **Background :** Off-white chaud (`#fcfbf9`) / Slate très clair avec motifs de grille fine (Paper Grid style) en mode clair ; Slate profond (`#0f172a` / `#1e293b`) en mode sombre.
  - **Accent STAF PRINT :** Orange Vibrant / Ambre signature (`#f97316` / `#ea580c`) pour les badges, bordures actives, boutons et effets d'avertissement.
  - **Accents secondaires :** Rouge Corail doux (`#ef4444`) pour l'indicateur 404, Slate grisé (`#64748b`) pour la typographie secondaire.
- **Typographies :**
  - **Fraunces** (`--font-display`) pour le grand titre, l'affichage 404 et les en-têtes de cartes.
  - **Inter Tight** pour le corps du texte, la navigation et les badges.
  - **JetBrains Mono** pour l'affichage dynamique du sous-domaine introuvable.

---

## 🎯 2. STRUCTURE ET FONCTIONNALITES CLÉS DE LA PAGE

### A. En-tête (Header Minimaliste)
- Logo officiel **STAF PRINT CENTER** (Monogramme SP + texte).
- Badge de statut dynamique à droite : `● Erreur 404 - Sous-domaine inexistant`.

### B. Section Hero & Détection Dynamique du Sous-Domaine
- **Affichage dynamique du domaine erroné :**
  - Extrait dynamiquement le sous-domaine ayant échoué via `window.location.hostname` ou le `document.referrer` (ex: `https://[sous-domaine-invalide].stafprint.com`).
- **Message d'accueil et d'orientation :**
  - Titre principal : *"Oups ! Ce sous-domaine n'existe pas."*
  - Description : *"Le sous-domaine que vous tentez de rejoindre est introuvable ou a été déplacé. Pas de panique, vous pouvez rejoindre directement l'une de nos plateformes officielles ci-dessous."*

### C. Grille d'Accès Rapide aux Plateformes Officielles (Hub de Réorientation)
Une grille de cartes interactives (effet hover, animations fluides Framer Motion) répertoriant les vrais sous-domaines de l'écosystème :

1. **Site Principal (`stafprint.com`) :** Services d'impression, devis, formations et contact.
2. **Documentation Officielle (`docs.stafprint.com`) :** Guides, procédures et ressources techniques.
3. **SPC Arcade (`play.stafprint.com` / `stafprint.com/arcade`) :** Hub de jeux et gamification.
4. **SPC Meet (`meet.stafprint.com`) :** Plateforme de visioconférence et réunions en ligne.
5. **SPC Shortener (`go.stafprint.com`) :** Raccourcisseur de liens officiel.
6. **Espaces Apprenant & Formateur :** Portails de gestion des cours et étudiants.

### D. Footer & Support
- Bouton secondaire d'action : **"Signaler un problème / Contact"** (déclenchant `mailto:contact@stafprint.com` avec objet automatique `[Signalement 404] Sous-domaine inexistant`).
- Mention de copyright officielle : `© STAF PRINT CENTER - L'empreinte de votre succès`.

---

## 💻 3. CODE & COMPOSANTS TECH À FOURNIR

1. **Composant principal (`NotFoundPage.tsx`) :**
   - Implémentation complète en React / TypeScript + Tailwind CSS v4 + Framer Motion.
2. **Helper de détection d'URL (`useSubdomainDetector.ts`) :**
   - Hook React qui analyse le `hostname` ou l'URL de provenance pour afficher le domaine erroné de façon lisible (ex: `<code className="text-orange-500">xyz.stafprint.com</code>`).
3. **Data Registry (`platformsData.ts`) :**
   - Tableau d'objets typé répertoriant toutes les plateformes officielles (nom, description, tag, url, icône Lucide).

---

## 🎯 LIVRABLE ATTENDU
Génère le code TypeScript / React / Tailwind CSS complet, élégant, moderne, parfaitement structuré et prêt à être déployé sur `notfound.stafprint.com`.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bfe3e99a-449e-4c1f-a087-8fef90d6d211).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
