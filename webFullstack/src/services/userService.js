import db from "../models";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        }
        catch (e) {
            reject(e);
        }
    })
}
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

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already in used , plz try another email '
                })
            }
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstname: data.firstname,
                lastname: data.lastname,
                address: data.address,
                gender: data.gender === "1" ? true : false,
                phonenumber: data.phonenumber,
                roleId: data.roleId
            })
            // console.log("data from service")
            // console.log(data)
            resolve({
                errCode: 0,
                message: "OK"
            })
        }
        catch (e) {
            reject(e)
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: "The users isn't exits!"
            })
        }
        await db.User.destroy({
            where: { id: userId }
        });
        resolve({
            errCode: 0,
            message: 'The user is deleted!'
        })
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing required paramesters!"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstname = data.firstname
                user.lastname = data.lastname
                user.address = data.address
                await user.save()
                // await db.User.save({
                //     firstname: data.firstname,
                //     lastname: data.lastname,
                //     address: data.address
                // })
                resolve({
                    errCode: 0,
                    message: "Update the user succeds!"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "User not found!"
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData
}