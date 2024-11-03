
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const SendInput = ({ language }) => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const translateMessage = async (text, targetLang) => {
        
        const options = {
            method: 'POST',
            url: 'https://google-translator9.p.rapidapi.com/v2',
            headers: {
                'x-rapidapi-key': '5494f807femsh1ae6d55c4f9d5cep157fadjsncdee7960f217',
                'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                q: text,  // Use the actual message to be translated
                source: 'en',
                target: targetLang,
                format: 'text'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response);
            console.log(text)
            return response.data.data.translations[0].translatedText; // Return the translated text
            
        } catch (error) {
            console.error('Translation Error:', error.response?.data || error.message);
            return text; // Return the original message if translation fails
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        let translatedMessage = message;

        try {
            if (language !== 'en') {
                translatedMessage = await translateMessage(message, language);
            }
            const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, { message: translatedMessage }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            dispatch(setMessages([...messages, res?.data?.newMessage]))
        } catch (error) {
            console.log('Error sending message:', error.response?.data || error.message);
        }
        setMessage(""); // Clear the input after sending
    }

    return (
        <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
                />
                <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
                    <IoSend />
                </button>
            </div>
        </form>
    )
}

export default SendInput;
