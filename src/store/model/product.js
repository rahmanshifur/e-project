import { action } from "easy-peasy";
import shortid from "shortid";
import { getLocalData, setLocalData } from "../../utils/helper";


const ProductModel = {
    data: getLocalData('product'),
    tmpData: [],
    create: action((state, payload) => {
        let { title, subcategoryId, price, vat, discount, description, colors, sizes, tags, file, files, contact, successHandler } = payload
        let obj = {
            id: shortid.generate(),
            title: title,
            subcategoryId: subcategoryId,
            price: price,
            vat: vat,
            discount: discount,
            description: description,
            colors: colors,
            sizes: sizes,
            tags: tags,
            file: file,
            files: files,
            contact: contact,
        }
        state.data.unshift(obj)
        setLocalData('product', state.data)

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
        setLocalData('product', state.data)

        payload.successHandler()
    }),
    remove: action((state, payload) => {
        let arr = state.data.filter(item => item.id !== payload)
        state.data = arr
        setLocalData('product', state.data)

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
            if (payload.title && !item.title.toLowerCase().includes(payload.title.toLowerCase())) {
                res = false
            }
            if (payload.category) {

                let count = 0
                payload.subcategories.forEach(scat => {
                    if (scat.id === item.subcategoryId && scat.categoryId === payload.category) {
                        count++
                    }
                })
                if (count === 0) {
                    res = false
                }
            }
            if (payload.subcategory && item.subcategoryId !== payload.subcategory) {
                res = false
            }
            if (payload.minPrice && Number(item.price) <= Number(payload.minPrice) && Number(item.price) !== Number(payload.minPrice)) {
                res = false
            }
            if (payload.maxPrice && Number(item.price) >= Number(payload.maxPrice) && Number(item.price) !== Number(payload.maxPrice)) {
                res = false
            }
            if (payload.color && item.colors !== payload.color) {
                res = false
            }
            if (payload.tag && item.tags !== payload.tag) {
                res = false
            }
            if (payload.contact && !item.contact.toLowerCase().includes(payload.contact.toLowerCase())) {
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

export default ProductModel