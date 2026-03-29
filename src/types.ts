export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  reviewSubChapterId?: string;
}

export interface ProjectStep {
  title: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  materials: string[];
  steps: ProjectStep[];
  principles: string;
}

export interface SubChapter {
  id: string;
  title: string;
  content: string;
  realLifeExample?: string;
  quiz?: QuizQuestion[];
  project?: Project;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  subChapters: SubChapter[];
  finalExam?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  week: string;
  description: string;
  icon: string;
  chapters: Chapter[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
}
