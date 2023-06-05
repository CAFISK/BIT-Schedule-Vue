<template>
  <el-calendar>
    <template #date-cell="{ data }">
      <p :class="data.isSelected ? 'is-selected' : ''" style="color: black; 
       margin-left: 0;font-size:10px;
  -webkit-line-clamp:3;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;">
        {{ data.day.split('-').slice(1).join('-') }}
        {{ data.isSelected ? '✔️' : '' }}
      
        <!-- 此处自定义显示每天事件-->
      <ul>
        <li v-for="event in getEventsByDate(data.day)">{{ event }}</li>
      </ul>
      </p>
    </template>
  </el-calendar>
  <p></p>
  <ICSConvert @update-json-content="handleReceivedJsonContent"></ICSConvert>

</template>

<script>
import { ref, computed } from 'vue';
import scheduleData from './Schedule.json';
import ICSConvert from './ICSConvert.vue';

export default {
  components: {
    ICSConvert
  },
  data() {
    return {
      value: ref(new Date()),
      schedule: ref([]),
      receivedJsonContent: ref([]),
    };
  },
  methods: {
    getEventsByDate(date) {
      const events = this.schedule.find((item) => item.date === date)?.events;
      return events || [];
    },
    handleReceivedJsonContent(jsonContent) {
      this.receivedJsonContent = jsonContent;
      this.schedule = this.receivedJsonContent.schedule; // 更新 schedule 数据为传递过来的 jsonContent.schedule
    },
  }
};

</script>

<style scoped>
.is-selected {
  color: #1989fa;
}
ul{
  padding-left: 0;
  padding-bottom: 2px;
}
li{
  margin-left: 0;
  font-size:10px;
  color: #1989fa;; 
  -webkit-line-clamp:3;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>



