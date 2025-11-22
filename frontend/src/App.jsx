import { Routes, Route } from 'react-router';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import ViewApplications from './pages/ViewApplications';
import RecordJobApplication from './pages/RecordJobApplication';
import ViewJob from './pages/JobDetail';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="users/:username/jobs" element={<ViewApplications />} />
        <Route path="users/:username/jobs/record" element={<RecordJobApplication />} />
        <Route path="users/:username/jobs/:job_id" element={<ViewJob />} />
      </Routes>
    </>
  )
}

export default App
