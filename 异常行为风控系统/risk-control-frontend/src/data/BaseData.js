import { AlertTwoTone , ThunderboltTwoTone, EyeInvisibleTwoTone, CheckSquareTwoTone} from "@ant-design/icons"

//该文件是统计的基础的数据
const BaseData = [
  {
    icon: AlertTwoTone,
    color: '#F4516C',
    title: '未处理',
    count: '134'
  },
  {
    icon: CheckSquareTwoTone,
    color: '#65CFB9',
    title: '已处理',
    count: '0'
  },
  {
    icon: ThunderboltTwoTone,
    color: '#ffa940',
    title: '处理中',
    count: '--'
  },
  {
    icon: EyeInvisibleTwoTone,
    color: '#666666',
    title: '忽略',
    count: '--'
  }
]

export default BaseData