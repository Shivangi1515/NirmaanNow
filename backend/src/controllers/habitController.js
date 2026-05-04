import Habit from '../models/Habit.js';

// @desc    Get user habits
// @route   GET /api/habits
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new habit
// @route   POST /api/habits
export const createHabit = async (req, res) => {
  try {
    const { name, category, frequency } = req.body;

    const habit = new Habit({
      userId: req.user._id,
      name,
      category,
      frequency,
      completedDates: [],
    });

    const createdHabit = await habit.save();
    res.status(201).json(createdHabit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a habit
// @route   PUT /api/habits/:id
export const updateHabit = async (req, res) => {
  try {
    const { name, category, frequency } = req.body;
    const habit = await Habit.findById(req.params.id);

    if (habit) {
      if (habit.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      habit.name = name || habit.name;
      habit.category = category || habit.category;
      habit.frequency = frequency || habit.frequency;

      const updatedHabit = await habit.save();
      res.json(updatedHabit);
    } else {
      res.status(404).json({ message: 'Habit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a habit
// @route   DELETE /api/habits/:id
export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (habit) {
      if (habit.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }
      await Habit.deleteOne({ _id: req.params.id });
      res.json({ message: 'Habit removed' });
    } else {
      res.status(404).json({ message: 'Habit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle habit completion for a specific date
// @route   PATCH /api/habits/:id/toggle
export const toggleHabit = async (req, res) => {
  try {
    const { date } = req.body; // YYYY-MM-DD format
    const habit = await Habit.findById(req.params.id);

    if (habit) {
      if (habit.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      const dateIndex = habit.completedDates.indexOf(date);
      if (dateIndex > -1) {
        // Date exists, remove it
        habit.completedDates.splice(dateIndex, 1);
      } else {
        // Date does not exist, add it
        habit.completedDates.push(date);
      }

      const updatedHabit = await habit.save();
      res.json(updatedHabit);
    } else {
      res.status(404).json({ message: 'Habit not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
