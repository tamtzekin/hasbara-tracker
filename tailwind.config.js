/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],  
        theme: {
            screens: {
                'mobile': {'max': '576px'}, // => @media (max-width: 576px)
                'tablet': '767px',
                'laptop': '1024px',
                'desktop': '1280px',
            },

            colors: {
                'grey-light': '#f0f0f0',
                'grey': '#d6d6d6',
                'grey-faded': '#5e5e5e',
                'grey-darker': '#cbcbcb',
                'grey-darkest':'#595959',
                'blue': '#b7fbf3',
                'green': '#78ff96',
                'green-light': '#bffb9b',
                'green-bright': '#9dff20',
            },

            fontFamily: {
                'helvetica': ['Helvetica', 'sans-serif'],
                'lores': ['LoRes_Regular', 'monospace'],
                'mono': ['CartographCF_Light', 'monospace'],
            },
            
            fontSize: {
                xs: '0.9em',
                sm: '1em',
                md: '1.1em',
                lg: '1.3em',
            }
        },
}
