import { render } from "ejs";
import { readFile, outputFile, remove } from 'fs-extra'
import { resolve, extname, parse } from "path";
import { format as prettierFormatter } from "prettier/standalone"
import parserBabel from "prettier/parser-babel";
import parserEstree from "prettier/plugins/estree";
import options from '../core/utils/vue/options'

// formatting the code

export async function ejsRender(filePath: string, name: string): Promise<void> {
    try {
        let prettierCode: string = '';

        const file = parse(filePath);

        const dest = resolve(process.cwd(), name)

        const readFilePath = resolve(dest, file.dir, `${file.name}.ejs`)

        const outputFilePath = resolve(dest, filePath)

        const templateCode = await readFile(readFilePath)

        const code = render(templateCode.toString(), options);

        const extensionName = extname(filePath).replace(/[.]/g, '')

        try {
            switch (extensionName) {
                case 'ts':
                case 'tsx':
                case 'jsx':
                case 'js':
                    prettierCode = await prettierFormatter(code, {
                        parser: 'babel',
                        plugins: [parserBabel, parserEstree]
                    });
                    break;
                case 'json':
                    prettierCode = await prettierFormatter(code, {
                        parser: "json",
                        plugins: [parserBabel, parserEstree]
                    });
                    break;
                case 'cjs':
                    prettierCode = await prettierFormatter(code, {
                        parser: "babel",
                        plugins: [parserBabel, parserEstree]
                    });
                    break;
                case 'toml':
                    prettierCode = code
                    break;
                case '':
                    prettierCode = code
                    break
                default:
                    prettierCode = await prettierFormatter(code, { parser: extname })
                    break
            }
        } catch (err) {
            console.log(err)
        }
        await outputFile(outputFilePath, prettierCode)
        await remove(readFilePath)
    } catch (error) {
        console.log(error)
    }
}
