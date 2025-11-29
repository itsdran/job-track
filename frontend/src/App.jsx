import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import About from './pages/About'
import ProfilePage from './pages/ProfilePage';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ViewApplications from './pages/ViewApplications';
import RecordJobApplication from './pages/RecordJobApplication';
import ViewJob from './pages/JobDetail';

import { Toaster } from 'react-hot-toast';

import ProtectedRoute from "./components/ProtectedRoute.jsx";


function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="users/:username/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="users/:username/jobs" element={
          <ProtectedRoute>
            <ViewApplications />
          </ProtectedRoute>
        } />
        <Route path="users/:username/jobs/record" element={
          <ProtectedRoute>
            <RecordJobApplication />
          </ProtectedRoute>
        } />
        <Route path="users/:username/jobs/:job_id" element={
          <ProtectedRoute>
            <ViewJob />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
