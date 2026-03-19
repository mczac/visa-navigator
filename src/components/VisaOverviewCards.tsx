import { visaOverviewCards } from "@/data/visaData";
import { cn } from "@/lib/utils";

const colorMap = {
  green: "border-visa-green-fg/20 bg-visa-green-bg",
  blue: "border-visa-blue-fg/20 bg-visa-blue-bg",
  purple: "border-visa-purple-fg/20 bg-visa-purple-bg",
};

const dotMap = {
  green: "bg-visa-green-fg",
  blue: "bg-visa-blue-fg",
  purple: "bg-visa-purple-fg",
};

const tagMap = {
  green: "bg-visa-green-fg/10 text-visa-green-fg",
  blue: "bg-visa-blue-fg/10 text-visa-blue-fg",
  purple: "bg-visa-purple-fg/10 text-visa-purple-fg",
};

export function VisaOverviewCards() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-foreground mb-2">Sumba Visa Options</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Overview of the most common visa types for traveling to Indonesia and Sumba.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visaOverviewCards.map((card) => (
          <div
            key={card.title}
            className={cn(
              "rounded-xl border p-5 flex flex-col",
              colorMap[card.color]
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground leading-snug">{card.title}</h3>
              <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", tagMap[card.color])}>
                {card.subtitle}
              </span>
            </div>
            <ul className="space-y-2 flex-1">
              {card.points.map((point, i) => (
                <li key={i} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                  <span className={cn("w-1.5 h-1.5 rounded-full mt-1 shrink-0", dotMap[card.color])} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
