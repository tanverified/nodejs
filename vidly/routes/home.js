const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Genres API - Server is Live");
  });

  module.exports = router;