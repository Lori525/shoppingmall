
import { ADD_COUNTER, ADD_CARTLIST } from './mutations-type'

export default {
    
    [ADD_COUNTER](state, payload){
        payload.num++
    },
    [ADD_CARTLIST](state, payload){
        state.cartList.push(payload)
    }
}