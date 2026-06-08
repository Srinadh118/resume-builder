const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const customTemplateController = require('../controllers/customTemplateController');

router.use(verifyToken);

router.get('/', customTemplateController.getAllCustomTemplates);
router.get('/:id', customTemplateController.getCustomTemplateById);
router.post('/', customTemplateController.createCustomTemplate);
router.put('/:id', customTemplateController.updateCustomTemplate);
router.delete('/:id', customTemplateController.deleteCustomTemplate);

module.exports = router;
