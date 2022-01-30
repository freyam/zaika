const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
// Create Schema
const VendorSchema = new Schema({
	m_name: { // manager name
		type: String,
		required: true
	},
	s_name: { // shop name
		type: String,
		required: true,
		unique: true // unique email
	},
    email: { // email
		type: String,
		required: true,
		unique: true, // unique email
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	},
	c_no: { //contact number
		type: String,
		required: true,
	},
	o_time:{ //opening time
		type: String,
		required: false,
        match: [/[0-9]{2}:[0-9]{2}/, 'Please fill a valid time']//time regex 
	},
    c_time:{ //closing time
		type: String,
		required: false,
        match: [/[0-9]{2}:[0-9]{2}/, 'Please fill a valid time']//time regex 
	},
    password:{ //password
        type: String,
        required: true,
    }
});

module.exports = User = mongoose.model("Vendors", VendorSchema);
