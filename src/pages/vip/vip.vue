<template>
  <div class="">
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-add :info="info" ref="one"></v-add>

    <v-list @edit="edit($event)"></v-list>
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
        isAdd :true,
        title:''
      },
    };
  },
  methods: {
    // 添加
    willAdd() {
      this.info.isShow = !this.info.isShow;
       this.info.isAdd = true;
        this.info.title = '菜单添加';
        this.$refs.one.Reset()
    },
    // 编辑
    edit(e) {
      console.log(e);
      this.info.isShow = true;
      console.log(this.$refs.one);
      this.$refs.one.look(e);
      this.info.isAdd = false;
      this.info.title = '会员编辑';
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>
<style>
</style>