import CodeBlock from "./CodeBlock";

interface CodeOutputProps {
  types: string;
  fetchFunction: string;
  hook: string;
}

const CodeOutput = ({ types, fetchFunction, hook }: CodeOutputProps) => {
  return (
    <div className="space-y-6">
      <CodeBlock title="types.ts" code={types} language="typescript" />
      <CodeBlock title="api.ts" code={fetchFunction} language="typescript" />
      <CodeBlock title="hooks.ts" code={hook} language="typescript" />
    </div>
  );
};

export default CodeOutput;
