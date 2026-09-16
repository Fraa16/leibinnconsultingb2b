import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import KontaktPage from './pages/KontaktPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kontakt" element={<KontaktPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
