import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  team?: mongoose.Types.ObjectId;
  points: number;
  streak: number;
  weeklyGoal: number;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0, min: 0 },
    streak: { type: Number, default: 0, min: 0 },
    weeklyGoal: { type: Number, default: 150, min: 0 }
  },
  { timestamps: true }
);

const Leaderboard = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);

export default Leaderboard;
