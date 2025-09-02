import { Options } from "../core/utils/vue/options";

export const packageManagerExecutable = (
  packageManager: Options["package"],
) => {
  switch (packageManager) {
    case "npm":
      return "npx";

    case "yarn":
      return "yarn dlx";

    case "pnpm":
      return "pnpx";

    case "bun":
      return "bunx";

    default:
      return "npx";
  }
};
