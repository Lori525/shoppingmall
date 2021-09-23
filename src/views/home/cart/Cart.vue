<template>
    <div class="cart-list">
        <header class="home-heard">
            <van-nav-bar
                class="my-bar"
                title="购物车"
                style="background: #EC443F;"
                left-arrow
                @click-left="back"
            />
        </header>

        <!-- vant空状态 -->
		<van-empty v-show="isShow" description="购物车目前还没有商品" image="https://img.yzcdn.cn/vant/custom-empty-image.png">
            <van-button round type="danger" class="bottom-button" @click="gotoClassify">
                去购物
            </van-button>
		</van-empty>
        
        <div class="cartlist"
            v-for="(item,index) in cart"
            :key="index"
            >
            <!-- vant复选框组 --> <!-- vant布局 --> <!-- vant滑动单元格 --> 
			<!-- vant商品卡片 --> <!-- vant步进器 -->
			<van-checkbox-group v-model="result" @change="onChecked">
				<van-row style="background-color: white;">
                    <van-col  span="2" style="margin-top: 35px;padding-left: .05rem">
                        <van-checkbox :name="item"></van-checkbox>
                    </van-col>
				
                    <van-col span="22">
                        <van-swipe-cell>
                            <van-card
                                :price="item.price"
                                :title="item.title"
                                :thumb="item.img"
                                class="goods-card"
                                >
                            
                                <template #num>
                                    <van-stepper v-model="item.num" @change="onNum"/>
                                </template>

                            </van-card>
                    
                            <template #right >
                                <van-button @click="del(item,index)" square text="删除" type="danger" class="delete-button" />
                            </template>
                        </van-swipe-cell>
                    </van-col>
				</van-row>
			</van-checkbox-group>
        </div>
        <!-- vant提交订单栏 -->
        <van-submit-bar class="my-submit" :price="total" button-text="提交订单">
            <van-checkbox v-model="checkedAll" @click="onAll">全选</van-checkbox>
		</van-submit-bar>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

import { Empty, Button, SubmitBar, Checkbox, 
    CheckboxGroup,Row, Col, SwipeCell,Stepper,Notify 
    } from 'vant'

Vue.use(Empty).use(Button).use(SubmitBar)
    .use(Checkbox).use(CheckboxGroup).use(Row)
    .use(Col).use(SwipeCell).use(Stepper).use(Notify)
export default {
    data() {
        return {
            cart:[],
            result:[],
            total: 0,//总价
            checkedAll:false,//全选状态
            isShow:true
        }
    },
    created() {
        this.cart = this.$store.state.cartList

        if(this.cart.length>0){
            this.isShow = false
        }else{
            this.isShow = true
        }
    },
    methods: {
        
        back(){
            this.$router.go(-1)
        },
        gotoClassify(){//跳转到分类页面
            this.$router.push({
                path: '/home/category'
            })
        },
        onAll(){//点击全选按钮
            if(this.checkedAll){
                this.result = this.cart
            }else{
                this.result = []
            }
        },
        onChecked(){//计算总价
            this.total = 0
            this.result.map(v =>{
                this.total += v.price *100* v.num
            })

            if(this.result.length == this.cart.length){
                this.checkedAll = true
            }else{
                this.checkedAll = false
            }
        },
        onNum(){//点击数量发生变化
            this.onChecked()
        },
        del(item, index){
            if(this.result.includes(item)){
                Notify({ type: 'danger', message: '删除前请取消选中' });
            }else{
                this.cart.splice(index,1)
                //console.log(this.cart)
                this.checkedAll = this.result.length == this.cart.length
            }

            if(this.cart.length > 0){ //显示或隐藏空状态
					this.isShow = false
				}else{
					this.isShow = true
					this.checkedAll = false
				}
        }

    },

    computed:{
        //两种语法
        //...mapGetters(['cartLength', 'cartList']),
        ...mapGetters({
            length: 'cartLength',
            list: 'cartList'
        })
    }
}

</script>
<style lang="stylus" scoped>
    /deep/.van-nav-bar .van-icon
            color #fff
            font-size 20px
    .my-submit
        margin-bottom .5rem
        background-color #dedede
    .cartlist
        margin-top .1rem
    .delete-button 
        height 100%
	.bottom-button 
        width: 180px;
        height: 40px;
	.goods-card
        span
            color red
</style>