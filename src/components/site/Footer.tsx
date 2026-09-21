import { Mail } from "lucide-react";
import { SITE } from "@/data/site";
import { getContactMailto } from "@/lib/mail";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon, WhatsAppIcon } from "@/components/site/icons";

export function Footer() {
  const socialLinks = [
    { label: "Facebook", href: SITE.socials.facebook, Icon: FacebookIcon },
    { label: "Instagram", href: SITE.socials.instagram, Icon: InstagramIcon },
    { label: "LinkedIn", href: SITE.socials.linkedin, Icon: LinkedinIcon },
    { label: "X", href: SITE.socials.x, Icon: XIcon },
    { label: "WhatsApp", href: SITE.whatsappLink, Icon: WhatsAppIcon },
  ];

  return (
    <footer className="relative z-10 border-t border-border/60 bg-background/80 px-4 py-8 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        {/* Copyright */}
        <p className="text-center font-sans text-sm text-muted-foreground sm:text-left">
          © {new Date().getFullYear()} {SITE.name} - {SITE.slogan}.
        </p>

        {/* Action & Réseaux sociaux */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          {/* Réseaux sociaux */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>

          <span className="hidden text-muted-foreground/30 sm:inline">|</span>

          {/* Bouton Signaler un problème */}
          <a
            href={getContactMailto()}
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-staf-orange/30 bg-background px-5 py-2.5 font-sans text-sm font-medium text-staf-orange-deep transition-all hover:bg-staf-orange/10 hover:shadow-staf focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-staf"
          >
            <Mail className="h-4 w-4 transition-transform group-hover:-rotate-12" />
            Signaler un problème
          </a>
        </div>
      </div>
    </footer>
  );
}