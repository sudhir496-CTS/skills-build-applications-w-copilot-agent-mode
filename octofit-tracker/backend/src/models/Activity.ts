import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number, default: 0 },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true },
    notes: { type: String, default: '' },
  },
  { timestamps: true },
);

const Activity = model('Activity', activitySchema);

export default Activity;
