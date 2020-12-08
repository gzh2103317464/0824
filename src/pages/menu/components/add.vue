<template>
  <div class="">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="width">
          <el-select
            v-model="form.pid"
            placeholder="--请选择--"
            @change="changePid"
          >
            <el-option label="顶级菜单" value="0"></el-option>
            <!-- 动态循环添加数据   菜单分类 -->
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="width">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          :label-width="width"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="--请选择--">
            <el-option label="星星" value="el-icon-star-on">
              <i class="el-icon-star-on"></i>
            </el-option>
            <el-option label="照相机" value="el-icon-camera">
              <i class="el-icon-camera"></i>
            </el-option>
            <el-option label="小飞机" value="el-icon-s-promotion">
              <i class="el-icon-s-promotion"></i>
            </el-option>
            <el-option label="小气球" value="el-icon-s-opportunity">
              <i class="el-icon-s-opportunity"></i>
            </el-option>
            <el-option label="大房子" value="el-icon-office-building">
              <i class="el-icon-office-building"></i>
            </el-option>
            <el-option label="小刷子" value="el-icon-s-open">
              <i class="el-icon-s-open"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url" placeholder="--请选择--">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="'/' + item.path"
              :value="item.name"
            ></el-option>
          </el-select>
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
import { indexRouters } from "../../../router/index";
import { reqmenuAdd, reqmenuListOne, reqMenuEdit  } from "../../../uitl/request";
import { mapActions , mapGetters } from "vuex";
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
        pid: "",
        title: "",
        type: 0,
        icon: "",
        url: "",
        status: 1,
      },
      indexRouters,
    };
  },
  methods: {
     ...mapActions({
       requestMenuList:'menu/requestMenuList'
     }),
    //   取消弹窗
    hide() {
      this.info.isShow = false;
    },

    // 重置
    Reset(){
       this.form={
        pid: "",
        title: "",
        type: 0,
        icon: "",
        url: "",
        status: 1,
      }
    },

    //   添加操作
    add() {
      reqmenuAdd(this.form).then((res) => {
        // console.log(res);
        this.hide();
        this.requestMenuList();
      });
    },
    // 修改type的状态
    changePid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },

    // 查看一条数据
    look(id) {
      reqmenuListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    // 修改
    update(){
      reqMenuEdit(this.form).then(res=>{
        // this.requestMenuList() 有点毛病
        this.hide();
        this.requestMenuList();
        this.Reset()
      });
    },

    

  },
  mounted() {
  },
  watch: {},
};
</script>
<style>
</style>