import express from "express"
let configViewEngine = (app) =>{
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views");
}   
module.exports = configViewEngine;