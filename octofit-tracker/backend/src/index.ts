import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User';
import Team from './models/Team';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Workout from './models/Workout';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(cors());
app.use(express.json());

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'OctoFit Tracker API' });
});

app.get('/api/users', async (_req: Request, res: Response) => {
  const users = await User.find().populate('team');
  res.json(users);
});

app.get('/api/teams', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('captain').populate('members');
  res.json(teams);
});

app.get('/api/activities', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user');
  res.json(activities);
});

app.get('/api/leaderboard', async (_req: Request, res: Response) => {
  const leaderboard = await Leaderboard.find().populate('user').populate('team');
  res.json(leaderboard);
});

app.get('/api/workouts', async (_req: Request, res: Response) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

app.use((err: any, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
