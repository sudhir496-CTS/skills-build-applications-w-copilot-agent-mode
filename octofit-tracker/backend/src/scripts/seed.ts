import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Workout from '../models/Workout';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const seedDatabase = async (): Promise<void> => {
  console.log('Seed the octofit_db database with test data');

  try {
    await mongoose.connect(mongoUri);
    await mongoose.connection.db?.dropDatabase();

    const users = await User.insertMany([
      {
        username: 'ava_runs',
        email: 'ava@example.com',
        password: 'hashed-password-1',
        firstName: 'Ava',
        lastName: 'Nguyen',
        fitnessLevel: 'Advanced'
      },
      {
        username: 'leo_swims',
        email: 'leo@example.com',
        password: 'hashed-password-2',
        firstName: 'Leo',
        lastName: 'Martinez',
        fitnessLevel: 'Intermediate'
      },
      {
        username: 'maya_cycles',
        email: 'maya@example.com',
        password: 'hashed-password-3',
        firstName: 'Maya',
        lastName: 'Patel',
        fitnessLevel: 'Intermediate'
      },
      {
        username: 'noah_strength',
        email: 'noah@example.com',
        password: 'hashed-password-4',
        firstName: 'Noah',
        lastName: 'Kim',
        fitnessLevel: 'Beginner'
      }
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'Endurance-focused group training and mountain challenges.',
        captain: users[0]._id,
        members: [users[0]._id, users[1]._id, users[2]._id]
      },
      {
        name: 'Iron Pulse',
        description: 'Strength and conditioning team for personal bests.',
        captain: users[3]._id,
        members: [users[3]._id, users[2]._id]
      }
    ]);

    await User.updateMany(
      { _id: { $in: teams[0].members } },
      { $set: { team: teams[0]._id } }
    );

    await User.updateMany(
      { _id: { $in: teams[1].members } },
      { $set: { team: teams[1]._id } }
    );

    await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Running',
        title: 'Sunrise 5K',
        caloriesBurned: 420,
        durationMinutes: 32,
        distanceKm: 5.1,
        date: new Date('2026-08-10T06:15:00Z'),
        notes: 'Strong pace with two tempo intervals.'
      },
      {
        user: users[1]._id,
        type: 'Swimming',
        title: 'Laps and form drills',
        caloriesBurned: 350,
        durationMinutes: 40,
        distanceKm: 1.8,
        date: new Date('2026-08-11T18:30:00Z'),
        notes: 'Focused on breathing rhythm.'
      },
      {
        user: users[2]._id,
        type: 'Cycling',
        title: 'Hill climb session',
        caloriesBurned: 510,
        durationMinutes: 48,
        distanceKm: 18.4,
        date: new Date('2026-08-12T07:10:00Z'),
        notes: 'Improved climbing cadence.'
      },
      {
        user: users[3]._id,
        type: 'Strength',
        title: 'Upper body circuit',
        caloriesBurned: 285,
        durationMinutes: 35,
        date: new Date('2026-08-13T17:45:00Z'),
        notes: 'Completed three rounds with good control.'
      }
    ]);

    await Leaderboard.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        points: 1850,
        streak: 12,
        weeklyGoal: 180
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        points: 1600,
        streak: 9,
        weeklyGoal: 160
      },
      {
        user: users[2]._id,
        team: teams[0]._id,
        points: 1540,
        streak: 7,
        weeklyGoal: 170
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        points: 1425,
        streak: 4,
        weeklyGoal: 150
      }
    ]);

    await Workout.insertMany([
      {
        title: 'Power Interval Run',
        focus: 'Cardio',
        difficulty: 'Advanced',
        durationMinutes: 35,
        exercises: ['Warm-up jog', 'Sprint intervals', 'Recovery walk', 'Cooldown stretch'],
        recommendedFor: ['Ava', 'Leo']
      },
      {
        title: 'Core and Mobility Flow',
        focus: 'Recovery',
        difficulty: 'Beginner',
        durationMinutes: 25,
        exercises: ['Plank variations', 'Bird dogs', 'Hip openers', 'Breathing drills'],
        recommendedFor: ['Maya', 'Noah']
      },
      {
        title: 'Leg Day Strength Circuit',
        focus: 'Strength',
        difficulty: 'Intermediate',
        durationMinutes: 45,
        exercises: ['Squats', 'Lunges', 'Romanian deadlifts', 'Calf raises'],
        recommendedFor: ['Noah', 'Maya']
      }
    ]);

    console.log('Seed data added successfully');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
