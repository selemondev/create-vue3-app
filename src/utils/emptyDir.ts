import * as fs from 'fs'

import { postOrderDirectoryTraverse } from './directoryTraverse'

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return
  }

  postOrderDirectoryTraverse(
    dir,
    (dir: string) => fs.rmdirSync(dir),
    (file: string) => fs.unlinkSync(file)
  )
}
export default emptyDir
