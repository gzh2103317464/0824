<template>
  <div class="">
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
    >
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>



        <el-form-item label="活动期限" :label-width="width">
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" :label-width="width">
          <el-select
            v-model="form.first_cateid"
            placeholder="--请选择--"
            @change="changeCate"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据   菜单分类 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="--请选择--" @change="changeRe">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据   菜单分类 -->
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>






        <el-form-item label="商品" :label-width="width">
          <el-select v-model="form.goodsid" placeholder="--请选择--">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态循环添加数据   菜单分类 -->
            <el-option
              v-for="item in secondPin"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
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
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import {
  reqseckAdd,
  reqseckListOne,
  reqseckEdit,
} from "../../../uitl/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      goodsList : "goods/list"
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",

      secondCate: [], // 二级分类
      secondPin: [], // 二级分类


      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value2: "",

      form: {
       title: "",
          begintime: 0,
          endtime: 0,
          first_cateid: 0,
          second_cateid: 0,
          goodsid:0,
          status: 1,
      },

      dafaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    //   重置
    empty() {
      (this.imageUrl = ""),
      this.value2 = "",
        (this.form = {
          title: "",
          begintime: "",
          endtime: "",
          first_cateid: "",
          second_cateid: "",
          goodsid:0,
          status: 1,
        });
    },
    // 隐藏弹框
    hide() {
      this.info.isShow = false;
       console.log(this.value2)
    },

    changeCate() {
      // console.log(this.cateList.find((item)=>{return item.id == this.first_cateid}).children)
      this.secondCate = this.cateList.find((item) => {
        return item.id == this.form.first_cateid;
      }).children;
    },

    // 二级
    changeRe(){

         this.goodsList.forEach((item) => {
             if(item.second_cateid == this.form.second_cateid){
                 this.secondPin.push(item) 
                 console.log(item.second_cateid)
             }
            //  console.log(this.secondPin)
      });
      
    },


    // 添加
    add() {
      console.log(111);
      reqseckAdd(this.form).then((res) => {});
      this.empty();
      this.hide();
      this.repuestseckList();
    },

    ...mapActions({
      repuestseckList: "seck/repuestseckList",
      repuestcateList: "cate/repuestcateList",
      repuestgoodsList: "goods/repuestgoodsList",
    }),
    // 获取一条数据
    look(id) {
        reqseckListOne({ id: id }).then((res) => {
          this.form = res.data.list;
          this.form.goodsid = id;
        });
    },
    // 修改
    update(id) {
        reqgoodsEdit(this.form).then((res) => {
          this.repuestgoodsList();
          this.hide();
        });
    },
  },
  mounted() {
    this.repuestseckList();
    this.repuestcateList();
    this.repuestgoodsList();
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

textarea {
  border: 1px solid #ccc;
}
</style>