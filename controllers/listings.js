const Listing=require("../models/listing.js");

module.exports.index=async(req,res)=>{
     const allListings=await Listing.find({});
     res.render("listings/index",{allListings});
};
module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new");
}
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({
      path:"reviews",
    populate:{
      path:"author",
    },
  }).populate("owner");
    if(!listing){
              req.flash("error","listing you requested for dosent exist");
              res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
}
module.exports.createListing=async(req, res,next) => {
   
    const newListing = new Listing(req.body.listing); 
       newListing.owner=  req.user._id;
      await newListing.save();
      req.flash("success","New Listing Created");
      res.redirect("/listings");
    };
module.exports.renderEditForm=async(req,res)=>{
      let {id}=req.params;
      const listing= await Listing.findById(id);
      if(!listing){
        req.flash("error","Listing you requested for dosent exist");
        res.redirect("/Listings");
      }
      res.render("listings/edit.ejs",{listing});
  
  }    

module.exports.updateListing=async(req,res)=>{
      let {id}=req.params;
      let listing=await Listing.findById(id);
      if(!listing.owner.equals(req.user._id)){
        req.flash("error","you dont have permission to edit");
        res.redirect(`/listings/${id}`);
      }
      
      await Listing.findByIdAndUpdate(id,{...req.body.listing});
      req.flash("success","Listing updated");
      res.redirect(`/listings/${id}`);
  }

module.exports.destroyListing=async(req,res)=>{
      let {id}=req.params;
      let deletedListing=await Listing.findByIdAndDelete(id);
      console.log(deletedListing);
            req.flash("success","New Listing Deleted");
      res.redirect("/listings");
  }