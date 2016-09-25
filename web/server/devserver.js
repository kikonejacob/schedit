const CONFIG=require( './env.config.json');
const http = require('http');
const express = require('express');
const proxy = require('http-proxy-middleware');
const url = require('url');
const app = express();
const API_SERVER=CONFIG.APIServer;//'http://192.168.10.10/service';
const CookieParser = require('cookie-parser');
const  bodyParser = require('body-parser');
const  getRawBody = require('raw-body');

const cookie = require('cookie');
var path = require('path');

const PATHS = {
    app: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../dist'),
};

/*//restreame
var restreamer = function (){
    return function (req, res, next) { //restreame
        req.removeAllListeners('data');
        req.removeAllListeners('end');
        next();
        process.nextTick(function () {
            if(req.body) {
                req.emit('data', JSON.stringify(req.body));

            }
            req.emit('end');
        });
    };
};*/

app.use(bodyParser.json()); // support json encoded bodies

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//app.use(restreamer());//restreame


app.use(require('morgan')('short'));


app.use(CookieParser()); // for parsing application/json

// proxy middleware options
var ProxyOptions = {
    target: API_SERVER, // target host
    changeOrigin: true,               // needed for virtual hosted sites
    pathRewrite: {
        'api/auth' : 'oauth/access_token'       // remove path
    },
    onProxyReq:function onProxyReq(proxyReq, req, res) {
        // add custom header to request
        //console.log(req.method.toLowerCase());
        if (req.method.toLowerCase()=='post'){
            if (req.params['0']=='auth'){
                req.body.grant_type='password';
                req.body.client_id='id1';
                req.body.client_secret='secret1';
            }
            //console.log(req.params);
        }
        if(req.body) {
            var bodyData = JSON.stringify(req.body);
            // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
            //proxyReq.setHeader('Content-Type','application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            console.log(req.cookies.token);
            proxyReq.setHeader('Authorization', 'Bearer '+req.cookies.token);
            // stream the content
            proxyReq.write(bodyData);
        }
    },
    onProxyRes:function onProxyRes(proxyRes, req, res) {
        if (req.method.toLowerCase()=='post'){
            if (req.params['0']=='auth'){
                /*proxyRes.rawD='';
                var F;
                proxyRes.setEncoding('utf8');
                proxyRes.on('data', (chunk) => {
                    //console.log(chunk);
                    proxyRes.rawD+=chunk;
                    //console.log(`Received ${chunk.length} bytes of data.`);
                });
                proxyRes.on('end', () => {

                    try {
                         const data = JSON.parse(proxyRes.rawD);
                    }
                   catch (er) {
                     // uh oh!  bad json!
                       res.statusCode = 400;
                       console.log(proxyRes.headers);
                       return res.end(`error: ${er.message}`);
                   }

                    // write back something interesting to the user:
                    proxyRes.headers['Set-Cookie']= cookie.serialize('token', String(data.access_token),{
                            httpOnly: true,
                            maxAge: 60 * 60 * 24 * 7 // 1 week
                    });

                    F=data;
                    //console.log(proxyRes.text);
                 });
                 console.log(F);*/
              /*getRawBody(proxyRes).then(function (buf) {
                  console.log(proxyRes.rawD=proxyRes.rawD+);
              });*/
              //console.log(proxyRes.rawD);
                /*proxyRes.headers['Set-Cookie']= cookie.serialize('token', String('fddf'), {
                        httpOnly: true,
                        maxAge: 60 * 60 * 24 * 7 // 1 week
                });*/
                //proxyRes.cookie('token' , 'token', {expire : new Date() + 9999});
            }
        }
    }
};


app.use('/:tenant/api/*', proxy(ProxyOptions));




/*app.use('/:tenant/auth/



        // or log the req
*', proxy(API_SERVER,{
        decorateRequest: function(reqOpt, req) {
            if (req.cookie.bData){
                reqOpt.headers['Authorization'] = 'Bearer '+ req.cookie.bData;
            }
            return reqOpt;
        },
        forwardPath: function(req, res) {
            console.log('fddf');
            return url.parse(req.url).path+'dfdf';
        },
        changeOrigin: true}));
*/

(function initWebpack() {
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config.js')['development'];
    const compiler = webpack(webpackConfig);

    app.use('/:tenant/app',require('webpack-dev-middleware')(compiler, webpackConfig.devServer));

    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log,
        path: '/__webpack_hmr', heartbeat: 10 * 1000,
        stats:{
            progress:true,
            colors: true}
    }));

    app.use(express.static(PATHS.build));
})();

app.get('/:tenant/app/', function root(req, res) {
    console.log('OOOOOOOO');
    res.sendFile(PATHS.app+'/index.html');
});
app.get('/:tenant/app/*', function root(req, res) {
    //console.log(req);
    res.sendFile(PATHS.build+'/'+req.params[0]);
    //console.log(req.path);
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function onListen() {
    const address = server.address();
    console.log('Listening on: %j', address);
    console.log(' -> that probably means: http://localhost:%d', address.port);
});
