import testApi from '@/api/testApi'

const testModule = {
  namespaced: true,
  state: () => ({
    testId: "hello",
  }),
  getters: {
  },
  mutations: {
    SET_TEST_ID(state, payload) {
      state.testId = payload;
    }
  },
  actions: {
    getTestId({ state, commit }) {
      console.log(state.testId);
      commit('SET_TEST_ID', testApi.axiosTestApi()); // 서버 생성 후 테스트 230521 KJT
    }
  },
  modules: {
  }
};
export default testModule;