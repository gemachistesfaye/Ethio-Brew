
export type Language = 'EN' | 'AM';

export interface CoffeeItem {
  id: string;
  name: string;
  nameAm: string;
  description: string;
  descriptionAm: string;
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
  titleAm: string;
  excerpt: string;
  excerptAm: string;
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
  commentAm: string;
  avatar: string;
}
