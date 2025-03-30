
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

// Comment Model (new)
export interface Comment {
  id: string;
  text: string;
  userName: string;
  userId?: string;
  timestamp: string;
  resourceId?: string;
  projectId?: string;
  likes: number;
}

// Attachment Model
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
  bio?: string;
  phone?: string;
  occupation?: string;
  interests?: string[];
  activity?: UserActivity[];
}

// User Activity (new)
export interface UserActivity {
  id: string;
  type: 'login' | 'comment' | 'like' | 'review' | 'view';
  details: string;
  timestamp: string;
  relatedItemId?: string;
}
