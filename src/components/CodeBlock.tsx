import { useState, useRef, useEffect } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  title: string;
  code: string;
  language?: string;
}

const CodeBlock = ({ title, code }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
  };

  return (
    <div className="rounded-md border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-secondary border-b border-border">
        <span className="text-sm font-mono font-medium text-secondary-foreground">{title}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre
        ref={preRef}
        className="p-4 overflow-x-auto text-sm font-mono leading-relaxed bg-code-bg code-scrollbar text-foreground"
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
