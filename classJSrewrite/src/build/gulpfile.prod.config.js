'use strict';
/*
 code by Mapk Volkov
*/
const gulp=require('gulp');
const sass=require('gulp-sass');
const pug=require('gulp-pug');
const imageMin=require('gulp-imagemin');
const notify=require('gulp-notify');
const plumber=require('gulp-plumber');
const rename=require('gulp-rename');
const named=require('vinyl-named');
const webpack=require('webpack-stream');
const postCss=require('gulp-postcss');
const config=require('../config/index');
const postcssrc=require('../config/postcssrc');
const postcssrcOpts=postcssrc.prod;
const assets=require('./gulpfile.base.config');
const webpackProdConfig=require('./webpack.prod.config');

function prod(){
    //gulp styles
    gulp.task('styles',()=>{
        //scss编译css
        return gulp.src(assets.base.scss.src)
            .pipe(plumber())
            .pipe(sass())
        //css优化
            .pipe(postCss(postcssrcOpts))
            .pipe(rename({suffix: config.prod.files.rename}))
            .pipe(gulp.dest(assets.base.scss.dist))
            .pipe(notify({
                message:assets.base.scss.msg.notice
            }));
    });
    //gulp pug
    gulp.task('pug',()=>{
        return gulp.src([assets.base.pug.src,assets.base.pug.utilsrc])
            .pipe(plumber())
            .pipe(pug({
                pretty:config.prod.pretty
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
            .pipe(notify({
                message:assets.base.pug.msg.notice
            }));
    });
    //gulp img
    gulp.task('img',()=>{
        return gulp.src(assets.base.img.src)
            .pipe(plumber())
            .pipe(imageMin())
            .pipe(gulp.dest(assets.base.img.dist))
            .pipe(notify({
                message:assets.base.img.msg.notice
            }));
    });
    //gulp copy
    gulp.task('copy',()=>{
        if(config.base.isMobile && config.base.type==='mobile'){
            return gulp.src(assets.base.img.commonBgImg.mobile)
            .pipe(plumber())
            .pipe(gulp.dest(assets.base.img.commonBgImg.dist))
            .pipe(notify({
                message:assets.base.img.msg.notice
            }));
        }else if(!config.base.isMobile && config.base.type==='pc'){
            return gulp.src(assets.base.img.commonBgImg.pc)
            .pipe(plumber())
            .pipe(gulp.dest(assets.base.img.commonBgImg.dist))
            .pipe(notify({
                message:assets.base.img.msg.notice
            }));
        }else if(!config.base.isMobile && config.base.type==='platform'){
            return gulp.src(assets.base.img.commonBgImg.platform)
            .pipe(plumber())
            .pipe(gulp.dest(assets.base.img.commonBgImg.dist))
            .pipe(notify({
                message:assets.base.img.msg.notice
            }));
        }
    });
    //gulp webpack
    gulp.task('webpack',()=>{
        return gulp.src(assets.base.js.src)
            .pipe(plumber())
            .pipe(named())
            .pipe(webpack(webpackProdConfig))
            .pipe(rename({suffix: config.prod.files.rename}))
            .pipe(gulp.dest(assets.base.js.dist))
            .pipe(notify({
                message:assets.base.js.msg.notice
            }));
    });
    gulp.task('build',['styles','pug','copy','img','webpack']);  
}

module.exports=prod;

