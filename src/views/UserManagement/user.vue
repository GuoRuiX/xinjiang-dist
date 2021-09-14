<template>
  <div class="distance">
    <el-card class="box-card">
      <el-table :data="userList" border size="mini" style="width: 100%" v-loading="tableLoading" empty-text="暂无数据">
          <el-table-column label="登录名" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.loginName || "无" }}</template>
          </el-table-column>
          <el-table-column label="所属机构" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.pbcName || "无" }}</template>
          </el-table-column>
          <el-table-column label="用户类型" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.userType==1?'人行机构':'金融机构' }}</template>
          </el-table-column>
          <el-table-column label="创建时间" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.createDate || "无" }}</template>
          </el-table-column>
          <!-- <el-table-column label="还款日期" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.maturityDate || "无" }}</template>
          </el-table-column>
          <el-table-column label="信用等级" min-width="100" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">{{ scope.row.creditLevel }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="80">
              <template slot-scope="scope">
                  <el-button type="text" size="mini" icon="el-icon-view" @click="Toview(scope.row)">查看</el-button>
              </template>
          </el-table-column> -->
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
    </el-card>
  </div>
</template>

<script>
import {userMana} from '@/api/StatisticalAnalysis'
export default {
  data() {
    return {
      userList:[],
      tableLoading:false,
      currentPage:1,
      pageIndex:1,
      pageSize:10,
      total:1
    };
  },
  created() {
    this.onSubmit()
  },
  methods: {
    onSubmit(){
      this.tableLoading = true
      let data = {
        pageSize:this.pageSize,
        currentPageNum:this.pageIndex,
        userType:JSON.parse(localStorage.getItem('data')).userType
      }
      userMana(data).then(res => {
        if(res.code == '00000'){
          this.userList = res.data.records
          this.total = res.data.total
        }
        this.tableLoading = false
      }).catch(res => {
        this.tableLoading = false
      })
    },
    handleCurrentChange(val){
      this.pageIndex = val
      this.onSubmit()
    }
  }
};
</script>

<style scoped>
</style>
