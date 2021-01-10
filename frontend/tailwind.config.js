// import './src/helpers/_Variables.scss';

module.exports = {
    // purge => remove unused styles in production
    purge: [
        './src/**/*.{js,jsx,ts,tsx}', './public/index.html'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontSize: {
                defaultSize: '1.6rem',
                fontMed: '1.4rem'
            },
            colors: {
                primary: {
                    DEFAULT: '#10B981',
                    light: '#34D399',
                    dark: '#047857'
                },
                secondary: '#0891B2'
            }
        },
        container: {
            center: true,
            padding: '2rem',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
