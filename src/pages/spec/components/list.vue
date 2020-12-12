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
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="分类名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="img" label="规格属性" sortable width="580">
       <!-- 状态 -->
       <template slot-scope="scope">
         <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
       
       </template>
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
          <el-button type="primary" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="Delete(scope.row.id)"
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
import { reqspecsDel } from "../../../uitl/request";
export default {
  computed: {
    ...mapGetters({
      list: "spec/list",
      total: "spec/total",
      page: "spec/page",
      size: "spec/size",
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
      reqspecsDel({ id: id }).then((res) => {
        alert("删除成功");
        this.repuestspecsList();
          // 重新获取总数
        this.requestspecsCount()
        // 强制让页码数回到第几页
         this.changeCurrentPages(1);

      });
    },
    ...mapActions({
      repuestspecsList: "spec/repuestspecsList",
       requestspecsCount: "spec/requestspecsCount",
      changeCurrentPages: "spec/changeCurrentPages",
     
    }),
    // 修改当前页码数
    changeCurrentPage(p) {
      console.log(p);
      this.changeCurrentPages(p);
    },
  },
  mounted() {
    this.repuestspecsList();
    this.requestspecsCount();

  },

  watch: {},
};
</script>
<style>
img{
  width: 100px;
  height: 100px;
}
.el-pagination {
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: 1000;
    text-align: center;

}
</style>