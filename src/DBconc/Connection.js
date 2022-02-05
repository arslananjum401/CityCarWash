const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://arslananjum_401:arslanAA564^^&&@cluster0.pidwl.mongodb.net/ProductDetail', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
}, (err) => {
    if (err) {

        console.error(err)
    }
})
// mongodb+srv://arslananjum_401:arslanAA564^^&&@cluster0.pidwl.mongodb.net/ProductDetail