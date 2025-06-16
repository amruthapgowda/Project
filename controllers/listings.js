const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res, next) => {
  try {

    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  } catch (err) {
    next(err);
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested does not exist");
      return res.redirect("/listings");
    }
    
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    next(err);
  }
};

// module.exports.createListing = async (req, res, next) => {
//   try {
//     let response = await geocodingClient
//       .forwardGeocode({
//         query: 'New Delhi, India',
//         limit: 1
//       })
//       .send()
//       .then(response => {
//         const match = response.body;
//       });

    //   console.log(response);
    //   res.send("done");
    // let url = req.file.path;
    // let filename = req.file.filename;

    // const newListing = new Listing(req.body.listing);
    // newListing.owner = req.user._id;

    // if (req.file) {
    //   newListing.image = {
    //     url: req.file.path,
    //     filename: req.file.filename,
//       };
//     }
//     newListing.image = { url, filename };
//     await newListing.save();
//     req.flash("success", "New Listing Created!");
//     res.redirect("/listings");
//   } catch (err) {
//     next(err);
//   }
// };


module.exports.createListing = async (req, res, next) => {
  try {
    const response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location, // use dynamic location from form
        limit: 1,
      })
      .send();

    // Extract geometry
    const geometry = response.body.features[0]?.geometry;

    // Log full response and extracted geometry
    console.dir(response.body, { depth: null });
    console.log("Mapbox Geocoding Result:", geometry);

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.geometry = geometry;

    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    const savedListing = await newListing.save();
    console.log("✅ Listing Saved:", savedListing);

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  } catch (err) {
    console.error("❌ Error creating listing:", err);
    next(err);
  }
};



module.exports.renderEditForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested does not exist");
      return res.redirect("/listings");
    }
    let originalImageUrl = listing.image?.url || "";
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
  } catch (err) {
    next(err);
  }
};
module.exports.updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (!listing) {
      req.flash("error", "Listing you requested does not exist");
      return res.redirect("/listings");
    }

    // If a new image is uploaded, update the image field
    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
      await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    next(err);
  }
};


module.exports.destroyListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
      req.flash("error", "Listing you requested does not exist");
      return res.redirect("/listings");
    }
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};
