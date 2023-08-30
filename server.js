const express = require("express");
const mongoose = require('mongoose');
const app = express();

const uri = "mongodb+srv://wclow0420:Wclow0420@cluster0.dopbcqd.mongodb.net/tsukidoDB?retryWrites=true&w=majority"; // Replace with your MongoDB URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.error(error);
  });

const subscriptionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

app.use(express.json()); // Parse JSON data in requests

app.post('/subscribe', async (req, res) => {
  const { name, email, phone, gender, dob } = req.body;

  // Your validation logic...

  try {
    // Check for duplicates
    const existingData = await Subscription.find({ $or: [{ email: email }, { phone: phone }] });
    if (existingData.length > 0) {
      return res.status(400).json({ success: false, message: "Email or phone number already exists." });
    }

    // Save data to the database
    const newSubscription = new Subscription({
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      dob: dob // Include DOB in the schema
    });
    await newSubscription.save();

    return res.json({ success: true, message: "Subscription successful." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
