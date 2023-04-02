import { setLocalData, getLocalData } from './../../utils/helper';
import { action } from 'easy-peasy';

const CartModel = {
    data: getLocalData('cart'),
    create: action((state, payload) => {
        if (state.data.length !== 0) {
            let pdt = state.data.filter(item => item.id === payload.id)
            if (pdt.length > 0) {
                alert('Product already into the cart!')
                return
            }
        }
        alert('Product create successfully!')
        state.data.unshift(payload)
        setLocalData('cart', state.data)
    }),
    update: action((state, payload) => {
        let arr = state.data.map(item => {
            if (item.id === payload.id) {
                item.quantity = payload.quantity
            }
            return item
        })
        state.data = arr
        setLocalData('cart', state.data)
        alert('Quantity has been update successfully')

    }),
    remove: action((state, payload) => {
        let arr = state.data.filter(item => item.id !== payload)
        state.data = arr
        setLocalData('cart', state.data)
    }),
    cartEmpty: action((state) => {
        state.data = []
        setLocalData('cart', state.data)
    })
}

export default CartModel