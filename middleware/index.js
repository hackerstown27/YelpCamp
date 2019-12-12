var comment = require("../modules/commentSchema"),
    camp = require("../modules/campScehma");

module.exports = {
    isLogin: function (req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You Must be login to do that");
        res.redirect("/");
    },

    isCommentOwnwer: function (req, res, next){
        if (req.isAuthenticated()){
                comment.findById(req.params.comments_id, function(err, returnComment){
                    if(returnComment.author.id.equals(req.user._id)){
                        next();
                    }
                    else{
                        res.send("UnAuth to Do That")
                    }
                });
        }
        else{
            res.send("UnAuth to Do That")
        }
    },

    isOwnwer: function isOwnwer(req, res, next){
        if(req.isAuthenticated()){
            camp.findById(req.params.id, function(err, returnedCamp){
                if(returnedCamp.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.send("Not Authorized to that!");  
                }
            });
        }   
        else{
            res.send("Not Authorized to that!");  
        }
    }
}





