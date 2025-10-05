export interface Project {
  id?: number;
  title: string;       
  thumbnail: string;   
  description: string;
  features: string[];
  liveLink: string;    
  githubLink: string;  
  techStack: string[]; 
  category: string;     
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;   
  tags: string[];        
  isFeatured?: boolean;
  view?: number;
  author?: {
    id: number;
    name: string;
  };
}
