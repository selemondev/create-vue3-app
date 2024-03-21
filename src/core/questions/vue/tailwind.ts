const tailwindPrompt = [
    {
        name: 'useTailwind',
        type: () => 'toggle',
        message: 'Add TailwindCSS for styling?',
        initial: true,
        active: 'Yes',
        inactive: 'No'
    }
];

export default tailwindPrompt;