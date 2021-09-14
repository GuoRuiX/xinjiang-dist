<template>
  <div class="distance">
    <el-card class="box-card">
      <template slot="header">数据筛选</template>
      <div class="FuzzyQuery">
        <el-form ref="form" :model="poors" label-position="top">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item prop="county" label="贫困县：">
                <!-- <el-input v-model="poors.county" size="mini" placeholder="请输入贫困县"></el-input> -->
                <el-cascader
                  v-model="DKRegion"
                  size="mini"
                  class="widthAuto"
                  placeholder="请选择贫困县"
                  :options="regionList"
                  :show-all-levels="false"
                  :props="{ checkStrictly: true }"
                  @change="handleChange">
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="povertySign" label="贫困县等级：">
                <el-select
                  v-model="poors.countyLevel"
                  clearable
                  placeholder="请选择脱贫标志"
                  size="mini"
                  class="widthAuto">
                  <el-option label="深度贫困县" value="1"></el-option>
                  <el-option label="贫困县" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="deptOrg" label="机构：">
                <el-select
                  v-model="poors.deptOrg"
                  clearable
                  placeholder="请选择机构"
                  size="mini"
                  class="widthAuto">
                  <el-option label="中国农业银行股份有限公司新疆维吾尔自治区分行" value="中国农业银行股份有限公司新疆维吾尔自治区分行"></el-option>
                  <el-option label="中国邮政储蓄银行股份有限公司新疆维吾尔自治区分行" value="中国邮政储蓄银行股份有限公司新疆维吾尔自治区分行"></el-option>
                  <el-option label="新疆维吾尔自治区农村信用社联合社" value="新疆维吾尔自治区农村信用社联合社"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="povertySign" label="选择日期：">
                <el-date-picker
                  class="widthAuto"
                  v-model="timeData"
                  size="mini"
                  unlink-panels
                  type="daterange"
                  range-separator="至"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="" style="padding-top:20px">
                <el-button type="primary" @click="onSubmit" size="mini" icon="el-icon-search" :loading="tableLoading">查询</el-button>
                <el-button @click="reset" size="mini" icon="el-icon-refresh">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

      </div>
      <el-table :data="poorList" :summary-method="getSummaries" show-summary border size="mini" style="width: 100%" v-loading="tableLoading" empty-text="暂无数据">
        <el-table-column label="贫困县名称" min-width="200" :show-overflow-tooltip="true">
          <template slot-scope="scope"> {{ scope.row.county }}</template>
        </el-table-column>
        <el-table-column label="贫困户数量" min-width="200" :show-overflow-tooltip="true" prop="poorNo">
          <template slot-scope="scope"> {{ scope.row.poorNo}}</template>
        </el-table-column>
        <el-table-column label="信用户数量" min-width="200" :show-overflow-tooltip="true" prop="creditNo">
          <template slot-scope="scope"> {{ scope.row.creditNo}}</template>
        </el-table-column>
        <el-table-column label="信贷笔数" min-width="200" :show-overflow-tooltip="true" prop="loanNo">
          <template slot-scope="scope"> {{ scope.row.loanNo}}</template>
        </el-table-column>
        <el-table-column label="信贷总额" min-width="200" :show-overflow-tooltip="true" prop="loanAmount">
          <template slot-scope="scope"> {{ scope.row.loanAmount}}元</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
  import {poorCountyArr, getTree} from '@/api/StatisticalAnalysis'
  import {toThousandFilters, toThousandFilter} from '@/utils/validate'
  export default {
    data() {
      return {
        poorList:[],
        tableLoading:false,
        poors:{},
        timeData:[],
        DKRegion:[],
        regionList:[]
      };
    },
    created() {
      getTree().then(res => {
        this.regionList = res.data
        this.regionList = this.region(this.regionList)
        this.trans(this.regionList)
      })
      this.onSubmit()
    },
    methods: {
      trans(data){
        data.forEach(item => {
            item.value = item.areaNoId + '/' + item.level
            // item.label = item.regionName
            // debugger
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
    },
      handleChange(){},
      onSubmit(){
        this.tableLoading = true
        if(this.timeData.length > 0){
          this.poors.startDate = this.timeData[0]
          this.poors.endDate = this.timeData[1]
        }
        if(this.DKRegion.length > 0){
          this.poors.county = this.DKRegion[this.DKRegion.length-1].split("/")[0]
          this.poors.level = this.DKRegion[this.DKRegion.length-1].split("/")[1]
        }
        poorCountyArr(this.poors).then(res => {
          if(res.code == '00000'){
            this.poorList = res.data
          }
          this.tableLoading = false
        }).catch(res => {
          this.tableLoading = false
        })
      },
      handleCurrentChange(val){
        this.pageIndex = val
        this.onSubmit()
      },
      reset(){
        this.poors = {}
        this.DKRegion = []
        this.timeData = []
        this.onSubmit()
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '统计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if(index == 1){
              sums[index] = toThousandFilter( String(sums[index]) )
              sums[index] += ' 户';
            }else if(index == 2){
              sums[index] = toThousandFilter( String(sums[index]) )
              sums[index] += ' 户';
            }else if(index == 3){
              sums[index] = toThousandFilter( String(sums[index]) )
              sums[index] += ' 笔';
            }else if(index == 4){
              sums[index] = this.statisticalNumber(sums[index])
              sums[index] += ' 万元';
            }
          } else {
            sums[index] = 'N/A';
          }
        });
        console.log(sums)
        return sums;

      },
      statisticalNumber(val){
        let num = (val/1000).toFixed(2);
        return toThousandFilters( String(num) )
      }
    },
    filters:{

    }
  };
</script>

<style scoped>
</style>
