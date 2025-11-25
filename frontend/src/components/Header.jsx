import { useNavigate, useParams } from 'react-router';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../pages/AuthContext';
import { Briefcase, Home, Info, LogIn, LogOut, User, UserPlus } from 'lucide-react';

export const Header = () => {

    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useContext(AuthContext);

    const nav = isAuthenticated ? `/users/${user.username}/jobs` : "/home";

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
                <Link to ={nav} className="btn btn-ghost btn-sm">
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
                    {/* Hamburger Button */}
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </div>

                    {/* Dropdown Menu */}
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52" >
                        {isAuthenticated ? (
                        <>
                            <li className="menu-title">
                                <span>Hello, {user.first_name}!</span>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation(`/users/${user.username}/profile`)}>
                                    <User size={16} /> Profile
                                </button>
                            </li>
                            <li>
                                <button onClick={handleLogout}>
                                    <LogOut size={16} /> Log Out
                                </button>
                            </li>
                        </>
                        ) : (
                        <>
                            <li>
                                <button onClick={() => handleNavigation('/login')}>
                                    <LogIn size={16} /> Log In
                                </button>
                            </li>
                            <li>
                                <button onClick={() => handleNavigation('/signup')}>
                                    <UserPlus size={16} /> Sign Up
                                </button>
                            </li>
                        </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};
