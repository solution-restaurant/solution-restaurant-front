import { createStore } from 'vuex'
import testModule from './testModule'

export default createStore({
  modules: { testModule } // 해당 위치에 store 모듈 추가
})
