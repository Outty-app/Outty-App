const express = require('express');
const router = express.Router();
const { createProfile, getProfile, updateProfile, deleteProfile } = require('../services/profileServices')


//using /:uid as dynamic parameter to create profile
router.post('/:uid', async (req, res) =>{
    try{
        console.log(typeof req.body, req.body);
        const profile = await createProfile(req.params.uid, req.body);
        res.json(profile);
    }catch (error) {
        console.log(error);
        res.status(500).json('Invalid Credentials')
    }
})

//using /:uid as dynamic parameter to read profile
router.get('/:uid', async (req, res) => {
    try{
        const profile = await getProfile(req.params.uid);
        res.json(profile);
    }catch (error) {
        console.log(error);
        res.status(500).json('Invalid Credentials')
    }
});

//using /:uid as dynamic parameter to edit profile
router.patch('/:uid', async (req, res) => {
    try{
        const profile = await updateProfile(req.params.uid, req.body);
        res.json(profile);
    }catch (error) {
        console.log(error);
        res.status(500).json('Invalid Credentials')
    }
});

//using /:uid as dynamic parameter to delete profile
router.delete('/:uid', async(req, res) => {
    try{
        const profile = await deleteProfile(req.params.uid);
        res.json(profile);
    }catch (error) {
        console.log(error);
        res.status(500).json('Invalid Credentials')
    }
});

module.exports = router;