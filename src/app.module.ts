import { Module } from 'nefbl'

// 首页
import AppComponent from './App/index'

// 指令
import uiBind from 'sprout-ui/nefbl/directive/ui-bind'
import uiModel from 'sprout-ui/nefbl/directive/ui-model'
import uiOn from 'sprout-ui/nefbl/directive/ui-on'
import uiLazy from './directive/ui-lazy'
import uiCode from './directive/ui-code'

@Module({
    declarations: [
        AppComponent,
        uiBind, uiModel, uiOn,
        uiLazy, uiCode
    ],
    imports: [],
    exports: [],
    bootstrap: AppComponent
})
export default class {

}
