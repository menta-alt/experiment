import React, { useEffect } from 'react'
import * as echarts from 'echarts/lib/echarts.js'
import 'echarts/lib/chart/line'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([TitleComponent, TooltipComponent, GridComponent, CanvasRenderer, LegendComponent])

export default function StaticTop() {
  //图表配置项
  const options = {
    title: {
      text: '1990-2019年世界死因top10'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      type: 'scroll',
      padding: [50, 120, 20, 60],
      data: [
        '心血管疾病',
        '肿瘤',
        '慢性呼吸道疾病',
        '消化系统疾病',
        '下呼吸道疾病',
        '新生儿疾病',
        '阿尔茨海默氏症和其他痴呆症',
        '糖尿病',
        '腹泻疾病',
        '肝硬化等慢性肝病',
        '肺结核',
        '道路伤害',
        '艾滋病'
      ]
    },
    grid: {
      top: 100,
      bottom: 30,
      right: 45
    },
    xAxis: {
      type: 'category',
      name: '年份',
      data: [
        '1990',
        '1991',
        '1992',
        '1993',
        '1994',
        '1995',
        '1996',
        '1997',
        '1998',
        '1999',
        '2000',
        '2001',
        '2002',
        '2003',
        '2004',
        '2005',
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019'
      ],
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '心血管疾病',
        type: 'line',
        data: [
          12051191.0, 12208817.0, 12425927.0, 12789369.0, 13012859.0, 13115105.0, 13198869.0, 13324761.0, 13445792.0, 13704507.0, 13940134.0, 14168212.0, 14483864.0, 14692487.0, 14727314.0,
          14976503.0, 14972263.0, 15097799.0, 15382197.0, 15532182.0, 15817250.0, 16016796.0, 16223194.0, 16467232.0, 16692531.0, 17065829.0, 17374879.0, 17661761.0, 18089062.0, 18527052.0
        ],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#5B8FF9'
        },
        itemStyle: {
          color: '#5B8FF9'
        }
      },
      {
        name: '肿瘤',
        type: 'line',
        data: [
          5747722.0, 5862861.0, 5990731.0, 6161392.0, 6290097.0, 6396616.0, 6484102.0, 6579382.0, 6696230.0, 6850383.0, 6994495.0, 7106619.0, 7246128.0, 7380227.0, 7496252.0, 7645169.0, 7714105.0,
          7841936.0, 8018227.0, 8158396.0, 8319722.0, 8458930.0, 8601689.0, 8746507.0, 8909210.0, 9122193.0, 9325383.0, 9517731.0, 9779495.0, 10061752.0
        ],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#F6BD16'
        },
        itemStyle: {
          color: '#F6BD16'
        }
      },
      {
        name: '慢性呼吸道疾病',
        type: 'line',
        data: [
          3090142.0, 3145611.0, 3205064.0, 3263772.0, 3294377.0, 3310310.0, 3339582.0, 3378868.0, 3398403.0, 3416562.0, 3446877.0, 3462653.0, 3487066.0, 3488342.0, 3459494.0, 3475775.0, 3457986.0,
          3463929.0, 3506675.0, 3494530.0, 3506235.0, 3535401.0, 3554406.0, 3606801.0, 3647584.0, 3686775.0, 3736701.0, 3791834.0, 3882438.0, 3968465.0
        ],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#61DDAA'
        },
        itemStyle: {
          color: '#61DDAA'
        }
      },
      {
        name: '消化系统疾病',
        type: 'line',
        data: [
          1850459.0, 1873410.0, 1899463.0, 1935023.0, 1962904.0, 1979258.0, 1990305.0, 2009279.0, 2025018.0, 2048450.0, 2073671.0, 2101852.0, 2137996.0, 2167694.0, 2181847.0, 2220049.0, 2229170.0,
          2245235.0, 2273912.0, 2273559.0, 2291980.0, 2310053.0, 2322883.0, 2342159.0, 2357136.0, 2397390.0, 2432705.0, 2471027.0, 2508093.0, 2549121.0
        ],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#65789B'
        },
        itemStyle: {
          color: '#65789B'
        }
      },
      {
        name: '下呼吸道疾病',
        type: 'line',
        data: [
          3299783.0, 3264016.0, 3239281.0, 3206753.0, 3166330.0, 3127269.0, 3069546.0, 3025824.0, 2977697.0, 2928553.0, 2873461.0, 2808210.0, 2766468.0, 2724427.0, 2675009.0, 2655994.0, 2623907.0,
          2595587.0, 2581898.0, 2550413.0, 2524886.0, 2507634.0, 2505535.0, 2516053.0, 2511303.0, 2512334.0, 2496608.0, 2469269.0, 2468194.0, 2473853.0
        ],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#7262fd'
        },
        itemStyle: {
          color: '#7262fd'
        }
      },
      {
        name: '新生儿疾病',
        type: 'line',
        data: [
          2985155.0, 2955231.0, 2929905.0, 2903205.0, 2874238.0, 2850329.0, 2816964.0, 2792744.0, 2768035.0, 2740255.0, 2713054.0, 2683714.0, 2664501.0, 2644043.0, 2620328.0, 2592823.0, 2559280.0,
          2521338.0, 2488091.0, 2447431.0, 2401429.0, 2356122.0, 2312773.0, 2272336.0, 2210625.0, 2156654.0, 2073415.0, 1990028.0, 1918069.0, 1857808.0
        ],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#78D3F8'
        },
        itemStyle: {
          color: '#78D3F8'
        }
      },
      {
        name: '阿尔茨海默氏症和其他痴呆症',
        type: 'line',
        data: [
          560238.0, 582775.0, 605485.0, 629143.0, 651731.0, 674351.0, 696178.0, 716832.0, 738234.0, 761061.0, 786025.0, 813920.0, 845056.0, 876355.0, 908464.0, 944908.0, 981557.0, 1021283.0,
          1064481.0, 1108551.0, 1155046.0, 1200199.0, 1246535.0, 1293671.0, 1342694.0, 1393830.0, 1450700.0, 1508457.0, 1567374.0, 1621131.0
        ],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#9661BC'
        },
        itemStyle: {
          color: '#9661BC'
        }
      },
      {
        name: '糖尿病',
        type: 'line',
        data: [
          659823.0, 678279.0, 700800.0, 726500.0, 749547.0, 771641.0, 797050.0, 825648.0, 852199.0, 877176.0, 903494.0, 932295.0, 967920.0, 997585.0, 1015381.0, 1048118.0, 1068202.0, 1089904.0,
          1119372.0, 1139402.0, 1162585.0, 1194834.0, 1233355.0, 1274039.0, 1317152.0, 1362564.0, 1409352.0, 1451079.0, 1497889.0, 1545780.0
        ],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#F6903D'
        },
        itemStyle: {
          color: '#F6903D'
        }
      },
      {
        name: '腹泻疾病',
        type: 'line',
        data: [
          2882171.0, 2889845.0, 2858170.0, 2784369.0, 2725452.0, 2657752.0, 2599794.0, 2563416.0, 2528967.0, 2481504.0, 2425488.0, 2364012.0, 2299035.0, 2229976.0, 2153894.0, 2113757.0, 2096997.0,
          2064549.0, 2033533.0, 1966434.0, 1918356.0, 1892934.0, 1824849.0, 1778003.0, 1715648.0, 1669017.0, 1630379.0, 1623269.0, 1569603.0, 1526041.0
        ],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#008685'
        },
        itemStyle: {
          color: '#008685'
        }
      },
      {
        name: '肝硬化等慢性肝病',
        type: 'line',
        data: [
          1010018.0, 1024357.0, 1040326.0, 1064965.0, 1086432.0, 1101343.0, 1112097.0, 1125742.0, 1138201.0, 1155177.0, 1174182.0, 1196741.0, 1224051.0, 1248160.0, 1262914.0, 1290283.0, 1296545.0,
          1308218.0, 1326793.0, 1326558.0, 1336778.0, 1344944.0, 1350375.0, 1355076.0, 1359303.0, 1380853.0, 1400095.0, 1421861.0, 1443466.0, 1466969.0
        ],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#F08BB4'
        },
        itemStyle: {
          color: '#F08BB4'
        }
      },
      {
        name: '肺结核',
        type: 'line',
        data: [
          1770749.0, 1780172.0, 1801199.0, 1767678.0, 1746243.0, 1730722.0, 1712611.0, 1717566.0, 1715636.0, 1710252.0, 1705296.0, 1673199.0, 1640388.0, 1603142.0, 1549460.0, 1523536.0, 1490539.0,
          1461535.0, 1439232.0, 1397381.0, 1356947.0, 1323754.0, 1310171.0, 1299174.0, 1286326.0, 1259090.0, 1241369.0, 1223798.0, 1197212.0, 1171838.0
        ],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#FFC100'
        },
        itemStyle: {
          color: '#FFC100'
        }
      },
      {
        name: '道路伤害',
        type: 'line',
        data: [
          1110710.0, 1114880.0, 1123321.0, 1135056.0, 1151121.0, 1160154.0, 1160071.0, 1166990.0, 1174923.0, 1192318.0, 1209301.0, 1221121.0, 1233982.0, 1245027.0, 1255336.0, 1266020.0, 1264217.0,
          1270035.0, 1281063.0, 1278353.0, 1275493.0, 1264365.0, 1251976.0, 1228623.0, 1210342.0, 1197762.0, 1189982.0, 1184739.0, 1192339.0, 1194039.0
        ],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#36BCCB'
        },
        itemStyle: {
          color: '#36BCCB'
        }
      },
      {
        name: '艾滋病',
        type: 'line',
        data: [
          326064.0, 416165.0, 520082.0, 638466.0, 767884.0, 899961.0, 1017449.0, 1125207.0, 1250875.0, 1384308.0, 1502798.0, 1605821.0, 1690616.0, 1753706.0, 1789913.0, 1782808.0, 1723148.0,
          1629242.0, 1524102.0, 1419167.0, 1329467.0, 1249611.0, 1167041.0, 1095907.0, 1045517.0, 1006416.0, 976124.0, 929783.0, 877358.0, 849135.0
        ],
        symbol: 'emptyCircle',
        symbolSize: 1,
        smooth: true,
        lineStyle: {
          color: '#8CDAE5'
        },
        itemStyle: {
          color: '#8CDAE5'
        }
      }
    ]
  }

  // 初始化
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('container'))
    //绘制折线图
    myChart.setOption(options)
  })

  return <div id="container" style={{ width: 1000, height: 570 }}></div>
}
