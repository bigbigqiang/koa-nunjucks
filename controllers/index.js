const { decodeToken } = require('../accout');
module.exports = {
    'GET /': async (ctx, next) => {
        let token = ctx.cookies.get('token') || ''
        let payload = await decodeToken(token)
        if(token && payload){
            ctx.render('index.html', {
                title: 'welcome',
                header_text: {
                    h1: 'Getting started',
                    p: 'welcome!'
                }
            });
        } else {
            ctx.response.redirect('/login');
        }
        await next();
        
    }
};