import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { FaPaperPlane, FaRobot, FaUser, FaCircle } from 'react-icons/fa';

const Chat = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        fetchChatHistory();
    }, [user]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchChatHistory = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            const response = await axios.get('http://localhost:5000/api/chat', config);
            if (response.data && response.data.messages) {
                setMessages(response.data.messages);
            }
        } catch (error) {
            console.error("Error fetching chat:", error);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` },
            };
            const response = await axios.post('http://localhost:5000/api/chat', { text: userMessage.text }, config);
            
            // The backend returns userMessage, aiMessage, and updatedChat
            // We can just append the AI response or update with the full history
            if (response.data.updatedChat && response.data.updatedChat.messages) {
                 setMessages(response.data.updatedChat.messages);
            } else {
                 // Fallback if full object isn't returned
                 setMessages(prev => [...prev, { role: 'model', text: response.data.aiMessage }]);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">
            {/* Header / Context */}
            <div className="bg-white shadow-sm p-4 z-10 flex items-center gap-3 border-b border-slate-200 px-6">
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center text-accent text-xl">
                    <FaRobot />
                </div>
                <div>
                    <h2 className="font-bold text-slate-800">Wellness Companion</h2>
                    <div className="flex items-center gap-1 text-xs text-green-500 font-medium">
                        <FaCircle size={8} /> Online
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-4xl text-slate-300">
                           <FaRobot />
                        </div>
                        <p>Say hello! I'm here to listen and support you.</p>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`flex max-w-[80%] md:max-w-[70%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-violet-100 text-accent'}`}>
                                    {msg.role === 'user' ? <FaUser size={12} /> : <FaRobot size={14} />}
                                </div>
                                
                                <div 
                                    className={`p-4 rounded-2xl shadow-sm ${
                                        msg.role === 'user' 
                                        ? 'bg-primary text-white rounded-tr-none' 
                                        : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                    }`}
                                >
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                {isLoading && (
                     <div className="flex justify-start w-full">
                        <div className="flex max-w-[80%] gap-3">
                             <div className="w-8 h-8 rounded-full bg-violet-100 text-accent flex-shrink-0 flex items-center justify-center">
                                <FaRobot size={14} />
                            </div>
                            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t border-slate-200">
                <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-6 py-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="w-12 h-12 bg-primary hover:bg-indigo-600 active:scale-95 text-white rounded-full flex items-center justify-center transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
