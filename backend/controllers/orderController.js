const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const orderModel = require("../models/orderModel");

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});


exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    
    const order = await order.findById(req.params.id).populate("user","name email");


    if(!order){
        return next(new ErrorHandler("Order not found with this id",400));   
    }

    res.status(200).json({
        success:true,
        order,
    });
  });

  //Get single order

  exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    
    const order = await Order.findById(req.params.id).populate("user","name email");


    if(!order){
        return next(new ErrorHandler("Order not found with this id",400));   
    }

    res.status(200).json({
        success:true,
        order,
    });
  });

  // Get logged in user orders
  exports.getMyOrder = catchAsyncErrors(async (req, res, next) => {
    
    const orders = await Order.find({user: req.user._id});
    
    res.status(200).json({
        success:true,
        orders,
    });
  });
  
  // Get all orders --Admin
  exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    
    const orders = await Order.find();
    
    let totalAmount=0;
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    });


    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    });
  });

  // Update order status -- Admin
  exports.updateOrder = catchAsyncErrors(async(req, res, next) => {
    
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler("Order not found with this id",400));   
    }

    if(order.orderStatus==="Delivered"){
        return next(new ErrorHandler("Order Delivered already"),400);
   }

   order.orderItems.forEach(async (o)=>{
    await updateStock(o.Product,o.quantity);
   })
   order.orderStatus = req.body.status;

   if(req.body.status === "Delivered"){
    order.deliveredAt = Date.now();
   }
   
   await order.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    });
  });

  async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.Stock -= quantity;
    await product.save({validateBeforeSave:false});
  }


  // Delete order status -- Admin
  exports.deleteOrder = catchAsyncErrors(async(req, res, next) => {
    
    const order = await Order.findById(req.param.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this id",400));   
    }

    await order.remove()

    res.status(200).json({
        success:true,
    });
  });