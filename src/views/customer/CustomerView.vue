<template>
  <div>
    <el-button @click="exportExl">导出</el-button>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="客户姓名"
        align="center">
        <template slot-scope="{row}">{{ row.name }}</template>
      </el-table-column>
      <el-table-column
        label="电话"
        align="center">
        <!-- scope.row row是scope的属性  {row} = scope 解构赋值 -->
        <template slot-scope="{ row }">{{ row.phone }}</template>
      </el-table-column>
      <el-table-column
        label="性别"
        align="center">
        <template slot-scope="{row}">{{ row.sex === "0"? "男":(row.sex === "1"?"女":"保密") }}</template>
      </el-table-column>
      <el-table-column
        prop="inputUserName"
        label="录入人"
        align="center">
      </el-table-column>
      <el-table-column
        label="录入时间"
        align="center">
        <template slot-scope="{row}">{{ row.entryTime }}</template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
        <template>
          <i class="el-icon-edit"></i>修改
        </template>
      </el-table-column>
    </el-table>

    <div style="display:flex;justify-content: flex-end;padding: 20px 20px 0 0;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      
    </div>

  </div>


</template>

<script>
import {GetCustomerListApi, CustomerExportApi} from '@/request/api'
export default {
  data() {
    return {
      tableData: [],
        multipleSelection: [],
        pageNum:1,  // 当前页数
        pageSize:10,  // 每页条数
        total:null
    }
  },
  methods: {
    async exportExl(){
      const res = await CustomerExportApi({
        pageNum:1,
        pageSize:10
      });
      if(!res) return;
      
    },
    handleSelectionChange(){
      console.log("---");
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      // 当前页数改变时
      // console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getTableData();

    },
    async getTableData(){
      let GetCustomerListApiRes = await GetCustomerListApi({
        pageNum:this.pageNum,
        pageSize:this.pageSize
      });
      if(!GetCustomerListApiRes) return;
      // console.log(GetCustomerListApiRes);
      this.tableData = GetCustomerListApiRes.rows
      this.total = GetCustomerListApiRes.total
    }
      
  },
  created(){
    this.getTableData();
  }
}
</script>

<style>

</style>