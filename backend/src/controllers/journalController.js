import Journal from '../models/Journal.js';

// @desc    Get user journals
// @route   GET /api/journals
export const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new journal
// @route   POST /api/journals
export const createJournal = async (req, res) => {
  try {
    const { title, content, mood, prompt } = req.body;

    const journal = new Journal({
      userId: req.user._id,
      title,
      content,
      mood,
      prompt,
    });

    const createdJournal = await journal.save();
    res.status(201).json(createdJournal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a journal
// @route   DELETE /api/journals/:id
export const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (journal) {
      if (journal.userId.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }
      await Journal.deleteOne({ _id: req.params.id });
      res.json({ message: 'Journal removed' });
    } else {
      res.status(404).json({ message: 'Journal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
