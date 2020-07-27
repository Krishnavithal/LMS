const PORT = process.env.PORT || 5000;
const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/keys");
InitiateMongoServer();
const app = express();
const mongoose = require("mongoose");

//mongodb+srv://Krishna:<password>@cluster0.8nge8.mongodb.net/<dbname>?retryWrites=true&w=majority
//pass:krishna123
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

const auth = require("./routes/auth");
app.use("/auth", auth);
app.use(require("./routes/services"));
process.on("unhandledRejection", (error, promise) => {
  console.log(
    " Oh Lord! We forgot to handle a promise rejection here: ",
    promise
  );
  console.log(" The error was: ", error);
});
app.listen(PORT, () => {
  console.log("Listening at ", PORT);
});
