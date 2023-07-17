import bcrypt from "bcryptjs";
import db from "../models/index";
import { resolve } from "path";
import { resolveSoa } from "dns";
// import { EagerLoadingError } from "sequelize";
const salt = bcrypt.genSaltSync(10);

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve("create news user sucess!")
        }
        catch (e) {
            reject(e)
        }
    })

}

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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users)
        }
        catch (e) {
            reject(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })

            if (user) {
                resolve(user)
            }
            else {
                resolve([])
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstname = data.firstname
                user.lastname = data.lastname
                user.address = data.address

                await user.save()
                let allUsers = await db.User.findAll();
                resolve(allUsers)
            }
            else {
                resolve()
            }
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
}