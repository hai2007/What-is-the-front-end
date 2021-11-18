import { Component } from 'nefbl'

const image3D = require('image3d')
const ThreeGeometry = require('three-geometry')

import style from './index.scss'
import template from './index.html'

@Component({
    selector: "page-index2",
    template,
    styles: [style]
})
export default class {

    $mounted() {

        let image3d = new image3D(document.getElementsByTagName('canvas')[0], {
            "vertex-shader": document.getElementById("vs").innerText,
            "fragment-shader": document.getElementById("fs").innerText,
            "depth": true
        })

        let painter = image3d.Painter()
        let buffer = image3d.Buffer()
        let camera = image3d.Camera()

        let threeGeometry = ThreeGeometry({
            precision: 0.1
        })

        if (global.__interval2__) {
            clearInterval(global.__interval2__)
        }

        global.__interval2__ = setInterval(function () {

            // 传递照相机
            image3d.setUniformMatrix("u_matrix", camera.rotateBody(0.02, -1, 1, 0, 1, -1, 0).value())

            image3d.setUniformFloat("u_color", 0.1, 0.3, 0.1, 1.0)

            threeGeometry.sphere(function (data) {

                buffer.write(new Float32Array(data.points)).use('a_position', 3, 3, 0)
                painter.drawStripTriangle(0, data.length)

            }, 0, 0.1, 0, 0.5)

                // 再绘制一个圆主体，方便对比
                .cylinder(function (data) {

                    buffer.write(new Float32Array(data.points)).use('a_position', 3, 3, 0)

                    if (data.methods == 'StripTriangle') {

                        image3d.setUniformFloat("u_color", 1, 0, 0, 0.5)
                        painter.drawStripTriangle(0, data.length)

                    } else if (data.methods == 'FanTriangle') {

                        image3d.setUniformFloat("u_color", 0, 0, 0.5, 0.1)
                        painter.drawFanTriangle(0, data.length)

                    }

                }, 0, -0.7, 0, 0.3, 1.4)
        }, 50)

    }

}
