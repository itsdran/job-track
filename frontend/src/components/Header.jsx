import { useNavigate, useParams } from 'react-router';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../pages/AuthContext';
import { Briefcase, Home, Info, LogOut, User } from 'lucide-react';

import toast from 'react-hot-toast';

export const Header = () => {

    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated === false) {
            toast.error("Log in first!");
            const timer = setTimeout(() => {
                navigate("/login");
            }, 50); 

            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            logout(); 
            navigate("/login");
            console.log("Logging out...");
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    }

    return (
        <div className="navbar bg-base-100 shadow-lg px-4 sticky top-0 z-50">
            <div className="navbar-start">
                <Link to ={`/users/${user.username}/jobs`} className="btn btn-ghost btn-sm">
                    <Briefcase size={28} className="text-primary" />
                    <span className="text-2xl">JobTrack</span>
                </Link>
            </div>

            <div className="navbar-end gap-2">
                <Link to ={`/home`} className="btn btn-ghost btn-sm">
                    <Home size={18} />
                    <span className="hidden md:inline">Home</span>
                </Link>
                
                <Link to ={`/about`} className="btn btn-ghost btn-sm">
                    <Info size={18} />
                    <span className="hidden md:inline">About</span>
                </Link>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                            {user?.profile ? (
                                <img src={user.profile} alt={user?.name || "User"} />
                            ) : (
                                <span>{user?.first_name?.[0].toUpperCase() || ""}</span>
                            )}
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52">
                        <li className="menu-title"><span>Hello, {user.first_name}!</span></li>
                        <li>
                            <button onClick={() => handleNavigation(`/users/${user.username}/profile`)}>
                                <User size={16} /> Profile
                            </button>                            
                        </li>
                        <li>
                            <button onClick={handleLogout}>
                                <LogOut size={16} />Log Out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
