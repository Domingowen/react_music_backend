const Koa = require('koa');
const KoaBodyParser = require('koa-bodyparser');
const Koacors = require('koa2-cors');
const KoaRouter = require('koa-router');
// const request = require('superagent');
const {route} = require('./src/router/index.js');
// const Router = new KoaRouter();
const app = new Koa();
// Router.post('/music/search', async (ctx, next) => {
//     let reqData = ctx.request.body;
//     console.log(reqData);
//     let data = await request
//         .post('https://music.bbbbbb.me/')
//         .set('Host', 'music.bbbbbb.me')
//         .set('Origin', 'http://music.bbbbbb.me')
//         .set('Referer', `http://music.bbbbbb.me/?name=${encodeURI(reqData.search)}&type=qq`)
//         .set('Content-Type', `application/x-www-form-urlencoded`)
//         .set('X-Requested-With', `XMLHttpRequest`)
//         .send({
//             input: reqData.search,
//             filter: reqData.filter,
//             type: reqData.type,
//             page: reqData.page
//         })
//         .then((res) => {
//             // console.log(res);
//             // console.log(JSON.parse(res.text));
//             // searchMusicResult();
//             return JSON.parse(res.text);
//         });
//     return ctx.body ={
//         status: 200,
//         data: data
//     }
// });
app.use(Koacors());
app.use(KoaBodyParser());
app.use(route.routes(), route.allowedMethods());
app.listen('20200', () => {
    console.log("服务器已启动");
});