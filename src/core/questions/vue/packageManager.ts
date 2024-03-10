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
        title: isBunInstalled ? 'Bun' : 'Bun not installed',
        value: 'bun'
    },
    {
      title: isPnpmInstalled ? 'Pnpm' : 'Pnpm not installed',
      value: 'pnpm'
    },
    {
      title: isYarnInstalled ? 'Yarn' : 'Yarn not installed',
      value: 'yarn'
    },
    { title: 'Npm', value: 'npm' }
  ]
}

