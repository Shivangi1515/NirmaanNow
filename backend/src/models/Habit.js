import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Health', 'Study', 'Work', 'Mindfulness', 'Fitness', 'Other'],
      default: 'Other',
    },
    frequency: {
      type: String,
      enum: ['Daily', 'Weekly'],
      default: 'Daily',
    },
    completedDates: [
      {
        type: String, // Store dates as YYYY-MM-DD
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model('Habit', habitSchema);
export default Habit;
