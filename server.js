const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname));

mongoose.connect("mongodb+srv://wclow0420:Wclow0420@cluster0.dopbcqd.mongodb.net/tsukidoDB", {useNewUrlParser: true }, {useUnifiedTopology: true})

//create a data schema
const TsukidoSchema = {
  name: String,
  email: String,
  phone: Number,
  gender: String,
  dob: Date,
  verificationCode: String,
  verificationStatus: String
}

const Subscriber = mongoose.model("Subscriber", TsukidoSchema);

const transporter = nodemailer.createTransport({
  service: 'gmail', // e.g., 'Gmail', 'Yahoo', etc.
  auth: {
    user: 'lowwc-wm21@student.tarc.edu.my',
    pass: '020420100779'
  }
});

app.post("/",async function(req, res){
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const gender = req.body.gender;
  const dob = req.body.dob;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^(01\d{8,10})$/;

  if (!name || !email || !phone || !gender || !dob) {
    return res.send('<script>alert("Please fill in all fields before subscribing."); window.location.href = "/";</script>');
  } else if (!emailPattern.test(email)) {
    return res.send('<script>alert("Please enter a valid email address."); window.location.href = "/";</script>');
  } else if (!phonePattern.test(phone)) {
    return res.send('<script>alert("Please enter a valid phone number."); window.location.href = "/";</script>');
  } else {
    try {
      // Check for duplicates in the database
      const existingData = await Subscriber.find({ $or: [{ email: email }, { phone: phone }] });
      if (existingData.length > 0) {
        return res.send('<script>alert("Email or phone number already exists."); window.location.href = "/";</script>');
      }

      // Generate a verification code
    const verificationCode = crypto.randomBytes(3).toString('hex');

      // Send verification email containing the verificationCode
      const mailOptions = {
        from: 'lowwc-wm21@student.tarc.edu.my',
        to: email,
        subject: 'Email Verification',
        html: `Click the following link to verify your email: <a href="http://localhost:3000/verify-email?code=${verificationCode}">Verify Email</a>`
      };

      const sendMailPromise = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
  
      // Wait for the email to be sent before continuing
      await sendMailPromise;

      const newSubscriber = new Subscriber({
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        dob: dob,
        verificationCode: verificationCode,
        verificationStatus: "unverified"
      });

        await newSubscriber.save();
        return res.send('<script>alert("Please check your email for verification link."); window.location.href = "/";</script>');
    } catch (error) {
      console.error(error);
      return res.send('<script>alert("An error occurred. Please try again later."); window.location.href = "/";</script>');
    }
  }
});

app.get("/verify-email", async function(req, res) {
  const verificationCode = req.query.code;

  // Find the subscriber with the corresponding verification code
  const subscriber = await Subscriber.findOne({ verificationCode });

  if (!subscriber) {
    // Handle case when verification code is not found
    return res.send("Invalid verification code.");
  }

  // Update the subscriber's verification status to "verified"
  subscriber.verificationStatus = "verified";
  await subscriber.save();
  return res.send('<script>alert("Email verification successful!/n Subscription successful. Have a nice day!"); window.location.href = "/";</script>');
});

app.listen(3000, function(){
  console.log("Server is running on 3000");
})
