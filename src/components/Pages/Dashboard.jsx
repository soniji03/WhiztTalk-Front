import React from 'react'
import { Camera, MessageCircle, Shield, Users, RefreshCw, UserPlus, Link } from 'lucide-react';

function Dashboard() {
    // const font = {
    //     fontFamily: {
    //       'times-new-roman': ['Times New Roman', 'serif'],
    //       fontWeight: { 400: 400, },
    //     },
    //   }
      
      return (
  
    <div className="font-sans" >
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect Instantly. Communicate Seamlessly.
            </h1>
            <p className="text-lg md:text-xl mb-8">
              WhizTalk makes real-time communication effortless. Whether it's chatting with friends or collaborating with colleagues, we've got you covered.
            </p>
            <div className="flex space-x-4">
              <a href="/checkemail" className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                Get Started
              </a>
              <a href="#features" className="text-white font-semibold py-3 px-6 border border-white rounded-full hover:bg-blue-500 transition-colors">
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-3">
            <img
              src="/AC2.avif"
              alt="Communication Illustration"
              className="w-full h-auto lg:h-[25rem] rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Why Choose WhizTalk?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<MessageCircle className="w-12 h-12" />}
              title="Real-Time Communication"
              description="Instantly connect with anyone, anywhere."
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12" />}
              title="Privacy-Focused"
              description="Your conversations are stored locally and deleted after you're done."
            />
            <FeatureCard
              icon={<Users className="w-12 h-12" />}
              title="User-Friendly Interface"
              description="Clean, intuitive design for effortless chatting."
            />
            <FeatureCard
              icon={<RefreshCw className="w-12 h-12" />}
              title="Cross-Platform"
              description="Available on all your devices."
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              imageSrc="p1.jpg"
              quote="WhizTalk has completely changed the way I communicate with my team. It's fast, secure, and so easy to use!"
              name="John Doe"
            />
            <TestimonialCard
              imageSrc="p2.jpg"
              quote="I love how WhizTalk focuses on privacy. I feel safe knowing my chats are private and secure."
              name="Jane Smith"
            />
            <TestimonialCard
              imageSrc="p3.jpg"
              quote="Finally, a communication tool that's as simple as it is powerful. WhizTalk just works!"
              name="Mike Johnson"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">How WhizTalk Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <HowItWorksCard
              icon={<UserPlus className="w-12 h-12" />}
              title="Sign Up"
              description="Create your account in seconds."
            />
            <HowItWorksCard
              icon={<MessageCircle className="w-12 h-12" />}
              title="Start Chatting"
              description="Connect with friends and colleagues."
            />
            <HowItWorksCard
              icon={<Link className="w-12 h-12" />}
              title="Stay Connected"
              description="Engage in real-time conversations, privately."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-8 bg-white rounded-lg shadow-lg">
    <div className="text-blue-600 text-5xl mb-4">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TestimonialCard = ({ imageSrc, quote, name }) => (
  <div className="p-8 bg-gray-100 rounded-lg shadow-lg">
    <img
      src={imageSrc}
      alt={name}
      className="w-16 h-16 rounded-full mx-auto mb-4"
    />
    <p className="text-gray-600 mb-4">"{quote}"</p>
    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
  </div>
);

const HowItWorksCard = ({ icon, title, description }) => (
  <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#90cdffcc]">
    <div className="text-blue-600 text-5xl mb-4">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

     

export default Dashboard

