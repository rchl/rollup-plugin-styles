import postcss from "postcss";
import { CSSImports } from "icss-utils";
import { Load } from "./load";

export default async function (
  icssImports: CSSImports,
  load: Load,
  file: string,
  extensions: string[],
  processor: postcss.Processor,
  opts?: postcss.ProcessOptions,
): Promise<Record<string, string>> {
  const imports: Record<string, string> = {};

  for await (const [url, values] of Object.entries(icssImports)) {
    const exports = await load(url, file, extensions, processor, opts);
    for (const [k, v] of Object.entries(values)) {
      imports[k] = exports[v];
    }
  }

  return imports;
}
