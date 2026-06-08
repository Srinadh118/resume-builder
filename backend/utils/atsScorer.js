const calculateATSScore = (resume) => {
  let score = 0;
  let maxScore = 100;
  let points = 0;

  // General Info (25 points)
  if (resume.generalInfo) {
    if (resume.generalInfo.firstName && resume.generalInfo.lastName) points += 5;
    if (resume.generalInfo.title) points += 5;
    if (resume.generalInfo.summary && resume.generalInfo.summary.length > 50) points += 15;
  }

  // Contact Info (15 points)
  if (resume.contactInfo) {
    if (resume.contactInfo.email && resume.contactInfo.phone) points += 5;
    if (resume.contactInfo.linkedin || resume.contactInfo.website) points += 5;
    if (resume.contactInfo.github || resume.contactInfo.twitter) points += 5;
  }

  // Education (20 points)
  if (resume.education && resume.education.length > 0) {
    points += 10;
    if (resume.education.length >= 2) points += 5;
    if (resume.education.some(edu => edu.description && edu.description.length > 30)) points += 5;
  }

  // Experience (25 points)
  if (resume.experience && resume.experience.length > 0) {
    points += 10;
    if (resume.experience.length >= 2) points += 5;
    const hasResponsibilities = resume.experience.some(exp => 
      exp.responsibilities && exp.responsibilities.length > 0
    );
    if (hasResponsibilities) points += 10;
  }

  // Skills (15 points)
  if (resume.skills && resume.skills.length > 0) {
    points += Math.min(resume.skills.length * 3, 15);
  }

  // Keywords check (bonus)
  const content = JSON.stringify(resume).toLowerCase();
  const keywords = [
    'developed', 'managed', 'designed', 'implemented', 'led', 'created',
    'optimized', 'analyzed', 'collaborated', 'delivered', 'improved',
    'launched', 'architected', 'engineered', 'spearheaded'
  ];
  const keywordMatches = keywords.filter(k => content.includes(k)).length;
  if (keywordMatches >= 3) points += 5;

  score = Math.min(points, maxScore);
  return Math.round(score);
};

module.exports = calculateATSScore;
