const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isloggedIn,isOwner,validateListing}=require("../views/middleware.js")
const listingController=require("../controllers/listings");

router
.route("/")
.get(wrapAsync(listingController.index))
.post(isloggedIn, validateListing,wrapAsync(listingController.createListing));

//new route
router.get("/new",isloggedIn,listingController.renderNewForm);//15
router
.route("/:id")
.get(wrapAsync(listingController.showListing))//14
.put(isloggedIn,validateListing,wrapAsync(listingController.updateListing))
.delete(isloggedIn,isOwner,wrapAsync(listingController.destroyListing));


//index route
// router.get("/",wrapAsync(listingController.index));//10
//show route
// router.get("/:id",wrapAsync(listingController.showListing));//14
//create route 16
// router.post("/",isloggedIn, validateListing,wrapAsync(listingController.createListing));
//Edit route 17
router.get("/:id/edit",isloggedIn,isOwner,wrapAsync(listingController.renderEditForm));
//Update route 18
// router.put("/:id",isloggedIn,validateListing,wrapAsync(listingController.updateListing));
//delete route 19
// router.delete("/:id",isloggedIn,isOwner,wrapAsync(listingController.destroyListing));


module.exports=router;