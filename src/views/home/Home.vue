<template>
  <div class="home-warp">

    <router-view></router-view>

    <nav class="tabbar">
      <van-tabbar v-model="active">
        <van-tabbar-item to="/home/homecon">
          <span>首页</span>
          <template #icon="props">
            <img :src="props.active ?  home_icon.active :  home_icon.normal" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item  to="/home/category">
          <span>分类</span>
          <template #icon="props">
            <img :src="props.active ?  category_icon.active :  category_icon.normal" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/home/cart">
          <span>购物车</span>
          <template #icon="props">
            <img :src="props.active ?  cart_icon.active :  cart_icon.normal" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/home/profile">
          <span>我的</span>
          <template #icon="props">
            <img :src="props.active ?  profile_icon.active :  profile_icon.normal" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </nav>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import {Tabbar, TabbarItem} from 'vant'

Vue.use(Tabbar).use(TabbarItem)

export default {
  name: 'Home',
  data() {
    return {
      active: 0,
      home_icon:{
        normal: require('@/assets/icons/home.png'),
        active: require('@/assets/icons/home_clone.png')
      },
      category_icon:{
        normal: require('@/assets/icons/category.png'),
        active: require('@/assets/icons/category_clone.png')
      },
      cart_icon:{
        normal: require('@/assets/icons/cart.png'),
        active: require('@/assets/icons/cart_clone.png')
      },
      profile_icon:{
        normal: require('@/assets/icons/my.png'),
        active: require('@/assets/icons/my_clone.png')
      }
    }
  },
  components: {
    
  }
}
</script>

<style lang="stylus" scoped>
  .home-warp
    display flex
    flex-direction column
    height 100%
  .tabbar
    height 50px
</style>
