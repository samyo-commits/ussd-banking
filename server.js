require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/ussd", (req, res) => {
    let { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = "";

    if (text === "") {
        response = "CON Welcome to Bank USSD\n1. Check Balance\n2. Transfer Money\n3. Exit";
    } else if (text === "1") {
        response = "CON Enter your PIN to check balance:";
    } else if (text.startsWith("1*")) {
        response = "END Your account balance is $500.";
    } else if (text === "2") {
        response = "CON Enter recipient phone number:";
    } else if (text.startsWith("2*")) {
        response = "CON Enter amount to transfer:";
    } else if (text.match(/^2\\d+\\d+$/)) {
        response = "CON Enter PIN to confirm:";
    } else if (text.match(/^2\\d+\\d+\*\d+$/)) {
        response = "END Transfer successful!";
    } else {
        response = "END Invalid input.";
    }

    res.set("Content-Type", "text/plain");
    res.send(response);
});

const PORT = process.env.PORT || 4000;

// Debugging log
console.log("PORT value:", PORT);

app.listen(PORT, () => {
    console.log(`USSD server running on port ${process.env.PORT}`);
});