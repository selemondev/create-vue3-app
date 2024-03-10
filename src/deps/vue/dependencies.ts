import options from '../../core/utils/vue/options'
const router = {
    name: 'vue-router',
    version: '^4.2.5',
    stableVersion: '4.2.4',
    env: 'pro'
}
const pinia = {
    name: 'pinia',
    version: '^2.1.7',
    stableVersion: '2.1.7',
    env: 'pro'
}

const prettier = {
    name: 'prettier',
    version: '^3.1.1',
    stableVersion: '^3.1.1',
    env: 'dev'
}

const eslintJsVue = {
    name: ['eslint-plugin-vue', 'eslint'],
    version: ["^9.17.0", "^8.49.0"],
    stableVersion: ["^9.17.0", "^8.49.0"],
    env: ['dev', 'dev']
}

const eslintTsPlugin = {
    name: [
        'eslint',
        'eslint-plugin-vue',
        "@vue/eslint-config-typescript",
        "@rushstack/eslint-patch"
    ],
    version: ["^8.49.0", "^9.17.0", "^12.0.0", "^1.3.3"],
    stableVersion: ['^8.18.0', "^9.17.0", "^12.0.0", "^1.3.3"],
    env: ['dev', 'dev', 'dev', 'dev']
}

const tailwind = {
    name: [
        'tailwindcss',
        'postcss',
        'autoprefixer'
    ],
    version: ['^3.4.1', '^8.4.35', '^10.4.18'],
    stableVersion: ['^3.4.1', '^8.4.35', '^10.4.18'],
    env: ['dev', 'dev', 'dev']
}

const eslintWithPrettier = {
    name: ['eslint-config-prettier', 'eslint-plugin-prettier'],
    version: ['^9.1.0', '^5.0.1'],
    stableVersion: ['^8.5.0', '^4.2.1'],
    env: 'dev'
};

const typescript = {
    name: [
        'typescript', 'vue-tsc', '@tsconfig/node20', "@vue/tsconfig", "npm-run-all2", '@types/node'
    ],
    version: ['^5.3.3', '^1.8.25', "^20.1.2", "^0.5.1", "^6.1.1", "^20.11.10"],
    stableVersion: ['^5.3.3', '^1.8.25', "^20.1.2", "^0.5.1", "^6.1.1", "^20.11.10"],
    dev: ['dev', 'dev', 'dev', 'dev', 'dev', 'dev', 'dev', 'dev']
}

const javascript = {
    name: [],
    version: [],
    stableVersion: [],
    dev: []
}

const constantDevDeps = {
    name: options.useTypeScript ? typescript.name : javascript.name,
    version: options.useTypeScript ? typescript.version : javascript.version,
    stableVersion: options.useTypeScript ? typescript.stableVersion : javascript.stableVersion,
    dev: options.useTypeScript ? typescript.dev : javascript.dev
}
const constantProDeps = {
    name: ['vue'],
    version: ['^3.4.15'],
    stableVersion: ['^3.4.15'],
    dev: ['pro']
}
export {
    constantDevDeps,
    constantProDeps,
    eslintWithPrettier,
    tailwind,
    eslintTsPlugin,
    javascript,
    typescript,
    eslintJsVue,
    prettier,
    pinia,
    router
}