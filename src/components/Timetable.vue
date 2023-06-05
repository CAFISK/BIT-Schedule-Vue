<template>
  <div class="timetable">
    <div class="time-b">
      <div class="time-controller">
        <div class="flex flex-wrap items-center">
          <el-dropdown split-button type="primary" @click="TermHandleClick" v-model="setTerm">
            {{ term||"请选择" }}
            <template #dropdown>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="setTerm('2021-2022-1')">2021-2022-1</el-dropdown-item>
                <el-dropdown-item @click="setTerm('2021-2022-2')">2021-2022-2</el-dropdown-item>
                <el-dropdown-item @click="setTerm('2022-2023-1')">2022-2023-1</el-dropdown-item>
                <el-dropdown-item @click="setTerm('2022-2023-2')">2022-2023-2</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown split-button type="primary" @click="WeekHandleClick" v-model="setWeek">
            {{  "第"+ weeknum +"周"||"请选择"}}
            <template #dropdown>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="setWeek('1')">第1周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('2')">第2周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('3')">第3周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('4')">第4周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('5')">第5周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('6')">第6周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('7')">第7周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('8')">第8周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('9')">第9周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('10')">第10周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('11')">第11周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('12')">第12周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('13')">第13周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('14')">第14周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('15')">第15周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('16')">第16周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('17')">第17周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('18')">第18周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('19')">第19周</el-dropdown-item>
                <el-dropdown-item @click="setWeek('20')">第20周</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="timetable-b">
      <table class="timetable-content">
        <thead>
          <tr :style="[
            { height: '20px' },
            { width: '150px' },
            { background: '#7E96FF' },
            { color: '#fff' },
          ]">
            <th></th>
            <th v-for="(item1, index1) in weeks" :key="index1">
              {{ "周" + numberToChinease(item1, "day") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item2, index2) in 13" :key="index2">
            <td :style="[
              { height: '8px' },
              { width: '100px' },
              { background: '#7E96FF' },
              { color: '#fff' },
            ]">
              <p>{{ "第" + numberToChinease(item2) + "节" }}</p>
            </td>
            <template v-for="(item3, index3) in weeks" :key="index3">
              <td :rowspan="
                showData(index3, index2 + 1).courseName &&
                  showData(index3, index2).courseName ===
                  showData(index3, index2 + 1).courseName
                  ? (showData(index3, index2 + 2).courseName &&
                    showData(index3, index2 + 1).courseName ===
                    showData(index3, index2 + 2).courseName
                    ? 3 : 2)
                  : ''
              " :style="[
  {
    display:
      showData(index3, index2 - 1).courseName &&
        showData(index3, index2 - 1).courseName ===
        showData(index3, index2).courseName
        ? 'none'
        : '',
  },
  { height: '20px' },
  { width: '150px' },
]">
                <div class="dmsjandjs-b" :style="[
                  {
                    background: showData(index3, index2).courseIndex
                      ? getRandomColor()
                      : '#FFFFFF',
                  },
                  { color: '#fff' },
                  { borderRadius: '5px' },
                  { height: '100%' },
                  { width: '100%' },
                ]">
                  <p>{{ showData(index3, index2).courseName }}</p>
                </div>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
   
<script>
import moment from "moment";
// import weekCourse from "./Timetable.json";
import axios from "axios";
import { ref } from "vue";
export default {
  data() {
    return {
      weeknum: ref("1"),
      term: "",
      
      weekCourse: [], // 课程详细课程、数量
      weeks: [], //头部周期
      maxCourseLength: 13, //最大课节数,
      count: 0, //上周、下周、本周选择器flag
      colorList: [ //随机颜色
        "#4BBDEE",
        "#E86EEB",
        "#4BBDEE",
        "#13DAC2",
        "#7464FB",
        "#F18141",
        "#57C946",
        "#E8BE2A",
        "#508AFA",
      ]
    };
  },
  created() {
    axios({
      method: "get",
      params: {
        'sid': '1120202074',
        'week': this.weeknum,
        'term': this.term
      },
      url: "http://127.0.0.1:4523/m1/2688177-0-default/api/v1/course/schedule"
    }).then(res => {
      console.log(res.data);
      this.weekCourse = res.data|| [];
      this.autoPopulateDays();
      this.sortData();
      this.init();
      this.getWeek(0);
    })
    // this.weekCourse = weekCourse;
    // this.sortData();
    // console.log(this.weekCourse);
    // this.init();
    // this.getWeek(0);
  },
  methods: {
    setTerm(value)
    {
      this.term = value;
      console.log(this.term);
      axios({
      method: "get",
      params: {
        'sid': '112020xxxx',
        'week': this.weeknum,
        'term': this.term
      },
      url: "http://127.0.0.1:4523/m1/2688177-0-default/api/v1/course/schedule"
    }).then(res => {
      console.log(res.data);
      this.weekCourse = res.data || [];
      this.autoPopulateDays();
      this.sortData();
      this.init();
      this.getWeek(0);
    })
    },
    setWeek(value)
    {
      this.weeknum = value;
      console.log(this.weeknum);
      axios({
      method: "get",
      params: {
        'sid': '112020xxxx',
        'week': this.weeknum,
        'term': this.term
      },
      url: "http://127.0.0.1:4523/m1/2688177-0-default/api/v1/course/schedule"
    }).then(res => {
      console.log(res.data);
      this.weekCourse = res.data || [];
      this.autoPopulateDays();
      this.sortData();
      this.init();
      this.getWeek(0);
    })
    },
    //改变选择器次数
    changeCount(i) {
      this.count += i;
      return this.count;
    },
    // 排序周期和课数
    sortData() {
      //周期
      this.weekCourse.sort((a, b) => {
        return a.day - b.day;
      });
      this.weekCourse.forEach((item) => {
        for (const key in item) {
          if (key === "courses"||key==="COURSES") {
            item[key].sort((a, b) => {
              return a.courseIndex - b.courseIndex;
            });
          }
        }
      });
    },
    // 初始化课数(courses)与天数(day)
    init() {
      this.weeks = []; //周集合
      this.maxCourseLength = 0;
      this.weeks = this.weekCourse.map((item, index) => {
        for (const key in item) {
          if (key === "courses"||key==="COURSES") {
            let max = 0; //
            //取出一周中最大的课节数及当天的最大课节数
            for (let j of item[key]) {
              j.courseIndex > this.maxCourseLength &&
                (this.maxCourseLength = j.courseIndex); //取所有一周里最大课节值
              j.courseIndex > max && (max = j.courseIndex); //取当天最大课节值
            }
            console.log("max:", max);

            //如果当天的课节总数小于当天的最大课节值
            if (item[key].length < max) {
              //以最大课节值为终点遍历当天课节
              for (let i = 0; i < max; i++) {
                //如果下标课节不存在或着与循环的下标不匹配
                if (!item[key][i] || item[key][i].courseIndex != i + 1) {
                  item[key].splice(i, 0, " "); //填充空课节
                }
              }
            }
          }
        }
        console.log(this.weeks);
        return item.day;
      });
    },

    // 填充传来的数据中没有的日子
    autoPopulateDays() {
      // 获取已有的 "day" 字段值数组
      const days = this.weekCourse.map((item) => item.day);

      // 生成 1 到 7 的数组，去除已存在的天数
      const missingDays = Array.from({ length: 7 }, (_, index) => index + 1).filter(
        (day) => !days.includes(day)
      );

      // 补充缺失的 "day" 字段
      missingDays.forEach((day) => {
        this.weekCourse.push({ day, courses: [] });
      });

      // 返回补充后的 JSON 数据
      return this.weekCourse;
    },

    /**
     * 处理数据
     * @param { Number } weekIndex 周几对应的下标
     * @param { Number }  courseNum  第几节课对应的下标
     * @returns { String }   返回对应字符
     */
    showData(weekIndex, courseNum) {
      if (
        this.weekCourse[weekIndex] &&
        this.weekCourse[weekIndex].courses[courseNum] &&
        this.weekCourse[weekIndex].courses[courseNum].courseIndex === courseNum + 1
      ) {
        // this.getRandomColor();
        return this.weekCourse[weekIndex].courses[courseNum];
      }
      return false;
    },

    /**
     * 数字转中文
     * @param { Number } n 需转换的数字
     * @param { Boolean }  identifier  标识符
     * @returns { String }  identifier  转换后的中文
     */
    numberToChinease(n, identifier) {
      const chnArr = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二",
        "十三",
      ];
      return identifier === "day" && (n === 0 || n === 7) ? "日" : chnArr[n];
    },

    //随机获取颜色
    getRandomColor() {
      let colorList = this.colorList;
      let colorRandom = Math.floor(Math.random() * colorList.length + 1) - 1;
      let color;
      for (let i = 0; colorList.length > i; i++) {
        if (i == colorRandom) {
          color = colorList[i];
        }
      }
      return color;
    },

    //随机上、本、下周 日期
    getWeek(i) {
      let weekOfDay = parseInt(moment().format("E")); //计算今天是这周第几天
      let last_monday = moment()
        .subtract(weekOfDay + 7 * i - 1, "days")
        .format("YYYY-MM-DD"); //周一日期
      let last_sunday = moment()
        .subtract(weekOfDay + 7 * (i - 1), "days")
        .format("YYYY-MM-DD"); //周日日期
      this.startTime = last_monday;
      this.endTime = last_sunday;
    },
  },
};
</script>
   
<style scoped lang="scss">
.timetable {
  height: 450px;
  background: #f2f7ff;
  border: 1px solid #dce2eb;
  border-radius: 30px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
}

.time-b {
  height: 30px;
  margin-left: 50px;
  align-items: center;
  justify-content: space-between;

  .time-detail {
    margin-top: 5px;
    color: #333333;
    font-weight: 700;
    font-size: 18px;
    font-family: "Microsoft YaHei";
  }
}

.timetable-b {
  margin-top: 50px;
  margin-left: 37px;
  margin-right: 30px;
  background-color: #fff;
  overflow: auto;

  .timetable-content {
    table-layout: fixed;
    border-collapse: collapse; //设置表格的边框是否被合并为一个单一的边框
    text-align: center;
    font-size: 10px;
    width: 100%;

    thead {

      th {
        border: 2px solid rgba(27, 100, 240, 0.1);
      }
    }

    tbody {

      td {
        padding: 2px;
        border: 2px solid rgba(27, 100, 240, 0.1);

        .dmsjandjs-b {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
}

::v-deep {
  .time-controller {
    .el-dropdown {
      margin-top: 20px;
      background-color: #7E96FF;
    }
  }
}
.el-dropdown{
  margin-right: 20px;
}
</style>

  <!-- <style>
  .timetable{
    width: 1784px;
    height: 630px;
    background: #f2f7ff;
    border: 1px solid #dce2eb;
    border-radius: 50px;
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.15); 
    margin-left: 112px;
    margin-top: 430px;
    margin-bottom: 20px;
    margin-right:24px;
  }
  .time-b{
    width: 265px;
    height: 30px;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Normal;
    font-weight: normal;
    text-align: CENTER;
    color: #ffffff;
    line-height: 20px;
  }
  .timetable-content{
    width: 1693px;
    height: 531px;
  }
</style> -->