import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Journal = mongoose.model('Journal', journalSchema);
export default Journal;
