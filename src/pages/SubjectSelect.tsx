import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Atom, FlaskConical, Leaf, ChevronRight } from 'lucide-react';
import { subjects } from '../data/curriculum';
import type { Grade } from '../types';

const subjectIcons = {
  physics: Atom,
  chemistry: FlaskConical,
  biology: Leaf,
};

export default function SubjectSelect() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-xl font-bold text-gray-900 mb-2">What do you want to learn?</h1>
        <p className="text-gray-500 text-sm sm:text-base">Select a subject and grade to start learning</p>
      </motion.div>

      <div className="space-y-6">
        {subjects.map((subject, index) => {
          const Icon = subjectIcons[subject.id];
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
              style={{ borderColor: subject.color }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${subject.color}20` }}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: subject.color }} />
                </div>
                <div>
                  <h2 className="font-bold text-lg sm:text-xl text-gray-900">{subject.name}</h2>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {subject.grades.plus_one.length + subject.grades.plus_two.length} chapters • {subject.grades.plus_one.reduce((acc, ch) => acc + ch.modules.length, 0) + subject.grades.plus_two.reduce((acc, ch) => acc + ch.modules.length, 0)} modules
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <GradeCard 
                  subjectId={subject.id}
                  grade="plus_one"
                  label="Plus One"
                  subtitle="11th Grade"
                  color={subject.color}
                  chapterCount={subject.grades.plus_one.length}
                />
                <GradeCard 
                  subjectId={subject.id}
                  grade="plus_two"
                  label="Plus Two"
                  subtitle="12th Grade"
                  color={subject.color}
                  chapterCount={subject.grades.plus_two.length}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function GradeCard({ subjectId, grade, label, subtitle, color, chapterCount }: { 
  subjectId: string; 
  grade: Grade; 
  label: string; 
  subtitle: string; 
  color: string; 
  chapterCount: number;
}) {
  return (
    <Link 
      to={`/learn/${subjectId}/${grade}`}
      className="group block p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-current transition-all duration-200"
      style={{ color }}
    >
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <span className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-current">{label}</span>
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-current" />
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">{subtitle}</p>
      <div className="flex items-center gap-2 text-xs sm:text-sm">
        <span className="px-2 py-1 bg-gray-100 rounded-lg text-gray-600 font-medium">
          {chapterCount} chapters
        </span>
      </div>
    </Link>
  );
}
