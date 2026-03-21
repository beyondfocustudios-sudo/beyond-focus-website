export interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  date: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
}
