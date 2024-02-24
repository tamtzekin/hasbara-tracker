/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],  
        theme: {
            colors: {
                'grey': 'rgb(94, 94, 94)',
                'grey-light': '',
                'green-light': '',
            },
            fontSize: {
                sm: '1em',
            }
        },
    fontFamily: {
        sans: ['Helvetica', 'sans-serif'],
    },

}
