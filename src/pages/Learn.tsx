import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Learn() {
  const subjects = [
    {
      id: 'physics',
      name: 'Physics',
      icon: '/images/physics-icon.png',
      color: 'bg-white',
      chapters: 10,
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: '/images/chemistry-icon.png',
      color: 'bg-white',
      chapters: 8,
    },
    {
      id: 'biology',
      name: 'Biology',
      icon: '/images/biology-icon.png',
      color: 'bg-white',
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
              to={`/chapter/${subject.id}/plus_one`}
              className={`flex w-full aspect-[4/3] ${subject.color} rounded-2xl pt-4 pr-4 shadow-lg hover:shadow-xl transition-all relative overflow-hidden border border-gray-100`}
            >
              <span className="absolute top-4 right-4 text-gray-900 font-bold text-lg z-10">{subject.name}</span>
              <img src={subject.icon} alt={subject.name} className="w-12 h-12 absolute bottom-0 left-0 object-contain" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
