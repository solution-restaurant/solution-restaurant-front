<template>
  <div id="test" class="content" style="overflow-y: auto;">
    <div v-if="userName != null">
      <div class="chat__header ">
          안녕하세요. {{ userName }}님! 영양코칭AI '현마카세'입니다!
          식단 추천을 받고 싶은 경우 '식단 추천'이라고 보내주세요!
      </div>
      <chat-list :msgs="msgData" :myName="myName"></chat-list>
      <chat-form @submitMessage="sendMessage"></chat-form>
    </div>
    <div v-else>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8">
            <div class="login__form">
              <label for="input-file" class="login__form__label">
                <img src="@/assets/icon-modified2.png" alt="" />
              </label>
              <div class="login__form__username">
                <button type="submit" class="btn btn-info btn-fill" @click="goLoginSubmit">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="lds-facebook" >
    <img src="img/icon-modified.png" alt="" style="width:35%; height: 35%;">
    </div>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/sockjs/1/sockjs.min.js"></script>
<script>
  import { mapMutations, mapState } from "vuex";
  import ChatList from "src/components/Chat/ChatList";
  import ChatForm from "src/components/Chat/ChatForm";
  export default {
    components: {
      ChatList,ChatForm
    },
    data () {
      return {
        isLoading : false,
        type: ['', 'info', 'success', 'warning', 'danger'],
        notifications: {
          topCenter: false
        },
        userName: null,
        sid : null,
        receive_msg:null
      }
    },
    created() {
      this.userName = this.$store.state.loginModule.user;
    },
    watch: {
      getReceiveMsg (val, oldVal) {
          this.setLoading(false)
          console.log('watched: ', val)
          const msg2 = {
            userName: "영양코칭AI",
            content: this.$store.state.testModule.receiveMessage
          }
          this.msgData.push(msg2)   
          const element = document.getElementById("chat__body");
          element.scrollTop = element.scrollHeight;
      },
    },
    beforeDestroy() {
      console.log("beforedestroy");
    },
    mounted() {
      console.log("mounted");
      console.log("userName is" + this.userName);
      console.log("Login is" + localStorage.getItem("Login"));

    },
    computed: {
      ...mapState({
        msgData: (state) => state.loginModule.msgData,
        myName: (state) => state.loginModule.user,
        getReceiveMsg: (state) => state.testModule.receiveMessage,
      }),
     
    },
    mounted() {
      document.addEventListener("vueIncreaseY",function(event) {
        // alert("vueIncreaseY : " + event.detail.data);
        this.count=event.detail.data
         //음식먹었는지 안먹었는지 업데이트
        this.$store.dispatch('alarmModule/setUserMealId',this.count); //store 업뎃
        this.$store.dispatch('alarmModule/setUserChkEat',"Y"); //store 업뎃
        this.$store.dispatch("alarmModule/updateAlarmChkEatY",  this.$store.state.loginModule.user);
      }.bind(this)),
      document.addEventListener("vueIncreaseN",function(event) {
        // alert("this : " + event.detail.data);
        console.log("this : "+ event.detail.data);
        this.count=event.detail.data
         //음식먹었는지 안먹었는지 업데이트
        this.$store.dispatch('alarmModule/setUserMealId',this.count); //store 업뎃
        this.$store.dispatch('alarmModule/setUserChkEat',"N"); //store 업뎃
        this.$store.dispatch("alarmModule/updateAlarmChkEatN",  this.$store.state.loginModule.user);
      }.bind(this)),
      document.addEventListener("alarmOff",function(event) {
        // alert("this : " + event.detail.data );
        console.log("this : "+ event.detail.data);
        event.preventDefault();
        // this.$store.dispatch('loginModule/setUserAlarmState',"N"); //store 업뎃
        // this.$store.dispatch("loginModule/updateAlarmState", "N");
      }.bind(this))
    },
    methods: {
      setLoading(isLoading){
        if(isLoading){
          this.isLoading = true;
          
        }else{
          this.isLoading = false;
        }
      },
      goLoginSubmit() {
        this.$router.push({
          name: "User"
        });
      },
      notifyVue (verticalAlign, horizontalAlign) {
        const color = Math.floor((Math.random() * 4) + 1)
        this.$notifications.notify(
          {
            message: `<span>Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.</span>`,
            icon: 'nc-icon nc-app',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: this.type[color]
          })
      },
      sendMessage(content) {
        const username = this.userName;
        console.log("Send message:" + content + "  ");
        const msg = {
          userName: username,
          content: content
        }
        this.msgData.push(msg)
        this.$store.dispatch('testModule/setMyName',msg.userName);
        this.$store.dispatch('testModule/setMyMessage',msg.content);
        this.setLoading(true)
        this.$store.dispatch('testModule/getTestMessage');

      },
    }
  }

</script>
<style lang="scss">
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat__header {
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05);
  border-radius: 24px 24px 24px 0px;
  padding: 1rem;
  font-size: 14px;
  font-weight: 70;
}

.chat__header__greetings {
  color: #292929;
}

.lds-facebook{ 
  top: 40%;
  left: 40%;
  position: fixed;
  opacity: 1;
  -webkit-animation: opacity 2s linear infinite;
  animation: opacity 2s linear infinite;
  @keyframes opacity {
    0% {
      opacity:90% ;
    }
    100% {
      opacity:10% ;
    }
  }
}
.t{
  background : rgba(0,0,0,0.1) ;
}

</style>
