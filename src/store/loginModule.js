import loginApi from '@/api/loginApi'
import axios from "axios";

const loginModule = {
  namespaced: true,
  state: () => ({
    msgData: [],
    user: 'test',
    userNameOfJoin: 'test',
    userPasswordOfJoin: 'test',
    userNameOfLogin: 'test',
    userPasswordOfLogin: 'test',
    userAlarmTime: '10:00',
    userAlarmState: false,
  }),
  getters: {
  },
  mutations: {
    pushMsgData(state, payload){
      state.msgData.push(payload);
    },
    RESET_MSG_DATA(state){
      state.msgData.splice(0);
    },
    LOGIN(state, userName) {
      state.user = userName;
      localStorage.setItem("user", JSON.stringify(userName));
    },    
    LOGOUT(state, userName) {
      state.user = userName;
      localStorage.removeItem("user");
      localStorage.removeItem('vuex')
      location.reload();
    },
    SET_MY_NAME_OF_JOIN(state, payload) {
      state.userNameOfJoin = payload;
    },
    SET_MY_PASSWORD_OF_JOIN(state, payload) {
      state.userPasswordOfJoin = payload;
    },
    SET_MY_NAME_OF_LOGIN(state, payload) {
      state.userNameOfLogin = payload;
    },
    SET_MY_PASSWORD_OF_LOGIN(state, payload) {
      state.userPasswordOfLogin = payload;
    },
    SET_ALARM_TIME(state, payload) {
      state.userAlarmTime = payload;
    },
    SET_ALARM_STATE(state, payload) {
      state.userAlarmState = payload;
    },
  },
  actions: {
    setJoin({ state, commit }) {
      console.log("user.userName" + state.userNameOfJoin + "  " + state.userPasswordOfJoin);
      return axios.post("/api/v1/health/join", {
        userName: state.userNameOfJoin
        , password :state.userPasswordOfJoin
      }, {
          headers: {
              'Content-type': 'application/json',
          }
      }).then((response) => {
          alert("회원 가입 완료");
          window.location.href = window.location.origin +"/#/admin/user";
          /*this.$router.push({
            name: "User"
          });*/
      });
    },
    setMyNameOfJoin({ state, commit }, myName) {
      console.log(myName);
      // commit('LOGIN', loginApi.axiosLoginApi()); // 서버 생성 후 테스트 230521 KJT
      commit("SET_MY_NAME_OF_JOIN", myName);
    },
    setMyPasswordOfJoin({ state, commit }, myMessage) {
      console.log(myMessage);
      // commit('LOGIN', loginApi.axiosLoginApi()); // 서버 생성 후 테스트 230521 KJT
      commit("SET_MY_PASSWORD_OF_JOIN", myMessage);
    },
    setMyNameOfLogin({ state, commit }, myName) {
      console.log(myName);
      // commit('LOGIN', loginApi.axiosLoginApi()); // 서버 생성 후 테스트 230521 KJT
      commit("SET_MY_NAME_OF_LOGIN", myName);
    },
    setMyPasswordOfLogin({ state, commit }, myMessage) {
      console.log(myMessage);
      // commit('LOGIN', loginApi.axiosLoginApi()); // 서버 생성 후 테스트 230521 KJT
      commit("SET_MY_PASSWORD_OF_LOGIN", myMessage);
    },
    login({ state, commit }) {
      console.log("user.userName" + state.userNameOfLogin + "  " + state.userPasswordOfLogin);
      return axios.post("/api/v1/health/login", {
        userName: state.userNameOfLogin
        , password :state.userPasswordOfLogin
        , alarmTime :state.userAlarmTime
        , alarmState :state.userAlarmState
      }, {
          headers: {
              'Content-type': 'application/json',
          }
      }).then((response) => {
        console.log("content: " + response.data["userName"]);
        console.log(state.receiveMessage);
        if(response.data["userName"] != 'null'){
          alert("로그인 완료");
          commit("LOGIN", state.userNameOfLogin);
          //알람 시간 세팅
          commit("SET_ALARM_TIME", response.data["alarmTime"] );
          commit("SET_ALARM_STATE", response.data["alarmState"] );
          window.location.href = window.location.origin +"/#/admin/notifications";
          window.location.reload();
        }else{
          alert("로그인 실패");
        }
      });
    },
    logout({ state, commit }, userName) {
      console.log(state.user);
      // commit('LOGIN', loginApi.axiosLoginApi()); // 서버 생성 후 테스트 230521 KJT
      commit("RESET_MSG_DATA");
      commit("LOGOUT", userName);
    },
    setUserAlarmTime({ state, commit }, alarmTime) {
      console.log(alarmTime);
      commit("SET_ALARM_TIME", alarmTime);
    },
    setUserAlarmState({ state, commit }, alarmState) {
      console.log(alarmState);
      commit("SET_ALARM_STATE", alarmState);
    },
    updateAlarmTime({ state, commit }) {
      console.log("user.userName" + state.userNameOfLogin + "  " + state.userPasswordOfLogin);
      return axios.post("/api/v1/health/updateAlarmTime", {
        userName: state.userNameOfLogin
        , password :state.userPasswordOfLogin
        , alarmTime :state.userAlarmTime
        , alarmState :state.userAlarmState
      }, {
          headers: {
              'Content-type': 'application/json',
          }
      }).then((response) => {
        console.log("content: " + response.data["userName"]);
        console.log(state.receiveMessage);
        if(response.data["userName"] != 'null'){
          alert("updateAlarmTime 완료");
          //알람 시간 세팅
          commit("SET_ALARM_TIME", response.data["alarmTime"] );
          commit("SET_ALARM_STATE", response.data["alarmState"] );
        }else{
          alert("updateAlarmTime 실패");
        }
      });
    },
    updateAlarmState({ state, commit }) {
      console.log("user.userName" + state.userNameOfLogin + "  " + state.userPasswordOfLogin);
      return axios.post("/api/v1/health/updateAlarmState", {
        userName: state.userNameOfLogin
        , password :state.userPasswordOfLogin
        , alarmTime :state.userAlarmTime
        , alarmState :state.userAlarmState
      }, {
          headers: {
              'Content-type': 'application/json',
          }
      }).then((response) => {
        console.log("content: " + response.data["userName"]);
        console.log(state.receiveMessage);
        if(response.data["userName"] != 'null'){
          alert("updateAlarmState 완료");
          //알람 시간 세팅
          commit("SET_ALARM_TIME", response.data["alarmTime"] );
          commit("SET_ALARM_STATE", response.data["alarmState"] );
        }else{
          alert("updateAlarmState 실패");
        }
      });
    },
  },
  modules: {
  }
};
export default loginModule;