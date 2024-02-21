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

export const checkAuthStatus = async () => {
    try {
        const res = await axios.get("/user/checkAuthStatus")
        const data = await res.data
        return data
    } catch (e) {
        throw new Error(e.message)
    }
}

export const logoutUser = async () => {
    try {
        const res = await axios.get("/user/logout")
        const data = await res.data
        return res
    } catch (e) {
        throw new Error(e.message)
    }
}

export const getAIResponse = async (prompt: string, threadId: string) => {
    const aiRes_res = await axios.post("/chat", {
        prompt, 
        threadId
    })
    const aiRes_data = await aiRes_res.data
    return aiRes_data
}
