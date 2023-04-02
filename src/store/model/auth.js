import { navigate } from "@reach/router";
import { action } from "easy-peasy";
import { getLocalData, setLocalData } from "../../utils/helper";


const AuthModel = {
    data: getLocalData('auth'),
    login: action((state, payload) => {
        let authUser = payload.users.filter(item => item.email === payload.email && item.password === payload.password)
        if (authUser.length === 0) {
            alert('Invalid credential')
            return
        }

        if (Number(authUser[0].status) !== 1) {
            alert('Your account is Inactive please contact our support!')
            return;
        }

        alert('LogeIn successfully!')
        state.data = authUser
        setLocalData('auth', state.data)
        navigate(-1)
    }),
    logout: action((state, payload) => {
        state.data = []
        setLocalData('auth', state.data)
        navigate('/')
    })
}

export default AuthModel