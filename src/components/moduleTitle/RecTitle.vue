<template>
    <div class="title" :style="{ fontSize: fontSize + 'px' }">
        {{ props.text }}
    </div>
    <div class="bottom"></div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
const props = defineProps({ text: String, themeColor: String, bgColor: String, fontSize: Number })

const borderParam = ref(props.fontSize * 1.1 + 10 + "px")

watchEffect(() => {
    borderParam.value = props.fontSize * 1.1 + 10 + "px"
})
</script>

<style scoped>
.title {
    padding: 0px 10px;
    font-weight: bold;
    color: v-bind(themeColor);
    width: 100px;
    text-align: center;
    background-color: v-bind(bgColor);
}

.bottom {
    height: 2px;
    margin-top: -1px;
    margin-bottom: 10px;
    background-color: v-bind(bgColor);
}
</style>