const router = require("express").Router();
const { Mongoose } = require("mongoose");
const Workout = require("../models/workout");

// Routes
router.get("/api/workouts/range", (req, res) => {
  // Workout.find({}).limit(7).then(data => {
  //     res.json(data);
  // }).catch(error => {
  //     res.send(error);
  // });
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  Workout.create(
    {
      day: Date.now(),
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

// Save workout to tracker's collection
router.post("/submit", (req, res) => {
  Workout.insert(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

// Retrieve all workouts from collection
router.get("/all", (req, res) => {
  Workout.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

// Retrieve one workout in collection by date
router.get("/find/:date", (req, res) => {
  Workout.findOne(
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
router.post("/update/:date", (req, res) => {
  Workout.update(
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

module.exports = router;
