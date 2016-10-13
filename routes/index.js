// Include our node modules
var express = require("express");

// TODO: define the remainder of the node modules to be used in this file


var keyStorage = require("../config/keyStorage.js");

// Initializa a Redis client connection
// TODO: properly define the redisClient
var redisClient = null;                 

// If an error occurs, print it to the console
// TODO: print errors to console

// Create a connection to our YouTube API, provide the client-key
// TODO: configure the YouTube API

// Our router variable is a key component of express. Router provides restful routing (CRUD)
var router = express.Router();
router.get("/", function(req, res, next) {
    res.render("index");    // On the initial GET to the page, render the view with the name "index" (index.html)
});

/* 
The following POST request attempts to search the Redis client for the youtube version of the results. If one does 
not exist, make a request to the youtube API to get the results. Before exiting, store the results in the Redis cache.
*/
router.post("/youtube", function(req, res, next) {
    
});

/* 
The following POST request attempts to search the Redis client for the youtube version of the results. If one does
not exist, make a request to the youtube API to get the results. Before exiting, store the results in the Redis cache.
*/
router.post("/spotify", function(req, res, next) { 
    
});

// A very essential part of the server. This line makes the router variable created in this file accessible from outside.
module.exports = router;