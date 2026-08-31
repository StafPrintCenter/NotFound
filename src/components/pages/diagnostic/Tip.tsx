import { HelpCircle } from "lucide-react";
import { SITE } from "@/data/site";

export function DiagnosticTip() {
  return (
    <div className="rounded-2xl border border-staf-orange/60 bg-staf-orange/5 p-5">
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-staf-orange/10">
          <HelpCircle className="h-5 w-5 text-staf-orange" />
        </div>
        <div>
          <h3 className="font-display text-sm font-semibold text-foreground">Pourquoi cette page ?</h3>
          <p className="mt-1 font-sans text-sm leading-relaxed text-muted-foreground">
            Ce sous-domaine n’est pas reconnu par l’écosystème {SITE.name}. Vérifiez l’orthographe, utilisez
            la recherche ou sélectionnez une plateforme officielle ci-dessous.
          </p>
        </div>
      </div>
    </div>
  );
}