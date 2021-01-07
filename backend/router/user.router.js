var express = require("express");
var router = express.Router();
var userController = require("../controller/user.controller");
const upload = require("../multer");
const utils = require("../utils/utils");
const jwt = require("jsonwebtoken");

function requireLogin(req, res, next) {
    let accessToken = req.header("Authorization");
    if (accessToken && accessToken.startsWith("Bearer ")) {
        // Remove Bearer from string
        accessToken = accessToken.slice(7, accessToken.length);
    }

    jwt.verify(accessToken, "sercretKey", (err, decoded) => {
        try {
            req.user = decoded.user;
            req.authenticated = true;
            return next();
        } catch (error) {
            res.json({
                data:null
            })
        }
       
    });
}
router.post("/logingoogle",userController.callbackGoogle);
router.post("/loginfacebook",userController.callbackFacebook);
router.get("/user", userController.getUserById);
router.post("/register", userController.postRegister);
router.post("/login", userController.postLogin);
router.use(requireLogin);
router.post("/update", userController.update);
router.get("/book-list", utils.requireRole(1), userController.getBook);


module.exports = router;
