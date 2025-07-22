
import bannerAsianCooking from '@/assets/banner-asian-elderly-cooking.jpg';

export interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  lessons: number;
  totalTime: string;
  image: string;
  price: number;
  description: string;
  longDescription: string;
  instructor: string;
  rating: number;
  students: number;
  curriculum: string[];
  isPurchased: boolean;
  accessType: 'unlimited' | 'limited';
  accessDuration?: string; // e.g., "18 months"
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Smartphone Basics for Everyday Use",
    category: "Technology",
    level: "Beginner",
    lessons: 8,
    totalTime: "3 小時 20 分鐘",
    image: "https://mobileklinik.ca/wp-content/uploads/2022/12/what-affects-the-price-of-a-phone-scaled.jpg",
    price: 120,
    description: "Master essential smartphone skills for daily use, from messaging to apps.",
    longDescription: "Learn how to confidently use your smartphone for everyday tasks. This comprehensive course covers everything from basic navigation to using popular apps, making calls, sending messages, and staying safe online. Perfect for beginners who want to feel more confident with their device.",
    instructor: "Sarah Chen",
    rating: 4.9,
    students: 1247,
    curriculum: [
      "Getting started with your smartphone",
      "Making calls and managing contacts", 
      "Sending text messages and photos",
      "Using essential apps like email and camera",
      "Staying safe and secure online",
      "Customizing your phone settings",
      "Troubleshooting common problems",
      "Advanced features and tips"
    ],
    isPurchased: false,
    accessType: 'unlimited'
  },
  {
    id: 2,
    title: "Traditional Asian Cooking Basics", 
    category: "Cooking & Nutrition",
    level: "Beginner",
    lessons: 10,
    totalTime: "4 小時 30 分鐘",
    image: bannerAsianCooking,
    price: 120,
    description: "Learn authentic Asian recipes and cooking techniques for healthy, delicious meals.",
    longDescription: "Discover the art of traditional Asian cooking with simple, healthy recipes perfect for everyday meals. Learn essential techniques, ingredient selection, and time-saving tips from an experienced instructor who shares family recipes passed down through generations.",
    instructor: "Lily Chen",
    rating: 4.9,
    students: 1156,
    curriculum: [
      "Essential Asian pantry ingredients",
      "Basic knife skills and preparation",
      "Perfect rice cooking techniques",
      "Simple stir-fry fundamentals",
      "Healthy soup and broth recipes",
      "Steaming and braising methods",
      "Traditional dumpling making",
      "Seasoning and flavor balancing",
      "Meal planning and prep tips",
      "Adapting recipes for dietary needs"
    ],
    isPurchased: false,
    accessType: 'unlimited'
  },
  {
    id: 3,
    title: "Digital Photography Fundamentals",
    category: "Creative Arts", 
    level: "Beginner",
    lessons: 10,
    totalTime: "5 小時 15 分鐘",
    image: "https://mac-birmingham.transforms.svdcdn.com/production/Learning-and-Participation/2024/Courses/DM02-_-Exposure-II.png?w=760&h=504&q=100&auto=format&fit=crop&dm=1716995532&s=1d2a5548939f87a9512a03941a8c6aae",
    price: 120,
    description: "Learn to capture beautiful photos using any camera, with simple composition techniques.",
    longDescription: "Unlock your creative potential with digital photography. Whether you're using a smartphone, point-and-shoot, or DSLR camera, this course teaches you the fundamentals of composition, lighting, and storytelling through images.",
    instructor: "David Kim",
    rating: 4.7,
    students: 1156,
    curriculum: [
      "Understanding your camera basics",
      "Composition rules and guidelines",
      "Working with natural light",
      "Portrait photography tips",
      "Landscape and nature shots",
      "Indoor photography techniques",
      "Basic photo editing introduction",
      "Organizing and storing photos",
      "Sharing your work online",
      "Building a photo portfolio"
    ],
    isPurchased: false,
    accessType: 'unlimited'
  },
  {
    id: 4,
    title: "Managing Personal Finances",
    category: "Finance",
    level: "Intermediate", 
    lessons: 6,
    totalTime: "2 小時 30 分鐘",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600",
    price: 120,
    description: "Organize your finances, reduce debt, and plan for a secure retirement.",
    longDescription: "Take control of your financial future with practical strategies for budgeting, saving, and investing. This course provides clear, actionable advice for managing money at any stage of life, with special focus on retirement planning.",
    instructor: "Jennifer Walsh",
    rating: 4.9,
    students: 743,
    curriculum: [
      "Creating a personal budget",
      "Debt reduction strategies",
      "Emergency fund planning",
      "Investment basics for beginners",
      "Retirement planning essentials",
      "Estate planning overview"
    ],
    isPurchased: false,
    accessType: 'limited',
    accessDuration: '18 months'
  },
  {
    id: 5,
    title: "Introduction to Social Media",
    category: "Technology",
    level: "Beginner",
    lessons: 7, 
    totalTime: "3 小時 45 分鐘",
    image: "https://www.fs-poster.com/storage/photos/me3/best%20social%20media%20aesthetic.jpg",
    price: 120,
    description: "Connect with family and friends across popular social media platforms safely.",
    longDescription: "Learn to use social media platforms like Facebook, Instagram, and WhatsApp to stay connected with loved ones. This course emphasizes safety, privacy, and meaningful online interactions while avoiding common pitfalls.",
    instructor: "Michael Thompson",
    rating: 4.6,
    students: 1034,
    curriculum: [
      "Social media basics and safety",
      "Setting up Facebook account",
      "Connecting with family and friends",
      "Sharing photos and updates",
      "Privacy settings and security",
      "Using WhatsApp for messaging",
      "Avoiding scams and misinformation"
    ],
    isPurchased: false,
    accessType: 'unlimited'
  }
];
