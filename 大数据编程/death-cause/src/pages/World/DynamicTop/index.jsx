import React, { useEffect, useState } from 'react'
// 引入 ECharts 主模块
import * as echarts from 'echarts/lib/echarts.js'
// 引入折线图
import 'echarts/lib/chart/bar'
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent, GraphicComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([TitleComponent, TooltipComponent, GridComponent, CanvasRenderer, LegendComponent, GraphicComponent])

export default function DynamicTop() {
  const [isFirst, setIsFirst] = useState(true)
  const updateFrequency = 700
  const dimension = 0
  const deathColors = ['#006C6C', '#008685', '#31A09F', '#52BCBA', '#00698A', '#0A82A4', '#3A9DBF', '#5AB8DB', '#99ADD1', '#AE95FF', '#78D3F8', '#6FD8D6', '#907BFF']
  const years = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019]

  const data = [
    [
      //1990
      12051191, //心血管疾病 Cardiovascular diseases
      5747722, //肿瘤 Neoplasms
      3090142, //慢性呼吸道疾病 Chronic respiratory diseases
      1850459, //消化系统疾病 Digestive diseases
      3299783, //下呼吸道感染 Lower respiratory infections
      2985155, //新生儿疾病 Neonatal disorders
      560238, //阿尔茨海默氏症和其他痴呆症
      659823, //糖尿病 Diabetes mellitus
      2882171, //腹泻疾病 Diarrheal diseases
      1010018, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1770749, //肺结核 Tuberculosis
      1110710, //道路伤害 Road injuries
      326064 //艾滋病
    ],
    [
      //1991
      12208817, //心血管疾病 Cardiovascular diseases
      5862861, //肿瘤 Neoplasms
      3145611, //慢性呼吸道疾病 Chronic respiratory diseases
      1873410, //消化系统疾病 Digestive diseases
      3264016, //下呼吸道感染 Lower respiratory infections
      2955231, //新生儿疾病 Neonatal disorders
      582775, //阿尔茨海默氏症和其他痴呆症
      678279, //糖尿病 Diabetes mellitus
      2889845, //腹泻疾病 Diarrheal diseases
      1024357, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1780172, //肺结核 Tuberculosis
      1114880, //道路伤害 Road injuries
      416165 //艾滋病
    ],
    [
      //1992
      12425927, //心血管疾病 Cardiovascular diseases
      5990731, //肿瘤 Neoplasms
      3205064, //慢性呼吸道疾病 Chronic respiratory diseases
      1899463, //消化系统疾病 Digestive diseases
      3239281, //下呼吸道感染 Lower respiratory infections
      2929905, //新生儿疾病 Neonatal disorders
      605485, //阿尔茨海默氏症和其他痴呆症
      700800, //糖尿病 Diabetes mellitus
      2858170, //腹泻疾病 Diarrheal diseases
      1040326, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1801199, //肺结核 Tuberculosis
      1123321, //道路伤害 Road injuries
      520082 //艾滋病
    ],
    [
      //1993
      12789369, //心血管疾病 Cardiovascular diseases
      6161392, //肿瘤 Neoplasms
      3263772, //慢性呼吸道疾病 Chronic respiratory diseases
      1935023, //消化系统疾病 Digestive diseases
      3206753, //下呼吸道感染 Lower respiratory infections
      2903205, //新生儿疾病 Neonatal disorders
      629143, //阿尔茨海默氏症和其他痴呆症
      726500, //糖尿病 Diabetes mellitus
      2784369, //腹泻疾病 Diarrheal diseases
      1064965, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1767678, //肺结核 Tuberculosis
      1135056, //道路伤害 Road injuries
      638466 //艾滋病
    ],
    [
      //1994
      13012859, //心血管疾病 Cardiovascular diseases
      6290097, //肿瘤 Neoplasms
      3294377, //慢性呼吸道疾病 Chronic respiratory diseases
      1962904, //消化系统疾病 Digestive diseases
      3166330, //下呼吸道感染 Lower respiratory infections
      2874238, //新生儿疾病 Neonatal disorders
      651731, //阿尔茨海默氏症和其他痴呆症
      749547, //糖尿病 Diabetes mellitus
      2725452, //腹泻疾病 Diarrheal diseases
      1086432, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1746243, //肺结核 Tuberculosis
      1151121, //道路伤害 Road injuries
      767884 //艾滋病
    ],
    [
      //1995
      13115105, //心血管疾病 Cardiovascular diseases
      6396616, //肿瘤 Neoplasms
      3310310, //慢性呼吸道疾病 Chronic respiratory diseases
      1979258, //消化系统疾病 Digestive diseases
      3127269, //下呼吸道感染 Lower respiratory infections
      2850329, //新生儿疾病 Neonatal disorders
      674351, //阿尔茨海默氏症和其他痴呆症
      771641, //糖尿病 Diabetes mellitus
      2657752, //腹泻疾病 Diarrheal diseases
      1101343, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1730722, //肺结核 Tuberculosis
      1160154, //道路伤害 Road injuries
      899961 //艾滋病
    ],
    [
      //1996
      13198869, //心血管疾病 Cardiovascular diseases
      6484102, //肿瘤 Neoplasms
      3339582, //慢性呼吸道疾病 Chronic respiratory diseases
      1990305, //消化系统疾病 Digestive diseases
      3069546, //下呼吸道感染 Lower respiratory infections
      2816964, //新生儿疾病 Neonatal disorders
      696178, //阿尔茨海默氏症和其他痴呆症
      797050, //糖尿病 Diabetes mellitus
      2599794, //腹泻疾病 Diarrheal diseases
      1112097, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1712611, //肺结核 Tuberculosis
      1160071, //道路伤害 Road injuries
      1017449 //艾滋病
    ],
    [
      //1997
      13324761, //心血管疾病 Cardiovascular diseases
      6579382, //肿瘤 Neoplasms
      3378868, //慢性呼吸道疾病 Chronic respiratory diseases
      2009279, //消化系统疾病 Digestive diseases
      3025824, //下呼吸道感染 Lower respiratory infections
      2792744, //新生儿疾病 Neonatal disorders
      716832, //阿尔茨海默氏症和其他痴呆症
      825648, //糖尿病 Diabetes mellitus
      2563416, //腹泻疾病 Diarrheal diseases
      1125742, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1717566, //肺结核 Tuberculosis
      1166990, //道路伤害 Road injuries
      1125207 //艾滋病
    ],
    [
      //1998
      13445792, //心血管疾病
      6696230, //肿瘤
      3398403, //慢性呼吸道疾病
      2025018, //消化系统疾病
      2977697, //下呼吸道感染
      2768035, //新生儿疾病
      738234, //阿尔茨海默氏症和其他痴呆症
      852199, //糖尿病
      2528967, //腹泻疾病
      1138201, //肝硬化等慢性肝病
      1715636, //肺结核
      1174923, //道路伤害
      1250875 //艾滋病
    ],
    [
      //1999
      13704507, //心血管疾病 Cardiovascular diseases
      6850383, //肿瘤 Neoplasms
      3416562, //慢性呼吸道疾病 Chronic respiratory diseases
      2048450, //消化系统疾病 Digestive diseases
      2928553, //下呼吸道感染 Lower respiratory infections
      2740255, //新生儿疾病 Neonatal disorders
      761061, //阿尔茨海默氏症和其他痴呆症
      877176, //糖尿病 Diabetes mellitus
      2481504, //腹泻疾病 Diarrheal diseases
      1155177, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1710252, //肺结核 Tuberculosis
      1192318, //道路伤害 Road injuries
      1384308 //艾滋病
    ],
    [
      //2000
      13940134, //心血管疾病
      6994495, //肿瘤
      3446877, //慢性呼吸道疾病
      2073671, //消化系统疾病
      2873461, //下呼吸道感染
      2713054, //新生儿疾病
      786025, //阿尔茨海默氏症和其他痴呆症
      903494, //糖尿病
      2425488, //腹泻疾病
      1174182, //肝硬化等慢性肝病
      1705296, //肺结核
      1209301, //道路伤害
      1502798 //艾滋病
    ],
    [
      //2001
      14168212, //心血管疾病 Cardiovascular diseases
      7106619, //肿瘤 Neoplasms
      3462653, //慢性呼吸道疾病 Chronic respiratory diseases
      2101852, //消化系统疾病 Digestive diseases
      2808210, //下呼吸道感染 Lower respiratory infections
      2683714, //新生儿疾病 Neonatal disorders
      813920, //阿尔茨海默氏症和其他痴呆症
      932295, //糖尿病 Diabetes mellitus
      2364012, //腹泻疾病 Diarrheal diseases
      1196741, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1673199, //肺结核 Tuberculosis
      1221121, //道路伤害 Road injuries
      1605821 //艾滋病
    ],
    [
      //2002
      14483864, //心血管疾病 Cardiovascular diseases
      7246128, //肿瘤 Neoplasms
      3487066, //慢性呼吸道疾病 Chronic respiratory diseases
      2137996, //消化系统疾病 Digestive diseases
      2766468, //下呼吸道感染 Lower respiratory infections
      2664501, //新生儿疾病 Neonatal disorders
      845056, //阿尔茨海默氏症和其他痴呆症
      967920, //糖尿病 Diabetes mellitus
      2299035, //腹泻疾病 Diarrheal diseases
      1224051, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1640388, //肺结核 Tuberculosis
      1233982, //道路伤害 Road injuries
      1690616 //艾滋病, //心血管疾病 Cardiovascular diseases
    ],
    [
      //2003
      14692487, //心血管疾病 Cardiovascular diseases
      7380227, //肿瘤 Neoplasms
      3488342, //慢性呼吸道疾病 Chronic respiratory diseases
      2167694, //消化系统疾病 Digestive diseases
      2724427, //下呼吸道感染 Lower respiratory infections
      2644043, //新生儿疾病 Neonatal disorders
      845056, //阿尔茨海默氏症和其他痴呆症
      967920, //糖尿病 Diabetes mellitus
      2229976, //腹泻疾病 Diarrheal diseases
      1248160, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1603142, //肺结核 Tuberculosis
      1233982, //道路伤害 Road injuries
      1753706 //艾滋病
    ],
    [
      //2004
      14727314, //心血管疾病 Cardiovascular diseases
      7496252, //肿瘤 Neoplasms
      3459494, //慢性呼吸道疾病 Chronic respiratory diseases
      2181847, //消化系统疾病 Digestive diseases
      2675009, //下呼吸道感染 Lower respiratory infections
      2620328, //新生儿疾病 Neonatal disorders
      876355, //阿尔茨海默氏症和其他痴呆症
      997585, //糖尿病 Diabetes mellitus
      2153894, //腹泻疾病 Diarrheal diseases
      1262914, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1549460, //肺结核 Tuberculosis
      1245027, //道路伤害 Road injuries
      1789913 //艾滋病
    ],
    [
      //2005
      14976503, //心血管疾病 Cardiovascular diseases
      7645169, //肿瘤 Neoplasms
      3475775, //慢性呼吸道疾病 Chronic respiratory diseases
      2220049, //消化系统疾病 Digestive diseases
      2655994, //下呼吸道感染 Lower respiratory infections
      2592823, //新生儿疾病 Neonatal disorders
      876355, //阿尔茨海默氏症和其他痴呆症
      997585, //糖尿病 Diabetes mellitus
      2113757, //腹泻疾病 Diarrheal diseases
      1290283, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1523536, //肺结核 Tuberculosis
      1255336, //道路伤害 Road injuries
      1782808 //艾滋病
    ],
    [
      //2006
      14972263, //心血管疾病 Cardiovascular diseases
      7714105, //肿瘤 Neoplasms
      3457986, //慢性呼吸道疾病 Chronic respiratory diseases
      2229170, //消化系统疾病 Digestive diseases
      2623907, //下呼吸道感染 Lower respiratory infections
      2559280, //新生儿疾病 Neonatal disorders
      876355, //阿尔茨海默氏症和其他痴呆症
      997585, //糖尿病 Diabetes mellitus
      2096997, //腹泻疾病 Diarrheal diseases
      1296545, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1490539, //肺结核 Tuberculosis
      124502, //道路伤害 Road injuries
      1723148 //艾滋病
    ],
    [
      //2007
      15097799, //心血管疾病 Cardiovascular diseases
      7841936, //肿瘤 Neoplasms
      3463929, //慢性呼吸道疾病 Chronic respiratory diseases
      2245235, //消化系统疾病 Digestive diseases
      2595587, //下呼吸道感染 Lower respiratory infections
      2521338, //新生儿疾病 Neonatal disorders
      876355, //阿尔茨海默氏症和其他痴呆症
      997585, //糖尿病 Diabetes mellitus
      2064549, //腹泻疾病 Diarrheal diseases
      1308218, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1461535, //肺结核 Tuberculosis
      1145027, //道路伤害 Road injuries
      1629242 //艾滋病
    ],
    [
      //2008
      15382197, //心血管疾病 Cardiovascular diseases
      8018227, //肿瘤 Neoplasms
      3506675, //慢性呼吸道疾病 Chronic respiratory diseases
      2273912, //消化系统疾病 Digestive diseases
      2581898, //下呼吸道感染 Lower respiratory infections
      2488091, //新生儿疾病 Neonatal disorders
      876355, //阿尔茨海默氏症和其他痴呆症
      997585, //糖尿病 Diabetes mellitus
      2033533, //腹泻疾病 Diarrheal diseases
      1326793, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1439232, //肺结核 Tuberculosis
      1145027, //道路伤害 Road injuries
      1524102 //艾滋病
    ],
    [
      //2009
      15532182, //心血管疾病 Cardiovascular diseases
      8158396, //肿瘤 Neoplasms
      3494530, //慢性呼吸道疾病 Chronic respiratory diseases
      2273559, //消化系统疾病 Digestive diseases
      2550413, //下呼吸道感染 Lower respiratory infections
      2447431, //新生儿疾病 Neonatal disorders
      876355, //阿尔茨海默氏症和其他痴呆症
      997585, //糖尿病 Diabetes mellitus
      1966434, //腹泻疾病 Diarrheal diseases
      1326558, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1397381, //肺结核 Tuberculosis
      1145027, //道路伤害 Road injuries
      1419167 //艾滋病
    ],
    [
      //2010
      15817250, //心血管疾病 Cardiovascular diseases
      8319722, //肿瘤 Neoplasms
      3506235, //慢性呼吸道疾病 Chronic respiratory diseases
      2291980, //消化系统疾病 Digestive diseases
      2524886, //下呼吸道感染 Lower respiratory infections
      2401429, //新生儿疾病 Neonatal disorders
      876355, //阿尔茨海默氏症和其他痴呆症
      997585, //糖尿病 Diabetes mellitus
      1918356, //腹泻疾病 Diarrheal diseases
      1336778, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1356947, //肺结核 Tuberculosis
      1145027, //道路伤害 Road injuries
      1329467 //艾滋病
    ],
    [
      //2011
      16016796, //心血管疾病 Cardiovascular diseases
      8458930, //肿瘤 Neoplasms
      3535401, //慢性呼吸道疾病 Chronic respiratory diseases
      2310053, //消化系统疾病 Digestive diseases
      2507634, //下呼吸道感染 Lower respiratory infections
      2356122, //新生儿疾病 Neonatal disorders
      876355, //阿尔茨海默氏症和其他痴呆症
      997585, //糖尿病 Diabetes mellitus
      1892934, //腹泻疾病 Diarrheal diseases
      1344944, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1323754, //肺结核 Tuberculosis
      1264365, //道路伤害 Road injuries
      189913 //艾滋病
    ],
    [
      //2012
      16223194, //心血管疾病 Cardiovascular diseases
      8601689, //肿瘤 Neoplasms
      3554406, //慢性呼吸道疾病 Chronic respiratory diseases
      2322883, //消化系统疾病 Digestive diseases
      2505535, //下呼吸道感染 Lower respiratory infections
      2312773, //新生儿疾病 Neonatal disorders
      876355, //阿尔茨海默氏症和其他痴呆症
      997585, //糖尿病 Diabetes mellitus
      1824849, //腹泻疾病 Diarrheal diseases
      1350375, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1310171, //肺结核 Tuberculosis
      1251976, //道路伤害 Road injuries
      189913 //艾滋病
    ],
    [
      //2013
      16467232, //心血管疾病 Cardiovascular diseases
      8746507, //肿瘤 Neoplasms
      3606801, //慢性呼吸道疾病 Chronic respiratory diseases
      2342159, //消化系统疾病 Digestive diseases
      2516053, //下呼吸道感染 Lower respiratory infections
      2272336, //新生儿疾病 Neonatal disorders
      1293671, //阿尔茨海默氏症和其他痴呆症
      997585, //糖尿病 Diabetes mellitus
      1778003, //腹泻疾病 Diarrheal diseases
      1355076, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      1299174, //肺结核 Tuberculosis
      145027, //道路伤害 Road injuries
      189913 //艾滋病
    ],
    [
      //2014(*)
      16692531, //心血管疾病 Cardiovascular diseases
      8909210, //肿瘤 Neoplasms
      3647584, //慢性呼吸道疾病 Chronic respiratory diseases
      2357136, //消化系统疾病 Digestive diseases
      2511303, //下呼吸道感染 Lower respiratory infections
      2210625, //新生儿疾病 Neonatal disorders
      1342694, //阿尔茨海默氏症和其他痴呆症
      1317152, //糖尿病 Diabetes mellitus
      1715648, //腹泻疾病 Diarrheal diseases
      1359303, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      149460, //肺结核 Tuberculosis
      145027, //道路伤害 Road injuries
      189913 //艾滋病
    ],
    [
      //2015
      17065829, //心血管疾病 Cardiovascular diseases
      9122193, //肿瘤 Neoplasms
      3686775, //慢性呼吸道疾病 Chronic respiratory diseases
      2397390, //消化系统疾病 Digestive diseases
      2512334, //下呼吸道感染 Lower respiratory infections
      2156654, //新生儿疾病 Neonatal disorders
      1393830, //阿尔茨海默氏症和其他痴呆症
      1362564, //糖尿病 Diabetes mellitus
      1669017, //腹泻疾病 Diarrheal diseases
      1380853, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      149460, //肺结核 Tuberculosis
      145027, //道路伤害 Road injuries
      189913 //艾滋病
    ],
    [
      //2016
      17374879, //心血管疾病 Cardiovascular diseases
      9325383, //肿瘤 Neoplasms
      3736701, //慢性呼吸道疾病 Chronic respiratory diseases
      2432705, //消化系统疾病 Digestive diseases
      2496608, //下呼吸道感染 Lower respiratory infections
      2073415, //新生儿疾病 Neonatal disorders
      1450700, //阿尔茨海默氏症和其他痴呆症
      1409352, //糖尿病 Diabetes mellitus
      1630379, //腹泻疾病 Diarrheal diseases
      1400095, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      149460, //肺结核 Tuberculosis
      145027, //道路伤害 Road injuries
      189913 //艾滋病
    ],
    [
      //2017
      17661761, //心血管疾病 Cardiovascular diseases
      9517731, //肿瘤 Neoplasms
      3791834, //慢性呼吸道疾病 Chronic respiratory diseases
      2471027, //消化系统疾病 Digestive diseases
      2469269, //下呼吸道感染 Lower respiratory infections
      1990028, //新生儿疾病 Neonatal disorders
      1508457, //阿尔茨海默氏症和其他痴呆症
      1451079, //糖尿病 Diabetes mellitus
      1623269, //腹泻疾病 Diarrheal diseases
      1421861, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      19460, //肺结核 Tuberculosis
      15027, //道路伤害 Road injuries
      19913 //艾滋病
    ],
    [
      //2018
      18089062, //心血管疾病 Cardiovascular diseases
      9779495, //肿瘤 Neoplasms
      3882438, //慢性呼吸道疾病 Chronic respiratory diseases
      2508093, //消化系统疾病 Digestive diseases
      2468194, //下呼吸道感染 Lower respiratory infections
      1918069, //新生儿疾病 Neonatal disorders
      1567374, //阿尔茨海默氏症和其他痴呆症
      1497889, //糖尿病 Diabetes mellitus
      1569603, //腹泻疾病 Diarrheal diseases
      1443466, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      19460, //肺结核 Tuberculosis
      15027, //道路伤害 Road injuries
      19913 //艾滋病
    ],
    [
      //2019
      18527052, //心血管疾病 Cardiovascular diseases
      10061752, //肿瘤 Neoplasms
      3968465, //慢性呼吸道疾病 Chronic respiratory diseases
      2549121, //消化系统疾病 Digestive diseases
      2473853, //下呼吸道感染 Lower respiratory infections
      1857808, //新生儿疾病 Neonatal disorders
      1621131, //阿尔茨海默氏症和其他痴呆症
      1545780, //糖尿病 Diabetes mellitus
      1526041, //腹泻疾病 Diarrheal diseases
      1466969, //肝硬化等慢性肝病 Cirrhosis and other chronic liver diseases
      146969, //肺结核 Tuberculosis
      145027, //道路伤害 Road injuries
      189913 //艾滋病
    ]
  ]
  let startIndex = 0
  let startYear = years[startIndex]

  const options = {
    title: {
      text: '1990-2019年世界死因动态top10'
    },
    grid: {
      top: 30,
      bottom: 30,
      left: 120,
      right: 80
    },
    xAxis: {
      max: 'dataMax',
      axisLabel: {
        fontWeight: 700,
        formatter: function (n) {
          return Math.round(n) + ''
        }
      }
    },
    dataset: {
      source: data[0]
    },
    yAxis: {
      type: 'category',
      inverse: true, // Y 轴从下往上是从小到大的排列
      data: [
        '心血管疾病',
        '肿瘤',
        '慢性呼吸道疾病',
        '消化系统疾病',
        '下呼吸道疾病',
        '新生儿疾病',
        '阿尔茨海默氏症',
        '糖尿病',
        '腹泻疾病',
        '肝硬化等慢性肝病',
        '肺结核',
        '道路伤害',
        '艾滋病'
      ],
      max: 9,
      axisLabel: {
        show: true,
        fontSize: 14,
        fontWeight: 700
      },
      animationDuration: 200, //第一次柱条排序动画的时长
      animationDurationUpdate: 200 //第一次后柱条排序动画的时长
    },
    series: [
      {
        type: 'bar',
        name: 'X',
        realtimeSort: true,
        data: data[0],
        seriesLayoutBy: 'column',

        itemStyle: {
          color: function (param) {
            return deathColors[param.dataIndex]
          }
        },
        encode: {
          x: dimension,
          y: 3
        },
        label: {
          show: true,
          precision: 1,
          position: 'right',
          valueAnimation: true, //实时改变标签
          fontFamily: 'monospace'
        }
      }
    ],

    animationDuration: 0, //表示第一份数据不需要从 0 开始动画
    animationDurationUpdate: updateFrequency, //每次更新动画时长
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
    graphic: {
      elements: [
        {
          type: 'text',
          right: 160,
          bottom: 60,
          style: {
            text: startYear,
            font: 'bolder 80px monospace',
            fill: 'rgba(100, 100, 100, 0.25)'
          },
          z: 100
        }
      ]
    }
  }

  useEffect(() => {
    let myChart = echarts.init(document.getElementById('container'))

    if (isFirst) {
      myChart.setOption(options)
      setIsFirst(false)
    } else {
      for (let i = startIndex; i < years.length - 1; ++i) {
        ;(function (i) {
          setTimeout(function () {
            updateYear(i + 1)
          }, (i - startIndex) * updateFrequency)
        })(i)
      }

      //更新
      function updateYear(index) {
        let source = data[index]
        options.series[0].data = source
        options.graphic.elements[0].style.text = years[index]
        myChart.setOption(options)
      }

      if (options && typeof options === 'object') {
        myChart.setOption(options)
      }
    }
  }, [isFirst])

  return <div id="container" style={{ width: 1000, height: 570 }}></div>
}
