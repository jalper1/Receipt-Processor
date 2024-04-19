const express = require("express"); // import express
const cors = require("cors"); // import cors
const app = express(); // create express app
const PORT = process.env.PORT || 4000; // define port number

const receipts = {}; // object to store receipts

app.use(express.json()); // middleware to parse JSON
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// define route to post receipt and generate receipt id
app.post("/receipts/process", (req, res) => {
  const receiptId = generateReceiptId(); // generate receipt id
  const receiptData = {}; // object to store receipt data
  receipts[receiptId] = receiptData; // store receipt data in receipts object
  receipts[receiptId].data = req.body; // store request body in receipt data
  res.json({ id: receiptId }); // send receipt id as response json
});

// define route to get receipt points based on receipt id
app.get("/receipts/:id/points", (req, res) => {
  const receiptId = req.params.id; // get receipt id from request params
  if (receipts.hasOwnProperty(receiptId)) {
    // check if receipt id exists in receipts object
    const receiptData = receipts[receiptId].data; // get receipt data from receipts object
    const receiptPoints = generateReceiptPoints(receiptData); // generate receipt points
    receipts[receiptId].points = receiptPoints; // store receipt points in receipts object
    res.json({ points: receiptPoints }); // send receipt points as response json
  } else {
    res.status(404).json({ error: "Receipt not found" }); // send error response if receipt id not found
  }
});

// define function to get random id for receipt
function generateReceiptId() {
  return (
    Math.random().toString(36).substring(2, 10) + // generate random string of 8 characters
    "-" +
    Math.random().toString(36).substring(2, 6) + // generate random string of 4 characters
    "-" +
    Math.random().toString(36).substring(2, 6) + // generate random string of 4 characters
    "-" +
    Math.random().toString(36).substring(2, 6) + // generate random string of 4 characters
    "-" +
    Math.random().toString(36).substring(2, 12) + // generate random string of 12 characters
    Math.random().toString(36).substring(2, 4)
  );
}

// define function to generate receipt points
function generateReceiptPoints(receiptData) {
  var points = 0; // variable to track points

  points += receiptData.retailer.replace(/[^a-zA-Z0-9]/g, "").trim().length; // add up alphanumeric characters without symbols

  // add 50 points if total is a round dollar amount with no cents
  if (receiptData.total % 1 === 0) {
    points += 50;
  }

  // add 25 points if total is a multiple of 0.25
  if (receiptData.total % 0.25 === 0) {
    points += 25;
  }

  points += Math.floor(receiptData.items.length / 2) * 5; // add 5 points for every 2 items

  // add 20% of price as points for every item with a description that has a length that's a multiple of 3
  for (var i = 0; i < receiptData.items.length; i++) {
    if (receiptData.items[i].shortDescription.trim().length % 3 === 0) {
      points += Math.ceil(receiptData.items[i].price * 0.2);
    }
  }

  // add 6 points if purchase date is odd
  if (parseInt(receiptData.purchaseDate.split("-")[2]) % 2 !== 0) {
    points += 6;
  }

  // add 10 points if purchase time is between 2pm and 4pm
  if (
    receiptData.purchaseTime > "14:00" &&
    receiptData.purchaseTime < "16:00"
  ) {
    points += 10;
  }

  return points; // return total points
}
