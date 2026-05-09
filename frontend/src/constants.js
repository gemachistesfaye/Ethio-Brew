
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
  },
  {
    id: 'b3',
    title: 'Brewing the Perfect Cup at Home',
    titleAm: 'በቤት ውስጥ ፍጹም የሆነ ቡና ማዘጋጀት',
    excerpt: 'Tips and tricks to get the best flavor out of your EthioBrew beans.',
    excerptAm: 'ከኢትዮ-ብሩ ባቄላዎች ምርጡን ጣዕም ለማግኘት የሚረዱ ምክሮች።',
    content: 'Grind size, water temperature, and timing are key to a perfect cup...',
    author: 'Dawit S.',
    date: 'Dec 01, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000'
  },
  {
    id: 'b4',
    title: 'History of Coffee: From Kaffa to the World',
    titleAm: 'የቡና ታሪክ፡ ከካፋ እስከ ዓለም',
    excerpt: 'How a goat herder discovered the world’s most popular beverage.',
    excerptAm: 'አንድ የፍየል እረኛ የዓለምን ተወዳጅ መጠጥ እንዴት እንዳገኘ።',
    content: 'Kaldi the goat herder noticed his goats became energetic after eating berries from a certain tree...',
    author: 'Sara L.',
    date: 'Jan 15, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_COFFEE = [
  {
    id: '1',
    name: 'Yirgacheffe Special',
    name_am: 'ይርጋጨፌ ልዩ',
    name_om: 'Yirgaacheeffee Addaa',
    description: 'Floral and citric notes with a light body and complex acidity.',
    description_am: 'የአበባ እና የሎሚ ጣዕም ያለው፣ ቀለል ያለ እና ውስብስብ አሲዳማነት ያለው።',
    description_om: 'Mi\'a urgaa fi dhandhama loomii kan qabu.',
    origin: 'Yirgacheffe',
    roast: 'Light',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Floral', 'Lemon', 'Honey'],
    category: 'Single Origin'
  },
  {
    id: '2',
    name: 'Sidamo Sun-Dried',
    name_am: 'ሲዳሞ በፀሐይ የደረቀ',
    name_om: 'Sidaamoo Aduun Goge',
    description: 'Rich berry flavors with a creamy mouthfeel and chocolate finish.',
    description_am: 'የቤሪ ፍሬዎች ጣዕም ያለው፣ ክሬም የመሰለ እና የቸኮሌት መልክ ያለው።',
    description_om: 'Dhandhama fuduraa fi chokolaataa kan qabu.',
    origin: 'Sidamo',
    roast: 'Medium',
    price: 380,
    imageUrl: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Blueberry', 'Chocolate', 'Nutty'],
    category: 'Single Origin'
  },
  {
    id: '3',
    name: 'Harrar Bold',
    nameAm: 'ሐረር ቦልድ',
    description: 'Winey, heavy body with wild and exotic notes.',
    descriptionAm: 'የወይን ጣዕም ያለው፣ ከበድ ያለ እና እንግዳ የሆኑ ጣዕሞች ያሉት።',
    origin: 'Harrar',
    roast: 'Dark',
    price: 420,
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=1000',
    flavorNotes: ['Blackberry', 'Wild', 'Earthy'],
    category: 'Single Origin'
  },
  {
    id: '4',
    name: 'Habesha Blend',
    nameAm: 'ሐበሻ ብሌንድ',
    description: 'Our signature blend of the finest highland beans.',
    descriptionAm: 'ከምርጥ የደጋ ጥራጥሬዎች የተመረጠ የእኛ ልዩ ድብልቅ።',
    origin: 'Highlands',
    roast: 'Medium',
    price: 350,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2000',
    flavorNotes: ['Balanced', 'Sweet', 'Spicy'],
    category: 'Blend'
  },
  {
    id: '5',
    name: 'Kaffa Heirloom',
    nameAm: 'የካፋ ቅርስ',
    description: 'Ancient heirloom varieties from the deep forests of Kaffa.',
    descriptionAm: 'ከካፋ ጥልቅ ደኖች የተገኙ ጥንታዊ የቡና ዝርያዎች።',
    origin: 'Kaffa',
    roast: 'Medium',
    price: 480,
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Earthy', 'Spicy', 'Tobacco'],
    category: 'Specialty'
  },
  {
    id: '6',
    name: 'Guji Honey',
    nameAm: 'የጉጂ ማር',
    description: 'Processed using the honey method for intense sweetness.',
    descriptionAm: 'ለከፍተኛ ጣፋጭነት በማር ዘዴ የተዘጋጀ።',
    origin: 'Guji',
    roast: 'Light',
    price: 520,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Jasmine', 'Honey', 'Peach'],
    category: 'Specialty'
  }
];

export const TESTIMONIALS = [
ቡና ዝርያዎች።',
    origin: 'Kaffa',
    roast: 'Medium',
    price: 480,
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Earthy', 'Spicy', 'Tobacco'],
    category: 'Specialty'
  },
  {
    id: '6',
    name: 'Guji Honey',
    nameAm: 'የጉጂ ማር',
    description: 'Processed using the honey method for intense sweetness.',
    descriptionAm: 'ለከፍተኛ ጣፋጭነት በማር ዘዴ የተዘጋጀ።',
    origin: 'Guji',
    roast: 'Light',
    price: 520,
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    flavorNotes: ['Jasmine', 'Honey', 'Peach'],
    category: 'Specialty'
  }
];

export const TESTIMONIALS: Testimonial[] = [
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
