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
        let prettierCode: string = '';

        const language = options.useTypeScript ? 'vue-ts' : 'vue-js';

        const templatePath = path.resolve(__dirname, `../template/${language}`)

        const file = path.parse(filePath);

        const dest = path.resolve(process.cwd(), name)

        const readFilePath = path.resolve(dest, file.dir, `${file.name}.ejs`)

        const outputFilePath = path.resolve(dest, filePath)

        const templateCode = await fs.readFile(readFilePath)

        const code = ejs.render(templateCode.toString(), options);

        const extname = path.extname(filePath).replace(/[.]/g, '')
        const opts = await prettier.resolveConfig(templatePath)

        try {
            switch (extname) {
                case 'ts':
                case 'tsx':
                case 'jsx':
                case 'js':
                    prettierCode = await prettier.format(code, {
                        parser: 'babel',
                        ...opts
                    });
                    break;
                case 'json':
                    prettierCode = await prettier.format(code, {
                        parser: "json",
                        ...opts
                    });
                    break;
                case 'cjs':
                    prettierCode = await prettier.format(code, {
                        parser: "babel",
                        ...opts
                    });
                    break;
                case 'toml':
                    prettierCode = code
                    break;
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
