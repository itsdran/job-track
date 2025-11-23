import { useNavigate, useParams } from 'react-router';

import { Briefcase, Home, Info, LogOut, User } from 'lucide-react';

export const Header = () => {

    const navigate = useNavigate();

    const user = {
        name: 'Dran',
        initials: 'D',
        avatar: null // Set to image URL if available
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
        // TODO: Clear auth token and redirect
        // localStorage.removeItem('token');
        // window.location.href = '/login';
        console.log('Logging out...');
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="navbar bg-base-100 shadow-lg px-4 sticky top-0 z-50">
            <div className="navbar-start">
                <button onClick={() => handleNavigation('/jobs')} className="btn btn-ghost text-xl font-bold">
                <Briefcase size={28} className="text-primary" />
                <span className="text-2xl">JobTrack</span>
                </button>
            </div>

            <div className="navbar-end gap-2">
                <button onClick={() => handleNavigation('/jobs')} className="btn btn-ghost btn-sm">
                    <Home size={18} />
                    <span className="hidden md:inline">Home</span>
                </button>
                
                <button onClick={() => handleNavigation('/about')} className="btn btn-ghost btn-sm">
                    <Info size={18} />
                    <span className="hidden md:inline">About</span>
                </button>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                        {user.avatar ? (<img src={user.avatar} alt={user.name} />) : (<span>{user.initials}</span>)}
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52">
                        <li className="menu-title"><span>Hello, {user.name}!</span></li>
                        <li><button onClick={() => handleNavigation('/profile')}><User size={16} />Profile</button></li>
                        <li><button onClick={handleLogout}><LogOut size={16} />Log Out</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
