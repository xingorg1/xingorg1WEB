const config=require('./index');
const autoPrefixer=require('autoprefixer');
const pxToRem=require('postcss-pxtorem');
const cleanCss=require('postcss-clean');
const cssUrl=require('postcss-url');
const cssUrlRev=require('postcss-urlrev');
const pxToRemOpts={
    rootValue:config.base.postcssrc.rootValue,
    propList:config.base.postcssrc.propList,
    selectorBlackList:config.base.postcssrc.selectorBlackList
};
const postCssOptions={
    dev:[
            pxToRem(pxToRemOpts),
            autoPrefixer
        ],
    prod:[
            pxToRem(pxToRemOpts),
            autoPrefixer,
            cleanCss({
                compatibility:config.prod.postcssrc.compatibility
            }),
            cssUrl([
                {
                    filter: /\.(png|jpg|gif|svg|ico|tiff|woff|eot)$/,
                    url:config.prod.postcssrc.url,
                    basePath:config.prod.postcssrc.basePath,
                    encodeType:config.prod.postcssrc.encodeType,
                    maxSize:config.prod.postcssrc.maxSize
                }
            ]),
            cssUrlRev({
                includeRemote:config.prod.postcssrc.includeRemote
            })
        ]
}
module.exports=(()=>{
    if(config.base.isMobile){
        return postCssOptions;
    }else{
        postCssOptions.dev.splice(0,1);
        postCssOptions.prod.splice(0,1);
        return postCssOptions;
    }
})();