const CONFIG=require( './env.config');
const http = require('http');
const express = require('express');
const proxy = require('http-proxy-middleware');
const url = require('url');
const API_SERVER=CONFIG.APIServer;//'http://192.168.10.10/service';
const CookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const getRawBody = require('raw-body');
const path = require('path');
const webpack = require('webpack');
const compress = require('compression');
const debug = require('debug')('http');


const PATHS = {
    app: path.join(__dirname, '../src'),
    build: path.join(__dirname, '../dist'),
};

var isDeveloping = process.env.NODE_ENV !== 'production';


// proxy middleware options
var ProxyOptions = {
    target: API_SERVER, // target host
    changeOrigin: true,               // needed for virtual hosted sites
    pathRewrite: {
        'api/auth' : 'oauth/token',       // remove path
        'api/':''
    },
    onProxyReq:function onProxyReq(proxyReq, req, res) {

        // add custom header to request
        //console.log(req.method.toLowerCase());
        if (req.method.toLowerCase()=='post'){
            if (req.params['0']=='auth'){
                req.body.grant_type='password';
                req.body.client_id='1';
                req.body.client_secret='secret0';
            }
            //console.log(req.params);
        }
        if(req.body) {
            let  bodyData = JSON.stringify(req.body);
            // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
            //proxyReq.setHeader('Content-Type','application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            //console.log(req.cookies.token);
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



const app = express();

// use gzip Compression
app.use('/:tenant/app/*',compress());
// support json encoded bodies
app.use(bodyParser.json());
// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// log system
app.use(require('morgan')('short'));
// Cookie parser for parsing application/json
app.use(CookieParser());
// Proxie for school edit API
app.use('/:tenant/api/*', proxy(ProxyOptions));

// ------------------------------------
// Apply Webpack HMR Middleware for development only
// ------------------------------------
if (isDeveloping) {
    console.log('is developing ..........');
    const webpackConfig = require('../webpack.config.js');
    const compiler = webpack(webpackConfig);

    debug('Enable webpack dev and HMR middleware');
    app.use('/:tenant/app/js',require('webpack-dev-middleware')(compiler, webpackConfig.devServer));
    app.use(require('webpack-hot-middleware')(compiler));

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
    app.use(express.static(PATHS.build));
} else {
    console.log(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
    app.use(express.static(PATHS.build));
}
// Serve Index file
app.get('/:tenant/app/', function root(req, res) {
    res.sendFile(PATHS.app+'/index.html');
});
// Server any file under :tenant/app
app.get('/:tenant/app/*', function root(req, res) {
    res.sendFile(PATHS.build+'/'+req.params[0]);
});

const server = http.createServer(app);
server.listen(process.env.PORT || 3000, function onListen() {
    const address = server.address();
    console.log('Listening on: %j', address);
    console.log(' -> that probably means: http://localhost:%d', address.port);
});
