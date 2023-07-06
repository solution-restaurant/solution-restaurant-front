<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="container-md">
            <h3>회원가입</h3>
              <div class="mb-3">
                <label
                  class="form-label">닉네임</label>
                <input
                  type="name"
                  class="form-control"
                  v-model="user.name" />
              </div>
              <div class="mb-3">
                <label
                  class="form-label">비밀번호</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="user.password" />
              </div>
              <button
                @click="setJoin"
                class="btn btn-primary">
                회원가입
              </button>
          </div>
        </div>
        <div class="col-md-8">
        </div>
        <div class="col-md-4">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './UserProfile/EditProfileForm.vue'
  import UserCard from './UserProfile/UserCard.vue'
  import Login from './UserProfile/Login.vue'

  export default {
    components: {
      EditProfileForm,
      UserCard,
      Login
  },
  props: {
  },
  data() {
    return {
      user: {
        password: '',
        name:''
      }
    };
  },
  methods: {
    setJoin() {
      const userInfo = {
        userName: this.user.name,
        password: this.user.password
      }
      console.log("join:" + this.user.name + "  " + this.user.password);
      this.$store.dispatch('loginModule/setMyNameOfJoin',userInfo.userName);
      this.$store.dispatch('loginModule/setMyPasswordOfJoin',userInfo.password);
      this.$store.dispatch('loginModule/setJoin',userInfo);
    },
  }
 }

</script>
<style>

</style>
