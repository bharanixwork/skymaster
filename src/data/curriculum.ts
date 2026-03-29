import { module1Chapters } from './modules/module1';
import { module2Chapters } from './modules/module2';
import { module3Chapters } from './modules/module3';
import { module4Chapters } from './modules/module4';
import { module5Chapters } from './modules/module5';
import { module6Chapters } from './modules/module6';
import { module7Chapters } from './modules/module7';
import { module8Chapters } from './modules/module8';
import { Chapter, SubChapter, QuizQuestion } from '../types';

export const curriculum: Chapter[] = [
  ...module1Chapters,
  ...module2Chapters,
  ...module3Chapters,
  ...module4Chapters,
  ...module5Chapters,
  ...module6Chapters,
  ...module7Chapters,
  ...module8Chapters
];

// Re-export specific interfaces that components might be directly importing from curriculum
export type { SubChapter, QuizQuestion };
