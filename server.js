const express = require("express");
const mongojs = require("mongojs");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workout";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

db.on("error", (error) => {
  console.log("Database Error:", error);
});

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});
// Save workout to tracker's collection
app.post("/submit", (req, res) => {
  console.log(req.body);
  db.workouts.insert(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});
// Retrieve all workouts from collection
app.get("/all", (req, res) => {
  db.workouts.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});
// Retrieve one workout in collection by date
app.get("/find/:date", (req, res) => {
  db.workouts.findOne(
    {
      date: mongojs.day(req.params.date),
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});
// Update one workout in collection by date
app.post("/update/:date", (req, res) => {
  db.workouts.update(
    {
      date: mongojs.day(req.params.date),
    },
    {
      $set: {
        title: req.body.title,
        exercise: req.body.exercise,
        modified: Date.now(),
      },
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});
// View the combined weight of multiple exercises from the past seven workouts on the stats page.
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).limit(7, (error, data) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

app.listen(3000, () => {
  console.log("App running on port 3000!");
});
