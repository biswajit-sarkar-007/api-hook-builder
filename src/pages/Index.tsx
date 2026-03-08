import { useState } from "react";
import { Terminal, ArrowRight } from "lucide-react";
import EndpointForm from "@/components/EndpointForm";
import CodeOutput from "@/components/CodeOutput";
import { fetchAndGenerate } from "@/lib/codeGenerator";

interface GeneratedCode {
  types: string;
  fetchFunction: string;
  hook: string;
}

const Index = () => {
  const [result, setResult] = useState<GeneratedCode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (endpoint: string) => {
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const generated = await fetchAndGenerate(endpoint);
      setResult(generated);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch endpoint. Check the URL and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <Terminal className="w-5 h-5 text-primary" />
          <h1 className="font-mono font-bold text-foreground text-lg">
            api-hook-gen
          </h1>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground">
            v1.0
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="container max-w-4xl mx-auto px-4 pt-16 pb-10">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span className="gradient-text">Paste endpoint.</span>
            <br />
            <span className="text-foreground">Get production-ready code.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Generate TypeScript types, fetch functions, and React Query hooks
            from any JSON API endpoint. Stop writing boilerplate.
          </p>
        </div>

        {/* Pipeline visualization */}
        <div className="flex items-center gap-2 mt-8 text-xs font-mono text-muted-foreground overflow-x-auto pb-2">
          {["endpoint", "fetch", "infer schema", "types", "fetch fn", "hook"].map(
            (step, i, arr) => (
              <span key={step} className="flex items-center gap-2 whitespace-nowrap">
                <span className="px-2 py-1 rounded bg-secondary border border-border">
                  {step}
                </span>
                {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-primary" />}
              </span>
            )
          )}
        </div>
      </section>

      {/* Input */}
      <section className="container max-w-4xl mx-auto px-4 pb-8">
        <EndpointForm onGenerate={handleGenerate} isLoading={isLoading} />
      </section>

      {/* Error */}
      {error && (
        <section className="container max-w-4xl mx-auto px-4 pb-8">
          <div className="p-4 rounded-md border border-destructive/50 bg-destructive/10">
            <p className="text-sm font-mono text-destructive">{error}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Note: The API must support CORS for browser-based fetching.
            </p>
          </div>
        </section>
      )}

      {/* Output */}
      {result && (
        <section className="container max-w-4xl mx-auto px-4 pb-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">
              Generated — ready to copy
            </span>
          </div>
          <CodeOutput
            types={result.types}
            fetchFunction={result.fetchFunction}
            hook={result.hook}
          />
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border mt-auto">
        <div className="container max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-xs font-mono text-muted-foreground">
            Built for frontend engineers who value their time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
