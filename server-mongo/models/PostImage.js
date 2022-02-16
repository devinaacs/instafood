const mongoose = require("mongoose")

const schema = mongoose.Schema({
    PostId: String,
    imageUrl: String,
})

module.exports = mongoose.model("PostImage", schema)