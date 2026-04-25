import { subjects } from './curriculum';

// Cache for the generated question bank
let questionBankCache: PracticeQuestion[] | null = null;

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  chapterId: string;
  chapterName: string;
  subjectId: string;
  subjectName: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

// Extract all quiz-type questions from curriculum
export function generateQuestionBank(): PracticeQuestion[] {
  // Return cached version if available
  if (questionBankCache) {
    return questionBankCache;
  }

  const questions: PracticeQuestion[] = [];

  for (const subject of subjects) {
    for (const grade of ['plus_one', 'plus_two'] as const) {
      for (const chapter of subject.grades[grade]) {
        for (const module of chapter.modules) {
          for (const level of module.levels) {
            for (const activity of level.activities) {
              // Convert quiz activities to practice questions
              if (activity.type === 'quiz') {
                const data = activity.data as { options: string[]; correctAnswer: number; explanation: string };
                questions.push({
                  id: activity.id,
                  question: activity.question,
                  options: data.options,
                  correctAnswer: data.correctAnswer,
                  explanation: data.explanation,
                  chapterId: chapter.id,
                  chapterName: chapter.name,
                  subjectId: subject.id,
                  subjectName: subject.name,
                  difficulty: 'medium',
                });
              }
              // Convert true/false to MCQ format
              else if (activity.type === 'true_false') {
                const data = activity.data as { statement: string; isTrue: boolean; explanation: string };
                questions.push({
                  id: activity.id,
                  question: data.statement,
                  options: ['True', 'False'],
                  correctAnswer: data.isTrue ? 0 : 1,
                  explanation: data.explanation,
                  chapterId: chapter.id,
                  chapterName: chapter.name,
                  subjectId: subject.id,
                  subjectName: subject.name,
                  difficulty: 'easy',
                });
              }
            }
          }
        }
      }
    }
  }

  // Cache and return
  questionBankCache = questions;
  return questions;
}

// Get unique chapters with question counts
export function getChaptersWithQuestionCount() {
  const questionBank = generateQuestionBank();
  const chapterMap = new Map<string, {
    id: string;
    name: string;
    subjectId: string;
    subjectName: string;
    subjectColor: string;
    questionCount: number;
  }>();

  for (const q of questionBank) {
    const key = q.chapterId;
    if (chapterMap.has(key)) {
      chapterMap.get(key)!.questionCount++;
    } else {
      const subject = subjects.find(s => s.id === q.subjectId);
      chapterMap.set(key, {
        id: q.chapterId,
        name: q.chapterName,
        subjectId: q.subjectId,
        subjectName: q.subjectName,
        subjectColor: subject?.color || '#58cc02',
        questionCount: 1,
      });
    }
  }

  return Array.from(chapterMap.values()).sort((a, b) => {
    // Sort by subject first, then by name
    if (a.subjectId !== b.subjectId) {
      return a.subjectId.localeCompare(b.subjectId);
    }
    return a.name.localeCompare(b.name);
  });
}

// Get questions for selected chapters
export function getQuestionsForChapters(chapterIds: string[]): PracticeQuestion[] {
  const questionBank = generateQuestionBank();
  return questionBank.filter(q => chapterIds.includes(q.chapterId));
}

// Shuffle array
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
