<template>
<div class=''>
    <div id="main" style="width:800px ; height:300px ; border:1px dashed #ccc"></div>
    
</div>
</template>

<script>
import echarts from 'echarts'
import {mapActions , mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters({
            list :'cate/list'
        })
},
components: {

},
data() {
return {

};
},
methods: {
    ...mapActions({
        repuestcateList :'cate/repuestcateList'
    })

},
mounted() {
    this.repuestcateList()
     // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '商品销量 '
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: this.list.map(item=>item.catename)
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: this.list.map(item=>item.children?item.children.length:0)
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

},

watch: {},
}
</script>
<style>

</style>