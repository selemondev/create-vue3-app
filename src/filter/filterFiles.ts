import options from "../core/utils/vue/options";
import fs from "fs-extra";
import { join } from "node:path";

export async function filterFiles(): Promise<void> {
  if (!options.dest)
    throw new Error(
      "A staging directory is required to filter template files.",
    );
  const files: string[] = [];
  if (!options.useRouter) files.push("src/views", "src/router");
  files.push(
    options.useTailwind
      ? "src/assets/css/base.css"
      : "src/assets/css/tailwind.css",
  );
  if (options.deploy !== "netlify") files.push("netlify.toml");
  if (options.deploy !== "vercel") files.push("vercel.json");
  if (!options.useVitest)
    files.push(
      "vitest.config.ts",
      "vitest.config.js",
      "tsconfig.vitest.json",
      "src/components/__tests__",
    );
  if (!options.usePinia) files.push("src/stores");
  if (!options.useEslint) files.push("eslint.config.js");
  for (const file of files) await fs.remove(join(options.dest, file));
}
