const CustomTemplate = require('../models/CustomTemplate');

exports.getAllCustomTemplates = async (req, res) => {
  try {
    const templates = await CustomTemplate.find({ user: req.user.userId }).sort({ updatedAt: -1 });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCustomTemplateById = async (req, res) => {
  try {
    const template = await CustomTemplate.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json(template);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createCustomTemplate = async (req, res) => {
  try {
    const { name, layout, styles, illustrations } = req.body;

    const template = new CustomTemplate({
      user: req.user.userId,
      name: name || 'My Custom Template',
      layout,
      styles,
      illustrations
    });

    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateCustomTemplate = async (req, res) => {
  try {
    const { name, layout, styles, illustrations } = req.body;

    const template = await CustomTemplate.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    if (name !== undefined) template.name = name;
    if (layout) template.layout = layout;
    if (styles) template.styles = styles;
    if (illustrations) template.illustrations = illustrations;

    await template.save();
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteCustomTemplate = async (req, res) => {
  try {
    const template = await CustomTemplate.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.json({ message: 'Template deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
