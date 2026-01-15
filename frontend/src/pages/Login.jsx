import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        await login(formData);
    } catch (err) {
        setError(err.toString());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Welcome Back</h2>
            <p className="text-center text-slate-500 mb-8">Sign in to continue your wellness journey</p>
            
            {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center">
                    {error}
                </div>
            )}

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
                required
              />
            </div>
            <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-indigo-200"
            >
              Sign In
            </button>
          </form>

            <div className="mt-6 text-center text-sm text-slate-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary font-bold hover:underline">
                    Sign Up
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
