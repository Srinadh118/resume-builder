const mongoose = require('mongoose');

const customTemplateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    default: 'My Custom Template'
  },
  layout: {
    type: mongoose.Schema.Types.Mixed,
    default: () => ({
      sections: ['generalInfo', 'contactInfo', 'summary', 'experience', 'education', 'skills', 'certifications'],
      layoutType: 'stacked', // 'stacked', 'sidebar-left', 'sidebar-right'
      sidebarSections: ['contactInfo', 'skills'],
      mainSections: ['generalInfo', 'summary', 'experience', 'education', 'certifications']
    })
  },
  styles: {
    type: mongoose.Schema.Types.Mixed,
    default: () => ({
      fontFamily: 'Inter',
      fontSizeScale: 'medium', // 'small', 'medium', 'large'
      accentColor: '#171717',
      textColor: '#4d4d4d',
      backgroundColor: '#ffffff',
      sectionTitleColor: '#171717',
      spacing: 'comfortable', // 'compact', 'comfortable', 'loose'
      showSeparators: true
    })
  },
  illustrations: {
    type: mongoose.Schema.Types.Mixed,
    default: () => ({
      type: 'none', // 'none', 'top-banner', 'left-border', 'geometric-header', 'custom-svg'
      customSvgCode: '',
      color: '#171717'
    })
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('CustomTemplate', customTemplateSchema);
