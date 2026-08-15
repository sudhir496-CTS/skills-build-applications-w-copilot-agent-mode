import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  title: string;
  caloriesBurned: number;
  durationMinutes: number;
  distanceKm?: number;
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['Running', 'Cycling', 'Swimming', 'Strength', 'Yoga', 'Hiking'], required: true },
    title: { type: String, required: true, trim: true },
    caloriesBurned: { type: Number, required: true, min: 0 },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    date: { type: Date, default: Date.now },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
