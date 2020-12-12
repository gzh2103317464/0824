<template>
  <div class="">
    <el-button type="primary" @click="willAda">添加</el-button>

    <v-add :info='info' ref="one"></v-add>

    <v-list @edit='edit($event)'></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isShow: false,
        title:'轮播图管理',
        isAdd:true
      },
    };
  },
  methods: {
      willAda(){
          this.info.isShow = !this.info.isShow;
          this.info.title='轮播图管理',
          this.info.isAdd = true,
        this.$refs.one.empty()
      },

    //   编辑
    edit(id){
        this.info.isShow = true,
        this.info.title = '轮播图修改',
        this.info.isAdd = false,
        this.$refs.one.look(id)
        
    }
  },
  mounted() {},
  watch: {},
};
</script>
<style>
</style>