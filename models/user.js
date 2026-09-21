const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema ({
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'owner', 'viewer'],
        default: 'viewer'
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Listing'
    }],
    profilePhoto: {
        url: String,
        filename: String
    }
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);