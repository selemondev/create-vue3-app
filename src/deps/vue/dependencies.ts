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
};

const vueUse = {
    name: '@vueuse/core',
    version: '^10.9.0',
    stableVersion: '^10.9.0',
    env: 'pro'
}

const typescript = {
    name: [
        'typescript', 'vue-tsc', '@tsconfig/node20', "@vue/tsconfig", "npm-run-all2", '@types/node'
    ],
    version: ['~5.3.0', '^1.8.25', "^20.1.2", "^0.5.1", "^6.1.1", "^20.11.10"],
    stableVersion: ['~5.3.0', '^1.8.25', "^20.1.2", "^0.5.1", "^6.1.1", "^20.11.10"],
    dev: ['dev', 'dev', 'dev', 'dev', 'dev', 'dev', 'dev', 'dev']
}

const javascript = {
    name: [],
    version: [],
    stableVersion: [],
    dev: []
};

const tanStackVueQuery = {
    name: [
        "@tanstack/vue-query",
        "@tanstack/vue-query-devtools"
    ],
    version: ["^5.25.0", "^5.25.0"],
    stableVersion: ["^5.25.0", "^5.25.0"],
    dev: ['pro', 'pro']
}

const devTool = {
    name: 'vite-plugin-vue-devtools',
    version: '^7.0.16',
    stableVersion: '^7.0.16',
    dev: 'pro'
}

const vitest = {
    name: ['vitest', 'jsdom', "@vue/test-utils"],
    version: ["^1.2.2", "^24.0.0", "^2.4.4"],
    stableVersion: ["^1.2.2", "^24.0.0", "^2.4.4"],
    dev: ['dev', 'dev', 'dev']
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
    devTool,
    tailwind,
    eslintTsPlugin,
    javascript,
    typescript,
    vitest,
    tanStackVueQuery,
    eslintJsVue,
    vueUse,
    pinia,
    router
}
