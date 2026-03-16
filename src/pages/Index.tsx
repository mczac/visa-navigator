import { VisaFinder } from "@/components/VisaFinder";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          Indonesia Visa Finder
        </h1>
        <p className="text-muted-foreground mb-8">
          Find the right visa for your trip to Indonesia
        </p>
        <VisaFinder />
      </div>
    </div>
  );
};

export default Index;
