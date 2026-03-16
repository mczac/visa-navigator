import { useState, useMemo, useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { allCountries, lookupVisa, type CountryVisaResult } from "@/data/visaData";
import { VisaCard } from "./VisaCard";

export function VisaFinder() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<CountryVisaResult | null>(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return allCountries.filter(c => c.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const handleSearch = useCallback((country?: string) => {
    const term = country || query;
    if (!term.trim()) return;
    setResult(lookupVisa(term));
    setQuery(term);
  }, [query]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-sm text-muted-foreground mb-2">
        Enter your country to see which Indonesian visas you can apply for
      </p>

      <div className="flex gap-2.5">
        <div className="relative flex-1">
          <Input
            value={query}
            onChange={e => { setQuery(e.target.value); setResult(null); }}
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
        <div className="mt-6 pt-6 border-t border-border">
          {result.found ? (
            <>
              <div className="flex items-baseline gap-3 mb-3">
                <h2 className="text-xl font-medium text-foreground">{result.country}</h2>
                <span className="text-sm text-muted-foreground">
                  {result.visas.length} visa option{result.visas.length !== 1 ? "s" : ""} available
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {result.message}
              </p>
              <div className="space-y-3">
                {result.visas.map((visa, i) => (
                  <VisaCard key={visa.type} visa={visa} featured={i === 0} />
                ))}
              </div>
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
