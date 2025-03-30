import { Project, Resource, Review, AboutContent, Attachment, UserDetails, UserActivity, Comment } from '../models/DataModels';

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
const DATABASE_LOGS_STORAGE_KEY = 'cosmicApp_databaseLogs';
const COMMENTS_STORAGE_KEY = 'cosmicApp_comments';

// Database Log Entry
interface DatabaseLogEntry {
  id: string;
  timestamp: string;
  action: 'create' | 'update' | 'delete';
  entity: 'project' | 'resource' | 'review' | 'user' | 'about' | 'comment';
  entityId: string;
  details: string;
}

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
  private databaseLogs: DatabaseLogEntry[];
  private comments: Comment[];

  constructor() {
    this.projects = initializeData<Project[]>(PROJECTS_STORAGE_KEY, initialProjects);
    this.resources = initializeData<Resource[]>(RESOURCES_STORAGE_KEY, initialResources);
    this.reviews = initializeData<Review[]>(REVIEWS_STORAGE_KEY, initialReviews);
    this.aboutContent = initializeData<AboutContent>(ABOUT_STORAGE_KEY, initialAboutContent);
    this.userDetails = initializeData<UserDetails[]>(USER_DETAILS_STORAGE_KEY, []);
    this.databaseLogs = initializeData<DatabaseLogEntry[]>(DATABASE_LOGS_STORAGE_KEY, []);
    this.comments = initializeData<Comment[]>(COMMENTS_STORAGE_KEY, []);
    
    // Update older projects that might not have attachments array or comments
    this.projects = this.projects.map(project => {
      if (!project.attachments) project.attachments = [];
      if (!project.comments) project.comments = [];
      if (!project.likes) project.likes = 0;
      return project;
    });
    
    // Update older resources that might not have attachments array or comments
    this.resources = this.resources.map(resource => {
      if (!resource.attachments) resource.attachments = [];
      if (!resource.comments) resource.comments = [];
      if (!resource.likes) resource.likes = 0;
      return resource;
    });
    
    // Update older reviews to include likes
    this.reviews = this.reviews.map(review => {
      if (!review.likes) review.likes = 0;
      return review;
    });
    
    // Save updated data
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(this.projects));
    localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(this.resources));
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(this.reviews));
  }

  // Log database changes
  private logDatabaseChange(action: 'create' | 'update' | 'delete', entity: 'project' | 'resource' | 'review' | 'user' | 'about' | 'comment', entityId: string, details: string) {
    const logEntry: DatabaseLogEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      action,
      entity,
      entityId,
      details
    };
    
    this.databaseLogs = [...this.databaseLogs, logEntry];
    localStorage.setItem(DATABASE_LOGS_STORAGE_KEY, JSON.stringify(this.databaseLogs));
    return logEntry;
  }
  
  // Get all database logs
  getDatabaseLogs(): DatabaseLogEntry[] {
    return [...this.databaseLogs];
  }
  
  // Export database as JSON
  exportDatabase(): string {
    const database = {
      projects: this.projects,
      resources: this.resources,
      reviews: this.reviews,
      aboutContent: this.aboutContent,
      userDetails: this.userDetails,
      databaseLogs: this.databaseLogs
    };
    
    return JSON.stringify(database, null, 2);
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
      id: Date.now().toString(),
      comments: [],
      likes: 0
    };
    this.projects = [...this.projects, newProject];
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(this.projects));
    
    this.logDatabaseChange('create', 'project', newProject.id, `Created project: ${newProject.title}`);
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
    
    this.logDatabaseChange('update', 'project', id, `Updated project: ${updatedProject.title}`);
    return updatedProject;
  }

  deleteProject(id: string): boolean {
    const project = this.getProjectById(id);
    if (!project) return false;
    
    const initialLength = this.projects.length;
    this.projects = this.projects.filter(p => p.id !== id);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(this.projects));
    
    if (this.projects.length < initialLength) {
      this.logDatabaseChange('delete', 'project', id, `Deleted project: ${project.title}`);
      return true;
    }
    return false;
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
      attachments: resource.attachments || [],
      comments: [],
      likes: 0
    };
    this.resources = [...this.resources, newResource];
    localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(this.resources));
    
    this.logDatabaseChange('create', 'resource', newResource.id, `Created resource: ${newResource.title}`);
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
    
    this.logDatabaseChange('update', 'resource', id, `Updated resource: ${updatedResource.title}`);
    return updatedResource;
  }

  deleteResource(id: string): boolean {
    const resource = this.getResourceById(id);
    if (!resource) return false;
    
    const initialLength = this.resources.length;
    this.resources = this.resources.filter(r => r.id !== id);
    localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(this.resources));
    
    if (this.resources.length < initialLength) {
      this.logDatabaseChange('delete', 'resource', id, `Deleted resource: ${resource.title}`);
      return true;
    }
    return false;
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

  addReview(review: Omit<Review, 'id' | 'date' | 'likes'>): Review {
    const now = new Date();
    const newReview = {
      ...review,
      id: Date.now().toString(),
      date: 'Just now',
      likes: 0
    };
    this.reviews = [...this.reviews, newReview];
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(this.reviews));
    
    this.logDatabaseChange('create', 'review', newReview.id, `Created review by: ${newReview.name}`);
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
    
    this.logDatabaseChange('update', 'review', id, `Updated review by: ${updatedReview.name}`);
    return updatedReview;
  }

  deleteReview(id: string): boolean {
    const review = this.reviews.find(r => r.id === id);
    if (!review) return false;
    
    const initialLength = this.reviews.length;
    this.reviews = this.reviews.filter(r => r.id !== id);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(this.reviews));
    
    if (this.reviews.length < initialLength) {
      this.logDatabaseChange('delete', 'review', id, `Deleted review by: ${review.name}`);
      return true;
    }
    return false;
  }
  
  likeReview(id: string): boolean {
    const review = this.reviews.find(r => r.id === id);
    if (!review) return false;
    
    const updatedReview = { 
      ...review, 
      likes: (review.likes || 0) + 1 
    };
    
    return !!this.updateReview(id, updatedReview);
  }

  // Comments Methods
  getAllComments(): Comment[] {
    return [...this.comments];
  }
  
  getCommentById(id: string): Comment | undefined {
    return this.comments.find(comment => comment.id === id);
  }
  
  getCommentsByResourceId(resourceId: string): Comment[] {
    return this.comments.filter(comment => comment.resourceId === resourceId);
  }
  
  getCommentsByProjectId(projectId: string): Comment[] {
    return this.comments.filter(comment => comment.projectId === projectId);
  }
  
  addComment(comment: Omit<Comment, 'id' | 'timestamp'>): Comment {
    const now = new Date();
    const newComment = {
      ...comment,
      id: Date.now().toString(),
      timestamp: now.toISOString(),
      likes: 0
    };
    
    this.comments = [...this.comments, newComment];
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(this.comments));
    
    // Update the relevant resource or project with the comment
    if (newComment.resourceId) {
      const resource = this.getResourceById(newComment.resourceId);
      if (resource) {
        const updatedResource = {
          ...resource,
          comments: [...(resource.comments || []), newComment]
        };
        this.updateResource(newComment.resourceId, updatedResource);
      }
    } else if (newComment.projectId) {
      const project = this.getProjectById(newComment.projectId);
      if (project) {
        const updatedProject = {
          ...project,
          comments: [...(project.comments || []), newComment]
        };
        this.updateProject(newComment.projectId, updatedProject);
      }
    }
    
    this.logDatabaseChange('create', 'comment', newComment.id, `Comment added by: ${newComment.userName}`);
    return newComment;
  }
  
  updateComment(id: string, commentData: Partial<Comment>): Comment | undefined {
    const index = this.comments.findIndex(c => c.id === id);
    if (index === -1) return undefined;
    
    const originalComment = this.comments[index];
    const updatedComment = { ...originalComment, ...commentData };
    
    this.comments = [
      ...this.comments.slice(0, index),
      updatedComment,
      ...this.comments.slice(index + 1)
    ];
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(this.comments));
    
    // Update the comment in the relevant resource or project
    if (originalComment.resourceId) {
      const resource = this.getResourceById(originalComment.resourceId);
      if (resource && resource.comments) {
        const updatedComments = resource.comments.map(c => 
          c.id === id ? updatedComment : c
        );
        this.updateResource(originalComment.resourceId, { comments: updatedComments });
      }
    } else if (originalComment.projectId) {
      const project = this.getProjectById(originalComment.projectId);
      if (project && project.comments) {
        const updatedComments = project.comments.map(c => 
          c.id === id ? updatedComment : c
        );
        this.updateProject(originalComment.projectId, { comments: updatedComments });
      }
    }
    
    this.logDatabaseChange('update', 'comment', id, `Comment updated by: ${updatedComment.userName}`);
    return updatedComment;
  }
  
  deleteComment(id: string): boolean {
    const comment = this.comments.find(c => c.id === id);
    if (!comment) return false;
    
    // Remove from comments array
    this.comments = this.comments.filter(c => c.id !== id);
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(this.comments));
    
    // Remove from the relevant resource or project
    if (comment.resourceId) {
      const resource = this.getResourceById(comment.resourceId);
      if (resource && resource.comments) {
        const updatedComments = resource.comments.filter(c => c.id !== id);
        this.updateResource(comment.resourceId, { comments: updatedComments });
      }
    } else if (comment.projectId) {
      const project = this.getProjectById(comment.projectId);
      if (project && project.comments) {
        const updatedComments = project.comments.filter(c => c.id !== id);
        this.updateProject(comment.projectId, { comments: updatedComments });
      }
    }
    
    this.logDatabaseChange('delete', 'comment', id, `Comment deleted by: ${comment.userName}`);
    return true;
  }
  
  likeComment(id: string): boolean {
    const index = this.comments.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    const comment = this.comments[index];
    const updatedLikes = (comment.likes || 0) + 1;
    
    return !!this.updateComment(id, { likes: updatedLikes });
  }

  // About Content Methods
  getAboutContent(): AboutContent {
    return { ...this.aboutContent };
  }

  updateAboutContent(content: Partial<AboutContent>): AboutContent {
    this.aboutContent = { ...this.aboutContent, ...content };
    localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(this.aboutContent));
    
    this.logDatabaseChange('update', 'about', '1', 'Updated about content');
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
      activity: []
    };
    
    this.userDetails = [...this.userDetails, newUserDetails];
    localStorage.setItem(USER_DETAILS_STORAGE_KEY, JSON.stringify(this.userDetails));
    
    this.logDatabaseChange('create', 'user', newUserDetails.id, `Created user: ${newUserDetails.name}`);
    return newUserDetails;
  }
  
  getUserDetailsById(id: string): UserDetails | undefined {
    return this.userDetails.find(user => user.id === id);
  }
  
  updateUserDetails(id: string, details: Partial<UserDetails>): UserDetails | undefined {
    const index = this.userDetails.findIndex(u => u.id === id);
    if (index === -1) return undefined;
  
    const updatedUserDetails = { ...this.userDetails[index], ...details };
    this.userDetails = [
      ...this.userDetails.slice(0, index),
      updatedUserDetails,
      ...this.userDetails.slice(index + 1)
    ];
    localStorage.setItem(USER_DETAILS_STORAGE_KEY, JSON.stringify(this.userDetails));
    
    this.logDatabaseChange('update', 'user', id, `Updated user: ${updatedUserDetails.name}`);
    return updatedUserDetails;
  }
  
  deleteUserDetails(id: string): boolean {
    const user = this.getUserDetailsById(id);
    if (!user) return false;
    
    const initialLength = this.userDetails.length;
    this.userDetails = this.userDetails.filter(u => u.id !== id);
    localStorage.setItem(USER_DETAILS_STORAGE_KEY, JSON.stringify(this.userDetails));
    
    if (this.userDetails.length < initialLength) {
      this.logDatabaseChange('delete', 'user', id, `Deleted user: ${user.name}`);
      return true;
    }
    return false;
  }
  
  // User Activity Methods
  getUserActivity(userId: string): UserActivity[] {
    const user = this.getUserDetailsById(userId);
    return user?.activity || [];
  }
  
  addUserActivity(userId: string, activity: Omit<UserActivity, 'id' | 'timestamp'>): UserActivity | undefined {
    const user = this.getUserDetailsById(userId);
    if (!user) return undefined;
    
    const newActivity: UserActivity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    const updatedUser = {
      ...user,
      activity: [...(user.activity || []), newActivity]
    };
    
    this.updateUserDetails(userId, updatedUser);
    return newActivity;
  }

  // Reset data to initial values (for testing)
  resetData(): void {
    this.projects = [...initialProjects];
    this.resources = [...initialResources];
    this.reviews = [...initialReviews];
    this.aboutContent = { ...initialAboutContent };
    this.userDetails = [];
    this.databaseLogs = [];
    this.comments = [];
    
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(this.projects));
    localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(this.resources));
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(this.reviews));
    localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(this.aboutContent));
    localStorage.setItem(USER_DETAILS_STORAGE_KEY, JSON.stringify(this.userDetails));
    localStorage.setItem(DATABASE_LOGS_STORAGE_KEY, JSON.stringify(this.databaseLogs));
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(this.comments));
    
    this.logDatabaseChange('update', 'about', '1', 'Reset all data to defaults');
  }
  
  // Download user data as JSON file
  downloadUserData(): void {
    const userData = {
      userDetails: this.userDetails,
      comments: this.comments
    };
    
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cosmic_galaxy_user_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

// Create and export a singleton instance
export const dataService = new DataService();
