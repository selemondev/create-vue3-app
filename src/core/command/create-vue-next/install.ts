import options from "../../../core/utils/vue/options";
import { logger } from "../../../utils/logger";
import { createSpawnCmd } from "../../../utils/createSpawnCmd";
import ora from "ora";
import chalk from "chalk";
import { join, resolve } from "path";
import { packageManagerExecutable } from "../../../utils/package-manager-executable";
import { cwd } from "process";
import { read, readFile, writeFile } from "fs-extra";
async function installDeps() {
  // No output will be shown in the console
  const cmdIgnore = createSpawnCmd(options.dest, "ignore");
  const spinner = ora();

  const startTime: number = new Date().getTime();

  if (options.useGitInit) {
    await cmdIgnore("git", ["init"]);

    await cmdIgnore("git", ["add ."]);

    await cmdIgnore("git", ['commit -m "Initialized by create-vue3-app"']);
  }

  if (options.package && options.package !== "none") {
    spinner.start(`Checking for dependency updates with ${options.package}.`);
    await cmdIgnore(packageManagerExecutable(options.package), [
      "npm-check-updates",
    ]);
    spinner.text = chalk.green(
      `Checking for dependency updates with ${options.package}.`,
    );
    spinner.succeed();
    spinner.start(`Updating dependencies.`);
    await cmdIgnore(packageManagerExecutable(options.package), [
      "npm-check-updates -u",
    ]);
    spinner.text = chalk.green(`Updating dependencies.`);
    spinner.succeed();
    spinner.start(`Installing the latest dependencies.`);
    await cmdIgnore(options.package, ["install"]);
    spinner.text = chalk.green(`Installing the latest dependencies.`);
    spinner.succeed();
  }

  const endTime: number = new Date().getTime();
  const usageTime: number = (endTime - startTime) / 1000;

  console.log();

  logger.info(`🚀 Completed in ${usageTime}s`);

  console.log();

  logger.success("✅ Project created successfully");

  console.log();

  logger.info(`cd ${options.name}`);

  console.log();

  if (options.package !== "none") {
    logger.info(
      options.package === "npm"
        ? `${options.package} run dev to start the dev server`
        : `${options.package} dev to start the dev server`,
    );

    console.log();

    options.useEslint &&
      logger.info(
        options.package === "npm"
          ? `${options.package} run lint`
          : `${options.package} lint`,
      );

    options.useEslint && console.log();

    options.useVitest &&
      logger.info(`${options.package} run test:unit to run tests`);

    options.useVitest && console.log();

    options.useTypeScript && logger.info(`${options.package} run type-check`);
  } else {
    logger.info(`npm install - To install dependencies`);

    console.log();

    options.useEslint && logger.info("npm run lint to format your code");

    options.useEslint && console.log();

    logger.info("npm run dev to start the dev server");

    options.useVitest && console.log();

    options.useVitest && logger.info("npm run test:unit to run tests");

    options.useTypeScript && console.log();

    options.useTypeScript && logger.info("npm run type-check");
  }
}
export default installDeps;
