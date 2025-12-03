import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

import toast from 'react-hot-toast';

import api from '../lib/axios';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.newPassword || !formData.confirmPassword) {
            toast.error('Please fill in all fields');
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const strongPasswordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;
        if (!strongPasswordRegex.test(formData.newPassword)) {
            toast.error('Password must be at least 12 characters and include uppercase, lowercase, number, and symbol.');
            return;
        }

        setLoading(true);

        try {
            const res = await api.post(`auth/reset-password/${token}`, formData);
            if (!res) {
                throw new Error(data.error || 'Password reset failed');
            }
            toast.success("Reset password successful! Redirecting to login...");

            setSuccess(true);
            
            setTimeout(() => {
                navigate('/auth/login');
            }, 3000);

        } catch (error) {
            toast.error(error.message || 'Error resetting password. The link may be invalid or expired.');
            console.error('Reset error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
            <div className="container max-w-md">
            <div className="card bg-base-100 shadow-2xl">
                <div className="card-body p-8 text-center">
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center">
                    <CheckCircle size={40} className="text-success-content" />
                    </div>
                </div>
                <h2 className="text-3xl font-bold mb-4">Password Reset Successful!</h2>
                <p className="text-lg text-base-content/70 mb-6">Your password has been reset successfully. You can now log in with your new password.</p>
                <p className="text-sm text-base-content/60">Redirecting to login page...</p>
                </div>
            </div>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4">
        <div className="container mx-auto max-w-md">
            <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <Lock size={40} className="text-primary-content" />
                </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">Reset Your Password</h1>
            <p className="text-base-content/70 text-lg">Enter your new password below</p>
            </div>

            <div className="card bg-base-100 shadow-2xl">
            <div className="card-body p-8">
                <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text font-semibold">
                    <Lock className="inline mr-2" size={18} />
                    New Password
                    </span>
                </label>
                <div className="relative">
                    <input type={showNewPassword ? "text" : "password"} name="newPassword" placeholder="Enter new password" className="input input-bordered input-lg w-full pr-12" value={formData.newPassword} onChange={handleChange} required />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <label className="label">
                    <span className="label-text-alt">Minimum 8 characters</span>
                </label>
                </div>

                <div className="form-control mb-6">
                <label className="label">
                    <span className="label-text font-semibold">
                    <Lock className="inline mr-2" size={18} />
                    Confirm New Password
                    </span>
                </label>
                <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm new password" className="input input-bordered input-lg w-full pr-12" value={formData.confirmPassword} onChange={handleChange} required />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                </div>

                <button type="button" className="btn btn-primary btn-lg w-full mb-4" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                    <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Resetting Password...
                    </>
                ) : (
                    <>
                    <Lock size={20} />
                    Reset Password
                    </>
                )}
                </button>

                <div className="alert alert-warning mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                    <h3 className="font-bold">Important</h3>
                    <div className="text-xs">This reset link will expire in 15 minutes. Make sure your new password is strong and unique.</div>
                </div>
                </div>
            </div>
            </div>

            <div className="text-center mt-6">
            <p className="text-sm text-base-content/60">Remember your password? <a href="auth/login" className="link link-hover link-primary font-semibold">Log in</a></p>
            </div>
        </div>
        </div>
    );
};

export default ResetPasswordPage;