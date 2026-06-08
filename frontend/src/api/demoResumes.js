export const demoHighATS = {
  title: 'Sarah Chen - Elite Software Engineer Resume (High ATS Score: 95/100)',
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
      startDate: '2013-09-01',
      endDate: '2015-06-01',
      current: false,
      description: 'Specialized in distributed systems and machine learning. Graduated with honors. Published research on scalable architectures.'
    },
    {
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Engineering',
      startDate: '2009-09-01',
      endDate: '2013-06-01',
      current: false,
      description: "Dean's List every semester. Led the ACM programming team to nationals."
    }
  ],
  experience: [
    {
      company: 'Google',
      position: 'Senior Software Engineer',
      startDate: '2020-01-01',
      endDate: '2024-06-01',
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
      startDate: '2017-03-01',
      endDate: '2019-12-01',
      current: false,
      responsibilities: [
        'Implemented React components used by 500M+ users',
        'Designed and launched the new mobile messaging experience',
        'Improved build pipeline, reducing CI/CD times by 80%'
      ],
      description: 'Developed frontend features for the main Facebook app. Analyzed user behavior data to drive product decisions. Delivered impactful improvements to the mobile experience.'
    }
  ],
  settings: {
    theme: 'modern',
    fontSize: 12,
    accentColor: '#0070f3',
    showPhoto: true
  },
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Go', 'AWS', 'Kubernetes', 'GraphQL', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD', 'Microservices', 'Machine Learning']
};

export const demoLowATS = {
  title: 'John Doe - Minimal Resume (Low ATS Score: 25/100)',
  generalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    title: 'Worker',
    summary: 'Looking for job. I can do anything.',
    age: 25
  },
  contactInfo: {
    email: 'john@email.com'
  },
  education: [
    {
      school: 'Some University',
      degree: 'Degree',
      startDate: '2010-01-01',
      endDate: '2014-01-01',
      current: false
    }
  ],
  experience: [
    {
      company: 'Company A',
      position: 'Worker',
      startDate: '2015-01-01',
      current: true,
      description: 'I did work here.'
    }
  ],
  settings: {
    theme: 'classic',
    fontSize: 12,
    accentColor: '#94a3b8',
    showPhoto: false
  },
  skills: ['HTML']
};
