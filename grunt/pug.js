module.exports = {
    compile: {
        options: {
            pretty: true,
        },
        files: {
            'dist/elements.html':     'app/pug/elements.pug',
            'dist/index.html':        'app/pug/index.pug',
            'dist/catalog.html':      'app/pug/catalog.pug',
            'dist/product.html':      'app/pug/product.pug',
            'dist/cart.html':         'app/pug/cart.pug',
            'dist/registration.html': 'app/pug/registration.pug',
        }
    }
};
