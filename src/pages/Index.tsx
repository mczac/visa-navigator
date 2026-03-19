import { VisaFinder } from "@/components/VisaFinder";
import { VisaOverviewCards } from "@/components/VisaOverviewCards";
import { EntryRequirements } from "@/components/EntryRequirements";
import { OfficialResources } from "@/components/OfficialResources";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Page header */}
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          Visa &amp; Entry Requirements
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl leading-relaxed">
          Kick start your journey by getting to know about Sumba visa requirements
        </p>

        {/* Intro text */}
        <div className="space-y-3 mb-10 text-sm text-muted-foreground leading-relaxed max-w-3xl">
          <p>
            Since Sumba is part of Indonesia, all Indonesian visa and entry requirements apply.
            Citizens of over 80 countries in North America, South America, Europe, Asia and Oceania
            can obtain one of the two types of Visa-on-Arrival (VoA/e-VoA). This is a facilitated
            visa process that allows you to very easily obtain permission to enter Indonesia for up
            to 30 days.
          </p>
          <p>
            Subjects of 16 countries have visa waivers from the Indonesian immigration. 6 countries,
            on the other hand, are on the calling visa list, which is a more comprehensive visa
            process. Check the latest regulations before traveling as requirements can change.
          </p>
        </div>

        {/* Visa Finder */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-1">Visa Requirements</h2>
          <VisaFinder />
        </section>

        {/* Important note */}
        <div className="flex gap-3 rounded-xl bg-visa-amber-bg border border-visa-amber-fg/20 p-4 mb-12">
          <span className="text-visa-amber-fg text-sm font-semibold shrink-0">⚠</span>
          <p className="text-xs text-visa-amber-fg/80 leading-relaxed">
            Please check the{" "}
            <a
              href="https://www.imigrasi.go.id/wna/daftar-negara-voa-bvk-calling-visa/daftar-negara-subjek-visa-on-arrival"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium text-visa-amber-fg hover:no-underline"
            >
              relevant page by Official Website of the Immigration of the Republic of Indonesia
            </a>{" "}
            for the most up-to-date information.
          </p>
        </div>

        {/* Overview cards */}
        <VisaOverviewCards />

        {/* Entry requirements & customs */}
        <EntryRequirements />

        {/* Official resources */}
        <OfficialResources />

        {/* CTA */}
        <section className="rounded-xl bg-card border border-border p-8 text-center">
          <h2 className="text-lg font-semibold text-foreground mb-2">Ready to Explore More?</h2>
          <p className="text-sm text-muted-foreground mb-5">
            Explore Sumba now and start planning your paradisiacal getaway!
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="#"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Discover Activities
            </a>
            <a
              href="#"
              className="inline-flex items-center px-5 py-2.5 rounded-lg border border-border bg-card text-card-foreground text-sm font-medium hover:bg-secondary transition-colors"
            >
              Find Accommodation
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
