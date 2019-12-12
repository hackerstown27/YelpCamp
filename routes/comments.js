var express = require("express"),
    router = express.Router({mergeParams: true}),
    camp = require("../modules/campScehma"),
    middleware = require("../middleware"),
    comment = require("../modules/commentSchema");

router.get("/new", middleware.isLogin, function(req, res){
    camp.findById(req.params.id, function(err, camp){
        res.render("comments/new", {camp: camp});
    });
});

router.post("/", middleware.isLogin, function(req, res){
    camp.findById(req.params.id, function(err, returnCamp){
        comment.create({
           data: req.body.data 
        }, function(err, returnComment){
            returnComment.author.id = req.user._id;
            returnComment.author.username = req.user.username;
            returnComment.save();
            returnCamp.comment.push(returnComment);
            returnCamp.save();
            req.flash("success", "Successfully Added The Comment!");
            res.redirect("/campsites/"+req.params.id);
        });
    });
});

router.get("/:comments_id/edit", middleware.isCommentOwnwer, function(req, res){
    camp.findById(req.params.id, function(err, returnCamp){
        comment.findById(req.params.comments_id, function(err, returnComment){
            res.render("comments/edit",{camp: returnCamp, comment: returnComment});
        });
    });
});

router.put("/:comments_id", middleware.isCommentOwnwer, function(req, res){
    comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, function(err, returnComment){
        req.flash("success", "Successfully Edited The Comment!");
        res.redirect("/campsites/"+req.params.id);
    });
});

router.delete("/:comments_id", middleware.isCommentOwnwer, function(req, res){
    comment.findByIdAndRemove(req.params.comments_id, function(err, returnComment){
        req.flash("error", "Successfully Deleted The Comment!");
        res.redirect("/campsites/"+req.params.id);
    });
});

module.exports = router;
