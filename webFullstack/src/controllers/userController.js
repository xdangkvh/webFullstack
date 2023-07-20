import userService from "../services/userService"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    //check email exits 
    //compare password
    //return userinfor
    //acess toke: JWT
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs paramaster!",
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}

    })
}
module.exports = {
    handleLogin: handleLogin,
}