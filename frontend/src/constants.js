
export const COLORS = {
  brown: '#4B2C20',
  green: '#006341',
  gold: '#FFD700',
  cream: '#F5F5DC',
  darkBg: '#1A1A1A',
};

export const PAYMENT_DETAILS = {
  telebirr: '0976601074',
  cbeAccount: '1000718615112'
};

export const MOCK_BLOGS = [
  {
    id: 'b1',
    title: 'The Art of the Ethiopian Coffee Ceremony',
    title_am: 'የኢትዮጵያ የቡና ስነ-ስርዓት ጥበብ',
    title_om: 'Aadaa Sirna Buna Itiyoophiyaa',
    excerpt: 'Deep dive into the rituals and social significance of the Jabena Bunna.',
    excerpt_am: 'ስለ ጀበና ቡና ስነ-ስርዓት እና ማህበራዊ ጠቀሜታ ጥልቅ ዳሰሳ።',
    excerpt_om: 'Waa\'ee sirna jabena bunaa fi faayidaa isaa bal\'inaan baruuf.',
    content: 'The coffee ceremony is more than just drinking coffee; it is a social ritual that has been passed down for centuries...',
    author: 'Abebe B.',
    date: 'Oct 12, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    title: 'Why Yirgacheffe is World-Renowned',
    title_am: 'ይርጋጨፌ ለምን በዓለም ታዋቂ ሆነ?',
    title_om: 'Maaliif Yirgaacheeffeen Addunyaatti Beekame?',
    excerpt: 'Understanding the unique soil and processing of Ethiopia’s finest export.',
    excerpt_am: 'ስለ ይርጋጨፌ ልዩ አፈር እና አዘገጃጀት መረዳት።',
    excerpt_om: 'Waa\'ee qilleensa fi akkaataa qophii buna Yirgaacheeffee baruuf.',
    content: 'Yirgacheffe is a small town in southern Ethiopia known for its distinctively floral and citric coffee...',
    author: 'Marta K.',
    date: 'Nov 05, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_COFFEE = [
  {
    id: '1', name: 'Yirgacheffe Special', name_am: 'ይርጋጨፌ ልዩ',
    description: 'Floral and citric notes with a light body and complex acidity.',
    origin: 'Yirgacheffe', roast: 'Light', price: 450, rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Floral', 'Lemon', 'Honey'], category: 'Single Origin'
  },
  {
    id: '2', name: 'Sidamo Sun-Dried', name_am: 'ሲዳሞ በፀሐይ የደረቀ',
    description: 'Rich berry flavors with a creamy mouthfeel and chocolate finish.',
    origin: 'Sidamo', roast: 'Medium', price: 380, rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Blueberry', 'Chocolate', 'Nutty'], category: 'Single Origin'
  },
  {
    id: '3', name: 'Habesha Blend', name_am: 'ሐበሻ ብሌንድ',
    description: 'Our signature blend of the finest highland beans for everyday excellence.',
    origin: 'Highlands', roast: 'Medium', price: 350, rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Balanced', 'Sweet', 'Spicy'], category: 'Blend'
  },
  {
    id: '4', name: 'Sunrise Espresso Blend', name_am: 'የንጋት ብሌንድ',
    description: 'A rich, full-bodied espresso blend crafted for the perfect morning shot.',
    origin: 'Multi-Region', roast: 'Dark', price: 390, rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Caramel', 'Cocoa', 'Bold'], category: 'Blend'
  },
  {
    id: '5', name: 'Kaffa Heirloom', name_am: 'የካፋ ቅርስ',
    description: 'Ancient heirloom varieties from the deep wild forests of Kaffa.',
    origin: 'Kaffa', roast: 'Medium', price: 480, rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Earthy', 'Spicy', 'Tobacco'], category: 'Specialty'
  },
  {
    id: '6', name: 'Guji Honey Process', name_am: 'የጉጂ ማር',
    description: 'Honey-processed for intense natural sweetness and a silky finish.',
    origin: 'Guji', roast: 'Light', price: 520, rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Jasmine', 'Honey', 'Peach'], category: 'Specialty'
  },
  {
    id: '7', name: 'Harrar Bold Dark', name_am: 'ሐረር ቦልድ',
    description: 'Winey, heavy body with wild and exotic mocha-like notes.',
    origin: 'Harrar', roast: 'Dark', price: 420, rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Blackberry', 'Wild', 'Earthy'], category: 'Dark Roast'
  },
  {
    id: '8', name: 'Midnight Espresso', name_am: 'የሌሊት ቡና',
    description: 'Deep-roasted Ethiopian dark beans for a bold, smoky espresso experience.',
    origin: 'Sidamo', roast: 'Dark', price: 400, rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=800', // Deep dark beans
    flavorNotes: ['Smoke', 'Dark Chocolate', 'Bold'], category: 'Dark Roast'
  },
  {
    id: '9', name: 'Jimma Organic', name_am: 'ጅማ ኦርጋኒክ',
    description: 'Certified organic beans from the Jimma highlands, naturally grown.',
    origin: 'Jimma', roast: 'Medium', price: 460, rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Clean', 'Sweet', 'Smooth'], category: 'Organic'
  },
  {
    id: '10', name: 'Bench Maji Wild Organic', name_am: 'ቤንች ማጂ ዱር',
    description: 'Wild-harvested organic coffee from the untouched Bench Maji forest.',
    origin: 'Bench Maji', roast: 'Light', price: 510, rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Floral', 'Herbal', 'Wild'], category: 'Organic'
  },
  {
    id: '11', name: 'Ethiopian Tasting Box', name_am: 'የኢትዮጵያ ቅምሻ ሳጥን',
    description: 'A curated gift set of 4 premium Ethiopian single-origin coffees.',
    origin: 'Multi-Region', roast: 'Mixed', price: 980, rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d744264?auto=format&fit=crop&q=80&w=800', // Unique coffee bean variety/gift feel
    flavorNotes: ['Variety', 'Premium', 'Gift'], category: 'Gift Box'
  },
  {
    id: '12', name: 'Buna Ceremony Blend', name_am: 'ቡና ስነ-ስርዓት ብሌንድ',
    description: 'Inspired by the traditional Ethiopian ceremony — full body, rich aroma.',
    origin: 'Kaffa / Jimma', roast: 'Medium-Dark', price: 430, rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800', // Traditional roasting ceremony
    flavorNotes: ['Incense', 'Earthy', 'Rich'], category: 'Traditional'
  },
];

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Abenezer T.',
    rating: 5,
    comment: 'The best Yirgacheffe I have ever ordered online! Fresh and aromatic.',
    commentAm: 'እስከዛሬ በመስመር ላይ ካዘዝኳቸው ይርጋጨፌዎች ሁሉ ምርጡ ነው! ትኩስ እና መዓዛ ያለው።',
    avatar: 'https://i.pravatar.cc/150?u=abe'
  },
  {
    id: '2',
    name: 'Selamawit K.',
    rating: 5,
    comment: 'Fast delivery and the packaging is beautiful. Highly recommend the Sidamo.',
    commentAm: 'ፈጣን ማድረስ እና አሸጋገጉ በጣም የሚያምር ነው። ሲዳሞውን በጣም እመክራለሁ።',
    avatar: 'https://i.pravatar.cc/150?u=selam'
  }
];
