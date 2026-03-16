import { useState, useMemo, useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { allCountries, lookupVisa, type CountryVisaResult, type VisaOption } from "@/data/visaData";
import { VisaCard } from "./VisaCard";
import { cn } from "@/lib/utils";

const tagStyles = {
  green: "border-visa-green-fg/30 text-visa-green-fg",
  blue: "border-visa-blue-fg/30 text-visa-blue-fg",
  amber: "border-visa-amber-fg/30 text-visa-amber-fg",
  red: "border-visa-red-fg/30 text-visa-red-fg",
};

const tagStylesActive = {
  green: "border-visa-green-fg bg-card shadow-sm",
  blue: "border-visa-blue-fg bg-card shadow-sm",
  amber: "border-visa-amber-fg bg-card shadow-sm",
  red: "border-visa-red-fg bg-card shadow-sm",
};

export function VisaFinder() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<CountryVisaResult | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<VisaOption | null>(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return allCountries.filter(c => c.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const handleSearch = useCallback((country?: string) => {
    const term = country || query;
    if (!term.trim()) return;
    const r = lookupVisa(term);
    setResult(r);
    setQuery(term);
    setSelectedVisa(r.found && r.visas.length > 0 ? r.visas[r.visas.length - 1] : null);
  }, [query]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-sm text-muted-foreground mb-2">
        Find visa options available for your country
      </p>

      <div className="flex gap-2.5">
        <div className="relative flex-1">
          <Input
            value={query}
            onChange={e => { setQuery(e.target.value); setResult(null); setSelectedVisa(null); }}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            placeholder="Search for your country..."
            className="h-11 pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
        <Button onClick={() => handleSearch()} className="h-11 px-6">
          Search
        </Button>
      </div>

      {suggestions.length > 0 && !result && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {suggestions.map(c => (
            <button
              key={c}
              onClick={() => { setQuery(c); handleSearch(c); }}
              className="text-xs px-3 py-1 rounded-full border border-border bg-secondary text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {result && (
        <div className="mt-8">
          {result.found ? (
            <>
              {/* Country header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm font-medium text-muted-foreground bg-secondary rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                  {result.country.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <h2 className="text-xl font-medium text-foreground leading-tight">{result.country}</h2>
                  <p className="text-sm text-muted-foreground">
                    {result.visas.length} visa type{result.visas.length !== 1 ? "s" : ""} available
                  </p>
                </div>
              </div>

              {/* Horizontal visa type cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {result.visas.map(visa => (
                  <button
                    key={visa.type}
                    onClick={() => setSelectedVisa(visa)}
                    className={cn(
                      "text-left rounded-xl border-2 p-3 transition-all",
                      selectedVisa?.type === visa.type
                        ? tagStylesActive[visa.tagColor]
                        : tagStyles[visa.tagColor] + " bg-card/50 hover:bg-card"
                    )}
                  >
                    <span className={cn(
                      "inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mb-1.5",
                      visa.tagColor === "green" && "bg-visa-green-bg text-visa-green-fg",
                      visa.tagColor === "blue" && "bg-visa-blue-bg text-visa-blue-fg",
                      visa.tagColor === "amber" && "bg-visa-amber-bg text-visa-amber-fg",
                      visa.tagColor === "red" && "bg-visa-red-bg text-visa-red-fg",
                    )}>
                      {visa.tag}
                    </span>
                    <p className="text-sm font-medium text-card-foreground leading-snug">{visa.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{visa.duration}</p>
                  </button>
                ))}
              </div>

              {/* Selected visa detail */}
              {selectedVisa && (
                <div className="border-t border-border pt-6">
                  <VisaCard visa={selectedVisa} featured={false} />
                </div>
              )}

              <p className="text-xs text-muted-foreground mt-5 pt-4 border-t border-border">
                For work permits, investor visas, and other long-stay options, visit the official website of the Immigration of the Republic of Indonesia.
              </p>
            </>
          ) : (
            <div className="rounded-lg bg-visa-red-bg text-visa-red-fg p-3 text-sm">
              No visa information found for <strong>{result.country}</strong>. Please check the spelling or try a variation.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
