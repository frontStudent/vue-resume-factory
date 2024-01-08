<template>
    <!-- 蓝色字体 - 灰色长条背景 -->
    <div class="title" >
      <div class="pre"></div>
      <div class="pre"></div>
        <div class="text" :style="{ fontSize }">{{ props.text }}</div>
    </div>
</template>
<script setup>
const props = defineProps({ text: String, themeColor: String, bgColor: String, fontSize: String })
</script>

<style scoped>
.pre{
  background-color: v-bind(themeColor);
  width: 5px;
  height: 35px;
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
  margin: 3px 10px
}
</style>