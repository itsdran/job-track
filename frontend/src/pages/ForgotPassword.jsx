import React, { useState } from 'react';
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';

const ForgotPasswordPage = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailOrUsername) {
        alert('Please enter your email or username');
        return;
        }

        setLoading(true);

        try {
        // TODO: Replace with your actual API endpoint
        const response = await fetch('http://localhost:5001/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailOrUsername })
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        setEmailSent(true);

        } catch (error) {
        alert('Error sending reset email. Please check your email/username.');
        console.error('Forgot password error:', error);
        } finally {
        setLoading(false);
        }
    };

    const handleBack = () => {
        window.history.back();
    };

    if (emailSent) {
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
                <h2 className="text-3xl font-bold mb-4">Check Your Email</h2>
                <p className="text-lg text-base-content/70 mb-6">We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.</p>
                <div className="alert alert-info mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div className="text-left">
                    <div className="text-xs">The link will expire in 1 hour. If you don't see the email, check your spam folder.</div>
                    </div>
                </div>
                <button onClick={() => setEmailSent(false)} className="btn btn-ghost w-full">Send Another Email</button>
                <a href="/login" className="btn btn-primary w-full mt-2">Back to Login</a>
                </div>
            </div>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
        <div className="container max-w-md">
            <div className="mb-6">
            <button onClick={handleBack} className="btn btn-ghost btn-sm">
                <ArrowLeft size={20} />
                Back
            </button>
            </div>

            <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <Mail size={40} className="text-primary-content" />
                </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">Forgot Password?</h1>
            <p className="text-base-content/70 text-lg">No worries! Enter your email or username and we'll send you a reset link</p>
            </div>

            <div className="card bg-base-100 shadow-2xl">
            <div className="card-body p-8">
                <div className="form-control mb-6">
                <label className="label">
                    <span className="label-text font-semibold">
                    <Mail className="inline mr-2" size={18} />
                    Email or Username
                    </span>
                </label>
                <input type="text" name="emailOrUsername" placeholder="Enter your email or username" className="input input-bordered input-lg" value={emailOrUsername} onChange={(e) => setEmailOrUsername(e.target.value)} required />
                <label className="label">
                    <span className="label-text-alt">We'll send a password reset link to your email</span>
                </label>
                </div>

                <button type="button" className="btn btn-primary btn-lg w-full mb-4" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                    <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Sending...
                    </>
                ) : (
                    <>
                    <Send size={20} />
                    Send Reset Link
                    </>
                )}
                </button>

                <div className="divider">OR</div>

                <div className="text-center">
                <p className="text-base-content/70">Remember your password? <a href="/login" className="link link-primary font-semibold">Log in here</a></p>
                </div>
            </div>
            </div>

            <div className="text-center mt-6">
            <p className="text-sm text-base-content/60">Don't have an account? <a href="/signup" className="link link-hover link-primary font-semibold">Sign up</a></p>
            </div>
        </div>
        </div>
    );
};

export default ForgotPasswordPage;