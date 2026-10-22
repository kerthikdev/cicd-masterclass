import { useState, useEffect } from 'react';

export interface ProgressState {
  completedLessons: number[];
  quizScores: Record<string, { selected: number; isCorrect: boolean }>;
  bookmarks: number[];
  userName: string;
}

const STORAGE_KEY = 'cicd_masterclass_progress_v1';

const defaultState: ProgressState = {
  completedLessons: [],
  quizScores: {},
  bookmarks: [],
  userName: 'DevOps Explorer',
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e);
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  const toggleComplete = (lessonId: number) => {
    setProgress((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      const updated = exists
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return { ...prev, completedLessons: updated };
    });
  };

  const markComplete = (lessonId: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return { ...prev, completedLessons: [...prev.completedLessons, lessonId] };
    });
  };

  const recordQuizAnswer = (questionId: string, selected: number, isCorrect: boolean) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [questionId]: { selected, isCorrect },
      },
    }));
  };

  const toggleBookmark = (lessonId: number) => {
    setProgress((prev) => {
      const exists = prev.bookmarks.includes(lessonId);
      const updated = exists
        ? prev.bookmarks.filter((id) => id !== lessonId)
        : [...prev.bookmarks, lessonId];
      return { ...prev, bookmarks: updated };
    });
  };

  const setUserName = (name: string) => {
    setProgress((prev) => ({ ...prev, userName: name }));
  };

  const resetProgress = () => {
    setProgress(defaultState);
  };

  const percentComplete = Math.round((progress.completedLessons.length / 20) * 100);

  return {
    progress,
    toggleComplete,
    markComplete,
    recordQuizAnswer,
    toggleBookmark,
    setUserName,
    resetProgress,
    percentComplete,
  };
}
