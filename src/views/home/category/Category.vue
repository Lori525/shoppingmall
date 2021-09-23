<template>
    <div class="cates">
        <header class="home-heard">
            <van-nav-bar
                title="商品分类"
                style="background: #EC443F;"
            />
            <van-search
                v-model="value"
                shape="round"
                background=" #eb4450"
                placeholder="请输入搜索关键词"
            />
        </header>
        
        <div class="cates_cont" style="display: flex">
            <!--左侧栏-->
            <div class="left_nav">
                <van-sidebar class="my-sidebar"  v-model="currentIndex" @change="onChange(currentIndex)">
                    <van-sidebar-item 
                    v-for="(item, index) in leftMenuList"
                    :key="item.index"
                    :title="item" 
                    :class=" index===currentIndex?'active':''"/>
                </van-sidebar>
            </div>

            <div class="right_con" ref="wrapper" >
                <div  class="goods_list"
                    v-for="item1 in rightContent"
                    :key="item1.index"
                    >
                    <p>{{item1.cat_name}}</p>
                    <van-grid class="my-grid " :gutter="1" column-num='3' :border="false" icon-size=".45rem" >
                        <van-grid-item 
                            v-for="itme2 in item1.children" 
                            :key="itme2.cat_id" 
                            :icon="itme2.cat_icon" 
                            :text="itme2.cat_name" 
                            @click="onList(itme2.cat_id)"/>
                    </van-grid>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Vue from 'vue'
import {Sidebar, SidebarItem} from 'vant'

import BScroll from 'better-scroll'

Vue.use(Sidebar).use(SidebarItem)

const options = {
    scrollY: true
}

export default {
    name:'category',
    data() {
        return {
            value:'',
            active: '',
            currentIndex: 0,
            //左侧的菜单数据
            leftMenuList:[],
            //右侧的商品数据
            rightContent:[],
            
        }
    },
    //接口返回的数据
    Cates:[],

    async mounted() {
        await this.getCates()
        setTimeout(() =>{
            //this.scroll = new BScroll(this.$refs.wrapper,options)
        },20)
    },
    methods: {
        onChange(index){
            this.rightContent = this.Cates[index].children
            this.$refs.wrapper.scrollTop = 0
        },
        onList(id){
            this.$router.push({
                path: '/list',
                query:{
                    id
                }
            })
        },
        async getCates(){
            let result = await this.$http.get({
                url: '/categories'
            })
            this.Cates = result.message
            //把接口的数据存入本地存储中
            //localStorage.setItem('cates', this.Cates)
            
            this.leftMenuList = this.Cates.map(v => v.cat_name)
            //console.log(this.leftMenuList)
            this.rightContent = this.Cates[0].children
            //console.log(this.rightContent)
        }


    },
}

</script>
<style lang='stylus' scoped>
    .van-sidebar::-webkit-scrollbar
        display none
    .active
        color #eb4450
    .left_nav
        text-align center
        .my-sidebar
            height calc(100vh - 150px)
            white-space nowrap
            overflow-y scroll
    .right_con
        font-size .14rem
        height calc(100vh - 150px)
        overflow-y scroll
        .goods_list
            p
                //font-size .14rem
                height .18rem
                text-align center
                margin-top .1rem
            
</style>