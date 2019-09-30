'use strict';
/*
 code by Mapk Volkov
*/
const gulp=require('gulp');
const sass=require('gulp-sass');
const pug=require('gulp-pug');
const notify=require('gulp-notify');
const plumber=require('gulp-plumber');
const named=require('vinyl-named');
const watch=require('gulp-watch');
const rename=require('gulp-rename');
const webpack=require('webpack-stream');
const postCss=require('gulp-postcss');
const config=require('../config/index');
const postcssrc=require('../config/postcssrc');
const postcssrcOpts=postcssrc.dev;
const assets=require('./gulpfile.base.config');
const webpackDevConfig=require('./webpack.dev.config');
const browserSync=require('browser-sync').create();

function dev(){
    //gulp styles
    gulp.task('styles:dev',()=>{
        //scss编译css
        return gulp.src(assets.base.scss.src)
            .pipe(watch(assets.base.scss.src))
            .pipe(plumber())
            .pipe(sass())
        //css优化
            .pipe(postCss(postcssrcOpts))
            .pipe(rename({suffix: config.prod.files.rename}))
            .pipe(gulp.dest(assets.base.scss.dist))
            .pipe(browserSync.reload({stream:config.dev.browsersyncstream}))
            .pipe(notify({
                message:assets.base.scss.msg.notice
            }));
    });
    //gulp pug
    gulp.task('pug:dev',()=>{
        return gulp.src([assets.base.pug.src,assets.base.pug.utilsrc])
            .pipe(watch(assets.base.pug.src))
            .pipe(plumber())
            .pipe(pug({
                pretty:config.dev.pretty
            }))
            .pipe(rename(path=>{
                const filename = path.basename.split('_')[1];
                if(!filename){
                    return path;
                }
                path.basename = filename;
                return path;
            }))
            .pipe(gulp.dest(assets.base.pug.dist))
            .pipe(browserSync.reload({stream:config.dev.browsersyncstream}))
            .pipe(notify({
                message:assets.base.pug.msg.notice
            }));
    });
    //gulp img
    gulp.task('img:dev',()=>{
        return gulp.src(assets.base.img.src)
            .pipe(watch(assets.base.img.src))
            .pipe(plumber())
            .pipe(gulp.dest(assets.base.img.dist))
            .pipe(browserSync.reload({stream:config.dev.browsersyncstream}))
            .pipe(notify({
                message:assets.base.img.msg.devnotice
            }));
    });
    //gulp copy
    gulp.task('copy:dev',()=>{
        if(config.base.isMobile && config.base.type==='mobile'){
            return gulp.src(assets.base.img.commonBgImg.mobile)
            .pipe(watch(assets.base.img.commonBgImg.mobile))
            .pipe(plumber())
            .pipe(gulp.dest(assets.base.img.commonBgImg.dist))
            .pipe(browserSync.reload({stream:config.dev.browsersyncstream}))
            .pipe(notify({
                message:assets.base.img.msg.notice
            }));
        }else if(!config.base.isMobile && config.base.type==='pc'){
            return gulp.src(assets.base.img.commonBgImg.pc)
            .pipe(watch(assets.base.img.commonBgImg.pc))
            .pipe(plumber())
            .pipe(gulp.dest(assets.base.img.commonBgImg.dist))
            .pipe(browserSync.reload({stream:config.dev.browsersyncstream}))
            .pipe(notify({
                message:assets.base.img.msg.notice
            }));
        }else if(!config.base.isMobile && config.base.type==='platform'){
            return gulp.src(assets.base.img.commonBgImg.platform)
            .pipe(watch(assets.base.img.commonBgImg.platform))
            .pipe(plumber())
            .pipe(gulp.dest(assets.base.img.commonBgImg.dist))
            .pipe(browserSync.reload({stream:config.dev.browsersyncstream}))
            .pipe(notify({
                message:assets.base.img.msg.notice
            }));
        }
        
    });
    //gulp webpack
    gulp.task('webpack:dev',()=>{
        return gulp.src(assets.base.js.src)
            .pipe(plumber())
            .pipe(named())
            .pipe(webpack(webpackDevConfig))
            .pipe(rename({suffix: config.prod.files.rename}))
            .pipe(gulp.dest(assets.base.js.dist))
            .pipe(browserSync.reload({stream:config.dev.browsersyncstream}))
            .pipe(notify({
                message:assets.base.js.msg.notice
            }));
    });
    //gulp hot
    gulp.task('hot:dev',()=>{
        browserSync.init({
            port:config.dev.port,
            server:{
                baseDir:assets.app.dist
            }
        });
        gulp.watch(assets.base.scss.src,['styles:dev']);
        gulp.watch(assets.base.pug.src,['pug:dev']);
        gulp.watch(assets.base.img.src,['img:dev']);
        gulp.watch(assets.base.js.src,['webpack:dev']);
    });
    gulp.task('dev',['styles:dev','pug:dev','copy:dev','img:dev','webpack:dev','hot:dev']);
}

module.exports=dev;