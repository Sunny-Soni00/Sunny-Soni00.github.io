import { Project, Resource, Review, UserDetails, DatabaseChange, AboutContent, AdminCredentials, Attachment } from '../models/DataModels';

export class DataService {
  private static instance: DataService;
  
  private constructor() {}

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // Helper function to simulate delay
  private delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  // Initial Data (can be extended)
  private initialProjects: Project[] = [
    {
      id: '1',
      title: 'AI-Powered Chatbot',
      description: 'A chatbot that uses natural language processing to understand and respond to user queries.',
      image: 'https://images.unsplash.com/photo-1583508915404-24c82458e384?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'AI',
      techStack: ['React', 'Node.js', 'TensorFlow'],
      demoLink: 'https://example.com/chatbot',
      repoLink: 'https://github.com/example/chatbot',
      attachments: []
    },
    {
      id: '2',
      title: 'E-commerce Platform',
      description: 'An e-commerce platform built with React and Node.js.',
      image: 'https://images.unsplash.com/photo-1517331156700-3c241e89114d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      category: 'Web Dev',
      techStack: ['React', 'Node.js', 'MongoDB'],
      demoLink: 'https://example.com/ecommerce',
      repoLink: 'https://github.com/example/ecommerce',
      attachments: []
    },
    {
      id: '3',
      title: 'Data Visualization Dashboard',
      description: 'A dashboard that visualizes data from various sources.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'Data Science',
      techStack: ['React', 'Python', 'Flask'],
      demoLink: 'https://example.com/dashboard',
      repoLink: 'https://github.com/example/dashboard',
      attachments: []
    },
    {
      id: '4',
      title: 'Mobile App UI Design',
      description: 'A mobile app UI design for a social media platform.',
      image: 'https://images.unsplash.com/photo-1555057324-b44a752a7ca5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      category: 'UI/UX',
      techStack: ['Figma', 'Adobe XD'],
      demoLink: 'https://example.com/mobile-app',
      repoLink: 'https://github.com/example/mobile-app',
      attachments: []
    },
  ];
  private initialResources: Resource[] = [
    {
      id: '1',
      title: 'AI Best Practices',
      description: 'A guide to AI best practices.',
      type: 'Article',
      category: 'AI & ML',
      link: 'https://example.com/ai-best-practices',
      attachments: []
    },
    {
      id: '2',
      title: 'React Documentation',
      description: 'The official React documentation.',
      type: 'Article',
      category: 'Web Development',
      link: 'https://reactjs.org/docs/getting-started.html',
      attachments: []
    },
    {
      id: '3',
      title: 'UI/UX Design Principles',
      description: 'A guide to UI/UX design principles.',
      type: 'Article',
      category: 'UI/UX Design',
      link: 'https://example.com/ui-ux-design-principles',
      attachments: []
    },
    {
      id: '4',
      title: 'The Elements of Statistical Learning',
      description: 'A book on statistical learning.',
      type: 'Book',
      category: 'Books & PDFs',
      link: 'https://web.stanford.edu/~hastie/ElemStatLearn/',
      attachments: []
    },
  ];
  private initialReviews: Review[] = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Software Engineer',
      message: 'Great website!',
      rating: 5,
      date: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      attachments: []
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Data Scientist',
      message: 'I learned a lot from this website.',
      rating: 4,
      date: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      attachments: []
    },
  ];
  private initialUserDetails: UserDetails[] = [
    {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      visitDate: new Date().toISOString(),
      age: 30,
      gender: 'Male',
      profilePicture: 'https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      bio: 'A test user',
      phone: '123-456-7890',
      occupation: 'Software Engineer',
      interests: ['AI', 'Web Development']
    }
  ];
  private initialAboutContent: AboutContent = {
    bio: 'I am a full-stack developer with a passion for AI and digital transformation.',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00d5a4ee9baa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      twitter: 'https://twitter.com/johndoe',
      email: 'john.doe@example.com'
    },
    experience: [
      {
        title: 'Software Engineer',
        company: 'Example Corp',
        period: '2020 - Present',
        description: 'Developed and maintained various web applications.'
      },
      {
        title: 'Data Scientist',
        company: 'Another Example Corp',
        period: '2018 - 2020',
        description: 'Developed and maintained various data science projects.'
      }
    ],
    skills: [
      {
        name: 'React',
        level: 5
      },
      {
        name: 'Node.js',
        level: 4
      },
      {
        name: 'Python',
        level: 4
      },
      {
        name: 'TensorFlow',
        level: 3
      }
    ]
  };
  private initialAdminCredentials: AdminCredentials[] = [
    {
      userId: 'admin',
      password: 'password'
    }
  ];

  // Load data from localStorage or initialize with initial data
  getAllProjects(): Project[] {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : this.initialProjects;
  }

  getProjectById(id: string): Project | undefined {
    const projects = this.getAllProjects();
    return projects.find(project => project.id === id);
  }

  addProject(project: Omit<Project, 'id'>): Project {
    const projects = this.getAllProjects();
    const newProject = { ...project, id: Date.now().toString() };
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
    this.logDatabaseChange('add', 'project', newProject.id);
    return newProject;
  }

  updateProject(id: string, updatedProject: Project): Project | undefined {
    const projects = this.getAllProjects();
    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex !== -1) {
      projects[projectIndex] = updatedProject;
      localStorage.setItem('projects', JSON.stringify(projects));
      this.logDatabaseChange('update', 'project', id);
      return updatedProject;
    }
    return undefined;
  }

  deleteProject(id: string): boolean {
    const projects = this.getAllProjects();
    const updatedProjects = projects.filter(project => project.id !== id);
    if (updatedProjects.length < projects.length) {
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      this.logDatabaseChange('delete', 'project', id);
      return true;
    }
    return false;
  }

  getAllResources(): Resource[] {
    const resources = localStorage.getItem('resources');
    return resources ? JSON.parse(resources) : this.initialResources;
  }

  getResourceById(id: string): Resource | undefined {
    const resources = this.getAllResources();
    return resources.find(resource => resource.id === id);
  }

  addResource(resource: Omit<Resource, 'id'>): Resource {
    const resources = this.getAllResources();
    const newResource = { ...resource, id: Date.now().toString() };
    resources.push(newResource);
    localStorage.setItem('resources', JSON.stringify(resources));
    this.logDatabaseChange('add', 'resource', newResource.id);
    return newResource;
  }

  updateResource(id: string, updatedResource: Resource): Resource | undefined {
    const resources = this.getAllResources();
    const resourceIndex = resources.findIndex(resource => resource.id === id);
    if (resourceIndex !== -1) {
      resources[resourceIndex] = updatedResource;
      localStorage.setItem('resources', JSON.stringify(resources));
      this.logDatabaseChange('update', 'resource', id);
      return updatedResource;
    }
    return undefined;
  }

  deleteResource(id: string): boolean {
    const resources = this.getAllResources();
    const updatedResources = resources.filter(resource => resource.id !== id);
    if (updatedResources.length < resources.length) {
      localStorage.setItem('resources', JSON.stringify(updatedResources));
      this.logDatabaseChange('delete', 'resource', id);
      return true;
    }
    return false;
  }

  getAllReviews(): Review[] {
    const reviews = localStorage.getItem('reviews');
    return reviews ? JSON.parse(reviews) : this.initialReviews;
  }

  addReview(review: Omit<Review, 'id'>): Review {
    const reviews = this.getAllReviews();
    const newReview = { ...review, id: Date.now().toString() };
    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    this.logDatabaseChange('add', 'review', newReview.id);
    return newReview;
  }

  updateReview(id: string, updatedReview: Review): Review | undefined {
    const reviews = this.getAllReviews();
    const reviewIndex = reviews.findIndex(review => review.id === id);
    if (reviewIndex !== -1) {
      reviews[reviewIndex] = updatedReview;
      localStorage.setItem('reviews', JSON.stringify(reviews));
      this.logDatabaseChange('update', 'review', id);
      return updatedReview;
    }
    return undefined;
  }

  deleteReview(id: string): boolean {
    const reviews = this.getAllReviews();
    const updatedReviews = reviews.filter(review => review.id !== id);
    if (updatedReviews.length < reviews.length) {
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
      this.logDatabaseChange('delete', 'review', id);
      return true;
    }
    return false;
  }

  getAllUserDetails(): UserDetails[] {
    const userDetails = localStorage.getItem('userDetails');
    return userDetails ? JSON.parse(userDetails) : this.initialUserDetails;
  }

  getUserDetailsById(id: string): UserDetails | undefined {
    const userDetails = this.getAllUserDetails();
    return userDetails.find(user => user.id === id);
  }

  addUserDetails(user: Omit<UserDetails, 'id'>): UserDetails {
    const userDetails = this.getAllUserDetails();
    const newUser = { ...user, id: Date.now().toString() };
    userDetails.push(newUser);
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    this.logDatabaseChange('add', 'user', newUser.id);
    return newUser;
  }

  updateUserDetails(id: string, updatedUser: UserDetails): UserDetails | undefined {
    const userDetails = this.getAllUserDetails();
    const userIndex = userDetails.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      userDetails[userIndex] = updatedUser;
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      this.logDatabaseChange('update', 'user', id);
      return updatedUser;
    }
    return undefined;
  }

  deleteUserDetails(id: string): boolean {
    const userDetails = this.getAllUserDetails();
    const updatedUserDetails = userDetails.filter(user => user.id !== id);
    if (updatedUserDetails.length < userDetails.length) {
      localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));
      this.logDatabaseChange('delete', 'user', id);
      return true;
    }
    return false;
  }

  getAboutContent(): AboutContent {
    const aboutContent = localStorage.getItem('aboutContent');
    return aboutContent ? JSON.parse(aboutContent) : this.initialAboutContent;
  }

  updateAboutContent(updatedAboutContent: AboutContent): AboutContent {
    localStorage.setItem('aboutContent', JSON.stringify(updatedAboutContent));
    return updatedAboutContent;
  }

  getAdminCredentials(): AdminCredentials[] {
    const adminCredentials = localStorage.getItem('adminCredentials');
    return adminCredentials ? JSON.parse(adminCredentials) : this.initialAdminCredentials;
  }

  updateAdminCredentials(updatedAdminCredentials: AdminCredentials[]): AdminCredentials[] {
    localStorage.setItem('adminCredentials', JSON.stringify(updatedAdminCredentials));
    return updatedAdminCredentials;
  }

  // Method to reset all data to default
  resetData() {
    localStorage.removeItem('projects');
    localStorage.removeItem('resources');
    localStorage.removeItem('reviews');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('databaseChanges');
    localStorage.setItem('projects', JSON.stringify(this.initialProjects));
    localStorage.setItem('resources', JSON.stringify(this.initialResources));
    localStorage.setItem('reviews', JSON.stringify(this.initialReviews));
    localStorage.setItem('userDetails', JSON.stringify(this.initialUserDetails));
  }

  // Method to log database changes
  private logDatabaseChange(action: DatabaseChange['action'], entityType: DatabaseChange['entityType'], entityId: string) {
    const changes = this.getAllDatabaseChanges();
    const newChange: DatabaseChange = {
      id: Date.now().toString(),
      action,
      entityType,
      entityId,
      timestamp: new Date().toISOString()
    };
    changes.push(newChange);
    localStorage.setItem('databaseChanges', JSON.stringify(changes));
  }

  // Add missing method for database changes
  getAllDatabaseChanges() {
    const changes = localStorage.getItem('databaseChanges');
    return changes ? JSON.parse(changes) : [];
  }

  // Add method for database export
  downloadDatabase() {
    const data = {
      projects: this.getAllProjects(),
      resources: this.getAllResources(),
      reviews: this.getAllReviews(),
      userDetails: this.getAllUserDetails(),
      databaseChanges: this.getAllDatabaseChanges()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cosmic_dreamscape_db_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    return true;
  }

  // Add missing method for recent activity
  getRecentActivity(limit: number = 5) {
    // Get combined recent projects, resources, and reviews
    const projects = this.getAllProjects().slice(0, limit).map(p => ({
      id: p.id,
      type: 'Project',
      title: p.title,
      category: p.category
    }));
    
    const resources = this.getAllResources().slice(0, limit).map(r => ({
      id: r.id,
      type: 'Resource',
      title: r.title,
      category: r.category
    }));
    
    const reviews = this.getAllReviews().slice(0, limit).map(r => ({
      id: r.id,
      type: 'Review',
      title: r.name,
      category: r.role
    }));
    
    // Combine and sort by most recent (for this mock, we'll just randomize)
    return [...projects, ...resources, ...reviews]
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  }

  // Add missing method for project comments
  addProjectComment(projectId: string, comment: Partial<Comment>) {
    const projects = this.getAllProjects();
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex !== -1) {
      if (!projects[projectIndex].comments) {
        projects[projectIndex].comments = [];
      }
      
      projects[projectIndex].comments?.push({
        ...(comment as Comment),
        id: Date.now().toString(),
        date: new Date().toISOString()
      });
      
      localStorage.setItem('projects', JSON.stringify(projects));
      return true;
    }
    
    return false;
  }

  // Add missing method for resource comments
  addResourceComment(resourceId: string, comment: Partial<Comment>) {
    const resources = this.getAllResources();
    const resourceIndex = resources.findIndex(r => r.id === resourceId);
    
    if (resourceIndex !== -1) {
      if (!resources[resourceIndex].comments) {
        resources[resourceIndex].comments = [];
      }
      
      resources[resourceIndex].comments?.push({
        ...(comment as Comment),
        id: Date.now().toString(),
        date: new Date().toISOString()
      });
      
      localStorage.setItem('resources', JSON.stringify(resources));
      return true;
    }
    
    return false;
  }
}

// Export the singleton instance
export const dataService = DataService.getInstance();
