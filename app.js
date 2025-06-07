const express=require("express");
const app=express();
const mongoose=require("mongoose");
// const Listing=require("./models/listing.js");
const path =require("path");//10
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
// const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const cors = require("cors");
// const {listingSchema,reviewSchema}=require("./schema.js");
// const Review=require("./models/reviews.js");
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const session=require("express-session")
const flash=require("connect-flash");
const passport = require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");



const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});//4
async function main(){
    await mongoose.connect(MONGO_URL);
}//3

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));//12
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
// app.use(cors());
const sessionOptions={
    secret:"mysupersecretecode",
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    // console.log(res.locals.success);
    res.locals.currUser=req.user;
    next();
});


// app.get("/demouser",async (req,res)=>{
//     let fakeUser=new User({
//         email:"student@gmail.com",
//         username:"delta-student"
//     });
//     let registeredUser=await User.register(fakeUser,"helloworld");
//     res.send(registeredUser);
// })

//schmea as a middleware
// const validateListing=(req,res,next)=>{
//     let result=listingSchema.validate(req.body);
//     if(error){
//         let errMsg=error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(400,errMsg);
//     }else{
//         next();
//     }
// };

// };


  
// app.post("/listings",async(req,res)=>{
//     //let {title,deescription,image,price,country,location}=req.body;
//     const newListing=new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listings");
//     //let listing=req.body.listing;
//     //console.log(listing);
// });
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"By the Beach",
//         price:1200,
//         location:"Calangute,Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("testing succeeded");

// });//6
// app.all("*",(req,res,next)=>{
// next(new ExpressError(404,"Page not found"));
// });
// app.all("*", (req, res) => {
//     res.status(404).send("Page not found");
//   });
  
app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something went wrong!"}=err;
    res.status(statusCode).render("error.ejs",{message});
    // res.status(statusCode).send(message);
    
    });
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});//1
