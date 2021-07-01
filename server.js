// chunk 1
// configuring server
const express = require("express");
const request = require("request");
const sendMail = require("./mail");
const log = console.log;
const app = express();
const path = require("path");

const PORT = 5500;

//app.use(express.static(path.join(__dirname, 'public')));
// chunk 2
// Data Parsing

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

app.post("/email", (req, res) => {
  //TO DO
  // SEND EMAIL HERE
  const { subject, email, text, response_key } = req.body;

  console.log("Data: ", req.body);
  const secret_key = "6LeUW2YbAAAAAE06pQ5QieVZGzY4yD69WqO64ACF";
  const verification_url =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secret_key +
    "&response=" +
    response_key;

  if (
    request(verification_url, function (error, response, body) {
      return JSON.parse(body).success;
    })
  ) {
    sendMail(email, subject, text, function (err, data) {
      if (err) {
        res.status(500).json({ message: "Internal Error" });
      } else {
        res.json({ message: "Email sent!!!!!!!! yay" });
      }
    });

    console.log("you are not a bot");
  } else {
    console.log("You are a bot!");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(PORT, () => log("Server is starting on PORT, ", 5500));
