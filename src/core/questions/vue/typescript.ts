const typeScriptPrompt = [
    {
        name: 'useTypeScript',
        type: () => 'toggle',
        message: 'Add TypeScript for type safety?',
        initial: true,
        active: 'Yes',
        inactive: 'No'
    }
];

export default typeScriptPrompt;