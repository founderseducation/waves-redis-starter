// Include our node modules
// TODO: define our node modules

// Our node app is an instance of express
var app = express(); 
var port = process.env.PORT || 8080;

// Serve up the /public folder to the site
app.use(express.static(__dirname + '/public'));

// Use the cookie parser npm for reading cookies (needed for auth)
app.use(cookieParser());

// Use the body-parser npm for passing data through POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// Set the views engine as ejs to render ejs files
app.set("views", __dirname + "/views");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// Require the necessary routes 
// TODO: define the necessary routes
var index = null;
var login = null;

// Use the routes to render views
// TODO: let our app use the routes on certain paths

// Start the server and listen on the designated port
var httpServer = http.createServer(app).listen(port);
console.log("Magic happens on port " + port); 