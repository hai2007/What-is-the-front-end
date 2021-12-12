import { Component } from 'nefbl'

import OpenWebEditor from 'open-web-editor'

import style from './index.scss'
import template from './index.html'

@Component({
    selector: "page-index4",
    template,
    styles: [style]
})
export default class {

    $mounted() {

        new OpenWebEditor({

            // 编辑器挂载点(必选)
            el: document.getElementById('editor'),
            shader: ['html', {
                "text": "#000000",/*文本颜色*/
                "annotation": "#6a9955",/*注释颜色*/
                "insign": "#ffffff",/*符号颜色*/
                "node": "#1e50b3",/*结点颜色*/
                "attrKey": "#1e83b1",/*属性名称颜色*/
                "attrValue": "#ac4c1e",/*属性值颜色*/
                "css": {
                    "annotation": "#6a9955",/*注释颜色*/
                    "insign": "#ffffff",/*符号颜色*/
                    "selector": "#1e50b3",/*选择器*/
                    "attrKey": "#1e83b1",/*属性名称颜色*/
                    "attrValue": "#ac4c1e"/*属性值颜色*/
                },
                "javascript": {
                    "text": "#000000",/*文本颜色*/
                    "annotation": "#6a9955",/*注释颜色*/
                    "insign": "#ffffff",/*符号颜色*/
                    "key": "#ff0000",/*关键字颜色*/
                    "string": "#ac4c1e",/*字符串颜色*/
                    "funName": "#1e50b3",/*函数名称颜色*/
                    "execName": "#1e83b1"/*执行方法颜色*/
                }
            }],
            content: `<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example | Web Studio Code</title>
    <style>
        /*css样式*/
        body {
            margin: 0px;
        }
    </style>
</head>
<body>
    <script>

        /*js代码*/
        function doit() {
            console.log('你好，世界！');
        }

    </script>
</body>
</html>`

        });

    }

}
