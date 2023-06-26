<template>
  <div class="content">
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
              <img src="@/assets/egg.png" alt="" />
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
    methods: {
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

</style>
