<template>
  <div class="">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            ref="tree"
            :props="{
              children: 'children',
              label: 'title',
            }"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
            >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { reqRoleAdd, reqRoleListOne, reqRoleEdit } from "../../../uitl/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      radio: "1",
      value: true,
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },

      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    //   重置
    empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
      this.form.menus =  this.$refs.tree.setCheckedKeys([]);
    },



    // 隐藏弹框
    hide(){
        this.info.isShow = false
    },

    // 添加
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {});
      this.empty();
      this.hide();
       this.repuestRoleList();
    },

    ...mapActions({
      requestMenuList: "menu/requestMenuList",
      repuestRoleList: "role/repuestRoleList",
    }),

    // 获取一条数据
    look(id) {
      reqRoleListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.menus = this.$refs.tree.setCheckedKeys(
          JSON.parse(res.data.list.menus));
        this.form.id = id;
      });
    },

    // 修改
    update(id) {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleEdit(this.form).then((res) => {
        this.repuestRoleList();
        this.hide()
      });
    },
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.requestMenuList();
    }
    console.log(this.menuList);
  },
  watch: {},
};
</script>
<style>
</style>