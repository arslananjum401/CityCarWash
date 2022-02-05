const mongoose = require('mongoose');

const ProductDetails = new mongoose.Schema({
    Quantity: {
        type: Number,
        required: true,
        trim: true,
    },
    Productname: {
        type: String,
        required: true,
        trim: true,
    },
    BuyingPrice: {
        type: Number,
        required: true,
        trim: true,
    },
    RetailPrice: {
        type: Number,
        required: true,
        trim: true
    }
})

const dailySales = new mongoose.Schema({
    SalesData:
    {
        ID: {
            type: String,
            required: true,
            trim: true,
        },
        products: [{
            Productname: {
                type: String,
                required: true,
                trim: true,
            },
            ProductQuantity: {
                type: Number,
                required: true,
                trim: true,
            },
            BuyingPrice: {
                type: Number,
                required: true,
                trim: true,
            },
            RetailPrice: {
                type: Number,
                required: true,
                trim: true,
            }

        }],
    },

    date: {
        type: String,
        required: true,
        trim: true,
    },

    time: {
        type: String,
        required: true,
        trim: true,
    },


})
const filterM = new mongoose.Schema({
    car: {
        type: String,
        required: true,
        trim: true,
    },
    airFilter: {
        type: String,
        required: true,
        trim: true,
    }
})
const AddProduct = new mongoose.model("ProductDetail", ProductDetails);
const DailySale = new mongoose.model('dailySale', dailySales);
const Filtermatcher=new mongoose.model('filtermatcher',filterM)
module.exports = { AddProduct, DailySale,Filtermatcher };