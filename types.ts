
export type Language = 'en' | 'am' | 'om';

export interface CoffeeItem {
  id: string;
  name: string;
  name_am: string;
  name_om: string;
  description: string;
  description_am: string;
  description_om: string;
  origin: string;
  roast: 'Light' | 'Medium' | 'Dark';
  price: number;
  imageUrl: string;
  flavorNotes: string[];
  category: 'Single Origin' | 'Blend' | 'Specialty';
}

export interface CartItem extends CoffeeItem {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  deliveryAddress: string;
  paymentMethod: 'Telebirr' | 'CBE' | 'Stripe';
  paymentScreenshotUrl?: string;
  status: 'Pending' | 'Preparing' | 'Delivered' | 'Awaiting Confirmation';
  paid: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  title_am: string;
  title_om: string;
  excerpt: string;
  excerpt_am: string;
  excerpt_om: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  comment_am: string;
  comment_om: string;
  avatar: string;
}
