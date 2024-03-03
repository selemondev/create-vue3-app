import { runPrompt } from '../../core/questions/vue'
import options from '../../core/utils/vue/options';
import fs from 'fs-extra';
const frameQuestions = new Map()
frameQuestions.set('vue', runPrompt);

export function getFilterFile() {
  console.log('Frame questions', frameQuestions)
  async function vueFilterFileActions() {
    if (!options.useRouter) {
      fs.remove(`${options.dest}/src/router`)
    }

    if (!options.useTailwind) {
      fs.remove(`${options.dest}/tailwind.config.js`);
      fs.remove(`${options.dest}/postcss.config.js`);
    };

    if (options.useTailwind) {
      fs.remove(`${options.dest}/src/assets/css/base.css`);
    }


    if (options.useTailwind === false) {
      fs.remove(`${options.dest}/src/assets/css/tailwind.css`);
    }

    if (options.useJavaScript) {
      fs.remove(`${options.dest}/src/main.ts`);
    }


    if (!options.usePrettier) {
      fs.remove(`${options.dest}/.prettierrc.js`)
    }

    if (!options.usePinia) {
      fs.remove(`${options.dest}/src/stores`)
    }

    if (!options.useEslint) {
      fs.remove(`${options.dest}/.eslintrc.js`)
    }
    return true
  }
  const obj = new Map([
    ['vue', vueFilterFileActions],
  ])
  const res = obj.get('vue');
  return res
}
export { frameQuestions }
