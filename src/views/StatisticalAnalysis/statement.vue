<template>
  <div class="distance">
    <el-card class="box-card">
      <el-row :gutter="20">
        <!-- 总览 -->
        <el-col :span="24">
          <el-card class="box-card">
            <el-button type="primary" size="small" style="float: right; position: relative; z-index: 1" @click="reload">刷新</el-button>
            <div id="zx"  v-loading="ZLloading" :style="{height: '300px'} "></div>
          </el-card>
        </el-col>
        <!-- 地图 -->
        <el-col :span="24">
          <el-card class="box-card">
            <div style="width:100%;height:60px" class="mb10">
              <el-row :gutter="20" class="mb10">
                <el-col :span="6">
                  <div style="width:100%">
                    <span style="line-height: 30px;">年份：</span>
                    <el-select v-model="bank_address_code" class="widthAuto" placeholder="请选择" @change="bankAddressCode">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div style="width:100%">
                    <span style="line-height: 30px;height:30px">贷款用途：</span>
                    <!-- <el-input v-model="loanPurpose" placeholder="请输入贷款用途"></el-input> -->
                    <el-select v-model="loanPurpose" placeholder="请选择贷款用途" style="width:100%">
                      <el-option
                        v-for="item in proceeds"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div style="width:100%">
                    <span style="line-height: 30px;height:30px">贷款种类：</span>
                    <!-- <el-input v-model="loanVarietie" placeholder="请输入贷款种类"></el-input> -->
                    <el-select v-model="loanVarietie" placeholder="请选择贷款种类" style="width:100%">
                      <el-option
                        v-for="item in loanType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div style="width:100%">
                    <el-button style="margin-top:30px" type="primary" @click="bankAddressCode">查询</el-button>
                    <el-button @click="resetMap('map')" type="primary" plain>重置</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div style="height:800px;width:100%;float: left;">
              <el-table
                :data="tableList"
                border
                size="mini"
                style="width: 100%"
                height="750"
                v-loading="tableLoading"
                @sort-change="sort_change"
                empty-text="暂无数据"
              >
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column label="地区" :show-overflow-tooltip="true">
                  <template slot-scope="scope">{{ scope.row.bankAddress || "无" }}</template>
                </el-table-column>
                <el-table-column prop="loanAmount" label="信贷发放额" sortable="custom" :show-overflow-tooltip="true">
                  <template slot-scope="scope">{{ scope.row.loanAmount | toThousandFilters  }}元</template>
                </el-table-column>
                <el-table-column prop="loanBalance" label="信贷余额" sortable="custom" :show-overflow-tooltip="true">
                  <template slot-scope="scope">{{ scope.row.loanBalance | toThousandFilters }}元</template>
                </el-table-column>
                <el-table-column prop="num" label="信贷笔数" sortable="custom" :show-overflow-tooltip="true">
                  <template slot-scope="scope">{{ scope.row.num || "无" }}笔</template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 地图 -->
            <!--<div ref="mapOption" style="height:800px;width:65%;float: left;"></div>-->
            <el-button type="primary" size="small" style="margin-top: -32px;float: right; position: relative; z-index: 1" @click="back">返回上层</el-button>
            <div v-loading="tableLoading" id="mapChart" style="height:700px;width:100%;float: right;"></div>
            <!-- <div id="myChartChina" :style="{width: '100%', height: '500px'}"></div> -->
          </el-card>
        </el-col>
        <!-- 月份统计 -->
        <el-col :span="24">
          <el-card class="box-card">
            <div style="width:100%;height:60px" class="mb10">
              <el-row :gutter="20">
                <el-col :span="6">
                  <span style="line-height:30px">年份：</span>
                  <el-select v-model="month" placeholder="请选择" class="widthAuto" @change="yearStatistics">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <div style="width:100%">
                    <span style="line-height: 30px;height:30px">贷款用途：</span>
                    <el-select v-model="TJloanPurpose" placeholder="请选择贷款用途" style="width:100%">
                      <el-option
                        v-for="item in proceeds"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div style="width:100%">
                    <span style="line-height: 30px;height:30px">贷款种类：</span>
                    <el-select v-model="TJloanVarietie" placeholder="请选择贷款种类" style="width:100%">
                      <el-option
                        v-for="item in loanType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div style="width:100%">
                    <el-button style="margin-top:30px" type="primary" @click="yearStatistics">查询</el-button>
                    <el-button @click="resetMap('TJ')" type="primary" plain>重置</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div id="myChart" v-loading="doorpostsLoading" :style="{height: '300px'}"></div>
          </el-card>
        </el-col>
        <!-- 分类统计 -->
        <el-col :span="24">
          <el-card class="box-card">
            <div style="width:100%;height:60px" class="mb10">
              <el-row :gutter="20">
                <el-col :span="5">
                  <span style="line-height:30px">年份：</span>
                  <el-select v-model="loan_quality" class="widthAuto" placeholder="请选择" @change="loanQuality">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <div style="width:100%">
                    <span style="line-height: 30px;height:30px">贷款用途：</span>
                    <el-select v-model="DKloanPurpose" placeholder="请选择贷款用途" style="width:100%">
                      <el-option
                        v-for="item in proceeds"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div style="width:100%">
                    <span style="line-height: 30px;height:30px">贷款种类：</span>
                    <el-select v-model="DKloanVarietie" placeholder="请选择贷款种类" style="width:100%">
                      <el-option
                        v-for="item in loanType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div style="width:100%">
                    <span style="line-height: 30px;height:30px">地区:</span>
                    <!-- <el-select v-model="DKRegion" placeholder="请选择地区" filterable style="width:100%">
                      <el-option
                        v-for="item in regionList"
                        :key="item.regionName"
                        :label="item.regionName"
                        :value="item.regionName">
                      </el-option>
                    </el-select> -->
                    <el-cascader
                      v-model="DKRegion"
                      style="width:100%"
                      :options="regionList"
                      :show-all-levels="false"
                      :props="{ checkStrictly: true }"
                      @change="handleChange">
                    </el-cascader>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div style="width:100%">
                    <el-button style="margin-top:30px" type="primary" @click="loanQuality">查询</el-button>
                    <el-button @click="resetMap('DK')" type="primary" plain>重置</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
                <div style="width:100%">


                </div>
            <div id="myCharts" v-loading="loansLoading" :style="{ width: '50%', height: '300px', float: 'left'}"></div>
            <div id="guarantee" v-loading="guaranteeLoading" :style="{width: '50%',height: '300px', float: 'right'}"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import cityMap from "@/utils/china-main-city-map.js";
import echarts from "echarts";
import axios from "axios";
import {tease, money, toThousandFilter, numberFormat, toThousandFilters} from '@/utils/validate'
import {
  selYear,
  queryReportStatistics,
  reportStatistics,
  regionCounty,
  getTree
} from "@/api/StatisticalAnalysis";

//中国地图（第一级地图）的ID、Name、Json数据
let chinaId = 650000;
let chinaName = "新疆";
let chinaJson = null;

//记录父级ID、Name
let mapStack = [];
let parentId = null;
let parentName = null;

//Echarts地图全局变量，主要是在返回上级地图的方法中会用到
let myChart = null;
export default {
  data() {
    return {
      value: "",
      options: [
      ],
      proceeds:[
        {
          value:'1',
          label:'生产性'
        },
        {
          value:'2',
          label:'消费性'
        },
        {
          value:'3',
          label:'经营性'
        }
      ],
      loanType:[
        {
          value:'1',
          label:'扶贫小额信贷'
        },
        {
          value:'2',
          label:'住房贷款'
        },
        {
          value:'3',
          label:'消费贷款'
        },
        {
          value:'4',
          label:'其他贷款'
        }
      ],
      TJloanPurpose:'',
      TJloanVarietie:'',
      proptype: "",
      mapOption: {
        title: {
          text: "地区分布",
          x: "center"
        },
        visualMap: {
          min: 0,
          max: 0,
          left: "10%",
          top: "bottom",
          text: ["高", "低"],
          calculable: true,
          inRange:{
            color: ['lightskyblue', 'yellow', 'orangered']
          }
        },
        // visualMap: {
        //     show: true,
        //     min: 1,
        //     max: 2000,
        //     splitNumber: 5,
        //     inRange: {
        //         color: ['#d94e5d', '#eac736', '#50a3ba'].reverse()
        //     },
        //     textStyle: {
        //         color: '#fff'
        //     },
        // },
        tooltip: {
          trigger: "item"
        },
        roamController: {
          show: true,
          x: "right",
          mapTypeControl: {
            china: true
          }
        },
        series: [
          {
            name: "信贷发放额",
            type: "map",
            mapLocation: {
              x: "240",
              y: "center",
              height: "75%"
            },


            roam: false,
            label: {
              // 文字
              normal: {
                show: true,
                textStyle: {
                  color: "#606266", // 文字颜色
                  fontSize: 12
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: "#303133", // 鼠标移入文字颜色
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              // 地图块
              normal: {
                areaColor: "#5eb2ee", // 区域颜色
                borderColor: "#ffffff", // 区域边框颜色
                borderWidth: 1
              },
              emphasis: {
                areaColor: "#d67b82", // 鼠标移入区域颜色
                borderWidth: 1
              }
            },
            data: []
          },
          {
            name: "信贷余额",
            type: "map",
            mapLocation: {
              x: "240",
              y: "center",
              height: "75%"
            },
            data: []
          },
          {
            name: "信贷笔数",
            type: "map",
            data: []
          },
          {
            name: "人均收入",
            type: "map",
            data: []
          },
          {
            name: "贫困户数量",
            type: "map",
            data: []
          }
        ]
      },
      year: [],
      creditBalance: [],
      totalCredit: [],
      month: "",
      loanAmount: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      loanBalance: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      num: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      loan_quality: "",
      loan_qualityArr: [],
      guarantee_methodArr: [],
      bank_address_code: "",
      loanAmountMap: [],
      loanBalanceMap: [],
      numMap: [],
      tableList: [],
      tableLoading: false,
      radio1:'loanAmount',
      isRouterAlive: true,
      loanPurpose:'',
      loanVarietie:'',
      DKloanVarietie:'',
      DKloanPurpose:'',
      DKRegion:[],
      ZLloading:false,
      doorpostsLoading:false,
      loansLoading:false,
      guaranteeLoading:false,
      cloning:[],
      regionList:[],
      ZLyears:[],
      counts:[]
    };
  },
  created() {
    getTree().then(res => {
      this.regionList = res.data
      // this.trans(this.regionList)
      this.regionList = this.region(this.regionList)
      this.trans(this.regionList)
    })
  },
  mounted() {
    this.selYearList();
    // this.mapEchartsInit();
    this.mapChart("mapChart");
    // this.drawLines()
  },
  methods: {
    trans(data){
        data.forEach(item => {
            item.value = item.areaNoId + '/' + item.level
            // item.label = item.regionName
            if(item.children.length == 0){
                delete item.children
            }
            item.children && this.trans(item.children)
        })
    },
    region(data){
      let father = []
      let son = []
      let grandson = []
      data.map(e => {
        if(e.level == 1){
          e.children = []
          e.value = e.areaNoId
          e.label = e.areaDscr
          father.push(e)
        }else if(e.level == 2){
          e.children = []
          e.value = e.areaNoId
          e.label = e.areaDscr
          son.push(e)
        }else{
          e.children = []
          e.value = e.areaNoId
          e.label = e.areaDscr
          grandson.push(e)
        }
      })
      son.map((e,index) => {
        grandson.map(j => {
          if(e.areaNoId == j.areaNoId2){
            son[index].children.push(j)
          }
        })
        father[0].children.push(e)
      })
      return father
      // son.map(e => {
      //   father[0].children.push(e)
      // })
      // grandson.map((e) => {
      //   father[0].children.map((j,index) => {
      //     if(e.areaNoId2 == j.areaNoId){
      //       father[0].children[index].push(e)
      //     }
      //   })
      // })
    },
    handleChange(){
    },
    sort_change(column) {
      if (column.prop === "loanAmount") { // 表格每一列对应的字段，必须一一对应
        this.bankAddressCodes("loanAmount")
        this.proptype = column.prop; // 将键名prop赋值给变量proptype
        if (column.order === "descending") {
          this.tableList.sort(this.my_desc_sort);
        } else if (column.order === "ascending") {
          this.tableList.sort(this.my_asc_sort);
        }
      } else if (column.prop === "loanBalance") {  // 第二列排序  表格每一列对应的字段，必须一一对应
        this.bankAddressCodes("loanBalance")
        this.proptype = column.prop;
        if (column.order === "descending") {
          this.tableList.sort(this.my_desc_sort);
        } else if (column.order === "ascending") {
          this.tableList.sort(this.my_asc_sort);
        }
      } else if (column.prop === "num"){
        this.bankAddressCodes("num")
        this.proptype = column.prop;
        if (column.order === "descending") {
          this.tableList.sort(this.my_desc_sort);
        } else if (column.order === "ascending") {
          this.tableList.sort(this.my_asc_sort);
        }
      }
    },
    //正序倒序方法
    my_desc_sort(a, b) {
      return b[this.proptype] - a[this.proptype];
    },
    my_asc_sort(a, b) {
      return a[this.proptype] - b[this.proptype];
    },
    /**
     * 返回上一级地图
     */
    back() {
      this.registerAndsetOption(myChart, chinaId, chinaName, chinaJson, false);
      mapStack = [];
      parentId = chinaId;
      parentName = chinaName;
    },
    /**
     * Echarts地图
     */
    mapChart(divid) {
      axios.get("static/json/" + chinaId + ".json", {}).then(response => {
        const mapJson = response.data;
        chinaJson = mapJson;
        myChart = echarts.init(document.getElementById('mapChart'));
        this.registerAndsetOption(myChart, chinaId, chinaName, mapJson, false);
        parentId = chinaId;
        parentName = "china";
        let vm = this;
        myChart.on("click", function(param) {
          let cityId = cityMap[param.name];
          if (cityId) {
            //代表有下级地图
            axios
              .get("static/json/" + cityId + ".json", {})
              .then(response => {
                const mapJson = response.data;
                vm.registerAndsetOption(
                  myChart,
                  cityId,
                  param.name,
                  mapJson,
                  true
                );
              });
          } else {
            //没有下级地图，回到一级中国地图，并将mapStack清空
            vm.registerAndsetOption(myChart, chinaId, chinaName, chinaJson, false);
            mapStack = [];
            parentId = chinaId;
            parentName = chinaName;
          }
        });
      });
    },
    registerAndsetOption(myChart, id, name, mapJson, flag) {
      echarts.registerMap(name, mapJson);
      this.mapOption.series[0].map = name;
      if (flag) {
        //往mapStack里添加parentId，parentName,返回上一级使用
        mapStack.push({
          mapId: parentId,
          mapName: parentName
        });
        parentId = id;
        parentName = name;
      }
      this.mapEchartsInit(myChart);
      myChart.setOption(this.mapOption);
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myCharts = this.$echarts.init(document.getElementById("myCharts"));
      let zx = this.$echarts.init(document.getElementById("zx"));
      let guarantee = this.$echarts.init(document.getElementById("guarantee"));
      let totalCredit = this.totalCredit;
      let creditBalance = this.creditBalance;
      let counts = this.counts
      let year = this.year;
      let ZLyears = this.ZLyears
      // 绘制图表
      var _this = this;
      //月份统计

      myChart.setOption({
        tooltip: {
          // formatter: "{a0}:{c0}元"
          formatter: function(params) {
            var that = this;
            var res = params.name + "<br />";

            // var myseries = year;
            //循环遍历series数据系列
            // for (var i = 0; i < myseries.length; i++) {
              if (params.seriesName == "信贷笔数") {
                res += params.seriesName + ':' + params.value + "笔<br />";
              }else {
                res += params.seriesName + ':' + toThousandFilters(numberFormat(params.value)) + "万元<br />";
              }
            // }
            return res;
          }
        },
        legend: {
          data: ["信贷发放额", "信贷余额", "信贷笔数"]
        },
        xAxis: {
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月"
          ]
        },
        series: [
          {
            type: "bar",
            color: [
              "#dd6b66",
              "#759aa0",
              "#e69d87",
              "#8dc1a9",
              "#ea7e53",
              "#eedd78"
            ]
          }
        ],
        yAxis: [
          {
            type:'value',
            name:'',
            min:0,
            // max:250,
            inteval:10000,
            // position: 'left',
            axisLabel: { formatter: function(params){
              return toThousandFilter(params) + '万元'
            } }
          },
          {
            type:'value',
            name:'',
            min:0,
            // max:250,
            inteval:5,
            // position: 'right',
            axisLabel: { formatter: "{value} 笔" }
          },

        ],
        series: [
          {
            name: "信贷发放额",
            type: "bar",
            data: this.loanAmount,
            // data:[11111111111,22222222222,33333333333,4444444444,55555555555,6666666666,777777777777,8888888888888,123123123123,0,0,0],
            itemStyle: {
              normal: {
                color: "#409EFF",
                lineStyle: {
                  color: "#409EFF",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            }
          },
          {
            name: "信贷余额",
            type: "bar",
            data: this.loanBalance,
            itemStyle: {
              normal: {
                color: "#67C23A",
                lineStyle: {
                  color: "#67C23A",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            animationDuration: 2800,
            animationEasing: "quadraticOut"
          },
          {
            name: "信贷笔数",
            type: "bar",
            data: this.num,
            itemStyle: {
              normal: {
                color: "#E6A23C",
                lineStyle: {
                  color: "#E6A23C",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            yAxisIndex: 1,
            animationDuration: 2800,
            animationEasing: "quadraticOut"
          }
        ]
      });
      //贷款质量
      myCharts.setOption({
        title: {
          text: "贷款质量",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}笔 ({d}%)"
        },
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },

        series: [
          {
            name: "贷款质量",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.loan_qualityArr,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  let colorList = [
                    "#d27d84",
                    "#39c7c8",
                    "#b6a3db",
                    "#5eb2ee",
                    "#fcb984"
                  ];
                  return colorList[params.dataIndex];
                },
                shadowBlur: 100,
                shadowColor: "rgba(0, 0, 0, 0.1)"
              }
            }
          }
        ]
      });
      //担保方式
      guarantee.setOption({
        title: {
          text: "担保方式",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}笔 ({d}%)"
        },
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },
        series: [
          {
            name: "担保方式",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.guarantee_methodArr,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  let colorList = [
                    "#d27d84",
                    "#39c7c8",
                    "#b6a3db",
                    "#5eb2ee",
                    "#fcb984"
                  ];
                  return colorList[params.dataIndex];
                },
                shadowBlur: 100,
                shadowColor: "rgba(0, 0, 0, 0.1)"
              }
            }
          }
        ]
      });
      //总览
      // var option = {
      //   title: {
      //     text: "总览",
      //     top: 0
      //   },
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       type: "cross",
      //       label: {
      //         backgroundColor: "#6a7985"
      //       }
      //     },
      //     formatter: function(params) {
      //       var that = this;
      //       var res = params[0].name + "<br />";
      //       var myseries = year;
      //       //循环遍历series数据系列
      //       for (var i = 0; i < myseries.length; i++) {
      //         //在内部继续循环series[i],从data中判断：当地区名称等于params.name的时候就将当前数据和名称添加到res中供显示
      //         // for (var k = 0; k < myseries[i].data.length; k++) {
      //         //   //如果data数据中的name和地区名称一样
      //         //   if (myseries[i].data[k].name == params.name) {
      //         //     //将series数据系列每一项中的name和数据系列中当前地区的数据添加到res中
      //         //     res +=
      //         //       myseries[i].name + ":" + myseries[i].data[k].value + "<br />";
      //         //   }
      //         if (year[i] == params[0].name) {
      //           res += "信贷发放额:" + tease(totalCredit[i]) + "元<br />";
      //           res += "信贷余额:" + tease(creditBalance[i]) + "元<br />";
      //         }

      //         // }
      //       }
      //       return res;
      //     }
      //   },
      //   legend: {
      //     data: ["信贷发放额", "信贷余额"]
      //   },
      //   xAxis: [
      //     {
      //       type: "category",
      //       data: this.year,
      //       axisLabel: { formatter: "{value} 年" },
      //       axisTick: {
      //         show: false
      //       }
      //     }
      //   ],
      //   // grid: {
      //   //   left: 10,
      //   //   right: 30,
      //   //   bottom: 20,
      //   //   top: 50,
      //   //   containLabel: true
      //   // },
      //   yAxis: [{
      //     type: "value",
      //     axisLabel: { formatter:function(params){
      //       return money(params)
      //     } },
      //     axisTick: {
      //       show: false
      //     }
      //   }],
      //   series: [

      //     {
      //       name: "信贷发放额",
      //       itemStyle: {
      //         normal: {
      //           color: "#FF005A",
      //           lineStyle: {
      //             color: "#FF005A",
      //             width: 2
      //           }
      //         }
      //       },
      //       type: "bar",
      //       data: this.totalCredit,
      //       // barWidth:20
      //     },
      //     {
      //       name: "信贷余额",
      //       type: "bar",
      //       itemStyle: {
      //         normal: {
      //           color: "#3888fa",
      //           lineStyle: {
      //             color: "#3888fa",
      //             width: 2
      //           },
      //           areaStyle: {
      //             color: "#f3f8ff"
      //           }
      //         }
      //       },
      //       // barWidth:20,
      //       data: this.creditBalance
      //     },
      //     {
      //       name: "信贷发放额",
      //       itemStyle: {
      //         normal: {
      //           color: "#FF005A",
      //           lineStyle: {
      //             color: "#FF005A",
      //             width: 2
      //           }
      //         }
      //       },
      //       type: "line",
      //       data: this.totalCredit

      //     },
      //     {
      //       name: "信贷余额",
      //       type: "line",
      //       itemStyle: {
      //         normal: {
      //           color: "#3888fa",
      //           lineStyle: {
      //             color: "#3888fa",
      //             width: 2
      //           },
      //           areaStyle: {
      //             color: "#f3f8ff"
      //           }
      //         }
      //       },
      //       data: this.creditBalance
      //     }
      //   ]
      // }
      var option = {
        title: {
          text: "总览",
          top: 0
        },
        tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "none",
                label: {
                  backgroundColor: "#6a7985"
                }
              },
              formatter: function(params) {
                var that = this;
                var res = params[0].name + "年<br />";
                var myseries = ZLyears;
                //循环遍历series数据系列
                for (var i = 0; i < myseries.length; i++) {
                  //在内部继续循环series[i],从data中判断：当地区名称等于params.name的时候就将当前数据和名称添加到res中供显示
                  // for (var k = 0; k < myseries[i].data.length; k++) {
                  //   //如果data数据中的name和地区名称一样
                  //   if (myseries[i].data[k].name == params.name) {
                  //     //将series数据系列每一项中的name和数据系列中当前地区的数据添加到res中
                  //     res +=
                  //       myseries[i].name + ":" + myseries[i].data[k].value + "<br />";
                  //   }
                  if (ZLyears[i] == params[0].name) {
                    res += "信贷发放额:" + toThousandFilters(numberFormat(totalCredit[i])) + "万元<br />";
                    res += "信贷余额:" + toThousandFilters(numberFormat(creditBalance[i])) + "万元<br />";
                    res += "信贷笔数:" + counts[i] + "笔<br />";
                  }

                  // }
                }
                return res;
              }
          },
          legend: {
              data: ['信贷发放额', '信贷余额','贷款笔数']
          },
          xAxis: [
            {
              type: "category",
              data: this.ZLyears,
              axisLabel: { formatter: "{value} 年" },
              axisTick: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              axisLabel: { formatter:function(params){
                return toThousandFilter(params) + '.00万元'
              } },
              // axisTick: {
              //   show: false
              // }
            },
            // {
            //   type: 'value',
            //   name: '金额',
            //   position: 'left',
            //   min:0,
            //   max:1000,
            //   axisLine: {
            //       show: true,
            //       lineStyle: {
            //           // color: this.totalCredit[0]
            //       }
            //   },
            //   axisLabel: { formatter:function(params){
            //     return toThousandFilter(params) + '万元'
            //   } }
            // },
            {
              type: 'value',
              // name: '贷款笔数',
              // position: 'right',
              // axisLine: {
              //     show: true,
              //     lineStyle: {
              //         // color: this.counts[0]
              //     }
              // },
              axisLabel: {formatter: '{value} 笔'},
              // axisTick: {
              //   show: false
              // }
            }
          ],
          series: [
              {
                  name: '信贷发放额',
                  type: 'bar',
                  data: this.totalCredit,
                  itemStyle: {
                    normal: {
                      color: "#FF005A",
                      lineStyle: {
                        color: "#FF005A",
                        width: 2
                      }
                    }
                  },
                  yAxisIndex:'0',
                  z: 1,
                  // barWidth:'40%'
              },
              {
                  name: '信贷余额',
                  type: 'bar',
                  data: this.creditBalance,
                  itemStyle: {
                    normal: {
                      color: "#3888fa",
                      lineStyle: {
                        color: "#3888fa",
                        width: 2
                      },
                      areaStyle: {
                        color: "#f3f8ff"
                      }
                    }
                  },
                  yAxisIndex:'0',
                  z: 1,
                  // barWidth:'40%',
              },
              {
                  name: '贷款笔数',
                  type: 'bar',
                  data: this.counts,
                  itemStyle: {
                    normal: {
                      color: "#EE6666",
                      lineStyle: {
                        color: "#EE6666",
                        width: 2
                      },
                      areaStyle: {
                        color: "#EE6666"
                      }
                    }
                  },
                  yAxisIndex:'1',
                  z: 1,
                  // barWidth:'40%',
              },
              {
                  xAxisIndex: 1,
                  yAxisIndex:'0',
                  name: '信贷发放额',
                  type: 'line',
                  itemStyle:{
                      normal:{
                          lineStyle:{
                              color: '#FF005A',
                              type:'solid' //'dotted'虚线 'solid'实线
                          }
                      }
                  },
                  data: this.totalCredit,
              },
              {
                  xAxisIndex: 1,
                  yAxisIndex:'0',
                  name: '信贷余额',
                  type: 'line',
                  itemStyle:{
                      normal:{
                          lineStyle:{
                              color: '#3888fa',
                              type:'solid'
                          }
                      }
                  },
                  data: this.creditBalance,
              },
              {
                  xAxisIndex: 1,
                  yAxisIndex:'1',
                  name: '贷款笔数',
                  type: 'line',
                  itemStyle:{
                      normal:{
                          lineStyle:{
                              color: '#EE6666',
                              type:'solid'
                          }
                      }
                  },
                  data: this.counts,
              }
          ]
      };
      option.xAxis[1] = {
          type: 'value',
          max: option.xAxis[0].data.length * 100,
          show: false
      }
      option.series[3].data = option.series[3].data.map((x, i) => [21 + i * 100, x])  // 27
      option.series[4].data = option.series[4].data.map((x, i) => [50 + i * 100, x])  // 73
      option.series[5].data = option.series[5].data.map((x, i) => [79 + i * 100, x])
      var colors = ['#FF005A', '#3888fa', '#EE6666'];
      // var option = {
      //   title: {
      //     text: '总览',
      //     top: 0
      //   },
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       type: "none",
      //       label: {
      //         backgroundColor: "#6a7985"
      //       }
      //     },
      //     formatter: function(params) {
      //       var that = this;
      //       var res = params[0].name + "年<br />";
      //       var myseries = ZLyears;
      //       //循环遍历series数据系列
      //       for (var i = 0; i < myseries.length; i++) {
      //         //在内部继续循环series[i],从data中判断：当地区名称等于params.name的时候就将当前数据和名称添加到res中供显示
      //         // for (var k = 0; k < myseries[i].data.length; k++) {
      //         //   //如果data数据中的name和地区名称一样
      //         //   if (myseries[i].data[k].name == params.name) {
      //         //     //将series数据系列每一项中的name和数据系列中当前地区的数据添加到res中
      //         //     res +=
      //         //       myseries[i].name + ":" + myseries[i].data[k].value + "<br />";
      //         //   }
      //         if (ZLyears[i] == params[0].name) {
      //           res += "信贷发放额:" + toThousandFilters(numberFormat(totalCredit[i])) + "万元<br />";
      //           res += "信贷余额:" + toThousandFilters(numberFormat(creditBalance[i])) + "万元<br />";
      //           res += "信贷笔数:" + counts[i] + "笔<br />";
      //         }

      //         // }
      //       }
      //       return res;
      //     }
      //   },
      //   // toolbox: {
      //   //     feature: {
      //   //         // dataView: {show: true, readOnly: false},
      //   //         magicType: {show: true, type: ['line', 'bar']},
      //   //         // restore: {show: true},
      //   //         // saveAsImage: {show: true}
      //   //     }
      //   // },
      //   legend: {
      //       data: ['信贷发放额', '信贷余额', '贷款笔数']
      //   },
      //   xAxis: [
      //       {
      //           type: 'category',
      //           data: this.ZLyears,
      //           axisLabel: { formatter: "{value} 年" },
      //           axisTick: {
      //             show: false
      //           }
      //       }
      //   ],
      //   yAxis: [
      //       {
      //           type: 'value',
      //           name: '金额',
      //           // interval: 50,
      //           axisLabel: {
      //             formatter:function(params){
      //               return toThousandFilter(params) + '.00万元'
      //             }
      //           }
      //       },
      //       {
      //           type: 'value',
      //           name: '笔数',
      //           // interval: 5,
      //           axisLabel: {
      //               formatter: '{value} 笔'
      //           }
      //       }
      //   ],
      //   series: [
      //       {
      //           name: '信贷发放额',
      //           type: 'bar',
      //           itemStyle: {
      //             color: "#FF005A"
      //           },
      //           data: this.totalCredit
      //       },
      //       {
      //           name: '信贷余额',
      //           type: 'bar',
      //           itemStyle: {
      //             color: "#3888fa"
      //           },
      //           data: this.creditBalance
      //       },
      //       {
      //           name: '贷款笔数',
      //           type: 'line',
      //           yAxisIndex: 1,
      //           itemStyle: {
      //             color: "#EE6666"
      //           },
      //           data: this.counts
      //       }
      //   ]
      // }
      zx.setOption(
        option
      );

    },
    mapEchartsInit() {
      var that = this;
      this.mapOption.tooltip.formatter = function(params) {
        //定义一个res变量来保存最终返回的字符结果,并且先把地区名称放到里面
        var res = params.name + "<br />";
        //定义一个变量来保存series数据系列
        var myseries = that.mapOption.series;
        //循环遍历series数据系列
        for (var i = 0; i < myseries.length; i++) {
          //在内部继续循环series[i],从data中判断：当地区名称等于params.name的时候就将当前数据和名称添加到res中供显示
          for (var k = 0; k < myseries[i].data.length; k++) {
            //如果data数据中的name和地区名称一样
            if (myseries[i].data[k].name == params.name) {
              //将series数据系列每一项中的name和数据系列中当前地区的数据添加到res中
              if(myseries[i].name == "信贷笔数"){
                res +=
                myseries[i].name + ":" + myseries[i].data[k].value + "笔<br />";
              }else if(myseries[i].name == "贫困户数量"){
                res +=
                myseries[i].name + ":" + tease(myseries[i].data[k].value) + "人<br />";
              }else{
                res +=
                  myseries[i].name + ":" + tease(myseries[i].data[k].value) + "元<br />";
              }

            }
          }
        }
        return res;
      };
    },
    drawLines() {
      // 基于准备好的dom，初始化echarts实例
      var myChartContainer = document.getElementById("myChartChina");
      var resizeMyChartContainer = function() {
        myChartContainer.style.width = document.body.offsetWidth / 2 + "px"; // 页面一半的大小
      };
      resizeMyChartContainer();
      var myChartChina = this.$echarts.init(myChartContainer);

      function randomData() {
        return Math.round(Math.random() * 500);
      }
      // 绘制图表
      var optionMap = {
        tooltip: {},
        legend: {
          orient: "vertical",
          left: "left",
          data: [""]
        },
        selectedMode: "single",
        series: [
          {
            name: "",
            type: "map",
            mapType: "新疆",
            itemStyle: {
              normal: {
                borderColor: "rgba(0, 0, 0, 0.2)"
              },
              emphasis: {
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            showLegendSymbol: true,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: [

            ]
          }
        ]
      };

      myChartChina.setOption(optionMap);
      window.onresize = function() {
        resizeMyChartContainer();
        myChartChina.resize();
      };
    },
    //获取年份
    selYearList() {
      selYear().then(res => {
        this.options = []
        this.year = res.data.sort();
        res.data.map(e => {
          this.options.push({
            value: e,
            label: e
          });
        });

        // this.month = this.year[this.year.length - 1];
        // this.loan_quality = this.year[this.year.length - 1];
        // this.bank_address_code = this.year[this.year.length - 1];
        this.month = this.year[0];
        this.loan_quality = this.year[0];
        this.bank_address_code = this.year[0];
        this.lineChart()
        this.yearStatistics();
        this.loanQuality();
        this.bankAddressCode();
      });
    },
    lineChart(){
      this.ZLloading = true
      queryReportStatistics().then(res => {
        this.creditBalance = []
        this.totalCredit = []
        this.counts = []
        res.data.forEach((e,index) => {
          // res.data[index].creditBalance = toThousandFilter(numberFormat(e.creditBalance/10000));
          // res.data[index].totalCredit = toThousandFilter(numberFormat(e.totalCredit/10000));

          res.data[index].creditBalance = (e.creditBalance/10000)
          res.data[index].totalCredit = (e.totalCredit/10000)

          // this.counts = this.counts + e.counts
        })
        let list = res.data.sort(this.compare('years'))
        let num = list.length
        if(num < 6){
          for(var i = 0; (6 - num) > i; i++){
            list.push({
              years: String(Number(list[num - 1].years) + (i+1)),
              creditBalance:'0.00',
              totalCredit:'0.00',
              counts:'0'
            })
          }
        }
        this.ZLyears = []
        this.$nextTick(() => {
          list.map(e => {
            this.creditBalance.push( Number(e.creditBalance) );
            this.totalCredit.push(Number(e.totalCredit));
            this.counts.push(Number(e.counts));
            this.ZLyears.push(e.years)
          });
          this.ZLloading = false
          this.drawLine();
        })

      });
    },
    compare(property){
      return function(a,b){
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
      }
    },
    yearStatistics() {
      this.doorpostsLoading = true
      let data = {
        years:this.month,
        type:'month',
        loanPurpose:this.TJloanPurpose,
        loanVarietie:this.TJloanVarietie

      }
      //this.month + "/month/-/" + (this.TJloanPurpose == ''? '-' : this.TJloanPurpose) + '/' + (this.TJloanVarietie == ''? '-' : this.TJloanVarietie);
      reportStatistics(data).then(res => {
        this.loanAmount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.loanBalance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        res.data.map((e,index) => {
          this.loanAmount[Number(e.month) - 1] = e.loanAmount/10000
          this.loanBalance[Number(e.month) - 1] = e.loanBalance/10000
          this.num[Number(e.month) - 1] = e.num
        })
        this.doorpostsLoading = false
        this.drawLine();
      });
    },
    loanQuality() {
      this.loansLoading = true
      let data = {
        years:this.loan_quality,
        type:'loan_quality',
        loanPurpose:this.DKloanPurpose,
        loanVarietie:this.DKloanVarietie,
        // regionId:this.DKRegion
      }
      if(this.DKRegion.length > 0){
        data.regionId = this.DKRegion[this.DKRegion.length-1].split("/")[0]
        data.level = this.DKRegion[this.DKRegion.length-1].split("/")[1]
      }
      //this.loan_quality + "/loan_quality/-/"+ (this.DKloanPurpose == ''? '-' : this.DKloanPurpose) + '/' + (this.DKloanVarietie == ''? '-' : this.DKloanVarietie);
      reportStatistics(data).then(res => {
        this.loan_qualityArr = [];
        res.data.map(e => {
          this.loan_qualityArr.push({
            value: e.num,
            name: e.loanQualityName
          });
        });
        this.loansLoading = false
        this.guaranteeMethod();
      });
    },
    guaranteeMethod() {
      this.guaranteeLoading = true
      let data = {
        years:this.loan_quality,
        type:'guarantee_method',
        loanPurpose:this.DKloanPurpose,
        loanVarietie:this.DKloanVarietie,
        // region:this.DKRegion
      }
      if(this.DKRegion.length > 0){
        data.regionId = this.DKRegion[this.DKRegion.length-1].split("/")[0]
        data.level = this.DKRegion[this.DKRegion.length-1].split("/")[1]
      }
      // let data = this.loan_quality + "/guarantee_method/-/"+ (this.DKloanPurpose == ''? '-' : this.DKloanPurpose) + '/' + (this.DKloanVarietie == ''? '-' : this.DKloanVarietie);
      reportStatistics(data).then(res => {
        this.guarantee_methodArr = [];
        res.data.map(e => {
          this.guarantee_methodArr.push({
            value: e.num,
            name: e.guaranteeMethodName
          });
        });
        this.guaranteeLoading = false
        this.drawLine();
      });
    },
    resetMap(type){

      if(type == 'map'){
        this.loanPurpose = ''
        this.loanVarietie = ''
        this.bankAddressCode()
      }else if(type == 'TJ'){
        this.TJloanPurpose = ''
        this.TJloanVarietie = ''
        this.yearStatistics()
      }else if(type == 'DK'){
        this.DKloanPurpose = ''
        this.DKloanVarietie = ''
        this.DKRegion = []
        this.loanQuality()
      }
    },
    bankAddressCode() {
      this.tableLoading = true
      let data = {
        years:this.bank_address_code,
        type:'bank_address_code',
        loanPurpose:this.loanPurpose,
        queryLike:this.radio1,
        loanVarietie:this.loanVarietie
      }
      //this.bank_address_code + "/bank_address_code/"+this.radio1+'/'+ (this.loanPurpose == ''? '-' : this.loanPurpose) + '/' + (this.loanVarietie == ''? '-' : this.loanVarietie);

      let list = []
      reportStatistics(data).then(res => {
        this.tableList = res.data;
        this.cloning = res.data
        this.mapOption.series[0].data = [];
        this.mapOption.series[1].data = [];
        this.mapOption.series[2].data = [];
        this.mapOption.series[3].data = [];
        this.mapOption.series[4].data = [];
        res.data.map(e => {
          this.mapOption.series[0].data.push({
            name: e.bankAddress,
            value: e.loanAmount
          });
          this.mapOption.series[1].data.push({
            name: e.bankAddress,
            value: e.loanBalance
          });
          this.mapOption.series[2].data.push({
            name: e.bankAddress,
            value: e.num
          });
          this.mapOption.series[3].data.push({
            name: e.bankAddress,
            value: e.incomes
          });
          this.mapOption.series[4].data.push({
            name: e.bankAddress,
            value: e.poors
          });
        });
        this.mapOption.series[0].data.map(e => {
          list.push(e.value)
        })
        this.mapOption.visualMap.max = Math.max(...list) == -Infinity ? 0 : Math.max(...list)
        this.mapOption.visualMap.min = 0
        this.tableLoading = false
        this.drawLine();
        this.mapChart("mapChart")
      });
    },
    bankAddressCodes(type) {
      this.mapOption.series[0].data = [];
      this.mapOption.series[1].data = [];
      this.mapOption.series[2].data = [];
      this.mapOption.series[3].data = [];
      this.mapOption.series[4].data = [];
      let list = []
      if(type == 'loanAmount'){
        this.mapOption.series[0].name = '信贷发放额'
        this.mapOption.series[1].name = '信贷余额'
        this.mapOption.series[1].name = '信贷笔数'
        this.cloning.map(e => {
          this.mapOption.series[0].data.push({
            name: e.bankAddress,
            value: e.loanAmount
          });
          this.mapOption.series[1].data.push({
            name: e.bankAddress,
            value: e.loanBalance
          });
          this.mapOption.series[2].data.push({
            name: e.bankAddress,
            value: e.num
          });
        });
        this.mapOption.series[0].data.map(e => {
          list.push(e.value)
        })
        this.mapOption.visualMap.max = Math.max(...list) == -Infinity ? 0 : Math.max(...list)
        this.mapOption.visualMap.min = 0
      }else if(type == 'loanBalance'){
        this.mapOption.series[0].name = '信贷余额'
        this.mapOption.series[1].name = '信贷发放额'
        this.mapOption.series[1].name = '信贷笔数'
        this.cloning.map(e => {
          this.mapOption.series[1].data.push({
            name: e.bankAddress,
            value: e.loanAmount
          });
          this.mapOption.series[0].data.push({
            name: e.bankAddress,
            value: e.loanBalance
          });
          this.mapOption.series[2].data.push({
            name: e.bankAddress,
            value: e.num
          });
        });
        this.mapOption.series[0].data.map(e => {
          list.push(e.value)
        })
        this.mapOption.visualMap.max = Math.max(...list) == -Infinity ? 0 : Math.max(...list)
        this.mapOption.visualMap.min = 0
      }else if(type == 'num'){
        this.mapOption.series[0].name = '信贷笔数 '
        this.mapOption.series[1].name = '信贷余额'
        this.mapOption.series[1].name = '信贷发放额 '
        this.cloning.map(e => {
          this.mapOption.series[2].data.push({
            name: e.bankAddress,
            value: e.loanAmount
          });
          this.mapOption.series[1].data.push({
            name: e.bankAddress,
            value: e.loanBalance
          });
          this.mapOption.series[0].data.push({
            name: e.bankAddress,
            value: e.num
          });
        });
        this.mapOption.series[0].data.map(e => {
          list.push(e.value)
        })
        this.mapOption.visualMap.max = Math.max(...list) == -Infinity ? 0 : Math.max(...list)
        this.mapOption.visualMap.min = 0
      }

        this.mapChart("mapChart")

    },
    reload(){
      this.lineChart();
    }
  },
  filters:{
    tease,
    toThousandFilters
  }
};
</script>

<style scoped>
</style>
