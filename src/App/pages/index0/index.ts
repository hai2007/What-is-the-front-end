import { Component } from 'nefbl'
import ColorsPicker from 'colors-picker'

import style from './index.scss'
import template from './index.html'

@Component({
    selector: "page-index0",
    template,
    styles: [style]
})
export default class {

    $mounted() {
        ColorsPicker(document.getElementById('color'), 'red').then(function (color) {
            document.getElementById('color').style.backgroundColor = color
        })
    }

}
