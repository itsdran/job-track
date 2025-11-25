import { useNavigate } from 'react-router';
import { Header } from '../components/Header';

import { Briefcase, Code, Database, Zap, Search, TrendingUp, Shield, Users, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect } from 'react';

const AboutPage = () => {

    useEffect(() => {
        document.title = 'Job Tracker: About';
    }, []);

    const year = new Date().getFullYear();

    const features = [
        { icon: <Briefcase size={32} />, title: 'Job Application Tracking', description: 'Keep track of all your job applications in one organized place with detailed information for each position.' },
        { icon: <Search size={32} />, title: 'Smart Search & Filters', description: 'Quickly find applications using powerful search and filter options by status, company, or location.' },
        { icon: <TrendingUp size={32} />, title: 'Application Analytics', description: 'View statistics and insights about your job hunting progress with real-time dashboard metrics.' },
        { icon: <Zap size={32} />, title: 'Status Management', description: 'Track your application journey from initial submission to final interview and beyond.' },
        { icon: <Shield size={32} />, title: 'Secure Authentication', description: 'Your data is protected with secure user authentication and password encryption.' },
        { icon: <Users size={32} />, title: 'User Profiles', description: 'Create a comprehensive profile with your skills, preferences, and career goals.' }
    ];

    const techStack = [
        { name: 'MongoDB', description: 'NoSQL database for flexible data storage', color: 'badge-success' },
        { name: 'Express.js', description: 'Backend framework for RESTful APIs', color: 'badge-warning' },
        { name: 'React', description: 'Frontend library for dynamic UI', color: 'badge-info' },
        { name: 'Node.js', description: 'JavaScript runtime environment', color: 'badge-accent' },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework', color: 'badge-primary' },
        { name: 'DaisyUI', description: 'Component library for Tailwind', color: 'badge-secondary' }
    ];


    return (
        <>
            <Header />
            <div className="min-h-screen bg-base-200">
                <div className="container mx-auto px-6 py-12 max-w-6xl">
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-4"><Briefcase size={64} className="text-primary" /></div>
                        <h1 className="text-5xl font-bold mb-4">About JobTrack</h1>
                        <p className="text-xl text-base-content/70 max-w-2xl mx-auto">A comprehensive job application tracking system built with passion and purpose</p>
                    </div>

                    <div className="card bg-base-100 shadow-xl mb-8">
                        <div className="card-body p-8">
                            <h2 className="card-title text-3xl mb-4 flex items-center gap-2"><Code size={32} className="text-primary" />The Story Behind This Project</h2>
                            <div className="space-y-4 text-lg">
                                <p>JobTrack is a personal project developed by <span className="font-bold text-primary">Dranoel Rubio Flores</span> as a hands-on learning journey into the MERN stack. This project represents more than just code—it's a testament to the dedication of mastering full-stack web development while creating something genuinely useful.</p>
                                <p>My job hunting experience was overwhelming, with applications scattered across different platforms and spreadsheets. This system was born from the need to organize and streamline the job application process, making it easier to track progress and stay motivated during the search.</p>
                                <p>Through building JobTrack, valuable experience was gained in designing RESTful APIs, managing databases, creating responsive user interfaces, and implementing secure authentication—all while solving a real-world problem that many job seekers face.</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="text-4xl font-bold text-center mb-8">Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((feature, index) => (
                            <div key={index} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow">
                                <div className="card-body items-center text-center">
                                    <div className="text-primary mb-3">{feature.icon}</div>
                                    <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                                    <p className="text-base-content/70">{feature.description}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl mb-8">
                        <div className="card-body p-8">
                            <h2 className="card-title text-3xl mb-4 flex items-center gap-2"><Database size={32} className="text-primary" />Tech Stack</h2>
                            <p className="text-lg mb-6 text-base-content/70">Built with modern technologies to ensure performance, scalability, and maintainability:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {techStack.map((tech, index) => (
                                    <div key={index} className="flex flex-col gap-2 p-4 rounded-lg bg-base-200">
                                        <div className="flex items-center gap-2">
                                            <span className={`badge ${tech.color} badge-lg font-bold`}>{tech.name}</span>
                                        </div>
                                        <p className="text-sm text-base-content/70">{tech.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-xl">
                        <div className="card-body p-8 text-center">
                            <h2 className="card-title text-3xl mb-4 justify-center">Get In Touch</h2>
                            <p className="text-lg mb-6 opacity-90">Have feedback or want to collaborate? Feel free to reach out!</p>
                            <div className="flex justify-center gap-4 flex-wrap">
                                <a href="https://github.com/itsdran" target="_blank" rel="noopener noreferrer"
                                    className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">                                    
                                <   Github size={24} /> GitHub
                                </a>
                                <a href="https://www.linkedin.com/in/dranoelflores" target="_blank"  rel="noopener noreferrer" 
                                    className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
                                    <Linkedin size={24} /> LinkedIn
                                </a>
                                <a href="mailto:dranoelflores@gmail.com" target="_blank"  rel="noopener noreferrer" 
                                    className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary">
                                    <Mail size={24} /> Email
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12 text-base-content/60">
                        <p className="text-sm">© {year} JobTrack. Built with ❤️ as a MERN stack learning project.</p>
                        <p className="text-sm mt-2">This project is continuously evolving with new features and improvements.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;