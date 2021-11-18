import { Component, ref } from 'nefbl'
const $$ = require('image2d')

import style from './index.scss'
import template from './index.html'

@Component({
    selector: "page-index1",
    template,
    styles: [style]
})
export default class {

    rate: number

    $setup() {
        return {
            rate: ref(0.75)
        }
    }

    $mounted() {

        global.__flag__ = 'page1'

        // 获取画笔
        let painter = $$("#palette").painter()

            // 绘制三个背景圆
            .config('fillStyle', '#fff7e9').bind("<circle>").appendTo().fillCircle(250, 250, 250)
            .config('fillStyle', '#ffe1b1').bind("<circle>").appendTo().fillCircle(250, 250, 220)
            .config('fillStyle', '#ffffff').bind("<circle>").appendTo().fillCircle(250, 250, 180)

        // 准备好用来绘制动画wave的两个标签和进度弧
        let innerWave = $$('<path>').appendTo('#palette')
        let outerWave = $$('<path>').appendTo('#palette')
        let arcNode = $$('<path>').appendTo('#palette')

        // 绘制三行文字
        painter.config({
            'font-size': 40,
            'fillStyle': '#272727',
            'textAlign': 'center'
        })
            .bind("<text>").appendTo().fillText('￥' + (150000 * this.rate).toFixed(0), 250, 210)
            .config({
                'font-size': 30,
                'fillStyle': '#595757'
            })
            .bind("<text>").appendTo().fillText('可借', 250, 160)
            .config({
                'font-size': 24,
                'fillStyle': '#a4a1a1'
            })
            .bind("<text>").appendTo().fillText('总额度150000', 250, 260)

            // 配置进度条
            .config({
                'arc-start-cap': 'round',
                'arc-end-cap': 'round'
            })

        // 启动动画并绘制进度条
        $$.animation(deep => {

            // 根据当前进度deep更新弧形进度
            painter.bind(arcNode).config('fillStyle', '#ff7f08').fillArc(250, 250, 180, 200, -Math.PI / 2, -Math.PI * 2 * this.rate * deep)

            // 初始化wave
            this.fullWave(painter, this.rate * deep, deep, innerWave, outerWave)

        }, 2000, () => {

            // 初始化显示完毕以后，启动wave动画
            this.renderWave(painter, innerWave, outerWave)
        })

    }

    /**
     * 启动wave动画
     * @param {image2D.painter} painter image2D画笔
     * @param {number} deep 动画进度
     * @param {node} innerWave 内wave结点
     * @param {node} outerWave 外wave结点
     */
    renderWave(painter, innerWave, outerWave) {
        if (global.__flag__ != 'page1') return

        $$.animation(deep => {
            this.fullWave(painter, this.rate, deep, innerWave, outerWave)
        }, 2000, () => {
            this.renderWave(painter, innerWave, outerWave)
        })
    }

    /**
     * 绘制波浪（完整的两条）
     * @param {image2D.painter} painter image2D画笔
     * @param {number} rate 比率
     * @param {number} deep 动画进度
     * @param {node} innerWave 内wave结点
     * @param {node} outerWave 外wave结点
     */
    fullWave(painter, rate, deep, innerWave, outerWave) {
        let help = 1

        if (deep > 0.5) {
            deep = deep - 0.5
            help = -1
        }
        deep *= 2

        // 绘制内弧
        this.drawerWave(painter.bind(innerWave).config('fillStyle', '#ff7f08'), rate, deep, help)

        // 绘制外弧
        this.drawerWave(painter.bind(outerWave).config('fillStyle', '#fead2e'), rate, deep, -help)
    }

    /**
     * 绘制具体的一条wave
     * @param {image2D.painter} painter image2D画笔
     * @param {number} rate 比率
     * @param {number} deep 动画进度
     * @param {number} help wave类型，去1或-1，分两种：开始上波和开始下波
     */
    drawerWave(painter, rate, deep, help) {

        // wave的起点和终点
        let beginPoint = $$.rotate(250, 250, (0.5 - rate) * Math.PI, 410, 250)
        let endPoint = $$.rotate(250, 250, (1.5 - rate) * Math.PI, 410, 250)

        // wave由下半圆和波浪组成
        painter
            .beginPath()
            .moveTo(beginPoint[0], beginPoint[1])

            // 绘制半圆部分
            .arc(250, 250, 160, (0.5 - rate) * Math.PI, 2 * rate * Math.PI)

            // 绘制波浪部分
            .bezierCurveTo(

                // rate > 0.5 ? 1 - rate : rate是用来控制波动大小的，为了好看，0-0.5和0.5-1取对称
                endPoint[0] + (beginPoint[0] - endPoint[0]) * 0.5 * deep, beginPoint[1] + 200 * deep * help * (rate > 0.5 ? 1 - rate : rate),
                endPoint[0] + (beginPoint[0] - endPoint[0]) * 0.5 * (1 + deep), beginPoint[1] - 200 * (1 - deep) * help * (rate > 0.5 ? 1 - rate : rate),

                // 上面是第一和第二个看着点，最后这个是终点，加上画笔开始位置作为起点
                beginPoint[0], beginPoint[1]
            )

            // 填充
            .fill()

    }


}
