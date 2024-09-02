import React from 'react'
import { ArrowRight } from 'lucide-react';

function About() {

  // const font = {
  //   fontFamily: {
  //     'times-new-roman': ['Times New Roman', 'serif'],
  //     fontWeight: { 400: 400, },
  //   },
  // }

    return (
      
          <div className="bg-gray-100 py-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
              {/* Left Column: Image */}
              <div className="w-full md:w-[33rem] mb-8 md:mb-0 transition-transform duration-500 ease-in-out transform hover:scale-105">
                <img
                  src="/AC.png"               
                  alt="Communication Illustration"
                  className="w-full h-auto rounded-lg shadow-xl"
                />
              </div>
              
              {/* Right Column: Text Content */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 relative">
                  About WhizTalk
                  <span className="absolute bottom-0 left-0 w-20 h-1 bg-blue-600 mt-2"></span>
                </h2>
                <div className="space-y-4 mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    WhizTalk is your go-to platform for seamless, real-time communication. Designed to facilitate instant and secure conversations, WhizTalk ensures that your chats are as dynamic and engaging as in-person conversations.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Our mission is to provide a user-friendly and efficient communication tool that adapts to your needs. With a focus on privacy, your conversations are stored only locally and are automatically deleted after the chat ends. This ensures that your data stays private, giving you peace of mind as you chat.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Join the WhizTalk community and experience a smarter way to communicate!
                  </p>
                </div>
                
                {/* Call to Action Button */}
                <a
                  href="/checkemail"
                  className="inline-flex items-center bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Start Chatting Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
            </div>
        );
      };
      
  


export default About