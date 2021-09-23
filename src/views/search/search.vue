<template>
    <div class="search">
        <header class="home-heard">
            <van-nav-bar
                class="my-bar"
                title="搜索"
                style="background: #EC443F;"
                left-arrow
                @click-left="back"
            />
        </header>
        <main >
            <!-- vant搜索 -->
            <van-search @input="showSearch" @search="onSearch" autofocus show-action shape="round" 
                v-model.trim="query" placeholder="请输入搜索关键词">
                <template #action>
                    <van-button @click="onSearch" size="small" type="danger" 
                    style="border-radius: 5px; font-size: 14px;">搜索</van-button>
                </template>
            </van-search>

            <div class="search_con">

            </div>
        </main>

    </div>
</template>

<script>
import Vue from 'vue'
import {Button} from 'vant'

Vue.use(Button)
export default {
    data() {
        return {
            query: '',
            TimeId : -1,
        }
    },

    mounted() {
        
    },
    methods: {
        back(){
            window.history.back()
        },
        showSearch(query){
            this.qsearch(query)
            //this.query = ''
            /*clearTimeout(this.TimeId);
            this.TimeId = setTimeout(()=>{
                
            },1000);*/
            
        },
        onSearch(query){
            //this.query = val
            this.qsearch(query)
        },
        
        async qsearch(query){
            let res = await this.$http.get({
                url: '/goods/qsearch',
                params:{
                    query
                }
            })
        }
    },
}

</script>
<style lang= "stylus" scoped>
    /deep/.van-nav-bar .van-icon
        color #fff
        font-size 20px
    
</style>