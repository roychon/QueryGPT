import axios from "./axios"

export const signupUser = async (username: String, password: String) => {
    try {
        const res = await axios.post("/user/signup", {
            username: username,
            password: password
        })
        const data = await res.data
        return data
    } catch (e) {
        throw new Error(e.message)
    }
}

export const loginUser = async (username: String, password: String) => {
    try {
        const res = await axios.post("/user/login", {
            username: username,
            password: password
        })
        const data = await res.data
        return data
    } catch (e) {
        console.log(e)
        throw new Error(e.message)
    }
}
