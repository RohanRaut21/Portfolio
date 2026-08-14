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
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
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
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
      </svg>
    );
  }
  if (normalized === 'css' || normalized === 'css3') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1572B6] shrink-0" fill="currentColor">
        <path d="M0 0v20.16A3.84 3.84 0 0 0 3.84 24h16.32A3.84 3.84 0 0 0 24 20.16V3.84A3.84 3.84 0 0 0 20.16 0Zm14.256 13.08c1.56 0 2.28 1.08 2.304 2.64h-1.608c.024-.288-.048-.6-.144-.84-.096-.192-.288-.264-.552-.264-.456 0-.696.264-.696.84-.024.576.288.888.768 1.08.72.288 1.608.744 1.92 1.296q.432.648.432 1.656c0 1.608-.912 2.592-2.496 2.592-1.656 0-2.4-1.032-2.424-2.688h1.68c0 .792.264 1.176.792 1.176.264 0 .456-.072.552-.24.192-.312.24-1.176-.048-1.512-.312-.408-.912-.6-1.32-.816q-.828-.396-1.224-.936c-.24-.36-.36-.888-.36-1.536 0-1.44.936-2.472 2.424-2.448m5.4 0c1.584 0 2.304 1.08 2.328 2.64h-1.608c0-.288-.048-.6-.168-.84-.096-.192-.264-.264-.528-.264-.48 0-.72.264-.72.84s.288.888.792 1.08c.696.288 1.608.744 1.92 1.296.264.432.408.984.408 1.656.024 1.608-.888 2.592-2.472 2.592-1.68 0-2.424-1.056-2.448-2.688h1.68c0 .744.264 1.176.792 1.176.264 0 .456-.072.552-.24.216-.312.264-1.176-.048-1.512-.288-.408-.888-.6-1.32-.816-.552-.264-.96-.576-1.2-.936s-.36-.888-.36-1.536c-.024-1.44.912-2.472 2.4-2.448m-11.031.018c.711-.006 1.419.198 1.839.63.432.432.672 1.128.648 1.992H9.336c.024-.456-.096-.792-.432-.96-.312-.144-.768-.048-.888.24-.12.264-.192.576-.168.864v3.504c0 .744.264 1.128.768 1.128a.65.65 0 0 0 .552-.264c.168-.24.192-.552.168-.84h1.776c.096 1.632-.984 2.712-2.568 2.688-1.536 0-2.496-.864-2.472-2.472v-4.032c0-.816.24-1.44.696-1.848.432-.408 1.146-.624 1.857-.63"/>
      </svg>
    );
  }
  if (normalized.includes('react')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#61DAFB] shrink-0" fill="currentColor">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
      </svg>
    );
  }
  if (normalized.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#06B6D4] shrink-0" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>
    );
  }
  if (normalized === 'node') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#339933] shrink-0" fill="currentColor">
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
      </svg>
    );
  }
  if (normalized.includes('express')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white shrink-0" fill="currentColor">
        <path d="M12.262 16.666h1.146l6.975-9.325H19.22zm9.778 1.441v.004l-4.334-5.706-.557.74 4.873 6.682H.945V4.173h9.505l5.026 6.7.574-.772-4.374-5.928h.003l-.719-.945H0v17.544h24zM10.917 8.705a3.8 3.8 0 0 0-1.292-1.183q-.796-.45-1.916-.45c-.746 0-1.37.14-1.906.424a3.76 3.76 0 0 0-1.31 1.12 4.9 4.9 0 0 0-.75 1.581 7.17 7.17 0 0 0 0 3.696c.148.567.402 1.101.75 1.573a3.5 3.5 0 0 0 1.31 1.066q.803.39 1.906.389 1.77 0 2.739-.868.966-.867 1.328-2.457h-1.139q-.271 1.084-.977 1.734-.704.651-1.952.65-.812 0-1.392-.342a3.1 3.1 0 0 1-.957-.869 3.5 3.5 0 0 1-.551-1.182 5 5 0 0 1-.17-1.133 9 9 0 0 0-.015-.286 4.5 4.5 0 0 1 .015-.829c.047-.418.147-.83.296-1.223A3.7 3.7 0 0 1 5.54 9.05a2.9 2.9 0 0 1 .922-.742q.541-.28 1.246-.28c.47 0 .869.093 1.23.28q.541.281.922.742.379.461.587 1.057t.225 1.246H5.625l.004.957h6.182a7.3 7.3 0 0 0-.18-1.924 4.9 4.9 0 0 0-.715-1.68z"/>
      </svg>
    );
  }
  if (normalized.includes('mongodb')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#47A248] shrink-0" fill="currentColor">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
      </svg>
    );
  }
  if (normalized.includes('mysql')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#00758F] shrink-0" fill="currentColor">
        <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z"/>
      </svg>
    );
  }
  if (normalized === 'git') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F05032] shrink-0" fill="currentColor">
        <path d="M13.09 23.549a1.54 1.54 0 0 1-2.18 0L.451 13.089a1.54 1.54 0 0 1 0-2.179l7.191-7.19 2.733 2.733a1.85 1.85 0 0 0 .964 2.326v6.66a1.849 1.849 0 1 0 1.54 0V8.957l2.508 2.508a1.85 1.85 0 1 0 1.09-1.09l-2.634-2.634a1.85 1.85 0 0 0-2.378-2.377L8.73 2.63 10.91.451a1.54 1.54 0 0 1 2.179 0l10.459 10.46a1.54 1.54 0 0 1 0 2.179z"/>
      </svg>
    );
  }
  if (normalized === 'github') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white shrink-0" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    );
  }
  if (normalized === 'postman') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#FF6C37] shrink-0" fill="currentColor">
        <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z"/>
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
;

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
