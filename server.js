const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workout";
const collections = ["workouts"];

//const db = mongoose(databaseUrl, collections);
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout', 
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
  }
);

// db.on("error", (error) => {
//   console.log("Database Error:", error);
// });

app.use(require('./routes/api.js'));
app.use(require('./routes/html.js'));

// app.get("/exercise", (req, res) => {
//   res.sendFile(path.join(__dirname + "/public/exercise.html"));
//   db.workouts.insert(req.body, (error, data) => {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(data);
//     }
//   });
// });

app.listen(process.env.PORT || 3000, () => {
  console.log("App running on port 3000!");
});
