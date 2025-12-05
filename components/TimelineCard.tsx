import { motion } from 'motion/react';
import { Clock, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TimelineCardProps {
  dayNumber: number;
  time: string;
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  location?: string;
  onClick?: () => void;
  index: number;
  isExpanded?: boolean;
}

export function TimelineCard({ dayNumber, time, title, description, image, tags, location, onClick, index, isExpanded }: TimelineCardProps) {
  const hasInteraction = onClick && image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        delay: index * 0.03, 
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className="relative flex gap-5"
    >
      {/* Timeline Dot & Line - Dark Premium */}
      <div className="flex flex-col items-center flex-shrink-0 pt-2">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.03, type: 'spring', stiffness: 200 }}
          className="relative w-10 h-10 flex items-center justify-center flex-shrink-0"
        >
          <div className="absolute inset-0 gold-metallic rounded-full blur-md opacity-60"></div>
          <div className="relative w-3.5 h-3.5 rounded-full gold-metallic shadow-lg ring-4 ring-[#0F1419]/20 overflow-hidden">
            <div className="gold-shine absolute inset-0"></div>
          </div>
        </motion.div>
        <div className="w-px flex-1 bg-gradient-to-b from-[#C9A961]/40 via-[#C9A961]/20 to-transparent mt-3"></div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-4">
        {/* Day and Time Badges */}
        <div className="flex items-center gap-2 mb-4">
          {/* Day Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 + 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-sm border border-white/20"
          >
            <span className="text-white text-sm font-light">{dayNumber}일차</span>
          </motion.div>

          {/* Time Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.03 + 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full shadow-sm border border-white/20"
          >
            <Clock className="w-3.5 h-3.5 text-[#C9A961]" />
            <span className="text-white text-sm tabular-nums font-light">{time}</span>
          </motion.div>
        </div>

        {/* Card - Dark Premium Design */}
        <motion.div 
          whileHover={hasInteraction ? { 
            y: -4, 
            scale: 1.01,
            transition: { duration: 0.3, ease: 'easeOut' }
          } : undefined}
          className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-white/10 transition-all duration-500 ${
            hasInteraction ? 'cursor-pointer hover:shadow-2xl hover:border-[#C9A961]/50' : ''
          }`}
          onClick={onClick}
        >
          {/* Gradient Overlay for Hover */}
          {hasInteraction && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#C9A961]/0 to-[#D4B976]/0 opacity-0 hover:opacity-10 transition-opacity duration-500 pointer-events-none"
            />
          )}

          {image && (
            <div className="relative h-28 overflow-hidden">
              <motion.div
                whileHover={hasInteraction ? { scale: 1.08 } : undefined}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full"
              >
                <ImageWithFallback
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Sophisticated Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 film-grain opacity-15"></div>
              
              {/* Location Badge on Image */}
              {location && (
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
                    <MapPin className="w-2.5 h-2.5 text-white" />
                    <span className="text-white text-xs font-light">{location}</span>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className={image ? 'p-4' : 'p-4'}>
            <h3 className="text-white mb-1.5 tracking-tight">{title}</h3>
            {description && (
              <p className="text-white/60 text-sm leading-relaxed font-light">{description}</p>
            )}
            
            {/* Tags only show when expanded (in modal) */}
            {isExpanded && tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="inline-flex items-center px-2.5 py-1 bg-white/10 backdrop-blur-md text-white/80 text-xs rounded-full font-light border border-white/20"
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
            )}

            {/* No Location Badge - only show on image */}
            {!image && location && (
              <div className="flex items-center gap-2 mt-3 text-white/40">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs font-light">{location}</span>
              </div>
            )}
          </div>

          {/* Hover Indicator */}
          {hasInteraction && (
            <motion.div 
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-white/20"
            >
              <svg className="w-4 h-4 text-[#C9A961]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}