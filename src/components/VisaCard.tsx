import type { VisaOption } from "@/data/visaData";
import { cn } from "@/lib/utils";

const tagBg = {
  green: "bg-visa-green-bg text-visa-green-fg",
  blue: "bg-visa-blue-bg text-visa-blue-fg",
  amber: "bg-visa-amber-bg text-visa-amber-fg",
  red: "bg-visa-red-bg text-visa-red-fg",
  teal: "bg-visa-teal-bg text-visa-teal-fg",
  gray: "bg-visa-gray-bg text-visa-gray-fg",
  purple: "bg-visa-purple-bg text-visa-purple-fg",
};

const dotColor = {
  green: "bg-visa-green-fg",
  blue: "bg-visa-blue-fg",
  amber: "bg-visa-amber-fg",
  red: "bg-visa-red-fg",
  teal: "bg-visa-teal-fg",
  gray: "bg-visa-gray-fg",
  purple: "bg-visa-purple-fg",
};

export function VisaCard({ visa, featured }: { visa: VisaOption; featured?: boolean }) {
  return (
    <div className={cn("rounded-xl bg-card p-6", featured && "border-2 border-primary shadow-sm")}>
      <h3 className="text-base font-medium text-card-foreground mb-1">
        {visa.title} — requirements & details
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{visa.description}</p>

      {visa.requirements.length > 0 && (
        <ul className="space-y-0 mb-4">
          {visa.requirements.map((req, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-muted-foreground py-2 border-b border-border last:border-0">
              <span className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", dotColor[visa.tagColor])} />
              <div>
                <span className="font-medium text-card-foreground">{req.label}</span>
                <span className="mx-1">—</span>
                {req.value}
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-8 flex-wrap">
        <div>
          <span className="text-xs text-muted-foreground">Duration</span>
          <span className="block text-sm font-semibold text-card-foreground mt-0.5">{visa.duration}</span>
        </div>
        <div>
          <span className="text-xs text-muted-foreground">Fee</span>
          <span className="block text-sm font-semibold text-card-foreground mt-0.5">{visa.fee}</span>
        </div>
      </div>

      {visa.notes.length > 0 && (
        <div className="mt-3 space-y-2">
          {visa.notes.map((note, i) => (
            <div key={i} className={cn("text-xs rounded-lg px-3 py-2", tagBg.amber)}>
              {note}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
