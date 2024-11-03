// import React, { useEffect, useState } from 'react'
// import SendInput from './SendInput'
// import Messages from './Messages';
// import { useSelector, useDispatch } from "react-redux";
// import { setSelectedUser } from '../redux/userSlice';

// const MessageContainer = () => {
//     const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
//     const [language, setLanguage] = useState('en');
//     const dispatch = useDispatch();

//     const isOnline = onlineUsers?.includes(selectedUser?._id);

//     return (
//         <>
//             {
//                 selectedUser !== null ? (
//                     <div className='w-4/5 flex flex-col'>
//                         <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
//                             <div className={`avatar ${isOnline ? 'online' : ''}`}>
//                                 <div className='w-12 rounded-full'>
//                                     <img src={selectedUser?.profilePhoto} alt="user-profile" />
//                                 </div>

//                             </div>
//                             <div className='flex flex-col flex-1'>
//                                 <div className='flex justify-between gap-2'>
//                                     <p>{selectedUser?.fullName}</p>
//                                 </div>
//                             </div>
//                                 <div className="w-full max-w-xs mx-auto">
//                                     <label className="block text-sm font-medium text-gray-200 mb-2">Choose Language</label>
//                                     <div className="relative">
//                                         <select
//                                             value={language}
//                                             onChange={(e) => setLanguage(e.target.value)}
//                                             className="block w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                                         >
//                                             <option value="en">English</option>
//                                             <option value="es">Spanish</option>
//                                             <option value="fr">French</option>
//                                             <option value="de">German</option>
//                                             <option value="zh">Chinese</option>
//                                             <option value="ja">Japanese</option>
//                                             <option value="ru">Russian</option>
//                                             <option value="ko">Korean</option>
//                                             <option value="it">Italian</option>
//                                             <option value="hi">Hindi</option>
//                                             <option value="ar">Arabic</option>
//                                             <option value="bn">Bengali</option>
//                                             <option value="gu">Gujarati</option>
//                                             <option value="kn">Kannada</option>
//                                             <option value="ml">Malayalam</option>
//                                             <option value="mr">Marathi</option>
//                                             <option value="pa">Punjabi</option>
//                                             <option value="ta">Tamil</option>
//                                             <option value="te">Telugu</option>
//                                             <option value="ur">Urdu</option>
//                                         </select>
//                                     </div>
//                                 </div>

                 


//                         </div>
//                         <Messages />
//                         <SendInput language={language} />
//                     </div>
//                 ) : (
//                     <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
//                         <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullName} </h1>
//                         <h1 className='text-2xl text-white'>Let's start conversation</h1>

//                     </div>
//                 )
//             }
//         </>

//     )
// }

// export default MessageContainer
import React, { useState } from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useSelector } from "react-redux";
// import { setSelectedUser } from '../redux/userSlice';
import { motion } from 'framer-motion';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    const [language, setLanguage] = useState('en');
    // const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);

    return (
        <>
            {selectedUser !== null ? (
                <motion.div 
                    className='w-full md:w-4/5 flex flex-col' 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'
                        initial={{ y: -50 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <motion.div 
                            className={`avatar ${isOnline ? 'online' : ''}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className='w-12 md:w-16 rounded-full'
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 100 }}
                            >
                                <img src={selectedUser?.profilePhoto} alt="user-profile" />
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className='flex flex-col flex-1'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <div className='flex justify-between gap-2'>
                                <p className="text-lg font-semibold">{selectedUser?.fullName}</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="w-full max-w-xs mx-auto"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                                Choose Language
                            </label>
                            <div className="relative">
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="block w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                    <option value="zh">Chinese</option>
                                    <option value="ja">Japanese</option>
                                    <option value="ru">Russian</option>
                                    <option value="ko">Korean</option>
                                    <option value="it">Italian</option>
                                    <option value="hi">Hindi</option>
                                    <option value="ar">Arabic</option>
                                    <option value="bn">Bengali</option>
                                    <option value="gu">Gujarati</option>
                                    <option value="kn">Kannada</option>
                                    <option value="ml">Malayalam</option>
                                    <option value="mr">Marathi</option>
                                    <option value="pa">Punjabi</option>
                                    <option value="ta">Tamil</option>
                                    <option value="te">Telugu</option>
                                    <option value="ur">Urdu</option>
                                </select>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <Messages />
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="fixed bottom-0 w-[96rem]"
                    >
                        <SendInput language={language} />
                    </motion.div>
                </motion.div>
            ) : (
                <motion.div 
                    className='md:min-w-[550px] flex flex-col justify-center items-center'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1
                        className='text-4xl text-white font-bold'
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        Hi, {authUser?.fullName}
                    </motion.h1>
                    <motion.h2
                        className='text-2xl text-white'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        Let's start the conversation
                    </motion.h2>
                </motion.div>
            )}
        </>
    );
}

export default MessageContainer;
