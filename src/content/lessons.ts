export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonSection {
  type: 'objectives' | 'explanation' | 'analogy' | 'analogy-table' | 'visual' | 'deep-dive' | 'code' | 'code-explanation' | 'mistakes' | 'exercise' | 'quiz' | 'summary' | 'next-preview' | 'comparison-table' | 'info-box' | 'warning-box' | 'tip-box';
  title?: string;
  content?: string;
  items?: string[];
  code?: string;
  language?: string;
  headers?: string[];
  rows?: string[][];
  quizQuestions?: QuizQuestion[];
  icon?: string;
}

export interface Lesson {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  module: number;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  sections: LessonSection[];
}

export interface Module {
  id: number;
  title: string;
  description: string;
  lessonIds: number[];
  icon: string;
}

export const modules: Module[] = [
  { id: 1, title: 'Understanding CI/CD', description: 'Learn the fundamentals of CI/CD from scratch', lessonIds: [1, 2, 3, 4], icon: '🎓' },
  { id: 2, title: 'CI/CD Tools and Building Blocks', description: 'Git, pipelines, builds, testing, Docker and more', lessonIds: [5, 6, 7, 8, 9, 10], icon: '🔧' },
  { id: 3, title: 'Building an Automated Delivery System', description: 'Triggers, secrets, environments, deployment and AWS', lessonIds: [11, 12, 13, 14, 15], icon: '🚀' },
  { id: 4, title: 'Production-Ready CI/CD', description: 'Security, monitoring, troubleshooting and real project', lessonIds: [16, 17, 18, 19, 20], icon: '🏭' }
];

import { lesson1 } from './lesson1';
import { lesson2 } from './lesson2';
import { lesson3 } from './lesson3';
import { lesson4 } from './lesson4';
import { lesson5 } from './lesson5';
import { lesson6 } from './lesson6';
import { lesson7 } from './lesson7';
import { lesson8 } from './lesson8';
import { lesson9 } from './lesson9';
import { lesson10 } from './lesson10';
import { lesson11 } from './lesson11';
import { lesson12 } from './lesson12';
import { lesson13 } from './lesson13';
import { lesson14 } from './lesson14';
import { lesson15 } from './lesson15';
import { lesson16 } from './lesson16';
import { lesson17 } from './lesson17';
import { lesson18 } from './lesson18';
import { lesson19 } from './lesson19';
import { lesson20 } from './lesson20';

export const lessons: Lesson[] = [
  lesson1, lesson2, lesson3, lesson4, lesson5,
  lesson6, lesson7, lesson8, lesson9, lesson10,
  lesson11, lesson12, lesson13, lesson14, lesson15,
  lesson16, lesson17, lesson18, lesson19, lesson20
];
