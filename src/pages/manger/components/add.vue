<template>
  <div class="">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="width">
          <el-select
            v-model="form.roleid"
            placeholder="--请选择--"
          >
            <el-option label="请选择" value="0" disabled></el-option>
            <!-- 动态循环添加数据   菜单分类 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
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
import { mapActions, mapGetters } from "vuex";
import { reqUserAdd  ,reqUserListOne ,reqUserEdit} from "../../../uitl/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      roleList: "role/list",

    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      radio: "1",
      value: true,
      form: {
        roleid: "",
        username: "",
        password:"",
        status: 1,
      },
    };
  },
  methods: {
    //   重置
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password:"",
        status: 1,
      };
     
    },
    // 隐藏弹框
    hide(){
        this.info.isShow = false
    },
    // 添加
    add() {
     
      reqUserAdd(this.form).then((res) => {});
      this.empty();
      this.hide();
      this.requestUSerList();
    },
    ...mapActions({ 
      // repuestRoleList: "role/repuestRoleList",
      requestUSerList:'manger/requestUSerList'
    }),
    // 获取一条数据
    look(id) {
      reqUserListOne({ uid : id }).then((res) => {
        this.form = res.data.list;
        this.form.password = '',
        this.form.uid = id;
      });
    },
    // 修改
    update(id) {
      reqUserEdit(this.form).then(res=>{
        this.requestUSerList(),
          this.hide();
      })

   
    
    },
  },
  mounted() {
    // this.requestUSerList()
    if(this.roleList.length == 0){
      this.requestUSerList()
    }
  
  },
  watch: {},
};
</script>
<style>
</style>