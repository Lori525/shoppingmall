<template>
    <div class="home_floor">
        
        <div class="floor_group"
            v-for="item in floorList"
            :key="item.index"
            >
            
            <div class="floor_title">
                <img :src="item.floor_title.image_src" alt="">
            </div>
            
            <div class="floor_list">
                <div class="list_item"
                    v-for="item2 in item.product_list"
                    :key="item2.index"
                >
                    <img :src="item2.image_src" alt="">
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script>
export default {
    name: 'FloorList',
    props:{
        floorList:{
            type: Array,
            required: true
        }
    }
}

</script>
<style lang="stylus" scoped>
    .floor_group
        
        .floor_title
            padding .10rem 0
            img 
                margin-top .08rem
                width 100%
        .floor_list
            .list_item
                float left
                width 33.33%
                img 
                    height 100%
                    width 100%
                &:nth-last-child(-n+4)
                    height 27.727vw
                    border-left .1rem solid #fff
                &:nth-child(2) 
                    border-bottom .1rem solid #fff
                &:nth-child(3)
                    border-bottom 10px solid #fff
</style>