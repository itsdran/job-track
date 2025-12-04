import { Briefcase, LogIn, User, UserPlus } from 'lucide-react';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router';
import { useEffect, useContext } from 'react';

import { AuthContext } from './AuthContext';

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Job Tracker';
    }, []);

    const { user, logout, isAuthenticated } = useContext(AuthContext);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <>
            <Header/>
            <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
                <div className="text-center max-w-2xl">
                    <div className="flex justify-center mb-8"><Briefcase size={120} className="text-primary" /></div>
                    <h1 className="text-6xl font-bold mb-4">Welcome to JobTrack</h1>
                    <p className="text-2xl text-base-content/70 mb-12">Track your job applications with ease</p>

                    {isAuthenticated ? (
                        <div className="flex gap-4 justify-center flex-wrap">
                            <button onClick={() => handleNavigation(`/users/${user.username}/jobs`)} className="btn btn-primary btn-lg gap-2">
                                <Briefcase size={24} />
                                Dashboard
                            </button>
                            <button onClick={() => handleNavigation(`/users/${user.username}/profile`)} className="btn btn-outline btn-lg gap-2">
                                <User size={24} />
                                Profile
                            </button>
                        </div>
                    ): (
                        <div className="flex gap-4 justify-center flex-wrap">
                            <button onClick={() => handleNavigation('auth/login')} className="btn btn-primary btn-lg gap-2">
                                <LogIn size={24} />
                                Log In
                            </button>
                            <button onClick={() => handleNavigation('auth/signup')} className="btn btn-outline btn-lg gap-2">
                                <UserPlus size={24} />
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>

    );
};

export default HomePage;