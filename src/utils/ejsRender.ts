import ejs from "ejs";
import fs from 'fs-extra'
import path from "path";
import { format as prettierFormatter } from "prettier/standalone";
import * as prettierPluginBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettierPluginHtml from "prettier/plugins/html";
import * as prettierPluginTypescript from "prettier/plugins/typescript";
import * as prettierPluginPostcss from "prettier/plugins/postcss";
import options from '../core/utils/vue/options'

// formatting the code
export async function ejsRender(filePath: string, name: string): Promise<void> {
    try {
        let prettierCode: string = '';

        const file = path.parse(filePath);

        const dest = path.resolve(process.cwd(), name)

        const readFilePath = path.resolve(dest, file.dir, `${file.name}.ejs`)

        const outputFilePath = path.resolve(dest, filePath)

        const templateCode = await fs.readFile(readFilePath)

        const code = ejs.render(templateCode.toString(), options);

        const extname = path.extname(filePath).replace(/[.]/g, '')

        try {
            switch (extname) {
                case 'vue':
                    prettierCode = await prettierFormatter(code, {
                        parser: 'vue',
                        plugins: [
                            prettierPluginHtml,
                            prettierPluginBabel,
                            prettierPluginEstree,
                            prettierPluginTypescript,
                            prettierPluginPostcss
                        ]
                    });
                    break;
                case 'ts':
                case 'tsx':
                case 'jsx':
                case 'js':
                    prettierCode = await prettierFormatter(code, {
                        parser: 'babel',
                        plugins: [prettierPluginBabel, prettierPluginEstree]
                    });
                    break;
                case 'json':
                    prettierCode = await prettierFormatter(code, {
                        parser: "json",
                        plugins: [prettierPluginBabel, prettierPluginEstree]
                    });
                    break;
                case 'cjs':
                    prettierCode = await prettierFormatter(code, {
                        parser: "babel",
                        plugins: [prettierPluginBabel, prettierPluginEstree]
                    });
                    break;
                case 'html':
                    prettierCode = await prettierFormatter(code, {
                        parser: 'html',
                        plugins: [prettierPluginHtml]
                    });
                    break;
                case 'css':
                case 'scss':
                case 'less':
                    prettierCode = await prettierFormatter(code, {
                        parser: 'css',
                        plugins: [prettierPluginPostcss]
                    });
                    break;
                case 'toml':
                    prettierCode = code
                    break
                default:
                    // Fallback: keep code as-is to avoid pulling extra parsers
                    prettierCode = code
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
