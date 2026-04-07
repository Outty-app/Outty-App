const express = require('express');
const router = express.Router();

////using /:uid as dynamic parameter to create profile
router.post('/:uid', (req, res) =>{
    res.send('placeholder');
})

//using /:uid as dynamic parameter to read profile
router.get('/:uid', (req, res) => {
    res.send('placeholder');
});

////using /:uid as dynamic parameter to edit profile
router.patch('/:uid', (req, res) => {
    res.send('placeholder');
});

////using /:uid as dynamic parameter to delete profile
router.delete('/:uid', (req, res) => {
    res.send('placeholder');
});

module.exports = router;