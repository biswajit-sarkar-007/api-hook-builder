import { useState } from "react";
import { Loader2, Zap } from "lucide-react";

interface EndpointFormProps {
  onGenerate: (endpoint: string) => void;
  isLoading: boolean;
}

const EndpointForm = ({ onGenerate, isLoading }: EndpointFormProps) => {
  const [endpoint, setEndpoint] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = endpoint.trim();
    if (!trimmed) {
      setError("Please enter an API endpoint");
      return;
    }

    try {
      new URL(trimmed);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    onGenerate(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://jsonplaceholder.typicode.com/users"
            className="w-full px-4 py-3 bg-card border border-border rounded-md font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-shadow"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-md hover:opacity-90 transition-all glow-primary glow-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Generate
            </>
          )}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-destructive font-mono">{error}</p>
      )}
    </form>
  );
};

export default EndpointForm;
