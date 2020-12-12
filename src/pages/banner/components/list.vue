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
      <el-table-column prop="id" label="分类编号" sortable width="200">
      </el-table-column>
      <el-table-column prop="title" label="轮播图标题" sortable width="200">
      </el-table-column>
      <el-table-column prop="img" label="图片" sortable width="200">
        <!-- 图片 -->
        <template slot-scope="scope">
         <img :src="$preImg+scope.row.img" alt="">
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
    <!-- <el-pagination
      :page-size="size"
      layout="prev, pager, next"
      :total="total"
      @current-change="changeCurrentPage"
    >
    </el-pagination> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { reqbannerDel } from "../../../uitl/request";
export default {
  computed: {
    ...mapGetters({
      list: "banner/list",
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
      reqbannerDel({ id: id }).then((res) => {
        alert("删除成功");
        this.repuestbannerList();

      });
    },
    ...mapActions({
      repuestbannerList: "banner/repuestbannerList",
     
    }),


  },
  mounted() {
    this.repuestbannerList();

  },

  watch: {},
};
</script>
<style>
img{
  width: 100px;
  height: 100px;
}

</style>