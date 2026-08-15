import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    equipment: [{ type: String }],
    instructions: [{ type: String }],
  },
  { timestamps: true },
);

const Workout = model('Workout', workoutSchema);

export default Workout;
