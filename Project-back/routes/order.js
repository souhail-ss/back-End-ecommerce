const { verify } = require("jsonwebtoken");
const Order = require("../models/Order");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post ("/",verifyToken,async (req,res)=>{
    const newOrder = new Order(req.body)

    try{
        const savedOrder= await newOrder.save();
        res.status(200).json(savedOrder)
    }catch(err){
        res.status(500).json(err)
    }
})





// // //UPDATE 
router.put("/:id",verifyTokenAndAdmin,async(req,res) => {
   
    try{
        const updateOrder = await User.findByIdAndUpdate(req.params.id,{
         
            $set: req.body
        },
        {new:true}
        );
        res.status(200).json(updateOrder)
    }catch(err){
        res.status(500).json(err)
    }
});
// // //DELETE 
router.delete("/:id",verifyTokenAndAdmin, async (req,res)=>{
    try{
        await Order.findByIdAndDelete()
        res.status(200).json("Order has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
} )
// //GET USER ORDERS
router.get("/find/:userid",verifyTokenAndAuthorization, async (req,res)=>{
    try{
        const order = await Order.find({userId:req.params.userid})
        

        res.status(200).json(order);
        
    }catch(err){
        res.status(500).json(err)
    }
} )
// //get all 
router.get("/",verifyTokenAndAuthorization,async (req, res) => {
    try{
        const orders = await Order.find()
        res.status(200).json(orders)
    }catch(err){    
        res.status(500).json(err)
    }
})


module.exports = router 