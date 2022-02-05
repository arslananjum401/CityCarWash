const express = require('express');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 8000;
const path = require('path');

const date = new Date();
const SDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
var hrs = date.getHours();
if (date.getHours() > 12) {
    hrs -= 12;
}
const STime = hrs + ':' + date.getMinutes();
// console.log(STime);
// getting static file
const staticfiles = path.join(__dirname, "../templates/views/");
app.use(express.static(staticfiles));

const Mongoose = require("./DBconc/Connection");
const Modules = require("./Models/schema");


// setting views engine and views path
app.set("view engine", "hbs");
const viewspath = path.join(__dirname, '../templates/views');
app.set("views", viewspath);



// regitering partials
const partialspath = path.join(__dirname, '../templates/Partials');
hbs.registerPartials(partialspath);


app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}));



app.get("/ProductList", (req, res) => {
    res.render('ProductList.hbs');
});

app.get("/Productsdata", async (req, res) => {
    var Productsdata = await Modules.AddProduct.find();

    res.send(Productsdata);
});

app.post("/ProductList", async (req, res) => {
    const newProducts = new Modules.AddProduct({
        Quantity: req.body.PQuantity,
        Productname: req.body.Pname,
        BuyingPrice: req.body.BPrice,
        RetailPrice: req.body.RPrice
    });
    const savedProducts = await newProducts.save();
});

app.delete("/ProductList/:name", async (req, res) => {
    const user_sent_name = req.params.name;
    console.log(user_sent_name);
    const deleteas = Modules.AddProduct.findOneAndDelete({ name: user_sent_name }, function (err) {
        if (err) {
            console.log(err)
        };
    });

});

app.put('/ProductList/:name', async (req, res) => {
    const user_sent_name = req.params.name;

    try {
        const updated_name = await Modules.AddProduct.findOneAndUpdate({ Productname: user_sent_name },
            {
                $set:
                {
                    Quantity: req.body.UpdatedDataSentBackend.PQuantity,
                    Productname: req.body.UpdatedDataSentBackend.Pname,
                    BuyingPrice: req.body.UpdatedDataSentBackend.BPrice,
                    RetailPrice: req.body.UpdatedDataSentBackend.RPrice,
                }
            },

            {
                new: true,
                useFinedAndModify: false
                // returnOriginal: false,
            },
            // giving error might be good for mongoose.

            // (err, result) => 
            // {
            //     if (err) {
            //         console.error(err);
            //     }
            //     else {
            //         console.log(result);
            //     }
            // }
        );
        console.log(updated_name);
    } catch (error) {
        console.log('error', err)
        res.status(500).json({ error: 'There was a Server Side Error!' })
    }

});


app.get("/DailySales", (req, res) => {
    res.render("Linked files/DailySales");

});
app.get("/makeReceipt", (req, res) => {
    res.render("Linked files/makeReceipt");

});
app.post("/makeReceipt", async (req, res) => {
    const UnitSale = new Modules.DailySale({
        SalesData: {
            ID: req.body.User.id,
            products: req.body.User.products.map((value, index, arr) => {
                return {
                    ProductQuantity: value.quantity,
                    Productname: value.Name,
                    RetailPrice: value.RetailPrice,
                    BuyingPrice: value.BuyingPrice,
                };
            }),

        },
      
        date: SDate,
        time: STime,

    });
    const output = await UnitSale.save()
    console.log(output);
})

app.get('/FilterMatcher', (req, res) => {
    res.render("Linked files/FilterMatcher");
})
// nodemon src/app.js -e js,hbs,css
app.listen(port, () => {
    console.log(`app is running at port ${port}`);
});