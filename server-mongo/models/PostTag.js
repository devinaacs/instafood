const mongoose = require("mongoose")

const schema = mongoose.Schema({
    PostId: String,
    tag: String,
})

module.exports = mongoose.model("PostTag", schema)