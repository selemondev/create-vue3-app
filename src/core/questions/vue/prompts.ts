const prompt = [
    {
        name: 'useRouter',
        type: () => 'toggle',
        message: 'Add Vue Router for Single Page Application development?',
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
        name: 'useTanStackVueQuery',
        type: () => 'toggle',
        message: 'Add TanStack Vue Query for server state management?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
    },

    {
        name: 'useVitest',
        type: () => 'toggle',
        message: 'Add Vitest for unit testing?',
        initial: false,
        active: 'Yes',
        inactive: 'No'
    }
]
export default prompt
