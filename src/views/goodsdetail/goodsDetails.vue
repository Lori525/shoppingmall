<template>
    <div class="details">
        <header class="home-heard">
            <van-nav-bar
                class="my-bar"
                title="商品详情"
                style="background: #EC443F;"
                left-arrow
                @click-left="back"
            />
        </header>

        <main>
            <!--轮播图-->
            <div class="swipe">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="black">
                    <van-swipe-item
                        v-for="(item,index) in details.pics"
                        :key="index"
                        >
                        <img :src="item.pics_mid" >
                    </van-swipe-item>
                </van-swipe>

                <div style="padding: 10px 10px">
                    <div class="goods_price">
                        <span>￥</span><span>{{details.goods_price}}</span>
                    </div>
                    <div class="goods_title">
                        <span>{{details.goods_name}}</span>
                    </div>
                </div>
            </div>
            <!--详情-->
            <div class="goods_info">
                <div class="info_title">图文详情</div>
                <div v-html="details.goods_introduce">

                </div>
            </div>
        </main>
        
        <nav>
            
            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" dot />
                <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.state.cartList.length" @click="toCart"/>
                <van-goods-action-icon icon="shop-o" text="店铺"  />
                <van-goods-action-button @click="addCart" type="warning" text="加入购物车" />
                <van-goods-action-button type="danger" text="立即购买" />
            </van-goods-action>
        </nav>
    </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem, GoodsAction, GoodsActionIcon, GoodsActionButton, Toast} from 'vant'

Vue.use(Swipe).use(SwipeItem).use(GoodsAction).use(GoodsActionButton).use(GoodsActionIcon).use(Toast)
export default {
    data() {
        return {
            details:[],
            crats:[]
        }
    },
    created() {
        /*let carts = localStorage.crats
        if(crats){
            this.crats = JSON.parse(crats)
        }*/
    },
    async mounted() {
        await this.getGoodsDetails()
        //console.log(this.crats)
    },
    //id =$route.query.id,
    methods: {
        back(){//返回上一页
            this.$router.go(-1)
        },
        toCart(){//跳转到购物车页面
            this.$router.push({ path: '/home/cart'})
        },

        addCart(){//加入购物车
            Toast.success('加入购物车成功')
            
            //1.获取购物车需要展示的商品信息
            const product = {}
            product.img = this.details.goods_small_logo
            product.title = this.details.goods_name
            product.price = this.details.goods_price
            product.id = this.details.goods_id

            //2.将商品添加到购物车里
            //this.$store.commit('addCart', product)
            this.$store.dispatch('addCart',product)//添加到vuex里

            /*
            let index = this.crats.findIndex(v=>v.data.goods_id == this.details.goods_id)
            
            if(index ===-1){
                this.crats.push({
                    data: this.details,
                    num:1,
                    rel: true
                })
                localStorage.carts = JSON.stringify(this.crats)
            }else{
                
                this.crats[index].num++
                localStorage.carts = JSON.stringify(this.crats)
            }*/
            //console.log(this.crats)
        },
        //获取详情数据
        async getGoodsDetails(){
            let id = this.$route.query.id
            
            let result = await this.$http.get({
                url:'/goods/detail',
                params:{
                    goods_id: id
                }
            })
            
            this.details = result.message
            //console.log(this.details)

        }
    },
}

</script>
<style lang="stylus" scoped>
    /deep/.van-nav-bar .van-icon
            color #fff
            font-size 20px
main
    height calc(100vh - 50px)
    overflow-y scroll
    .swipe
        background-color #fff
        border-radius 0 0 .15rem .15rem
        margin-bottom .15rem
        .my-swipe
            height 68vw
            text-align center
            img 
                width 60%
                margin-top .05rem
        .goods_price
            padding .05rem
            font-size .16rem
            font-weight 600
            color #ff0000
        .goods_title
            font-size .14rem
            border-top 1px solid #dedede
            border-bottom  1px solid #dedede
            padding .05rem
            display -webkit-box
            overflow hidden
            -webkit-box-orient vertical
            -webkit-line-clamp 2 
    .goods_info
        .info_title
            color #ff0000
            font-size .16rem
            font-weight 600
            padding-left .15rem
            padding-bottom .05rem
</style>