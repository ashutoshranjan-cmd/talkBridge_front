import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, MessageCircle, X, Send, MinusCircle } from 'lucide-react';

// ChatAssistant Component
const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome! 👋 I'm here to help you with the login process. Need assistance?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage.toLowerCase());
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse,
        isBot: true
      }]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    if (message.includes('forgot') || message.includes('password')) {
      return "To reset your password, click the 'Forgot Password' link below the login form. You'll receive an email with instructions.";
    }
    if (message.includes('sign up') || message.includes('register')) {
      return "You can create a new account by clicking the 'Signup' link below the login form. It's quick and easy!";
    }
    if (message.includes('help') || message.includes('how')) {
      return "I can help you with login issues, account creation, and password recovery. What specific assistance do you need?";
    }
    return "I'm here to help! You can ask about login issues, creating an account, or resetting your password.";
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
          style={{ display: isOpen ? 'none' : 'block' }}
        >
          <MessageCircle size={24} />
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              height: isMinimized ? '60px' : '500px' // Increased height
            }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200 flex flex-col" // Added flex flex-col
          >
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">Chat Assistant</h3>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  <MinusCircle size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Chat Content Container */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col" // Added flex-1 and flex flex-col
                >
                  {/* Messages Container */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.isBot
                              ? 'bg-white text-gray-800 border border-gray-200'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          {message.text}
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Chat Input - Now properly positioned at bottom */}
                  <div className="border-t border-gray-200 bg-white p-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSendMessage}
                        className="bg-blue-600 text-white p-2 rounded-md"
                      >
                        <Send size={20} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Main Login Component
const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res && res.data) {
        dispatch(setAuthUser(res.data));
        navigate("/");
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.log(error);
    }

    setUser({
      username: "",
      password: ""
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto"
      >
        <motion.div 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='w-full p-4 sm:p-6 md:p-8 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'
        >
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className='text-2xl sm:text-3xl font-bold text-center text-black mb-4 sm:mb-6'
          >
            Login
          </motion.h1>
          <form onSubmit={onSubmitHandler} className="space-y-4 sm:space-y-6">
            <motion.div 
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className='label p-2'>
                <span className='text-sm sm:text-base label-text text-black font-semibold'>Username</span>
              </label>
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className='w-full input input-bordered h-10 sm:h-12 text-sm sm:text-base px-3'
                type="text"
                placeholder='Username' 
              />
            </motion.div>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className='label p-2'>
                <span className='text-sm sm:text-base label-text text-black font-semibold'>Password</span>
              </label>
              <div className="relative">
                <input
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className='w-full input input-bordered h-10 sm:h-12 pr-10 text-sm sm:text-base px-3'
                  type={showPassword ? "text" : "password"}
                  placeholder='Password'
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6"
                  >
                    {showPassword ? 
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : 
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    }
                  </motion.button>
                </div>
              </div>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className='text-center text-sm sm:text-base text-black font-semibold pt-2'
            >
              Don't have an account?{' '}
              <Link to="/signup" className="hover:text-blue-600 transition-colors"> 
                Signup 
              </Link>
            </motion.p>
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-2"
            >
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className='btn btn-block h-10 sm:h-12 text-sm sm:text-base border border-slate-700'
              >
                Login
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
      <ChatAssistant />
    </div>
  );
};

export default Login;