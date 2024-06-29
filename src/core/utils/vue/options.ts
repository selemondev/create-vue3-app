export interface Options {
    templatePath?: string
    Router?: string
    Tailwind?: string
    TypeScript?: string
    JavaScript?: string
    VueUse?: string
    Pinia?: string
    DevTool?: string
    Eslint?: string
    Vitest?: string
    VercelCLI?: string
    NetlifyCLI?: string
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
    useVercelCLI?: boolean
    useNetlifyCLI?: boolean
    useVueQuery?: boolean
    useTailwind?: boolean
    useTypeScript?: boolean
    useVueUse?: boolean
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