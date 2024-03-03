import options from '../../core/utils/vue/options'
const router = {
    name: 'vue-router',
    version: '^4.2.5',
    stableVersion: '4.2.4',
    env: 'pro'
}
const pinia = {
    name: ['pinia', 'pinia-plugin-persistedstate'],
    version: ['^2.1.7', '^3.2.1'],
    stableVersion: ['2.1.7', '^3.2.1'],
    env: 'pro'
}

const prettier = {
    name: 'prettier',
    version: '^3.1.1',
    stableVersion: '^3.1.1',
    env: 'dev'
}

const eslintVue = {
    name: 'eslint-plugin-vue',
    version: '^9.19.2',
    stableVersion: '^9.19.2',
    env: 'dev'
}

const eslintPlugin = {
    name: [
        'eslint',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser'
    ],
    version: ['^8.56.0', '^6.14.0', '^6.14.0'],
    stableVersion: ['^8.18.0', '^5.55.0', '^5.55.0'],
    env: ['dev', 'dev', 'dev']
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
    stableVersion: options.useTypeScript ? typescript.stableVersion : javascript.stableVersion ,
    dev: options.useTypeScript ? typescript.dev : javascript.dev
}
const constantProDeps = {
    name: ['vue'],
    version: ['^3.3.12'],
    stableVersion: ['^3.2.45'],
    dev: ['pro']
}
export {
    constantDevDeps,
    constantProDeps,
    eslintWithPrettier,
    tailwind,
    eslintPlugin,
    javascript,
    typescript,
    eslintVue,
    prettier,
    pinia,
    router
}
