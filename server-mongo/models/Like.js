const mongoose = require("mongoose")

const schema = mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    PostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
})

module.exports = mongoose.model("Like", schema)