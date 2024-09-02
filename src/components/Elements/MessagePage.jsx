import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Avatar from './Avatar';
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft, FaTrash, FaPlus, FaImage, FaVideo } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import uploadFile from '../helpers/uploadFile';
import Loading from './Loading';
import backgroundImage from '/wallapaper.jpeg';
import moment from 'moment';

const fetchUserStatus = async (userId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // Simulate random online status
  return Math.random() < 0.7; // 70% chance of being online
};

const MessagePage = ({ initialUser }) => {
  const params = useParams();
  const socketConnection = useSelector(state => state?.user?.socketConnection);
  const user = useSelector(state => state?.user);
  const [dataUser, setDataUser] = useState({ name: "", email: "", profile_pic: "", online: false, _id: "" ,initialUser});
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const [message, setMessage] = useState({ text: "", imageUrl: "", videoUrl: "" });
  const [loading, setLoading] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const currentMessage = useRef(null);
  const [conversations, setConversations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [allMessages]);

  useEffect(() => {
    if (socketConnection && user?._id) {
      socketConnection.emit('fetch-all-chats', user._id);
      socketConnection.emit('message-page', params.userId);
      socketConnection.emit('seen', params.userId);

      socketConnection.on('all-chats', setConversations);
      socketConnection.on('message-user', setDataUser);
      socketConnection.on('message', setAllMessages);
      socketConnection.on('message-deleted', handleMessageDeleted);
      // socketConnection.on('userConnected', handleUserConnection(true));
      // socketConnection.on('userDisconnected', handleUserConnection(false));

      return () => {
        ['all-chats', 'message-user', 'message', 'message-deleted', 'userConnected', 'userDisconnected']
          .forEach(event => socketConnection.off(event));
      };
    }
  }, [socketConnection, params?.userId, user]);



  
  
    // const handleUserConnection = (isConnected) => (userId) => {
    //   if (userId === params.userId) {
    //     setDataUser(prev => ({ ...prev, online: isConnected }));
    //   }
    // };

    // useEffect(() => {
    //   // Simulating connection/disconnection events
    //   const onConnect = handleUserConnection(true);
    //   const onDisconnect = handleUserConnection(false);
  
    //   // Example: Update status after 3 seconds (replace with your actual logic)
    //   const timer = setTimeout(() => onConnect(params.userId), 3000);
  
    //   return () => {
    //     clearTimeout(timer);
    //     // Clean up any event listeners here
    //   };
    // }, [params.userId]);

    
  const updateUserStatus = async () => {
    setIsLoading(true);
    try {
      const isOnline = await fetchUserStatus(params.userId);
      setDataUser(prev => ({ ...prev, online: isOnline }));
    } catch (error) {
      console.error('Error fetching user status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateUserStatus(); // Initial fetch

    // Set up polling every 10 seconds
    const intervalId = setInterval(updateUserStatus, 10000);

    return () => clearInterval(intervalId);
  }, [params.userId]);





  const handleMessageDeleted = (deletedMessageId) => {
    setAllMessages(prevMessages => prevMessages.filter(msg => msg._id !== deletedMessageId));
    setConversations(prevConversations => 
      prevConversations.map(conv => ({
        ...conv,
        messages: conv.messages.filter(msg => msg._id !== deletedMessageId)
      }))
    );
  };

  const handleUploadImageVideoOpen = () => setOpenImageVideoUpload(prev => !prev);

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadedFile = await uploadFile(file);
    setLoading(false);
    setOpenImageVideoUpload(false);
    setMessage(prev => ({ ...prev, [type]: uploadedFile.url }));
  };

  const handleClearUpload = (type) => setMessage(prev => ({ ...prev, [type]: "" }));

  const handleDeleteMessage = (messageId) => {
    if (socketConnection) {
      socketConnection.emit('delete-message', { messageId, userId: user._id });
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.text || message.imageUrl || message.videoUrl) {
      socketConnection?.emit('new message', {
        sender: user?._id,
        receiver: params.userId,
        ...message,
        msgByUserId: user?._id
      });
      setMessage({ text: "", imageUrl: "", videoUrl: "" });
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }} className='bg-no-repeat bg-cover'>
      <header className='sticky top-0 h-16 bg-white flex justify-between items-center px-4'>
        <div className='flex items-center gap-4'>
          <Link to={"/"} className='lg:hidden'>
            <FaAngleLeft size={25}/>
          </Link>
          <Avatar
            width={50}
            height={50}
            imageUrl={dataUser?.profile_pic}
            name={dataUser?.name}
            userId={dataUser?._id}
          />

          {/* <div>
            <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>
              {dataUser.name || 'User'}
            </h3>
            <p className='-my-2 text-sm'>
              {dataUser.online ? (
                <span className='text-primary'>online</span>
              ) : (
                <span className='text-slate-400'>offline</span>
              )}
            </p>
          </div> */}

<div className="p-4 border rounded shadow-sm">
      <h3 className="font-semibold text-lg my-0 text-ellipsis overflow-hidden whitespace-nowrap">
        {dataUser.name || 'User'}
      </h3>
      <p className="text-sm mt-1">
      {isLoading ? (
          <span className="text-gray-400">updating...</span>
        ) : dataUser.online ? (
          <span className="text-green-500">online</span>
        ) : (
          <span className="text-slate-400">offline</span>
        )}
      </p>
      </div>

        </div>
        <button className='cursor-pointer hover:text-primary'>
          <HiDotsVertical/>
        </button>
      </header>

      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50'>
        <div className='flex flex-col gap-2 py-2 mx-2' ref={currentMessage}>
          {allMessages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`relative group right-[0.8rem] p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${
                user._id === msg?.msgByUserId ? "ml-auto bg-teal-100" : "bg-white"
              }`}
            >
              {msg?.imageUrl && (
                <img src={msg?.imageUrl} className='w-full h-full object-scale-down' alt="Message image" />
              )}
              {msg?.videoUrl && (
                <video src={msg.videoUrl} className='w-full h-full object-scale-down' controls />
              )}
              <p className='px-2 '>{msg.text}</p>
              <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
              {msg.msgByUserId === user._id && (
                <button
                  className='absolute  -right-[1rem] top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700'
                  onClick={() => handleDeleteMessage(msg._id)}
                  title="Delete message"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>

        {message.imageUrl && (
          <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
            <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600' onClick={() => handleClearUpload('imageUrl')}>
              <IoClose size={30}/>
            </div>
            <div className='bg-white p-3'>
              <img
                src={message.imageUrl}
                alt='uploadImage'
                className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
              />
            </div>
          </div>
        )}

        {message.videoUrl && (
          <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
            <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600' onClick={() => handleClearUpload('videoUrl')}>
              <IoClose size={30}/>
            </div>
            <div className='bg-white p-3'>
              <video 
                src={message.videoUrl} 
                className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                controls
                muted
                autoPlay
              />
            </div>
          </div>
        )}

        {loading && (
          <div className='w-full h-full flex sticky bottom-0 justify-center items-center'>
            <Loading/>
          </div>
        )}
      </section>

      <section className='h-16 bg-white flex items-center px-4'>
        <div className='relative'>
          <button onClick={handleUploadImageVideoOpen} className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white'>
            <FaPlus size={20}/>
          </button>

          {openImageVideoUpload && (
            <div className='bg-white shadow rounded absolute bottom-14 w-36 p-2'>
              <form>
                <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                  <div className='text-primary'>
                    <FaImage size={18}/>
                  </div>
                  <p>Image</p>
                </label>
                <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                  <div className='text-purple-500'>
                    <FaVideo size={18}/>
                  </div>
                  <p>Video</p>
                </label>

                <input 
                  type='file'
                  id='uploadImage'
                  onChange={(e) => handleUpload(e, 'imageUrl')}
                  className='hidden'
                />

                <input 
                  type='file'
                  id='uploadVideo'
                  onChange={(e) => handleUpload(e, 'videoUrl')}
                  className='hidden'
                />
              </form>
            </div>
          )}
        </div>

        <form className='h-full w-full flex gap-2' onSubmit={handleSendMessage}>
          <input
            type='text'
            placeholder='Type here message...'
            className='py-1 px-4 outline-none w-full h-full'
            value={message.text}
            onChange={(e) => setMessage(prev => ({ ...prev, text: e.target.value }))}
          />
          <button className='text-primary hover:text-secondary'>
            <IoMdSend size={28}/>
          </button>
        </form>
      </section>
    </div>
  );
};

export default MessagePage;
