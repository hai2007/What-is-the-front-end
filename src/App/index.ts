import { Component, ref } from 'nefbl'
import urlFormat from '../tool/urlFormat'

import pages from './pages/lazy-load'


import style from './index.scss'
import template from './index.html'

@Component({
    selector: "app-root",
    template,
    styles: [style]
})
export default class {

    currentPage: any
    pageIndex: any

    $setup() {
        return {
            currentPage: ref(null),
            pageIndex: ref(null)
        }
    }

    goPre() {
        if (this.pageIndex > 0) {
            this.pageIndex -= 1
        } else {
            this.pageIndex = pages.length - 1
        }
        window.location.href = "#" + this.pageIndex
        this.loadPage()
    }

    goNext() {
        if (this.pageIndex < pages.length - 1) {
            this.pageIndex += 1
        } else {
            this.pageIndex = 0
        }
        window.location.href = "#" + this.pageIndex
        this.loadPage()
    }

    loadPage() {
        global.pageIndex = this.pageIndex
        pages[this.pageIndex]().then(data => {
            this.currentPage = data.default
        })
    }

    $mounted() {
        let pageIndex = +urlFormat(window.location.href).router[0]
        this.pageIndex = pageIndex >= 0 && pageIndex < pages.length ? pageIndex : 0
        this.loadPage()
    }

}
