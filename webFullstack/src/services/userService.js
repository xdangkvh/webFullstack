import db from "../models";
import bcrypt from 'bcryptjs';
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //use already exist
                //compare password
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true,
                })
                if (user) {
                    //compare password
                    //bcrypt.compareSync
                    let check = await bcrypt.compareSync(password, user.password);
                    // let check = true
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "Ok";
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";

                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = `User's isn't found`
                }

            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's email isn't exist in your system. Plz try other email!`;
            }
            resolve(userData)
        }
        catch (e) {
            reject(e)
        }
    })
}

// let comparePassword = () => {
//     return new Promise((resolve, reject) = () => {
//         try {

//         }
//         catch (e) {
//             reject(e)
//         }
//     })
// }
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
//get All users
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        }
        catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
}