import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  focus: string;
  difficulty: string;
  durationMinutes: number;
  exercises: string[];
  recommendedFor: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    durationMinutes: { type: Number, required: true, min: 10 },
    exercises: [{ type: String, required: true }],
    recommendedFor: [{ type: String, required: true }]
  },
  { timestamps: true }
);

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);\n
export default Workout;
