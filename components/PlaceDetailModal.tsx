import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, ExternalLink, Navigation } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PlaceDetailModalProps {
  place: {
    name: string;
    description: string;
    image: string;
    location: string;
    tags: string[];
  } | null;
  onClose: () => void;
}

export function PlaceDetailModal({ place, onClose }: PlaceDetailModalProps) {
  if (!place) return null;

  // Open Google Maps with location
  const handleOpenMap = () => {
    const query = encodeURIComponent(place.location);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  // Open Google Search with place name
  const handleLearnMore = () => {
    const query = encodeURIComponent(place.name);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <AnimatePresence>
      {place && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 max-w-[390px] mx-auto"
          >
            <div className="bg-white rounded-t-[2rem] overflow-hidden max-h-[90vh] flex flex-col shadow-2xl border-t border-gray-100">
              {/* Handle Bar */}
              <div className="w-full flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 film-grain opacity-15"></div>

                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl z-10"
                  >
                    <X className="w-5 h-5 text-gray-800" />
                  </motion.button>

                  {/* Location Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20">
                      <Navigation className="w-4 h-4 text-white" />
                      <span className="text-white text-sm font-light">{place.location}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-[#0F1419] text-2xl mb-3 tracking-tight">{place.name}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6 font-light">{place.description}</p>

                  {/* Tags */}
                  {place.tags && place.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {place.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#F9F6F0] via-[#F5F1E8] to-[#F0EBE0] text-[#0F1419] text-sm rounded-full font-light border border-[#C9A961]/10"
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleOpenMap}
                      className="flex items-center justify-center gap-2 py-4 px-4 bg-gradient-to-r from-[#F9F6F0] to-[#F0EBE0] text-[#0F1419] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-[#C9A961]/10"
                    >
                      <MapPin className="w-5 h-5 text-[#C9A961]" />
                      <span className="font-medium">지도 보기</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLearnMore}
                      className="flex items-center justify-center gap-2 py-4 px-4 bg-gradient-to-r from-[#0F1419] via-[#1a2028] to-[#0F1419] text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span className="font-medium">더 알아보기</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}