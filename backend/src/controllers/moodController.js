import Mood from '../models/Mood.js';

// @desc    Get user moods
// @route   GET /api/moods
export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new mood
// @route   POST /api/moods
export const createMood = async (req, res) => {
  try {
    const { mood, note } = req.body;

    const newMood = new Mood({
      userId: req.user._id,
      mood,
      note,
    });

    const createdMood = await newMood.save();
    res.status(201).json(createdMood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
