const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const AppModel = require("../../models/appModel");

// @route   GET api/apps
// @desc    Get All apps
// @access  Public
router.get("/", (req, res) => {
  AppModel.find()
    // .sort({ date: -1 })
    .then(apps => res.json(apps));
});

// @route   GET api/apps/:_id
// @desc    Get individual app
// @access  Public
router.get("/:_id", (req, res) => {
  AppModel.findById(req.params._id)
    .then(app => res.json(app))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   POST api/apps
// @desc    Create An App
// @access  Private
router.post("/", auth, (req, res) => {
  const newApp = new AppModel(req.body);
  newApp.save().then(app => res.json(app));
});

// @route   Update api/apps/:_id
// @desc    Update An App
// @access  Private
router.put("/:_id", auth, (req, res) => {
  const _id = req.params._id;
  AppModel.findOneAndUpdate({ _id }, { $set: req.body }, { new: true })
    .then(app => res.json(app))
    .catch(err => res.status(404).json({ success: false }));
});

// @route   DELETE api/apps/:_id
// @desc    Delete An App
// @access  Private
router.delete("/:_id", auth, (req, res) => {
  AppModel.findById(req.params._id)
    .then(app => app.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
