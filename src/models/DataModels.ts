
// Project Model
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  attachmentUrl?: string; // Optional attachment URL
  category: string;
  techStack: string[];
  demoLink?: string; // Make demo link optional
  repoLink?: string; // Make repo link optional
}

// Resource Model
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  link: string;
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
  name: string;
  email: string;
  visitDate: string;
}
