import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    mood: {
      type: String,
      required: true,
      enum: ['Happy', 'Calm', 'Neutral', 'Anxious', 'Sad', 'Tired', 'Excited'],
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Mood = mongoose.model('Mood', moodSchema);
export default Mood;
