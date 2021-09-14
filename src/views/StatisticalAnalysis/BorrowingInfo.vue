<template>
  <div class="distance">
    <el-card class="box-card">
      <template slot="header">统计信息</template>
      <el-table :data="statLoanByLevelList" border size="mini" style="width: 100%" v-loading="tableLoading" empty-text="暂无数据">
        <el-table-column label="信用等级" min-width="200" :show-overflow-tooltip="true">
          <template slot-scope="scope"> {{ scope.row.creditLevel }}</template>
        </el-table-column>
        <el-table-column label="信用户数量" min-width="200" :show-overflow-tooltip="true">
          <template slot-scope="scope"> {{ scope.row.trustUserNo || "无" }}</template>
        </el-table-column>
        <el-table-column label="信贷笔数" width="200" :show-overflow-tooltip="true">
          <template slot-scope="scope"> {{ scope.row.loanNo || "无" }}</template>
        </el-table-column>
        <el-table-column label="信贷累计发放额（元）" min-width="200" :show-overflow-tooltip="true">
          <template slot-scope="scope"> {{ scope.row.totalLoanAmount | numberFormat }}</template>
        </el-table-column>
        <el-table-column label="信贷余额（元）" min-width="200" :show-overflow-tooltip="true">
          <template slot-scope="scope"> {{ scope.row.totalLoanBalance | numberFormat }}</template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="box-card">
      <template slot="header">数据筛选</template>
      <div class="FuzzyQuery">
        <el-form ref="form" :model="borrowing" label-position="top">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="借款人：">
                <el-input v-model="borrowing.customerName" size="mini" placeholder="请输入借款人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="机构：">
                <!-- <el-input v-model="borrowing.bankName" size="mini" placeholder="请输入放款机构"></el-input> -->
                <el-select
                  v-model="borrowing.deptOrg"
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
            <el-col :span="5">
              <el-form-item label="借贷时间：">
                <!-- <el-date-picker
                  class="widthAuto"
                  v-model="borrowing.loanDate"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择借贷时间">
                </el-date-picker> -->
                <el-date-picker
                  class="widthAuto"
                  unlink-panels
                  v-model="loanDate"
                  size="mini"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="还款时间：">
                <!-- <el-date-picker
                  class="widthAuto"
                  v-model="borrowing.maturityDate"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择还款时间">
                </el-date-picker> -->
                <el-date-picker
                  class="widthAuto"
                  v-model="maturityDate"
                  unlink-panels
                  size="mini"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="信用等级：">
                <!-- <el-input v-model="borrowing.creditLevel" size="mini" placeholder="请输入信用等级"></el-input> -->
                <el-select v-model="borrowing.creditLevel" placeholder="请选择信用等级" size="mini" class="widthAuto">
                  <el-option label="AAA" value="AAA"></el-option>
                  <el-option label="AA" value="AA"></el-option>
                  <el-option label="A" value="A"></el-option>
                  <el-option label="B" value="B"></el-option>
                  <el-option label="C" value="C"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="信贷规模(元)：">
                <el-row :gutter="10">
                  <el-col :span="11">
                    <el-input v-model="borrowing.startLoanAmount" size="mini" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入下限"></el-input>
                  </el-col>
                  <el-col :span="2" style="text-align: center;">—</el-col>
                  <el-col :span="11">
                    <el-input v-model="borrowing.endLoanAmount" size="mini" oninput="value=value.replace(/[^\d.]/g,'')" placeholder="请输入上限"></el-input>

                  </el-col>
                </el-row>


              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="贷款质量：">
                <el-select v-model="borrowing.loanQuality" placeholder="请选择贷款质量" size="mini" class="widthAuto">
                  <el-option label="正常" value="1"></el-option>
                  <el-option label="关注" value="2"></el-option>
                  <el-option label="次级" value="3"></el-option>
                  <el-option label="可疑" value="4"></el-option>
                  <el-option label="损失" value="5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="担保方式：">
                <el-select v-model="borrowing.guaranteeMethod" placeholder="请选择担保方式" size="mini" class="widthAuto">
                  <el-option label="信用" value="1"></el-option>
                  <el-option label="保证" value="2"></el-option>
                  <el-option label="质押" value="3"></el-option>
                  <el-option label="抵押" value="4"></el-option>
                  <el-option label="保证金" value="5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="county" label="地区：">
                <!-- <el-input v-model="poors.county" size="mini" placeholder="请输入贫困县"></el-input> -->
                <el-cascader
                  v-model="DKRegion"
                  size="mini"
                  class="widthAuto"
                  placeholder="请选择地区"
                  :options="regionList"
                  :show-all-levels="false"
                  :props="{ checkStrictly: true }"
                  @change="handleChange">
                </el-cascader>
              </el-form-item>






<!--              <el-form-item label="地区：">
                &lt;!&ndash; <el-input v-model="borrowing.bankAddress" size="mini" placeholder="请输入地区"></el-input> &ndash;&gt;
                <el-select v-model="borrowing.bankAddress" size="mini" class="widthAuto" placeholder="请选择地区">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>-->
            </el-col>
            <el-col :span="5">
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
          <el-button type="primary" size="mini" @click="exportExcel" :loading="downloadLoading" icon="el-icon-bottom">导出</el-button>
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
          <el-table-column label="借款日期" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.loanDate || "无" }}</template>
          </el-table-column>
          <el-table-column label="还款日期" min-width="200" :show-overflow-tooltip="true">
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
              <el-form-item label="贷款合同金额（元）">
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
              <el-form-item label="贴息比例">
                <el-input v-model="info.discountRatio"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="担保方式">
                <el-input v-model="info.guaranteeMethodName"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="借据余额（元）">
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
  </div>
</template>

<script>
import {selectFuzzy, exportExcelStatistical,statByCreditLevel, region} from '@/api/StatisticalAnalysis'
import {numberFormat} from '@/utils/validate'
import { getTree} from '@/api/StatisticalAnalysis'
export default {
  data() {
    return {
      borrowing:{
        pageSize:10,
        currentPageNum:1
      },
      info:{},
      statLoanByLevelList:[],
      borrowingList:[],
      currentPage:1,
      pageSize:10,
      total:0,
      tableLoading:false,
      drawer:false,
      direction:'rtl',
      list:[],
      filename: '借贷信息',
      autoWidth: true,
      bookType: 'xlsx',
      downloadLoading:false,
      loanDate:[],
      maturityDate:[],
      options:[],
      DKRegion:[],
      regionList:[],
      user:{},
      isShow:false
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('data')).user
    this.onSubmit()
    region().then(res => {
      res.data.map(e => {
        this.options.push({
          value:e.regionName,
          label:e.regionName
        })
      })
    });
      getTree().then(res => {
        this.regionList = res.data
        this.regionList = this.region(this.regionList)
        this.trans(this.regionList)
      })
  },
  methods: {
    handleChange(){},
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
    // 查询列表
    onSubmit(){
      this.tableLoading = true
      if(this.DKRegion.length > 0){
        this.borrowing.bankAddress = this.DKRegion[this.DKRegion.length-1].split("/")[0]
        this.borrowing.level = this.DKRegion[this.DKRegion.length-1].split("/")[1]
      }
      this.borrowing.startLoanDate = this.loanDate[0]
      this.borrowing.endLoanDate = this.loanDate[1]
      this.borrowing.startMaturityDate = this.maturityDate[0]
      this.borrowing.endMaturityDate = this.maturityDate[1]
      selectFuzzy(this.borrowing).then(res => {
        if(res.code == '00000'){
          this.borrowingList = res.data.records
          this.total = res.data.total
        }
        this.tableLoading = false
      }).catch(res => {
        this.tableLoading = false
      })
      statByCreditLevel().then(res => {
        if(res.code == '00000'){
          this.statLoanByLevelList = res.data
        }
        this.tableLoading = false
      })
    },
    // 重置
    reset(){
      this.loanDate = []
      this.maturityDate = []
      this.DKRegion = []
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
      console.log(row)
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
      selectFuzzy(this.borrowing).then(res =>{
        if(res.code == '00000'){
          this.list = res.data.records
          this.handleDownload()
        }
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/utils/Export2Excel').then(excel => {
        const tHeader = ['年份','月份','机构编码', '贷款银行详细名称', '金融机构地区', '贫困户户籍号码', '客户编号：指和金融机构后台系统一一对应的客户号码','借款人姓名','证件号码','信用户标志：1是0否（若没有此项标识，凡是信贷系统中发放的无抵押、无担保，纯信用贷款的贫困户均是信用户，该项指标按年更新）','内部信用评级等级','贷款合同编码','贷款合同借据编码','贷款合同金额','借据金额：指实际发放贷款金额','借据余额：指实际发放贷款余额','贷款利率','贷款发放日期','贷款到期日期','贷款用途','贷款品种','贷款质量：1正常2关注3次级4可疑5损失（五级分类）','担保方式：1信用2保证3质押4抵押5保证金（人行标准)','贴息贷款标志：1是0否','贴息比例']
        const filterVal = ['years','month','bankCode', 'bankName', 'bankAddress', 'poorCode', 'customerCode','customerName','customerIdCard','creditAccountLogo','creditLevel','contractCode','receiptCode','contractaMount','loanAmount','loanBalance','lendingrate','loanDate','maturityDate','loanPurpose','loanVarietie','loanQuality','guaranteeMethod','discountLoanSign','discountRatio']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        console.log(excel)
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
    }
  },
  filters: {
    numberFormat
  }
};
</script>

<style scoped>
</style>
