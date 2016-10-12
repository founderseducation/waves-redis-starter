// Include our node modules
var express = require("express");
var mongoose = require("mongoose");
var redis = require("redis");
var spotify = require("spotify");
var YouTube = require("youtube-node");
var SoundCloud = require("node-soundcloud");

var keyStorage = require("../config/keyStorage.js");

// Initializa a Redis client connection
var redisClient = redis.createClient();

// If an error occurs, print it to the console
redisClient.on('error', function (err) {
    console.log("Youtube Redis Cache Error: " + err);
});

// Create a connection to our YouTube API, provide the client-key
var youtube = new YouTube();
youtube.setKey(keyStorage.youtube_key);

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
    redisClient.get("youtube_" + req.body.q, function(error, redisResult) {
        if (redisResult) {
            console.log("Returning youtube results from Redis Cache");
            res.send(JSON.parse(redisResult));
        } else {
            console.log("Returning youtube results from YouTube API");
            youtube.search(req.body.q, 2, function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                redisClient.setex("youtube_" + req.body.q, 600, JSON.stringify(result, null, 2));
                res.send(result);
            });
        }
    });
});

/* 
The following POST request attempts to search the Redis client for the youtube version of the results. If one does
not exist, make a request to the youtube API to get the results. Before exiting, store the results in the Redis cache.
*/
router.post("/spotify", function(req, res, next) { 
    redisClient.get("spotify_" + req.body.q, function(error, result) {
        if (result) {
            console.log("Returning spotify results from Redis Cache");
            res.send(JSON.parse(result));
        } else {
            console.log("Returning spotify results from Spotify API");
            spotify.search({ type: 'track', 
                     query: req.body.q,
                     limit: 10 }, function(err, data) {
                if ( err ) {
                    console.log('Error occurred: ' + err);
                    return;
                }
                redisClient.setex("spotify_" + req.body.q, 600, JSON.stringify(data, null, 2));
                res.send(data);
            });
        }
    });
});

// A very essential part of the server. This line makes the router variable created in this file accessible from outside.
module.exports = router;