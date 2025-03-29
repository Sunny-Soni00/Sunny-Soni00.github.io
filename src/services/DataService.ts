
import { Project, Resource, Review, AboutContent } from '../models/DataModels';

// Initial Projects Data
const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Neural Style Transfer App',
    description: 'An application that uses AI to apply artistic styles to images.',
    image: '/lovable-uploads/2e6eb633-039f-4b1f-9f20-9b910802c066.png',
    category: 'AI',
    techStack: ['Python', 'TensorFlow', 'React', 'Flask'],
    demoLink: '#',
    repoLink: '#'
  },
  {
    id: '2',
    title: 'Cosmic Dashboard',
    description: 'A responsive analytics dashboard with interactive data visualizations.',
    image: '/lovable-uploads/2e6eb633-039f-4b1f-9f20-9b910802c066.png',
    category: 'Web Dev',
    techStack: ['React', 'D3.js', 'Node.js', 'Express'],
    demoLink: '#',
    repoLink: '#'
  },
  {
    id: '3',
    title: 'Sentiment Analysis Tool',
    description: 'A tool that analyzes sentiment in text using natural language processing.',
    image: '/lovable-uploads/2e6eb633-039f-4b1f-9f20-9b910802c066.png',
    category: 'Data Science',
    techStack: ['Python', 'NLTK', 'scikit-learn', 'Flask'],
    demoLink: '#',
    repoLink: '#'
  },
  {
    id: '4',
    title: 'Nebula UI Kit',
    description: 'A cosmic-themed UI component library for modern web applications.',
    image: '/lovable-uploads/2e6eb633-039f-4b1f-9f20-9b910802c066.png',
    category: 'UI/UX',
    techStack: ['React', 'TypeScript', 'Styled Components'],
    demoLink: '#',
    repoLink: '#'
  },
  {
    id: '5',
    title: 'Predictive Text Generator',
    description: 'An AI model that generates text based on learning patterns from input data.',
    image: '/lovable-uploads/2e6eb633-039f-4b1f-9f20-9b910802c066.png',
    category: 'AI',
    techStack: ['Python', 'PyTorch', 'Transformers', 'FastAPI'],
    demoLink: '#',
    repoLink: '#'
  },
  {
    id: '6',
    title: 'Data Visualization Explorer',
    description: 'Interactive platform for exploring and creating complex data visualizations.',
    image: '/lovable-uploads/2e6eb633-039f-4b1f-9f20-9b910802c066.png',
    category: 'Data Science',
    techStack: ['JavaScript', 'D3.js', 'Vue.js', 'Express'],
    demoLink: '#',
    repoLink: '#'
  }
];

// Initial Resources Data
const initialResources: Resource[] = [
  {
    id: '1',
    title: 'Machine Learning Fundamentals',
    description: 'A comprehensive guide to machine learning concepts and applications.',
    type: 'PDF',
    category: 'AI & ML',
    link: '#'
  },
  {
    id: '2',
    title: 'Web Development Roadmap 2023',
    description: 'The complete path to becoming a full-stack web developer.',
    type: 'Article',
    category: 'Web Development',
    link: '#'
  },
  {
    id: '3',
    title: 'UI Design Principles',
    description: 'Essential principles for creating intuitive and beautiful user interfaces.',
    type: 'PDF',
    category: 'UI/UX Design',
    link: '#'
  },
  {
    id: '4',
    title: 'The Future of AI',
    description: 'A research paper exploring the potential future developments in artificial intelligence.',
    type: 'PDF',
    category: 'AI & ML',
    link: '#'
  },
  {
    id: '5',
    title: 'React Performance Optimization',
    description: 'Techniques to improve performance in React applications.',
    type: 'Article',
    category: 'Web Development',
    link: '#'
  },
  {
    id: '6',
    title: 'Design Systems Guide',
    description: 'How to create and implement effective design systems.',
    type: 'PDF',
    category: 'UI/UX Design',
    link: '#'
  },
  {
    id: '7',
    title: 'Data Science Handbook',
    description: 'A comprehensive reference for data science methods and tools.',
    type: 'Book',
    category: 'AI & ML',
    link: '#'
  },
  {
    id: '8',
    title: 'JavaScript: The Good Parts',
    description: 'A classic book on JavaScript best practices.',
    type: 'Book',
    category: 'Web Development',
    link: '#'
  }
];

// Initial Reviews Data
const initialReviews: Review[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'UX Designer',
    message: 'The cosmic interface is truly revolutionary. The attention to detail in the UI elements creates an immersive experience that feels both futuristic and intuitive.',
    rating: 5,
    date: '2 weeks ago'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Web Developer',
    message: 'I\'ve been looking for resources on AI integration, and this site delivered beyond expectation. The project showcase is particularly inspiring!',
    rating: 4,
    date: '1 month ago'
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    role: 'Data Scientist',
    message: 'As someone in the field of data visualization, I appreciate the creative approach to displaying complex information. The cosmic theme complements the technical content perfectly.',
    rating: 5,
    date: '3 months ago'
  }
];

// Initial About Content
const initialAboutContent: AboutContent = {
  bio: `Welcome to my cosmic corner of the digital universe! I'm a passionate explorer of emerging technologies, 
  constantly navigating through the vast expanse of innovation and creativity.
  
  My journey spans across various technological domains - from artificial intelligence and machine learning 
  to web development and creative design. I believe in the transformative power of technology when aligned 
  with human-centered approaches.
  
  Through this digital dreamscape, I aim to share my learnings, projects, and resources that might help 
  fellow cosmic travelers on their own journeys. Each project represents a star in my personal galaxy of 
  experiences, and each resource is a planet of knowledge waiting to be explored.`,
  experience: [
    {
      title: 'Digital Innovation Lead',
      company: 'TechNova Solutions',
      period: '2020 - Present',
      description: 'Leading digital transformation initiatives and exploring emerging tech frontiers.'
    },
    {
      title: 'AI Research Contributor',
      company: 'FutureLab Institute',
      period: '2018 - 2020',
      description: 'Researched applications of machine learning in creative industries.'
    }
  ],
  skills: [
    { name: 'AI & Machine Learning', level: 85 },
    { name: 'Web Development', level: 90 },
    { name: 'Data Science', level: 75 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'Cloud Computing', level: 70 },
  ]
};

// Local Storage Keys
const PROJECTS_STORAGE_KEY = 'cosmicApp_projects';
const RESOURCES_STORAGE_KEY = 'cosmicApp_resources';
const REVIEWS_STORAGE_KEY = 'cosmicApp_reviews';
const ABOUT_STORAGE_KEY = 'cosmicApp_about';

// Helper to initialize data from localStorage or defaults
const initializeData = <T>(storageKey: string, initialData: T): T => {
  const storedData = localStorage.getItem(storageKey);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (e) {
      console.error(`Error parsing stored data for ${storageKey}:`, e);
      return initialData;
    }
  }
  return initialData;
};

// Data Service Class
class DataService {
  private projects: Project[];
  private resources: Resource[];
  private reviews: Review[];
  private aboutContent: AboutContent;

  constructor() {
    this.projects = initializeData<Project[]>(PROJECTS_STORAGE_KEY, initialProjects);
    this.resources = initializeData<Resource[]>(RESOURCES_STORAGE_KEY, initialResources);
    this.reviews = initializeData<Review[]>(REVIEWS_STORAGE_KEY, initialReviews);
    this.aboutContent = initializeData<AboutContent>(ABOUT_STORAGE_KEY, initialAboutContent);
  }

  // Projects Methods
  getAllProjects(): Project[] {
    return [...this.projects];
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  addProject(project: Omit<Project, 'id'>): Project {
    const newProject = {
      ...project,
      id: Date.now().toString()
    };
    this.projects = [...this.projects, newProject];
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(this.projects));
    return newProject;
  }

  updateProject(id: string, project: Partial<Project>): Project | undefined {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    const updatedProject = { ...this.projects[index], ...project };
    this.projects = [
      ...this.projects.slice(0, index),
      updatedProject,
      ...this.projects.slice(index + 1)
    ];
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(this.projects));
    return updatedProject;
  }

  deleteProject(id: string): boolean {
    const initialLength = this.projects.length;
    this.projects = this.projects.filter(p => p.id !== id);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(this.projects));
    return this.projects.length < initialLength;
  }

  // Resources Methods
  getAllResources(): Resource[] {
    return [...this.resources];
  }

  getResourceById(id: string): Resource | undefined {
    return this.resources.find(resource => resource.id === id);
  }

  addResource(resource: Omit<Resource, 'id'>): Resource {
    const newResource = {
      ...resource,
      id: Date.now().toString()
    };
    this.resources = [...this.resources, newResource];
    localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(this.resources));
    return newResource;
  }

  updateResource(id: string, resource: Partial<Resource>): Resource | undefined {
    const index = this.resources.findIndex(r => r.id === id);
    if (index === -1) return undefined;

    const updatedResource = { ...this.resources[index], ...resource };
    this.resources = [
      ...this.resources.slice(0, index),
      updatedResource,
      ...this.resources.slice(index + 1)
    ];
    localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(this.resources));
    return updatedResource;
  }

  deleteResource(id: string): boolean {
    const initialLength = this.resources.length;
    this.resources = this.resources.filter(r => r.id !== id);
    localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(this.resources));
    return this.resources.length < initialLength;
  }

  // Reviews Methods
  getAllReviews(): Review[] {
    return [...this.reviews];
  }

  addReview(review: Omit<Review, 'id' | 'date'>): Review {
    const now = new Date();
    const newReview = {
      ...review,
      id: Date.now().toString(),
      date: 'Just now'
    };
    this.reviews = [...this.reviews, newReview];
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(this.reviews));
    return newReview;
  }

  deleteReview(id: string): boolean {
    const initialLength = this.reviews.length;
    this.reviews = this.reviews.filter(r => r.id !== id);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(this.reviews));
    return this.reviews.length < initialLength;
  }

  // About Content Methods
  getAboutContent(): AboutContent {
    return { ...this.aboutContent };
  }

  updateAboutContent(content: Partial<AboutContent>): AboutContent {
    this.aboutContent = { ...this.aboutContent, ...content };
    localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(this.aboutContent));
    return this.aboutContent;
  }

  // Reset data to initial values (for testing)
  resetData(): void {
    this.projects = [...initialProjects];
    this.resources = [...initialResources];
    this.reviews = [...initialReviews];
    this.aboutContent = { ...initialAboutContent };
    
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(this.projects));
    localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(this.resources));
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(this.reviews));
    localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(this.aboutContent));
  }
}

// Create and export a singleton instance
export const dataService = new DataService();
