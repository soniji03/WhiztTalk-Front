import React from 'react'
import { Mail, Phone, MapPin, Twitter, Facebook, Linkedin } from 'lucide-react';

function Contacts() {
    
    // const font = {
    //   fontFamily: {
    //     'times-new-roman': ['Times New Roman', 'serif'],
    //     fontWeight: { 400: 400, },
    //   },
    // }
    
      return (
        
      
            <div className="font-sans bg-gray-100">
              <div className="bg-gray-100 py-16 px-6">
                <div className="mb-10 max-w-7xl mx-auto">
                  <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Get in Touch with WhizTalk</h2>
        
                  <div className="flex flex-col md:flex-row">
                    {/* Contact Information */}
                    <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h3>
                      <p className="text-gray-600 mb-4">
                        Have any questions, feedback, or need assistance? We're here to help! Reach out to us through any of the methods below.
                      </p>
        
                      <div className="space-y-4">
                        <ContactItem icon={<Mail />} title="Email">
                          <p className="text-gray-600">support@whiztalk.com</p>
                          <p className="text-gray-600">info@whiztalk.com</p>
                        </ContactItem>
        
                        <ContactItem icon={<Phone />} title="Phone">
                          <p className="text-gray-600">+1-800-123-4567</p>
                          <p className="text-gray-600">+1-800-987-6543</p>
                        </ContactItem>
        
                        <ContactItem icon={<MapPin />} title="Address">
                          <p className="text-gray-600">
                            1234 Communication Lane,<br />
                            Tech City, TC 56789, USA
                          </p>
                        </ContactItem>
        
                        <ContactItem icon={<Twitter />} title="Follow Us">
                          <p className="text-gray-600">
                            <SocialLink href="https://twitter.com/WhizTalk" text="Twitter" />,{' '}
                            <SocialLink href="https://facebook.com/WhizTalk" text="Facebook" />,{' '}
                            <SocialLink href="https://linkedin.com/company/WhizTalk" text="LinkedIn" />
                          </p>
                        </ContactItem>
                      </div>
                    </div>
        
                    {/* Contact Form */}
                    <div className="w-full md:w-1/2">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h3>
                      <form className="space-y-6">
                        <FormInput label="Name" id="name" type="text" placeholder="Your Name" />
                        <FormInput label="Email" id="email" type="email" placeholder="Your Email" />
                        <FormInput label="Subject" id="subject" type="text" placeholder="Subject" />
                        <FormTextarea label="Message" id="message" placeholder="Your Message" rows={6} />
                        <button
                          type="submit"
                          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                        >
                          Send Message
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
        
              <CallToAction />
            </div>
          );
        };
        
        const ContactItem = ({ icon, title, children }) => (
          <div className="flex items-start">
            <div className="text-blue-600 mr-3 mt-1">{icon}</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
              {children}
            </div>
          </div>
        );
        
        const SocialLink = ({ href, text }) => (
          <a href={href} className="text-blue-600 hover:underline">
            {text}
          </a>
        );
        
        const FormInput = ({ label, id, type, placeholder }) => (
          <div>
            <label htmlFor={id} className="block text-gray-800 font-medium mb-2">
              {label}
            </label>
            <input
              type={type}
              id={id}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={placeholder}
            />
          </div>
        );
        
        const FormTextarea = ({ label, id, placeholder, rows }) => (
          <div>
            <label htmlFor={id} className="block text-gray-800 font-medium mb-2">
              {label}
            </label>
            <textarea
              id={id}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={placeholder}
              rows={rows}
            ></textarea>
          </div>
        );
        
        const CallToAction = () => (
          <section className="py-20 mx-10 mb-10 rounded-3xl bg-indigo-600 text-white text-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join the Conversation?</h2>
              <p className="text-lg mb-8">Sign up today and start communicating with WhizTalk.</p>
              <a
                href="/register"
                className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              >
                Sign Up Free
              </a>
            </div>
          </section>
        );
        

export default Contacts
