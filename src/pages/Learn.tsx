import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Learn() {
  const subjects = [
    {
      id: 'physics',
      name: 'Physics',
      icon: '/images/physics-icon.png',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      chapters: 10,
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: '/images/chemistry-icon.png',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      chapters: 8,
    },
    {
      id: 'biology',
      name: 'Biology',
      icon: '/images/biology-icon.png',
      bgColor: 'bg-gradient-to-br from-violet-50 to-violet-100',
      borderColor: 'border-violet-200',
      chapters: 12,
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

      {/* Subject Cards - Single Column */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-4 px-4 py-6"
      >
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <Link
              to={`/chapter/${subject.id}/plus_one`}
              className={`flex flex-col items-center justify-center w-full h-32 ${subject.bgColor} ${subject.borderColor} rounded-2xl shadow-sm hover:shadow-md transition-all border`}
            >
              <img src={subject.icon} alt={subject.name} className="w-14 h-14 object-contain mb-2" />
              <span className="text-gray-900 font-semibold text-base">{subject.name}</span>
              <span className="text-gray-500 text-xs mt-1">{subject.chapters} chapters</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
