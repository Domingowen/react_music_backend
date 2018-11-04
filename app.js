const Koa = require('koa');
const KoaBodyParser = require('koa-bodyparser');
const Koacors = require('koa2-cors');
const KoaRouter = require('koa-router');
const {route} = require('./src/router/index.js');
const app = new Koa();
app.use(Koacors());
app.use(KoaBodyParser());
app.use(route.routes(), route.allowedMethods());
app.listen('20200', () => {
    console.log("服务器已启动");
});