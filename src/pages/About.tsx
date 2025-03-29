
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { Linkedin, Github, Twitter, Mail, User, Code, Star, Edit, Save, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { dataService } from '../services/DataService';
import { AboutContent } from '../models/DataModels';
import { toast } from 'sonner';

const About = () => {
  const { userRole } = useAuth();
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState('');
  const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
  const [newSkill, setNewSkill] = useState({ name: '', level: 50 });
  const [editingExpId, setEditingExpId] = useState<number | null>(null);
  const [newExp, setNewExp] = useState({ title: '', company: '', period: '', description: '' });
  
  useEffect(() => {
    // Load about content
    const content = dataService.getAboutContent();
    setAboutContent(content);
    setEditedBio(content.bio);
  }, []);

  if (!aboutContent) return null;

  const handleBioSave = () => {
    const updated = dataService.updateAboutContent({ bio: editedBio });
    setAboutContent(updated);
    setIsEditingBio(false);
    toast.success('Bio updated successfully');
  };

  const handleSkillAdd = () => {
    if (!newSkill.name) {
      toast.error('Skill name is required');
      return;
    }

    const updatedSkills = [...aboutContent.skills, newSkill];
    const updated = dataService.updateAboutContent({ skills: updatedSkills });
    setAboutContent(updated);
    setNewSkill({ name: '', level: 50 });
    toast.success('Skill added successfully');
  };

  const handleSkillUpdate = (index: number) => {
    const skill = aboutContent.skills[index];
    if (!skill.name) {
      toast.error('Skill name is required');
      return;
    }

    const updatedSkills = [...aboutContent.skills];
    updatedSkills[index] = skill;
    const updated = dataService.updateAboutContent({ skills: updatedSkills });
    setAboutContent(updated);
    setEditingSkillId(null);
    toast.success('Skill updated successfully');
  };

  const handleSkillDelete = (index: number) => {
    const updatedSkills = aboutContent.skills.filter((_, i) => i !== index);
    const updated = dataService.updateAboutContent({ skills: updatedSkills });
    setAboutContent(updated);
    toast.success('Skill deleted successfully');
  };

  const handleExpAdd = () => {
    if (!newExp.title || !newExp.company) {
      toast.error('Title and company are required');
      return;
    }

    const updatedExp = [...aboutContent.experience, newExp];
    const updated = dataService.updateAboutContent({ experience: updatedExp });
    setAboutContent(updated);
    setNewExp({ title: '', company: '', period: '', description: '' });
    toast.success('Experience added successfully');
  };

  const handleExpUpdate = (index: number) => {
    const exp = aboutContent.experience[index];
    if (!exp.title || !exp.company) {
      toast.error('Title and company are required');
      return;
    }

    const updatedExp = [...aboutContent.experience];
    updatedExp[index] = exp;
    const updated = dataService.updateAboutContent({ experience: updatedExp });
    setAboutContent(updated);
    setEditingExpId(null);
    toast.success('Experience updated successfully');
  };

  const handleExpDelete = (index: number) => {
    const updatedExp = aboutContent.experience.filter((_, i) => i !== index);
    const updated = dataService.updateAboutContent({ experience: updatedExp });
    setAboutContent(updated);
    toast.success('Experience deleted successfully');
  };

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
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Code className="w-5 h-5 mr-2 text-neon-blue" />
                      Top Skills
                    </h3>
                    {userRole === 'admin' && (
                      <button 
                        onClick={() => setNewSkill({ name: '', level: 50 })}
                        className="text-neon-blue hover:text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {/* Add new skill form */}
                  {userRole === 'admin' && newSkill.name !== null && (
                    <div className="mb-4 p-3 border border-white/10 rounded-md bg-black/30">
                      <div className="mb-2">
                        <input
                          type="text"
                          value={newSkill.name}
                          onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                          placeholder="Skill name"
                          className="w-full px-3 py-1 bg-black/40 border border-white/20 rounded-md mb-2"
                        />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={newSkill.level}
                          onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>0%</span>
                          <span>{newSkill.level}%</span>
                          <span>100%</span>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setNewSkill({ name: '', level: 50 })}
                          className="text-xs px-2 py-1 bg-black/40 border border-white/20 rounded hover:border-red-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSkillAdd}
                          className="text-xs px-2 py-1 bg-black/40 border border-neon-blue/50 rounded hover:border-neon-blue"
                        >
                          Add Skill
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {aboutContent.skills.map((skill, index) => (
                      <div key={index}>
                        {editingSkillId === index ? (
                          <div className="mb-2">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => {
                                const updatedSkills = [...aboutContent.skills];
                                updatedSkills[index].name = e.target.value;
                                setAboutContent({...aboutContent, skills: updatedSkills});
                              }}
                              className="w-full px-3 py-1 bg-black/40 border border-white/20 rounded-md mb-2"
                            />
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={skill.level}
                              onChange={(e) => {
                                const updatedSkills = [...aboutContent.skills];
                                updatedSkills[index].level = parseInt(e.target.value);
                                setAboutContent({...aboutContent, skills: updatedSkills});
                              }}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-400">
                              <span>0%</span>
                              <span>{skill.level}%</span>
                              <span>100%</span>
                            </div>
                            <div className="flex justify-end space-x-2 mt-2">
                              <button
                                onClick={() => setEditingSkillId(null)}
                                className="text-xs px-2 py-1 bg-black/40 border border-white/20 rounded hover:border-red-400"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSkillUpdate(index)}
                                className="text-xs px-2 py-1 bg-black/40 border border-neon-blue/50 rounded hover:border-neon-blue"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
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
                            {userRole === 'admin' && (
                              <div className="flex justify-end space-x-1 mt-1">
                                <button
                                  onClick={() => setEditingSkillId(index)}
                                  className="text-xs text-gray-400 hover:text-neon-blue"
                                >
                                  <Edit className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleSkillDelete(index)}
                                  className="text-xs text-gray-400 hover:text-red-400"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Bio Details */}
          <GlassCard className="p-6 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <Star className="w-6 h-6 mr-2 text-neon-blue" />
                Navigating the Digital Universe
              </h2>
              {userRole === 'admin' && !isEditingBio && (
                <button
                  onClick={() => setIsEditingBio(true)}
                  className="p-1 text-gray-400 hover:text-neon-blue transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {isEditingBio ? (
              <div className="mb-4">
                <textarea
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md 
                  focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all min-h-[200px]"
                ></textarea>
                <div className="flex justify-end space-x-2 mt-2">
                  <GlowingButton 
                    color="cyan" 
                    className="text-sm"
                    onClick={() => {
                      setEditedBio(aboutContent.bio);
                      setIsEditingBio(false);
                    }}
                  >
                    Cancel
                  </GlowingButton>
                  <GlowingButton className="text-sm" onClick={handleBioSave}>
                    <Save className="w-4 h-4 mr-1" />
                    Save Bio
                  </GlowingButton>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-gray-300">
                {aboutContent.bio.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            )}
            
            <div className="pt-4 border-t border-white/10 mt-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold">Experience</h3>
                {userRole === 'admin' && (
                  <button 
                    onClick={() => setNewExp({ title: '', company: '', period: '', description: '' })}
                    className="text-neon-blue hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              {/* Add new experience form */}
              {userRole === 'admin' && newExp.title !== null && (
                <div className="mb-4 p-4 glass-card">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Title *</label>
                      <input
                        type="text"
                        value={newExp.title}
                        onChange={(e) => setNewExp({...newExp, title: e.target.value})}
                        placeholder="Position title"
                        className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Company *</label>
                      <input
                        type="text"
                        value={newExp.company}
                        onChange={(e) => setNewExp({...newExp, company: e.target.value})}
                        placeholder="Company name"
                        className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Period</label>
                      <input
                        type="text"
                        value={newExp.period}
                        onChange={(e) => setNewExp({...newExp, period: e.target.value})}
                        placeholder="e.g. 2020 - Present"
                        className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Description</label>
                      <textarea
                        value={newExp.description}
                        onChange={(e) => setNewExp({...newExp, description: e.target.value})}
                        placeholder="Job description"
                        className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-md min-h-[80px]"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-3">
                    <button
                      onClick={() => setNewExp({ title: '', company: '', period: '', description: '' })}
                      className="px-3 py-1 bg-black/40 border border-white/20 rounded text-sm hover:border-red-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleExpAdd}
                      className="px-3 py-1 bg-black/40 border border-neon-blue/50 rounded text-sm hover:border-neon-blue"
                    >
                      Add Experience
                    </button>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {aboutContent.experience.map((exp, index) => (
                  <div key={index}>
                    {editingExpId === index ? (
                      <div className="p-4 glass-card">
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Title *</label>
                            <input
                              type="text"
                              value={exp.title}
                              onChange={(e) => {
                                const updated = [...aboutContent.experience];
                                updated[index].title = e.target.value;
                                setAboutContent({...aboutContent, experience: updated});
                              }}
                              className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Company *</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => {
                                const updated = [...aboutContent.experience];
                                updated[index].company = e.target.value;
                                setAboutContent({...aboutContent, experience: updated});
                              }}
                              className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Period</label>
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => {
                                const updated = [...aboutContent.experience];
                                updated[index].period = e.target.value;
                                setAboutContent({...aboutContent, experience: updated});
                              }}
                              className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Description</label>
                            <textarea
                              value={exp.description}
                              onChange={(e) => {
                                const updated = [...aboutContent.experience];
                                updated[index].description = e.target.value;
                                setAboutContent({...aboutContent, experience: updated});
                              }}
                              className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-md min-h-[80px]"
                            ></textarea>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-3">
                          <button
                            onClick={() => setEditingExpId(null)}
                            className="px-3 py-1 bg-black/40 border border-white/20 rounded text-sm hover:border-red-400"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleExpUpdate(index)}
                            className="px-3 py-1 bg-black/40 border border-neon-blue/50 rounded text-sm hover:border-neon-blue"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="glass-card p-4 hover:shadow-neon-glow transition-all relative">
                        {userRole === 'admin' && (
                          <div className="absolute top-2 right-2 flex space-x-1">
                            <button
                              onClick={() => setEditingExpId(index)}
                              className="text-gray-400 hover:text-neon-blue"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleExpDelete(index)}
                              className="text-gray-400 hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        <h4 className="font-semibold">{exp.title}</h4>
                        <p className="text-sm text-gray-400">{exp.company} • {exp.period}</p>
                        <p className="mt-2">{exp.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Contact Form */}
        <GlassCard className="mt-12 p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Send a Cosmic Message</h2>
          
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            toast.success('Your message has been sent!');
            // Reset form
            e.currentTarget.reset();
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                  placeholder="Your email"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all"
                placeholder="Message subject"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea 
                className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-md focus:outline-none focus:border-neon-blue focus:shadow-neon-glow transition-all min-h-[120px] resize-none"
                placeholder="Your message"
                required
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <GlowingButton className="w-full md:w-auto" type="submit">
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
