import type { VisaOption } from "@/data/visaData";
import { cn } from "@/lib/utils";

const tagStyles = {
  green: "bg-visa-green-bg text-visa-green-fg",
  blue: "bg-visa-blue-bg text-visa-blue-fg",
  amber: "bg-visa-amber-bg text-visa-amber-fg",
  red: "bg-visa-red-bg text-visa-red-fg",
};

const dotStyles = {
  green: "bg-visa-green-fg",
  blue: "bg-visa-blue-fg",
  amber: "bg-visa-amber-fg",
  red: "bg-visa-red-fg",
};

export function VisaCard({ visa, featured }: { visa: VisaOption; featured?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-4 transition-shadow",
        featured ? "border-primary border-2 shadow-sm" : "border-border"
      )}
    >
      <span className={cn("inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full mb-2", tagStyles[visa.tagColor])}>
        {visa.tag}
      </span>
      <h3 className="text-[15px] font-medium text-card-foreground mb-1">{visa.title}</h3>
      <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">{visa.description}</p>

      {visa.requirements.length > 0 && (
        <ul className="space-y-0 mb-3">
          {visa.requirements.map((req, i) => (
            <li key={i} className="flex gap-2 text-[13px] text-muted-foreground py-1.5 border-b border-border last:border-0">
              <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", dotStyles[visa.tagColor])} />
              {req}
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-6 flex-wrap">
        <div>
          <span className="text-xs text-muted-foreground">Duration</span>
          <span className="block text-sm font-medium text-card-foreground mt-0.5">{visa.duration}</span>
        </div>
        <div>
          <span className="text-xs text-muted-foreground">Fee</span>
          <span className="block text-sm font-medium text-card-foreground mt-0.5">{visa.fee}</span>
        </div>
      </div>

      {visa.note && (
        <div className="mt-2 text-xs bg-visa-amber-bg text-visa-amber-fg rounded-lg px-3 py-2">
          {visa.note}
        </div>
      )}
    </div>
  );
}
