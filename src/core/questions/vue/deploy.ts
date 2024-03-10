export default {
    name: 'deploy',
    type: 'select',
    message: 'Where should we deploy your project?',
    choices: [
        { title: 'I prefer manual deployment', value: 'none' },
        {
            title: 'Vercel',
            value: 'vercel'
        },
        {
            title: 'Netlify',
            value: 'netlify'
        }
    ]
}

