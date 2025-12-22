
export type Language = 'ko' | 'en' | 'zh' | 'ja';

export interface UserInfo {
  userId: string;
  nickname: string;
  country: string;
  phone: string;
  email: string;
  address: string;
  role: 'user' | 'admin';
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: number;
  views: number;
  isAiGenerated?: boolean;
}

export interface Question {
  id: string;
  userId: string;
  author: string;
  title: string;
  content: string;
  answer?: string;
  isPrivate: boolean;
  createdAt: number;
}

export interface ResearchData {
  category: string;
  control: number;
  phellinus: number;
}


export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface SearchResult {
  text: string;
  sources: GroundingChunk[];
}

export interface BenefitDetail {
  title: string;
  summary: string;
  content: string;
  mechanism: string[];
  scientificTerm: string;
  evidence: string;
  link: string;
}

export interface Translation {
  nav: Record<string, string>;
  hero: {
    badge: string;
    title_top: string;
    title_highlight: string;
    desc: string;
    btn_research: string;
  };
  common: Record<string, string>;
  about: {
    title: string;
    subtitle: string;
    tabs: {
      intro: string;
      compounds: string;
      mechanism: string;
      evidence: string;
    };
    cards: Array<{ title: string; desc: string }>;
    evidenceLinks: Array<{ name: string; url: string }>;
    evidenceNote: string;
  };
  research: {
    title: string;
    subtitle: string;
    tabs: Record<string, string>;
    papers: Record<string, { title: string; journal: string; impact: string; url: string; summary: string }>;
  };
  benefits: {
    title: string;
    desc: string;
    items: string[];
    details: BenefitDetail[];
  };
  usage: {
    title: string;
    desc: string;
    steps: Array<{ step: string; text: string; image: string }>;
    sub1: string;
    sub2: string;
    safetyStudies: Array<{
      title: string;
      subtitle: string;
      journal: string;
      result: string;
      link: string;
    }>;
  };
  health: {
    title: string;
    desc: string;
  };
  search: {
    title: string;
    placeholder: string;
    btn: string;
    sources: string;
    searching: string;
  };
  faq: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  footer: {
    copy: string;
    contact: {
      label: string;
      telegram: string;
      secret: string;
    };
  };
}
