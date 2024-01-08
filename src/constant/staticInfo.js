import dayjs from 'dayjs'
export default [
  { id: 0, timestamp: '基础信息' },
  {
    id: 1,
    timestamp: '个人技能',
    detail: [
      { desc: '1. 请描述你的技能', type: 'desc' },
      { desc: '2. 请描述你的技能', type: 'desc' },
      { desc: '3. 请描述你的技能', type: 'desc' },
      { desc: '4. 请描述你的技能', type: 'desc' }
    ]
  },
  {
    id: 2,
    timestamp: '教育经历',
    detail: [
      {
        dateRange: [dayjs(), dayjs()],
        info1: '华中科技大学',
        info2: '计算机科学与技术',
        type: 'time'
      },
      { desc: '请描述你的经历', type: 'desc' },
      { desc: '请描述你的经历', type: 'desc' },
      { dateRange: [dayjs(), dayjs()], info1: '北京大学', info2: '计算机科学与技术', type: 'time' },
      { desc: '请描述你的经历', type: 'desc' },
      { desc: '请描述你的经历', type: 'desc' }
    ]
  },
  {
    id: 3,
    timestamp: '项目经历',
    detail: [
      {
        dateRange: [dayjs(), dayjs()],
        info1: '在线简历制作系统',
        info2: 'vue3+element-plus',
        type: 'time'
      },
      { desc: '请介绍你的项目', type: 'desc' },
      { desc: '请介绍你的项目', type: 'desc' },
      {
        dateRange: [dayjs(), dayjs()],
        info1: '在线简历制作系统',
        info2: 'vue3+element-plus',
        type: 'time'
      },
      { desc: '请介绍你的项目', type: 'desc' },
      { desc: '请介绍你的项目', type: 'desc' }
    ]
  }
]
