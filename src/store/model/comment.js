import { action } from 'easy-peasy';
import shortid from 'shortid';
import { setLocalData, getLocalData } from './../../utils/helper';


const CommentModel = {
    data: getLocalData('comment'),
    create: action((state, payload) => {
        let obj = {
            id: shortid.generate(),
            date: new Date().toDateString(),
            productId: payload.productId,
            userId: payload.userId,
            commentId: payload.commentId,
            body: payload.body,
        }
        state.data.unshift(obj)
        setLocalData('comment', state.data)
    }),
    update: action((state, payload) => {
        let arr = state.data.map(item => {
            if (item.id === payload.id) {
                item = payload
            }
            return item
        })
        state.data = arr
        setLocalData('comment', state.data)
    }),
    remove: action((state, payload) => {
        let arr = state.data.filter(item => item.id !== payload)
        state.data = arr
        // setLocalData('comment', state.data)
    })
}

export default CommentModel