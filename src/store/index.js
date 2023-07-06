import { createStore } from 'vuex'
import testModule from './testModule'
import loginModule from './loginModule'
import createPersistedState from 'vuex-persistedstate'; //새로고침 시 vuex 초기화 해결용 

export default createStore({
  modules: { testModule,loginModule } // 해당 위치에 store 모듈 추가
   //vuex plugin 명시
  ,plugins: [createPersistedState({
    paths: ["loginModule"]
  })]
})
