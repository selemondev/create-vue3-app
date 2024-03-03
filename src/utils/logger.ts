import chalk from "chalk";

export const logger = {
    info: (...args: any[]) => {
        console.log(chalk.cyan(...args))
    },

    error: (...args: any[]) => { 
        console.log(chalk.red(...args))
    },

    warning: (...args: any[]) => {
        console.log(chalk.yellow(...args))
    },

    success: (...args: any[]) => {
        console.log(chalk.green(...args))
    }
};