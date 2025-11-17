import { Routes, Route } from 'react-router';

import ViewApplications from './pages/ViewApplications';
import RecordJobApplication from './pages/RecordJobApplication';
import ViewJob from './pages/JobDetail';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ViewApplications />} />
        <Route path="/record" element={<RecordJobApplication />} />
        <Route path="jobs/:id" element={<ViewJob />} />
      </Routes>
    </>
  )
}

export default App
