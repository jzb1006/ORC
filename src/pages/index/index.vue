<template>
  <div>
    <div class="top">图片文字转换</div>
    <div class="images">
      <block v-for="(item,index) in images" :key="index">
        <p>{{item}}</p>
        <image class="q-image" :src="item"  ></image>
      </block>
    </div>
    <div class="bottom">
      <button class="photo" @getuserinfo="getUserInfo" open-type="getUserInfo">拍照</button>
    </div>
  </div>
</template>

<script>
  import card from '@/components/card'
  import wx from "@/config/wx"
  export default {
    data() {
      return {
        motto: 'Hello miniprograme',
        userInfo: {},
        images:[],
      }
    },
    components: {
      card
    },
    methods: {
      getSetting() {
        var self = this;
        mpvue.getSetting({
          success: function(res) {
            if (res.authSetting['scope.userInfo']) {
              mpvue.getUserInfo({
                success: function(res) {
                  self.userInfo = res.userInfo
                  console.log(res.userInfo)
                  //用户已经授权过
                  console.log('用户已经授权过')
                }
              })
            } else {
              console.log('用户还未授权过')
            }
          }
        })
      },
      getUserInfo(e) {
        if (!this.userInfo) {
          var self = this;
          console.log("拍照", e.mp.detail)
          mpvue.login({
            success(res) {
              if (res.code) {
                // 这里可以把code传给后台，后台用此获取openid及session_key
                // console.log(res);
                self.$ajax.get('https://api.weixin.qq.com/sns/jscode2session', {
                  appid: wx.AppID,
                  secret: wx.AppSecret,
                  code: res.code,
                  grant_type: 'authorization_code',
                }).then((res) => {
                  console.log(res);
                }).catch((err) => {
                  console.log(err);
                })
              }
            },
          })
        } else {
          console.log("sdfds");
          this.photo();
        }
      },
      photo() {
        var self = this;
        mpvue.chooseImage({
          success: function(res) {
            console.log(res);
           self.images = res.tempFilePaths
            // mpvue.uploadFile({
            //   url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
            //   filePath: tempFilePaths[0],
            //   name: 'file',
            //   formData: {
            //     'user': 'test'
            //   },
            //   success: function(res) {
            //     var data = res.data
            //     //do something
            //   }
            // })
          }
        })
      }
    },
    created() {
      // let app = getApp()
      this.getSetting();
    }
  }
</script>

<style scoped>
  .bottom {
    position: absolute;
    bottom: 10%;
    width: 100%;
  }
  .photo {
    font-size: 18px;
    width: 80%;
    border-radius: 30px;
    border-color: aquamarine;
    background: aquamarine;
    color: #fff;
    box-shadow: -1px 2px 12px #333;
  }
  /* .q-image{
    width:100%;
    height:100%;
  } */
</style>
