const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// module.exports.index = async(req,res) =>{
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", {allListings});
// };

module.exports.renderNewForm = (req,res) =>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate:{
            path: "author",
        }
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exists!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async(req,res,next) =>{
 
    let response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send();
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    newListing.geometry = response.body.features[0].geometry;
    // let tags = req.body.listing.tag;
    let {tag} = req.body.listing;
    tag = Array.isArray(tag) ? tag : [tag];
    // newListing.tag = Array.isArray(req.body.listing.tag) ? req.body.listing.tag : [req.body.listing.tag];
    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success","New Listing Created !");
    res.redirect("/listings");
};

module.exports.renderEditForm = async(req,res)=>{

    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exists!");
        res.redirect("/listings");
    }
    let orignalImageUrl = listing.image.url;
    orignalImageUrl = orignalImageUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", {listing, orignalImageUrl});
};

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url , filename};
        await listing.save();
    }
    req.flash("success","Listing Updated !");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req,res)=> {
    let{id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted !");
    console.log(deletedListing);
    res.redirect("/listings");
};


module.exports.search = async (req, res) => {
    const { query } = req.body;
   
    
    if(query.length === 0){
        req.flash("error","Please enter something in search box for searching.");
        return res.redirect("/listings");
    }
    if (query && query.trim()) {
      const regex = new RegExp(query.trim(), 'i'); // Case-insensitive search
      const searchQuery = {
        $or: [{ country: regex }, { title: regex }],
      };
      const results = await Listing.find(searchQuery);
      
      
      if(results.length===0){
        req.flash("error","No listing found");
        return res.redirect("/listings");
      }
      res.render("listings/search.ejs",{results})
    } else {
      req.flash("error","Error found");
    }
  };


  module.exports.index = async (req, res) => {
    try {
        const { tag } = req.query;
        
        
        let allListings;

        // Check if tag is present in query
        if (tag) {
            // Search for listings where the tags array contains the selected tag
            allListings = await Listing.find({ tag: { $in: [tag] } });
            
            // If no listings are found for the tag, flash a message
            if (allListings.length === 0) {
                req.flash('error', `No listings found for the tag "${tag}".`);
                return res.redirect("/listings");
            }
            
            // console.log(listings);
        } else {
            // If no tag is selected, return all listings
            allListings = await Listing.find({});
        }

        // Render the listings page and pass the listings and tag data
        res.render("listings/index.ejs", { allListings, tag });

    } catch (err) {
        console.error("Error fetching listings:", err);
        req.flash("error", "Error fetching listings");
        return res.redirect("/");  // Redirect to the homepage on error
    }
};