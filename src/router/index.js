const Router = require('koa-router');
const route = new Router();
const axios = require('axios');
const request = require('superagent');
const music = new Router();
music.get('/test', async(ctx, next) => {
    console.log(ctx);
    return ctx.body ={
        status: 200,
        data: 1
    }
});
music.post('/searchname', async(ctx, next) => {
    console.log(ctx);
    let reqData = ctx.request.body;
    console.log(reqData);
    let data = await request
        .post('https://music.bbbbbb.me/')
        .set('Host', 'music.bbbbbb.me')
        .set('Origin', 'http://music.bbbbbb.me')
        .set('Referer', `http://music.bbbbbb.me/?name=${encodeURI(reqData.search)}&type=qq`)
        .set('Content-Type', `application/x-www-form-urlencoded`)
        .set('X-Requested-With', `XMLHttpRequest`)
        .send({
            input: reqData.search,
            filter: reqData.filter,
            type: reqData.type,
            page: reqData.page
        })
        .then((res) => {
            // console.log(res);
            // console.log(JSON.parse(res.text));
            // searchMusicResult();
            return JSON.parse(res.text);
        });
    return ctx.body ={
        status: 200,
        data: data
    }
});
music.post('/searchid', async(ctx, next) => {
    console.log(ctx);
    return ctx.body ={
        status: 200,
        data: 1
    }
});
music.post('/recommend', async(ctx, next) => {
    console.log(ctx);
    return ctx.body ={
        status: 200,
        data: 1
    }
});
route.use('/v1/music', music.routes(), music.allowedMethods());
module.exports ={
    route
};