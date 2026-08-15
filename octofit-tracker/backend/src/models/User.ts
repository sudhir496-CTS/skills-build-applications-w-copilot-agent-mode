import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    goals: [{ type: String }],
    teamName: { type: String, default: '' },
  },
  { timestamps: true },
);

const User = model('User', userSchema);

export default User;
