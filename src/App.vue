<template>
  <div class="container">
    
    <div class="form-area">
      <el-timeline>
        <el-timeline-item v-for="({ timestamp, id, detail }, index) in moduleList" :key="index" placement="top"
          size='large' type='primary' icon='MoreFilled' :timestamp="timestamp">
          <el-form label-width="80px" v-if="id === 0">
            <div v-for="(field, index) in formFields" :key="index" class="field">
              <el-form-item label="label">
                <el-input v-model="field.label" placeholder="字段名"></el-input>
              </el-form-item>
              <el-form-item label="value">
                <el-input v-model="field.value" placeholder="字段值"></el-input>
              </el-form-item>
              <el-button @click="removeField(index)" style="margin-left: 20px;">delete</el-button>
            </div>
            <el-form-item>
              <el-button type="primary" @click="addField">添加自定义字段</el-button>
            </el-form-item>
          </el-form>
          <div v-else>
            <el-form label-width="80px">
              <div v-for="(field, index) in detail" :key="index">
                <div class="time-sec" v-if="field.type === 'time'">
                  <el-form-item label="时间跨度">
                    <el-date-picker v-model="field.dateRange" type="daterange" start-placeholder="起始日期"
                      end-placeholder="结束日期" />
                  </el-form-item>
                  <el-form-item label="信息1">
                    <el-input v-model="field.info1" placeholder="信息1"></el-input>
                  </el-form-item>
                  <el-form-item label="信息2">
                    <el-input v-model="field.info2" placeholder="信息2"></el-input>
                  </el-form-item>
                  <el-button @click="removeSec(id, index)" style="margin-left: 20px;">删除</el-button>
                </div>
                <div class="desc" v-if="field.type === 'desc'">
                  <el-form-item label="描述">
                    <el-input v-model="field.desc" placeholder="描述" autosize type="textarea" style="width: 280px;">
                    </el-input>
                  </el-form-item>
                  <el-button @click="removeSec(id, index)" style="margin-left: 20px;">删除</el-button>
                </div>
              </div>
              <el-space style="margin: 20px;">
                <el-button type="primary" @click="addSec(id, 0)">添加时间段</el-button>
                <el-button type="primary" @click="addSec(id, 1)">添加描述</el-button>
              </el-space>
            </el-form>
          </div>
          <el-space>
            <el-button @click="addModule(index)">在下方插入模块</el-button>
            <el-button @click="removeModule(index)" :disabled="id === 0">删除当前模块</el-button>
            <el-button @click="moveModule(index, 0)">up</el-button>
            <el-button @click="moveModule(index, 1)">down</el-button>
          </el-space>
        </el-timeline-item>
      </el-timeline>
    </div>

    <div class="display-area">
      <div class="preview">
        <div ref="captureElement" style="position: relative;">
          <div class="resume-header">- PERSONAL RESUME -</div>

          <div v-for="(_module, index) in moduleList" :key="index" class="module">
            <component :is="themeMap[drawerInfo.titleStyle]" :text="_module.timestamp" :themeColor="themeColor"/>
            <el-row v-if="_module.id === 0">
              <div style="width: 500px;">
                <el-row v-for="(row, index) in _formFields" :key="index" :gutter="40">
                  <el-col v-for="({ label, value }) in row" :key="label" :span="10">
                    {{ label }}: {{ value }}
                  </el-col>
                </el-row>
              </div>
              <ImgCropper />
            </el-row>
            <div v-else>
              <div v-for="({ type, dateRange, info1, info2, desc }, index) in _module.detail" :key="index">
                <div v-if="type === 'time'" class="time-sec-view">
                  <div>{{ dayjs(dateRange[0]).format('YYYY-MM-DD') }} ~ {{ dayjs(dateRange[1]).format('YYYY-MM-DD')
                  }}</div>
                  <div>{{ info1 }} </div>
                  <div>{{ info2 }}</div>
                </div>
                <div v-if="type === 'desc'" class="desc-view">
                  <!-- <span class="bullet"></span> -->
                  {{ desc }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="op-but">
        <el-button @click="drawerInfo.visible = true">更多配置</el-button>
        <el-button @click="capture">保存为PDF</el-button>
      </div>

    </div>

    <el-dialog v-model="dialogInfo.visible" title="新增模块">
      <el-form-item label="模块名称" label-width="80px">
        <el-input v-model="dialogInfo.name" autocomplete="off" placeholder="请输入模块名称" />
      </el-form-item>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogInfo.visible = false">取消</el-button>
          <el-button type="primary" @click="submitModule">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-drawer v-model="drawerInfo.visible" title="更多配置">
      <el-form>
        <el-form-item label="标题" label-width="80px">
          <el-radio-group v-model="drawerInfo.titleStyle" class="ml-4">
            <el-radio label="0" size="large">经典</el-radio>
            <el-radio label="1" size="large">极简</el-radio>
            <el-radio label="2" size="large">灰底</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="主题色" label-width="80px">
          <el-color-picker v-model="themeColor" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import dayjs from 'dayjs';


import DefaultTitle from './components/moduleTitle/DefaultTitle.vue';
import PlainTitle from './components/moduleTitle/PlainTitle.vue';
import BlueGrayTitle from './components/moduleTitle/BlueGrayTitle.vue';
import ImgCropper from './components/ImgCropper.vue';

const themeColor = ref('#255ca0b8');
const captureElement = ref(null);
const curModuleIndex = ref(0);
const formFields = reactive([
  { label: '姓名', value: '林远' },
  { label: '年龄', value: '23' },
  { label: '籍贯', value: '山东青岛' },
  { label: '学历', value: '硕士' },
  { label: '工作经验', value: '2年' }
]);

// 新增模块弹窗信息
const dialogInfo = reactive({
  visible: false,
  name: '',
})

// 配置drawer信息
const drawerInfo = reactive({
  visible: false,
  titleStyle: '1'
})

let moduleList = reactive([
  { id: 0, timestamp: '基础信息' },
]);

const themeMap = {
  0: DefaultTitle,
  1: PlainTitle,
  2: BlueGrayTitle,
}
const _formFields = computed(() => {
  const rows = formFields.length
  // 将formFields转换为二维数组，每个子数组包含2个元素
  const _newList = Array.from({ length: rows }, (_, i) => formFields.slice(i * (2), (i + 1) * (2)))
  return _newList
})

// const uploadClick = () => {
//   console.log('uploadClick')
//   document.getElementById('imageInput').click()
// }

// 基础信息增删操作
const addField = () => {
  formFields.push({ label: '', value: '' });
};
const removeField = (index) => {
  formFields.splice(index, 1);
};

// 时间段/文字描述增删操作
const addSec = (moduleId, type) => {
  let mod = moduleList.find(m => m.id === moduleId)
  if (type === 0) {
    mod.detail = [...mod.detail, { dateRange: [dayjs(), dayjs()], info1: '华中科技大学', info2: '计算机科学与技术', type: 'time' }]
    return
  }
  mod.detail = [...mod.detail, { desc: '请描述你的经历/技能！', type: 'desc' }];
}
const removeSec = (moduleId, index) => {
  let mod = moduleList.find(m => m.id === moduleId)
  mod.detail.splice(index, 1);
}

// 模块增删操作
const addModule = (index) => {
  dialogInfo.visible = true;
  curModuleIndex.value = index;
}
const submitModule = () => {
  dialogInfo.visible = false;
  moduleList.splice(curModuleIndex.value + 1, 0, { id: new Date().getTime(), timestamp: dialogInfo.name, detail: [] });
  dialogInfo.name = '';
}

const removeModule = (index) => {
  moduleList.splice(index, 1);
}

// op 0 表示前移 ，1 表示下移
const moveModule = (index, op) => {
  if (op === 0 && index > 0) {
    let element = moduleList.splice(index, 1)[0];
    moduleList.splice(index - 1, 0, element);
  } else if (op === 1 && index < moduleList.length - 1) {
    let element = moduleList.splice(index, 1)[0];
    moduleList.splice(index + 1, 0, element);
  }
}

const capture = () => {
  if (captureElement.value) {
    html2canvas(captureElement.value, {
      dpi: 300, // 设置截图的分辨率
      scale: 3,
      background: '#fff',
    }).then(canvas => {
      const a4Width = 595.28;
      // const a4Height = 841.89;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = a4Width - 60;
      const imgHeight = imgWidth / canvasWidth * canvasHeight;
      const imgData = canvas.toDataURL('image/png', 1);
      const pdf = new jspdf(
        '', 'pt', 'a4'
      );
      pdf.addImage(imgData, 'PNG', 30, 30, imgWidth, imgHeight, '', 'FAST');
      pdf.save('capture.pdf');
    });
  }
  console.log('captureElement is null')
};
</script>

<style>
.form-area {
  width: 50%;
}

.field {
  display: flex;
  margin: 3px 0;
}

.display-area {
  left: 1000px;
  position: fixed;
  top: 30px;
  width: 35%;
}

.container {
  display: flex;
  width: 1500px;
  margin-top: 50px;
}

.resume-header {
  font-weight: 800;
  font-size: 20px;
  text-align: center;
}

.module {
  margin: 15px 0;
}

#imageDisplay {
  position: absolute;
  right: 80px;
  top: 40px;
  width: 100px;
  height: 100px
}

.time-sec-view {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.time-sec-view>div {
  font-weight: 600;
}

.preview {
  padding: 20px 40px;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid #eee;


}

.time-sec {
  background-color: #eaf0f5;
  margin-top: 10px;
  padding: 15px;
  width: 500px;
  border-radius: 15px;
  border: 1px dashed #ced7dd;
}

.desc {
  display: flex;
  background-color: #eaf0f5;
  margin-top: 10px;
  padding: 15px;
  width: 500px;
  border-radius: 15px;
  border: 1px dashed #ced7dd;
}

.bullet {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgb(66, 66, 66);
  margin-right: 5px;
  /* 调整圆点与文本之间的距离 */
  vertical-align: middle;
}

.desc-view {
  margin: 3px 0;
}

.op-but {
  position: fixed;
  top: 30px;
  right: 30px;
}

</style>




