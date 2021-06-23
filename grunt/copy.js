module.exports = {
    fonts: {
        files: [
            {
                expand: true,
                src: '**/*',
                cwd: 'app/fonts/',
                dest: 'dist/fonts'
            }
        ]
    },
    images: {
        files: [
            {
                expand: true,
                src: '**/*',
                cwd: 'app/img/',
                dest: 'dist/img'
            }
        ]
    }
};
