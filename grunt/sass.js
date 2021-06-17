const sass = require('node-sass');
module.exports = {
    options: {
        implementation: sass,
        outputStyle: 'compressed',
        noCache: true,
        sourceMap: true
    },
    theme: {
        files: {
            'dist/css/styles.min.css': [
                'app/scss/style.scss'
            ]
        }
    }
};
