import pc from "picocolors";

export const logger = {
  info: (...args: string[]) => {
    console.log(pc.cyan(args.map(String).join(" ")));
  },

  error: (...args: string[]) => {
    console.log(pc.red(args.map(String).join(" ")));
  },

  warning: (...args: string[]) => {
    console.log(pc.yellow(args.map(String).join(" ")));
  },

  success: (...args: string[]) => {
    console.log(pc.green(args.map(String).join(" ")));
  },
};
