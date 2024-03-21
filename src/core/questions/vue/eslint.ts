const eslintPrompt = [
    {
        name: 'useEslint',
        type: () => 'toggle',
        message: 'Add ESLint for code quality?',
        initial: true,
        active: 'Yes',
        inactive: 'No'
    }
];

export default eslintPrompt;