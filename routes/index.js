var express = require("express"),
    router = express.Router(),
    User = require("../modules/userSchema"),
    passport = require("passport");

router.get("/", function(req, res){
    res.render("index");
});

router.get("/register", function(req, res){
    res.render("auth/register");
});

router.post("/register",function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, returnUser){
        if (err){
            console.log(err);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Account Created Successfully!");
            res.redirect("/campsites");
        })
    });
});

router.get("/login", function(req, res){
    res.render("auth/login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campsites",
    failureRedirect: "/"
}), function(req, res){});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logout Successfully!");
    res.redirect("/");
});

module.exports = router;