<template>
    <div class="list">
        <header class="home-heard">
            <van-nav-bar
                class="my-bar"
                title="商品列表"
                style="background: #EC443F;"
                left-arrow
                @click-left="back"
            />
            <van-search
                v-model="value"
                shape="round"
                background=" #eb4450"
                placeholder="请输入搜索关键词"
                @click='toSearch'
            />
        </header>
        <main class="goods-list">
            <van-tabs v-model="isActive"  class="my-tabs">
                <van-tab title="综合">
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                        >
                        <van-card class="my-card"
                            v-for="(item, index) in goodsList"
                            :key="index"
                            :price="item.goods_price"
                            :title="item.goods_name"
                            :thumb="item.goods_small_logo!==''?item.goods_small_logo:'http://placehold.it/64x90'"
                            @click="toDetails(item.goods_id)"
                        />
                    </van-list>
                </van-tab>
                <van-tab title="销量">内容 2</van-tab>
                <van-tab title="价格">内容 3</van-tab>
            </van-tabs>
        </main>

    </div>
</template>

<script>
import Vue from 'vue'
import {Tab, Tabs,Card,List} from 'vant'
//import axios from 'axios'

Vue.use(Tab).use(Tabs).use(List).use(Card)

export default {
    data() {
        return {
            value: '',
            isActive: 0,
            loading: false,
            finished: false,
            goodsList:[],
        }
    },
    
    created() {
        //总页数
        this.totalPages = 1
        this.pagenum = 1
        this.pagesize = 10
        this.offset = 0
    },
    async mounted() {
        await this.getGoodsList()
        this.offset = 0

        /* let result = await axios.get('/goods/search',{
            params:{
                cid:this.$route.query.id
            }
        })
            console.log(result)*/
    },
    methods: {
        back(){//返回
            this.$router.go(-1)
            //this.$router.push({ path: '/home/category'})
        },
        toSearch(){
            this.$router.push({
                path: '/search'
            })
        },
        toDetails(id){//跳转详情页面
            this.$router.push({
                path: '/detail',
                query:{
                    id
                }
            })
        },

        async onLoad(){
            if (this.refreshing) {
                this.goodsList = [];
                this.refreshing = false;
            }
                await this.getGoodsList()
                this.loading = false;
                //console.log(this.pagenum)

            if (this.pagenum >= this.totalPages) {

                    this.finished = true;
                }
                
                this.pagenum++
        },
         
        async getGoodsList(){
            let cid = this.$route.query.id
            let result = await this.$http.get({
                url: '/goods/search',
                params:{
                    cid: cid,
                    pagenum:this.pagenum,
                    pagesize:this.pagesize,
                    offset: this.offset
                }
            })
            console.log(result)
            //获取总条数
            const total=result.message.total;
            this.totalPages = Math.ceil(total/this.pagesize);

            this.goodsList =[...this.goodsList, ...result.message.goods]

            
        }
    }
}

</script>
<style lang="stylus" scoped>
    /deep/.van-nav-bar .van-icon
        color #fff
        font-size 20px
    /deep/.van-tab--active 
        color #eb4450
    .goods-list
        height calc(100vh - 150px)
        overflow-y scroll
        .my-card
            span
                color red
</style>