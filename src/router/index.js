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
music.post('/toplist', async(ctx, next) => {
    let requestData  = ctx.request.body;
    console.log(requestData);
    let data = await request
        .get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg')
        .set('referer', 'https://y.qq.com/n/yqq/toplist/4.html')
        .query({
            // callback: 'recom06006992464842109',
            // jsonpCallback: "recom06006992464842109",
            g_tk: '5381',
            tpl: 3,
            page: 'detail',
            date: requestData.date,
            topid: requestData.topId,
            inCharset: 'utf8',
            outCharset: 'utf-8',
            type: 'top',
            song_begin: 0,
            format: 'json',
            song_num: 5,
            notice: 0,
            loginUin: 0,
            hostUin: 0,
            platform: 'yqq',
            needNewCode: 0,
        })
        .then((res) => {
            // console.log(res);
            return JSON.parse(res.text);
        });
    return ctx.body= {
        status: 200,
        data: data
    }
});
music.post('/recommend', async(ctx, next) => {
    let requestData  = ctx.request.body;
    let data = await request
        .get('https://u.y.qq.com/cgi-bin/musicu.fcg')
        .set('referer', 'https://y.qq.com/')
        .query({
            // callback: 'recom06006992464842109',
            // jsonpCallback: "recom06006992464842109",
            g_tk: '5381',
            loginUin: 0,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0,
            data: JSON.stringify(
                {
                    "comm":{"ct":24},
                    "category":{
                        "method":"get_hot_category",
                        "param":{"qq":""},
                        "module":"music.web_category_svr"
                    },
                    "recomPlaylist":{
                        "method":"get_hot_recommend",
                        "param":{"async":1,"cmd":2},
                        "module":"playlist.HotRecommendServer"},
                    "playlist":{
                        "method":"get_playlist_by_category",
                        "param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},
                        "module":"playlist.PlayListPlazaServer"},
                    "new_song":{
                        "module":"QQMusic.MusichallServer",
                        "method":"GetNewSong",
                        "param":{"type":0}},
                    "new_album":{
                        "module":"music.web_album_library",
                        "method":"get_album_by_tags",
                        "param":{
                            "area":1,
                            "company":-1,
                            "genre":-1,
                            "type":-1,
                            "year":-1,
                            "sort":2,
                            "get_tags":1,
                            "sin":0,
                            "num":40,
                            "click_albumid":0}
                            },
                    "toplist":{
                        "module":"music.web_toplist_svr",
                        "method":"get_toplist_index",
                        "param":{}
                        },
                    "focus":{
                        "module":"QQMusic.MusichallServer",
                        "method":"GetFocus",
                        "param":{}
                    }
                })
        })
        .then((res) => {
            // console.log(res);
            return JSON.parse(res.text);
        });
    return ctx.body= {
        status: 200,
        data: data
    }
});
music.post('/sing_service', async(ctx, next) => {
    let requestData = ctx.request.body;
    let data = await request
        .get('https://u.y.qq.com/cgi-bin/musicu.fcg')
        .set('referer', 'https://y.qq.com')
        .query({
            g_tk: '5381',
            loginUin: 0,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0,
            data: JSON.stringify(
                {
                    "comm":{"ct":24},
                    "playlist":{
                        "method":"get_playlist_by_category",
                        "param":{"id":requestData.id,"curPage":1,"size":40,"order":5,"titleid":requestData.id},
                        "module":"playlist.PlayListPlazaServer"}
                }
            )
        })
        .then((res) => {
            return JSON.parse(res.text);
        });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/sing_recommend', async(ctx, next) => {
    let requestData = ctx.request.body;
    let data = await request
        .get('https://u.y.qq.com/cgi-bin/musicu.fcg')
        .set('referer', 'https://y.qq.com')
        .query({
            g_tk: '5381',
            loginUin: 0,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0,
            data: JSON.stringify(
                {"comm": {"ct":24},
                    "recomPlaylist": {
                        "method":"get_hot_recommend",
                        "param":{"async":1,"cmd":2},
                        "module":"playlist.HotRecommendServer"}
                }
            )
        })
        .then((res) => {
            return JSON.parse(res.text);
        });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/sing_new', async(ctx,next) => {
    let requestData = ctx.request.body;
    let data = await request
        .get('https://u.y.qq.com/cgi-bin/musicu.fcg')
        .set('referer', 'https://y.qq.com')
        .query({
            g_tk: '5381',
            loginUin: 0,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0,
            data: JSON.stringify(
                {   "comm":{"ct":24},
                    "new_song":{
                        "module":"QQMusic.MusichallServer",
                        "method":"GetNewSong",
                        "param":{"type":requestData.type}}
                }
            )
        })
        .then((res) => {
            return JSON.parse(res.text);
        });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/sing_album', async(ctx, next) => {
    let requestData = ctx.request.body;
    let data = await request
        .get('https://u.y.qq.com/cgi-bin/musicu.fcg')
        .set('referer', 'https://y.qq.com')
        .query({
            g_tk: '5381',
            loginUin: 0,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0,
            data: JSON.stringify(
                {   "comm":{"ct":24},
                    "new_album":{
                        "module":"music.web_album_library",
                        "method":"get_album_by_tags",
                        "param":{
                            "area":requestData.area,
                            "company":-1,
                            "genre":-1,
                            "type":-1,
                            "year":-1,
                            "sort":2,
                            "get_tags":1,
                            "sin":0,
                            "num":40,
                            "click_albumid":0}
                    }
                }
            )
        })
        .then((res) => {
            return JSON.parse(res.text);
        });
    return ctx.body = {
        status: 200,
        data: data
    }
});

route.use('/v1/music', music.routes(), music.allowedMethods());
module.exports ={
    route
};