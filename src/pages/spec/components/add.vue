<template>
  <div class="">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
       
        <el-form-item label="规格名称" :label-width="width">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        
        <el-form-item label="规格属性" :label-width="width" v-for="(item , index) in arrAttr" :key="item.index">
          <el-row>
            <el-col :span="18">
                <el-input v-model="form.catename" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="6">
               <el-button type="primary" v-if="index == 0" @click="addBtn">新增规格属性</el-button>
                <el-button type="danger" v-else @click="delBtn">删除</el-button>
            </el-col>
          </el-row>
        </el-form-item>


        
        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
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
import { reqcateAdd, reqcateListOne, reqcateEdit } from "../../../uitl/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      imageUrl: "",
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },

      arrAttr:[{
        value:''
      }]
    };
  },
  methods: {
    // 新增属性
   addBtn(){
     this.arrAttr.push({
       value:''
     })
   },


  // 
  delBtn(index){
    this.arrAttr.splice(index , 1)

  } ,
    //   重置
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
    },
    // 隐藏弹框
    hide() {
      this.info.isShow = false;
    },
    // 添加
    add() {
      console.log(111);
      reqcateAdd(this.form).then((res) => {});
      this.empty();
      this.hide();
      this.repuestcateList();
    },
    ...mapActions({
      repuestcateList: "cate/repuestcateList",
    }),
    // 获取一条数据
    look(id) {
      reqcateListOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imageUrl = this.$preImg + res.data.list.img;
      });
    },
    // 修改
    update(id) {
      reqcateEdit(this.form).then((res) => {
        this.repuestcateList(), this.hide();
      });
    },
  },
  mounted() {
    this.repuestcateList();

  },
  watch: {},
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #ccc;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>