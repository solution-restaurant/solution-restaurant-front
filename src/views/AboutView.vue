<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="clickTestApi()"></button>
  </div>
</template>

<script>
export default {
  name : "",
  // 추가하고 싶은 components 등록
  components: {

  },
  // component 데이터 정의
  data: () => ({
    
  }),
  // component method
  methods: {
    clickTestApi(){
      this.$store.dispatch('testModule/getTestId');
      console.log(this.$store.state.testModule.testId);
    }
  }
};
</script>

<style scoped>

</style>