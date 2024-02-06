<script setup>
import { useRouter, RouterView } from 'vue-router'
import { ref } from 'vue'
import { Odometer, Edit, Position } from '@element-plus/icons-vue'

const activeIndex = ref('0')
const router = useRouter()
const urlMap = {
  '0': '/home',
  '1': '/workspace',
  '2': '/guide',
  '4': '/freeBoard'
}
const handleSelect = (key) => {
  if(key === '3') window.open('https://github.com/frontStudent/vue-resume-factory')
  router.push(urlMap[key])
}
</script>

<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <el-menu-item index="0" :style="{ fontWeight: 750 }">
      <h2>RESUME-FACTORY</h2>
    </el-menu-item>
    <div class="flex-grow"></div>
    <el-menu-item index="1"><el-icon>
        <Edit />
      </el-icon>工作区</el-menu-item>
      <el-menu-item index="4"><el-icon>
        <Edit />
      </el-icon>Free画板</el-menu-item>
    <el-menu-item index="2"><el-icon>
        <Odometer />
      </el-icon>使用指南</el-menu-item>
    <el-menu-item index="3"><el-icon>
        <Position />
      </el-icon>GitHub</el-menu-item>
    <!-- <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
    </el-sub-menu> -->
  </el-menu>
  <RouterView />
</template>

<style scoped>.flex-grow {
  flex-grow: 1;
}</style>
