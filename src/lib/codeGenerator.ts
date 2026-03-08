// JSON → TypeScript type inference and code generation engine

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function singularize(s: string): string {
  if (s.endsWith("ies")) return s.slice(0, -3) + "y";
  if (s.endsWith("ses")) return s.slice(0, -2);
  if (s.endsWith("s") && !s.endsWith("ss")) return s.slice(0, -1);
  return s;
}

function deriveNameFromEndpoint(endpoint: string): string {
  try {
    const url = new URL(endpoint);
    const segments = url.pathname.split("/").filter(Boolean);
    // Find last non-numeric segment
    for (let i = segments.length - 1; i >= 0; i--) {
      if (!/^\d+$/.test(segments[i])) {
        return segments[i].replace(/[^a-zA-Z0-9]/g, "");
      }
    }
    return "data";
  } catch {
    return "data";
  }
}

function inferType(value: unknown, name: string, interfaces: Map<string, string>): string {
  if (value === null || value === undefined) return "unknown";
  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";

  if (Array.isArray(value)) {
    if (value.length === 0) return "unknown[]";
    const itemType = inferType(value[0], singularize(name), interfaces);
    return `${itemType}[]`;
  }

  if (typeof value === "object") {
    const interfaceName = capitalize(singularize(name));
    const obj = value as Record<string, unknown>;
    const fields = Object.entries(obj)
      .map(([key, val]) => {
        const type = inferType(val, key, interfaces);
        return `  ${key}: ${type};`;
      })
      .join("\n");
    interfaces.set(interfaceName, `export interface ${interfaceName} {\n${fields}\n}`);
    return interfaceName;
  }

  return "unknown";
}

export function generateTypes(data: unknown, endpointName: string): string {
  const interfaces = new Map<string, string>();
  const rootName = capitalize(singularize(endpointName));

  if (Array.isArray(data)) {
    if (data.length > 0 && typeof data[0] === "object" && data[0] !== null) {
      inferType(data[0], endpointName, interfaces);
    } else {
      return `export type ${rootName}Response = ${inferType(data, endpointName, interfaces)}`;
    }
  } else if (typeof data === "object" && data !== null) {
    inferType(data, endpointName, interfaces);
  } else {
    return `export type ${rootName}Response = ${typeof data};`;
  }

  return Array.from(interfaces.values()).join("\n\n");
}

export function generateFetchFunction(endpoint: string, endpointName: string, data: unknown): string {
  const typeName = capitalize(singularize(endpointName));
  const funcName = `fetch${capitalize(endpointName)}`;
  const isArray = Array.isArray(data);
  const returnType = isArray ? `${typeName}[]` : typeName;

  return `export async function ${funcName}(): Promise<${returnType}> {
  const response = await fetch("${endpoint}");

  if (!response.ok) {
    throw new Error(\`Failed to fetch ${endpointName}: \${response.status}\`);
  }

  return response.json();
}`;
}

export function generateReactQueryHook(endpointName: string): string {
  const hookName = `use${capitalize(endpointName)}`;
  const funcName = `fetch${capitalize(endpointName)}`;
  const queryKey = endpointName.toLowerCase();

  return `import { useQuery } from "@tanstack/react-query";

export function ${hookName}() {
  return useQuery({
    queryKey: ["${queryKey}"],
    queryFn: ${funcName},
  });
}`;
}

export async function fetchAndGenerate(endpoint: string): Promise<{
  types: string;
  fetchFunction: string;
  hook: string;
  rawJson: string;
}> {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`API returned ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  const endpointName = deriveNameFromEndpoint(endpoint);
  const rawJson = JSON.stringify(data, null, 2);

  return {
    types: generateTypes(data, endpointName),
    fetchFunction: generateFetchFunction(endpoint, endpointName, data),
    hook: generateReactQueryHook(endpointName),
    rawJson: rawJson.length > 2000 ? rawJson.slice(0, 2000) + "\n// ... truncated" : rawJson,
  };
}
