import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Atom, FlaskConical, Dna } from 'lucide-react';

export default function Learn() {
  const subjects = [
    {
      id: 'physics',
      name: 'Physics',
      chapters: 10,
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      icon: <Atom className="w-24 h-24 text-white/20" />,
      iconColor: 'text-white/30',
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      chapters: 8,
      gradient: 'from-emerald-500 via-emerald-600 to-teal-600',
      icon: <FlaskConical className="w-24 h-24 text-white/20" />,
      iconColor: 'text-white/30',
    },
    {
      id: 'biology',
      name: 'Biology',
      chapters: 12,
      gradient: 'from-violet-500 via-violet-600 to-purple-600',
      icon: <Dna className="w-24 h-24 text-white/20" />,
      iconColor: 'text-white/30',
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
              className={`relative flex items-center w-full h-28 overflow-hidden rounded-2xl bg-gradient-to-r ${subject.gradient} shadow-lg hover:shadow-xl transition-all group hover:scale-[1.02]`}
            >
              {/* Content */}
              <div className="relative z-10 flex flex-col px-6 py-4">
                <span className="text-white font-bold text-2xl">{subject.name}</span>
                <span className="text-white/70 text-sm mt-1">{subject.chapters} chapters</span>
                <div className="mt-2 w-8 h-1 bg-white/40 rounded-full" />
              </div>
              
              {/* Icon silhouette on right */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-300">
                {subject.icon}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
