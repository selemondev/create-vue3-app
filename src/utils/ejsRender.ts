import ejs from "ejs";
import fs from "fs-extra";
import path from "node:path";
import { format } from "prettier";
import options from "../core/utils/vue/options";

export async function ejsRender(filePath: string, name: string): Promise<void> {
  const file = path.parse(filePath);
  const destination = options.dest ?? path.resolve(name);
  const input = path.resolve(destination, file.dir, `${file.name}.ejs`);
  const output = path.resolve(destination, filePath);
  try {
    const template = await fs.readFile(input, "utf8");
    const code = ejs.render(
      template,
      { ...options, name: options.packageName ?? name },
      { filename: input },
    );
    const formatted = await format(code, { filepath: output });
    await fs.outputFile(output, formatted);
    await fs.remove(input);
  } catch (cause) {
    const detail = cause instanceof Error ? cause.message : String(cause);
    throw new Error(`Could not generate ${filePath}: ${detail}`, { cause });
  }
}
