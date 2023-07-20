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
            <l-table  
            :columns="tableColumns"
            :data="tableData">
              <template slot-scope="{row}">
                <td>
                  {{ row.count+1 }}
                </td>
                <td>
                  <tr>
                    {{row.title}}
                  </tr>
                  
                  <tr v-if="row.checked &&row.chkEat=='Y'">
                    ↳ {{row.goodFB}}
                  </tr>
                  <tr v-if="row.checked &&row.chkEat=='N'">
                    ↳ {{row.badFB}}
                  </tr>
                  <tr v-if="row.checked && row.chkEat=='BEFORE'">
                    ↳ 아직 먹지 않았어요!
                  </tr>
                  <tr v-if="!row.checked">
                  </tr>
                </td>
                <td>
                  <tr v-if="row.MLD=='아침'">
                    <div style="color:rgb(119, 203, 144)">아침</div>
                  </tr>
                  <tr v-if="row.MLD=='점심'">
                    <div style="color:#8eb6ff">점심</div>
                  </tr>
                  <tr v-if="row.MLD=='저녁'">
                    <div style="color:#974949">저녁</div>
                  </tr>
                  <tr>
                  </tr>
                </td>
                <td>
                  <base-checkbox v-model="row.checked"></base-checkbox>
                </td>
                <td>
                  <button @click="removeMeal(row.id)" type="button" class="btn-simple btn btn-xs btn-danger" v-tooltip.top-center="deleteTooltip">
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
        return this.$store.state.alarmModule.userMealData;
      },
      tableColumns(){
        return  ['Id', '메뉴명', '식사시간', '피드백', '삭제']
      }
    },
    created () {
      // alert("??? : " + this.$store.state.alarmModule.userRecoMeal)
      if(this.$store.state.loginModule.user != null){
        this.$store.dispatch("alarmModule/getAlarmAll", this.$store.state.loginModule.user);//action 실행
      }
    },
    methods: {
      removeMeal (mealId) {
        // alert(mealId);
        this.$store.dispatch("alarmModule/setUserMealId", mealId);//action 실행
        this.$store.dispatch("alarmModule/removeMeal", this.$store.state.loginModule.user);//action 실행
        window.location.href = window.location.origin +"/#/admin/table-list";
        window.location.reload();
      },
    },
    data () {
      return {
        deleteTooltip: 'Remove',
      //   tableData : [{
      //     id:0,
      //     title: '소고기미ddddddddddddddd역국',
      //     goodFB: '↳댓Dakota Rice',
      //     badFB: '↳댓Dakota Rice',
      //     checked: false,
      //   },
      //   {
      //     id:1,
      //     title: '소고기미역국',
      //     goodFB: '↳댓Dakota Rice',
      //     badFB: '↳댓Dakota Rice',
      //     checked: false,
      //   },
      //   {
      //     id:2,
      //     title: '소고기미역국',
      //     goodFB: '↳댓Dakota Rice',
      //     badFB: '↳댓Dakota Rice',
      //     checked: false,
      //   },
      // ]
      }
    }
  }
</script>
<style>
</style>
