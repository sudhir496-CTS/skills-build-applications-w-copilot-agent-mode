import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

dotenv.config();

const seedDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

  console.log('Seed the octofit_db database with test data');

  try {
    await mongoose.connect(mongoUri);

    await mongoose.connection.db?.dropDatabase();

    const users = await User.insertMany([
      {
        username: 'ava_williams',
        email: 'ava@example.com',
        name: 'Ava Williams',
        fitnessLevel: 'advanced',
        goals: ['5K', 'strength gain'],
        teamName: 'Trail Blazers',
      },
      {
        username: 'marco_chen',
        email: 'marco@example.com',
        name: 'Marco Chen',
        fitnessLevel: 'intermediate',
        goals: ['half marathon', 'mobility'],
        teamName: 'Trail Blazers',
      },
      {
        username: 'sophia_lee',
        email: 'sophia@example.com',
        name: 'Sophia Lee',
        fitnessLevel: 'beginner',
        goals: ['weight loss', 'core strength'],
        teamName: 'Summit Squad',
      },
      {
        username: 'niko_jordan',
        email: 'niko@example.com',
        name: 'Niko Jordan',
        fitnessLevel: 'advanced',
        goals: ['cycling endurance', 'race prep'],
        teamName: 'Summit Squad',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        sport: 'Trail Running',
        description: 'A team focused on endurance and technical trail performance.',
        members: users.slice(0, 2).map((user) => user._id),
      },
      {
        name: 'Summit Squad',
        sport: 'Cross-training',
        description: 'A balanced team training for strength, cardio, and resilience.',
        members: users.slice(2).map((user) => user._id),
      },
    ]);

    const activities = await Activity.insertMany([
      {
        userId: users[0]._id,
        userName: users[0].username,
        type: 'Run',
        durationMinutes: 42,
        distanceKm: 8.4,
        caloriesBurned: 540,
        date: new Date('2026-08-10T06:30:00Z'),
        notes: 'Tempo run with steady pacing and hill intervals.',
      },
      {
        userId: users[1]._id,
        userName: users[1].username,
        type: 'Strength',
        durationMinutes: 55,
        distanceKm: 0,
        caloriesBurned: 420,
        date: new Date('2026-08-12T18:00:00Z'),
        notes: 'Lower-body strength circuit with squats and lunges.',
      },
      {
        userId: users[2]._id,
        userName: users[2].username,
        type: 'Yoga',
        durationMinutes: 30,
        distanceKm: 0,
        caloriesBurned: 180,
        date: new Date('2026-08-11T07:00:00Z'),
        notes: 'Mobility flow and recovery stretching.',
      },
      {
        userId: users[3]._id,
        userName: users[3].username,
        type: 'Cycling',
        durationMinutes: 60,
        distanceKm: 24,
        caloriesBurned: 610,
        date: new Date('2026-08-13T05:45:00Z'),
        notes: 'High-cadence interval ride to build endurance.',
      },
    ]);

    const leaderboardEntries = await Leaderboard.insertMany([
      {
        userId: users[0]._id,
        username: users[0].username,
        teamName: teams[0].name,
        score: 920,
        workoutsCompleted: 12,
        streakDays: 8,
        rank: 1,
      },
      {
        userId: users[3]._id,
        username: users[3].username,
        teamName: teams[1].name,
        score: 890,
        workoutsCompleted: 11,
        streakDays: 6,
        rank: 2,
      },
      {
        userId: users[1]._id,
        username: users[1].username,
        teamName: teams[0].name,
        score: 845,
        workoutsCompleted: 10,
        streakDays: 5,
        rank: 3,
      },
      {
        userId: users[2]._id,
        username: users[2].username,
        teamName: teams[1].name,
        score: 780,
        workoutsCompleted: 9,
        streakDays: 4,
        rank: 4,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Hill Sprint Intervals',
        focusArea: 'cardio',
        durationMinutes: 35,
        difficulty: 'advanced',
        equipment: ['Running shoes', 'Cones'],
        instructions: [
          'Warm up for 8 minutes with light jogging.',
          'Sprint uphill for 20 seconds, recover for 60 seconds.',
          'Repeat 8 rounds and cool down for 5 minutes.',
        ],
      },
      {
        title: 'Core Stability Circuit',
        focusArea: 'core',
        durationMinutes: 25,
        difficulty: 'beginner',
        equipment: ['Mat'],
        instructions: [
          'Perform 12 dead bugs for each side.',
          'Complete 15 bird dogs per side.',
          'Finish with a 2-minute plank hold.',
        ],
      },
      {
        title: 'Power Ride',
        focusArea: 'cycling',
        durationMinutes: 45,
        difficulty: 'intermediate',
        equipment: ['Bike', 'Helmet'],
        instructions: [
          'Cycle at a moderate cadence for 10 minutes.',
          'Increase resistance for 5 rounds of 2-minute hard efforts.',
          'Recover for 2 minutes between efforts.',
        ],
      },
    ]);

    console.log(`Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboardEntries.length} leaderboard entries, and 3 workouts.`);
    await mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
