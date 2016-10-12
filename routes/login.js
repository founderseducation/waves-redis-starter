// Include our node modules
var express = require("express");

// Our router variable is a key component of express. Router provides restful routing (CRUD)
var router = express.Router();
router.get("/", function(req, res, next) {
    res.render("login");    // On the initial GET to the page, render the view with the name "index" (index.html)
});
module.exports = router;