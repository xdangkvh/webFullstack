import db from "../models/index";
import CRUDservice from "../services/CRUDservice";
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        // console.log(data)
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    }
    catch (e) {
        console.log(e)
    }
}
let getAboutPage = (req, res) => {
    return res.render("./test/about.ejs")
}
let getCURD = (req, res) => {
    return res.render("./test/crud.ejs")
}
let postCURD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message)
    return res.send("post CRUD from server");
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    console.log(data)
    return res.render("./test/displayCRUD.ejs", {
        dataTable: data
    })
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCURD: getCURD,
    postCURD: postCURD,
    displayGetCRUD: displayGetCRUD,
}