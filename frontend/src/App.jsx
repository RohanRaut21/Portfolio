import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { 
  Code2, 
  Mail, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  Server, 
  Database, 
  Layers, 
  MessageSquare, 
  Terminal, 
  Eye, 
  ExternalLink, 
  Trash2, 
  Check, 
  Lock, 
  LogOut, 
  Plus, 
  X, 
  User,
  CheckSquare,
  Square,
  Calendar,
  Sparkles,
  Monitor,
  Wrench,
  Brain
} from 'lucide-react';

const Github = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const GlideText = ({ text, speed = "30s", direction = "normal" }) => {
  return (
    <div className="relative w-full overflow-hidden py-4 bg-black border-y border-neutral-900 select-none pointer-events-none my-12">
      <div className="flex whitespace-nowrap">
        <div 
          className="flex whitespace-nowrap text-5xl md:text-8xl font-black tracking-[0.1em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.06)] uppercase animate-glide"
          style={{ 
            animationDuration: speed,
            animationDirection: direction
          }}
        >
          {Array(8).fill(text).map((t, idx) => (
            <span key={idx} className="px-8">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

// Fallback Static Data from Resume
const staticSkills = [
  { name: 'Java', category: 'Languages', proficiency: 'Expert' },
  { name: 'JavaScript', category: 'Languages', proficiency: 'Expert' },
  { name: 'SQL', category: 'Languages', proficiency: 'Intermediate' },
  { name: 'HTML', category: 'Languages', proficiency: 'Expert' },
  { name: 'CSS', category: 'Languages', proficiency: 'Expert' },
  { name: 'React.js', category: 'Frontend', proficiency: 'Expert' },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Expert' },
  { name: 'Node.js', category: 'Backend', proficiency: 'Expert' },
  { name: 'Express.js', category: 'Backend', proficiency: 'Expert' },
  { name: 'REST APIs', category: 'Backend', proficiency: 'Expert' },
  { name: 'MongoDB', category: 'Databases', proficiency: 'Expert' },
  { name: 'MySQL', category: 'Databases', proficiency: 'Intermediate' },
  { name: 'Git', category: 'Tools', proficiency: 'Expert' },
  { name: 'GitHub', category: 'Tools', proficiency: 'Expert' },
  { name: 'Postman', category: 'Tools', proficiency: 'Expert' },
  { name: 'VS Code', category: 'Tools', proficiency: 'Expert' },
  { name: 'Data Structures & Algorithms', category: 'Core Concepts', proficiency: 'Expert' },
  { name: 'Object-Oriented Programming', category: 'Core Concepts', proficiency: 'Expert' },
  { name: 'DBMS', category: 'Core Concepts', proficiency: 'Expert' },
  { name: 'Operating Systems', category: 'Core Concepts', proficiency: 'Intermediate' },
  { name: 'Computer Networks', category: 'Core Concepts', proficiency: 'Intermediate' },
  { name: 'Authentication & Authorization', category: 'Core Concepts', proficiency: 'Expert' }
];

const staticProjects = [
  {
    _id: '1',
    title: 'ApplyWise - Placement & Internship Tracker',
    description: 'A full-stack MERN platform for tracking job applications, interviews, and resume versions through a centralized dashboard.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Cloudinary', 'Nodemailer'],
    liveLink: 'https://applywise-l2wg.onrender.com',
    githubLink: 'https://github.com/RohanRaut21/ApplyWise',
    bulletPoints: [
      'Built a full-stack MERN platform for tracking job applications, interviews, and resume versions through a centralized dashboard.',
      'Implemented JWT-based authentication, role-protected routes, and secure user session management.',
      'Developed RESTful APIs for application tracking, interview scheduling, notifications, and analytics.',
      'Integrated Cloudinary and Nodemailer for resume management and automated interview notifications.'
    ],
    category: 'MERN Stack'
  },
  {
    _id: '2',
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
    category: 'MERN Stack'
  }
];

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Languages': return <Code2 className="w-5 h-5" />;
    case 'Frontend': return <Monitor className="w-5 h-5" />;
    case 'Backend': return <Server className="w-5 h-5" />;
    case 'Databases': return <Database className="w-5 h-5" />;
    case 'Tools': return <Wrench className="w-5 h-5" />;
    case 'Core Concepts': return <Brain className="w-5 h-5" />;
    default: return <Code2 className="w-5 h-5" />;
  }
};

const getSkillIcon = (name) => {
  const normalized = name.toLowerCase().replace('.js', '').replace(' ', '');
  if (normalized.includes('java') && !normalized.includes('script')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#E76F51] shrink-0" fill="currentColor">
        <path d="M19.49 14.85a4.2 4.2 0 0 1-1.34 2.12c-1.46 1.15-3.66 1.73-6.6 1.73-2.14 0-3.9-.28-5.32-.83-.16-.06-.21-.21-.1-.31.28-.27.81-.54 1.58-.81 1.75-.6 4.3-.9 7.63-.9.96 0 1.9.06 2.8.19.86.13 1.34.03 1.44-.31a2.83 2.83 0 0 0-.25-1.5c-.34-.73-1.12-1.35-2.34-1.85-.35-.14-.38-.34-.09-.43 1.83-.56 2.88.52 2.59 2.9m-.85-4.5c.2.06.27.18.2.27-.47.63-1.4 1.16-2.8 1.6-1.53.48-3.7.72-6.52.72a38 38 0 0 1-5.18-.36c-.46-.07-.58-.23-.33-.36 1.18-.63 3.16-.95 5.92-.95 1.56 0 3.03.11 4.41.33.99.16 2.37.28 3.52.33 1-.03 1.08-.2 1.08-.4 0-.17-.18-.32-.5-.46-.48-.22-1.18-.36-2.11-.42a.56.56 0 0 1-.36-.61c.07-.36.56-.51 1.48-.46a7 7 0 0 1 3.52.92.51.51 0 0 1 .15.53m.36-4.52a.39.39 0 0 1-.06.2c-.37.52-.94.94-1.72 1.25a17.4 17.4 0 0 1-4.24 1.1c-1.8.27-3.92.4-6.38.4-1.8 0-3.23-.1-4.3-.28a.33.33 0 0 1-.22-.32c.1-.47.66-.82 1.66-1.07 1.56-.39 3.82-.59 6.78-.59.88 0 1.76.04 2.65.12.78.07 1.62.24 2.52.51.87.27.9.46.9.59 0 .1-.09.2-.28.32-.42.27-.79.48-1.1.62a.45.45 0 0 0-.21.57c.1.33.5.42 1.19.26a6 6 0 0 0 3-.98.39.39 0 0 1 .52.3m-8.73 17.95c-.32 0-.61-.03-.89-.09a3.7 3.7 0 0 1-2.02-1.15c-.47-.48-.71-1.05-.71-1.7 0-1 .59-1.95 1.78-2.8a.47.47 0 0 1 .57.06.4.4 0 0 1-.05.57c-.89.65-1.33 1.34-1.33 2.06 0 .47.16.88.49 1.23a2.76 2.76 0 0 0 1.52.88 28.5 28.5 0 0 0 7.84-.04c.33 0 .4.22.18.39a6.83 6.83 0 0 1-3.69.83c-1.28 0-2.47-.07-3.92-.18"/>
      </svg>
    );
  }
  if (normalized.includes('javascript') || normalized === 'js') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F7DF1E] shrink-0" fill="currentColor">
        <path d="M3 3h18v18H3V3zm11.75 14.19c.4.67 1 1.13 1.75 1.13.78 0 1.23-.42 1.23-1.01 0-.69-.54-.93-1.46-1.33l-.5-.22c-1.5-.64-2.5-1.44-2.5-3.15 0-1.63 1.25-2.9 3.25-2.9 1.68 0 2.75.8 3.39 2.15l-1.48.95c-.36-.67-.85-1.05-1.8-1.05-.69 0-1.18.36-1.18.91 0 .61.43.83 1.27 1.2l.5.21c1.78.77 2.78 1.58 2.78 3.3 0 1.95-1.48 3.23-3.6 3.23-2.12 0-3.52-1.17-4.14-2.55l1.45-.96zm-7.65-4.47c.18-.75.76-1.3 1.56-1.3.82 0 1.34.46 1.34 1.3V19h-1.95v-5.2c0-.36-.16-.54-.54-.54-.33 0-.52.18-.52.54V19H5.05v-6.13h1.95v.35z"/>
      </svg>
    );
  }
  if (normalized === 'sql') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#00758F] shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
      </svg>
    );
  }
  if (normalized === 'html' || normalized === 'html5') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#E34F26] shrink-0" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.56L12 24l-8.59-2.44L1.5 0zm14.65 14.53l.21-2.44H8.22l-.17-1.95h6.63l.18-1.95H5.88l.53 5.86h7.94l-.23 2.5-2.12.57-2.12-.57-.14-1.55H7.72l.24 2.87 4.04 1.1 4.04-1.1.28-3.08z"/>
      </svg>
    );
  }
  if (normalized === 'css' || normalized === 'css3') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1572B6] shrink-0" fill="currentColor">
        <path d="M1.5 0h21l-1.91 21.56L12 24l-8.59-2.44L1.5 0zm16.14 6.13H6.07l.18 1.95h11.23l-.36 4.02-5.12 1.4-5.12-1.4-.24-2.68H4.66l.39 4.35 6.95 1.93 6.95-1.93.73-7.64z"/>
      </svg>
    );
  }
  if (normalized.includes('react')) {
    return (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-5 h-5 text-[#61DAFB] shrink-0" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }
  if (normalized.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#06B6D4] shrink-0" fill="currentColor">
        <path d="M12 6.036c-2.402 0-4.337.81-5.807 2.43-1.469 1.62-1.97 3.737-1.503 6.353.468 2.617 1.83 4.238 4.09 4.863 2.26.626 4.298-.094 6.115-2.158 1.817-2.064 2.26-4.27 1.332-6.622-.927-2.353-2.34-3.529-4.227-3.529-.636 0-1.258.125-1.867.375.318-1.563 1.25-2.5 2.8-2.5.636 0 1.258.125 1.867.375C16.29 4.975 18 3.5 20.25 3.5c2.402 0 4.337.81 5.807 2.43 1.469 1.62 1.97 3.737 1.503 6.353-.468 2.617-1.83 4.238-4.09 4.863-2.26.626-4.298-.094-6.115-2.158-1.817-2.064-2.26-4.27-1.332-6.622.927-2.353-2.34-3.529-4.227-3.529-.636 0-1.258.125-1.867.375C12.318 8.536 12 7.5 12 6.036z" transform="scale(0.85) translate(2,2)"/>
      </svg>
    );
  }
  if (normalized === 'node') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#339933] shrink-0" fill="currentColor">
        <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm0-5c0 .83-.67 1.5-1.5 1.5S9 12.33 9 11.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5z"/>
      </svg>
    );
  }
  if (normalized.includes('express')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-300 shrink-0" fill="currentColor">
        <text x="2" y="16" fontFamily="sans-serif" fontSize="12" fontWeight="bold" letterSpacing="-1">ex</text>
        <path d="M18 6l-3 4-3-4h-2l4 5-4 5h2l3-4 3 4h2l-4-5 4-5z"/>
      </svg>
    );
  }
  if (normalized.includes('mongodb')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#47A248] shrink-0" fill="currentColor">
        <path d="M12 1.5c-.3 0-.6.1-.9.3-1.6 1.1-3 3-3.8 5.1C6.5 9 6.2 11.5 6.2 14c0 3.3 1.8 6.1 4.5 7.5v1c0 .6.4 1 1.3 1s1.3-.4 1.3-1v-1c2.7-1.4 4.5-4.2 4.5-7.5 0-2.5-.3-5-1.1-7.1-.8-2.1-2.2-4-3.8-5.1-.3-.2-.6-.3-.9-.3zm0 3c.8.9 1.6 2.3 2.1 3.9C13.2 8 12.5 7.5 12 7c-.5.5-1.2 1-2.1 1.4.5-1.6 1.3-3 2.1-3.9z"/>
      </svg>
    );
  }
  if (normalized.includes('mysql')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#00758F] shrink-0" fill="currentColor">
        <path d="M12.117 3.5c-4.148 0-7.525 2.17-7.525 4.836 0 1.258.75 2.4 2.016 3.25l-.234.3c-1.37.584-2.266 1.4-2.266 2.314 0 1.767 3.266 3.2 7.324 3.2 4.059 0 7.324-1.433 7.324-3.2 0-.914-.896-1.73-2.266-2.314l-.234-.3c1.266-.85 2.016-1.992 2.016-3.25 0-2.666-3.377-4.836-7.525-4.836zm0 1.2c2.973 0 5.375 1.5 5.375 3.364 0 1.05-.75 2-2 2.658-.334.175-.7.317-1.075.434l-.458.125a8 8 0 0 0-1.842-1.3l.36-.88a.6.6 0 1 0-1.12-.46l-.37 1a7 7 0 0 0-1-.073c-.3 0-.6.015-.9.043l-.37-1a.6.6 0 1 0-1.12.46l.36.88a8 8 0 0 0-1.842 1.3l-.458-.125a6 6 0 0 1-1.075-.434c-1.25-.658-2-1.608-2-2.658 0-1.864 2.402-3.364 5.375-3.364z"/>
      </svg>
    );
  }
  if (normalized === 'git') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F05032] shrink-0" fill="currentColor">
        <path d="M22.68 11.31L12.69 1.32c-.42-.42-1.11-.42-1.53 0L9.18 3.3l3.2 3.2c.31-.1.67-.04.93.22.27.27.32.67.17.99l3.02 3.02c.32-.15.72-.1.99.17.38.38.38 1 0 1.38s-1 .38-1.38 0c-.27-.27-.32-.67-.17-.99L12.92 11.3c.15-.32.1-.72-.17-.99-.26-.26-.62-.32-.93-.22L8.62 6.89c.1-.31.04-.67-.22-.93-.27-.27-.67-.32-.99-.17L1.31 11.83c-.42.42-.42 1.11 0 1.53l9.99 9.99c.42.42 1.11.42 1.53 0l9.85-9.85c.42-.42.42-1.11 0-1.53z"/>
      </svg>
    );
  }
  if (normalized === 'github') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white shrink-0" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    );
  }
  if (normalized === 'postman') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FF6C37] shrink-0" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.69 13.93l-2.02-2.02-3.02 3.02-1.38-1.38 3.02-3.02-2.02-2.02h5.42v5.42z"/>
      </svg>
    );
  }
  if (normalized === 'vscode') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#007ACC] shrink-0" fill="currentColor">
        <path d="M23.986 6.568l-3.366-3.411a1.2 1.2 0 0 0-.853-.352h-.032c-.318 0-.623.125-.853.352L12 10.02 5.118 3.157a1.2 1.2 0 0 0-1.738 0L.014 6.568c-.01.01-.014.02-.014.032a1.2 1.2 0 0 0 0 1.688L6.85 15.15.014 22.014a1.2 1.2 0 0 0 0 1.688l3.366 3.411c.23.23.541.352.853.352s.623-.125.853-.352L12 20.25l6.882 6.863c.23.23.541.352.853.352s.623-.125.853-.352l3.366-3.411a1.2 1.2 0 0 0 0-1.688L17.15 15.15l6.836-6.863a1.2 1.2 0 0 0 0-1.688c-.01-.01-.01-.02-.01-.032z" transform="scale(0.85) translate(2,2)"/>
      </svg>
    );
  }

  // Concepts conceptual icons (fallbacks based on keywords)
  if (normalized.includes('data') || normalized.includes('algo') || normalized.includes('dsa')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#E0A96D] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-7M5 12v-2a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2M12 2v5"/>
        <circle cx="12" cy="11" r="4"/>
        <circle cx="5" cy="14" r="2"/>
        <circle cx="19" cy="14" r="2"/>
      </svg>
    );
  }
  if (normalized.includes('object') || normalized.includes('oop')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C77DFF] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    );
  }
  if (normalized.includes('dbms')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#4CC9F0] shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6"/>
      </svg>
    );
  }
  if (normalized.includes('operating') || normalized.includes('os')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FFB703] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    );
  }
  if (normalized.includes('network') || normalized.includes('computer')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#4361EE] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="16" y="16" width="6" height="6" rx="1"/>
        <rect x="2" y="16" width="6" height="6" rx="1"/>
        <rect x="9" y="2" width="6" height="6" rx="1"/>
        <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8"/>
      </svg>
    );
  }
  if (normalized.includes('auth') || normalized.includes('security')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F72585] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-neutral-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
};

const categoryThemes = {
  'Languages': {
    border: 'border-purple-500/20 hover:border-purple-500/40',
    shadow: 'shadow-[0_0_30px_rgba(168,85,247,0.02)] hover:shadow-[0_0_30px_rgba(168,85,247,0.06)]',
    glow: 'rgba(168, 85, 247, 0.08)',
    text: 'text-purple-400',
    bg: 'bg-purple-950/10',
    glowClass: 'from-purple-500/10 via-transparent to-transparent',
    iconBg: 'bg-purple-950/40 border-purple-500/30 text-purple-400',
    stroke: '#A855F7',
    lines: (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 190 40 C 210 20, 225 35, 210 50 C 195 65, 220 75, 230 60" stroke="#A855F7" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <path d="M 195 180 C 205 200, 225 210, 210 220 C 195 230, 220 235, 225 215" stroke="#A855F7" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      </svg>
    )
  },
  'Frontend': {
    border: 'border-cyan-500/20 hover:border-cyan-500/40',
    shadow: 'shadow-[0_0_30px_rgba(6,182,212,0.02)] hover:shadow-[0_0_30px_rgba(6,182,212,0.06)]',
    glow: 'rgba(6, 182, 212, 0.08)',
    text: 'text-cyan-400',
    bg: 'bg-cyan-950/10',
    glowClass: 'from-cyan-500/10 via-transparent to-transparent',
    iconBg: 'bg-cyan-950/40 border-cyan-500/30 text-cyan-400',
    stroke: '#06B6D4',
    lines: (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 185 50 C 205 35, 220 40, 210 60 C 200 80, 225 80, 230 65" stroke="#06B6D4" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <path d="M 200 170 C 210 190, 225 195, 215 210 C 205 225, 225 225, 230 210" stroke="#06B6D4" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      </svg>
    )
  },
  'Backend': {
    border: 'border-emerald-500/20 hover:border-emerald-500/40',
    shadow: 'shadow-[0_0_30px_rgba(16,185,129,0.02)] hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]',
    glow: 'rgba(16, 185, 129, 0.08)',
    text: 'text-emerald-400',
    bg: 'bg-emerald-950/10',
    glowClass: 'from-emerald-500/10 via-transparent to-transparent',
    iconBg: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400',
    stroke: '#10B981',
    lines: (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 195 35 C 210 25, 225 30, 215 45 C 205 60, 220 70, 225 55" stroke="#10B981" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <path d="M 190 190 C 205 205, 225 210, 215 225 C 205 240, 220 240, 225 225" stroke="#10B981" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      </svg>
    )
  },
  'Databases': {
    border: 'border-blue-500/20 hover:border-blue-500/40',
    shadow: 'shadow-[0_0_30px_rgba(59,130,246,0.02)] hover:shadow-[0_0_30px_rgba(59,130,246,0.06)]',
    glow: 'rgba(59, 130, 246, 0.08)',
    text: 'text-blue-400',
    bg: 'bg-blue-950/10',
    glowClass: 'from-blue-500/10 via-transparent to-transparent',
    iconBg: 'bg-blue-950/40 border-blue-500/30 text-blue-400',
    stroke: '#3B82F6',
    lines: (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 190 45 C 205 30, 220 35, 210 50 C 200 65, 225 70, 228 55" stroke="#3B82F6" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <path d="M 195 185 C 210 195, 225 200, 215 215 C 205 230, 225 230, 228 215" stroke="#3B82F6" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      </svg>
    )
  },
  'Tools': {
    border: 'border-amber-500/20 hover:border-amber-500/40',
    shadow: 'shadow-[0_0_30px_rgba(245,158,11,0.02)] hover:shadow-[0_0_30px_rgba(245,158,11,0.06)]',
    glow: 'rgba(245, 158, 11, 0.08)',
    text: 'text-amber-400',
    bg: 'bg-amber-950/10',
    glowClass: 'from-amber-500/10 via-transparent to-transparent',
    iconBg: 'bg-amber-950/40 border-amber-500/30 text-amber-400',
    stroke: '#F59E0B',
    lines: (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 185 40 C 205 25, 220 30, 210 45 C 200 60, 225 60, 228 45" stroke="#F59E0B" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <path d="M 190 180 C 205 195, 225 200, 215 215 C 205 230, 225 230, 228 210" stroke="#F59E0B" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      </svg>
    )
  },
  'Core Concepts': {
    border: 'border-fuchsia-500/20 hover:border-fuchsia-500/40',
    shadow: 'shadow-[0_0_30px_rgba(217,70,239,0.02)] hover:shadow-[0_0_30px_rgba(217,70,239,0.06)]',
    glow: 'rgba(217, 70, 239, 0.08)',
    text: 'text-fuchsia-400',
    bg: 'bg-fuchsia-950/10',
    glowClass: 'from-fuchsia-500/10 via-transparent to-transparent',
    iconBg: 'bg-fuchsia-950/40 border-fuchsia-500/30 text-fuchsia-400',
    stroke: '#D946EF',
    lines: (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-0" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 190 35 C 205 20, 220 25, 210 40 C 200 55, 225 60, 228 45" stroke="#D946EF" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <path d="M 195 185 C 210 195, 225 200, 215 215 C 205 230, 225 230, 228 215" stroke="#D946EF" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      </svg>
    )
  }
};


function App() {
  const [skills, setSkills] = useState(staticSkills);
  const [projects, setProjects] = useState(staticProjects);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const mainContainerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Modals & Dashboard States
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(null); // Project object
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Form States
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  
  // Notification states
  const [alert, setAlert] = useState(null); // { type: 'success'|'error', message: '' }

  // Manage projects (add / edit) states
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [newProjLive, setNewProjLive] = useState('');
  const [newProjGit, setNewProjGit] = useState('');
  const [newProjBullets, setNewProjBullets] = useState('');

  // Fetch projects and skills on load
  useEffect(() => {
    fetchProjects();
    fetchSkills();
    if (token) {
      setIsAdmin(true);
      fetchMessages();
    }
  }, [token]);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        setProjects(data.data);
      }
    } catch (err) {
      console.log('Using static projects backup');
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${API_BASE}/skills`);
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        setSkills(data.data);
      }
    } catch (err) {
      console.log('Using static skills backup');
    }
  };

  const fetchMessages = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/admin/messages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error('Error fetching messages', err);
    }
  };

  // Admin Actions
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminUsername, password: adminPassword })
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setIsAdmin(true);
        setShowAdminLogin(false);
        setShowDashboard(true);
        showAlert('success', 'Logged in successfully as Admin');
        // Clear inputs
        setAdminUsername('');
        setAdminPassword('');
      } else {
        showAlert('error', data.error || 'Invalid credentials');
      }
    } catch (err) {
      showAlert('error', 'Could not connect to backend server');
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setIsAdmin(false);
    setShowDashboard(false);
    showAlert('success', 'Logged out successfully');
  };

  const handleToggleRead = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isRead: !currentStatus })
      });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.map(msg => msg._id === id ? { ...msg, isRead: !currentStatus } : msg));
      }
    } catch (err) {
      showAlert('error', 'Failed to update message status');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMessages(messages.filter(msg => msg._id !== id));
        showAlert('success', 'Message deleted successfully');
      }
    } catch (err) {
      showAlert('error', 'Failed to delete message');
    }
  };

  // Add project action
  const handleAddProject = async (e) => {
    e.preventDefault();
    const techArray = newProjTech.split(',').map(t => t.trim()).filter(t => t !== '');
    const bulletArray = newProjBullets.split('\n').map(b => b.trim()).filter(b => b !== '');
    
    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newProjTitle,
          description: newProjDesc,
          technologies: techArray,
          liveLink: newProjLive,
          githubLink: newProjGit,
          bulletPoints: bulletArray
        })
      });
      const data = await res.json();
      if (data.success) {
        setProjects([...projects, data.data]);
        setShowAddProject(false);
        showAlert('success', 'Project added successfully!');
        // Reset form
        setNewProjTitle('');
        setNewProjDesc('');
        setNewProjTech('');
        setNewProjLive('');
        setNewProjGit('');
        setNewProjBullets('');
      } else {
        showAlert('error', data.error || 'Failed to add project');
      }
    } catch (err) {
      showAlert('error', 'Server error while adding project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project permanently?')) return;
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setProjects(projects.filter(p => p._id !== id));
        setActiveProjectIndex(0);
        showAlert('success', 'Project deleted');
      }
    } catch (err) {
      showAlert('error', 'Failed to delete project');
    }
  };

  // User Actions
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage
        })
      });
      const data = await res.json();
      if (data.success) {
        showAlert('success', 'Thank you! Your message has been sent successfully.');
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
        // If admin is browsing, refresh messages
        if (isAdmin) fetchMessages();
      } else {
        showAlert('error', data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      showAlert('error', 'Cannot reach backend server. Message could not be sent.');
    }
  };

  const scrollToProject = (index) => {
    if (window.innerWidth >= 1024) {
      const trigger = ScrollTrigger.getById("projects-pin");
      if (trigger) {
        const start = trigger.start;
        const end = trigger.end;
        const scrollPos = start + (index / (projects.length - 1)) * (end - start);
        window.scrollTo({
          top: scrollPos,
          behavior: 'smooth'
        });
      }
    } else {
      const slides = document.querySelectorAll(".project-slide");
      if (slides[index]) {
        slides[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      // 0. Hero Section Initial Load Animation
      gsap.timeline()
      .from("#hero-badge", { y: 20, opacity: 0, duration: 1.0, ease: "power4.out" })
      .from("#hero-title", { y: 40, scale: 0.95, opacity: 0, duration: 1.5, ease: "power4.out" }, "-=0.7")
      .from("#hero-desc", { y: 20, opacity: 0, duration: 1.0, ease: "power4.out" }, "-=0.9")
      .from("#hero-socials > *", { y: 15, opacity: 0, stagger: 0.1, duration: 1.0, ease: "power4.out" }, "-=0.7")
      .from("#hero-actions > *", { y: 15, opacity: 0, stagger: 0.1, duration: 1.0, ease: "power4.out" }, "-=0.7");

      // 1. Hero Section Scroll Animations
      gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5
        }
      })
      .to("#hero-title", { scale: 0.85, opacity: 0.3, ease: "none" })
      .to("#hero-desc", { y: -20, opacity: 0, ease: "none" }, "<")
      .to("#hero-badge", { y: -30, opacity: 0, ease: "none" }, "<")
      .to("#hero-socials", { y: -15, opacity: 0, ease: "none" }, "<")
      .to("#hero-actions", { y: -10, opacity: 0, ease: "none" }, "<");

      // 2. About Section Reveal
      gsap.from("#about-heading > *", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
      
      gsap.from("#about-cards > *", {
        y: 50,
        opacity: 0,
        stagger: 0.25,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      // 3. Experience section capabilities reveal
      gsap.utils.toArray("#experience-cards > *").forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // 4. Skills cards stagger reveal
      gsap.utils.toArray(".skills-category-card").forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          scale: 0.98,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // 5. Projects Section Pinned Horizontal Scroll (Desktop only)
      let mm = gsap.matchMedia();
      
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          id: "projects-pin",
          trigger: "#projects",
          pin: true,
          start: "top top",
          end: () => "+=" + (projects.length * window.innerWidth * 0.8),
          scrub: 1.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (projects.length - 1));
            setActiveProjectIndex(idx);
          }
        });

        // Translate the track horizontally
        gsap.to(".projects-track", {
          xPercent: -((projects.length - 1) / projects.length) * 100,
          ease: "none",
          scrollTrigger: {
            trigger: "#projects",
            start: "top top",
            end: () => "+=" + (projects.length * window.innerWidth * 0.8),
            scrub: 1.8,
            invalidateOnRefresh: true
          }
        });

        // Parallax depth animations on inner elements during horizontal scroll
        projects.forEach((_, index) => {
          // Slide background text slightly faster
          gsap.to(`.project-slide:nth-child(${index + 1}) .project-bg-text`, {
            x: -80,
            ease: "none",
            scrollTrigger: {
              trigger: "#projects",
              start: "top top",
              end: () => "+=" + (projects.length * window.innerWidth * 0.8),
              scrub: 1.5
            }
          });

          // Floating mockup subtle x/rotation shift
          gsap.to(`.project-slide:nth-child(${index + 1}) .project-visual`, {
            x: 30,
            rotation: 1.5,
            ease: "none",
            scrollTrigger: {
              trigger: "#projects",
              start: "top top",
              end: () => "+=" + (projects.length * window.innerWidth * 0.8),
              scrub: 1.5
            }
          });
        });
      });

      ScrollTrigger.refresh();
    }, mainContainerRef.current);

    return () => ctx.revert();
  }, [projects, skills, activeTab]);

  // Skill categorization Helper
  const categories = ['Languages', 'Frontend', 'Backend', 'Databases', 'Tools', 'Core Concepts'];

  return (
    <div ref={mainContainerRef} className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* Alert Notification */}
      {alert && (
        <div className="fixed top-24 right-4 z-[100] max-w-sm animate-bounce">
          <div className={`alert ${alert.type === 'success' ? 'alert-success bg-white text-black border-none' : 'alert-error bg-red-950 text-red-200 border-red-800'} shadow-lg`}>
            <div>
              <span>{alert.message}</span>
            </div>
          </div>
        </div>
      )}

      {/* Glassmorphic Navbar */}
      <header className="navbar glass-nav sticky top-0 z-[40] px-6 lg:px-16 flex justify-between items-center">
        <div className="flex-1">
          <a href="#hero" className="text-xl font-extrabold tracking-widest text-white hover:opacity-80 transition flex items-center gap-2">
            <Terminal size={22} className="text-white" />
            <span>ROHAN RAUT</span>
          </a>
        </div>
        
        {/* Desk Nav */}
        <div className="hidden md:flex gap-8 items-center text-sm font-semibold tracking-wide">
          <a href="#about" className="hover:text-neutral-400 transition">About</a>
          <a href="#experience" className="hover:text-neutral-400 transition">Experience</a>
          <a href="#skills" className="hover:text-neutral-400 transition">Skills</a>
          <a href="#projects" className="hover:text-neutral-400 transition">Projects</a>
          <a href="#contact" className="hover:text-neutral-400 transition">Contact</a>
          
          {isAdmin ? (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowDashboard(!showDashboard)}
                className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-black rounded-none"
              >
                {showDashboard ? 'Close Admin' : 'Admin Panel'}
              </button>
              <button onClick={handleLogout} className="btn btn-sm btn-ghost p-1 hover:bg-transparent text-gray-400 hover:text-white" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowAdminLogin(true)}
              className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-black rounded-none flex items-center gap-1.5"
            >
              <Lock size={12} />
              <span>Admin</span>
            </button>
          )}
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex md:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-black border border-neutral-800 rounded-none w-52 gap-2">
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
            <div className="divider my-1"></div>
            {isAdmin ? (
              <>
                <li><button onClick={() => setShowDashboard(!showDashboard)} className="text-white">{showDashboard ? 'Hide Dashboard' : 'Dashboard'}</button></li>
                <li><button onClick={handleLogout} className="text-red-400">Logout</button></li>
              </>
            ) : (
              <li><button onClick={() => setShowAdminLogin(true)} className="flex items-center gap-1"><Lock size={12}/>Admin Login</button></li>
            )}
          </ul>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero min-h-svh flex flex-col justify-center items-center px-6 lg:px-16 text-center relative overflow-hidden">
        {/* Sleek Dark Background Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
        
        <div className="max-w-4xl z-10 flex flex-col items-center gap-6">
          <div id="hero-badge" className="badge badge-outline border-neutral-700 py-3 px-4 text-xs tracking-widest text-neutral-400 font-bold uppercase mb-2 animate-pulse">
            <Sparkles size={12} className="mr-1.5 text-white" />
            Full Stack Developer (MERN)
          </div>
          
          <h1 id="hero-title" className="text-5xl md:text-8xl font-extrabold tracking-tighter gradient-text leading-none py-1">
            ROHAN RAUT
          </h1>
          
          <p id="hero-desc" className="text-lg md:text-2xl text-neutral-400 max-w-2xl font-light leading-relaxed">
            I craft scalable backends, design optimized schemas, and build modern interactive frontends.
          </p>

          {/* Socials / Leetcode Info */}
          <div id="hero-socials" className="flex flex-wrap justify-center gap-4 mt-2">
            <a href="mailto:rautrohan893@gmail.com" className="btn btn-sm btn-ghost hover:bg-neutral-900 text-neutral-400 hover:text-white flex items-center gap-2 rounded-none border border-neutral-800">
              <Mail size={16} />
              <span>Email</span>
            </a>
            <a href="tel:+919356447941" className="btn btn-sm btn-ghost hover:bg-neutral-900 text-neutral-400 hover:text-white flex items-center gap-2 rounded-none border border-neutral-800">
              <Phone size={16} />
              <span>Call</span>
            </a>
            <a href="https://github.com/RohanRaut21" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-ghost hover:bg-neutral-900 text-neutral-400 hover:text-white flex items-center gap-2 rounded-none border border-neutral-800">
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <a href="https://leetcode.com/u/RohanRaut21/" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-ghost hover:bg-neutral-900 text-neutral-400 hover:text-white flex items-center gap-2 rounded-none border border-neutral-800">
              <Code2 size={16} />
              <span>LeetCode</span>
            </a>
          </div>

          <div id="hero-actions" className="flex gap-4 mt-6">
            <a href="#projects" className="btn bg-white text-black hover:bg-neutral-200 border-none rounded-none px-8 font-bold">
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-black rounded-none px-8">
              Get In Touch
            </a>
          </div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <a href="#about" className="text-neutral-500 hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      <GlideText text="FULL STACK DEVELOPER • MERN STACK • DATABASE DESIGN • PROBLEM SOLVER • " speed="35s" />

      {/* About & Education Section */}
      <section id="about" className="py-28 px-6 lg:px-16 max-w-[1300px] mx-auto border-t border-neutral-900 min-h-svh flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start w-full">
          
          {/* Summary */}
          <div id="about-heading" className="md:col-span-7 flex flex-col gap-6">
            <h2 className="text-xs tracking-widest text-neutral-500 font-bold uppercase">01 / Summary</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Full Stack Developer with MERN Expertise</h3>
            <p className="text-neutral-400 leading-relaxed text-lg">
              Specialized in Express API development, relational/non-relational database design, and building maintainable client-side layouts. Committed to clean, secure application codebases and modern authentication workflows.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="p-5 border border-neutral-900 bg-neutral-950 flex flex-col gap-2">
                <span className="text-neutral-500 text-xs font-bold uppercase tracking-wider">Focus Areas</span>
                <span className="text-white font-medium text-sm">Secure Authentication, REST APIs, Cloud Media Storage, Database Query Optimization</span>
              </div>
              <div className="p-5 border border-neutral-900 bg-neutral-950 flex flex-col gap-2">
                <span className="text-neutral-500 text-xs font-bold uppercase tracking-wider">Problem Solving</span>
                <span className="text-white font-medium text-sm">100+ DSA Solutions on LeetCode using Java. Deep understanding of algorithms.</span>
              </div>
            </div>
          </div>

          {/* Education */}
          <div id="about-cards" className="md:col-span-5 border border-neutral-900 bg-neutral-950/40 p-8 flex flex-col gap-6 relative">
            <div className="absolute top-0 right-8 w-12 h-[1px] bg-white"></div>
            <h2 className="text-xs tracking-widest text-neutral-500 font-bold uppercase flex items-center gap-1.5">
              <GraduationCap size={16} />
              <span>Education</span>
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <span className="text-xs text-neutral-500 font-mono">2023 - 2027</span>
                <h4 className="text-xl font-bold mt-1 text-white">B.E. Information Technology</h4>
                <p className="text-neutral-400 text-sm mt-1">Shri Sant Gajanan Maharaj College of Engineering, Shegaon</p>
              </div>
              
              <div className="divider divider-neutral my-1"></div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs text-neutral-500 block">Academic Standing</span>
                  <span className="text-2xl font-black text-white mt-1">CGPA 8.5 <span className="text-sm font-light text-neutral-500">/ 10</span></span>
                </div>
                <div className="badge badge-outline border-neutral-700 text-neutral-400 font-mono">Graduate 2027</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-28 px-6 lg:px-16 bg-neutral-950 border-t border-neutral-900 min-h-svh flex flex-col justify-center">
        <div className="max-w-[1300px] w-full mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-3">
            <h2 className="text-xs tracking-widest text-neutral-500 font-bold uppercase">02 / Experience</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Core Capabilities</h3>
          </div>

          <div id="experience-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Backend Development */}
            <div className="p-8 border border-neutral-850 bg-neutral-950/20 flex flex-col gap-4 hover:border-neutral-700 hover:bg-neutral-950/40 transition duration-300">
              <div className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-200 bg-neutral-900/50">
                <Server size={18} />
              </div>
              <h4 className="text-lg font-bold text-white mt-2">Backend Development</h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Built and maintained RESTful APIs using Node.js, Express.js, and MongoDB, focusing on authentication, authorization, and scalable application architecture.
              </p>
            </div>

            {/* Database Design */}
            <div className="p-8 border border-neutral-850 bg-neutral-950/20 flex flex-col gap-4 hover:border-neutral-700 hover:bg-neutral-950/40 transition duration-300">
              <div className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-200 bg-neutral-900/50">
                <Database size={18} />
              </div>
              <h4 className="text-lg font-bold text-white mt-2">Database Design</h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Designed MongoDB schemas and optimized database operations for efficient data management, scaling, and low latency application performance.
              </p>
            </div>

            {/* Full-Stack Projects */}
            <div className="p-8 border border-neutral-850 bg-neutral-950/20 flex flex-col gap-4 hover:border-neutral-700 hover:bg-neutral-950/40 transition duration-300">
              <div className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-200 bg-neutral-900/50">
                <Layers size={18} />
              </div>
              <h4 className="text-lg font-bold text-white mt-2">Full-Stack Integration</h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Developed production MERN applications with JWT secure user sessions, Cloudinary media storage, dynamic file uploads, and responsive layouts.
              </p>
            </div>

            {/* Problem Solving */}
            <div className="p-8 border border-neutral-850 bg-neutral-950/20 flex flex-col gap-4 hover:border-neutral-700 hover:bg-neutral-950/40 transition duration-300">
              <div className="w-10 h-10 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-200 bg-neutral-900/50">
                <Code2 size={18} />
              </div>
              <h4 className="text-lg font-bold text-white mt-2">Problem Solving</h4>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Solved 100+ Data Structures & Algorithms problems in Java. Proficient in Arrays, Binary Search, Sliding Window, Greedy, Dynamic Programming.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-28 w-full bg-[#050508] border-t border-neutral-900 min-h-svh flex flex-col justify-center overflow-hidden">
        {/* Futuristic Background Dot Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c14_1.5px,transparent_1.5px),linear-gradient(to_bottom,#0c0c14_1.5px,transparent_1.5px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
        
        {/* Soft Background Radial Auras */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-950/15 rounded-full blur-[140px] pointer-events-none z-0"></div>
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-950/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="max-w-[1300px] w-full mx-auto px-6 lg:px-16 flex flex-col gap-16 z-10 relative">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-xs tracking-widest text-[#D946EF] font-extrabold uppercase">03 / SKILLS</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-1">
                Technical <span className="skills-section-gradient-text">Skills</span>
              </h3>
              <p className="text-neutral-400 text-sm mt-3 max-w-md font-light leading-relaxed">
                Technologies and tools I use to build modern, scalable and efficient applications.
              </p>
            </div>
            
            {/* Filter tabs styled as clean rounded pills */}
            <div className="flex flex-wrap gap-1.5 bg-neutral-950/40 p-1.5 border border-neutral-900 rounded-xl z-10">
              <button 
                onClick={() => setActiveTab('All')}
                className={`px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 rounded-lg ${activeTab === 'All' ? 'text-white border border-purple-500/40 bg-purple-950/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'text-neutral-450 hover:text-white'}`}
              >
                All
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 rounded-lg ${activeTab === cat ? 'text-white border border-purple-500/40 bg-purple-950/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'text-neutral-450 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Categorized Skills Render */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories
              .filter(cat => activeTab === 'All' || activeTab === cat)
              .map(category => {
                const categorySkills = skills.filter(s => s.category === category);
                if (categorySkills.length === 0) return null;
                const theme = categoryThemes[category] || categoryThemes['Languages'];
                return (
                  <div 
                    key={category} 
                    className={`skills-category-card skills-redesign-card group p-6 border ${theme.border} ${theme.shadow} flex flex-col gap-6 relative`}
                  >
                    {/* Clean top-left light line overlay */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-white/20 transition-all duration-500 z-10"></div>
                    
                    {/* Abstract messy lines background */}
                    {theme.lines}
                    
                    <div className="flex items-center gap-3.5 z-10 relative">
                      <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${theme.iconBg} shadow-[0_0_15px_rgba(255,255,255,0.01)] group-hover:scale-105`}>
                        {getCategoryIcon(category)}
                      </div>
                      <span className="text-sm font-bold uppercase tracking-wider text-white">{category}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 z-10 relative">
                      {categorySkills.map((skill, idx) => (
                        <div 
                          key={idx} 
                          className="skills-redesign-chip flex items-center gap-2.5 p-3.5"
                        >
                          {getSkillIcon(skill.name)}
                          <span className="text-xs font-semibold text-neutral-200 group-hover:text-white transition duration-200">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <GlideText text="REACT.JS • NODE.JS • EXPRESS.JS • MONGODB • JAVASCRIPT • JAVA • SQL • " speed="35s" direction="reverse" />

      {/* Projects Section */}
      <section id="projects" className="pt-24 pb-10 px-6 lg:px-16 bg-neutral-950 border-t border-neutral-900 min-h-svh lg:h-svh flex flex-col justify-center relative overflow-hidden">
        
        {/* Fixed Title inside section */}
        <div className="absolute top-12 left-6 md:left-16 z-30 flex flex-col gap-1">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block">04 / Projects</span>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Projects</h3>
        </div>

        {isAdmin && (
          <button 
            onClick={() => setShowAddProject(true)} 
            className="absolute top-12 right-6 md:right-16 z-30 btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-black rounded-none flex items-center gap-1"
          >
            <Plus size={14} /> Add Project
          </button>
        )}

        {/* Add Project Form (Shown in Dashboard Overlay Mode) */}
        {showAddProject && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="border border-neutral-800 bg-neutral-950 w-full max-w-xl p-8 flex flex-col gap-6 relative rounded-none max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-2">
                <span className="font-bold text-white flex items-center gap-2"><Plus size={16}/>New Project Details</span>
                <button onClick={() => setShowAddProject(false)} className="text-neutral-500 hover:text-white"><X size={18}/></button>
              </div>
              <form onSubmit={handleAddProject} className="flex flex-col gap-3">
                <input 
                  type="text" 
                  placeholder="Project Title" 
                  value={newProjTitle}
                  onChange={e => setNewProjTitle(e.target.value)}
                  className="input input-bordered input-sm bg-neutral-950 border-neutral-800 rounded-none w-full text-white text-sm"
                  required
                />
                <textarea 
                  placeholder="Short Description" 
                  value={newProjDesc}
                  onChange={e => setNewProjDesc(e.target.value)}
                  className="textarea textarea-bordered textarea-sm bg-neutral-950 border-neutral-800 rounded-none w-full text-white text-sm h-20"
                  required
                />
                <input 
                  type="text" 
                  placeholder="Technologies (comma separated: React, MongoDB, JWT)" 
                  value={newProjTech}
                  onChange={e => setNewProjTech(e.target.value)}
                  className="input input-bordered input-sm bg-neutral-950 border-neutral-800 rounded-none w-full text-white text-sm"
                  required
                />
                <input 
                  type="url" 
                  placeholder="Live Link (Live Demo URL)" 
                  value={newProjLive}
                  onChange={e => setNewProjLive(e.target.value)}
                  className="input input-bordered input-sm bg-neutral-950 border-neutral-800 rounded-none w-full text-white text-sm"
                />
                <input 
                  type="url" 
                  placeholder="GitHub Code URL" 
                  value={newProjGit}
                  onChange={e => setNewProjGit(e.target.value)}
                  className="input input-bordered input-sm bg-neutral-950 border-neutral-800 rounded-none w-full text-white text-sm"
                />
                <textarea 
                  placeholder="Key Features/Bullet Points (One per line)" 
                  value={newProjBullets}
                  onChange={e => setNewProjBullets(e.target.value)}
                  className="textarea textarea-bordered textarea-sm bg-neutral-950 border-neutral-800 rounded-none w-full text-white text-sm h-24"
                />
                <button type="submit" className="btn btn-sm bg-white text-black hover:bg-neutral-200 border-none rounded-none mt-2">
                  Create Project
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Horizontal Slider Viewport */}
        <div className="w-full overflow-hidden mt-16 lg:mt-20 flex-1 flex flex-col justify-center">
          <div 
            className="projects-track flex flex-col lg:flex-row h-full"
            style={{ 
              width: isDesktop && projects.length > 0 ? `${projects.length * 100}%` : '100%'
            }}
          >
            {projects.map((proj, idx) => (
              <div 
                key={proj._id} 
                className="project-slide w-full shrink-0 min-h-[55vh] lg:h-full flex flex-col lg:flex-row items-center justify-center relative px-2 md:px-12 py-12 lg:py-4 border-b border-neutral-900 lg:border-none"
                style={{ width: isDesktop && projects.length > 0 ? `${100 / projects.length}%` : '100%' }}
              >
                
                {/* Giant outlined background text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
                  <span className="project-bg-text text-[12vw] font-black uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.025)] tracking-[0.2em] whitespace-nowrap">
                    {proj.title.split(' ')[0]}
                  </span>
                </div>

                <div className="max-w-[1300px] w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 relative z-10 px-6 lg:px-16">
                  {/* Left side: Project Text and Tech Details */}
                  <div className="project-info flex-1 max-w-xl flex flex-col gap-4 text-left">
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">{proj.category || 'MERN Stack'}</span>
                    <h4 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">{proj.title}</h4>
                    <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">{proj.description}</p>
                    
                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[9px] tracking-wider uppercase font-semibold text-neutral-300 bg-neutral-900 py-1.5 px-2.5 border border-neutral-800">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-4">
                      <button 
                        onClick={() => setShowProjectModal(proj)}
                        className="btn btn-sm btn-ghost hover:bg-neutral-900 hover:text-white text-neutral-300 font-semibold rounded-none flex items-center gap-1.5 border border-neutral-855 flex-1 py-3 h-auto"
                      >
                        <Eye size={14} />
                        <span>View Highlights</span>
                      </button>
                      {proj.liveLink && (
                        <a 
                          href={proj.liveLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-sm bg-white text-black hover:bg-neutral-200 border-none font-bold rounded-none flex items-center gap-1.5 flex-1 py-3 h-auto justify-center"
                        >
                          <ExternalLink size={14} />
                          <span>Live Demo</span>
                        </a>
                      )}
                      {isAdmin && (
                        <button 
                          onClick={() => handleDeleteProject(proj._id)}
                          className="btn btn-sm btn-outline border-neutral-800 text-red-500 hover:bg-red-950 hover:text-white hover:border-red-900 rounded-none p-2 shrink-0"
                          title="Delete Project"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right side: Floating CSS Mockup Dashboard Card */}
                  <div className="project-visual flex-1 flex justify-center items-center w-full lg:w-auto h-72 lg:h-[400px] relative">
                    <div className="w-64 h-80 md:w-72 md:h-[360px] bg-neutral-950 border border-neutral-900 p-6 shadow-2xl flex flex-col justify-between animate-float relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-8 -mt-8"></div>
                      
                      {/* Header */}
                      <div className="flex justify-between items-center border-b border-neutral-900 pb-3">
                        <span className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">PROJECT DASHBOARD</span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                      </div>
                      
                      {/* Dynamic details dependent on project */}
                      <div className="flex-1 flex flex-col justify-center gap-3 py-4">
                        {proj.title.includes('ApplyWise') ? (
                          <div className="flex flex-col gap-2 font-mono text-left">
                            <div className="text-[9px] text-neutral-500">&gt;_ APPLICATIONS TRACKER</div>
                            <div className="h-5 bg-neutral-900 border border-neutral-850 flex items-center px-2 text-[9px] text-white justify-between">
                              <span>Google API</span>
                              <span className="text-green-400 font-bold">Passed</span>
                            </div>
                            <div className="h-5 bg-neutral-900 border border-neutral-850 flex items-center px-2 text-[9px] text-white justify-between">
                              <span>Cloudinary upload</span>
                              <span className="text-blue-400">Synced</span>
                            </div>
                            <div className="h-5 bg-neutral-900 border border-neutral-850 flex items-center px-2 text-[9px] text-white justify-between">
                              <span>JWT Authentication</span>
                              <span className="text-white">Active</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2 font-mono text-left">
                            <div className="text-[9px] text-neutral-500">&gt;_ BIDDING SYSTEM</div>
                            <div className="h-5 bg-neutral-900 border border-neutral-850 flex items-center px-2 text-[9px] text-white justify-between">
                              <span>Buyer post reqs</span>
                              <span className="text-blue-400 font-bold">Online</span>
                            </div>
                            <div className="h-5 bg-neutral-900 border border-neutral-850 flex items-center px-2 text-[9px] text-white justify-between">
                              <span>Seller bidding engine</span>
                              <span className="text-green-400">Active</span>
                            </div>
                            <div className="h-5 bg-neutral-900 border border-neutral-850 flex items-center px-2 text-[9px] text-white justify-between">
                              <span>Role RBAC checks</span>
                              <span className="text-neutral-450">Verified</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Footer */}
                      <div className="flex justify-between items-center border-t border-neutral-900 pt-3 text-[9px] font-mono text-neutral-500">
                        <span>CLIENT-SIDE SPA</span>
                        <span>DB DESIGNED</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Glide Numerical Navigation indicators */}
        <div className="flex gap-6 justify-center items-center mt-6 lg:mt-8 font-mono">
          {projects.map((proj, idx) => (
            <button
              key={proj._id}
              onClick={() => scrollToProject(idx)}
              className={`text-lg font-bold transition-all duration-300 flex items-center gap-1.5 ${activeProjectIndex === idx ? 'text-white scale-110' : 'text-neutral-600 hover:text-white'}`}
            >
              <span className="text-xs">{String(idx + 1).padStart(2, '0')}</span>
              <span className={`h-[1px] bg-white transition-all duration-300 ${activeProjectIndex === idx ? 'w-8' : 'w-0'}`}></span>
            </button>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6 lg:px-16 max-w-[1300px] mx-auto border-t border-neutral-900 min-h-svh flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 w-full">
          
          {/* Quick Info */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-xs tracking-widest text-neutral-500 font-bold uppercase">05 / Contact</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Let's Connect</h3>
            </div>
            
            <p className="text-neutral-400 leading-relaxed font-light">
              Have a project proposal, job opportunity, or just want to chat about web scalability and databases? Send a message directly and I will get back to you promptly.
            </p>

            <div className="flex flex-col gap-4 text-sm font-semibold tracking-wide">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-neutral-500" />
                <a href="mailto:rautrohan893@gmail.com" className="hover:text-neutral-300 transition text-white">
                  rautrohan893@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-neutral-500" />
                <a href="tel:+919356447941" className="hover:text-neutral-300 transition text-white">
                  +91-9356447941
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 border border-neutral-900 bg-neutral-950/40 p-8 md:p-10 relative">
            <h4 className="text-xl font-bold text-white mb-6">Send Message</h4>
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Your Name</label>
                  <input 
                    type="text" 
                    value={contactName}
                    onChange={e => setContactName(e.target.value)}
                    placeholder="John Doe" 
                    className="input bg-black border-neutral-850 hover:border-neutral-700 focus:border-white focus:outline-none rounded-none text-white text-sm px-4"
                    required 
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Email Address</label>
                  <input 
                    type="email" 
                    value={contactEmail}
                    onChange={e => setContactEmail(e.target.value)}
                    placeholder="john@example.com" 
                    className="input bg-black border-neutral-850 hover:border-neutral-700 focus:border-white focus:outline-none rounded-none text-white text-sm px-4"
                    required 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Subject</label>
                <input 
                  type="text" 
                  value={contactSubject}
                  onChange={e => setContactSubject(e.target.value)}
                  placeholder="Job Opportunity" 
                  className="input bg-black border-neutral-850 hover:border-neutral-700 focus:border-white focus:outline-none rounded-none text-white text-sm px-4"
                  required 
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Message Body</label>
                <textarea 
                  value={contactMessage}
                  onChange={e => setContactMessage(e.target.value)}
                  placeholder="Hi Rohan, I read your resume and wanted to discuss..." 
                  className="textarea bg-black border-neutral-850 hover:border-neutral-700 focus:border-white focus:outline-none rounded-none text-white text-sm px-4 h-32 py-3"
                  required 
                />
              </div>

              <button 
                type="submit" 
                className="btn bg-white text-black hover:bg-neutral-200 border-none font-bold rounded-none w-full mt-4"
              >
                Send message
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Admin Panel Modal Overlay */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="border border-neutral-800 bg-neutral-950 w-full max-w-sm p-8 flex flex-col gap-6 relative rounded-none">
            <button 
              onClick={() => setShowAdminLogin(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white"
            >
              <X size={18} />
            </button>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-3 bg-neutral-900 border border-neutral-800 text-white mb-2">
                <Lock size={20} />
              </div>
              <h4 className="text-xl font-bold text-white">Admin Dashboard Login</h4>
              <p className="text-xs text-neutral-500">Authenticate to view submitted messages & edit data.</p>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Username" 
                value={adminUsername}
                onChange={e => setAdminUsername(e.target.value)}
                className="input input-bordered bg-black border-neutral-800 rounded-none w-full text-white text-sm focus:outline-none focus:border-white" 
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={adminPassword}
                onChange={e => setAdminPassword(e.target.value)}
                className="input input-bordered bg-black border-neutral-800 rounded-none w-full text-white text-sm focus:outline-none focus:border-white" 
                required 
              />
              <button 
                type="submit" 
                className="btn bg-white text-black hover:bg-neutral-200 border-none font-bold rounded-none w-full mt-2"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Detail Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="border border-neutral-800 bg-neutral-950 w-full max-w-2xl p-8 flex flex-col gap-6 relative rounded-none max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowProjectModal(null)}
              className="absolute top-6 right-6 text-neutral-500 hover:text-white transition"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col gap-2 mt-4">
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">{showProjectModal.category || 'MERN STACK'}</span>
              <h3 className="text-3xl font-bold text-white">{showProjectModal.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {showProjectModal.technologies.map((t, idx) => (
                <span key={idx} className="text-[10px] tracking-wider uppercase font-semibold text-neutral-400 bg-black py-1 px-2.5 border border-neutral-900">
                  {t}
                </span>
              ))}
            </div>

            <div className="divider divider-neutral my-1"></div>

            <div className="flex flex-col gap-4 text-sm text-neutral-300">
              <h4 className="font-bold text-white">Project Highlights & Architecture:</h4>
              <ul className="list-none flex flex-col gap-3">
                {showProjectModal.bulletPoints && showProjectModal.bulletPoints.length > 0 ? (
                  showProjectModal.bulletPoints.map((point, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-white shrink-0"></span>
                      <span className="leading-relaxed font-light">{point}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex gap-2.5 items-start">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-white shrink-0"></span>
                    <span className="leading-relaxed font-light">{showProjectModal.description}</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="flex gap-4 mt-4">
              {showProjectModal.liveLink && (
                <a 
                  href={showProjectModal.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn bg-white text-black hover:bg-neutral-200 border-none font-bold rounded-none flex-1 flex items-center justify-center gap-2"
                >
                  <ExternalLink size={16} />
                  <span>Launch Live Site</span>
                </a>
              )}
              <a 
                href={showProjectModal.githubLink || 'https://github.com/RohanRaut21'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline border-neutral-700 text-neutral-450 hover:bg-white hover:text-black hover:border-white rounded-none flex-1 flex items-center justify-center gap-2"
              >
                <Github size={16} />
                <span>Code Repository</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Admin Message Inbox Dashboard Overlay (Shown below navbar if showDashboard is true) */}
      {showDashboard && isAdmin && (
        <section className="bg-neutral-950 border-y border-neutral-800 py-12 px-6 lg:px-16 animate-fade-in relative z-30">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Security: Authenticated Session</span>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <User size={20} />
                  <span>Admin Inbox & Logs</span>
                </h3>
              </div>
              <button 
                onClick={() => setShowDashboard(false)}
                className="btn btn-sm btn-ghost hover:bg-neutral-900 border border-neutral-800 rounded-none text-xs text-neutral-450"
              >
                Hide Dashboard
              </button>
            </div>

            {/* Messages Inbox */}
            <div className="flex flex-col gap-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare size={16} />
                <span>Submissions ({messages.length})</span>
              </h4>
              
              {messages.length === 0 ? (
                <div className="border border-neutral-900 p-8 text-center text-neutral-500 text-sm font-mono">
                  No contact submissions found in database.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {messages.map(msg => (
                    <div 
                      key={msg._id}
                      className={`border p-6 flex flex-col md:flex-row justify-between gap-6 transition ${msg.isRead ? 'border-neutral-950 bg-black' : 'border-white/30 bg-neutral-950'}`}
                    >
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-white font-bold text-base">{msg.name}</span>
                          <span className="text-xs text-neutral-500 font-mono flex items-center gap-1">
                            <Mail size={12}/> {msg.email}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1">
                            <Calendar size={12}/> {new Date(msg.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm font-semibold text-neutral-300 mt-1">
                          Subject: {msg.subject}
                        </div>
                        <p className="text-sm text-neutral-400 mt-2 whitespace-pre-line leading-relaxed font-light">
                          {msg.message}
                        </p>
                      </div>

                      <div className="flex md:flex-col justify-end items-end gap-2 shrink-0">
                        <button 
                          onClick={() => handleToggleRead(msg._id, msg.isRead)}
                          className="btn btn-xs btn-outline border-neutral-700 hover:bg-neutral-900 rounded-none text-[10px] font-mono flex items-center gap-1"
                        >
                          {msg.isRead ? (
                            <>
                              <Square size={10} />
                              <span>Mark Unread</span>
                            </>
                          ) : (
                            <>
                              <CheckSquare size={10} />
                              <span>Mark Read</span>
                            </>
                          )}
                        </button>
                        <button 
                          onClick={() => handleDeleteMessage(msg._id)}
                          className="btn btn-xs btn-ghost text-red-500 hover:text-red-400 hover:bg-transparent rounded-none text-[10px] font-mono flex items-center gap-1 p-0 mt-1"
                        >
                          <Trash2 size={10} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-black border-t border-neutral-900 py-12 px-6 lg:px-16 text-center text-xs text-neutral-500 font-light flex flex-col gap-4">
        <div>
          &copy; {new Date().getFullYear()} Rohan Raut. Designed & Built in MERN stack.
        </div>
        <div className="flex justify-center gap-4 text-[10px] uppercase font-mono tracking-widest">
          <a href="#about" className="hover:text-neutral-300">About</a>
          <span>&middot;</span>
          <a href="#experience" className="hover:text-neutral-300">Experience</a>
          <span>&middot;</span>
          <a href="#skills" className="hover:text-neutral-300">Skills</a>
          <span>&middot;</span>
          <a href="#projects" className="hover:text-neutral-300">Projects</a>
        </div>
      </footer>

    </div>
  );
}

export default App;
