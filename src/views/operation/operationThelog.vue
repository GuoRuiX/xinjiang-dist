<template>
  <div class="distance">
    <el-card class="box-card">
      <template slot="header">数据筛选</template>
      <div class="FuzzyQuery">
        <el-form ref="form" :model="operation" label-position="top">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="用户名称：">
                <el-input v-model="operation.userName" placeholder="请输入用户名称" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="模块名称：">
                <el-input v-model="operation.modelName" placeholder="请输入模块名称" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="操作名称：">
                <el-input v-model="operation.operationName" placeholder="请输入操作名称" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="操作时间：">
                <el-date-picker
                  class="widthAuto"
                  v-model="operation.operationDate"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label="" style="padding-top:20px">
                <el-button type="primary" @click="onSubmit" size="mini" icon="el-icon-search">查询</el-button>
                <el-button @click="reset" size="mini" icon="el-icon-refresh">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div>
          <div class="el-table-button">
            <el-button type="primary" size="mini" @click="exportExcel" :loading="downloadLoading" icon="el-icon-bottom">导出</el-button>
          </div>
          <el-table :data="operationList" border size="mini" style="width: 100%" v-loading="tableLoading" empty-text="暂无数据">
          <el-table-column label="用户名称" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.userName || "无" }}</template>
          </el-table-column>
          <el-table-column label="模块名称" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.modelName || "无" }}</template>
          </el-table-column>
          <el-table-column label="操作名称" width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.operationName || "无" }}</template>
          </el-table-column>
          <el-table-column label="操作时间" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.operationDate || "无" }}</template>
          </el-table-column>
          <!-- <el-table-column label="源码" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.maturityDate || "无" }}</template>
          </el-table-column> -->
          <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                  <el-button type="text" size="mini" icon="el-icon-view" @click="Toview(scope.row)">查看源码</el-button>
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
      </div>
    </el-card>

    <el-drawer
      title="查看源码"
      size="50%"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :close-on-press-escape="false"
      :wrapperClosable="false"
      custom-class="el-drawer__modal">
      <div class="el-drawer__content wrap">
        {{info}}
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
import {logs} from '@/api/StatisticalAnalysis'
export default {
  data() {
    return {
      pageSize:10,
      operation:{
        pageSize:10,
        currentPageNum:1
      },
      operationList:[],
      currentPage:1,

      total:0,
      tableLoading:false,
      downloadLoading:false,
      drawer:false,
      direction:'rtl',
      info:''
    };
  },
  created() {
    this.onSubmit()
  },
  methods: {
    onSubmit(){
      this.tableLoading = true
      logs(this.operation).then(res => {
        if(res.code == '00000'){
          this.operationList = res.data.records
          this.total = res.data.total
        }
        this.tableLoading = false
      }).catch(res =>{
        this.tableLoading = false
      }
      )
    },
    reset(){
      this.operation = {
        pageSize:this.pageSize,
        currentPageNum:1
      }
      this.onSubmit()
    },
    exportExcel(){
      window.open('/api/logs/exporExcel/'+(this.operation.userName == undefined?'-':this.operation.userName) +'/'+(this.operation.modelName == undefined?'-':this.operation.modelName) +'/'+(this.operation.operationName == undefined?'-':this.operation.operationName) +'/'+(this.operation.operationDate == undefined?'-':this.operation.operationDate))
    },
    Toview(val){
      this.info = val
      this.drawer = true
    },
    handleClose(){
      this.drawer = false
    },
    handleCurrentChange(val){
      this.operation.currentPageNum = val
      this.onSubmit()
    }
  }
};
</script>

<style scoped>
.wrap{
  word-wrap: break-word;
  word-break: normal;
  word-break:break-all;
  overflow: hidden;
}
</style>
