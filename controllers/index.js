
module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html', {
            title: 'welcome',
            header_text: {
                h1: 'Getting started',
                p: 'welcome!'
            }
        });
        await next();
        
    }
};