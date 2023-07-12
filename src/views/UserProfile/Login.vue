<template>
  <div v-if="userName == null">
    <h3>로그인</h3>
    <br>
    <div class="mb-3">
      <label class="form-label">아이디</label>
      <input
        id="input-username"
        type="name"
        class="form-control"
        v-model="user.name" />
    </div>
    <div class="mb-3">
      <label class="form-label">비밀번호</label>
      <input
        type="password"
        class="form-control"
        v-model="user.password" />
    </div>
    <button
      @click="loginSubmit" style="margin-right: 10px;"
      class="btn btn-info btn-fill">
      로그인
    </button>
    <button
      @click="goJoin"
      class="btn btn-info btn-fill">
      회원가입
    </button>
  </div>
  <div v-else>
    <div class="card">
      <div class="header text-center">
        <h4 class="title watermelon_font">회원정보</h4>
        <p class="category">*'적용'버튼 클릭 시 수정된 정보로 저장됩니다.</p>
        <br>
      </div>
      <div class="content table-responsive table-upgrade">
        <table class="table">
          <thead>
          </thead>
          <tbody>
          <tr>
            <td class="text-center">닉네임</td>
            <td>16</td>
          </tr>
          <tr>
            <td class="text-center">비밀번호</td>
            <td>4</td>
          </tr>
          <tr>
            <td class="text-center">나이</td>
            <td>4</td>
          </tr>
          <tr>
            <td class="text-center">성별</td>
            <td><i class="fa fa-check text-success"></i></td>
          </tr>
          <tr>
            <td class="text-center">키</td>
            <td><i class="fa fa-check text-success"></i></td>
          </tr>
          <tr>
            <td class="text-center">몸무게</td>
            <td><i class="fa fa-times text-danger"></i></td>
          </tr>
          <tr>
            <td class="text-center">질환</td>
            <td><i class="fa fa-times text-danger"></i></td>
          </tr>
          <tr>
            <td class="text-center">알러지</td>
            <td>Free</td>
          </tr>
          <tr class="last-row">
            <td>
              <a href="#" class="upgrade-table-btn btn btn-b btn-round btn-fill btn-default disabled">적용</a>
            </td>
            <td>
              <a target="_blank" href="http://www.creative-tim.com/product/vue-light-bootstrap-dashboard-pro/?ref=vue-lbdupgrade" class="upgrade-table-btn btn btn-round btn-fill btn-info">취소</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data () {
      return {
        userName: "",
        inputName: "",
        user: {
          password: '',
          name:''
        }
      }
    },
    created() {
      this.userName = this.$store.state.loginModule.user;
    },
    methods: {
      loginSubmit() {
        localStorage.setItem("Login", "T");
        const userInfo = {
          userName: this.user.name,
          password: this.user.password
        }
        console.log("join:" + this.user.name + "  " + this.user.password);
        this.$store.dispatch('loginModule/setMyNameOfLogin',userInfo.userName);
        this.$store.dispatch('loginModule/setMyPasswordOfLogin',userInfo.password);
        this.$store.dispatch("loginModule/login", userInfo);//action 실행
        console.log(this.$store.state.loginModule.user);
      },
      goJoin() {
        this.$router.push({
          name: "UserJoin"
        });
      }
    },
  }

</script>
<style>
.login__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login__form__label {
  position: relative;
}

.login__form__avatar {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.login__form__avatar__overlay {
  position: absolute;
  background-color: #000;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  opacity: 0;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.login__form__label:hover .login__form__avatar__overlay {
  opacity: 0.2;
}

.login__form__username {
  margin-top: 2rem;
}

.login__form__username__label {
  display: block;
  text-align: center;
  font-weight: 700;
  color: #292929;
}

.login__form__username__input {
  width: 8rem;
  margin-top: 2rem;
  padding: 0.4rem;
  border: none;
  border-bottom: 1.5px solid #afb4b8;
  text-align: center;
  font-size: 18px;
}

.login__form__username__input:focus {
  outline: none;
}
</style>
