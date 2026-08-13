const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Admin = require('../models/Admin');
const Project = require('../models/Project');
const Skill = require('../models/Skill');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const dbUrl = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rohan_portfolio';

const skillsData = [
  // Languages
  { name: 'Java', category: 'Languages', proficiency: 'Expert', order: 1 },
  { name: 'JavaScript', category: 'Languages', proficiency: 'Expert', order: 2 },
  { name: 'SQL', category: 'Languages', proficiency: 'Intermediate', order: 3 },
  { name: 'HTML', category: 'Languages', proficiency: 'Expert', order: 4 },
  { name: 'CSS', category: 'Languages', proficiency: 'Expert', order: 5 },
  
  // Frontend
  { name: 'React.js', category: 'Frontend', proficiency: 'Expert', order: 1 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Expert', order: 2 },
  
  // Backend
  { name: 'Node.js', category: 'Backend', proficiency: 'Expert', order: 1 },
  { name: 'Express.js', category: 'Backend', proficiency: 'Expert', order: 2 },
  { name: 'REST APIs', category: 'Backend', proficiency: 'Expert', order: 3 },
  
  // Databases
  { name: 'MongoDB', category: 'Databases', proficiency: 'Expert', order: 1 },
  { name: 'MySQL', category: 'Databases', proficiency: 'Intermediate', order: 2 },
  
  // Developer Tools
  { name: 'Git', category: 'Tools', proficiency: 'Expert', order: 1 },
  { name: 'GitHub', category: 'Tools', proficiency: 'Expert', order: 2 },
  { name: 'Postman', category: 'Tools', proficiency: 'Expert', order: 3 },
  { name: 'VS Code', category: 'Tools', proficiency: 'Expert', order: 4 },
  
  // Core Concepts
  { name: 'Data Structures & Algorithms', category: 'Core Concepts', proficiency: 'Expert', order: 1 },
  { name: 'Object-Oriented Programming', category: 'Core Concepts', proficiency: 'Expert', order: 2 },
  { name: 'DBMS', category: 'Core Concepts', proficiency: 'Expert', order: 3 },
  { name: 'Operating Systems', category: 'Core Concepts', proficiency: 'Intermediate', order: 4 },
  { name: 'Computer Networks', category: 'Core Concepts', proficiency: 'Intermediate', order: 5 },
  { name: 'Authentication & Authorization', category: 'Core Concepts', proficiency: 'Expert', order: 6 }
];

const projectsData = [
  {
    title: 'ApplyWise - Placement & Internship Tracker',
    description: 'A full-stack MERN platform for tracking job applications, interviews, and resume versions through a centralized dashboard.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary', 'Nodemailer'],
    liveLink: 'https://applywise-l2wg.onrender.com',
    githubLink: 'https://github.com/RohanRaut21/ApplyWise', // placeholder or actual based on user
    bulletPoints: [
      'Built a full-stack MERN platform for tracking job applications, interviews, and resume versions through a centralized dashboard.',
      'Implemented JWT-based authentication, role-protected routes, and secure user session management.',
      'Developed RESTful APIs for application tracking, interview scheduling, notifications, and analytics.',
      'Integrated Cloudinary and Nodemailer for resume management and automated interview notifications.'
    ],
    category: 'MERN Stack',
    order: 1
  },
  {
    title: 'Reverse Market - Buyer Driven Marketplace',
    description: 'A MERN-based procurement platform enabling buyers to post requirements and sellers to submit competitive bids.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary'],
    liveLink: 'https://reverse-market.onrender.com',
    githubLink: 'https://github.com/RohanRaut21/Reverse-Market',
    bulletPoints: [
      'Developed a MERN-based procurement platform enabling buyers to post requirements and sellers to submit competitive bids.',
      'Implemented JWT authentication and role-based access control for Buyers, Sellers, and Admins.',
      'Built RESTful APIs for request management, bidding workflows, messaging, and user management.',
      'Integrated Cloudinary for media uploads and optimized MongoDB schemas for scalable data handling.'
    ],
    category: 'MERN Stack',
    order: 2
  }
];

const seedDB = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(dbUrl);
    console.log('Connected!');

    // Clear existing data
    console.log('Clearing existing data...');
    await Admin.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    console.log('Cleared!');

    // Seed Admin
    console.log('Seeding Admin...');
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword';
    await Admin.create({
      username: adminUsername,
      password: adminPassword
    });
    console.log(`Admin user created: ${adminUsername}`);

    // Seed Projects
    console.log('Seeding Projects...');
    await Project.insertMany(projectsData);
    console.log(`${projectsData.length} projects seeded!`);

    // Seed Skills
    console.log('Seeding Skills...');
    await Skill.insertMany(skillsData);
    console.log(`${skillsData.length} skills seeded!`);

    console.log('Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
