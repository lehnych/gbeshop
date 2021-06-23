module.exports = {

    development: {
        files: [ 'app/**/*.js', 'app/**/*.scss', 'app/**/*.pug' ],
        tasks: [ 'development' ],
        options: {
            livereload: true
        }
    }
};
