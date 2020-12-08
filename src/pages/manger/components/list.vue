<template>
  <div class="">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <!-- 删除 -->

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="Delete(scope.row.uid)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-size="size"
      layout="prev, pager, next"
      :total="total"
      @current-change="changeCurrentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { reqUserDel } from "../../../uitl/request";
export default {
  computed: {
    ...mapGetters({
      list: "manger/list",
      total: "manger/total",
      page: "manger/page",
      size: "manger/size",
     
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    Delete(id) {
      reqUserDel({ uid: id }).then((res) => {
        alert("删除成功");
        this.requestUSerList();
        // 重新获取总数
        this.requestUSerCount()
        // 强制让页码数回到第几页
         this.changeCurrentPages(1);
      });
    },
    ...mapActions({
      requestUSerList: "manger/requestUSerList",
      requestUSerCount: "manger/requestUSerCount",
      changeCurrentPages: "manger/changeCurrentPages",
    }),

    // 修改当前页码数
    changeCurrentPage(p) {
      console.log(p);
      this.changeCurrentPages(p);
    },
  },
  mounted() {
    this.requestUSerList();
    this.requestUSerCount();
    //  this.changeCurrentPages();
  },

  watch: {},
};
</script>
<style>
.el-pagination {
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: 1000;
    text-align: center;

}

</style>