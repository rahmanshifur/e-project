import { action } from 'easy-peasy'
import shortid from 'shortid'
import { getLocalData, setLocalData } from '../../utils/helper'

const SubcategoryModel = {
    data: getLocalData('subcategory'),
    tmpData: [],
    create: action((state, payload) => {
        let obj = {
            id: shortid.generate(),
            name: payload.name,
            categoryId: payload.categoryId,
            file: payload.file
        }
        state.data.unshift(obj)
        setLocalData('subcategory', state.data)
    }),
    update: action((state, payload) => {
        let arr = state.data.map(item => {
            if (item.id === payload.id) {
                item = payload
            }
            return item
        })
        state.data = arr
        setLocalData('subcategory', state.data)

    }),
    remove: action((state, payload) => {
        let arr = state.data.filter(item => item.id !== payload)
        state.data = arr
        setLocalData('subcategory', state.data)
    }),
    filterData: action((state, payload) => {
        if (state.tmpData.length !== 0) {
            state.data = state.tmpData
        }

        let arr = []
        state.data.forEach(item => {
            let res = true
            if (payload.id && !item.id.toLowerCase().includes(payload.id.toLowerCase())) {
                res = false
            }
            if (payload.name && !item.name.toLowerCase().includes(payload.name.toLowerCase())) {
                res = false
            }
            if (payload.category && item.categoryId !== payload.category) {
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

export default SubcategoryModel