import { useEffect, useState, useContext } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

import axios from '../lib/axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { AuthContext } from './AuthContext';

const LoginPage = () => {

    useEffect(() => {
        document.title = 'Log In';
    }, []);

    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });

    const { login } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.identifier || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post("/users/login", formData);

            login(res.data.user, res.data.token);

            toast.success('Login successfully! Redirecting...');
        
            navigate(`/users/${res.data.username}/jobs`);
        } catch (error) {
            toast.error('Error logging in. Please try again.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="container max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-base-content/70 text-lg">Sign in to continue tracking your job applications</p>
        </div>

        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body p-8">
            <div className="form-control mb-4">
              <label className="label"><span className="label-text font-semibold"><Mail className="inline mr-2" size={18} />Username or Email Address</span></label>
              <input type="email" name="identifier" placeholder="juan@example.com" className="input input-bordered input-lg" value={formData.identifier} onChange={handleChange} required />
            </div>

            <div className="form-control mb-6">
              <label className="label"><span className="label-text font-semibold"><Lock className="inline mr-2" size={18} />Password</span></label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" className="input input-bordered input-lg w-full pr-12" value={formData.password} onChange={handleChange} required />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              </div>
              <label className="label"><a href="/forgot-password" className="label-text-alt link link-hover link-primary">Forgot password?</a></label>
            </div>

            <button type="button" className="btn btn-primary btn-lg w-full mb-4" onClick={handleSubmit} disabled={loading}>
              {loading ? (<><span className="loading loading-spinner loading-sm"></span>Signing In...</>) : ('Sign In')}
            </button>

            <div className="divider">OR</div>

            <div className="text-center">
              <p className="text-base-content/70">Don't have an account? <a href="/signup" className="link link-primary font-semibold">Sign up here</a></p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-base-content/60">By signing in, you agree to our <a href="/terms" className="link link-hover">Terms of Service</a> and <a href="/privacy" className="link link-hover">Privacy Policy</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;