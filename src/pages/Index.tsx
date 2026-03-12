import { useState, useRef } from "react";
import {
  Terminal,
  ArrowRight,
  Zap,
  Code2,
  Copy,
  Layers,
  Github,
  ChevronDown,
  Sparkles,
  Clock,
  Shield,
  MousePointerClick,
} from "lucide-react";
import EndpointForm from "@/components/EndpointForm";
import CodeOutput from "@/components/CodeOutput";
import { fetchAndGenerate } from "@/lib/codeGenerator";

interface GeneratedCode {
  types: string;
  fetchFunction: string;
  hook: string;
}

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Try it", href: "#try-it" },
  { label: "FAQ", href: "#faq" },
];

const STEPS = [
  {
    num: "01",
    icon: MousePointerClick,
    title: "Paste your endpoint",
    desc: "Drop any JSON API URL into the input. Public or authenticated — if your browser can reach it, we can read it.",
  },
  {
    num: "02",
    icon: Layers,
    title: "We infer the schema",
    desc: "The engine fetches the response, walks every key, and builds a full TypeScript interface — nested objects, arrays, the works.",
  },
  {
    num: "03",
    icon: Code2,
    title: "Get production code",
    desc: "Receive a typed fetch function and a TanStack Query hook, ready to paste into your codebase. Zero config needed.",
  },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Instant generation",
    desc: "No sign-up, no config. Paste → generate → copy. Under two seconds.",
  },
  {
    icon: Shield,
    title: "Type-safe output",
    desc: "Every field is typed. Nested objects become nested interfaces. Arrays are inferred correctly.",
  },
  {
    icon: Clock,
    title: "Save hours weekly",
    desc: "Stop hand-writing interfaces and fetch wrappers. Automate the boilerplate you write on every project.",
  },
  {
    icon: Copy,
    title: "Copy-paste ready",
    desc: "One-click copy on every code block. Paste directly into your project — no reformatting required.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Does this work with any API?",
    a: "It works with any public JSON API that supports CORS. For APIs behind authentication, the endpoint must be reachable from your browser.",
  },
  {
    q: "Is my data sent to a server?",
    a: "No. Everything runs client-side in your browser. The API is fetched directly from your machine — nothing is stored or proxied.",
  },
  {
    q: "What about nested or complex responses?",
    a: "The type inference engine recursively walks nested objects and arrays, generating separate interfaces for each unique shape.",
  },
  {
    q: "Can I use this with Axios instead of fetch?",
    a: "Currently the generator outputs native fetch code. Axios support is on the roadmap.",
  },
];

const Index = () => {
  const [result, setResult] = useState<GeneratedCode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const tryItRef = useRef<HTMLElement>(null);

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* ─── Navbar ─── */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary" />
            <span className="font-mono font-bold text-foreground text-base">
              api-hook-gen
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground leading-none">
              v1.0
            </span>
          </a>

          <div className="hidden sm:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="https://github.com/biswajit-sarkar-007/api-hook-builder"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        {/* glow blob */}
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

        <div className="container max-w-4xl mx-auto px-4 pt-24 pb-20 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-border bg-secondary text-xs font-mono text-muted-foreground">
            <Sparkles className="w-3 h-3 text-primary" />
            Open-source &middot; No sign-up required
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            <span className="gradient-text">Paste endpoint.</span>
            <br />
            <span className="text-foreground">Get production-ready code.</span>
          </h1>

          <p className="mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed text-lg">
            Generate TypeScript types, fetch functions, and React Query hooks
            from any JSON API endpoint. Stop writing boilerplate.
          </p>

          {/* Pipeline visualization */}
          <div className="flex items-center justify-center gap-2 mt-10 text-xs font-mono text-muted-foreground overflow-x-auto pb-2">
            {["endpoint", "fetch", "infer schema", "types", "fetch fn", "hook"].map(
              (step, i, arr) => (
                <span key={step} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="px-2 py-1 rounded bg-secondary border border-border">
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-primary" />
                  )}
                </span>
              )
            )}
          </div>

          <div className="mt-10">
            <a
              href="#try-it"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:opacity-90 transition-all glow-primary glow-primary-hover"
            >
              <Zap className="w-4 h-4" />
              Try it now
            </a>
          </div>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="how-it-works" className="border-t border-border bg-card/40">
        <div className="container max-w-5xl mx-auto px-4 py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-14">
            Three steps. No dependencies to install, no CLI to configure.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div
                key={s.num}
                className="relative p-6 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors group"
              >
                <span className="text-[64px] font-bold font-mono text-secondary absolute top-4 right-4 leading-none select-none">
                  {s.num}
                </span>
                <s.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="border-t border-border">
        <div className="container max-w-5xl mx-auto px-4 py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Built for speed
          </h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-14">
            Every decision optimised for developer experience.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex gap-4 p-5 rounded-lg border border-border bg-card hover:border-primary/40 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Try it (Generator) ─── */}
      <section
        id="try-it"
        ref={tryItRef}
        className="border-t border-border bg-card/40"
      >
        <div className="container max-w-4xl mx-auto px-4 py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Try it yourself
          </h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-10">
            Paste any JSON API endpoint below and hit Generate.
          </p>

          <EndpointForm onGenerate={handleGenerate} isLoading={isLoading} />

          {/* Error */}
          {error && (
            <div className="mt-6 p-4 rounded-md border border-destructive/50 bg-destructive/10">
              <p className="text-sm font-mono text-destructive">{error}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Note: The API must support CORS for browser-based fetching.
              </p>
            </div>
          )}

          {/* Output */}
          {result && (
            <div className="mt-10">
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
            </div>
          )}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="border-t border-border">
        <div className="container max-w-3xl mx-auto px-4 py-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-center max-w-lg mx-auto mb-12">
            Quick answers to common questions.
          </p>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-medium text-foreground text-sm">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ml-4 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border mt-auto">
        <div className="container max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-muted-foreground">
              api-hook-gen
            </span>
          </div>
          <p className="text-xs font-mono text-muted-foreground">
            Built for frontend engineers who value their time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
