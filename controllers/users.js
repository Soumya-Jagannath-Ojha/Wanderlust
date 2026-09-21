const User = require("../models/user");

module.exports.Signup = async(req,res,next)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        if (req.file) {
            newUser.profilePhoto = { url: req.file.path, filename: req.file.filename };
        }
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to TravelNest!");
            res.redirect("/listings");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.updateProfile = async(req,res)=>{
    try {
        let user = await User.findById(req.user._id);
        
        // Update basic fields if they are submitted
        if(req.body.username && req.body.username !== user.username) {
            // Note: updating username for passport-local-mongoose might require special handling,
            // but we will allow updating it directly or just update email.
            user.username = req.body.username;
        }
        if(req.body.email) {
            user.email = req.body.email;
        }

        if(req.file){
            user.profilePhoto = { url: req.file.path, filename: req.file.filename };
        }
        
        await user.save();
        req.flash("success", "Profile updated successfully!");
        res.redirect("/profile");
    } catch(err) {
        req.flash("error", "Failed to update profile.");
        res.redirect("/profile");
    }
};

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.renderProfile = (req, res) => {
    res.render("users/profile.ejs");
};

module.exports.login = async(req,res) =>{
    req.flash("success","Welcome to TravelNest!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    })
};

module.exports.renderFavorites = async (req, res) => {
    const user = await User.findById(req.user._id).populate('favorites');
    res.render("users/favorites.ejs", { favorites: user.favorites });
};