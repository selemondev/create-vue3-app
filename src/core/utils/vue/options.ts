interface Options {
    templatePath?: string
    Router?: string
    Tailwind?: string
    TypeScript?: string
    JavaScript?: string
    Pinia?: string
    Eslint?: string
    Prettier?: string
    name?: string
    version?: string
    src?: string
    dest?: string
    allPackages?: any[]
    package?: 'bun' | 'pnpm' | 'npm' | 'yarn' | 'none'
    useEslint?: boolean
    usePrettier?: boolean
    useRouter?: boolean
    useTailwind?: boolean
    useTypeScript?: boolean
    useJavaScript?: boolean
    usePinia?: boolean
    EslintScript?: string
    PrettierScript?: string
    EslintWithPrettierScript?: string
    constantDevDeps?: string
    constantProDeps?: string
  }
  
  const options: Options = {}
  export default options