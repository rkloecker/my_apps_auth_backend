const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");

var port = process.env.PORT || 3000;

// for frontend
// app.use(express.static(__dirname + "/client"));
// Bodyparser Middleware
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
  next();
});

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// mongoose.set("useFindAndModify", false);

// const AppModel = require("./models/appModel");

// Connect to Mongoose
// const mongoURI = process.env.MLABKEY;
// const mongoURI = process.env.MONGO_URI;
// // const mongoURI = process.env.MONGO_LOCAL;

// mongoose.connect(mongoURI, { useNewUrlParser: true });
// var db = mongoose.connection;

// Use Routes
app.use("/api/apps", require("./routes/api/apps"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

app.listen(port, () => console.log(`app is running on ${port}`));
