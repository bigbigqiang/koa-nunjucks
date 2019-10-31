module.exports = {
    'GET /register': async (ctx, next) => {
        ctx.render('register.html', {
            title: 'register',
            header_text: {
                h1: 'Getting started',
                p: 'register!'
            }
        });
    }
};