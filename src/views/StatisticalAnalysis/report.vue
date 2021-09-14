<template>
  <div class="distance">
    <el-card class="box-card">
      <template slot="header">数据筛选</template>
      <div class="FuzzyQuery">
        <el-form ref="form" :model="report" label-position="top">
          <el-row :gutter="20">
            <el-col :span="9">
              <el-form-item label="户主身份证号码：">
                <el-input v-model="report.IDnumber" size="mini" placeholder="请输入户主身份证号码"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="9">
              <el-form-item label="户主姓名：">
                <el-input v-model="report.name" size="mini" placeholder="请输入户主姓名"></el-input>
              </el-form-item>
            </el-col>-->
            <el-col :span="6">
              <el-form-item label="" style="padding-top:20px">
                <el-button type="primary" @click="onSubmit" size="mini" icon="el-icon-search" :loading="tableLoading">查询</el-button>
                <el-button @click="reset" size="mini" icon="el-icon-refresh">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { selectPoor } from '@/api/StatisticalAnalysis'
import { getToken, getRefreshToken } from '@/utils/auth'
export default {
  data() {
    return {
      report:{},
      tableLoading:false
    };
  },
  created() {},
  methods: {
    onSubmit(){
      if(this.report.IDnumber == '' || this.report.IDnumber == null || this.report.IDnumber == undefined){
        this.$message.error('输入身份证号后查询');
        return
      }/*else if(this.report.name == '' || this.report.name == null || this.report.name == undefined){
        this.$message.error('输入姓名后查询');
        return
      }*/
      this.tableLoading = true
      let data = this.report.IDnumber
      selectPoor(data).then(res => {
        console.log(res.data)
        if(res.data == null){
          this.$message.error('无信用报告信息');
        }else {
          window.open('/api/poorHouseholdsInformation/selectPoorPDF/'+ data + '/'+getToken() + '/信用报告')
        }
        this.tableLoading = false
      }).catch(res => {
        this.tableLoading = false
      })
    },
    reset(){
      this.report = {}
    }
  }
};
</script>

<style scoped>
</style>
