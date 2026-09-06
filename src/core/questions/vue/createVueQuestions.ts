import {
  confirm,
  intro,
  multiselect,
  note,
  select,
  text,
} from "@clack/prompts";
import { basename, resolve } from "node:path";
import { homedir } from "node:os";
import fs from "fs-extra";
import options from "../../utils/vue/options";
import { answer, Cancellation, interactive } from "../../../utils/logger";
import { validatePackageName } from "../../../utils/validatePackageName";
import { getPackageManager } from "../../../utils/getPackageManager";
import { prepareTemplateOptions } from "../../utils/vue/templateOptions";

const features = [
  { value: "useTailwind", label: "Tailwind CSS", initial: true },
  { value: "useRouter", label: "Vue Router", initial: true },
  { value: "usePinia", label: "Pinia", initial: true },
  { value: "useVueUse", label: "VueUse", initial: false },
  { value: "useTanStackVueQuery", label: "TanStack Vue Query", initial: true },
  { value: "useDevTool", label: "Vue DevTools", initial: true },
  { value: "useVitest", label: "Vitest", initial: true },
  { value: "useEslint", label: "ESLint", initial: false },
] as const;

function validateDirectory(value: string) {
  if (!value.trim()) return "Enter a project directory.";
  const destination = resolve(value);
  if (destination === resolve("/") || destination === homedir())
    return "Choose a project directory, not your home or filesystem root.";
  const validation = validatePackageName(basename(destination));
  if (!validation.valid)
    return `Invalid project name: ${validation.problems.join("; ")}`;
}

export default async function createVueQuestions(): Promise<void> {
  const guided = interactive && !options.yes;
  if (interactive) intro("Create Vue 3 App");
  if (!options.name) {
    if (!guided)
      throw new Error(
        "Supply a project name: create-vue3-app my-app --yes --no-install. Run --help for choices.",
      );
    options.name = answer(
      await text({
        message: "Project directory",
        placeholder: "create-vue3-app",
        defaultValue: "create-vue3-app",
        validate: (value) => validateDirectory(value ?? ""),
      }),
    );
  }
  const problem = validateDirectory(options.name);
  if (problem) throw new Error(problem);
  options.dest = resolve(options.name);
  options.packageName = basename(options.dest);
  if (await fs.pathExists(options.dest)) {
    const stat = await fs.lstat(options.dest);
    if (stat.isSymbolicLink() || !stat.isDirectory())
      throw new Error(
        `Destination ${options.dest} must be a directory, not a file or symbolic link.`,
      );
    const files = (await fs.readdir(options.dest)).filter(
      (file) => file !== ".git",
    );
    if (files.length && !options.force) {
      if (!guided)
        throw new Error(
          `Directory ${options.dest} is not empty. Choose another directory or use --force to replace generated files. Unrelated files and .git are preserved.`,
        );
      const overwrite = answer(
        await confirm({
          message: `Replace generated files in ${options.dest}? Unrelated files and .git will be kept.`,
          initialValue: false,
        }),
      );
      if (!overwrite) throw new Cancellation();
      options.force = true;
    }
  }
  if (options.useTypeScript === undefined) {
    options.useTypeScript = guided
      ? answer(
          await select({
            message: "Project language",
            initialValue: true,
            options: [
              { value: true, label: "TypeScript" },
              { value: false, label: "JavaScript" },
            ],
          }),
        )
      : true;
  }
  const unanswered = features.filter(
    (feature) => options[feature.value] === undefined,
  );
  if (guided && unanswered.length) {
    const selected = answer(
      await multiselect({
        message: "Project features (Space to toggle, Enter to continue)",
        options: unanswered.map((feature) => ({
          value: feature.value,
          label: feature.label,
        })),
        initialValues: unanswered
          .filter((feature) => feature.initial)
          .map((feature) => feature.value),
        required: false,
      }),
    );
    for (const feature of unanswered)
      options[feature.value] = selected.includes(feature.value);
  } else {
    for (const feature of unanswered) options[feature.value] = feature.initial;
  }
  if (!options.package) {
    if (options.install === true) options.package = getPackageManager();
    else if (guided && options.install !== false)
      options.package = answer(
        await select({
          message: "Install dependencies with",
          initialValue: "none",
          options: [
            { value: "none", label: "Install manually later" },
            { value: "npm", label: "npm" },
            { value: "pnpm", label: "pnpm" },
            { value: "yarn", label: "Yarn" },
            { value: "bun", label: "Bun" },
          ],
        }),
      );
    else options.package = "none";
  }
  if (
    options.updateDeps &&
    (options.install === false || options.package === "none")
  )
    throw new Error(
      "--update-deps requires --install or a --use-* package manager, without --no-install.",
    );
  if (!options.deploy)
    options.deploy = guided
      ? answer(
          await select({
            message: "Deployment configuration (no account or deployment now)",
            initialValue: "none",
            options: [
              { value: "none", label: "None" },
              { value: "vercel", label: "Vercel" },
              { value: "netlify", label: "Netlify" },
            ],
          }),
        )
      : "none";
  if (options.useGitInit === undefined)
    options.useGitInit = guided
      ? answer(
          await confirm({
            message: "Initialize Git and create an initial commit?",
            initialValue: false,
          }),
        )
      : false;
  prepareTemplateOptions();
  if (interactive)
    note(
      `${options.dest}\n${options.useTypeScript ? "TypeScript" : "JavaScript"} with ${
        features
          .filter((feature) => options[feature.value])
          .map((feature) => feature.label)
          .join(", ") || "no optional features"
      }\n${options.install !== false && options.package !== "none" ? `Install with ${options.package}` : "Files only; install dependencies when ready"}${options.useGitInit ? "\nInitialize Git and commit generated files" : ""}`,
      "Project summary",
    );
}
