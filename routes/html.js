const router = require('express').Router();
const path = require('path');

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "../public/index.html"));
});

router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

// View the combined weight of multiple exercises from the past seven workouts on the stats page.
router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
});

module.exports = router;
