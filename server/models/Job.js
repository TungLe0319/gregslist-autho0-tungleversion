import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
