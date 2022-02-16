const cors = require('cors');
const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use(require('./routes'))



mongoose.connect('mongodb+srv://instafood:instafood@instafood.mar0e.mongodb.net/instafood?retryWrites=true&w=majority',
    { useNewUrlParser: true },
    () => console.log('connected to DB')
)


app.listen(port, () => {
    console.log(`🚀 server app listening on port ${port}`)
})