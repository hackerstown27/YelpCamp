var express = require("express"),
    router = express.Router(),
    middleware = require("../middleware"),
    camp = require("../modules/campScehma");

router.get("/", middleware.isLogin, function(req, res){
    camp.find({}, function(err, camps){
        if (!err){
            res.render("campgrounds/campsites", {campsites: camps});
        }      
    }); 
});

router.post("/", middleware.isLogin, function(req, res){

    camp.create({
        name: req.body.camp_name,
        image: req.body.img_url,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }, function(err, camp){
        if (err){
            console.log(err);
        }
        else{
            console.log(camp);
        }
    });
    req.flash("success", "Successfully Added The Campsite!");
    res.redirect("/campsites");
});

router.get("/new", middleware.isLogin, function(req, res){
    res.render("campgrounds/new");
});

router.get("/:id", middleware.isLogin, function(req, res){
    camp.findById(req.params.id).populate("comment").exec(function(err, camp){
        if(!err){
            res.render("campgrounds/camp", {camp: camp}); 
        }
    });
});

router.get("/:id/edit", middleware.isOwnwer, function(req, res){
    camp.findById(req.params.id, function(err, foundCamp){
        res.render("campgrounds/edit", {camp: foundCamp});
    });
});

router.put("/:id", middleware.isOwnwer, function(req, res){
    camp.findByIdAndUpdate(req.params.id, req.body.camp, function(err, returnCamp){
        req.flash("success", "Successfully Modified The Campsite!");
        res.redirect("/campsites/"+req.params.id);
    });
});

router.delete("/:id", middleware.isOwnwer, function(req, res){
    camp.findByIdAndRemove(req.params.id, function(err, returnCamp){
        req.flash("error", "Successfully Deleted The Campsite!");        
        res.redirect("/campsites");
    });
});


module.exports = router;