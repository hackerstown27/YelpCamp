var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var bodyParser = require("body-parser");
var session = require("express-session");
var camp = require("./modules/campScehma");
var comment = require("./modules/commentSchema");
var seeder = require("./modules/seed");
var User = require("./modules/userSchema");
var methodOveride = require("method-override");
var flash = require("connect-flash");


var campsitesRoutes = require("./routes/campsites");
var commentsRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");

//============================================================
// CONFIG
//============================================================
var app = express();
mongoose.connect("mongodb://127.0.0.1:27017/camps", function(err){
    if (err){
        console.log(err);
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOveride("_method"));
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(flash());
//seeder();

//============================================================
//  PASSPORT CONFIG
//============================================================

app.use(session({
    secret: '*&*&()IOP{{PO((*&^YTGBHHHI()_+>>>',
    resave: false,
    saveUninitialized: false
}));
    
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});
//===========================================================

app.use("/campsites", campsitesRoutes);
app.use("/campsites/:id/comments/", commentsRoutes);
app.use(indexRoutes);

app.listen(5500, "127.0.0.1", function(){
    console.log("server started successfully");
});