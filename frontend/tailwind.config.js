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
                    DEFAULT: '#0284C7',
                    light: '#38BDF8',
                    dark: '#075985'
                },
                secondary: '#06B6D4'
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
