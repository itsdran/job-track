import { Briefcase, LogIn, UserPlus } from 'lucide-react';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router';

const HomePage = () => {
    const navigate = useNavigate();
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
                    <div className="flex gap-4 justify-center flex-wrap">
                    <button onClick={() => handleNavigation('/login')} className="btn btn-primary btn-lg gap-2">
                        <LogIn size={24} />
                        Log In
                    </button>
                    <button onClick={() => handleNavigation('/signup')} className="btn btn-outline btn-lg gap-2">
                        <UserPlus size={24} />
                        Sign Up
                    </button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default HomePage;