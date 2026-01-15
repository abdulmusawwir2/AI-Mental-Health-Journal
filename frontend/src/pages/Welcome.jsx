import { Link } from 'react-router-dom';
import { FaBrain, FaHeart, FaRobot } from 'react-icons/fa';

const Welcome = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] justify-center items-center bg-background p-4 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-50 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-4xl w-full text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 tracking-tight leading-tight">
          Your Mind matters.
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          A safe space to journal your thoughts, track your moods, and find balance with AI-powered wellness insights.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16 text-left">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-primary mb-4 text-xl">
                    <FaBook />
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">Private Journal</h3>
                <p className="text-slate-500 text-sm">Write freely in your encrypted, private diary. Safe, secure, and always there for you.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-secondary mb-4 text-xl">
                    <FaHeart />
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">Mood Analysis</h3>
                <p className="text-slate-500 text-sm">Understand your emotional patterns with advanced sentiment analysis powered by Gemini.</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center text-accent mb-4 text-xl">
                    <FaRobot />
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">AI Wellness Chat</h3>
                <p className="text-slate-500 text-sm">Chat with a supportive, non-judgmental AI companion whenever you need to talk.</p>
            </div>
        </div>

        <Link to="/register" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-slate-900 rounded-full hover:bg-slate-800 hover:scale-105 shadow-xl shadow-slate-200">
          Start Your Journey
        </Link>
      </div>
    </div>
  );
};
// Helper icon for this file since I didn't import FaBook in the component above
import { FaBook } from 'react-icons/fa';

export default Welcome;
