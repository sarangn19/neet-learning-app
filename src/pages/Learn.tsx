import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Learn() {
  const subjects = [
    {
      id: 'maths',
      name: 'Maths',
      grade: 'plus_one',
      gradient: 'from-pink-400 via-pink-500 to-purple-600',
      icon: '📐',
    },
    {
      id: 'physics',
      name: 'Physics',
      grade: 'plus_one',
      gradient: 'from-orange-400 via-orange-500 to-amber-500',
      icon: '⚡',
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      grade: 'plus_one',
      gradient: 'from-yellow-400 via-amber-500 to-orange-500',
      icon: '🧪',
    },
    {
      id: 'biology',
      name: 'Biology',
      grade: 'plus_one',
      gradient: 'from-orange-400 via-red-400 to-red-500',
      icon: '🧬',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white px-4 py-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-brand-blue" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Learn</h1>
            <p className="text-gray-500 text-sm">Choose a subject to start learning</p>
          </div>
        </div>
      </motion.div>

      {/* Subject Cards - 2x2 Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 gap-4 px-4 py-6"
      >
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <Link
              to={`/chapter/${subject.id}/${subject.grade}`}
              className={`flex w-full aspect-[4/3] bg-gradient-to-br ${subject.gradient} rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all items-start justify-start relative overflow-hidden`}
            >
              <span className="text-3xl absolute top-3 right-3 opacity-30">{subject.icon}</span>
              <span className="text-white font-bold text-lg z-10">{subject.name}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Study Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="px-4"
      >
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-3">Study Tips</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-brand-blue">•</span>
              Complete lessons in order for better understanding
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-blue">•</span>
              Practice MCQs after each chapter
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-blue">•</span>
              Maintain your daily streak for rewards
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
