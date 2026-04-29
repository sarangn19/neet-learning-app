import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const baseStyles = 'bg-gray-200';
  
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  };

  const animationStyles = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    none: '',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${animationStyles[animation]} ${className}`}
      style={style}
    />
  );
}

// Card Skeleton
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 ${className}`}>
      <Skeleton variant="rounded" height={120} className="mb-3" />
      <Skeleton width="80%" height={20} className="mb-2" />
      <Skeleton width="60%" height={16} />
    </div>
  );
}

// Subject Card Skeleton
export function SubjectCardSkeleton() {
  return (
    <div className="w-full aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-4 animate-pulse">
      <Skeleton width="60%" height={24} variant="rounded" className="bg-white/50" />
    </div>
  );
}

// Lesson/List Item Skeleton
export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1">
        <Skeleton width="70%" height={18} className="mb-2" />
        <Skeleton width="40%" height={14} />
      </div>
      <Skeleton variant="circular" width={32} height={32} />
    </div>
  );
}

// Chapter Card Skeleton
export function ChapterCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
    >
      <Skeleton variant="rectangular" height={160} />
      <div className="p-4">
        <Skeleton width="80%" height={22} className="mb-2" />
        <Skeleton width="60%" height={16} className="mb-3" />
        <div className="flex gap-2">
          <Skeleton width={80} height={28} variant="rounded" />
          <Skeleton width={80} height={28} variant="rounded" />
        </div>
      </div>
    </motion.div>
  );
}

// Timeline/Module Skeleton
export function TimelineSkeleton() {
  return (
    <div className="relative py-4">
      {/* Center line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gray-200 rounded-full" />
      
      {[...Array(5)].map((_, i) => (
        <div key={i} className="relative flex items-center justify-center py-4">
          <div className={`flex items-center w-full max-w-md ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="flex-1 px-4">
              <Skeleton width="80%" height={18} className="mb-1" />
              <Skeleton width="40%" height={12} />
            </div>
            <Skeleton variant="circular" width={56} height={56} className="flex-shrink-0 z-10" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Stats Card Skeleton
export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton width={100} height={16} className="mb-2" />
          <Skeleton width={80} height={32} className="mb-1" />
          <Skeleton width={120} height={14} />
        </div>
        <Skeleton variant="rounded" width={48} height={48} />
      </div>
    </div>
  );
}

// Profile Skeleton
export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <Skeleton variant="circular" width={80} height={80} />
          <div className="flex-1">
            <Skeleton width={150} height={24} className="mb-2" />
            <Skeleton width={200} height={16} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <Skeleton width={150} height={20} className="mb-4" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <ListItemSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Page Loading Skeleton
export function PageSkeleton({ type = 'default' }: { type?: 'default' | 'home' | 'chapter' | 'module' | 'profile' | 'admin' }) {
  const skeletons = {
    default: (
      <div className="space-y-4 p-4">
        <Skeleton height={200} variant="rounded" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    ),
    home: (
      <div className="space-y-6 p-4">
        {/* Hero */}
        <Skeleton height={180} variant="rounded" />
        
        {/* Subject Cards */}
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <SubjectCardSkeleton key={i} />
          ))}
        </div>

        {/* Recent Activity */}
        <div>
          <Skeleton width={150} height={24} className="mb-4" />
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <ListItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    ),
    chapter: (
      <div className="space-y-4 p-4">
        <Skeleton height={120} variant="rounded" />
        <div className="grid gap-4">
          {[...Array(4)].map((_, i) => (
            <ChapterCardSkeleton key={i} />
          ))}
        </div>
      </div>
    ),
    module: (
      <div className="p-4">
        <Skeleton width={200} height={28} className="mb-2 mx-auto" />
        <Skeleton width={150} height={16} className="mb-6 mx-auto" />
        <TimelineSkeleton />
      </div>
    ),
    profile: <ProfileSkeleton />,
    admin: (
      <div className="space-y-6 p-4">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <StatsCardSkeleton key={i} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Skeleton height={300} variant="rounded" className="lg:col-span-2" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <ListItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="animate-pulse"
    >
      {skeletons[type]}
    </motion.div>
  );
}

export default Skeleton;
