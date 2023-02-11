import Login from './components/Login';
import NotFound from './components/NotFound';
import Join from './components/Join';

import Start from './pages/Start';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
