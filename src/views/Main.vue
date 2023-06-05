<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <p class="header">个人日程表</p>
        <p style="display: inline;padding-left: 10px; margin:auto 0;color: darkgray;">能力有限小组</p>
      </el-header>
    </el-container>
    <el-main>
      <div class="BtnGroup">
        <button @click="showTimetable" :class="showingTimetable ? 'TimeBtnSelected' : 'TimeBtn'">课程表</button>
        <button @click="showSchedule" :class="showingSchedule ? 'ScheduleBtnSelected' : 'ScheduleBtn'">日程表</button>
      </div>
      <div class="TimeView">
        <ToDoCard v-if="showingTimetable"></ToDoCard>
        <Timetable v-if="showingTimetable"></Timetable>
      </div>
      <div class="ScheduleView">
        <ScheduleTable v-if="showingSchedule"></ScheduleTable>
      </div>
    </el-main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Timetable from '../components/Timetable.vue';
import ScheduleTable from '../components/ScheduleTable.vue';
import ToDoCard from '../components/ToDoCard.vue';


const showingTimetable = ref(true);
const showingSchedule = ref(false);

function showTimetable() {
  showingTimetable.value = true;
  showingSchedule.value = false;
}

function showSchedule() {
  showingSchedule.value = true;
  showingTimetable.value = false;
}
</script>


<style>
.el-header {
  width: 100%;
  height: 96px;
  background: #e7eefb;
  border-radius: 36px;
  box-shadow: 0px 5px 10px 0px rgba(66, 90, 176, 0.17);
  display: flex;
  margin-top: 0;
}

.header {
  color: #7E96FF;
  font-size: 24px;
  font-family: PingFang SC, PingFang SC-Bold;
  font-weight: bold;
  padding-left: 24px;
  padding-top: 10px;
}

.TimeView {
  margin-left: 80px;
  width: 95%;
}

.ScheduleView {
  margin-left: 80px;
  width: 95%;
}

.BtnGroup {
  width: 60px;
  margin-left: 5px;
  position: absolute;
  flex-wrap: wrap;
}

.TimeBtn {
  /* 按钮默认样式 */
  width: 100%;
  height: 90px;
  margin-top: 20px;
  background-color: transparent;
  color: #7E96FF;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  border-radius: 20px;
  border: 1px #7E96FF solid;
  cursor: pointer;
}

.TimeBtnSelected {
  /* 按钮被点击或选中后的样式 */
  width: 100%;
  height: 90px;
  margin-top: 20px;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  border-radius: 20px;
  border: 1px #7E96FF solid;
  cursor: pointer;
  background-color: #7E96FF;
  color: #FFFFFF;
}



.TimeBtn:hover {
  background-color: #7E96FF;
  color: white;
}

.ScheduleBtn {
  width: 100%;
  height: 90px;
  margin-top: 20px;
  background-color: transparent;
  color: #7E96FF;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  border-radius: 20px;
  border: 1px #7E96FF solid;
  cursor: pointer;
}

.ScheduleBtnSelected {
  width: 100%;
  height: 90px;
  margin-top: 20px;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  border-radius: 20px;
  border: 1px #7E96FF solid;
  cursor: pointer;
  background-color: #7E96FF;
  color: #FFFFFF;
}

.ScheduleBtn:hover {
  background-color: #7E96FF;
  color: white;
}

body {
  background: #edf3fc;
  display: flex;
}
</style>