<template>
    <div class="container">
        <div class="T0">基本注意事项</div>
        <div class="T2">1. 使用时不要刷新网页！该网站暂时不会实时保存数据</div>
        <div class="T0">可能遇到的困扰：</div>
        <div class="T2">1. 我保存的简历最下方不完整，该如何解决？</div>
        <div class="T3">目前我们在保存pdf时仅会保存在A4纸大小范围之内的预览区域，超出该范围大小的预览区域会被忽视</div>
        <div class="T3">可以通过右上角操作栏调整字号大小与页边距，或适当缩减篇幅</div>
        <div class="T2">2. 我上传的头像照片位置和大小不满意怎么办？</div>
        <div class="T3">上传后的头像照片支持形状拉伸与位置拖拽功能</div>
        <div class="T0">未完待续</div>
    </div>
</template>
  
<script setup>

</script>
  
<style scoped>
.container {
    padding: 30px 100px;
    display: flex;
    flex-direction: column;
}
.T0 {
    font-size: 28px;
    font-weight: 800;
    margin: 15px 0px;
    padding: 5px;
    border-bottom: 1px solid #c0bfbf3c;
}
.T1 {
    font-size: 24px;
    font-weight: 750;
    margin-bottom: 10px;
}

.T2 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
}

.T3 {
    font-size: 16px;
    margin-bottom: 5px;
}
</style>
  