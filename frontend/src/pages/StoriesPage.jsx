import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Clock, BookOpen } from 'lucide-react';
import { STORIES } from '../data/stories';

const StoriesPage = () => {
  const [activeStory, setActiveStory] = useState(null);

  return (
    <div className="min-h-screen bg-[#FDFCF8] py-20 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 max-w-2xl mx-auto"
      >
        <span className="inline-block bg-[#4B2C20]/10 text-[#4B2C20] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
          Ethiopian Coffee Heritage
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#4B2C20] mb-4 leading-tight">
          Coffee Stories
        </h1>
        <p className="text-gray-500 text-lg">
          Every cup has a history. Explore the legends, rituals, and journeys that gave Ethiopian coffee its soul.
        </p>
      </motion.div>

      {/* Story Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {STORIES.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group flex flex-col"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${story.tagColor}`}>
                {story.tag}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-gray-400 text-xs font-medium mb-3">
                <Clock size={13} /> {story.readTime}
              </div>
              <h3 className="text-xl font-extrabold text-[#4B2C20] mb-3 leading-tight">{story.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-grow">{story.shortDesc}</p>
              <button
                onClick={() => setActiveStory(story)}
                className="mt-6 flex items-center gap-2 bg-[#006341] text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#004d32] transition-colors self-start"
              >
                <BookOpen size={15} /> Read Story <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Story Modal */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Modal Header Image */}
              <div className="relative h-56 flex-shrink-0">
                <img src={activeStory.image} alt={activeStory.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button
                  onClick={() => setActiveStory(null)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/40 transition"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-6 left-6">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${activeStory.tagColor}`}>
                    {activeStory.tag}
                  </span>
                  <h2 className="text-2xl font-extrabold text-white mt-2">{activeStory.title}</h2>
                  <div className="flex items-center gap-2 text-white/70 text-xs mt-1">
                    <Clock size={12} /> {activeStory.readTime}
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto">
                {activeStory.fullStory.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-4 text-base"
                    dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoriesPage;
