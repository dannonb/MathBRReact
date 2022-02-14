import decode from 'jwt-decode'

export const isAuth = () => {
    const token = localStorage.getItem('auth-token')
    if (!token) {
        localStorage.clear()
        return false
    }
    const decodedToken = decode(token)
    if (decodedToken.exp > Date.now()) {
        localStorage.clear()
        return false
    }
    console.log('passed auth')
    return true
}