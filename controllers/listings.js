// const Listing=require("../models/listing.js");

// module.exports.index=async(req,res)=>{
//      const allListings=await Listing.find({});
//      res.render("listings/index",{allListings});
// };
// module.exports.renderNewForm=(req,res)=>{
//     res.render("listings/new");
// }
// module.exports.showListing=async(req,res)=>{
//     let {id}=req.params;
//     const listing=await Listing.findById(id)
//     .populate({
//       path:"reviews",
//     populate:{
//       path:"author",
//     },
//   }).populate("owner");
//     if(!listing){
//               req.flash("error","listing you requested for dosent exist");
//               res.redirect("/listings");
//     }
//     console.log(listing);
//     res.render("listings/show.ejs",{listing});
// }
// module.exports.createListing = async (req, res, next) => {

//   let url = req.file.path;
//   let filename = req.file.filename;
//   const newListing = new Listing(req.body.listing);
//   newListing.owner = req.user._id;
//   newListing.image = { url, filename };
//   await newListing.save();
//   req.flash("success", "New Listing is created");
//   res.redirect("/listings");
// };
// module.exports.renderEditForm=async(req,res)=>{
//   let {id}=req.params;
//   const listing= await Listing.findById(id);
//   if(!listing){
//     req.flash("error","Listing you requested for dosent exist");
//     return res.redirect("/Listings");
//   }
//   let originalImgUrl = listing.image.url;
//   originalImgUrl = originalImgUrl.replace("/upload", "/upload/w_250")
//   res.render("listings/edit.ejs",{listing});

// }    

// module.exports.updateListing=async(req,res)=>{
//   let {id}=req.params;
//   let listing=await Listing.findByIdAndUpdate(id, {...req.body.listing});
//   if (typeof req.file !== "undefined") {
//     let url = req.file.path;
//     let filename = req.file.filename;
//     listing.image = { url, filename };
//     await listing.save();
//   }
//   req.flash("success","Listing updated");
//   res.redirect(`/listings/${id}`);

// }

// module.exports.destroyListing=async(req,res)=>{
//       let {id}=req.params;
//       let deletedListing=await Listing.findByIdAndDelete(id);
//       console.log(deletedListing);
//             req.flash("success","New Listing Deleted");
//       res.redirect("/listings");
//   }




//   const Listing = require("../models/listing.js");

// module.exports.index = async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index", { allListings });
// };

// module.exports.renderNewForm = (req, res) => {
//   res.render("listings/new");
// };

// module.exports.showListing = async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id)
//     .populate({
//       path: "reviews",
//       populate: {
//         path: "author",
//       },
//     })
//     .populate("owner");

//   if (!listing) {
//     req.flash("error", "Listing you requested for doesn't exist");
//     return res.redirect("/listings");
//   }

//   res.render("listings/show.ejs", { listing });
// };

// module.exports.createListing = async (req, res, next) => {
//   const newListing = new Listing(req.body.listing);
//   newListing.owner = req.user._id;

//   if (req.file) {
//     const url = req.file.path;
//     const filename = req.file.filename;
//     newListing.image = { url, filename };
//   }

//   await newListing.save();
//   req.flash("success", "New Listing is created");
//   res.redirect("/listings");
// };

// module.exports.renderEditForm = async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);

//   if (!listing) {
//     req.flash("error", "Listing you requested for doesn't exist");
//     return res.redirect("/listings");
//   }

//   // Optional resizing logic, safe and non-destructive
//   let originalImgUrl = listing.image.url;
//   listing.resizedImageUrl = originalImgUrl.replace("/upload", "/upload/w_250");

//   // res.render("listings/edit.ejs", { listing });
//   res.render("listings/edit.ejs", { listing, originalImageUrl });
// };

// module.exports.updateListing = async (req, res) => {
//   let { id } = req.params;
//   let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

//   if (req.file) {
//     const url = req.file.path;
//     const filename = req.file.filename;
//     listing.image = { url, filename };
//     await listing.save();
//   }

//   req.flash("success", "Listing updated");
//   res.redirect(`/listings/${id}`);
// };

// module.exports.destroyListing = async (req, res) => {
//   let { id } = req.params;
//   const deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing);

//   req.flash("success", "Listing deleted");
//   res.redirect("/listings");
// };





const Listing = require("../models/listing.js");
module.exports.index = async (req,res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , { allListings });
}

module.exports.newForm = (req,res) =>{
    res.render("listings/new.ejs");

}

module.exports.showListing = async (req,res,next) =>{
    let  {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path :"reviews",
     populate:{path:"author"},
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested does not exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{ listing });
}

module.exports.createListing = async (req,res ,next) =>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success" , "New Listing Created!");
    res.redirect("/listings");

}

module.exports.editForm = async(req,res) =>{
    let  {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested does not exist");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload" ,"/upload/h_300,w_250");
    res.render("listings/edit.ejs",{ listing, originalImageUrl});
}

module.exports.updateListing = async (req,res) =>{
    let  {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();

    }
    
    req.flash("success" , "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req,res) =>{
    let  {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success" , "Listing Deleted!");
    res.redirect("/listings");

}