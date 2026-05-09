import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Clock, BookOpen } from 'lucide-react';

const stories = [
  {
    id: 1,
    title: 'The Legend of Kaldi',
    shortDesc: 'Discover how Ethiopian coffee was first discovered by a curious goat herder over a thousand years ago.',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1524350876685-274059332603?w=900&auto=format&fit=crop',
    tag: 'Origin Story',
    tagColor: 'bg-amber-100 text-amber-700',
    fullStory: `Long before the world knew the word "coffee," there was a young goat herder named Kaldi who wandered the ancient highlands of Kaffa, Ethiopia.

One afternoon, Kaldi noticed something extraordinary — his goats, usually calm by dusk, were dancing. Prancing on their hind legs, bleating joyfully, with eyes wide and full of energy. He followed their gaze to a cluster of deep green shrubs bearing bright red berries.

Curious and a little afraid, Kaldi tasted one of the cherries himself. Within minutes, a warm wave of alertness washed over him. His tired muscles felt light. His thoughts sharpened. He felt... awake in a way he'd never felt before.

He rushed to the nearby monastery to tell the monks. The head monk, skeptical of this "devil's fruit," threw the berries into the fire. But as the beans roasted, a divine aroma rose through the mountain air — rich, complex, and captivating. The monks raked the roasted beans from the embers, dissolved them in water, and drank.

That night, for the first time in memory, the monks prayed through the entire night without fatigue.

Word spread. From the monastery, to the villages, to the trade routes of Arabia, to the coffeehouses of Istanbul and Vienna, and finally to every corner of the world — the story of the red berry from Ethiopia had begun its journey.

The coffee you hold in your hands today carries that same ancient story in every sip.`,
  },
  {
    id: 2,
    title: 'The Art of the Coffee Ceremony',
    shortDesc: "Experience Ethiopia's most respected cultural tradition — a ritual of community, respect, and flavor.",
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&auto=format&fit=crop',
    tag: 'Culture',
    tagColor: 'bg-green-100 text-green-700',
    fullStory: `In Ethiopia, coffee is not a beverage. It is a ceremony.

The Buna ceremony — "Buna" being the Amharic word for coffee — is one of the most significant social rituals in Ethiopian culture. It is performed three times a day in many households, and being invited to a ceremony is a profound sign of friendship and respect.

The ceremony begins with the hostess, draped in a traditional white dress with colorful embroidery, setting a charcoal brazier on the floor. Fresh green coffee beans are washed and placed in a flat pan over the fire, where they are slowly hand-roasted. As the beans darken and the first oils emerge, the heavenly aroma fills the room.

The hostess passes the roasting pan to each guest so they may breathe in the smoke — a blessing, a moment of communion with the spirit of the coffee. Frankincense burns nearby, its curling white smoke mingling with the dark roast scent.

The roasted beans are then ground by hand in a wooden mortar called a "mukecha." The grounds are boiled in a traditional black clay pot called a "jebena" — narrow at the neck, round at the belly — filled with water and set over the coals.

When the coffee is ready, it is poured in a single graceful, unbroken stream into small handle-less cups called "cini." The first round is called "Abol" — the strongest. The second, "Tona." The third and final round, "Baraka," means blessing.

To leave before the third cup is to refuse the blessing. No one leaves early.

This is not a coffee break. This is time itself pausing, so people can simply be together.`,
  },
  {
    id: 3,
    title: 'From Ethiopian Farms to Your Cup',
    shortDesc: "Meet the farmers behind every bean and trace the incredible journey from harvest to your morning brew.",
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1581996323777-d29f3b4b9ad3?w=900&auto=format&fit=crop',
    tag: 'Farm to Cup',
    tagColor: 'bg-blue-100 text-blue-700',
    fullStory: `At 6 AM in the highland village of Yirgacheffe, before the rest of the world is awake, Tigist Bekele is already in the coffee trees.

Her family has cultivated this land for four generations. The trees — some over 60 years old — grow under the canopy of shade trees in rich, volcanic red soil at 2,000 meters above sea level. The altitude and the ancient forest ecosystem create a microclimate found almost nowhere else on Earth.

From October through December, the harvest begins. Every single cherry is handpicked — a choice made deliberately. Selective harvesting means only the ripest, reddest cherries are chosen. A single skilled picker harvests around 100 kilograms of cherries per day, which will produce approximately 20 kilograms of green coffee beans.

After harvest, the cherries go through processing. Ethio-Brew works primarily with two methods:

**Washed (Wet Process):** The fruit is immediately removed using water and fermentation tanks. This produces the clean, bright, floral cup Yirgacheffe is world-famous for.

**Natural (Dry Process):** Cherries are spread on raised drying beds and sun-dried for 2–4 weeks, allowing the fruit sugars to penetrate the bean. This creates the winey, berry-forward, complex cups of Harrar.

Once dried and hulled, the beans are sorted by hand and machine, graded by size and density, then packed in 60-kilogram jute bags for export through the Ethiopian Commodity Exchange (ECX).

The beans arrive in our roastery, where small-batch precision roasting unlocks every flavor note the farmer and the land worked so hard to create.

From Tigist's hands on the tree to yours on the cup — it is a chain of human care at every single step.

When you choose Ethio-Brew, you choose to honor that chain.`,
  },
];

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
        {stories.map((story, i) => (
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
