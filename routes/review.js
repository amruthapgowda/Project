const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/reviews.js");
const Listing=require("../models/listing.js");
const {validateReview,isloggedIn, isReviewAuthor}=require("../views/middleware.js")
const reviewController=require("../controllers/reviews.js");

//post rooute
router.post("/",isloggedIn,validateReview,wrapAsync(reviewController.createReview));
//DElete review route
router.delete("/:reviewId",isloggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;