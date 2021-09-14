<template>
  <div class="distance">
    <el-card class="box-card">
      <el-table :data="orgList" border size="mini" style="width: 100%" v-loading="tableLoading" empty-text="暂无数据">
          <el-table-column label="机构名称" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.orgName || "无" }}</template>
          </el-table-column>
          <el-table-column label="状态" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.orgStatus || "无" }}</template>
          </el-table-column>
          <el-table-column label="机构类型" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.orgType=='01'?'人行机构':'金融机构' }}</template>
          </el-table-column>
          <el-table-column label="是否是法人" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.isLegal || "无"}}</template>
          </el-table-column>
          <el-table-column label="创建时间" min-width="200" :show-overflow-tooltip="true">
              <template slot-scope="scope"> {{ scope.row.createDate || "无" }}</template>
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
    </el-card>
  </div>
</template>

<script>
import {orgManagerInterface} from '@/api/StatisticalAnalysis'
export default {
  data() {
    return {
      orgList:[],
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
        orgType:JSON.parse(localStorage.getItem('data')).userType
      }
      orgManagerInterface(data).then(res => {
        if(res.code == '00000'){
          this.orgList = res.data.records
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
