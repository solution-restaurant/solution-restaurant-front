<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div>
          <card>
            <template slot="header">
              <h5 class="title">식단</h5>
              <div style="font-size:13px">
                추천받은 식단을 확인하세요!
              </div>
              <p class="category" style="font-size:13px; color:red">*setting 탭에 알람을 설정하고 피드백을 받아보세요!</p>
            </template>
            <l-table  :data="tableData">
              <template slot-scope="{row}">
                <td>
                  <tr>
                    {{row.title}}
                  </tr>
                  <tr v-if="row.checked">
                    {{row.feedback}}
                  </tr>
                </td>
                <td>
                  <base-checkbox v-model="row.checked"></base-checkbox>
                  <button type="button" class="btn-simple btn btn-xs btn-danger" v-tooltip.top-center="deleteTooltip">
                    <i class="fa fa-times"></i>
                  </button>
                </td>
              </template>
            </l-table>
          </card>
      </div>

      </div>
    </div>
  </div>
</template>
<script>
  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'
  export default {
    components: {
      LTable,
      Card
    },
    watch:{
      tableData(val){
        console.log("watch startTime", val);
        var jsonString = JSON.stringify(val);
        // alert(jsonString);
        
        var jsonData = JSON.parse(jsonString);
        for (var i = 0; i < jsonData.length; i++)
          console.log(jsonData[i]);
      }
    },
    computed:{
      tableData(){
        return this.$store.state.mealModule.userMealData;
      }
    },
    created () {
      alert("??? : " + this.$store.state.mealModule.userRecoMeal)
      if(this.$store.state.loginModule.user != null){
        this.$store.dispatch("mealModule/getAlarmAll", this.$store.state.loginModule.user);//action 실행
      }
    },
    data () {
      return {
        deleteTooltip: 'Remove',
      //   tableData : [{
      //     id:0,
      //     title: '소고기미ddddddddddddddd역국',
      //     feedback: '↳댓Dakota Rice',
      //     checked: false,
      //   },
      //   {
      //     id:1,
      //     title: '소고기미역국',
      //     feedback: '↳댓Dakota Rice',
      //     checked: false,
      //   },
      //   {
      //     id:2,
      //     title: '소고기미역국',
      //     feedback: '↳댓Dakota Rice',
      //     checked: false,
      //   },
      // ]
      }
    }
  }
</script>
<style>
</style>
