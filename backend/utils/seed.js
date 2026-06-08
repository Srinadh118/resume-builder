const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Resume = require('../models/Resume');
const calculateATSScore = require('./atsScorer');
require('dotenv').config();

const dummyHighATS = {
  title: 'Elite Software Engineer Resume',
  generalInfo: {
    firstName: 'Sarah',
    lastName: 'Chen',
    title: 'Senior Software Engineer',
    summary: 'Highly accomplished software engineer with 8+ years of experience designing, developing, and optimizing scalable web applications. Proven track record of leading cross-functional teams, architecting microservices, and delivering high-impact solutions. Expert in React, Node.js, and cloud infrastructure. Spearheaded the migration of legacy systems to modern architectures, resulting in 40% performance improvements. Collaborated with product managers and designers to launch award-winning features.',
    age: 32
  },
  contactInfo: {
    email: 'sarah.chen@email.com',
    phone: '(555) 123-4567',
    website: 'https://sarahchen.dev',
    linkedin: 'https://linkedin.com/in/sarahchen',
    github: 'https://github.com/sarahchen',
    twitter: '@sarahchen_dev'
  },
  education: [
    {
      school: 'Stanford University',
      degree: 'Master of Science',
      fieldOfStudy: 'Computer Science',
      startDate: new Date('2013-09-01'),
      endDate: new Date('2015-06-01'),
      current: false,
      description: 'Specialized in distributed systems and machine learning. Graduated with honors. Published research on scalable architectures.'
    },
    {
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Engineering',
      startDate: new Date('2009-09-01'),
      endDate: new Date('2013-06-01'),
      current: false,
      description: 'Dean\'s List every semester. Led the ACM programming team to nationals.'
    }
  ],
  experience: [
    {
      company: 'Google',
      position: 'Senior Software Engineer',
      startDate: new Date('2020-01-01'),
      endDate: new Date('2024-06-01'),
      current: false,
      responsibilities: [
        'Architected and implemented a real-time data processing pipeline handling 10M+ events per second',
        'Led a team of 5 engineers in redesigning the core search infrastructure',
        'Optimized query performance, reducing latency by 60% through innovative caching strategies',
        'Collaborated with product and design teams to launch 3 major features'
      ],
      description: 'Developed and maintained critical infrastructure serving billions of users. Engineered solutions that improved system reliability by 99.99%.'
    },
    {
      company: 'Meta',
      position: 'Software Engineer',
      startDate: new Date('2017-03-01'),
      endDate: new Date('2019-12-01'),
      current: false,
      responsibilities: [
        'Implemented React components used by 500M+ users',
        'Designed and launched the new mobile messaging experience',
        'Improved build pipeline, reducing CI/CD times by 80%'
      ],
      description: 'Developed frontend features for the main Facebook app. Analyzed user behavior data to drive product decisions. Delivered impactful improvements to the mobile experience.'
    },
    {
      company: 'Netflix',
      position: 'Junior Software Engineer',
      startDate: new Date('2015-07-01'),
      endDate: new Date('2017-02-01'),
      current: false,
      responsibilities: [
        'Built recommendation algorithms improving user engagement by 25%',
        'Created monitoring tools for the recommendation pipeline'
      ],
      description: 'Collaborated with data scientists to improve the Netflix recommendation engine. Launched A/B testing framework for recommendation algorithms.'
    }
  ],
  settings: {
    theme: 'professional',
    fontSize: 12,
    accentColor: '#6366f1',
    showPhoto: true
  },
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Go', 'AWS', 'Kubernetes', 'GraphQL', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD', 'Microservices', 'Machine Learning'],
  atsScore: 0
};

const dummyLowATS = {
  title: 'Minimal Resume',
  generalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    summary: 'Looking for job. I can do anything.',
    age: null
  },
  contactInfo: {
    email: 'john@email.com'
  },
  education: [
    {
      school: 'Some University',
      degree: 'Degree',
      startDate: new Date('2010-01-01'),
      endDate: new Date('2014-01-01'),
      current: false
    }
  ],
  experience: [
    {
      company: 'Company A',
      position: 'Worker',
      startDate: new Date('2015-01-01'),
      current: true
    }
  ],
  settings: {
    theme: 'minimal',
    fontSize: 12,
    accentColor: '#94a3b8',
    showPhoto: false
  },
  skills: ['HTML']
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/resumebuilder');
    console.log('Connected to MongoDB');

    await Resume.deleteMany({ isDummy: true });
    await User.deleteMany({ email: 'demo@seed.com' });

    const demoUser = new User({
      email: 'demo@seed.com',
      password: 'password123',
      firstName: 'Demo',
      lastName: 'User'
    });
    await demoUser.save();
    console.log('Demo user created');

    const highScoreResume = new Resume({
      user: demoUser._id,
      ...dummyHighATS,
      isDummy: true
    });
    highScoreResume.atsScore = calculateATSScore(highScoreResume.toObject());
    await highScoreResume.save();
    console.log('High ATS resume created with score:', highScoreResume.atsScore);

    const lowScoreResume = new Resume({
      user: demoUser._id,
      ...dummyLowATS,
      isDummy: true
    });
    lowScoreResume.atsScore = calculateATSScore(lowScoreResume.toObject());
    await lowScoreResume.save();
    console.log('Low ATS resume created with score:', lowScoreResume.atsScore);

    await mongoose.disconnect();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
