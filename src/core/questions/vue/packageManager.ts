import { shouldUseYarn } from '../../../utils/shouldUseYarn'
import { shouldUsePnpm } from '../../../utils/shouldUsePnpm'
import { shouldUseBun } from '../../../utils/shouldUseBun'
const isYarnInstalled = shouldUseYarn()
const isPnpmInstalled = shouldUsePnpm()
const isBunInstalled = shouldUseBun();
export default {
  name: 'package',
  type: 'select',
  message: 'Which package manager do you prefer to use?',
  choices: [
    { title: 'I prefer manual installation', value: 'none' },
    {
        title: isBunInstalled ? 'Bun' : 'Bun is not installed',
        value: 'bun',
        disabled: isBunInstalled ? false : true
    },
    {
      title: isPnpmInstalled ? 'Pnpm' : 'Pnpm is not installed',
      value: 'pnpm',
      disabled: isPnpmInstalled ? false : true
    },
    {
      title: isYarnInstalled ? 'Yarn' : 'Yarn is not installed',
      value: 'yarn',
      disabled: isYarnInstalled ? false : true
    },
    { title: 'Npm', value: 'npm' }
  ]
}

