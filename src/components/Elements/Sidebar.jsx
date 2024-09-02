import React, { useEffect, useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avatar from './Avatar'
import { useDispatch, useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from './SearchUser';
import { FaImage, FaTrash } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { logout } from '../redux/userSlice';


const Sidebar = () => {
    const user = useSelector(state => state?.user)
    const [editUserOpen,setEditUserOpen] = useState(false)
    const [allUser,setAllUser] = useState([])
    const [openSearchUser,setOpenSearchUser] = useState(false)
    const socketConnection = useSelector(state => state?.user?.socketConnection)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(()=>{
        if(socketConnection){
            socketConnection.emit('sidebar',user._id)
            
            socketConnection.on('conversation',(data)=>{
                console.log('conversation',data)
                
                const conversationUserData = data.map((conversationUser,index)=>{
                    if(conversationUser?.sender?._id === conversationUser?.receiver?._id){
                        return{
                            ...conversationUser,
                            userDetails : conversationUser?.sender
                        }
                    }
                    else if(conversationUser?.receiver?._id !== user?._id){
                        return{
                            ...conversationUser,
                            userDetails : conversationUser.receiver
                        }
                    }else{
                        return{
                            ...conversationUser,
                            userDetails : conversationUser.sender
                        }
                    }
                })

                setAllUser(conversationUserData)
            })
        }
    },[socketConnection,user])

    const handleLogout = ()=>{
        dispatch(logout())
        navigate("/checkemail")
        localStorage.clear()
    }

    const handleDeleteUser = (userId) => {
        if (socketConnection) {
            // Emit a socket event to inform the server about the deletion
            socketConnection.emit('deleteConversation', { 
                userId: user._id, 
                deletedUserId: userId 
            });

            // Optionally, you can show a loading state here

            // Listen for the deletion confirmation
            socketConnection.once('conversationDeleted', (deletedUserId) => {
                if (deletedUserId === userId) {
                    // Remove the user from the list only after server confirmation
                    setAllUser(prevUsers => prevUsers.filter(user => user.userDetails?._id !== userId));
                    // Optionally, show a success message to the user
                    console.log('Conversation deleted successfully');
                }
            });

            // Handle potential errors
            socketConnection.once('deletionError', (error) => {
                console.error('Error deleting conversation:', error);
                // Optionally, show an error message to the user
            });
        } else {
            console.error('No socket connection available');
            // Optionally, show an error message to the user
        }
    };
     

  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
            <div className='bg-[#2C3E50] w-12 h-full rounded-tr-full  rounded-br-lg py-4 text-slate-600 flex flex-col justify-between'>
                <div className='flex flex-col gap-7'>
                 <div> <NavLink className={({isActive})=>`w-12 h-12  flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded `} title='chat'>
                        {/* <i class="fa-duotone fa-solid fa-house-user"></i> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className='h-12 w-7 text-[#FD527D]'   fill="currentColor" viewBox="0 0 576 512">
                    <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c.2 35.5-28.5 64.3-64 64.3l-320.4
                     0c-35.3 0-64-28.7-64-64l0-160.4-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8
                      22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24zM352 224a64 64 0 1 0 -128 0 64 64 0 1 0 128
                       0zm-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16l192 0c8.8 0 16-7.2 
                       16-16c0-44.2-35.8-80-80-80l-64 0z"/></svg>
                    </NavLink></div>  

                    <div title='add friend' onClick={()=>setOpenSearchUser(true)} className='text-[#ffce3c] w-[3rem] h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded' >
                        <FaUserPlus size={25}/>
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <button className='mx-auto' title={user?.name} onClick={()=>setEditUserOpen(true)}>
                        <Avatar
                            width={40}
                            height={40}
                            name={user?.name}
                            imageUrl={user?.profile_pic}
                            userId={user?._id}
                        />
                    </button>
                    <button title='logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded' onClick={handleLogout}>
                        <span className='-ml-2 text-[#3D579F]'>
                            <BiLogOut size={20}/>
                        </span>
                    </button>
                </div>
            </div>

            <div className='w-full'>
                <div className='h-16  flex items-center'>
                    
                    
                <h2 className="text-xl font-bold p-4 text-slate-800">
        <span className="block lg:hidden"> 
            <img src="/logo8.png" alt="Logo" className="h-auto max-w-[100px] inline" />
        </span>
        <span className="hidden   lg:block text-[#229CD9]"> 
            Message
        </span>
    </h2>
                </div>
                <div className='bg-slate-200 p-[0.5px]'></div>

                <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
            {allUser.length === 0 && (
                <div className='mt-12'>
                    <div className='flex justify-center items-center my-4 text-slate-500'>
                        <FiArrowUpLeft size={50} />
                    </div>
                    <p className='text-lg text-center text-slate-400'>Explore users to start a conversation with.</p>
                </div>
            )}
            
            {allUser.map((conv, index) => (
                        <div 
                            key={conv?._id} 
                            className='relative flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer group'
                        >
                            <NavLink 
                                to={"/" + conv?.userDetails?._id} 
                                className='flex items-center gap-2 flex-grow'
                            >
                                <div>
                                    <Avatar
                                        imageUrl={conv?.userDetails?.profile_pic}
                                        name={conv?.userDetails?.name}
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div>
                                    <h3 className='text-ellipsis line-clamp-1 font-semibold text-base'>{conv?.userDetails?.name}</h3>
                                    <div className='text-slate-500 text-xs flex items-center gap-1'>
                                        <div className='flex items-center gap-1'>
                                            {conv?.lastMsg?.imageUrl && (
                                                <div className='flex items-center gap-1'>
                                                    <span><FaImage/></span>
                                                    {!conv?.lastMsg?.text && <span>Image</span>}
                                                </div>
                                            )}
                                            {conv?.lastMsg?.videoUrl && (
                                                <div className='flex items-center gap-1'>
                                                    <span><FaVideo/></span>
                                                    {!conv?.lastMsg?.text && <span>Video</span>}
                                                </div>
                                            )}
                                        </div>
                                        <p className='text-ellipsis line-clamp-1'>{conv?.lastMsg?.text}</p>
                                    </div>
                                </div>
                                {Boolean(conv?.unseenMsg) && (
                                    <p className='text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full'>{conv?.unseenMsg}</p>
                                )}
                            </NavLink>
                            <button 
                                className='absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700'
                                onClick={() => handleDeleteUser(conv?.userDetails?._id)}
                                title="Delete conversation"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}

        </div>


            </div>

            {/**edit user details*/}
            {
                editUserOpen && (
                    <EditUserDetails onClose={()=>setEditUserOpen(false)} user={user}/>
                )
            }

            {/**search user */}
            {
                  openSearchUser && (
                    <SearchUser 
                        onClose={() => setOpenSearchUser(false)}
                        loggedInUserId={user._id}
                    />
                )
            }

    </div>
  )
}

export default Sidebar
