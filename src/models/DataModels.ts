
// Project Model
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  attachments?: Attachment[]; // Replace single attachmentUrl with multiple attachments
  category: string;
  techStack: string[];
  demoLink?: string; // Make demo link optional
  repoLink?: string; // Make repo link optional
  comments?: Comment[]; // Add comments to projects
}

// Attachment Model (new)
export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string; // 'image', 'document', 'other'
}

// Resource Model
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  link: string;
  attachments?: Attachment[]; // Add attachments to resources
  comments?: Comment[]; // Add comments to resources
}

// Comment Model (new)
export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  message: string;
  date: string;
}

// Review/Feedback Model
export interface Review {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  date: string;
  image?: string;
  attachments?: Attachment[]; // Add attachments to reviews
  userId?: string; // To track which user submitted this review
}

// About Page Content Model
export interface AboutContent {
  bio: string;
  profileImage?: string; // Add profile image support
  socialLinks: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  };
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  skills: {
    name: string;
    level: number;
  }[];
}

// Admin Credentials
export interface AdminCredentials {
  userId: string;
  password: string;
}

// User Details
export interface UserDetails {
  id: string;
  name: string;
  email: string;
  visitDate: string;
  age?: number;
  gender?: string;
  profilePicture?: string;
  bio?: string;
  phone?: string;
  occupation?: string;
  interests?: string[];
}

// Database Change Log
export interface DatabaseChange {
  id: string;
  action: 'add' | 'update' | 'delete';
  entityType: 'project' | 'resource' | 'review' | 'user';
  entityId: string;
  timestamp: string;
  userId?: string;
  details?: string;
}
