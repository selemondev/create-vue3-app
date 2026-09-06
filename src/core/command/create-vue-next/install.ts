import { note, outro } from "@clack/prompts";
import spawn from "cross-spawn";
import options from "../../utils/vue/options";
import { interactive, logger } from "../../../utils/logger";
import { createSpawnCmd } from "../../../utils/createSpawnCmd";

export default async function installDeps(): Promise<void> {
  const command = createSpawnCmd(options.dest);
  if (
    options.install !== false &&
    options.package &&
    options.package !== "none"
  ) {
    if (options.updateDeps) {
      logger.warning(
        "Updating dependency ranges to latest majors; compatibility is not guaranteed.",
      );
      await command("npx", ["--yes", "npm-check-updates@18.3.1", "-u"]);
    }
    // Keep subprocess output visible; an animated spinner would collide with it.
    logger.info(`Installing dependencies with ${options.package}`);
    await command(options.package, ["install"]);
  }
  if (options.useGitInit) {
    const existing = spawn.sync("git", ["rev-parse", "--is-inside-work-tree"], {
      cwd: options.dest,
      stdio: "ignore",
    });
    if (existing.status === 0) {
      logger.info(
        "Already inside a Git repository; existing history and index were left unchanged.",
      );
    } else {
      logger.info("Initializing Git repository");
      await command("git", ["init"]);
      await command("git", ["add", "."]);
      await command("git", ["commit", "-m", "Initialized by create-vue3-app"]);
    }
  }
  const manager =
    options.package === "none" || !options.package ? "npm" : options.package;
  const steps = [`cd ${JSON.stringify(options.name)}`];
  if (options.install === false || options.package === "none")
    steps.push(`${manager} install`);
  steps.push(`${manager} run dev`);
  if (options.useEslint) steps.push(`${manager} run lint`);
  if (options.useVitest) steps.push(`${manager} run test:unit`);
  if (options.useTypeScript) steps.push(`${manager} run type-check`);
  if (interactive) {
    note(steps.join("\n"), "Next steps");
    outro(`Project created at ${options.dest}`);
  } else {
    logger.success(`Project created at ${options.dest}`);
    logger.info(steps.join("\n"));
  }
}
