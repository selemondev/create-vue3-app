const prompt = [
    {
        name: 'useTypeScript',
        type: () => 'toggle',
        message: 'Add TypeScript for type safety?',
        initial: true,
        active: 'Yes',
        inactive: 'No'
    },
    {
        name: 'useRouter',
        type: () => 'toggle',
        message: 'Add Vue Router for Single Page Application development?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
    },

    {
        name: 'useTailwind',
        type: () => 'toggle',
        message: 'Add TailwindCSS for styling?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
    },
    {
        name: 'usePinia',
        type: () => 'toggle',
        message: 'Add Pinia for state management?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
    },
    {
        name: 'useEslint',
        type: () => 'toggle',
        message: 'Add ESLint for code quality?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
    },
    {
        name: 'usePrettier',
        type: () => 'toggle',
        message: 'Add Prettier for code formatting?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
    }
]
export default prompt
