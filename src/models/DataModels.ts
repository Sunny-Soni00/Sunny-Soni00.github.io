
// Project Model
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  attachments?: Attachment[]; 
  category: string;
  techStack: string[];
  demoLink?: string;
  repoLink?: string;
  comments?: Comment[];
  likes?: number;
}

// Comment Model (enhanced)
export interface Comment {
  id: string;
  text: string;
  userName: string;
  userId?: string;
  timestamp: string;
  resourceId?: string;
  projectId?: string;
  likes: number;
  likedBy?: string[]; // Track users who liked this comment
  replies?: Reply[]; // Add support for replies
  attachments?: Attachment[]; // Add support for attachments in comments
}

// Reply Model (new)
export interface Reply {
  id: string;
  text: string;
  userName: string;
  userId?: string;
  timestamp: string;
  likes: number;
  likedBy?: string[]; // Track users who liked this reply
}

// Attachment Model
export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string; // 'image', 'document', 'other'
  fileType?: string; // Store file extension (.jpg, .png, etc)
}

// Resource Model
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  link: string;
  attachments?: Attachment[];
  comments?: Comment[];
  likes?: number;
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
  attachments?: Attachment[];
  userId?: string;
  likes?: number;
  likedBy?: string[]; // Track users who liked this review
}

// About Page Content Model
export interface AboutContent {
  bio: string;
  profileImage?: string;
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
  profilePictureType?: string; // Store only file type
  bio?: string;
  phone?: string;
  occupation?: string;
  interests?: string[];
  activity?: UserActivity[];
}

// User Activity (enhanced)
export interface UserActivity {
  id: string;
  type: 'login' | 'comment' | 'like' | 'review' | 'view' | 'reply';
  details: string;
  timestamp: string;
  relatedItemId?: string;
}

// Database Log Entry
export interface DatabaseLogEntry {
  id: string;
  timestamp: string;
  action: 'create' | 'update' | 'delete';
  entity: 'project' | 'resource' | 'review' | 'user' | 'about' | 'comment' | 'reply';
  entityId: string;
  details: string;
}
