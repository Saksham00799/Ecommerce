
const { GridFSBucketReadStream } = require("mongodb");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
//create product -- Admin

exports.createProduct = catchAsyncErrors(async (req,res,next) =>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});


//Gett all products

exports.getAllProducts = catchAsyncErrors(async(req,res)=>{
    const products = await Product.find();
    
    res.status(200).json({
        success:true,
        products
    })
});

//Get product details

exports.getAllProductDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    res.status(200).json({
        success:true,
        product
    })
});


// Update Product -- Admin  

exports.updateProduct = catchAsyncErrors(async(req,res,next) => {
    let product = Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
});

//Delete Product

exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    const result = await Product.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
        return next(new ErrorHandler("Product not found",404))
    }
    res.status(200).json({
    success:true,
    message:"product deleted successfully",
    product
    });
});