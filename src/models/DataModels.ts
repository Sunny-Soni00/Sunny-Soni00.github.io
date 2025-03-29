
// Project Model
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  techStack: string[];
  demoLink: string;
  repoLink: string;
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
