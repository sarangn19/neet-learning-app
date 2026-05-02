import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Learn() {
  const subjects = [
    {
      id: 'physics',
      name: 'Physics',
      icon: '/images/physics-icon.png',
      bgColor: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/30',
      chapters: 10,
      isNew: true,
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: '/images/chemistry-icon.png',
      bgColor: 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/20',
      borderColor: 'border-emerald-500/30',
      chapters: 8,
      isNew: false,
    },
    {
      id: 'biology',
      name: 'Biology',
      icon: '/images/biology-icon.png',
      bgColor: 'bg-gradient-to-br from-violet-500/20 to-violet-600/20',
      borderColor: 'border-violet-500/30',
      chapters: 12,
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-4 py-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center border border-amber-500/30">
            <BookOpen className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Learn</h1>
            <p className="text-gray-400 text-sm">Choose a subject to start learning</p>
          </div>
        </div>
      </motion.div>

      {/* Subject Cards - Single Column with NEW badges */}
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
            className="relative"
          >
            {/* NEW Badge */}
            {subject.isNew && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                NEW
              </div>
            )}
            <Link
              to={`/chapter/${subject.id}/plus_one`}
              className={`flex flex-col items-center justify-center w-full h-36 ${subject.bgColor} ${subject.borderColor} rounded-3xl shadow-lg hover:shadow-xl transition-all border group hover:scale-[1.02]`}
            >
              <img src={subject.icon} alt={subject.name} className="w-16 h-16 object-contain mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-white font-semibold text-lg">{subject.name}</span>
              <span className="text-gray-400 text-sm mt-1">{subject.chapters} chapters</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
