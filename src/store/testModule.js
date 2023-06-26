import testApi from '@/api/testApi'
import axios from "axios";

const testModule = {
  namespaced: true,
  state: () => ({
    testId: "hello",
    myName:"홀리",
    myMessage:"우유좋아",
    receiveMessage: "helloMessage",
  }),
  getters: {
  },
  mutations: {
    SET_TEST_ID(state, payload) {
      state.testId = payload;
    },
    SET_TEST_MESSAGE(state, payload) {
      state.receiveMessage = payload;
    },
    SET_MY_NAME(state, payload) {
      state.myName = payload;
    },
    SET_MY_MESSAGE(state, payload) {
      state.myMessage = payload;
    },
  },
  actions: {
    getTestId({ state, commit }) {
      console.log(state.testId);
      commit('SET_TEST_ID', testApi.axiosTestApi()); // 서버 생성 후 테스트 230521 KJT
    },
    setMyName({ state, commit }, myName) {
      console.log(myName);
      // commit('LOGIN', loginApi.axiosLoginApi()); // 서버 생성 후 테스트 230521 KJT
      commit("SET_MY_NAME", myName);
    },
    setMyMessage({ state, commit }, myMessage) {
      console.log(myMessage);
      // commit('LOGIN', loginApi.axiosLoginApi()); // 서버 생성 후 테스트 230521 KJT
      commit("SET_MY_MESSAGE", myMessage);
    },
    getTestMessage({ state, commit }) {
      return axios.post("/api/v1/health/send", {
        content: state.myMessage
        , userName :state.myName
      }, {
          headers: {
              'Content-type': 'application/json',
          }
      }).then((response) => {
          console.log("content: " + response.data.content);
          console.log(state.receiveMessage);
          commit('SET_TEST_MESSAGE', response.data.content); // 서버 생성 후 테스트 230521 KJT
      });
      }
  },
  modules: {
  }
};
export default testModule;