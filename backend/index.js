const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//Database Connection With MongoDB
mongoose.connect("mongodb+srv://Karthikdev:Bunny1234@cluster0.1goprx2.mongodb.net/e-commerce")

// API Creation

app.get("/",(req,res)=>{
     res.send("Express App is Running")
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Creating upload Endpoint for images

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: true,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for Creating products

const Products = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct', async (req, res) => {
    let id = req.body.id;

    // If id is not provided, generate the next id
    if (id === undefined) {
        const lastProduct = await Products.findOne().sort({ id: -1 });
        id = lastProduct ? lastProduct.id + 1 : 1;
    }

    const product = new Products({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    await product.save();
    console.log('Product added:', product);
    res.json({
        success: true,
        product: product
    });
});


//Creating API for deleting Products

app.post('/removeProduct',async(req,res)=>{
    await Products.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})


// Creating API getting all Products
app.get('/allproducts', async (req, res) => {
    let products = await Products.find({});
    console.log("All Products Fetched");
    res.send(products);
});



//Schema creation for users model

const Users = mongoose.model('Users', {
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    },

    })

    //Creating Endpoint for registering user
    app.post('/signup',async(req,res)=>{

        let check = await Users.findOne({email:req.body.email});
        if(check){
            return res.status(400).json({success:false,errors:"existing user found with same email address"})
        }
        let cart = {};
        const user = new Users({
            name:req.body.username,
            email:req.body.email,
            password:req.body.password,
            cartData:cart,
        })
        await user.save();

        const data = {
            user:{
                id:user._id,
            }
        }
        const token = jwt.sign(data,'secret_ecom');
        res.json({success:true,token});
    })
    
//Creating Endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id,
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Wrong Password" });
        }
    } else {
        res.json({ success: false, errors: "Wrong Email Id" });
    }
});


// creating endpoint for newcollection data
app.get('/newcollections', async (req, res) => {
    let products = await Products.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
});

// creating endpoint for popular in women section
app.get('/popularinwomen', async (req, res) => {
    try {
        // Fetch products with category 'women' (case-insensitive)
        const products = await Products.find({ category: { $regex: /^women$/i } }).limit(4);
        res.json(products);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

//creating middleware to fetch user
const fetchUser = async (req,res,next)=>{
    const token = req.headers['auth-token'];
    if(!token){
        res.status(401).send({errors:"please authenticate using a valid token"})
    } else {
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        }catch(error){
            res.status(401).send({errors:"please authenticate using a valid token"})
        }
    }
}

//creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        const itemId = req.body.itemId;
        if (userData.cartData[itemId]) {
            userData.cartData[itemId] += 1;
        } else {
            userData.cartData[itemId] = 1;
        }
        // Increment the quantity if already in cart, else set to 1
        if (userData.cartData[itemId]) {
            userData.cartData[itemId] += 1;
        } else {
            userData.cartData[itemId] = 1;
        }
        await Users.findByIdAndUpdate(
            { _id: req.user.id },
            { cartData: userData.cartData }
        );
        // Log the action
        console.log(`User ${req.user.id} added item ${itemId} to cart. Cart:`, userData.cartData);
        res.json({ success: true, cartData: userData.cartData });
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// creating endpoint for popular in men section

app.listen(port,(error)=>{
    if(!error){
        console.log("server Running on port"+port)
    }
    else
    {
       console.log("Error :"+error)
    }
})