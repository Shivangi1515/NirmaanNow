import Goal from '../models/Goal.js';

// @desc    Get user goals
// @route   GET /api/goals
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new goal
// @route   POST /api/goals
export const createGoal = async (req, res) => {
  try {
    const { title, description, category, deadline, progress } = req.body;

    const goal = new Goal({
      userId: req.user._id,
      title,
      description,
      category,
      deadline,
      progress,
    });

    const createdGoal = await goal.save();
    res.status(201).json(createdGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a goal
// @route   PUT /api/goals/:id
export const updateGoal = async (req, res) => {
  try {
    const { title, description, category, deadline, progress } = req.body;
    const goal = await Goal.findById(req.params.id);

    if (goal) {
      if (goal.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      goal.title = title || goal.title;
      goal.description = description !== undefined ? description : goal.description;
      goal.category = category || goal.category;
      goal.deadline = deadline || goal.deadline;
      goal.progress = progress !== undefined ? progress : goal.progress;

      const updatedGoal = await goal.save();
      res.json(updatedGoal);
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a goal
// @route   DELETE /api/goals/:id
export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (goal) {
      if (goal.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }
      await Goal.deleteOne({ _id: req.params.id });
      res.json({ message: 'Goal removed' });
    } else {
      res.status(404).json({ message: 'Goal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
