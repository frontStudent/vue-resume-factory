<template>
    <!-- 蓝色字体 - 灰色长条背景 -->
    <div class="title" >
      <div class="pre"></div>
      <div class="pre"></div>
        <div class="text" :style="{ fontSize: fontSize + 'px' }">{{ props.text }}</div>
    </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
const props = defineProps({ text: String, themeColor: String, bgColor: String, fontSize: Number })
const heightParam = ref(props.fontSize * 1.1 + 13 + "px")

watchEffect(() => {
  heightParam.value = props.fontSize * 1.1 + 13 + "px"
})
</script>

<style scoped>
.pre{
  background-color: v-bind(themeColor);
  width: 5px;
  height: v-bind(heightParam);
  margin-left: 6px;
}
.title {
  background-color: v-bind(bgColor);
  margin-bottom: 10px;
  border-radius: 3px;
  display: flex;
}
.text {
  font-weight: bold;
  color: v-bind(themeColor);
  margin: 1px 8px
}
</style>