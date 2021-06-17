module.exports = {
    options:{
        sourceMap: true
    },

    theme: {
        files: {
            'dist/js/script.min.js': [
                'app/vendor/jquery/js/jquery-3.5.1.js',
                'app/vendor/bootstrap/js/bootstrap.bundle.js',
                'app/vendor/picturefill/js/picturefill.js',
                'app/vendor/custom-file-input/js/custom-file-input.js',
                'app/vendor/aos/js/aos.js',
                'app/vendor/swiper/js/swiper.js',
                'app/js/main.js'
            ]
        }
    }
};
