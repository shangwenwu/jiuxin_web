
fis.config.merge({
    statics: '/static',
    templates:'/template',
    namespace: 'pc',
    modules: {
        parser: {
            less: 'less',
            tmpl: 'utc'
        },
        postprocessor: {
            js: "jswrapper"
        },
        postpackager: ['autoload', 'simple'],
        lint: {
            js: 'jshint'
        }
    },
    settings: {
        postprocessor: {
            jswrapper: {
                type: 'amd'
            }
        },
        lint: {
            jshint: {
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                node: true
            }
        }
    },
    roadmap: {
        ext: {
            less: 'css'
        },
        path:[/*{ 
            reg:/^\/${statics}\/${namespace}\/css\/modules\/([^\/]+)\/\1\.(css)$/i,
            useSprite: true
        },*/{
            reg: /^\/components\/.*\.js$/i,
            isMod: true
        },{
            reg: /^\/page\/(.*)$/i,
            useCache: false,
            release: '${templates}/${namespace}/page/$1'
        },{
            //一级同名组件，可以引用短路径，比如modules/jquery/juqery.js
            //直接引用为var $ = require('jquery');
            reg: /^\/modules\/([^\/]+)\/\1\.(js)$/i,
            //是组件化的，会被jswrapper包装
            isMod: true,
            //id为文件夹名
            id: '$1',
            release: '${statics}/${namespace}/js/$1/$1'
        }, {
            //modules目录下的其他脚本文件
            reg: /^\/modules\/(.*\.js)$/i,
            //是组件化的，会被jswrapper包装
            isMod: true,
            release: '${statics}/${namespace}/js/$1'
        }, {
            //less的mixin文件无需发布
            reg: /^(.*)mixin\.less$/i,
            release: false
        }, {
            //其他css文件
            reg: /^\/modules\/(.*\.css)$/i,
            release: '${statics}/${namespace}/css/$1'
        }, {
            //img文件
            reg: /^\/modules\/(.*\.(png|gif|jpg))$/i,
            release: '${statics}/${namespace}/images/$1'
        }, {
            //前端模板
            reg: '**.tmpl',
            //当做类js文件处理，可以识别__inline, __uri等资源定位标识
            isJsLike: true,
            //只是内嵌，不用发布
            release: false
        }, {
            reg: /.*\.(html|jsp|tpl|vm|htm|asp|aspx|php)$/,
            useCache: false,
            release: '$&'
        }, {
            reg: /^\/(config|test)\/(.*\.json$)/i,
            isMod: false,
            charset: 'utf8',
            release: '/$1/${namespace}/$2'
        },{
            reg: /^\/(config|test)\/(.*)/i,
            isMod: false,
            release: '/$1/${namespace}/$2'
         },{
            reg: "README.md",
            release: false
        }, {
            reg: "**",
            release: '${statics}/${namespace}/$&'
        }]
    },
    pack: {
        //'pkg/base.js': ['/modules/base/**.js']
        'pkg/all.css':/^\/modules\/([^\/]+)\/\1\.(css)$/i,
        'pkg/lib.css':['/lib/**/**.css'],
        'pkg/all.js':['/modules/**/**.js']
    }
});


//静态资源域名，使用pure release命令时，添加--domains或-D参数即可生效
//fis.config.set('roadmap.domain', 'http://127.0.0.1:8080');

//如果要兼容低版本ie显示透明png图片，请使用pngquant作为图片压缩器，
//否则png图片透明部分在ie下会显示灰色背景
//使用spmx release命令时，添加--optimize或-o参数即可生效
//fis.config.set('settings.optimzier.png-compressor.type', 'pngquant');

//设置jshint插件要排除检查的文件，默认不检查lib、jquery、backbone、underscore等文件
//使用pure release命令时，添加--lint或-l参数即可生效
//fis.config.set('settings.lint.jshint.ignored', [ 'lib/**', /jquery|backbone|underscore/i ]);

//csssprite处理时图片之间的边距，默认是3px
//fis.config.set('settings.spriter.csssprites.margin', 20);



fis.config.set('modules.spriter', 'csssprites');
// fis.config.set('roadmap.path', []);
fis.config.set('settings.spriter.csssprites', {
    //图之间的边距
    margin: 10,
    //使用矩阵排列方式，默认为线性`linear`
    layout: 'matrix'
});

