var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
var booksController = require("../controller/books.controller");
function requireLogin(req, res, next) {
    let accessToken = req.header("Authorization");
    if (accessToken && accessToken.startsWith("Bearer ")) {
        // Remove Bearer from string
        accessToken = accessToken.slice(7, accessToken.length);
        console.log("acc1",accessToken);
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

router.post('/create', booksController.createBook)
router.use(requireLogin);
router.get("/all",booksController.getAllBooks);
router.post("/delete",booksController.deleteBook)
router.post("/update",booksController.updateBook);
router.post("/search",booksController.searchBooks)
router.get("/", booksController.getBooks);
router.get("/:id_book", booksController.getBook);


module.exports = router;
