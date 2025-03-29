
import React from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { Linkedin, Github, Twitter, Mail, User, Code, Star } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'AI & Machine Learning', level: 85 },
    { name: 'Web Development', level: 90 },
    { name: 'Data Science', level: 75 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'Cloud Computing', level: 70 },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 neon-text">
          About <span className="text-white">Sunny</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Bio Card */}
          <GlassCard className="p-6 md:col-span-1">
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full bg-black/60 border-4 border-neon-blue/30 flex items-center justify-center mb-4">
                <User className="w-16 h-16 text-neon-blue" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Sunny Soni</h2>
              <p className="text-gray-300 mb-4 text-center">Digital Explorer & Creative Technologist</p>
              
              <div className="flex space-x-3 mb-6">
                <a 
                  href="https://www.linkedin.com/in/sunny-soni1089" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center transition-all hover:border-neon-blue hover:shadow-neon-glow"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center transition-all hover:border-neon-blue hover:shadow-neon-glow"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center transition-all hover:border-neon-blue hover:shadow-neon-glow"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:example@example.com" 
                  className="w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center transition-all hover:border-neon-blue hover:shadow-neon-glow"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              
              <div className="w-full border-t border-white/10 pt-6 mt-2">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-neon-blue" />
                    Top Skills
                  </h3>
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-1000 animate-pulse-glow"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Bio Details */}
          <GlassCard className="p-6 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Star className="w-6 h-6 mr-2 text-neon-blue" />
              Navigating the Digital Universe
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <p>
                Welcome to my cosmic corner of the digital universe! I'm a passionate explorer of emerging technologies, 
                constantly navigating through the vast expanse of innovation and creativity.
              </p>
              
              <p>
                My journey spans across various technological domains - from artificial intelligence and machine learning 
                to web development and creative design. I believe in the transformative power of technology when aligned 
                with human-centered approaches.
              </p>
              
              <p>
                Through this digital dreamscape, I aim to share my learnings, projects, and resources that might help 
                fellow cosmic travelers on their own journeys. Each project represents a star in my personal galaxy of 
                experiences, and each resource is a planet of knowledge waiting to be explored.
              </p>
              
              <div className="pt-4 border-t border-white/10 mt-4">
                <h3 className="text-xl font-semibold mb-3">Experience</h3>
                <div className="space-y-4">
                  <div className="glass-card p-4 hover:shadow-neon-glow transition-all">
                    <h4 className="font-semibold">Digital Innovation Lead</h4>
                    <p className="text-sm text-gray-400">TechNova Solutions • 2020 - Present</p>
                    <p className="mt-2">Leading digital transformation initiatives and exploring emerging tech frontiers.</p>
                  </div>
                  
                  <div className="glass-card p-4 hover:shadow-neon-purple transition-all">
                    <h4 className="font-semibold">AI Research Contributor</h4>
                    <p className="text-sm text-gray-400">FutureLab Institute • 2018 - 2020</p>
                    <p className="mt-2">Researched applications of machine learning in creative industries.</p>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Contact Form */}
        <GlassCard className="mt-12 p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Send a Cosmic Message</h2>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                  placeholder="Your email"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                placeholder="Message subject"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea 
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all min-h-[120px] resize-none"
                placeholder="Your message"
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <GlowingButton className="w-full md:w-auto">
                Send Message
              </GlowingButton>
            </div>
          </form>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default About;
