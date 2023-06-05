<template>
  <!-- <input type="file" @change="handleFileChange" accept=".json"> -->
  <div class="box-card">
    <div class="img-card">
      <div class="circle">
        <p>{{ nowDay }}</p>
      </div>
    </div>
    <div class="items">
      <ol v-for="event in recentEvents" :key="event.date" class="item">
        <div class="item-title">{{ event.date }}</div>
        <div class="item-des">
          <p v-for="eventItem in event.events" :key="eventItem">{{ eventItem }}</p>
        </div>
      </ol>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { ref } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      nowDay: moment().format("MM.DD"),
      jsonData: null,
      recentEvents: [],
      numOfEvents: 3,// 同时显示几个最近事项
    };
  },
  created() {
    axios({
      method: "get",
      url: "http://127.0.0.1:4523/m2/2688177-0-default/84882219"
    }).then(res => {
      console.log(res.data);
      this.jsonData = res.data || [];
      this.displayEvents();
    })
  },
  methods: {
   
    handleFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        try {
          this.jsonData = JSON.parse(reader.result);
          this.displayEvents();
        } catch (error) {
          console.error('读取文件失败', error);
        }
      };

      reader.onerror = () => {
        console.error('读取文件失败');
      };

      reader.readAsText(file);
    },
    displayEvents() {
      if (!this.jsonData || !this.jsonData.schedule) {
        return;
      }

      const sortedEvents = this.jsonData.schedule.sort((a, b) => new Date(a.date) - new Date(b.date));
      this.recentEvents = sortedEvents.slice(0, this.numOfEvents);
    },
  },
};
</script>

  
<style scoped> .box-card {
   width: 100%;
   height: 208px;
   background: #f2f7ff;
   border-radius: 24px;
   box-shadow: 5px 5px 8px 0px rgba(66, 90, 176, 0.15);
   display: flex;
   overflow: hidden;
   white-space: nowrap;
   margin-bottom: 10px;
 }

 .img-card {
   width: 168px;
   height: 168px;
   margin: auto 29px;
   background: linear-gradient(180deg, #fc5c7d, #6a82fb);
   border-radius: 29px;
   display: inline-block;
   /* padding-left: 10px;
    padding-right: 10px; */
 }

 .circle {
   width: 120px;
   height: 120px;
   margin: 12px auto;
   border: 10px solid #ffffff;

   border-radius: 70px;
 }

 .circle p {
   font-size: 30px;
   font-family: Microsoft YaHei, Microsoft YaHei-Bold;
   font-weight: normal;
   text-align: CENTER;
   color: #ffffff;
   line-height: 30px;
   margin-top: 50%;
   transform: translate(0, -50%);

 }

 .items {
   display: inline;
   overflow-x: scroll;
   overflow-y: hidden;
   margin-top: 40px;
   width: 80%;
 }

 .items ol {
   display: inline-block;
   width: 200px;
   margin-left: 30px;
   margin-right: 30px;
   height: 200px;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
 }

 .item .item-title {
   height: 30px;
   background-color: #6a82fb;
   color: white;
   line-height: 30px;
   padding-left: 10px;
   border-radius: 20px;
 }

 .item .item-des {
   width: 100%;
   height: 30px;
   color: darkgray;
   line-height: 30px;
   padding-left: 10px;
   border-radius: 20px;
   margin-top: 20px;
 }
</style>