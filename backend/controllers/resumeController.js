const Resume = require('../models/Resume');
const calculateATSScore = require('../utils/atsScorer');

exports.getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.userId }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ 
      _id: req.params.id, 
      user: req.user.userId 
    });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createResume = async (req, res) => {
  try {
    const { title, generalInfo, contactInfo, education, experience, settings, skills } = req.body;

    const resume = new Resume({
      user: req.user.userId,
      title: title || 'Untitled Resume',
      generalInfo,
      contactInfo,
      education: education || [],
      experience: experience || [],
      settings,
      skills: skills || []
    });

    resume.atsScore = calculateATSScore(resume.toObject());
    await resume.save();

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateResume = async (req, res) => {
  try {
    const { title, generalInfo, contactInfo, education, experience, settings, skills } = req.body;

    const resume = await Resume.findOne({ 
      _id: req.params.id, 
      user: req.user.userId 
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (title !== undefined) resume.title = title;
    if (generalInfo) resume.generalInfo = { ...resume.generalInfo, ...generalInfo };
    if (contactInfo) resume.contactInfo = { ...resume.contactInfo, ...contactInfo };
    if (education) resume.education = education;
    if (experience) resume.experience = experience;
    if (settings) resume.settings = { ...resume.settings, ...settings };
    if (skills) resume.skills = skills;

    resume.atsScore = calculateATSScore(resume.toObject());
    await resume.save();

    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.userId 
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.userId });
    
    const sortedByScore = [...resumes].sort((a, b) => b.atsScore - a.atsScore);
    
    const dummies = await Resume.find({ isDummy: true }).limit(2);

    res.json({
      resumes,
      highestScore: sortedByScore[0] || null,
      lowestScore: sortedByScore[sortedByScore.length - 1] || null,
      dummies
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
