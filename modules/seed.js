var mongoose = require("mongoose");
var camp = require("./campScehma");
var comment = require("./commentSchema");

var campsData = [
    {
        name: "Dragon Valley",
        image: "https://images.unsplash.com/photo-1488790881751-9068aa742b9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80"
    },
    {
        name: "Mountains Huwai",
        image: "https://images.unsplash.com/photo-1511993807578-701168605ad3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1047&q=80"
    },
    {
        name: "InceLand Desert",
        image: "https://images.unsplash.com/photo-1533374623577-57317aa0efa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
    },
    {
        name: "Boeing Barns",
        image: "https://images.unsplash.com/photo-1525209149972-1d3faa797c3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    },
    {
        name: "Weisley Sleigh",
        image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=335&q=80"
    },
    {
        name: "Winter Gardens",
        image: "https://images.unsplash.com/photo-1552355170-c8337700279c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
    }
];



var seeder = function(){
    camp.remove({}, function(err, camps){
        comment.remove({}, function(){
            campsData.forEach(function(campData){
                camp.create(campData, function(err, campCreated){
                    comment.create({
                        author: "Suze Lane",
                        data: "It is a quiet good place!"
                    }, function(err, returnComment){
                        campCreated.comment.push(returnComment);
                        campCreated.save();
                    });                 
                });
            });
        });
    });
}



module.exports = seeder;