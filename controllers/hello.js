module.exports = {
    'GET /hello': async (ctx, next) => {
        ctx.render('hello.html', {
            title: 'hello koa'
        });
    }
};