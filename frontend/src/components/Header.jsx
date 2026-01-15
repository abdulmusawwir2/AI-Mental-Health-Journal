import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FaBook, FaRobot, FaSignOutAlt, FaUser } from 'react-icons/fa';

const Header = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    // Hide header on welcome page if needed, or style differently
    const isWelcome = location.pathname === '/';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
            
            {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
                <span className="text-2xl text-primary font-bold">Vaasa</span>
                <span className="text-sm text-slate-500 font-medium hidden sm:block">| Mental Wellness</span>
            </Link>
          </div>

          {/* Navigation */}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/journal" className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname.startsWith('/journal') ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:text-primary hover:bg-slate-50'}`}>
                <FaBook />
                <span className="hidden sm:inline">Journal</span>
              </Link>
              <Link to="/chat" className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/chat' ? 'bg-secondary/10 text-secondary' : 'text-slate-600 hover:text-secondary hover:bg-slate-50'}`}>
                <FaRobot />
                <span className="hidden sm:inline">AI Chat</span>
              </Link>
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
                  <div className="flex items-center gap-2 text-slate-700">
                      <FaUser className="text-slate-400" />
                      <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <button onClick={logout} className="text-slate-400 hover:text-red-500 transition-colors" title="Logout">
                      <FaSignOutAlt />
                  </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-slate-600 hover:text-primary font-medium text-sm transition-colors">
                Log In
              </Link>
              <Link to="/register" className="bg-primary hover:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-indigo-200">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
