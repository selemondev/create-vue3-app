import options from '../core/utils/vue/options';
import fs from 'fs-extra';

export function getFilterFile() {
  async function vueFilterFileActions() {
    if (!options.useRouter) {
      await fs.remove(`${options.dest}/src/views`)
      await fs.remove(`${options.dest}/src/router`)
    }

    if (!options.useTailwind) {
      await fs.remove(`${options.dest}/tailwind.config.js`);
      await fs.remove(`${options.dest}/postcss.config.js`);
    };

    if (options.useTailwind) {
      await fs.remove(`${options.dest}/src/assets/css/base.css`);
    }

    if (options.deploy === 'none') {
      await fs.remove(`${options.dest}/netlify.toml`);
      await fs.remove(`${options.dest}/vercel.json`);
    }

    if (options.deploy === "netlify") {
      await fs.remove(`${options.dest}/vercel.json`);
    }

    if (options.deploy === "vercel") {
      await fs.remove(`${options.dest}/netlify.toml`);
    }


    if (options.useTailwind === false) {
      await fs.remove(`${options.dest}/src/assets/css/tailwind.css`);
    }

    if (options.useJavaScript) {
      await fs.remove(`${options.dest}/src/main.ts`);
    }

    if (!options.useVitest) {
      await fs.remove(`${options.dest}/vitest.config.ts`);
      await fs.remove(`${options.dest}/vitest.config.js`);
      await fs.remove(`${options.dest}/tsconfig.vitest.json`);
      await fs.remove(`${options.dest}/src/components/__tests__`);
    }

    if (!options.usePinia) {
      await fs.remove(`${options.dest}/src/stores`)
    }

    if (!options.useEslint) {
      await fs.remove(`${options.dest}/eslint.config.js`)
    }
    return true
  }
  const obj = new Map([
    ['vue', vueFilterFileActions],
  ])
  const res = obj.get('vue');
  return res
}
