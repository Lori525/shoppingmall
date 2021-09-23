
import { ADD_COUNTER, ADD_CARTLIST} from './mutations-type'

export default {
    //添加到购物车里
    addCart(context,payload){
        
      //1.查找之前数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.id === payload.id)

      //2.判断oldProduct
        if(oldProduct){
            //oldProduct.num += 1
            context.commit(ADD_COUNTER, oldProduct)
        }else{
            payload.num = 1
            //context.cartList.push(payload)
            context.commit(ADD_CARTLIST, payload)
        }
        
    }
}