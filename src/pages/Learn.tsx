import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function Learn() {
  const subjects = [
    {
      id: 'physics',
      name: 'Physics',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      accentColor: 'bg-blue-500',
      chapters: 10,
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      accentColor: 'bg-emerald-500',
      chapters: 8,
    },
    {
      id: 'biology',
      name: 'Biology',
      bgColor: 'bg-gradient-to-br from-violet-50 to-violet-100',
      borderColor: 'border-violet-200',
      accentColor: 'bg-violet-500',
      chapters: 12,
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
              className={`flex items-center justify-between w-full p-5 ${subject.bgColor} ${subject.borderColor} rounded-3xl shadow-lg hover:shadow-xl transition-all border group hover:scale-[1.02]`}
            >
              <div className="flex flex-col">
                <span className="text-gray-900 font-bold text-xl mb-1">{subject.name}</span>
                <span className="text-gray-500 text-sm">{subject.chapters} chapters</span>
              </div>
              <div className={`w-10 h-10 ${subject.accentColor} rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
