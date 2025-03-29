
import React, { useState } from 'react';
import Layout from '../components/Layout';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { Code, ExternalLink, Github, Star, Filter } from 'lucide-react';

const Projects = () => {
  const categories = ['All', 'AI', 'Web Dev', 'Data Science', 'UI/UX'];
  const [activeCategory, setActiveCategory] = useState('All');
  
  const projects = [
    {
      title: 'Neural Style Transfer App',
      description: 'An application that uses AI to apply artistic styles to images.',
      image: '/lovable-uploads/2e6eb633-039f-4b1f-9f20-9b910802c066.png',
      category: 'AI',
      techStack: ['Python', 'TensorFlow', 'React', 'Flask'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      title: 'Cosmic Dashboard',
      description: 'A responsive analytics dashboard with interactive data visualizations.',
      image: '/lovable-uploads/2e6eb633-039f-4b1f-9f20-9b910802c066.png',
      category: 'Web Dev',
      techStack: ['React', 'D3.js', 'Node.js', 'Express'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      title: 'Sentiment Analysis Tool',
      description: 'A tool that analyzes sentiment in text using natural language processing.',
      image: '/lovable-uploads/2e6eb633-039f-4b1f-9f20-9b910802c066.png',
      category: 'Data Science',
      techStack: ['Python', 'NLTK', 'scikit-learn', 'Flask'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      title: 'Nebula UI Kit',
      description: 'A cosmic-themed UI component library for modern web applications.',
      image: '/lovable-uploads/2e6eb633-039f-4b1f-9f20-9b910802c066.png',
      category: 'UI/UX',
      techStack: ['React', 'TypeScript', 'Styled Components'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      title: 'Predictive Text Generator',
      description: 'An AI model that generates text based on learning patterns from input data.',
      image: '/lovable-uploads/2e6eb633-039f-4b1f-9f20-9b910802c066.png',
      category: 'AI',
      techStack: ['Python', 'PyTorch', 'Transformers', 'FastAPI'],
      demoLink: '#',
      repoLink: '#'
    },
    {
      title: 'Data Visualization Explorer',
      description: 'Interactive platform for exploring and creating complex data visualizations.',
      image: '/lovable-uploads/2e6eb633-039f-4b1f-9f20-9b910802c066.png',
      category: 'Data Science',
      techStack: ['JavaScript', 'D3.js', 'Vue.js', 'Express'],
      demoLink: '#',
      repoLink: '#'
    }
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 neon-text">
          Projects <span className="text-white">Gallery</span>
        </h1>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
          Projects in this section are built using a sprint-based learning approach. 
          Explore the innovations and digital experiments conducted here!
        </p>

        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeCategory === category 
                  ? 'bg-neon-blue/20 border border-neon-blue text-white shadow-neon-glow' 
                  : 'bg-black/40 border border-white/20 text-gray-300 hover:border-neon-blue/50'
              }`}
            >
              {category === 'All' && <Filter className="inline w-4 h-4 mr-1" />}
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div key={index} className="group">
              <GlassCard className="h-full overflow-hidden transition-all duration-500 group-hover:transform group-hover:scale-[1.02]">
                <div className="p-4 relative">
                  <div className="absolute top-2 right-2 bg-black/60 rounded-full px-3 py-1 text-xs border border-white/10">
                    {project.category}
                  </div>
                  <div className="h-48 mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-neon-blue inline-flex flex-shrink-0" />
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-xs bg-black/40 border border-white/10 rounded-full px-3 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <GlowingButton color="cyan" className="text-sm flex-1 py-1.5">
                      <a href={project.demoLink} className="flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Demo
                      </a>
                    </GlowingButton>
                    <GlowingButton color="purple" className="text-sm flex-1 py-1.5">
                      <a href={project.repoLink} className="flex items-center justify-center">
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </a>
                    </GlowingButton>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
