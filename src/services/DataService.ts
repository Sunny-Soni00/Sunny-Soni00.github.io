import { Project, Resource, Review, AboutContent, Attachment, UserDetails } from '../models/DataModels';

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
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/sunny-soni1089',
    github: '#',
    twitter: '#',
    email: 'mailto:example@example.com'
  },
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
const USER_DETAILS_STORAGE_KEY = 'cosmicApp_userDetails';

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
  localStorage.setItem(storageKey, JSON.stringify(initialData));
  return initialData;
};

// Data Service Class
class DataService {
  private projects: Project[];
  private resources: Resource[];
  private reviews: Review[];
  private aboutContent: AboutContent;
  private userDetails: UserDetails[];

  constructor() {
    this.projects = initializeData<Project[]>(PROJECTS_STORAGE_KEY, initialProjects);
    this.resources = initializeData<Resource[]>(RESOURCES_STORAGE_KEY, initialResources);
    this.reviews = initializeData<Review[]>(REVIEWS_STORAGE_KEY, initialReviews);
    this.aboutContent = initializeData<AboutContent>(ABOUT_STORAGE_KEY, initialAboutContent);
    this.userDetails = initializeData<UserDetails[]>(USER_DETAILS_STORAGE_KEY, []);
    
    // Update older projects that might not have attachments array
    this.projects = this.projects.map(project => {
      if (!project.attachments) {
        return {
          ...project,
          attachments: []
        };
      }
      return project;
    });
    
    // Update older resources that might not have attachments array
    this.resources = this.resources.map(resource => {
      if (!resource.attachments) {
        return {
          ...resource,
          attachments: []
        };
      }
      return resource;
    });
    
    // Save updated projects and resources
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(this.projects));
    localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(this.resources));
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

  // Projects Attachments Methods
  addProjectAttachment(projectId: string, attachment: Omit<Attachment, 'id'>): Attachment | null {
    const project = this.getProjectById(projectId);
    if (!project) return null;
    
    const newAttachment = {
      ...attachment,
      id: Date.now().toString()
    };
    
    const attachments = project.attachments || [];
    const updatedProject = {
      ...project,
      attachments: [...attachments, newAttachment]
    };
    
    this.updateProject(projectId, updatedProject);
    return newAttachment;
  }
  
  deleteProjectAttachment(projectId: string, attachmentId: string): boolean {
    const project = this.getProjectById(projectId);
    if (!project || !project.attachments) return false;
    
    const initialCount = project.attachments.length;
    const updatedAttachments = project.attachments.filter(a => a.id !== attachmentId);
    
    if (initialCount === updatedAttachments.length) return false;
    
    this.updateProject(projectId, { attachments: updatedAttachments });
    return true;
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
      id: Date.now().toString(),
      attachments: resource.attachments || []
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
  
  // Resource Attachments Methods
  addResourceAttachment(resourceId: string, attachment: Omit<Attachment, 'id'>): Attachment | null {
    const resource = this.getResourceById(resourceId);
    if (!resource) return null;
    
    const newAttachment = {
      ...attachment,
      id: Date.now().toString()
    };
    
    const attachments = resource.attachments || [];
    const updatedResource = {
      ...resource,
      attachments: [...attachments, newAttachment]
    };
    
    this.updateResource(resourceId, updatedResource);
    return newAttachment;
  }
  
  deleteResourceAttachment(resourceId: string, attachmentId: string): boolean {
    const resource = this.getResourceById(resourceId);
    if (!resource || !resource.attachments) return false;
    
    const initialCount = resource.attachments.length;
    const updatedAttachments = resource.attachments.filter(a => a.id !== attachmentId);
    
    if (initialCount === updatedAttachments.length) return false;
    
    this.updateResource(resourceId, { attachments: updatedAttachments });
    return true;
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
  
  updateReview(id: string, review: Partial<Review>): Review | undefined {
    const index = this.reviews.findIndex(r => r.id === id);
    if (index === -1) return undefined;

    const updatedReview = { ...this.reviews[index], ...review };
    this.reviews = [
      ...this.reviews.slice(0, index),
      updatedReview,
      ...this.reviews.slice(index + 1)
    ];
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(this.reviews));
    return updatedReview;
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
  
  // User Details Methods
  getAllUserDetails(): UserDetails[] {
    return [...this.userDetails];
  }
  
  addUserDetails(details: Omit<UserDetails, 'id'>): UserDetails {
    const newUserDetails = {
      ...details,
      id: Date.now().toString(),
    };
    
    this.userDetails = [...this.userDetails, newUserDetails];
    localStorage.setItem(USER_DETAILS_STORAGE_KEY, JSON.stringify(this.userDetails));
    return newUserDetails;
  }
  
  getUserDetailsById(id: string): UserDetails | undefined {
    return this.userDetails.find(user => user.id === id);
  }
  
  deleteUserDetails(id: string): boolean {
    const initialLength = this.userDetails.length;
    this.userDetails = this.userDetails.filter(u => u.id !== id);
    localStorage.setItem(USER_DETAILS_STORAGE_KEY, JSON.stringify(this.userDetails));
    return this.userDetails.length < initialLength;
  }

  // Reset data to initial values (for testing)
  resetData(): void {
    this.projects = [...initialProjects];
    this.resources = [...initialResources];
    this.reviews = [...initialReviews];
    this.aboutContent = { ...initialAboutContent };
    this.userDetails = [];
    
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(this.projects));
    localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(this.resources));
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(this.reviews));
    localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(this.aboutContent));
    localStorage.setItem(USER_DETAILS_STORAGE_KEY, JSON.stringify(this.userDetails));
  }
}

// Create and export a singleton instance
export const dataService = new DataService();
