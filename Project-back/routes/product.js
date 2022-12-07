const { verify } = require("jsonwebtoken");
const Product = require("../models/Product");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post ("/",verifyTokenAndAdmin,async (req,res)=>{
    const newProduct = new Product(req.body)

    try{
        const savedProduct= await newProduct.save();
        res.status(20).json(savedProduct)
    }catch(err){
        res.status(500).json(err)
    }
})





// //UPDATE 
router.put("/:id",verifyTokenAndAdmin,async(req,res) => {
   
    try{
        const updateProduct = await User.findByIdAndUpdate(req.params.id,{
         
            $set: req.body
        },
        {new:true}
        );
        res.status(200).json(updateProduct)
    }catch(err){
        res.status(500).json(err)
    }
});
// //DELETE 
router.delete("/:id",verifyTokenAndAdmin, async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
} )
// //GET product
router.get("/find/:id", async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        

        res.status(200).json(product);
        
    }catch(err){
        res.status(500).json(err)
    }
} )
//get all products
router.get("/", async (req,res)=>{
    
    const qCategory = req.querycategory;
    try{
        let products;
        products = await Product.find()
       if(qCategory){
        products = await Product.find({categories:{
            $in:[qCategory],

        }
    })
       }else{
        products = await Product.find()
       }

        res.status(200).json(products);
        
    }catch(err){
        res.status(500).json(err)
    }
} )


module.exports = router 