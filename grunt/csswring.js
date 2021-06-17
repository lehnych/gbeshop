module.exports = function (grunt, options) {
    return {
        options: {
            report: "gzip",
            removeAllComments: true,
            preserveHacks: true
        },

        vendor: {
            src: [
                'app/css/styles.min.css'
            ],

            dest: 'dist/css/styles.min.css'
        }
    };
};
