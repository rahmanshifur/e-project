
import { setLocalData, getLocalData } from './../../utils/helper';
import { action } from 'easy-peasy';
import shortid from 'shortid';

const ReviewModel = {

    data: getLocalData('review'),
    tmpData: [],
    create: action((state, payload) => {
        console.log(payload)
        let { comment, star, productId, userId } = payload
        let obj = {
            id: shortid.generate(),
            date: new Date().toDateString(),
            comment: comment,
            star: star,
            productId: productId,
            userId: userId
        }
        state.data.unshift(obj)
        setLocalData('review', state.data)
        payload.successHandler()
    }),
    update: action((state, payload) => {
        let arr = state.data.map(item => {
            if (item.id === payload.id) {
                item = payload
            }
            return item
        })
        state.data = arr
        setLocalData('review', state.data)
        payload.successHandler()
    }),
    remove: action((state, payload) => {
        let arr = state.data.filter(item => item.id !== payload)
        state.data = arr
        setLocalData('review', state.data)
    }),
    filterData: action((state, payload) => {
        if (state.tmpData.length !== 0) {
            state.data = state.tmpData
        }
        let arr =
            state.data.forEach(item => {
                let res = true
                if (payload.id && !item.id.toLowerCase().includes(payload.id.toLowerCase())) {
                    res = false
                }
                if (payload.star && item.star !== payload.star) {
                    res = false
                }
                if (payload.product && item.productId !== payload.product) {
                    res = false
                }
                if (payload.user && item.userId !== payload.user) {
                    res = false
                }
                if (res) {
                    return item
                }
            })
        state.tmpData = state.data
        state.data = arr
    }),
    resetFilter: action((state, payload) => {
        if (state.tmpData.length === 0)
            return
        state.data = state.tmpData
        state.tmpData = []
    })
}

export default ReviewModel