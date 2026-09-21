const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const { signup } = require("../controllers/users.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

const userController = require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(upload.single("profilePhoto"), wrapAsync(userController.Signup)
);

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local",{
        failureRedirect: "/login",
        failureFlash: true,
    }),
        userController.login,
    )


router.get("/profile", isLoggedIn, userController.renderProfile);
router.put("/profile", isLoggedIn, upload.single("profilePhoto"), wrapAsync(userController.updateProfile));
router.get("/favorites", isLoggedIn, wrapAsync(userController.renderFavorites));
router.get("/logout", userController.logout);

module.exports = router;