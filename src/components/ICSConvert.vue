<template>
    <div>
        <input type="file" @change="handleFileChange" accept=".ics">
        <!-- <button @click="convertFile">更新日程表</button> -->
    </div>
</template>
  
<script>
import icsToJson from 'ics-to-json';
import { provide, ref } from 'vue';

export default {
    data() {
        return {
            selectedFile: null,
            jsonContent: ref([]),
        };
    },
    methods: {
        async handleFileChange(event) {
            this.selectedFile = event.target.files[0];

            this.convertFile();
        },
        async convertFile() {
            if (this.selectedFile) {
                try {
                    const icsData = await this.readFileAsText(this.selectedFile);
                    const jsonData = await icsToJson(icsData);
                    this.jsonContent = (Object.values(jsonData));
                    console.log(this.jsonContent);
                    this.jsonContent = this.transformJson(this.jsonContent);
                    console.log(this.jsonContent);
                    this.$emit('update-json-content', this.jsonContent); // 发送自定义事件，传递 jsonContent 给父级组件
                    // this.saveDataToFile();// 存储转换后的jsonContent
                } catch (error) {
                    console.error('转换失败', error);
                }
            } else {
                console.error('请选择一个文件');
            }
        },
        readFileAsText(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => resolve(event.target.result);
                reader.onerror = (event) => reject(new Error('读取文件失败'));
                reader.readAsText(file);
            });
        },
        transformJson(rawJSON) {
            const transformedData = {
                schedule: []
            };

            // Iterate over each object in the input JSON data
            console.log("2222 " + Array.isArray(rawJSON));
            if (Array.isArray(rawJSON)) {
                rawJSON.forEach(item => {
                    var { summary, endDate, startDate } = item;
                    endDate = this.formatDate(endDate);
                    // Find the existing date in the transformed data or create a new entry
                    let dateEntry = transformedData.schedule.find(entry => entry.date === endDate);

                    if (!dateEntry) {
                        dateEntry = {
                            date: endDate,
                            events: []
                        };
                        transformedData.schedule.push(dateEntry);
                    }

                    // Add the summary to the events array of the corresponding date
                    dateEntry.events.push(summary);
                });
            }
            return transformedData;
        },
        formatDate(dateString) {
            const index = dateString.indexOf("T");
            if (index !== -1) {
                const date = dateString.substring(0, index);
                const year = date.substring(0, 4);
                const month = date.substring(4, 6);
                const day = date.substring(6, 8);
                return `${year}-${month}-${day}`;
            }
            return dateString;
        },
        // 把转换后的json存储成文件保存到本地
        saveDataToFile() {
            if (this.jsonContent != null) {
                const jsonData = JSON.stringify(this.jsonContent); // 将数据转换为 JSON 字符串
                const blob = new Blob([jsonData], { type: 'application/json' }); // 创建 Blob 对象
                const url = URL.createObjectURL(blob); // 通过 URL.createObjectURL() 创建 URL
                const link = document.createElement('a'); // 创建 <a> 元素
                link.href = url; // 设置 <a> 元素的链接
                link.download = 'data.json'; // 设置下载文件的名称
                link.click(); // 模拟点击下载
                URL.revokeObjectURL(url); // 释放 URL 对象
            }
            else {
                console.log("NULLLLLLLLL");
            }
        },
    },
};
</script>

