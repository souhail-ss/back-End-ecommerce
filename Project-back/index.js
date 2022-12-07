const express = require("express")
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const dotenv = require("dotenv")
const userRoute =require("./routes/user")
const AuthRoute =require("./routes/auth")
const ProductRoute =require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")

dotenv.config();


mongoose.connect(process.env.MONGO_URL)
.then(()=>      
    console.log("Successful"))
.catch((err)=> {
    console.log(err)
});


app.use(express.json())
app.use(cors());


app.use("/api/users", userRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/product",ProductRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRoute)

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.render('error');
  });







app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running,oh yes finally !")

});