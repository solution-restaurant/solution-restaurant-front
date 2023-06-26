<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand watermelon_font" href="#">현마카세</a>
      <button type="button"
              class="navbar-toggler navbar-toggler-right"
              :class="{toggled: $sidebar.showSidebar}"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
              @click="toggleSidebar">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="nav navbar-nav mr-auto">
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a @click="goLogoutSubmit" class="nav-link" v-if="cookie" id="loginT">
              Log out
            </a>
            <a @click="goLogoutSubmit" class="nav-link" v-else id="loginF">
              Log in
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  export default {
    computed: {
      checkLogin: function() {
        return this.$store.state.loginModule.user;
      },
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      },
      cookie(){
        return localStorage.getItem("Login");
      }
    },
    watch: {
    },
    data () {
      return {
        userName: null,
        activeNotifications: false,
      }
    },
    created() {
      if(this.$route.params.userName){
        this.userName = this.$route.params.userName;
        this.sid = this.userName;
      }else{
        this.userName = this.$store.state.loginModule.user;
      }
    },
    methods: {
      goLogoutSubmit() {
        if (this.userName) {
          this.userName = null;
          localStorage.removeItem("Login");
          //요약 해서 db저장 여기 구현
          this.$store.dispatch("loginModule/logout",this.userName);//action 실행
          this.$router.push({
            name: "User",
          });
          console.log(this.$store.state.loginModule.user);
        }else{          
          this.$router.push({
          name: "User"
        });
        }
      },
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      }
    }
  }

</script>
<style>
.watermelon_font{
  font-family: 'watermelon';
}
</style>
