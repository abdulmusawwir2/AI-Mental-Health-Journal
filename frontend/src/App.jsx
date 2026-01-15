import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <AuthProvider>
          <div className="min-h-screen bg-background text-slate-900 font-sans">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </main>
          </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
