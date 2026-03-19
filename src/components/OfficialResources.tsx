import { ExternalLink, AlertTriangle } from "lucide-react";

export function OfficialResources() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-foreground mb-4">Official Resources</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <a
          href="https://evisa.imigrasi.go.id/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-card border border-border p-5 hover:border-primary/40 transition-colors group"
        >
          <h3 className="text-sm font-semibold text-card-foreground mb-1 flex items-center gap-1.5">
            Official Indonesia Immigration
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Check the latest visa regulations and apply for e-VoA at the official Indonesian immigration website.
          </p>
        </a>

        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-1">Your Embassy</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Contact your country's embassy in Indonesia or Indonesian embassy in your country for the most current requirements.
          </p>
        </div>
      </div>

      {/* Final warning callout */}
      <div className="flex gap-3 rounded-xl bg-visa-amber-bg border border-visa-amber-fg/20 p-4">
        <AlertTriangle className="w-5 h-5 text-visa-amber-fg shrink-0 mt-0.5" />
        <div>
          <span className="text-sm font-semibold text-visa-amber-fg">Important</span>
          <p className="text-xs text-visa-amber-fg/80 mt-1 leading-relaxed">
            Visa regulations may change. Always verify current requirements with official sources 4–6 weeks before your planned travel date.
          </p>
        </div>
      </div>
    </section>
  );
}
