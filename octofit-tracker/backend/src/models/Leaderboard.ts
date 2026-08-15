import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    teamName: { type: String, required: true },
    score: { type: Number, required: true },
    workoutsCompleted: { type: Number, required: true },
    streakDays: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  { timestamps: true },
);

const Leaderboard = model('Leaderboard', leaderboardSchema);

export default Leaderboard;
