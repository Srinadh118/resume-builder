const mongoose = require('mongoose');

const generalInfoSchema = new mongoose.Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  title: { type: String, default: '' },
  summary: { type: String, default: '' },
  age: { type: Number, default: null }
}, { _id: false });

const contactInfoSchema = new mongoose.Schema({
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  website: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  twitter: { type: String, default: '' }
}, { _id: false });

const educationSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  school: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, default: '' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, default: null },
  current: { type: Boolean, default: false },
  description: { type: String, default: '' }
}, { _id: true });

const experienceSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  company: { type: String, required: true },
  position: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, default: null },
  current: { type: Boolean, default: false },
  responsibilities: { type: [String], default: [] },
  description: { type: String, default: '' }
}, { _id: true });

const settingsSchema = new mongoose.Schema({
  theme: { type: String, default: 'modern', enum: ['professional', 'modern', 'creative', 'minimal', 'classic', 'executive', 'tech'] },
  fontSize: { type: Number, default: 12, min: 10, max: 16 },
  accentColor: { type: String, default: '#6366f1' },
  showPhoto: { type: Boolean, default: true }
}, { _id: false });

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    default: 'Untitled Resume'
  },
  generalInfo: { type: generalInfoSchema, default: () => ({}) },
  contactInfo: { type: contactInfoSchema, default: () => ({}) },
  education: { type: [educationSchema], default: [] },
  experience: { type: [experienceSchema], default: [] },
  settings: { type: settingsSchema, default: () => ({}) },
  skills: { type: [String], default: [] },
  atsScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  isDummy: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

resumeSchema.index({ user: 1 });
resumeSchema.index({ atsScore: -1 });

module.exports = mongoose.model('Resume', resumeSchema);
