// ..........................................................................
// Imported library
// ..........................................................................
const express = require('express');
const router = express.Router();
//
// ..........................................................................
// Frontend Routes for to Get Initial Page
// ..........................................................................
//
router.get('/dashboard', ()=> {
  res.render('index');
});


module.exports = router;
