const router = require("express").Router();
const User = require('../models/User')
const CryptoJS =require('crypto-js')
const jwt = require("jsonwebtoken");


//REGISTER Route

router.post('/register',async(req,res)=> {
console.log(req.body);
    const newUser = new User({
    username: req.body.username,
    email:req.body.email,
    password:CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),

  })

try{
   const savedUser= await newUser.save();
   console.log(savedUser);
   res.status(201).send({message:'success',user:savedUser})

}catch(err){
    console.log(err);
}

});
//LOGIN
router.post('/login',async (req,res)=>{
    
        const user = await User.findOne({username:req.body.username});
        if(!user){res.status(200).json("wroooong  username !!!!!")} 
        else{
            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                process.env.PASS_SEC
            );
            const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    
            if(Originalpassword !== req.body.password){res.status(200).json("wroooong pass !!!!!")} 
            else{
                const Token = jwt.sign({
                    id:user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SEC,
                {expiresIn:"3d"}
                )
        
                const {password, ...others }=user._doc;
        
                res.status(200).json({others,Token});
            }
           
        }
        
       
    



});




module.exports = router 