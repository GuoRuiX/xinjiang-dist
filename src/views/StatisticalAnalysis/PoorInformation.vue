<template>
  <div class="distance">
    <el-card class="box-card">
      <template slot="header">数据筛选</template>
      <div class="FuzzyQuery">
        <el-form ref="form" :model="poor" label-position="top">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="户主姓名：">
                <el-input v-model="poor.householderName" placeholder="请填写户主姓名" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="民族：">
                <el-input v-model="poor.nation" placeholder="请填写民族" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="年龄：">
                <!-- <el-input v-model.number="poor.age" oninput="value=value.replace(/[^\d.]/g,'').substring(0,3);" placeholder="请填写年龄" size="mini"></el-input> -->
                <el-row :gutter="10">
                  <el-col :span="11">
                    <el-input v-model="poor.startAge" size="mini" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入下限"></el-input>
                  </el-col>
                  <el-col :span="2" style="text-align: center;">—</el-col>
                  <el-col :span="11">
                    <el-input v-model="poor.endAge" size="mini" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入上限"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别：">
                <el-select
                  v-model="poor.gender"
                  placeholder="请选择性别"
                  clearable
                  size="mini"
                  class="widthAuto"
                >
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="家庭住址：">
                <el-input v-model="poor.address" placeholder="请填写家庭住址" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="家庭人口数：">
                <!-- <el-input v-model.number="poor.familySize" oninput="value=value.replace(/[^\d.]/g,'').substring(0,3);" placeholder="请填写家庭人口数" size="mini"></el-input> -->
                <el-row :gutter="10">
                  <el-col :span="11">
                    <el-input v-model="poor.startFamilySize" size="mini" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入下限"></el-input>
                  </el-col>
                  <el-col :span="2" style="text-align: center;">—</el-col>
                  <el-col :span="11">
                    <el-input v-model="poor.endFamilySize" size="mini" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入上限"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="脱贫标志：">
                <el-select
                  v-model="poor.povertySign"
                  clearable
                  placeholder="请选择脱贫标志"
                  size="mini"
                  class="widthAuto"
                >
                  <el-option label="已脱贫" value="已脱贫"></el-option>
                  <el-option label="未脱贫" value="未脱贫"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="耕地面积(亩)：">
                <!-- <el-input v-model="poor.landarea" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请填写耕地面积" size="mini"></el-input> -->
                <el-row :gutter="10">
                  <el-col :span="11">
                    <el-input v-model="poor.startLandarea" size="mini" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入下限"></el-input>
                  </el-col>
                  <el-col :span="2" style="text-align: center;">—</el-col>
                  <el-col :span="11">
                    <el-input v-model="poor.endLandarea" size="mini" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入上限"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="林地面积(亩)：">
                <!-- <el-input v-model="poor.woodlandarea" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请填写林地面积" size="mini"></el-input> -->
                <el-row :gutter="10">
                  <el-col :span="11">
                    <el-input v-model="poor.startWoodlandarea" size="mini" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入下限"></el-input>
                  </el-col>
                  <el-col :span="2" style="text-align: center;">—</el-col>
                  <el-col :span="11">
                    <el-input v-model="poor.endWoodlandarea" size="mini" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入上限"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="人均纯收入(元/月)：">
                <!-- <el-input v-model="poor.income" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请填写人均纯收入" size="mini"></el-input> -->
                <el-row :gutter="10">
                  <el-col :span="11">
                    <el-input v-model="poor.startIncome" size="mini" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入下限"></el-input>
                  </el-col>
                  <el-col :span="2" style="text-align: center;">—</el-col>
                  <el-col :span="11">
                    <el-input v-model="poor.endIncome" size="mini" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入上限"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label style="padding-top:20px">
                <el-button type="primary" @click="onSubmit" size="mini" icon="el-icon-search" :loading="tableLoading">查询</el-button>
                <el-button @click="reset" size="mini" icon="el-icon-refresh">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div>
        <div class="el-table-button">
          <el-button type="primary" size="mini" @click="exportExcel" icon="el-icon-bottom" :loading="downloadLoading">导出</el-button>
        </div>
        <el-table
          :data="poorList"
          border
          size="mini"
          style="width: 100%"
          v-loading="tableLoading"
          empty-text="暂无数据"
        >
          <el-table-column label="户主姓名" width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.row.householderName || "无" }}</template>
          </el-table-column>
          <el-table-column label="民族" min-width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.row.nation || "无" }}</template>
          </el-table-column>
          <el-table-column label="年龄" width="50" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.row.age || "无" }}</template>
          </el-table-column>
          <el-table-column label="性别" min-width="50" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.row.gender || "无" }}</template>
          </el-table-column>
          <el-table-column label="家庭人口" min-width="80" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.row.familySize || "无" }}</template>
          </el-table-column>
          <el-table-column label="家庭住址" min-width="200" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.row.address }}</template>
          </el-table-column>
          <el-table-column label="脱贫标志" min-width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.row.povertySign }}</template>
          </el-table-column>
          <el-table-column label="耕地面积（亩）" min-width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.row.landarea }}</template>
          </el-table-column>
          <el-table-column label="林地面积（亩）" min-width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.row.woodlandarea }}</template>
          </el-table-column>
          <el-table-column label="人均纯收入（元/月）" min-width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.row.income | numberFormat }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="mini" icon="el-icon-view" @click="Toview(scope.row)">查看</el-button>
             <!-- <el-divider direction="vertical"></el-divider>
              <el-button type="text" size="mini" icon="el-icon-bottom" @click="downloadPDF(scope.row)">信用报告</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>

      <el-drawer
        title="贫困户信息详情"
        size="50%"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        :close-on-press-escape="false"
        :wrapperClosable="false"
        custom-class="el-drawer__modal"
      >
        <div class="el-drawer__content">
          <el-form ref="info" :model="info" disabled label-position="top">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="户主姓名">
                  <el-input v-model="info.householderName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件类型">
                  <el-input v-model="info.idCardType"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码">
                  <el-input v-model="info.idCard"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="民族">
                  <el-input v-model="info.nation"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="年龄">
                  <el-input v-model="info.age"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别">
                  <el-input v-model="info.gender"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="家庭人口">
                  <el-input v-model="info.familySize"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="地州">
                  <el-input v-model="info.prefecture"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="县市">
                  <el-input v-model="info.counties"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="乡镇">
                  <el-input v-model="info.township"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="行政村">
                  <el-input v-model="info.administrativeVillage"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="家庭住址">
                  <el-input v-model="info.address"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="脱贫标志">
                  <el-input v-model="info.povertySign"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="耕地面积（亩）">
                  <el-input v-model="info.landarea"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="林地面积（亩）">
                  <el-input v-model="info.woodlandarea"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="人均纯收入（元/月）">
                  <el-input v-model="info.income"></el-input>
                </el-form-item>
              </el-col>
<!--              <el-col :span="8">
                <el-form-item label="健康状态">
                  <el-input v-model="info.health"></el-input>
                </el-form-item>
              </el-col>-->
              <el-col :span="8">
                <el-form-item label="贫困户属性">
                  <el-input v-model="info.poorHouseholdsAttribute"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="贫困户人口编码">
                  <el-input v-model="info.populationCode"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="同步时间">
                  <el-input v-model="info.synchronizationDate"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="el-drawer__footer">
          <div class="text-right">
            <el-button size="mini" @click="handleClose">关闭</el-button>
          </div>
        </div>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
import { poorHouseholdsInformation, exportExcelDate } from "@/api/StatisticalAnalysis";
import {numberFormat} from '@/utils/validate'
export default {
  data() {
    return {
      poor: {
        pageSize: 10,
        currentPageNum: 1
      },
      tableLoading: false,
      downloadLoading: false,
      poorList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      info: {},
      direction: "rtl",
      drawer: false,
      list:[],
      filename: '贫困户信息',
      autoWidth: true,
      bookType: 'xlsx',
    };
  },
  created() {
    this.onSubmit();
  },
  methods: {
    // 搜索
    onSubmit() {
      this.tableLoading = true;
      poorHouseholdsInformation(this.poor)
        .then(res => {
          if (res.code == "00000") {
            this.poorList = res.data.records;
            this.total = res.data.total;
          }
          this.tableLoading = false;
        })
        .catch(res => {
          this.tableLoading = false;
        });
    },
    reset() {
      this.poor = {
        pageSize: 10,
        currentPageNum: 1
      }
      this.onSubmit()
    },
    exportExcel() {
      this.downloadLoading = true
      poorHouseholdsInformation(this.poor).then(res => {
        this.list = res.data.records
        this.handleDownload()
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/utils/Export2Excel').then(excel => {
        const tHeader = ['年份', '地州', '县市', '乡镇', '行政村', '行政村编码','户主姓名','证件号码','家庭住址','贫困户编码','贫困户人口编码','贫困户属性','证件类型','脱贫标志','家庭人口数','与户主关系','性别','年龄','民族','耕地面积','林地面积','人均纯收入']
        const filterVal = ['years', 'prefecture', 'counties', 'township', 'administrativeVillage', 'administrativeVillageCode','householderName','idCard','address','poorHouseholdsCode','populationCode','poorHouseholdsAttribute','idCardType','povertySign','familySize','relationShipName','gender','age','nation','landarea','woodlandarea','income']
        const list = this.list
        console.log(list)
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    Toview(row) {
      this.drawer = true;
      this.info = row;
    },
    handleCurrentChange(val) {
      this.poor.currentPageNum = val
      this.onSubmit()
    },
    handleClose() {
      this.drawer = false;
    },
    downloadPDF(row){
      window.open('/api/poorHouseholdsInformation/'+row.id+'/信用报告.pdf')
    }
  },
  filters:{
    numberFormat
  }
};
</script>

<style scoped>
</style>
