<template>
  <div class="">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="width">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="width">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
import { reqmemberListOne , reqmemberEdit } from "../../../uitl/request";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      vipList: "vip/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      radio: "1",
      value: true,
      form: {
        pid: "",
        nickname:'',
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestmemberList: "vip/requestmemberList",
    }),
    //   取消弹窗
    hide() {
      this.info.isShow = false;
    },

    // 重置
    Reset() {
      this.form = {
       pid: "",
        nickname:'',
        phone: "",
        password: "",
        status: 1,
      };
    },

    //   添加操作
    add() {
      // reqmenuAdd(this.form).then((res) => {
      //   // console.log(res);
      //   this.hide();
      //   this.requestMenuList();
      // });
    },
    // 修改type的状态
    changePid() {
      // this.form.type = this.form.pid == 0 ? 1 : 2;
    },

    // 查看一条数据
    look(id) {
      reqmemberListOne({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.uid = id;
      });
    },
    // 修改
    update() {
      reqmemberEdit(this.form).then((res) => {
        // this.requestMenuList() 有点毛病
        this.hide();
        this.requestmemberList();
        this.Reset();
      });
    },
  },
  mounted() {
    this.requestmemberList()
  },
  watch: {},
};
</script>
<style>
</style>