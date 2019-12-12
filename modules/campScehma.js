var mongoose = require("mongoose");

var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "comment"
    }]
});

module.exports = mongoose.model("camp", campSchema);

