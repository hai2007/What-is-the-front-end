const pkg = JSON.parse(require('fs').readFileSync('./package.json'));

module.exports = {

    // 打包入口
    entry: './src/main.ts',

    // 打包出口
    output: 'build/main@v' + pkg.version + '.js',

    // 对导入路径重定向
    redirect: {
        'nefbl': "./src/lib/nefbl.js",
        'colors-picker': "./src/lib/colors-picker.js",
        'image2d': "./src/lib/image2d.js",
        'image3d': "./src/lib/image3d.js",
        'three-geometry': "./src/lib/three-geometry.js",
        'open-web-editor': "./src/lib/open-web-editor.js",
        'open-web-excel': "./src/lib/open-web-excel.js"
    }
};
