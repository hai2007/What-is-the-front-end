import { Component } from 'nefbl'

import OpenWebExcel from 'open-web-excel'

import style from './index.scss'
import template from './index.html'

@Component({
    selector: "page-index3",
    template,
    styles: [style]
})
export default class {

    $mounted() {

        new OpenWebExcel({

            // 编辑器挂载点(必选)
            el: document.getElementById('excel')

        });

    }

}
