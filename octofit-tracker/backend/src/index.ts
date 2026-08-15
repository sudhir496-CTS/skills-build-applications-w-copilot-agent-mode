import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import User from './models/User';
import Team from './models/Team';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Workout from './models/Workout';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

connectDB().catch((err) => {
  console.error('MongoDB connection error during startup:', err);
});

app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'OctoFit Tracker API',
    apiBaseUrl,
    codespaceName: codespaceName || null,
  });
});

app.get('/api/config', (_req: Request, res: Response) => {
  res.json({
    apiBaseUrl,
    codespaceName: codespaceName || null,
    port: PORT,
  });
});

app.get('/api/users', async (_req: Request, res: Response) => {
  const users = await User.find().lean();
  res.json(users);
});

app.get('/api/teams', async (_req: Request, res: Response) => {
  const teams = await Team.find().lean();
  res.json(teams);
});

app.get('/api/activities', async (_req: Request, res: Response) => {
  const activities = await Activity.find().sort({ date: -1 }).lean();
  res.json(activities);
});

app.get('/api/leaderboard', async (_req: Request, res: Response) => {
  const leaderboard = await Leaderboard.find().sort({ score: -1 }).lean();
  res.json(leaderboard);
});

app.get('/api/workouts', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

app.use((err: any, _req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
