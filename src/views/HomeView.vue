<template>
  <div class="home">
    <div class="content">
      <!-- .box$*8{第$个} -->
      <div class="box1">
        <h2>大数据前端可视化</h2>
      </div>
      <div class="box2">
        <dv-border-box-8>
          <h3>动态图</h3>
          <dv-active-ring-chart :config="config" style="width:100%;height:100%" />
        </dv-border-box-8>
      </div>
      <div class="box3" style="background-color: rgb(109, 5, 255);"></div>
      <div class="box4" style="background-color: rgb(35, 18, 145);"></div>
      <div class="box5" style="background-color: rgb(233, 3, 34);"></div>
      <div class="box6" style="background-color: rgb(233, 156, 3);"></div>
      <div class="box7" style="background-color: rgb(3, 179, 233);"></div>
      <div class="box8">
        <dv-border-box-11 title="表格"></dv-border-box-11>
      </div>
      <div class="box9" style="background-color: rgb(245, 23, 156);"></div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data(){
    return{
      config:{

        data: [
          {
            name: '周口',
            value: 55
          },
          {
            name: '南阳',
            value: 120
          },
          {
            name: '西峡',
            value: 78
          },
          {
            name: '驻马店',
            value: 66
          },
          {
            name: '新乡',
            value: 80
          }
        ],
        lineWidth: 10,
        digitalFlopStyle: {
          fontSize: 18,
          fill: '#fff'
        }
      }
    }
  },
  components: {
    
  }
  
}
</script>

<style scoped>
  .home{
    height: 100%;
  }
  .content{
    width: 100%;
    height: 100%;
    /* background-color: #fff; */
    /* 设置网格布局 */
    display: grid;
    
    /* 设置列数，每一个列所占份数 */
    grid-template-columns: repeat(3,1fr);
    /* grid-template-rows: repeat(3, 1fr); */
    grid-template-rows: 50px 1fr 1fr 1fr;
    /* 网格间距 */
    gap: 10px;  
  }
h3{

  color: #fff;
  font-size: 20px;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
h2{

  margin: 0;
  line-height: 50px;
  color: #fff;
  font-size: 22px;
  font-weight: bold;
}

.box8{
  /* 跨列 */
  grid-column: span 2; 
}
.box1{
  grid-column: span 3;
}
</style>

