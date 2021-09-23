<template>
    <div class="main">
        <header class="home-heard">
            <van-nav-bar
                    title="首页"
                    style="background: #EC443F;"
            />
            <van-search
                v-model="value"
                shape="round"
                background=" #eb4450"
                placeholder="请输入搜索关键词"
            />
        </header>

        <main class="home-main">
            <!--轮播图-->
            <van-swipe class="my-swipe" :autoplay="5000">
                <van-swipe-item v-for="item in swiperList" :key="item.index">
                    <img :src="item.image_src" />
                </van-swipe-item>
            </van-swipe>
            
            <!--导航分类-->
            <van-grid :border='false' class="my-grid">
                <van-grid-item v-for="item in catesList" :key="item.index">
                    <img :src="item.image_src" alt="">
                </van-grid-item>
            </van-grid>

            <FloorList :floor-list= floorList></FloorList>
            
        </main>
    </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Search, Swipe, SwipeItem, Grid, GridItem} from 'vant'

import FloorList from './floorlist/FloorList'

Vue.use(NavBar).use(Search).use(Swipe).use(SwipeItem).use(Grid).use(GridItem)
export default {
    name: 'homecon',
    data() {
        return {
            value: '',
            //轮播图
            swiperList:[],
            //导航分类
            catesList: [],
            //楼层数据
            floorList:[]
        }
    },

    async mounted() {
        await this.getSwiperList()
        await this.getCatesList()
        await this.getFloorList()
    },

    methods: {
        async getSwiperList(){
            let result = await this.$http.get({
                url: '/home/swiperdata'
            })
            //console.log(result.message)
            this.swiperList = result.message
        },

        async getCatesList(){
            let result = await this.$http.get({
                url: '/home/catitems'
            })
            
            this.catesList = result.message
        },

        async getFloorList(){
            let result = await this.$http.get({
                url:'/home/floordata'
            })
            //console.log(result.message)
            this.floorList = result.message
        }
    },
    components:{
        FloorList
    }
}
</script>

<style lang="stylus" scope>
    .van-nav-bar__title 
        color  #fff
.main
    flex 1
    overflow hidden
    display flex
    flex-direction column
    .home-main
        flex 1
        overflow-y scroll
        .my-swipe
            img 
                width 100%
        .my-grid
            img 
                width 100%
</style>