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
      isNew: true,
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: '/images/chemistry-icon.png',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      chapters: 8,
      isNew: false,
    },
    {
      id: 'biology',
      name: 'Biology',
      icon: '/images/biology-icon.png',
      bgColor: 'bg-gradient-to-br from-violet-50 to-violet-100',
      borderColor: 'border-violet-200',
      chapters: 12,
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center border border-amber-200">
            <BookOpen className="w-6 h-6 text-amber-600" />
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
              className={`flex flex-col items-center justify-center w-full h-36 ${subject.bgColor} ${subject.borderColor} rounded-3xl shadow-lg hover:shadow-xl transition-all border group hover:scale-[1.02]`}
            >
              <img src={subject.icon} alt={subject.name} className="w-16 h-16 object-contain mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-gray-900 font-semibold text-lg">{subject.name}</span>
              <span className="text-gray-500 text-sm mt-1">{subject.chapters} chapters</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
