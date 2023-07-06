<template>
  <ul class="nav nav-mobile-menu">
    <!-- <base-dropdown>
      <template slot="title">
        <i class="fa fa-globe"></i>
        <b class="caret"></b>
        <span class="notification">5 Notifications</span>
      </template>
      <a class="dropdown-item" href="#">Notification 1</a>
      <a class="dropdown-item" href="#">Notification 2</a>
      <a class="dropdown-item" href="#">Notification 3</a>
      <a class="dropdown-item" href="#">Notification 4</a>
      <a class="dropdown-item" href="#">Another notification</a>
    </base-dropdown> -->
    <li class="nav-item">
      <!-- <a href="#" class="nav-link">
        <i class="nc-icon nc-zoom-split hidden-lg-up"></i>
        <span class="d-lg-none">Search</span>
      </a> -->
    </li>
    <!-- <base-dropdown title="Dropdown">
      <a class="dropdown-item" href="#">Action</a>
      <a class="dropdown-item" href="#">Another action</a>
      <a class="dropdown-item" href="#">Something</a>
      <a class="dropdown-item" href="#">Something else here</a>
      <div class="divider"></div>
      <a class="dropdown-item" href="#">Separated link</a>
    </base-dropdown> -->

    <li class="nav-item">
      <a @click="goLogoutSubmit" class="nav-link" v-if="cookie">
        Log out
      </a>
      <a @click="goLogoutSubmit" class="nav-link" v-else>
        <sidebar-link to="/admin/user">
          Log in
        </sidebar-link>
      </a>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'mobile-menu',
    data () {
      return {
        userName: null,
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
    computed: {
      cookie(){
        return localStorage.getItem("Login");
      }
    },
    methods: {
      goLogoutSubmit() {
        if (this.userName) {
          this.userName = null;
          localStorage.removeItem("Login");
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
    }
  }
</script>
<style>
</style>
