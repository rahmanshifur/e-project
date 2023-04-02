
import { action } from 'easy-peasy';
import { setLocalData, getLocalData } from './../../utils/helper';
import shortid from 'shortid';

const UserModel = {
    data: getLocalData('user'),
    tmpData: [],
    create: action((state, payload) => {

        let { name, username, email, password, streetId, contact, status, file } = payload
        let obj = {
            id: shortid.generate(),
            name: name,
            username: username,
            email: email,
            password: password,
            streetId: streetId,
            contact: contact,
            status: status,
            file: file
        }
        state.data.unshift(obj)
        setLocalData('user', state.data)
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
        setLocalData('user', state.data)
        payload.successHandler()

    }),
    activeInactive: action((state, payload) => {
        let arr = state.data.map(item => {
            if (item.id === payload) {
                item.status = Number(item.status) === 1 ? 0 : 1
            }
            return item
        })
        state.data = arr
        setLocalData('user', state.data)
    }),
    remove: action((state, payload) => {
        let arr = state.data.filter(item => item.id !== payload)
        state.data = arr
        setLocalData('user', state.data)
    }),
    filterData: action((state, payload) => {
        if (state.tmpData.length !== 0) {
            state.data = state.tmpData
        }
        const arr = []
        state.data.forEach(item => {
            let res = true
            if (payload.id && !item.id.toLowerCase().includes(payload.id.toLowerCase())) {
                res = false
            }
            if (payload.username && !item.username.toLowerCase().includes(payload.username.toLowerCase())) {
                res = false
            }
            if (payload.email && !item.email.toLowerCase().includes(payload.email.toLowerCase())) {
                res = false
            }
            if (payload.contact && !item.contact.toLowerCase().includes(payload.contact.toLowerCase())) {
                res = false
            }
            if (payload.status && Number(item.status) !== Number(payload.status)) {
                res = false
            }
            if (res) {
                arr.push(item)
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
    }),
}

export default UserModel