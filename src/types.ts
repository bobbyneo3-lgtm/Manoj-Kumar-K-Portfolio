export interface DesignShowcase {
  thumbnail?: string;
  design: string;
  mockup: string;
  finalProduct: string;
}

export interface VideoItem {
  url: string;
  caption: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  description: string;
  problem: string;
  approach: string;
  visuals: string[];
  visualsDescription?: string;
  designShowcase?: DesignShowcase[];
  videoGallery?: VideoItem[];
  result: string;
  figmaUrl?: string;
  videoUrl?: string;
  heroImage?: string;
  mobileHeroImage?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}
