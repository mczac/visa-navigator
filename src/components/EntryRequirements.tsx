import { entryRequirements, customsRegulations } from "@/data/visaData";
import { ShieldCheck, Plane, Heart, Syringe, AlertTriangle, Package } from "lucide-react";

const icons = [ShieldCheck, Plane, Heart, Syringe];

export function EntryRequirements() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-foreground mb-2">Entry Requirements for Indonesia</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Indonesia requires you to meet several requirements and submit certain documents in order to enter the country. We recommend all travelers to check the following list for a smooth journey:
      </p>

      <div className="space-y-3 mb-8">
        {entryRequirements.map((req, i) => {
          const Icon = icons[i] || ShieldCheck;
          return (
            <div key={i} className="flex gap-3 rounded-xl bg-card p-4 border border-border">
              <Icon className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-medium text-card-foreground">{req.label}</span>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{req.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">Customs Regulations</h3>
      <p className="text-sm text-muted-foreground mb-4">
        You can only bring certain items within a limit. Indonesia's customs regulations are quite strict and you should ensure that nothing prohibited is inside your luggage.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {customsRegulations.map((reg, i) => (
          <div key={i} className="flex gap-3 rounded-xl bg-card p-4 border border-border">
            <Package className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-medium text-card-foreground">{reg.label}</span>
              <p className="text-xs text-muted-foreground mt-0.5">{reg.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Drug laws warning */}
      <div className="flex gap-3 rounded-xl bg-visa-amber-bg border border-visa-amber-fg/20 p-4">
        <AlertTriangle className="w-5 h-5 text-visa-amber-fg shrink-0 mt-0.5" />
        <div>
          <span className="text-sm font-semibold text-visa-amber-fg">Important</span>
          <p className="text-xs text-visa-amber-fg/80 mt-1 leading-relaxed">
            Indonesia has extremely strict drug laws. Possession or trafficking of illegal drugs can result in lengthy prison sentences or death penalty. Always declare medications at customs if they contain controlled substances.
          </p>
        </div>
      </div>
    </section>
  );
}
