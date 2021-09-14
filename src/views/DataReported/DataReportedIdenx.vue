<template>
  <div class="distance" v-loading="loading" element-loading-text="数据上报中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-card class="box-card">
      <template slot="header">数据筛选</template>
      <div class="FuzzyQuery">
        <el-form ref="form" :model="borrowing" label-position="top">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="借款人：">
                <el-input v-model="borrowing.customerName" size="mini" placeholder="请输入借款人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="放款机构：">
                <el-input v-model="borrowing.bankName" size="mini" placeholder="请输入放款机构"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="" style="padding-top:20px">
                <el-button type="primary" @click="onSubmit" size="mini" icon="el-icon-search" :loading="tableLoading">查询</el-button>
                <el-button @click="reset" size="mini" icon="el-icon-refresh">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

      </div>
      <div>
        <div class="el-table-button">

          <el-upload
            class="upload-demo left"
            action="/api/statisticalAnalysis/importExcel"
            :on-preview="handlePreview"
            :headers="tokenHeader"
            :on-success="handleAvatarSuccess"
            :on-progress="handleAvatarProgress"
            :before-upload="refreshToken"
            accept=".txt,.xlsx"
            :show-file-list="false"
            multiple>
            <el-button size="mini" type="primary" :loading="uploadLoading" icon="el-icon-top">数据上报</el-button>
          </el-upload>
          <!-- <el-button type="primary" size="mini" @click="exportExcel" :loading="downloadLoading" icon="el-icon-bottom">模版下载</el-button> -->
          <div style="float: left;padding-top:3px">
            <a href="/static/xlsx/template.xlsx" type="primary" style="color: #FFF;padding: 7px 15px;font-size: 12px;margin-top:2px;
    border-radius: 3px;
    background-color: #409EFF;
    border-color: #409EFF;">模版下载</a>
          </div>

        </div>
        <el-table :data="borrowingList" border size="mini" style="width: 100%" v-loading="tableLoading" empty-text="暂无数据">
          <el-table-column label="借贷人" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.customerName || "无" }}</template>
          </el-table-column>
          <el-table-column label="放款机构" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.bankName || "无" }}</template>
          </el-table-column>
          <el-table-column label="借款金额（元）" width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.loanAmount | numberFormat }}</template>
          </el-table-column>
          <el-table-column label="借款日期" min-width="100" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.loanDate || "无" }}</template>
          </el-table-column>
          <el-table-column label="还款日期" min-width="100" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.maturityDate || "无" }}</template>
          </el-table-column>
          <el-table-column label="信用等级" min-width="100" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.creditLevel }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
              <template slot-scope="scope">
                  <el-button type="text" size="mini" icon="el-icon-view" @click="Toview(scope.row)">查看</el-button>
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
    </el-card>

    <el-drawer
      title="借贷信息详情"
      size="50%"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :close-on-press-escape="false"
      :wrapperClosable="false"
      custom-class="el-drawer__modal">
      <div class="el-drawer__content">
        <el-form ref="info" :model="info" disabled label-position="top">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="借贷人">
                <el-input v-model="info.customerName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="放款机构">
                <el-input v-model="info.bankName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款金额（元）">
                <el-input v-model="info.loanAmount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款余额（元）">
                <el-input v-model="info.loanBalance"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借款日期">
                <el-input v-model="info.loanDate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="还款日期">
                <el-input v-model="info.maturityDate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="信用等级">
                <el-input v-model="info.creditLevel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="金融机构地区">
                <el-input v-model="info.bankAddress"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="机构编码">
                <el-input v-model="info.bankCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贷款银行详细名称">
                <el-input v-model="info.bankName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-show="isShow">
              <el-form-item label="贷款合同编码">
                <el-input v-model="info.contractCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贷款合同金额 ">
                <el-input v-model="info.contractaMount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="信用户标志">
                <el-input v-model="info.creditAccountLogoName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-show="isShow">
              <el-form-item label="客户编号">
                <el-input v-model="info.customerCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码">
                <el-input v-model="info.customerIdCard"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贴息贷款标志">
                <el-input v-model="info.discountLoanSignName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贴息比例(%)">
                <el-input v-model="info.discountRatio"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="担保方式">
                <el-input v-model="info.guaranteeMethodName"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="借据余额">
                <el-input v-model="info.loanBalance"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贷款用途">
                <el-input v-model="info.loanPurposeName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贷款质量">
                <el-input v-model="info.loanQualityName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贷款品种">
                <el-input v-model="info.loanVarietieName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贫困户户籍号码">
                <el-input v-model="info.poorCode"></el-input>
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


    <div class="examine-look">
      <el-dialog
        title="预警信息"
        :visible.sync="dialogFormVisible"
        width="800px"
        top="0"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :before-close="resetForm"
      >
        <div class="examine-details">
          <div class="el-table-button">
          <el-button type="primary" size="mini" @click="handleDownload">预警信息导出</el-button>
        </div>
          <el-table :data="errorList" border size="mini" style="width: 100%" v-loading="tableLoading" empty-text="暂无数据">
            <el-table-column label="户主姓名" min-width="200" :show-overflow-tooltip="true">
                <template slot-scope="scope"> {{ scope.row.householderName || "无" }}</template>
            </el-table-column>
            <el-table-column label="民族" min-width="200" :show-overflow-tooltip="true">
                <template slot-scope="scope"> {{ scope.row.nation || "无" }}</template>
            </el-table-column>
            <el-table-column label="年龄" width="200" :show-overflow-tooltip="true">
                <template slot-scope="scope"> {{ scope.row.age || "无" }}</template>
            </el-table-column>
            <el-table-column label="性别" min-width="200" :show-overflow-tooltip="true">
                <template slot-scope="scope"> {{ scope.row.gender || "无" }}</template>
            </el-table-column>
            <el-table-column label="家庭人口" min-width="200" :show-overflow-tooltip="true">
                <template slot-scope="scope"> {{ scope.row.familySize || "无" }}</template>
            </el-table-column>
            <el-table-column label="家庭住址" min-width="100" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.address }}</template>
            </el-table-column>
            <el-table-column label="脱贫标志" min-width="100" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.povertySign }}</template>
            </el-table-column>
            <el-table-column label="耕地面积（亩）" min-width="100" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.landarea }}</template>
            </el-table-column>
            <el-table-column label="林地面积（亩）" min-width="100" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.woodlandarea }}</template>
            </el-table-column>
            <el-table-column label="人均纯收入（元/月）" min-width="100" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.income }}</template>
            </el-table-column>
            <!-- <el-table-column fixed="right" label="操作" width="80">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" icon="el-icon-view" @click="Toview(scope.row)">查看</el-button>
                </template>
            </el-table-column> -->
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm()">关 闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {selectFuzzy, exportExcelStatistical} from '@/api/StatisticalAnalysis'
import {numberFormat} from '@/utils/validate'
import { getToken, setToken, getRefreshToken } from '@/utils/auth'
import axios from 'axios'
export default {
  data() {
    return {
      borrowing:{
        pageSize:10,
        currentPageNum:1
      },
      info:{},
      borrowingList:[],
      currentPage:1,
      pageSize:10,
      total:0,
      tableLoading:false,
      loading:false,
      drawer:false,
      direction:'rtl',
      uploadLoading:false,
      errorList:{},
      dialogFormVisible:false,
      downloadLoading:false,
      filename: '贫困户信息',
      autoWidth: true,
      bookType: 'xlsx',
      user:{},
      isShow:false,
      tokenHeader: {Authorization: getToken()},
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('data')).user
    this.onSubmit()
  },
  methods: {

    // 查询列表
    onSubmit(){
      this.tableLoading = true
      selectFuzzy(this.borrowing).then(res => {
        if(res.code == '00000'){
          this.borrowingList = res.data.records
          this.total = res.data.total
        }
        this.tableLoading = false
      }).catch(res => {
        this.tableLoading = false
      })
    },
    // 重置
    reset(){
      this.borrowing = {
        pageSize:10,
        currentPageNum:1
      }
      this.onSubmit()
    },
    //分页
    handleCurrentChange(val){
      this.borrowing.currentPageNum = val
      this.onSubmit()
    },
    //查看
    Toview(row){
      this.drawer = true
      this.info = row
      if(row.uploadOrganization == this.user.pbcCode){
        this.isShow=true;
      }
    },
    //关闭
    handleClose(){
      this.drawer = false
    },
    //导出
    exportExcel(){
      window.open('/api/statisticalAnalysis/downTemplate')
    },
    handleAvatarProgress(){
      this.loading = true
      this.uploadLoading = true
    },
    handlePreview(){
      this.loading = true
      this.uploadLoading = true

    },
    handleAvatarSuccess(res, file){
      this.loading = false
      this.uploadLoading = false
      if(res.code != '00000'){
        this.$message.error(res.msg);
        return
      }else {
        this.$message({
          message: '文件上传成功',
          type: 'success'
        });
       /* this.errorList = res.data
        this.dialogFormVisible = true*/
      }

    },
    resetForm(){
      this.dialogFormVisible = false
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/utils/Export2Excel').then(excel => {
        //第14个属性  健康状态 ，隐藏
        const tHeader = ['年份', '地州', '县市', '乡镇', '行政村', '行政村编码','户主姓名','证件号码','家庭住址','贫困户编码','贫困户人口编码','贫困户属性','证件类型','脱贫标志','脱贫标志标准','家庭人口数','家庭人口数标准','与户主关系','性别','年龄','民族','耕地面积','耕地面积标准','林地面积','林地面积标准','人均纯收入','人均纯收入标准','时间']
        const filterVal = ['years', 'prefecture', 'counties', 'township', 'administrativeVillage', 'administrativeVillageCode','householderName','idCard','address','poorHouseholdsCode','populationCode','poorHouseholdsAttribute','idCardType','povertySign','povertySignStandard','familySize','familySizeStandard','relationShipName','gender','age','nation','landarea','landareaStandard','woodlandarea','woodlandareaStandard','income','incomeStandard','synchronizationDate']
        const list = this.errorList
        console.log(list);
        console.log(filterVal);
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
    refreshToken(){
      return this.refresh()
    }
  },
  filters: {
    numberFormat
  }
};
</script>

<style scoped>
.left{
  float: left;
  margin-right: 10px;
}
</style>;l[]
