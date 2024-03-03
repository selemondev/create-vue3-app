import ejs from "ejs";
import fs from 'fs-extra'
import path from "path";
import prettier from "prettier"
import options from '../core/utils/vue/options'
import { fileURLToPath } from "node:url";
import { dirname } from "path";

// formatting the code

export async function ejsRender(filePath: string, name: string): Promise<void> {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        let prettierCode: string
        // 根目录template 绝对路径
        const templatePath = path.resolve(__dirname, `../template/vue`)
        // 获取当前渲染文件的 各种 参数 such as ext
        const file = path.parse(filePath)
        // 编译根目录 创建的根目录
        const dest = path.resolve(process.cwd(), name)
        // 当前 需要编译的 ejs文件
        const readFilePath = path.resolve(dest, file.dir, `${file.name}.ejs`)
        // 转换 之后的 js or ts or vue 文件
        const outputFilePath = path.resolve(dest, filePath)
        // 是一个buffer
        const templateCode = await fs.readFile(readFilePath)
        // 编译当前code
        const code = ejs.render(templateCode.toString(), options)
        // 获取后缀
        const extname = path.extname(filePath).replace(/[.]/g, '')
        const opts = await prettier.resolveConfig(templatePath)

        try {
            switch (extname) {
                case 'ts':
                    prettierCode = await prettier.format(code, {
                        parser: 'babel',
                        ...opts
                    })
                    break
                case 'tsx':
                    prettierCode = await prettier.format(code, {
                        parser: 'babel',
                        ...opts
                    })
                    break
                case 'jsx':
                    prettierCode = await prettier.format(code, {
                        parser: 'babel',
                        ...opts
                    })
                    break
                case 'js':
                    prettierCode = await prettier.format(code, {
                        parser: 'babel',
                        ...opts
                    })
                    break
                case '':
                    prettierCode = code
                    break
                default:
                    prettierCode = await prettier.format(code, { parser: extname })
                    break
            }
        } catch (err) {
            console.log(err)
        }
        await fs.outputFile(outputFilePath, prettierCode)
        await fs.remove(readFilePath)
    } catch (error) {
        console.log(error)
    }
}
