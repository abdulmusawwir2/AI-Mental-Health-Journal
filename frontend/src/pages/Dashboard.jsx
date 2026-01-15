import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { FaBook, FaPlus, FaRobot, FaSmile, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/entries`, config);
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEntries();
    }
  }, [user]);

  // Simple mood calculation (placeholder logic)
  const getRecentMood = () => {
      if (entries.length === 0) return 'Neutral';
      return entries[0].mood || 'Neutral';
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Hello, {user?.name.split(' ')[0]} 👋</h1>
                <p className="text-slate-500">How are you feeling today? take a moment to reflect.</p>
            </div>
            <div className="flex gap-4">
                <Link to="/journal" className="flex items-center gap-2 bg-primary hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-lg shadow-indigo-200 hover:scale-105 active:scale-95">
                    <FaPlus /> New Entry
                </Link>
                <Link to="/chat" className="flex items-center gap-2 bg-white text-secondary border border-secondary/20 hover:bg-secondary/5 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 active:scale-95">
                    <FaRobot /> Chat with AI
                </Link>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg text-xl">
                        <FaBook />
                    </div>
                    <h3 className="font-semibold text-slate-700">Total Entries</h3>
                </div>
                <p className="text-3xl font-bold text-slate-800">{entries.length}</p>
                <p className="text-sm text-slate-400 mt-1">Lifetime journal entries</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-pink-100 text-pink-600 rounded-lg text-xl">
                        <FaSmile />
                    </div>
                    <h3 className="font-semibold text-slate-700">Latest Mood</h3>
                </div>
                <p className="text-3xl font-bold text-slate-800">{getRecentMood()}</p>
                 <p className="text-sm text-slate-400 mt-1">Based on your last entry</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg text-xl">
                        <FaChartLine />
                    </div>
                    <h3 className="font-semibold text-slate-700">Consistency</h3>
                </div>
                <p className="text-3xl font-bold text-slate-800">
                    {entries.length > 0 ? "Active" : "New"}
                </p>
                 <p className="text-sm text-slate-400 mt-1">Keep journaling daily!</p>
            </div>
        </div>

        {/* Recent Entries */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Recent Journal Entries</h2>
                <Link to="/journal" className="text-primary text-sm font-medium hover:underline">View All</Link>
            </div>
            
            {loading ? (
                <div className="p-8 text-center text-slate-400">Loading entries...</div>
            ) : entries.length === 0 ? (
                <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-3xl text-slate-300 mx-auto mb-4">
                        <FaBook />
                    </div>
                    <h3 className="text-lg font-medium text-slate-800 mb-2">No entries yet</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mb-6">Start knowing yourself better by writing your first journal entry.</p>
                    <Link to="/journal" className="text-primary font-bold hover:underline">Write your first entry &rarr;</Link>
                </div>
            ) : (
                <div className="divide-y divide-slate-100">
                    {entries.slice(0, 5).map((entry) => (
                        <div key={entry._id} className="p-6 hover:bg-slate-50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                                    {new Date(entry.createdAt).toLocaleDateString()}
                                </span>
                                {entry.mood && (
                                    <span className="inline-block px-2 py-1 bg-pink-50 text-pink-600 text-xs rounded-md font-medium border border-pink-100">
                                        {entry.mood}
                                    </span>
                                )}
                            </div>
                            <p className="text-slate-600 line-clamp-2">{entry.content}</p>
                            {entry.aiAnalysis && (
                                <div className="mt-3 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 text-sm text-indigo-800 flex gap-2">
                                    <FaRobot className="mt-1 flex-shrink-0" />
                                    <span className="italic">"{entry.aiAnalysis}"</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
