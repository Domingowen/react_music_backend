const Router = require('koa-router');
const route = new Router();
const axios = require('axios');
const request = require('superagent');
const jsonp = require('superagent-jsonp');
const music = new Router();
music.post('/search', async (ctx, next) => {
    console.log(ctx);
    let reqData = ctx.request.body;
    console.log(reqData);
    let data = await request
        .post('https://www.veligood88.com/music.php')
        .set('Host', 'www.veligood88.com')
        .set('Origin', 'https://www.veligood88.com')
        // .set('Referer', `http://music.bbbbbb.me/?name=${encodeURI(reqData.search)}&type=qq`)
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
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/toplist', async (ctx, next) => {
    let requestData = ctx.request.body;
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
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/recommend', async (ctx, next) => {
    let requestData = ctx.request.body;
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
                    "comm": {"ct": 24},
                    "category": {
                        "method": "get_hot_category",
                        "param": {"qq": ""},
                        "module": "music.web_category_svr"
                    },
                    "recomPlaylist": {
                        "method": "get_hot_recommend",
                        "param": {"async": 1, "cmd": 2},
                        "module": "playlist.HotRecommendServer"
                    },
                    "playlist": {
                        "method": "get_playlist_by_category",
                        "param": {"id": 8, "curPage": 1, "size": 40, "order": 5, "titleid": 8},
                        "module": "playlist.PlayListPlazaServer"
                    },
                    "new_song": {
                        "module": "QQMusic.MusichallServer",
                        "method": "GetNewSong",
                        "param": {"type": 0}
                    },
                    "new_album": {
                        "module": "music.web_album_library",
                        "method": "get_album_by_tags",
                        "param": {
                            "area": 1,
                            "company": -1,
                            "genre": -1,
                            "type": -1,
                            "year": -1,
                            "sort": 2,
                            "get_tags": 1,
                            "sin": 0,
                            "num": 40,
                            "click_albumid": 0
                        }
                    },
                    "toplist": {
                        "module": "music.web_toplist_svr",
                        "method": "get_toplist_index",
                        "param": {}
                    },
                    "focus": {
                        "module": "QQMusic.MusichallServer",
                        "method": "GetFocus",
                        "param": {}
                    }
                })
        })
        .then((res) => {
            // console.log(res);
            return JSON.parse(res.text);
        });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/sing_service', async (ctx, next) => {
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
                    "comm": {"ct": 24},
                    "playlist": {
                        "method": "get_playlist_by_category",
                        "param": {
                            "id": requestData.id,
                            "curPage": 1,
                            "size": 40,
                            "order": 5,
                            "titleid": requestData.id
                        },
                        "module": "playlist.PlayListPlazaServer"
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
music.post('/sing_recommend', async (ctx, next) => {
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
                    "comm": {"ct": 24},
                    "recomPlaylist": {
                        "method": "get_hot_recommend",
                        "param": {"async": 1, "cmd": 2},
                        "module": "playlist.HotRecommendServer"
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
music.post('/sing_new', async (ctx, next) => {
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
                    "comm": {"ct": 24},
                    "new_song": {
                        "module": "QQMusic.MusichallServer",
                        "method": "GetNewSong",
                        "param": {"type": requestData.type}
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
music.post('/sing_album', async (ctx, next) => {
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
                    "comm": {"ct": 24},
                    "new_album": {
                        "module": "music.web_album_library",
                        "method": "get_album_by_tags",
                        "param": {
                            "area": requestData.area,
                            "company": -1,
                            "genre": -1,
                            "type": -1,
                            "year": -1,
                            "sort": 2,
                            "get_tags": 1,
                            "sin": 0,
                            "num": 40,
                            "click_albumid": 0
                        }
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
music.post('/detail_rec', async (ctx, next) => {
    let requestData = ctx.request.body;
    let data = await request
        .get('https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg')
        .set('referer', `https://y.qq.com/n/yqq/playlist/${requestData.contentId}.html`)
        .query({
            type: 1,
            json: 1,
            utf8: 1,
            onlysong: 0,
            disstid: requestData.contentId,
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0
        })
        .then(res => {
            // console.log(JSON.parse(res.text));
            return JSON.parse(res.text)
        });
    // console.log(data);
    return ctx.body = {
        status: 200,
        data: data
    }

});
music.post('/detail_album', async (ctx, next) => {
    let requestData = ctx.request.body;
    let data = await request
        .get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg')
        .set('referer', `https://y.qq.com/n/yqq/album/${requestData.albummid}.html`)
        .query({
            albummid: requestData.albummid,
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0
        })
        .then(res => {
            // console.log(JSON.parse(res.text));
            return JSON.parse(res.text)
        });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/singer_list', async (ctx, next) => {
    let requestData = ctx.request.body;

    let data = await request
        .get('https://u.y.qq.com/cgi-bin/musicu.fcg')
        .set('referer', `https://y.qq.com/portal/singer_list.html`)
        .query({
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0,
            data: JSON.stringify({
                "comm": {"ct": 24, "cv": 10000},
                "singerList": {
                    "module": "Music.SingerListServer",
                    "method": "get_singer_list",
                    "param": {
                        "area": requestData.area,
                        "sex": requestData.sex,
                        "genre": requestData.genre,
                        "index": requestData.alphabet,
                        "sin": requestData.sin,
                        "cur_page": requestData.cur_page
                    }
                }
            })
        })
        .then(res => {
            // console.log(JSON.parse(res.text));
            return JSON.parse(res.text)
        });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/album_list', async (ctx, next) => {
    let requestData = ctx.request.body;
    let data = await request
        .get('https://u.y.qq.com/cgi-bin/musicu.fcg')
        .set('referer', `https://y.qq.com/portal/album_lib.html`)
        .query({
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0,
            data: JSON.stringify({
                "albumlib": {
                    "method": "get_album_by_tags",
                    "param": {
                        "area": requestData.area,
                        "company": -1,
                        "genre": requestData.genre,
                        "type": requestData.type,
                        "year": -1,
                        "sort": requestData.sort,
                        "get_tags": 1,
                        "sin": requestData.sin,
                        "num": requestData.num,
                        "click_albumid": 0
                    },
                    "module":
                        "music.web_album_library"
                }
            })
        })
        .then(res => {
            // console.log(JSON.parse(res.text));
            return JSON.parse(res.text)
        });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/range_nav', async (ctx, next) => {
    let requestData = ctx.request.body;
    let data = await request
        .get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg')
        // .use(jsonp({
        //     timeout: 3000,
        //     callbackName: 'someOtherName'
        // }))
        .set('referer', `https://y.qq.com/n/yqq/toplist/4.html`)
        .query({
            page: 'index',
            format: 'html',
            tpl: 'macv4',
            v8debug: 1,
        })
        .then((res) => {
            // console.log();
            return JSON.parse(res.text.replace(/jsonCallback/, '').replace(/^\s+\(/, '').replace(/\)$/, ''));
        });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/range_list', async (ctx, next) => {
    let requestData = ctx.request.body;
    let data = await request
        .get('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg')

        .set('referer', `https://y.qq.com/n/yqq/toplist/${requestData.topId}.html`)
        .query({
            tpl: 3,
            page: 'detail',
            date: requestData.date,
            topid: requestData.topId,
            type: 'top',
            song_begin: requestData.begin,
            song_num: 30,
            g_tk: 5381,
            loginUin: 0,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0,
        })
        .then((res) => {
            // console.log();
            return JSON.parse(res.text);
        });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/class_tag', async (ctx, next) => {
    let requestData = ctx.request.body;
    let data = await axios({
        url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg',
        method: 'get',
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: {
            loginUin: 0,
            hostUin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0
        }
    }).then(res => {
        // console.log(res);
        return res.data;
    }).catch(err => {
        console.log(err);
        return err;
    });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/class_list', async (ctx, next) => {
    let requestData = ctx.request.body;
    let data = await axios({
        url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg',
        method: 'get',
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: {
            platform: 'yqq',
            hostUin: 0,
            sin: requestData.sin,
            ein: requestData.ein,
            sortId: requestData.sortId,
            needNewCode: 0,
            categoryId: requestData.categoryId,
            rnd: Math.random(),
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
        }
    }).then(res => {
        // console.log(res);
        return res.data
    }).catch(err => {
        console.log(err);
    });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/new_search', async (ctx, next) => {
    let requestData = ctx.request.body;
    let data = await axios({
        url: 'http://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
        method: 'get',
        headers: {
            referer: 'http://m.y.qq.com',
            // host: 'm.y.qq.com',
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        },
        params: {
            w: requestData.name,
            p: requestData.page,
            n: 20,
            format: 'json',
            ct: 24,
            inCharset: 'utf8',
            outCharset: 'utf-8',
            // ct: 24,
            // qqmusic_ver: 1298,
            // new_json: 1,
            // remoteplace: 'txt.yqq.song',
            // // searchid: 71263531958569087,
            // t: 0,
            // aggr: 1,
            // cr: 1,
            // catZhida: 1,
            // lossless: 0,
            // flag_qc: 0,
            // p: requestData.page,
            // n: 20,
            // w: requestData.name,
            // g_tk: 5381,
            // loginUin: 0,
            // hostUin: 0,
            // format: 'json',
            // inCharset: 'utf8',
            // outCharset: 'utf-8',
            // notice: 0,
            // platform: 'yqq',
            // needNewCode: 0
        }
    }).then(res => {
        console.log(res);
        return res.data;
    }).catch(err => {
        console.log(err);
    });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/new_search2', async (ctx, next) => { // 另外的搜索方案
    let requestData = ctx.request.body;
    let data = await axios({
        url: 'https://api.bzqll.com/music/tencent/search',
        method: 'get',
        params: {
            key:579621905,
            s: requestData.name,
            limit: 50,
            offset: requestData.page,
            type: requestData.type,
        }
    }).then(res => {
        // console.log(res);
        return res.data;
    }).catch(err => {
        console.log(err);
    });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/music_song_url', async (ctx, next) => { // 获取音乐播放地址
    let requestData = ctx.request.body;
    let data = await axios({
        url: 'http://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg',
        method: 'get',
        headers: {
            referer: 'http://m.y.qq.com',
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        },
        params: {
            songmid: requestData.songmid,
            format: 'json',
        }
    }).then(res => {
        // console.log(res);
        return res.data;
    }).catch(err => {
        console.log(err);
    });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/music_song_lrc', async (ctx, next) => { // 获取音乐歌词
    let requestData = ctx.request.body;
    let data = await axios({
        url: 'http://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg',
        method: 'get',
        headers: {
            referer: 'http://m.y.qq.com',
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        },
        params: {
            songmid: requestData.songmid,
            format: 'json',
            nobase64: 1,
            songtype: 0,
            callback: 'c'
        }
    }).then(res => {
        // console.log(res);
        return res.data;
    }).catch(err => {
        console.log(err);
    });
    return ctx.body = {
        status: 200,
        data: data
    }
});
music.post('/music_song_key', async (ctx, next) => { // 获取音乐key
    let requestData = ctx.request.body;
    let data = await axios({
        url: 'http://base.music.qq.com/fcgi-bin/fcg_musicexpress.fcg',
        method: 'get',
        headers: {
            referer: 'http://y.qq.com',
            'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
        },
        params: {
            json: 3,
            guid: 1543080947,
            // songmid: requestData.songmid,
            format: 'json',
            // nobase64: 1,
            // songtype: 0,
            // callback: 'c'
        }
    }).then(res => {
        // console.log(res);
        return res.data;
    }).catch(err => {
        console.log(err);
    });
    return ctx.body = {
        status: 200,
        data: data
    }
});

music.post('/music_song_lrc2', async (ctx, next) => { // 获取音乐歌词
    let requestData = ctx.request.body;
    let data = await axios({
        url: 'https://api.bzqll.com/music/tencent/lrc',
        method: 'get',
        params: {
            key: 579621905,
            id: requestData.songmid
        }
    }).then(res => {
        // console.log(res);
        return res.data;
    }).catch(err => {
        console.log(err);
    });
    return ctx.body = {
        status: 200,
        data: data
    }
});
route.use('/v1/music', music.routes(), music.allowedMethods());
module.exports = {
    route
};