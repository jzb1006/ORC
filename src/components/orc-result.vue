<template>
<div id="cardBox">
  <button @click="isShow" class="show">{{top}}</button>
  
  <div id="card" v-bind:style="{bottom:bottom+'px'}">
    
    <p class="card">
      {{result}}
    </p>
    <div class="copy">
      <button @click="copy">复制</button>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  data() {
    return {
      bottom:-500,
      // style: { "bottom": "-469px", "font-size": "100px" }
      top:'⇡',
      copyDate:''
    };
  },
  props: ["result"],
  methods: {
    isShow() {
      console.log(this.bottom)
        this.top = this.top=='⇡'?'⇣':'⇡';
        this.bottom = this.bottom==-500?-31:-500
    },

    copy(){
      var _this = this;
      mpvue.setClipboardData({
      data: _this.result,
      success: function (res) {
        console.log(res);
      }
    })
    }
  }
};
</script>

<style>
#cardBox{
  overflow: hidden;
}
#card {
  background:rgba(160, 241, 237, 1);
  border-radius: 20px 20px 0px 0px;
  height: 500px;
  position: relative;
  word-wrap:break-word;
  width: 90%;
  margin: 0px auto;
  transition: 1s;
  z-index: 999999;
  padding: 10px;
  overflow-x: inherit;
}
.card{
  height: 500px;
  overflow: scroll;
}
.show{
  position: fixed;
  bottom:100px;
  z-index: 99999999;
  font-size: 18px;
}
.copy{
  position: absolute;
  bottom: 50px;
  left: 40%;
  font-size: 18px;
}
</style>
