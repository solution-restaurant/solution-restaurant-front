import axios from "axios";

const alarmModule = {
  namespaced: true,
  state: () => ({
    userRecoMeal: 'test',
    userResOfAi: 'test',
    userChkEat: 'test',
    userMLD: '10:00',
    userAlarmImg: '10:00',
    userMealData: {},
  }),
  getters: {
  },
  mutations: {
    SET_USER_RECO_MEAL(state, payload) {
      alert('SET_USER_RECO_MEAL: ', payload)
      state.userRecoMeal = payload;
    },
    SET_USER_RES_OF_AI(state, payload) {
      state.userResOfAi = payload;
    },
    SET_USER_CHK_EAT(state, payload) {
      state.userChkEat = payload;
    },
    SET_USER_MLD(state, payload) {
      state.userMLD = payload;
    },
    SET_USER_ALARM_IMG(state, payload) {
      state.userAlarmImg = payload;
    },
    SET_USER_MEAL_ALL_INFO(state, payload){
      state.userMealData = payload;
    },
  },
  actions: {
    setUserRecoMeal({ state, commit }, tmp) {
      console.log(tmp);
      // commit('LOGIN', loginApi.axiosLoginApi()); // 서버 생성 후 테스트 230521 KJT
      commit("SET_USER_RECO_MEAL", tmp);
    },
    setUserResOfAi({ state, commit }, tmp) {
      console.log(tmp);
      // commit('LOGIN', loginApi.axiosLoginApi()); // 서버 생성 후 테스트 230521 KJT
      commit("SET_USER_RES_OF_AI", tmp);
    },
    setUserChkEat({ state, commit }, tmp) {
      console.log(tmp);
      // commit('LOGIN', loginApi.axiosLoginApi()); // 서버 생성 후 테스트 230521 KJT
      commit("SET_USER_CHK_EAT", tmp);
    },
    setUserMLD({ state, commit }, tmp) {
      console.log(tmp);
      // commit('LOGIN', loginApi.axiosLoginApi()); // 서버 생성 후 테스트 230521 KJT
      commit("SET_USER_MLD", tmp);
    },
    setUserAlarmImg({ state, commit }, tmp) {
      console.log(tmp);
      // commit('LOGIN', loginApi.axiosLoginApi()); // 서버 생성 후 테스트 230521 KJT
      commit("SET_USER_ALARM_IMG", tmp);
    },
    getAlarmRecent({ state, commit },tmp) {
      // alert("user.userName" + tmp + "  " + state.userRecoMeal +"  "+ state.userResOfAi+"  " + state.userChkEat+ "  " + state.userMLD + " "+ state.userAlarmImg);
      return axios.post("/api/v1/health/getAlarmRecent", {
        userName: tmp,
        userRecoMeal: state.userRecoMeal,
        userResOfAi: state.userResOfAi,
        userChkEat: state.userChkEat,
        userMLD: state.userMLD,
        userAlarmImg: state.userAlarmImg
      }, {
          headers: {
              'Content-type': 'application/json',
          }
      }).then((response) => {
        // alert("content: " + response.data["userRecoMeal"]);
        console.log(state.receiveMessage);
        if(response.data["userRecoMeal"] != 'null'){
          //알람 시간 세팅
          commit("SET_USER_RECO_MEAL", response.data["userRecoMeal"] );
          commit("SET_USER_RES_OF_AI", response.data["userResOfAi"] );
          commit("SET_USER_CHK_EAT", response.data["userChkEat"] );
          commit("SET_USER_MLD", response.data["userMLD"] );
          commit("SET_USER_ALARM_IMG", response.data["userAlarmImg"] );
        }else{
          alert("최신 식단 없음");
          commit("SET_USER_RECO_MEAL", null );
        }
      });
    },
    getAlarmAll({ state, commit },tmp) {
      alert("user.userName" + tmp + "  " + state.userRecoMeal +"  "+ state.userResOfAi+"  " + state.userChkEat+ "  " + state.userMLD + " "+ state.userAlarmImg);
      return axios.post("/api/v1/health/getAlarmAll", {
        userName: tmp,
        userRecoMeal: state.userRecoMeal,
        userResOfAi: state.userResOfAi,
        userChkEat: state.userChkEat,
        userMLD: state.userMLD,
        userAlarmImg: state.userAlarmImg
      }, {
          headers: {
              'Content-type': 'application/json',
          }
      }).then((response) => {
        // alert("content: " + response.data["userRecoMeal"]);
        console.log(state.receiveMessage);
        if(response.data["userRecoMeal"] != 'null'){
          alert("전체 식단 가져오기 완료");
          //알람 시간 세팅
          commit("SET_USER_RECO_MEAL", response.data["userRecoMeal"] );
          commit("SET_USER_RES_OF_AI", response.data["userResOfAi"] );
          commit("SET_USER_CHK_EAT", response.data["userChkEat"] );
          commit("SET_USER_MLD", response.data["userMLD"] );
          commit("SET_USER_ALARM_IMG", response.data["userAlarmImg"] );
          commit("SET_USER_MEAL_ALL_INFO", response.data["userMealInfo"] );
        }else{
          alert("전체 식단 없음");
        }
      });
    },
  },
  modules: {
  }
};
export default alarmModule;