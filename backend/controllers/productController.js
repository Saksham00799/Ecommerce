
const Product = require("../models/productModel")

//create product -- Ad,om

exports.createProduct = async (req,res,next) =>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
}

//Gett all products


exports.getAllProducts = async(req,res)=>{
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    })
}