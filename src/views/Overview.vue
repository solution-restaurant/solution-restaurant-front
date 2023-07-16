<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-4 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category" style ="margin-bottom:5px;">알람</p>
              <p>다음식단 : {{recentMeal}}</p>
              <p>
                <input type="time" v-model="alarmTime" @change="changeAlarmTime">&nbsp;
                <toggle-button  v-model="alarmState" @change="alarmSubmit" ></toggle-button>  
              </p>
              <!-- <p>alarmTime : {{ alarmTime }}</p> -->
            </div>
          </stats-card>
        </div>
        <div class="col-xl-4 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-light-3 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">정확도</p>
              <toggle-button v-model="accuracySate"></toggle-button>  
            </div>
          </stats-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapMutations, mapState } from "vuex";
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'
  import Vue from 'vue'
  import ToggleButton from 'vue-js-toggle-button'
  Vue.use(ToggleButton)
  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard
    },
    watch: {
      getRecoMeal (val, oldVal) {
          alert('watched: ', val)
          if(this.$store.state.alarmModule.userRecoMeal != null){
            this.recentMeal = this.$store.state.alarmModule.userRecoMeal;
          }else{
            alert("최신식단 없음 알람끔!")
            this.recentMeal = "없음"
            this.alarmState = false
          }
      },
    },
    computed:{
      ...mapState({
        getRecoMeal: (state) => state.alarmModule.userRecoMeal,
      }),
    },
    data () {
      return {
        recentMeal:'',
        accuracySate: '',
        alarmState: false,
        alarmTime: this.$store.state.loginModule.userAlarmTime,
        count:1,
        editTooltip: 'Edit Task',
      }
    },
    created() {
      if(this.$store.state.loginModule.userAlarmState == "N"){
        this.alarmState = false
      }else{
        this.alarmState = true
      }
      alert("??? : " + this.$store.state.alarmModule.userRecoMeal)
      if(this.$store.state.loginModule.user != null){
        this.$store.dispatch("alarmModule/getAlarmRecent", this.$store.state.loginModule.user);//action 실행
      }
    },
    methods: {
      changeAlarmTime: function() { 
        alert("is changeAlarmTime: " + this.alarmTime);
        //DB 업데이트 
        this.$store.dispatch('loginModule/setUserAlarmTime', this.alarmTime); //store 업뎃
        this.$store.dispatch("loginModule/updateAlarmTime", this.alarmTime); //db업뎃
        console.log(this.$store.state.loginModule.user);
        //앱 세팅 
        if(this.alarmState){
          //알람 켠 상태
          window.MyApp.sendMessage(this.alarmTime + ":" + this.alarmState + ":" +"추천없음");
        }else{
          //알람 끈상태
          window.MyApp.sendMessage(this.alarmTime + ":" + this.alarmState + ":" +"추천없음");
        }
      },
      alarmSubmit: function() {  
        // alert("is alarmState: " + this.alarmState);
        if(this.alarmState){ //알람 켜고 
          this.$store.dispatch('loginModule/setUserAlarmState',"Y"); //store 업뎃
          this.$store.dispatch("loginModule/updateAlarmState", "Y");
        }else{ //알람 끄고 
          this.$store.dispatch('loginModule/setUserAlarmState',"N"); //store 업뎃
          this.$store.dispatch("loginModule/updateAlarmState", "N");
        }
        //앱 세팅 
        if(this.alarmState){
          //알람 켠상태
          alert("is userRecoMeal: " + this.$store.state.alarmModule.userRecoMeal);
          window.MyApp.sendMessage(this.alarmTime + ":" + this.alarmState + ":" + this.$store.state.alarmModule.userRecoMeal);
        }else{
          //알람 끈상태 
          window.MyApp.sendMessage(this.alarmTime + ":" + this.alarmState + ":" +"추천없음");
        }
      },
      increase: function() {
        androidApp.toastText("Hi from Vue.js");
      }
    },
    mounted() {
    },
  }
</script>
<style>

</style>
