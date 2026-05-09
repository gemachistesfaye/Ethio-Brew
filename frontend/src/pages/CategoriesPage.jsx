import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  {
    id: 1,
    emoji: '☕',
    title: 'Single Origin',
    description: 'Premium beans sourced from one pristine Ethiopian region — pure, traceable, and extraordinary.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop',
    color: 'from-green-900/80 to-green-700/40',
  },
  {
    id: 2,
    emoji: '🌍',
    title: 'Regional Coffees',
    description: 'Explore the distinct terroir of Sidamo, Harrar, Jimma, and Guji — each sip tells a story of its land.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop',
    color: 'from-amber-900/80 to-amber-700/40',
  },
  {
    id: 3,
    emoji: '🔥',
    title: 'Dark Roast',
    description: 'Bold, rich, and intense. For those who demand a full-bodied coffee with deep, smoky character.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop',
    color: 'from-stone-900/80 to-stone-700/40',
  },
  {
    id: 4,
    emoji: '🌿',
    title: 'Organic Coffee',
    description: 'Grown naturally in the highlands without chemicals. Authentic Ethiopian taste you can feel good about.',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&auto=format&fit=crop',
    color: 'from-lime-900/80 to-lime-700/40',
  },
  {
    id: 5,
    emoji: '🎁',
    title: 'Gift Boxes',
    description: 'Beautifully curated Ethiopian coffee collections — the perfect gift for any coffee lover.',
    image: 'https://images.unsplash.com/photo-1520341280432-4749d4d7bcf1?w=800&auto=format&fit=crop',
    color: 'from-purple-900/80 to-purple-700/40',
  },
  {
    id: 6,
    emoji: '🏺',
    title: 'Traditional Coffee',
    description: 'Inspired by the Ethiopian coffee ceremony — heritage blends brewed to honor generations of tradition.',
    image: 'https://images.unsplash.com/photo-1578374173708-cbaf11b9b21a?w=800&auto=format&fit=crop',
    color: 'from-[#4B2C20]/80 to-[#006341]/40',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const CategoriesPage = ({ addToCart }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFCF8] py-20 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 max-w-2xl mx-auto"
      >
        <span className="inline-block bg-[#006341]/10 text-[#006341] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
          Explore the Catalog
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#4B2C20] mb-4 leading-tight">
          Browse by Category
        </h1>
        <p className="text-gray-500 text-lg">
          From the misty highlands of Sidamo to the ancient forests of Kaffa — find your perfect Ethiopian coffee.
        </p>
      </motion.div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="relative rounded-3xl overflow-hidden cursor-pointer shadow-xl group h-72"
            onClick={() => navigate('/menu')}
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-black/40 to-transparent`} />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-7 text-white">
              <span className="text-3xl mb-2">{cat.emoji}</span>
              <h3 className="text-2xl font-extrabold leading-tight mb-1">{cat.title}</h3>
              <p className="text-sm text-white/80 mb-4 leading-relaxed">{cat.description}</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="self-start flex items-center gap-2 bg-white text-[#4B2C20] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#FFD700] transition-colors duration-200"
              >
                <ShoppingBag size={15} /> Explore
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CategoriesPage;
