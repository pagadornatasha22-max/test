import { Product, User, Order, CustomArrangementOptions, Review } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Red Elegance Rose Bouquet',
    category: 'bouquets',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800',
    description: 'A luxurious arrangement of premium red roses wrapped in elegant black paper with gold ribbon trim. Perfect for expressing deep affection.',
    rating: 4.9,
    isAvailable: true,
    featured: true,
  },
  {
    id: 'p2',
    name: 'Sunflower Sunshine Delight',
    category: 'bouquets',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&q=80&w=800',
    description: 'Bright and cheerful sunflowers paired with delicate baby breath and lush eucalyptus leaves. Brings warmth to any room.',
    rating: 4.8,
    isAvailable: true,
    featured: true,
  },
  {
    id: 'p3',
    name: 'Pristine White Lilies & Carnations',
    category: 'bouquets',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&q=80&w=800',
    description: 'Fragrant white oriental lilies combined with soft pink carnations in a gorgeous pastel wrapper. Exudes grace and serenity.',
    rating: 4.7,
    isAvailable: true,
  },
  {
    id: 'p4',
    name: 'Pastel Dreams Tulip Arrangement',
    category: 'bouquets',
    price: 2200,
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&q=80&w=800',
    description: 'Beautiful imported Dutch tulips in charming pastel shades of pink, yellow, and lavender. An exquisite visual masterpiece.',
    rating: 5.0,
    isAvailable: true,
    featured: true,
  },
  {
    id: 'p5',
    name: 'Dozen Scarlet Red Roses',
    category: 'dozen',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1549388604-817d15aa0110?auto=format&fit=crop&q=80&w=800',
    description: 'Exactly 12 stems of long-stemmed velvety scarlet roses, freshly cut and bound with a simple satin tie.',
    rating: 4.9,
    isAvailable: true,
  },
  {
    id: 'p6',
    name: 'Dozen Romantic Pink Peonies',
    category: 'dozen',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1568897813876-c56a81b7a2d4?auto=format&fit=crop&q=80&w=800',
    description: '12 stems of lush, voluminous pink peonies with sweet fragrance. Highly sought after and extremely elegant.',
    rating: 5.0,
    isAvailable: true,
  },
  {
    id: 'p7',
    name: 'Dozen Sunset Orange Gerberas',
    category: 'dozen',
    price: 950,
    image: 'https://images.unsplash.com/photo-1508615070457-7ba5be729491?auto=format&fit=crop&q=80&w=800',
    description: '12 vibrant orange and yellow gerbera daisies that radiate joy and positive energy. Beautifully boxed.',
    rating: 4.6,
    isAvailable: true,
  },
  {
    id: 'p8',
    name: 'Dozen Pure White Roses',
    category: 'dozen',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    description: '12 spotless white roses symbolizing purity and new beginnings. Carefully prepared with misty foliage.',
    rating: 4.8,
    isAvailable: true,
  },
  {
    id: 'p9',
    name: 'Custom Florist Choice Box',
    category: 'customized',
    price: 1600,
    image: 'https://images.unsplash.com/photo-1572454591674-2739f30d8c40?auto=format&fit=crop&q=80&w=800',
    description: 'A bespoke curated box featuring the freshest seasonal blooms picked by Macel herself. Tailored to your occasion.',
    rating: 4.9,
    isAvailable: true,
    featured: true,
  },
  {
    id: 'p10',
    name: 'Royal Purple Orchid Cascade',
    category: 'customized',
    price: 1950,
    image: 'https://images.unsplash.com/photo-1566807810034-cb15e7720336?auto=format&fit=crop&q=80&w=800',
    description: 'Stunning dendrobium purple orchids in a customized ceramic vase or bouquet presentation.',
    rating: 4.7,
    isAvailable: true,
  }
];

export const CUSTOMIZER_OPTIONS: CustomArrangementOptions = {
  flowers: [
    { name: 'Red & White Premium Roses', price: 800 },
    { name: 'Sunflowers & Baby Breath', price: 700 },
    { name: 'Mixed Dutch Tulips', price: 1100 },
    { name: 'Pink Carnations & Mums', price: 650 },
    { name: 'Elegant Stargazer Lilies', price: 950 },
  ],
  wrappers: [
    { name: 'Abaca Fiber & Kraft Paper (Eco Premium)', price: 150 },
    { name: 'Korean Frosted Paper (Minimalist Pink)', price: 120 },
    { name: 'Gold Trimmed Velvet Wrap', price: 200 },
    { name: 'Rustic Burlap Mesh', price: 100 },
    { name: 'No Wrapper (Glass Vase Setup)', price: 350 },
  ],
  ribbons: [
    { name: 'Rose Gold Satin Ribbon', price: 50 },
    { name: 'Burgundy Velvet Bow', price: 80 },
    { name: 'Ivory Chiffon Ribbon', price: 60 },
    { name: 'Rustic Jute Twine', price: 40 },
  ],
  addOns: [
    { name: 'Ferrero Rocher (12 pcs Box)', price: 450 },
    { name: 'Fluffy Teddy Bear (8 inch)', price: 380 },
    { name: 'Foil Helium Heart Balloon', price: 150 },
    { name: 'Printed Dedication Card (Gold Embossed)', price: 80 },
  ]
};

export const INITIAL_USERS: User[] = [
  {
    id: 'u-admin',
    username: 'admin',
    email: 'macel.flowershop@gmail.com',
    password: 'password123',
    fullName: 'Macel Canipaan (Owner)',
    contactNumber: '09171234567',
    address: 'Purok E, Brgy Canipaan, Hinunangan, Southern Leyte',
    role: 'admin',
  },
  {
    id: 'u-cust1',
    username: 'juan',
    email: 'juan.delacruz@gmail.com',
    password: 'password123',
    fullName: 'Juan Dela Cruz',
    contactNumber: '09209876543',
    address: 'Purok A, Poblacion, Hinunangan, Southern Leyte',
    role: 'customer',
  },
  {
    id: 'u-cust2',
    username: 'maria',
    email: 'maria.santos@yahoo.com',
    password: 'password123',
    fullName: 'Maria Santos',
    contactNumber: '09665554433',
    address: 'Brgy Calag-itan, Hinunangan, Southern Leyte',
    role: 'customer',
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'MFS-101',
    customerId: 'u-cust1',
    customerName: 'Juan Dela Cruz',
    contactNumber: '09209876543',
    email: 'juan.delacruz@gmail.com',
    pickupDateTime: '2026-05-15T14:30',
    optionalMessageCard: 'Happy Anniversary my love! Thank you for 5 wonderful years.',
    paymentMethod: 'GCash',
    paymentReference: '765290182736',
    items: [
      {
        id: 'ci-1',
        product: INITIAL_PRODUCTS[0], // Red Elegance Rose Bouquet
        quantity: 1,
        itemTotal: 1450
      }
    ],
    totalAmount: 1450,
    status: 'Ready for Pickup',
    createdAt: '2026-05-14T10:15:00Z'
  },
  {
    id: 'ord-102',
    orderNumber: 'MFS-102',
    customerId: 'u-cust2',
    customerName: 'Maria Santos',
    contactNumber: '09665554433',
    email: 'maria.santos@yahoo.com',
    pickupDateTime: '2026-05-16T10:00',
    optionalMessageCard: 'Congratulations on your graduation! So proud of you.',
    paymentMethod: 'GCash',
    paymentReference: '992018273645',
    items: [
      {
        id: 'ci-2',
        product: INITIAL_PRODUCTS[1], // Sunflower Sunshine
        quantity: 1,
        itemTotal: 1250
      },
      {
        id: 'ci-3',
        product: INITIAL_PRODUCTS[6], // Dozen Sunset Orange Gerbera
        quantity: 1,
        itemTotal: 950
      }
    ],
    totalAmount: 2200,
    status: 'Preparing',
    createdAt: '2026-05-15T09:20:00Z'
  },
  {
    id: 'ord-103',
    orderNumber: 'MFS-103',
    customerId: 'u-cust1',
    customerName: 'Juan Dela Cruz',
    contactNumber: '09209876543',
    email: 'juan.delacruz@gmail.com',
    pickupDateTime: '2026-05-18T16:00',
    optionalMessageCard: 'Get well soon mama! Sending you love.',
    paymentMethod: 'GCash',
    paymentReference: '882312004921',
    items: [
      {
        id: 'ci-4',
        product: INITIAL_PRODUCTS[3], // Pastel Dreams Tulip
        quantity: 1,
        itemTotal: 2200
      }
    ],
    totalAmount: 2200,
    status: 'Pending',
    createdAt: '2026-05-15T15:45:00Z'
  },
  {
    id: 'ord-104',
    orderNumber: 'MFS-100',
    customerId: 'u-cust2',
    customerName: 'Maria Santos',
    contactNumber: '09665554433',
    email: 'maria.santos@yahoo.com',
    pickupDateTime: '2026-05-01T11:00',
    optionalMessageCard: 'Happy Birthday dear friend!',
    paymentMethod: 'GCash',
    paymentReference: '110948273651',
    items: [
      {
        id: 'ci-5',
        product: INITIAL_PRODUCTS[4], // Dozen Scarlet Red Roses
        quantity: 1,
        itemTotal: 1200
      }
    ],
    totalAmount: 1200,
    status: 'Completed',
    createdAt: '2026-05-01T08:00:00Z'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'p1',
    customerId: 'u-cust1',
    customerName: 'Juan Dela Cruz',
    rating: 5,
    comment: 'Absolutely gorgeous! The red roses were incredibly fresh and the black wrapper looked so premium. My girlfriend loved them.',
    createdAt: '2026-05-14T12:00:00Z'
  },
  {
    id: 'rev-2',
    productId: 'p1',
    customerId: 'u-cust2',
    customerName: 'Maria Santos',
    rating: 5,
    comment: 'Very elegant presentation. Fast preparation right on time for pickup at Purok E.',
    createdAt: '2026-05-10T15:30:00Z'
  },
  {
    id: 'rev-3',
    productId: 'p2',
    customerId: 'u-cust2',
    customerName: 'Maria Santos',
    rating: 5,
    comment: 'The sunflowers brought so much warmth and happiness to our home! Will definitely order again from Macel.',
    createdAt: '2026-05-12T09:15:00Z'
  },
  {
    id: 'rev-4',
    productId: 'p4',
    customerId: 'u-cust1',
    customerName: 'Juan Dela Cruz',
    rating: 5,
    comment: 'Beautiful imported tulips. Exactly as described and perfectly styled.',
    createdAt: '2026-05-02T11:00:00Z'
  }
];
