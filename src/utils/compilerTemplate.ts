import { renderFile } from 'ejs'
import { resolve, dirname } from 'path'
import fs from 'fs'

const { promises, existsSync, mkdirSync } = fs;

const ejsCompile = (templatePath: string, data = {}, options = {}) => {
  return new Promise((resolve, reject) => {
    renderFile(templatePath, { data }, options, (err, str) => {
      if (err) {
        reject(err)
        return
      }
      resolve(str)
    })
  })
}

const createDirSync = (pathName: string): any => {
  if (existsSync(pathName)) {
    return true
  } else {
    if (createDirSync(dirname(pathName))) {
      mkdirSync(pathName)
      return true
    }
  }
}

const writeToFile = (path: string, content: string) => {
  return promises.writeFile(path, content)
}

const handleEjsToFile = async (name: string, dest: string, template: string, filename: string) => {
  const templatePath = resolve(__dirname, template)

  const result = await ejsCompile(templatePath, {
    name,
    lowerName: name.toLowerCase()
  })
  createDirSync(dest)
  const targetPath = resolve(dest, filename)
  writeToFile(targetPath, result)
}
export { ejsCompile, writeToFile, createDirSync, handleEjsToFile }
