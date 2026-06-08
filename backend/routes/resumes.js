const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const resumeController = require('../controllers/resumeController');

router.use(verifyToken);

router.get('/', resumeController.getAllResumes);
router.get('/dashboard', resumeController.getDashboardData);
router.get('/:id', resumeController.getResumeById);
router.post('/', resumeController.createResume);
router.put('/:id', resumeController.updateResume);
router.delete('/:id', resumeController.deleteResume);

module.exports = router;
