const MyKoa = require('./myKoa')

const app = new MyKoa()

// logger
app.use(async (ctx, next) => {
    console.log(1)
    await next();
    console.log('end-1')
});

// x-response-time
app.use(async (ctx, next) => {
    console.log(2)
    await next();
    console.log('end-2')
});

// response
app.use(async ctx => {
    ctx.res.end('hello world')
});

app.listen(8000);

