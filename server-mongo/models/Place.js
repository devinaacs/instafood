const mongoose = require("mongoose")

const schema = mongoose.Schema({
    placeRef: String,
    placeName: String,
})

module.exports = mongoose.model("Place", schema)