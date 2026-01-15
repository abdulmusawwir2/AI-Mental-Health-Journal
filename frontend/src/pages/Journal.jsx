import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { FaBook, FaMagic, FaTrash, FaSpinner } from 'react-icons/fa';

const Journal = () => {
    const { user } = useAuth();
    const [entries, setEntries] = useState([]);
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEntries();
    }, [user]);

    const fetchEntries = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/entries`, config);
            setEntries(response.data);
        } catch (error) {
            console.error("Error fetching entries:", error);
        } finally {
            setIsFetching(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsLoading(true);
        setError('');

        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            const response = await axios.post('http://localhost:5000/api/entries', { content }, config);
            setEntries([response.data, ...entries]);
            setContent('');
        } catch (error) {
            setError('Failed to save entry. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this entry?')) return;
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            await axios.delete(`http://localhost:5000/api/entries/${id}`, config);
            setEntries(entries.filter(entry => entry._id !== id));
        } catch (error) {
            alert('Failed to delete entry');
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: New Entry */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-indigo-100 text-primary rounded-lg">
                                <FaBook />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">New Entry</h2>
                        </div>
                        
                        <p className="text-slate-500 text-sm mb-4">
                            Write down your thoughts. Gemini AI will analyze your mood and provide insights.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <textarea
                                className="w-full h-64 p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none mb-4"
                                placeholder="How are you feeling today? What's on your mind?..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                disabled={isLoading}
                            ></textarea>
                            
                            {error && (
                                <div className="text-red-500 text-sm mb-3">{error}</div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading || !content.trim()}
                                className="w-full bg-primary hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <FaSpinner className="animate-spin" /> Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <FaMagic /> Analyze & Save
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Column: History */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800">Your Journal</h2>
                    
                    {isFetching ? (
                        <div className="text-center py-10 text-slate-500">Loading entries...</div>
                    ) : entries.length === 0 ? (
                        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
                            <p className="text-slate-500">No entries yet. Write your first one!</p>
                        </div>
                    ) : (
                        entries.map((entry) => (
                            <div key={entry._id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 transition-all hover:shadow-md">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-sm font-medium text-slate-400 block mb-1">
                                            {new Date(entry.createdAt).toLocaleDateString(undefined, {
                                                weekday: 'long', 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric'
                                            })}
                                        </span>
                                        <div className="flex gap-2">
                                             {entry.mood && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                                                    Mood: {entry.mood}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(entry._id)}
                                        className="text-slate-300 hover:text-red-500 transition-colors p-2"
                                        title="Delete Entry"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                                
                                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed mb-6">
                                    {entry.content}
                                </p>

                                {entry.aiAnalysis && (
                                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100 relative">
                                        <div className="absolute -top-3 left-4 bg-white px-2 py-1 rounded-full border border-indigo-100 shadow-sm flex items-center gap-1 text-xs font-bold text-indigo-600">
                                            <FaMagic /> Gemini Insight
                                        </div>
                                        <p className="text-indigo-900 text-sm italic mt-2">
                                            "{entry.aiAnalysis}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Journal;
