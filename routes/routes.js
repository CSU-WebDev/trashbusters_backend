const express = require('express');

const router = express.Router()
const Model = require('../models/model')

module.exports = router;

router.post('/addPin', async (req, res) => {
    console.log(req)
    const data = new Model({
        lat: req.body.lat,
        lng: req.body.lng,
        desc: req.body.desc
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// //Get all Method
router.get('/getPins', async (req, res) => {
    try {
      const pins = await Model.find({});
      res.status(200).json(pins);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// //Update by ID Method
// router.patch('/update/:id', (req, res) => {
//     res.send('Update by ID API')
// })

//Delete by ID Method
router.delete('/deletePin/:_id', async (req, res) => {
  try {
    const deletedPin = await Model.findByIdAndDelete(req.params._id);
    if (!deletedPin) {
      return res.status(404).json({ message: 'Pin not found' });
    }
    res.status(200).json(deletedPin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});