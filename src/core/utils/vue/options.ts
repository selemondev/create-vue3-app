interface Options {
    templatePath?: string
    Router?: string
    Tailwind?: string
    TypeScript?: string
    JavaScript?: string
    Pinia?: string
    DevTool?: string
    Eslint?: string
    Vitest?: string
    TanStackVueQuery?: string
    name?: string
    version?: string
    src?: string
    dest?: string
    allPackages?: any[]
    package?: 'bun' | 'pnpm' | 'npm' | 'yarn' | 'none'
    deploy?: 'netlify' | 'vercel' | 'none',
    useEslint?: boolean
    useEslintTs?: boolean
    useRouter?: boolean
    useVueQuery?: boolean
    useTailwind?: boolean
    useTypeScript?: boolean
    useJavaScript?: boolean
    useTanStackVueQuery?: string
    useVitest?: string
    useDevTool?: boolean
    useGitInit?: boolean
    usePinia?: boolean
    EslintScript?: string
    constantDevDeps?: string
    constantProDeps?: string
  }
  
  const options: Options = {}
  export default options