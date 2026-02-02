
import { CoffeeItem, Testimonial, BlogPost } from './types';

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

export const TRANSLATIONS = {
  EN: {
    brand: 'EthioBrew',
    home: 'Home',
    menu: 'Menu',
    about: 'About',
    contact: 'Contact',
    blog: 'Blog',
    orderNow: 'Order Now',
    explore: 'Explore Coffee',
    addToCart: 'Add to Cart',
    cart: 'Cart',
    checkout: 'Checkout',
    summary: 'Order Summary',
    payNow: 'Pay Now',
    delivery: 'Delivery Details',
    total: 'Total',
    items: 'Items',
    heritage: 'Our Heritage',
    heritageDesc: 'Ethiopia is the birthplace of coffee. We bring the original ceremony to your doorstep.',
    testimonials: 'What Our Coffee Lovers Say',
    address: 'Delivery Address',
    phone: 'Phone Number',
    paymentMethod: 'Payment Method',
    uploadProof: 'Upload Payment Screenshot',
    paymentInstructions: 'Please transfer the total amount to the account below and upload a screenshot for verification.',
    telebirrLabel: 'Telebirr (Mobile)',
    cbeLabel: 'CBE Bank Account',
    confirmPayment: 'Confirm Payment',
    latestBlogs: 'Brewing Stories',
    readMore: 'Read More',
    search: 'Search coffee...',
    filterBy: 'Filter by',
    all: 'All',
    category: 'Category',
    roast: 'Roast',
    story: 'The Story',
    mission: 'Our Mission',
    farmers: 'Meet the Farmers',
    ceremony: 'The Ceremony'
  },
  AM: {
    brand: 'ኢትዮ-ብሩ',
    home: 'መነሻ',
    menu: 'ሜኑ',
    about: 'ስለ እኛ',
    contact: 'ያግኙን',
    blog: 'ብሎግ',
    orderNow: 'አሁን እዘዝ',
    explore: 'ቡናዎችን ያስሱ',
    addToCart: 'ወደ ቅርጫት ጨምር',
    cart: 'ቅርጫት',
    checkout: 'ክፍያ',
    summary: 'የትእዛዝ ማጠቃለያ',
    payNow: 'አሁኑኑ ይክፈሉ',
    delivery: 'የማድረሻ ዝርዝሮች',
    total: 'ጠቅላላ',
    items: 'ዕቃዎች',
    heritage: 'ቅርሳችን',
    heritageDesc: 'ኢትዮጵያ የቡና መገኛ ነች። ዋናውን የቡና ስነ-ስርዓት ወደ ደጃፍዎ እናመጣለን።',
    testimonials: 'ደንበኞቻችን ምን ይላሉ',
    address: 'የማድረሻ አድራሻ',
    phone: 'ስልክ ቁጥር',
    paymentMethod: 'የክፍያ ዘዴ',
    uploadProof: 'የክፍያ ማረጋገጫ ይጫኑ',
    paymentInstructions: 'እባክዎ ጠቅላላውን ሂሳብ ከታች ወዳለው ሂሳብ ያስተላልፉ እና ለማረጋገጫ የስክሪንሾት ይጫኑ።',
    telebirrLabel: 'ቴሌብር (ሞባይል)',
    cbeLabel: 'የኢትዮጵያ ንግድ ባንክ',
    confirmPayment: 'ክፍያውን አረጋግጥ',
    latestBlogs: 'የቡና ታሪኮች',
    readMore: 'ተጨማሪ ያንብቡ',
    search: 'ቡና ይፈልጉ...',
    filterBy: 'በዚህ ይለዩ',
    all: 'ሁሉም',
    category: 'ምድብ',
    roast: 'ቁላ',
    story: 'ታሪኩ',
    mission: 'ተልዕኳችን',
    farmers: 'አርሶ አደሮቹን ያግኙ',
    ceremony: 'ስነ-ስርዓቱ'
  }
};

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Art of the Ethiopian Coffee Ceremony',
    titleAm: 'የኢትዮጵያ የቡና ስነ-ስርዓት ጥበብ',
    excerpt: 'Deep dive into the rituals and social significance of the Jabena Bunna.',
    excerptAm: 'ስለ ጀበና ቡና ስነ-ስርዓት እና ማህበራዊ ጠቀሜታ ጥልቅ ዳሰሳ።',
    content: 'The coffee ceremony is more than just drinking coffee; it is a social ritual that has been passed down for centuries...',
    author: 'Abebe B.',
    date: 'Oct 12, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    title: 'Why Yirgacheffe is World-Renowned',
    titleAm: 'ይርጋጨፌ ለምን በዓለም ታዋቂ ሆነ?',
    excerpt: 'Understanding the unique soil and processing of Ethiopia’s finest export.',
    excerptAm: 'ስለ ይርጋጨፌ ልዩ አፈር እና አዘገጃጀት መረዳት።',
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
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800'
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

export const MOCK_COFFEE: CoffeeItem[] = [
  {
    id: '1',
    name: 'Yirgacheffe Special',
    nameAm: 'ይርጋጨፌ ልዩ',
    description: 'Floral and citric notes with a light body and complex acidity.',
    descriptionAm: 'የአበባ እና የሎሚ ጣዕም ያለው፣ ቀለል ያለ እና ውስብስብ አሲዳማነት ያለው።',
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
    nameAm: 'ሲዳሞ በፀሐይ የደረቀ',
    description: 'Rich berry flavors with a creamy mouthfeel and chocolate finish.',
    descriptionAm: 'የቤሪ ፍሬዎች ጣዕም ያለው፣ ክሬም የመሰለ እና የቸኮሌት መልክ ያለው።',
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
    imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800',
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
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
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
